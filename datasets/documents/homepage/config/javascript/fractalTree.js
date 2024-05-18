var fractalTreeCanvasCSS = '.fractalTreeCanvas {position: fixed;margin: 0;padding: 0;overflow: hidden;top: 0;left: 0;width: 100vw;height: 100vh;background-color: transparent;pointer-events: none;z-index:100000;}';

var styleElement = document.createElement("STYLE");
styleElement.type = "text/css";
styleElement.appendChild(document.createTextNode(fractalTreeCanvasCSS));
var head = document.getElementsByTagName("HEAD")[0];
head.appendChild(styleElement);

var cv = document.createElement("canvas");
cv.id = "fractalTreeCanvas";
cv.className = "fractalTreeCanvas";
document.body.appendChild(cv);

const canvas = document.getElementById('fractalTreeCanvas');
const ctx = canvas.getContext('2d');

let _startx, _starty;
let _angle, _angle_left, _angle_right;
let _len, _len_kleft, _len_kright;
let _depth;
let _linewidth;
let _color;
let _interval=200;
let _loop;

let _mode = '';
let cnt=0;

let points = [];
let animation = false;


function randrange(min, max) {
    return Math.random()*(max-min)+min;
}


function fractalTree_randParam() {
    _startx = randrange(canvas.width/4, canvas.width*3/4);
    _starty = randrange(canvas.height*3/4, canvas.height+100);
    _angle = randrange(75, 105);
    d = Math.min(canvas.width, canvas.height, _starty);
    _len = Math.max(randrange(d/8, d/4), 50);
    _depth = Math.round(randrange(6, 12));
    _angle_left = randrange(5,45);
    _angle_right = randrange(5,45)
    _len_kleft = randrange(0.5, 1.1);
    _len_kright = randrange(0.5, 1.1);
    _color = 'rgb('+Math.round(randrange(0,80))+','+Math.round(randrange(100,255))+','+Math.round(randrange(0,80))+')';
    _linewidth = randrange(0.5, 5.5);
    _interval = randrange(16, 400);
}


function reset() {
    if( _mode == "RANDOM" )
        fractalTree_randParam();

    points.length = 0;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = _color;

}

function calcFractalTree(x, y, angle, len, depth) {
    if ((depth <1)||(animation == false)) return;

    let ex = x + len * Math.cos(angle*Math.PI/180);
    let ey = y - len * Math.sin(angle*Math.PI/180);

    points.push([x, y, ex, ey, depth]);

    calcFractalTree(ex, ey, angle + _angle_left, len * _len_kleft, depth - 1);
    calcFractalTree(ex, ey, angle - _angle_right, len * _len_kright, depth - 1);

}

function drawFractalTree() {

    if(animation == false) return;

    if(points.length == 0) {  // no more data
        animation = false;
        console.log('finished.');
        if(_loop) {
            console.log('loop');
            fractalTree(_mode, _startx, _starty, _angle, _len, _depth, _angle_left, _angle_right, _len_kleft, _len_kright, _color, _linewidth, _interval, _loop);
        }
        return;
    }

    d = points.shift();

    ctx.globalAlpha = d[4]/(_depth+1);

    ctx.beginPath();
    ctx.moveTo(d[0], d[1]);
    ctx.lineTo(d[2], d[3]);
    ctx.lineWidth = _linewidth * ctx.globalAlpha;
    ctx.stroke();

    setTimeout(drawFractalTree, _interval*d[4]/(_depth+1));
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    reset();
    fractalTree(_mode, _startx, _starty, _angle, _len, _depth, _angle_left, _angle_right, _len_kleft, _len_kright, _color, _linewidth, _interval, _loop);
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas(); // 初始化Canvas大小


function fractalTree (mode="RANDOM", startx=0, starty=0, angle=90, len=180, depth=8, angle_left=15, angle_right=20, len_kleft=0.7, len_kright=0.75, color="#10D020", linewidth=1, interval=200, loop=1) {

    if(animation || (points.length>0)){
        console.log('stop draw');
        animation = false;
        points.length = 0;
        setTimeout(()=>{fractalTree (mode, startx, starty, angle, len, depth, angle_left, angle_right, len_kleft, len_kright, color, linewidth, interval, loop)}, _interval+80);
        return;
    }

    _mode = mode;
    _startx = startx>0 ? startx : canvas.width/2;
    _starty = starty>0 ? starty : canvas.height;
    _angle = angle;
    _len = len;
    _depth = Math.min(18, Math.max(depth, 3)); // [3 .. 18]
    _angle_left = angle_left;
    _angle_right = angle_right;
    _len_kleft = len_kleft;
    _len_kright = len_kright;
    _color = color;
    _linewidth = linewidth;
    _interval = interval;
    _loop = loop;

    reset();

    console.log(_mode, _startx, _starty, _angle, _len, _depth, _angle_left, _angle_right, _len_kleft, _len_kright, _color, _linewidth, _interval, _loop);
    
    console.log('calc');
    setTimeout(()=>{ calcFractalTree(_startx, _starty, _angle, _len, _depth); }, _interval/2);

    console.log('draw');
    animation = true;
    setTimeout(drawFractalTree, _interval);

}

fractalTree()
