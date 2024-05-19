# Flower Curve（繁花规）

用动态生成的繁花规图案作为背景。

```
// 用随机参数显示繁花规（默认）
<script>SXYH_js("flowercurve.js");</script>

// 用默认参数显示洛伦兹吸引子曲线
<script>SXYH_js("flowercurve.js");</script>
<script>flowerCurve("")</script>

// 用指定参数显示洛伦兹吸引子曲线
<script>SXYH_js("flowercurve.js");</script>
<script>flowerCurve("", 300, 70, 51)</script>
```

## 函数说明

- `flowerCurve(mode="RANDOM", R=500, r=310, d=65, dt=0.001, color='rgba(200,0,0,0.1)', width=1, maxdot=5000)`

    - mode：模式。`"RANDOM"`代表随机，其它代表指定参数。
    - R：大圆（定圆）半径。
    - r：小圆（动圆）半径。
    - d：笔和小圆圆心距离。
    - dt：步距。
    - color：曲线颜色。
    - width：线宽。
    - maxdo：最大点数，超过将清除重新开始绘制。

<script>SXYH_js("flowercurve.js");</script>
<br>

<style>
.div_flowerCurve{
    border:solid 0px;
    margin:5px;
}
.span_flowerCurve{
    width:80px;
    display: inline-block;
    white-space: nowrap;
}
.btn_flowerCurve{
    width:100px;
    height:30px;
    margin:10px;
    color:white;
}
.input_flowerCurve {
    border: 1px solid #555555;
    border-radius: 2px;
    height: 1.5em;
    width: 200px;
}
</style>

<div class="div_flowerCurve">
<div class="div_flowerCurve"><span class="span_flowerCurve">R</span><input class="input_flowerCurve browser-default" type="text" id="param_R" value="500" onchange="update_value=false"></div>
<div class="div_flowerCurve"><span class="span_flowerCurve">r</span><input class="input_flowerCurve browser-default" type="text" id="param_r" value="310" onchange="update_value=false"></div>
<div class="div_flowerCurve"><span class="span_flowerCurve">d</span><input class="input_flowerCurve browser-default" type="text" id="param_d" value="65" onchange="update_value=false"></div>
<div class="div_flowerCurve"><span class="span_flowerCurve">dt</span><input class="input_flowerCurve browser-default" type="text" id="param_dt" value="0.001" onchange="update_value=false"></div>
<div class="div_flowerCurve"><span class="span_flowerCurve">color</span><input class="input_flowerCurve browser-default" type="text" id="param_color" value="rgba(200,0,0,0.1)" onchange="update_value=false"></div>
<div class="div_flowerCurve"><span class="span_flowerCurve">width</span><input class="input_flowerCurve browser-default" type="text" id="param_width" value="1" onchange="update_value=false"></div>
<div class="div_flowerCurve"><span class="span_flowerCurve">MAXDOT</span><input class="input_flowerCurve browser-default" type="text" id="param_MAXDOT" value="5000" onchange="update_value=false"></div>
</div>
<div class="div_flowerCurve"><button onclick="flowercurve_rand();" class="btn_flowerCurve" style="background:rgb(40,200,40);">随机模式</button><button onclick="flowercurve_default();" class="btn_flowerCurve" style="background:rgb(40,60,200);">标准模式</button><button onclick="flowercurve_user();" class="btn_flowerCurve" style="background:rgb(200,60,40);">参数模式</button></div>

<script>
let update_value = true;

function flowercurve_user() {
    var R = document.getElementById("param_R").value;
    var r = document.getElementById("param_r").value;
    var d = document.getElementById("param_d").value;
    var dt = document.getElementById("param_dt").value;
    var MAXDOT = document.getElementById("param_MAXDOT").value;
    var color = document.getElementById("param_color").value;
    var width = document.getElementById("param_width").value;
    flowerCurve("", R, r, d, (dt), color, width, MAXDOT);
    update_value = false;
}

function flowercurve_rand() {
    flowerCurve();
    update_value = true;
}

function flowercurve_default() {
    flowerCurve("");
    update_value = true;
}

function get_value() {

    if (update_value){
        document.getElementById("param_R").value = _R;
        document.getElementById("param_r").value = _r;
        document.getElementById("param_d").value = _d;
        document.getElementById("param_dt").value = _dt;
        document.getElementById("param_MAXDOT").value = _MAXDOT;
        document.getElementById("param_color").value = _color;
        document.getElementById("param_width").value = _width;
    }
}

setInterval(get_value, 3000);
</script>