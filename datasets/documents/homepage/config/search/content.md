# 搜索



## 搜索引擎配置

1. 有效数据以减号或星号开头（前面可以有空格）。
2. 一行中数据之间以逗号分隔，如果只有一个有效数据，它代表是搜索引擎分类；否则代表是搜索引擎。
3. 数据定义格式为： `名称, 网址 [, 提示 [, 输入栏样式 [, 按钮样式]]]`。
4. 名称和网址是必须参数，其它为可选。
5. 网址中`%1`代表输入的待搜索内容，如果不含`%1`，搜索内容将附加到网址最后。
6. 样式定义为 css，它具有最高优先级，请参考 css 相关说明。
7. 在需要的地方，使用 <span style="color:blue"><script</span><span style="color:blue">>SXYH_ShowSearch();</</span><span style="color:blue">script></span> 显示搜索。


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
	- 果核剥壳| https://www.ghxi.com/?s=
	- 小众软件| https://www.appinn.com/?s=||border-color:#007CA0;color:#007CA0;| border-color:#007CA0;background:#007CA0;color:white;
	- alternativeto| https://alternativeto.net/browse/search/?q=| Find an alternative to| border-color:#10A0F0;color:#10A0F0;| border-color:#10A0F0;background:#10A0F0;color:white;
	- APKTurbo| https://www.apkturbo.com/app-search/||border-color:#FF5500;color:#FF5500;| border-color:#FF5500;background:#FF5500;color:white;
	- jetapk| https://jetapk.com/search/?q=
- 资源
	- 猫盘| https://www.alipansou.com/search?k=
	- 飞鱼盘搜| https://feiyu100.cn/search?q=
	- PDF Drive| https://www.pdfdrive.com/search?q=
	- IconFinder| https://www.iconfinder.com/search?q=
	- Pexels| https://www.pexels.com/zh-cn/search/%1/|高质量图片|border-color:#07A081;color:#07A081;| border-color:#07A081;background:#07A081;color:white;
	- hippopx|https://www.hippopx.com/zh/search?q=
- 开发
	- github| https://github.com/search?q=||color:#000000;border:1px solid #000000;| background:#000000;color:white;font-weight:bold;
	- gitee| https://search.gitee.com/?q=||color:red;border:1px solid red;| border-color:red;background:red;color:white;font-weight:bold;
	- 菜鸟教程| https://www.runoob.com/?s=||color:#9ABA80;border:1px solid #9ABA80;| border-color:#9ABA80;background:#9ABA80;color:white;font-weight:bold;
	- 稀土掘金|https://juejin.cn/search?query=
- 🛒购物
    - 京东| https://search.jd.com/Search?keyword=|||border:0px;background:#E30213;color:white
    - 淘宝| https://s.taobao.com/search?q=|||border:0px;background:#FF6800;color:white
    - 什么值得买| https://search.smzdm.com/?s=||color:#E03030;border:1px solid #E03030;| border-color:#E03030;background:#E03030;color:white;font-weight:bold;
- 其它
	- 表情| https://www.emojiall.com/zh-hans/search_results?keywords=
	- emoji| https://emojis.wiki/search?s=
	- slant| https://www.slant.co/search?query=| What are the best...| color:#325480;border:1px solid #325480;| border-color:#325480;background:transparent;color:#325480;font-weight:bold;
	- ZOL| https://search.zol.com.cn/s/all.php?keyword=
	- 网易| https://www.163.com/search?keyword=||color:red;border:1px solid red;| border-color:red;background:transparent;color:red;font-weight:bold;
	- 头条| https://so.toutiao.com/search?keyword=
	- 百度百科| https://baike.baidu.com/search?word=||color:#3388FF;border:1px solid #3388FF;| border-color:#3388FF;background:#3388FF;color:white;
	- 百度翻译| https://fanyi.baidu.com/mtpe-individual/multimodal?query=||border:1px solid #7082FF;| border-color:#7082FF;background:#7082FF;color:white;
	