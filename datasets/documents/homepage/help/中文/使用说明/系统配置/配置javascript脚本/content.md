# 配置 Javascript 脚本

在页面中可以配合使用 Javascript 脚本，实现各种特殊效果。

- 使用脚本时，和在html中使用脚本方式一样，如 `<script>脚本语句</script>` 或 `<script src="xxx"></script>`。可以载入本地脚本或者网络脚本，也可以直接嵌入完整的脚本代码。
	- <font color="orange">`<script>` 标签最好放在每行最前面，避免和其它功能冲突</font>。
- 也可以通过 `<script>SXYH_js(xx)</script>`方式载入脚本，它好处是可以通过多种方式使用位于系统脚本库 [`datasets/documents/homepage/config/javascript` ]({{APP_PATH}}homepage/config/javascript) 中的脚本，在系统脚本库中已经集成了多个特效（如下雪、落花、下雨、洛伦兹曲线等）。
	- 使用 `<script>SXYH_js("RANDOM");</script>` 可以随机载入系统脚本库中的脚本。
	- 使用 `<script>SXYH_js("lorenz.js");</script>` 随机显示洛伦兹曲线效果。

```
<script>SXYH_js("lorenz.js");</script>
```

<script>SXYH_js("lorenz.js");</script>