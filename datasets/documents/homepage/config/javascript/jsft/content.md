# jsft 特效

<script>SXYH_js('jsft.js');</script>

## 函数

- `jsft(mode="", speed=5, step=12, color='blue', alpha=0.5, maxdot=300)`

    - mode：模式。`"RANDOM"`代表随机，其它代表指定参数。
    - speed：移动速度。
    - step：步距。
    - color：曲线颜色。
    - alpha：显示透明度。
    - maxdot：最大点数，超过将清除重新开始绘制。

## playground

<style>
.divJSFT{
    border:solid 0px;
    margin:5px;
}
.spanJSFT{
    width:80px;
    display: inline-block;
    white-space: nowrap;
}
.btnJSFT{
    width:100px;
    height:30px;
    margin:10px;
    color:white;
}
.inputJSFT {
    border: 1px solid #555555;
    border-radius: 2px;
    height: 1.5em;
    width: 200px;
}
</style>

<br>
<div class="divJSFT">
<div class="divJSFT"><span class="spanJSFT">speed</span><input class="inputJSFT browser-default" type="text" id="param_SPEED" value="3" oninput="update_value=false"></div>
<div class="divJSFT"><span class="spanJSFT">step</span><input class="inputJSFT browser-default" type="text" id="param_STEP" value="12" oninput="update_value=false"></div>
<div class="divJSFT"><span class="spanJSFT">color</span><input class="inputJSFT browser-default" type="text" id="param_COLOR" value="blue" oninput="update_value=false"></div>
<div class="divJSFT"><span class="spanJSFT">alpha</span><input class="inputJSFT browser-default" type="text" id="param_ALPHA" value="0.5" oninput="update_value=false"></div>
<div class="divJSFT"><span class="spanJSFT">MAXDOT</span><input class="inputJSFT browser-default" type="text" id="param_MAXDOT" value="3000" oninput="update_value=false"></div>
</div>

<div class="divJSFT">
<button onclick="jsft_rand_mode();" class="btnJSFT" style="background:rgb(40,200,40);">随机模式</button><button onclick="jsft_default();" class="btnJSFT" style="background:rgb(40,60,200);">标准模式</button><button onclick="jsft_user_mode();" class="btnJSFT" style="background:rgb(200,60,40);">参数模式</button>
</div>

<script>
let update_value = true;

function jsft_user_mode() {
    var SPEED = document.getElementById("param_SPEED").value;
    var STEP = document.getElementById("param_STEP").value;
    var ALPHA = document.getElementById("param_ALPHA").value;
    var COLOR = document.getElementById("param_COLOR").value;
    var MAXDOT = document.getElementById("param_MAXDOT").value;
    jsft("", SPEED, STEP, COLOR, ALPHA, MAXDOT);
    update_value = false;
}

function jsft_rand_mode() {
    jsft("RANDOM");
    update_value = true;
}

function jsft_default() {
    jsft("");
    update_value = true;
}

function get_value() {

    if (update_value){
        document.getElementById("param_SPEED").value = jsft_speed;
        document.getElementById("param_STEP").value = jsft_step;
        document.getElementById("param_COLOR").value = jsft_color;
        document.getElementById("param_ALPHA").value = jsft_alpha;
        document.getElementById("param_MAXDOT").value = jsft_MAXDOT;
    }
}

setInterval(get_value, 3000);

</script>
