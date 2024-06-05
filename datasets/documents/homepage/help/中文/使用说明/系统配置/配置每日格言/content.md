# 配置每日格言

<script>SXYH_ShowDailyMotto();</script>

编辑 [`datasets/documents/homepage/config/dailymotto/content.md`]({{APP_PATH}}homepage/config/dailymotto) 文件（可以使用系统自带编辑器或者任何外部编辑器），可以添加、修改、删除格言，修改样式。

- 每行代表一个格言
	- 有效的格言是以`-`或`*`开头，也就是无序列表样式，其它的行将被忽略。
	- 每行格言可以用符号`|`分成多个部分，第一部分是格言内容，第二部分是格言提示，第三部分是格言样式参数（只对此格言生效）。
- 系统将每日自动选择一个格言。
- 在需要的地方，使用 `<script>SXYH_ShowDailyMotto();</script>` 显示每日格言（<font color="orange">`<script>` 标签最好放在每行最前面，避免和其它功能冲突</font>）。
- 在用户自定义样式表 `styles/styles-custom.css` 中，通过 `.SXYH_DiaryMotto` 和 `.SXYH_divDiaryMotto` 修改每日格言的默认大小、颜色、字体等样式。
	- 在 SXYH_ShowDailyMotto(style) 中通过 style 参数修改指定样式，如`SXYH_ShowDailyMotto("font-size:2em;color:green;text-shadow: 2px 2px 4px black;");`。
	- 样式优先级为：格言样式参数 > 函数参数 > 默认样式

参考的每日格言模板：
* 所有过往，皆为序章。
* 千里之行始于足下
* 天行健，君子以自强不息。
* 路曼曼其修远兮，吾将上下而求索。
* 绳锯木断，水滴石穿。
* 海纳百川，有容乃大；壁立千仞，无欲则刚。
* 见贤思齐焉，见不贤而内自省也。
* 三人行，必有我师焉，择其善者而从之，其不善者而改之。
* 二人同心，其利断金
* 满招损，谦受益。
* 欲穷千里目，更上一层楼。
* For man is man and master of his fate.|人就是人，是自己命运的主人
* A lazy youth, a lousy age.| 少壮不努力，老大徒伤悲。
* Do one thing at a time, and do well.|一次只做一件事，做到最好！
* Youth means limitless possibilities.|年轻就是无限的可能。
* Knowledge makes humble, ignorance makes proud.|博学使人谦逊，无知使人骄傲。
* If winter comes , can spring be far behind ?|冬天来了，春天还会远吗？
* Sharp tools make good work.|工欲善其事，必先利其器。
* Journey of a thousand miles begins with single step.|千里之行，始于足下。
* Failure is the mother of success.|失败乃成功之母。
* Suffering is the most powerful teacher of life.|苦难是人生最伟大的老师。
* I am a slow walker,but I never walk backwards.|我走得很慢，但是我从来不会后退。
* Where there is a will, there is a way.|有志者事竟成。

	
<script>SXYH_ShowDailyMotto("font-size:2em;color:green;text-shadow: 2px 2px 4px black;");</script>
	