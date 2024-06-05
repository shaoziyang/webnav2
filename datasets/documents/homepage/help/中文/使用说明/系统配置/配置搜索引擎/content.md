# 配置搜索引擎

编辑 [`datasets/documents/homepage/config/search/content.md`]({{APP_PATH}}homepage/config/search) 文件（可以使用系统自带编辑器或者任何外部编辑器），可以添加、修改、删除搜索引擎和分类，修改显示样式。


下面是一个典型搜索引擎配置：

```
- 通用
	- bing| https://cn.bing.com/search?q=%1||background-color:transparent;|background-color:transparent;
	- 百度| https://www.baidu.com/s?wd=| 搜索关键字| border-color:#5070F0;color:#5070F0;| border-color:#5070F0;background:#5070F0;color:white;
	- 360| https://www.so.com/s?q=| 360搜索| border-color:#10B060;color:#10B060;| border-color:#10B060;background:#10B060;color:white;
	- 知乎| https://www.zhihu.com/search?q=||background-color:transparent;color:#1672F6;border:1px solid #1672F6;| border-color:#1672F6;background:transparent;color:#1672F6;font-weight:bold;
    - 秘塔| https://metaso.cn/?q=|||border-color:#175CD1;background:#175CD1;color:white;
- 软件||||color:blue;
    - 华军软件园| https://www.onlinedown.net/search?searchname=%1&button=搜索
	- 360软件| https://baoku.360.cn/soft/search?kw=||border-color:#10B060;color:#10B060;| border-color:#10B060;background:#10B060;color:white;
	- 腾讯| https://pc.qq.com/search.html#!keyword=
	- PortableApp| https://portableapps.com/search/node/||border-color:#7D0003;color:#7D0003;| border-color:#7D0003;background:#7D0003;color:white;
	- sourceforge| https://sourceforge.net/directory?q=|SourceForge 搜索|border-color:#F06600;color:#F06600;| border-color:#F06600;background:#F06600;color:white;
```	


- 文件中每一行代表一个分类或者搜索引擎，如：
	- `- 软件` 代表分类。
	- `- bing| https://cn.bing.com/search?q=` 代表搜索引擎。
	- `- 百度| https://www.baidu.com/s?wd=| 搜索关键字| border-color:#5070F0;color:#5070F0;| border-color:#5070F0;background:#5070F0;color:white;` 代表自定义样式搜索引擎。
- 有效的数据是以`-`或`*`开头，也就是无序列表样式，其它的行将被忽略。
- 每行数据可以用符号`|`分成多个部分
	- 第一部分是分类名称或者搜索引擎名称。
	- 第二部分如果是链接，就代表是搜索引擎，否则代表分类。
		- 链接中如果有`%1`，就代表输入的关键字；否则输入关键字放在链接的最后。
		- 链接可以通过搜索引擎获取，如：
			- 必应：`https://cn.bing.com/search?q=abc`，abc是搜索关键字，前面的`https://cn.bing.com/search?q=`就是搜索链接。
			- 百度：`https://www.baidu.com/s?wd=123`，123是搜索关键字，前面的`https://www.baidu.com/s?wd=`就是搜索链接。
	- 第三部分是输入栏提示。
	- 第四部分是输入栏样式，样式格式为CSS参数，用于改变默认的样式。如：
		- `border-color:#175CD1;background:#175CD1;color:white;` 代表边框颜色#175CD1，背景颜色#175CD1，字体白色。
	- 第五部分是按钮样式，含义同上。
- 在需要的地方，使用 `<script>SXYH_ShowSearch();</script>` 显示网址导航（<font color="orange">`<script>` 标签最好放在每行最前面，避免和其它功能冲突</font>）。
- 在用户自定义样式表 `styles/styles-custom.css` 中，通过 `.sxyh_search_xxxx` 可以修改默认的大小、颜色、字体等样式。
	- 样式优先级为：搜索样式参数 > 默认样式。


---

<script>SXYH_ShowSearch();</script>
	