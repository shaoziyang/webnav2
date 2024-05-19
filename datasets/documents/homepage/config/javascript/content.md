# Javascript 特效

<script>SXYH_js("RANDOM");</script>
<script>SXYH_setwallpaper("RANDOM",0.7);</script>


- 使用脚本时，和在html中使用脚本方式一样，如 `<script>脚本语句</script>` 或 `<script src="xxx"></script>`。可以载入本地脚本或者网络脚本，也可以直接嵌入完整的脚本代码。
	- <font color="orange">`<script>` 标签最好放在每行最前面，避免和其它功能冲突</font>。
- 也可以通过 `<script>SXYH_js(xx)</script>`方式载入脚本，它好处是可以通过多种方式使用位于系统脚本库 [`datasets/documents/homepage/config/javascript` ]({{APP_PATH}}homepage/config/javascript) 中的脚本，在系统脚本库中已经集成了多个特效（如下雪、落花、下雨、洛伦兹曲线等）。
	- 使用 `<script>SXYH_js("RANDOM");</script>` 可以随机载入系统脚本库中的脚本。
	- 使用 `<script>SXYH_js("lorenz.js");</script>` 随机显示洛伦兹曲线效果。

当前JS特效：<span id="SXYH_JS_NAME"></span>

<script>
setTimeout("show_js_name()", 2000 );
function show_js_name(){
	let content=document.getElementById('SXYH_JS_NAME');  
	content.innerHTML='<font color="red"></font>'+SXYH_JS_CURRENT+'</font>';
}
</script>