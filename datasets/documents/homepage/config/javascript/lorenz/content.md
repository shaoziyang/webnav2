# Lorenz (洛伦兹吸引子)

用动态生成的洛伦兹吸引子曲线作为背景，可以设置各种参数，默认是随机参数模式。

```
// 用随机参数显示洛伦兹吸引子曲线（默认）
<script>SXYH_js("lorenz.js");</script>

// 用默认参数显示洛伦兹吸引子曲线
<script>SXYH_js("lorenz.js");</script>
<script>lorenz("");</script>

// 用指定参数显示洛伦兹吸引子曲线
<script>SXYH_js("lorenz.js");</script>
<script>lorenz("", 12,25,3);</script>
```

## 函数参数
- `function lorenz(mode="RANDOM", sigma=10.0, rho=28.0, beta=8/3.0, dt=0.01, MAXDOT=3000, scale=20, color1='rgba(20,40,200,0.3)', color2='rgba(50,180,200,0.8)')`

    - mode：模式。`"RANDOM"`代表随机，其它代表指定参数。
    - sigma/rho/beta：洛伦兹方程的3个参数，默认是10/28/2.67。
    - dt：步距，越小精度越高，但速度越慢。
    - MAXDOT：显示的点数，超过将清除重新开始绘制。
    - scale：根据屏幕分辨率设置的显示放大倍数。
    - color1：曲线颜色，支持 rgba 等 css 标准方式。
    - color2：代表当前点位置的方块颜色。
<br>

<script>SXYH_js("lorenz.js");</script>

<style>
.divLorenz{
    border:solid 0px;
    margin:5px;
}
.spanLorenz{
    width:80px;
    display: inline-block;
    white-space: nowrap;
}
.btnLorenz{
    width:100px;
    height:30px;
    margin:10px;
    color:white;
}
.inputLorenz {
    border: 1px solid #555555;
    border-radius: 2px;
    height: 1.5em;
    width: 200px;
}
</style>

<div class="divLorenz">
<div class="divLorenz"><span class="spanLorenz">sigma</span><input class="inputLorenz browser-default" type="text" id="param_sigma" value="10" onchange="update_value=false"></div>
<div class="divLorenz"><span class="spanLorenz">rho</span><input class="inputLorenz browser-default" type="text" id="param_rho" value="28" onchange="update_value=false"></div>
<div class="divLorenz"><span class="spanLorenz">beta</span><input class="inputLorenz browser-default" type="text" id="param_beta" value="2.6667" onchange="update_value=false"></div>
<div class="divLorenz"><span class="spanLorenz">dt</span><input class="inputLorenz browser-default" type="text" id="param_dt" value="0.01" onchange="update_value=false"></div>
<div class="divLorenz"><span class="spanLorenz">scale</span><input class="inputLorenz browser-default" type="text" id="param_scale" value="20" onchange="update_value=false"></div>
<div class="divLorenz"><span class="spanLorenz">color1</span><input class="inputLorenz browser-default" type="text" id="param_color1" value="rgba(0,0,200,0.3)" onchange="update_value=false"></div>
<div class="divLorenz"><span class="spanLorenz">color2</span><input class="inputLorenz browser-default" type="text" id="param_color2" value="rgba(200,20,20,0.8)" onchange="update_value=false"></div>
<div class="divLorenz"><span class="spanLorenz">MAXDOT</span><input class="inputLorenz browser-default" type="text" id="param_MAXDOT" value="3000" onchange="update_value=false"></div>
</div>
<div class="divLorenz"><button onclick="lorenz_rand();" class="btnLorenz" style="background:rgb(40,200,40);">随机模式</button><button onclick="lorenz_default();" class="btnLorenz" style="background:rgb(40,60,200);">标准模式</button><button onclick="lorenz_user();" class="btnLorenz" style="background:rgb(200,60,40);">参数模式</button></div>


<script>
let update_value = true;

function lorenz_user() {
    var sigma = document.getElementById("param_sigma").value;
    var rho = document.getElementById("param_rho").value;
    var beta = document.getElementById("param_beta").value;
    var dt = document.getElementById("param_dt").value;
    var MAXDOT = document.getElementById("param_MAXDOT").value;
    var scale = document.getElementById("param_scale").value;
    var color_1 = document.getElementById("param_color1").value;
    var color_2 = document.getElementById("param_color2").value;
    lorenz("", sigma, rho, beta, dt, MAXDOT, scale, color_1, color_2);
    update_value = false;
}

function lorenz_rand() {
    lorenz();
    update_value = true;
}

function lorenz_default() {
    lorenz("");
    update_value = true;
}

function get_value() {

    if (update_value){
        document.getElementById("param_sigma").value = _sigma;
        document.getElementById("param_rho").value = _rho;
        document.getElementById("param_beta").value = _beta;
        document.getElementById("param_dt").value = _dt;
        document.getElementById("param_MAXDOT").value = _MAXDOT;
        document.getElementById("param_scale").value = _scale;
        document.getElementById("param_color1").value = _color1;
        document.getElementById("param_color2").value = _color2;
    }
}

setInterval(get_value, 3000);

</script>
