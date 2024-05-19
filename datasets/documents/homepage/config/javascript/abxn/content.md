# ABXn

根据公式，迭代计算 Xn，产生数列，将计算结果作为Y轴。

$ X\_{n+1} = A - \frac{B} {X\_n} $ 


## 函数

- `abxn(mode="RANDOM", A=1, B=100, X0=-11, color="rgba(200,0,0,0.1)", maxdot=3000)`

    - mode：模式。`"RANDOM"`代表随机，其它代表指定参数。
    - A / B：系数。
    - X0：初始值。
    - color：曲线颜色。
    - maxdot：最大点数，超过将清除重新开始绘制。


<script>SXYH_js("abxn.js");</script>
<hr size="1" style="color:#00C8FC">
<style>
.divABXn{
    border:solid 0px;
    margin:5px;
}
.spanABXn{
    width:80px;
    display: inline-block;
    white-space: nowrap;
}
.btnABXn{
    width:100px;
    height:30px;
    margin:10px;
    color:white;
}
.inputABXn {
    border: 1px solid #555555;
    border-radius: 2px;
    height: 1.5em;
    width: 200px;
}
</style>
<div class="divABXn">
<div class="divABXn"><span class="spanABXn">A</span><input class="inputABXn browser-default" type="text" id="param_A" value="1" oninput="update_value=false"></div>
<div class="divABXn"><span class="spanABXn">B</span><input class="inputABXn browser-default" type="text" id="param_B" value="100" oninput="update_value=false"></div>
<div class="divABXn"><span class="spanABXn">X0</span><input class="inputABXn browser-default" type="text" id="param_X0" value="-11" oninput="update_value=false"></div>
<div class="divABXn"><span class="spanABXn">color</span><input class="inputABXn browser-default" type="text" id="param_color" value="rgba(200,0,0,0.4)" oninput="update_value=false"></div>
<div class="divABXn"><span class="spanABXn">MAXDOT</span><input class="inputABXn browser-default" type="text" id="param_MAXDOT" value="3000" oninput="update_value=false"></div>
</div>
<div class="divABXn"><button onclick="abxn_rand();" class="btnABXn" style="background:rgb(40,200,40);">随机模式</button><button onclick="abxn_default();" class="btnABXn" style="background:rgb(40,60,200);">标准模式</button><button onclick="abxn_user();" class="btnABXn" style="background:rgb(200,60,40);">参数模式</button></div>

<script>
let update_value = true;

function abxn_user() {
    var A = document.getElementById("param_A").value;
    var B = document.getElementById("param_B").value;
    var X0 = document.getElementById("param_X0").value;
    var color = document.getElementById("param_color").value;
    var MAXDOT = document.getElementById("param_MAXDOT").value;
    abxn("", A, B, X0, color, MAXDOT);
    update_value = false;
}

function abxn_rand() {
    abxn();
    update_value = true;
}

function abxn_default() {
    abxn("");
    update_value = true;
}

function get_value() {

    if (update_value){
        document.getElementById("param_A").value = _A;
        document.getElementById("param_B").value = _B;
        document.getElementById("param_X0").value = _X0;
        document.getElementById("param_color").value = _color;
        document.getElementById("param_MAXDOT").value = _MAXDOT;
    }
}

setInterval(get_value, 3000);

</script>

