# 配置网址导航

编辑 [`datasets/documents/homepage/config/nav/content.md`]({{APP_PATH}}homepage/config/nav) 文件（可以使用系统自带编辑器或者任何外部编辑器），可以添加、修改、删除网址导航和分类，修改样式。

- 文件中每一行代表一个分类或者网址
    - `- 新闻` 代表分类。
    - `- 环球网| https://www.huanqiu.com/` 代表网址。
    - `- 126| https://126.com/|| color:green;font-weight:bold;` 代表自定义样式网址
- 有效的数据是以`-`或`*`开头，也就是无序列表样式，其它的行将被忽略。
- 每行数据可以用符号`|`分成多个部分
	- 第一部分是分类名称或者网址名称。
	- 第二部分如果是链接，就代表是网址，否则代表分类。
	- 第三部分是网址提示。
	- 第四部分是自定义网址样式，如：`color:#5174FD;font-weight:bold;`。
- 在需要的地方，使用 `<script>SXYH_ShowNav();</script>` 显示网址导航（<font color="orange">`<script>` 标签最好放在每行最前面，避免和其它功能冲突</font>）。
- 在用户自定义样式表 `styles/styles-custom.css` 中，通过 `.sxyh_nav_xxxx` 修改默认的大小、颜色、字体等样式。
	- 样式优先级为：网址样式参数 > 默认样式



---

<script>SXYH_ShowNav();</script>
	