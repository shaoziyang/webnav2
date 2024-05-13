/*

  X(n+1) = A - B / X(n)

*/

var abxnCSS = '.abxnCanvas {position: fixed;margin: 0;padding: 0;overflow: hidden;top: 0;left: 0;width: 100vw;height: 100vh;background-color: transparent;pointer-events: none;z-index:100000;}';

var styleElement = document.createElement("STYLE");
styleElement.type = "text/css";
styleElement.appendChild(document.createTextNode(abxnCSS));
var head = document.getElementsByTagName("HEAD")[0];
head.appendChild(styleElement);

var cv = document.createElement("canvas");
cv.id = "abxnCanvas";
cv.className = "abxnCanvas";
document.body.appendChild(cv);

const canvas = document.getElementById('abxnCanvas');
const ctx = canvas.getContext('2d');


let _A = 1;
let _B = 100;
let _X0 = -11;
let _color = 'rgba(200,0,0,0.2)';
let _N = 5000;

let _mode = '';
let cnt=0;
let Xn;
let points = [];

function randrange(min, max) {
    return Math.random()*(max-min)+min;
}

function abxn_randParam() {
    _A = randrange(0.1, 3);
    _B = randrange(3, 200);
    _X0 = randrange(-100, -0.01);
    _N = randrange(2000, 5000);
    _color = 'rgba('+Math.floor(randrange(0,255))+','+Math.floor(randrange(0,255))+','+Math.floor(randrange(0,255))+','+randrange(0.1,0.35)+')';
    Xn = _X0;
}

function abxn_initParam(A, B, X0, color, maxdot) {
    _A = A;
    _B = B;
    _X0 = X0;
    _N = maxdot;
    _color = color;
    Xn = _X0;
}

function reset() {
    if( _mode == "RANDOM" )
        abxn_randParam();

    cnt = 0;
    points=Array(canvas.width).fill(0);
    ctx.strokeStyle = _color;
    ctx.lineWidth = 1;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    console.log('Mode: '+_mode);
    console.log('A, B, X0: '+_A+' '+_B+' '+_X0);
    console.log('color, MAXDOT: '+_color+' '+_N);
}

function draw() {

    // new Xn
    Xn = _A - _B / Xn;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    for(i=0;i<canvas.width;i++){
        ctx.moveTo(i, canvas.height/2);
        ctx.lineTo(i, canvas.height/2 - points[i]);
    }
    ctx.lineWidth = 1;
    ctx.stroke();
    cnt++;

    if(cnt > _N){
        reset();
    }

    points.push(Xn);
    if(points.length > canvas.width)
        points.shift();
    requestAnimationFrame(draw);
}


function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    reset();
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas(); // 初始化Canvas大小


function abxn(mode="RANDOM", A=1, B=100, X0=-11, color="rgba(200,0,0,0.1)", maxdot=3000) {
    _mode = mode;

    abxn_initParam(A, B, X0, color, maxdot);

    console.log('Draw');

    reset();
    requestAnimationFrame(draw);
    //setInterval(draw, 50);
}

abxn();

