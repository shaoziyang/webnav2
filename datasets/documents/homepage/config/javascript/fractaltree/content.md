# Fractaltree (分形树)

分形树是一种类型的分形。先从任何长度的树干开始构建，然后从树干顶部绘制两个分支，每个分支旋转一定角度。然后每个分支再画两个子分支，每个子分支都以相同的方式旋转和缩放，不断重复。尝试改变每个分支的比例因子和旋转角度，可以得到一些非常有趣的形状。

## 函数

- fractalTree (mode="RANDOM", startx=0, starty=0, angle=90, len=180, depth=8, angle_left=15, angle_right=20, len_kleft=0.7, len_kright=0.75, color="#10D020", linewidth=1, interval=80, loop=1)

    - mode：模式。`"RANDOM"`代表随机，其它代表指定参数。
    - startx/starty：起始点坐标，小于等于0代表窗口底部中央（startx是窗口宽度一半，starty是窗口高度）。
    - angle：起始角度
    - len：初始分支长度
    - depth：迭代次数
    - angle_left：左（逆时针）旋转角度15
		- angle_right：右（顺时针）旋转角度
		- len_kleft：左分支缩放系数
		- len_kright：右分支缩放系数
		- color：颜色
		- linewidth：初始线宽（会随着迭代次数增加减小）
		- interval：显示周期
		- loop：是否循环显示

<hr size="1" style="color:#10C81C">
<style>
.div_fractalTree{
    border:solid 0px;
    margin:5px;
}
.span_fractalTree{
    width:100px;
    display: inline-block;
    white-space: nowrap;
}
.btn_fractalTree{
    width:100px;
    height:30px;
    margin:10px;
    color:white;
}
.input_fractalTree {
    border: 1px solid #55A055;
    border-radius: 2px;
    height: 1.5em;
    width: 200px;
}
</style>

<script>SXYH_js("fractalTree.js")</script>

<div class="div_fractalTree">
    <div class="div_fractalTree"><span class="span_fractalTree">startx</span><input class="input_fractalTree browser-default" type="text" id="param_startx" value="0" oninput="update_value=false"></div>
    <div class="div_fractalTree"><span class="span_fractalTree">starty</span><input class="input_fractalTree browser-default" type="text" id="param_starty" value="0" oninput="update_value=false"></div>
    <div class="div_fractalTree"><span class="span_fractalTree">angle</span><input class="input_fractalTree browser-default" type="text" id="param_angle" value="90" oninput="update_value=false"></div>
    <div class="div_fractalTree"><span class="span_fractalTree">len</span><input class="input_fractalTree browser-default" type="text" id="param_len" value="180" oninput="update_value=false"></div>
    <div class="div_fractalTree"><span class="span_fractalTree">depth</span><input class="input_fractalTree browser-default" type="text" id="param_depth" value="8" oninput="update_value=false"></div>
    <div class="div_fractalTree"><span class="span_fractalTree">angle_left</span><input class="input_fractalTree browser-default" type="text" id="param_angle_left" value="15" oninput="update_value=false"></div>
    <div class="div_fractalTree"><span class="span_fractalTree">angle_right</span><input class="input_fractalTree browser-default" type="text" id="param_angle_right" value="20" oninput="update_value=false"></div>
    <div class="div_fractalTree"><span class="span_fractalTree">len_kleft</span><input class="input_fractalTree browser-default" type="text" id="param_len_kleft" value="0.7" oninput="update_value=false"></div>
    <div class="div_fractalTree"><span class="span_fractalTree">len_kright</span><input class="input_fractalTree browser-default" type="text" id="param_len_kright" value="0.75" oninput="update_value=false"></div>
    <div class="div_fractalTree"><span class="span_fractalTree">color</span><input class="input_fractalTree browser-default" type="text" id="param_color" value="#10D020" oninput="update_value=false"></div>
    <div class="div_fractalTree"><span class="span_fractalTree">linewidth</span><input class="input_fractalTree browser-default" type="text" id="param_linewidth" value="1" oninput="update_value=false"></div>
    <div class="div_fractalTree"><span class="span_fractalTree">interval</span><input class="input_fractalTree browser-default" type="text" id="param_interval" value="200" oninput="update_value=false"></div>
    <div class="div_fractalTree"><span class="span_fractalTree">loop</span><input class="input_fractalTree browser-default" type="text" id="param_loop" value="1" oninput="update_value=false"></div>
</div>

<div class="div_fractalTree"><button onclick="fractalTree_rand();" class="btn_fractalTree" style="background:rgb(40,200,40);">随机模式</button>
<button onclick="fractalTree_var(0,0,90,180,8,15,20,0.7,0.75,'#10D020',1,200,1);" class="btn_fractalTree" style="background:rgb(0,220,40);">默认参数</button>
<button onclick="fractalTree_user();" class="btn_fractalTree" style="background:rgb(20,160,0);">自定义参数</button><br>
<button onclick="fractalTree_var(0,0,90,180,8,30,30,0.75,0.75,'#008010',5,200,0);" class="btn_fractalTree" style="background:rgb(40,130,40);">参数1</button>
<button onclick="fractalTree_var(0,0,90,180,12,45,45,0.8,0.8,'#000080',3,20,0);" class="btn_fractalTree" style="background:rgb(40,110,80);">参数2</button>
<button onclick="fractalTree_var(0,0,90,150,14,35,22,0.9,0.5,'#F00000',3,20,0);" class="btn_fractalTree" style="background:rgb(80,120,40);">参数3</button>
</div>

<script>
let update_value = true;

function fractalTree_user() {
    var startx = parseFloat(document.getElementById("param_startx").value);
    var starty = parseFloat(document.getElementById("param_starty").value);
    var angle = parseFloat(document.getElementById("param_angle").value);
    var len = parseFloat(document.getElementById("param_len").value);
    var depth = parseInt(document.getElementById("param_depth").value);
    var angle_left = parseFloat(document.getElementById("param_angle_left").value);
    var angle_right = parseFloat(document.getElementById("param_angle_right").value);
    var len_kleft = parseFloat(document.getElementById("param_len_kleft").value);
    var len_kright = parseFloat(document.getElementById("param_len_kright").value);
    var color = document.getElementById("param_color").value;
    var linewidth = parseFloat(document.getElementById("param_linewidth").value);
    var interval = parseInt(document.getElementById("param_interval").value);
    var loop = parseInt(document.getElementById("param_loop").value);

    fractalTree("", startx, starty, angle, len, depth, angle_left, angle_right, len_kleft, len_kright, color, linewidth, interval, loop);
    update_value = true;
}

function fractalTree_rand() {
    fractalTree();
    update_value = true;
}

function fractalTree_var(startx, starty, angle, len, depth, angle_left, angle_right, len_kleft, len_kright, color, linewidth, interval, loop) {
    fractalTree("", startx, starty, angle, len, depth, angle_left, angle_right, len_kleft, len_kright, color, linewidth, interval, loop);
    update_value = true;
}

function get_value() {

    if (update_value){
        document.getElementById("param_startx").value = _startx;
        document.getElementById("param_starty").value = _starty;
        document.getElementById("param_angle").value = _angle;
        document.getElementById("param_len").value = _len;
        document.getElementById("param_depth").value = _depth;
        document.getElementById("param_angle_left").value = _angle_left;
        document.getElementById("param_angle_right").value = _angle_right;
        document.getElementById("param_len_kleft").value = _len_kleft;
        document.getElementById("param_len_kright").value = _len_kright;
        document.getElementById("param_color").value = _color;
        document.getElementById("param_linewidth").value= _linewidth;
        document.getElementById("param_interval").value = _interval;
        document.getElementById("param_loop").value = _loop;
    }
    
}

setInterval(get_value, 2000);


</script>


