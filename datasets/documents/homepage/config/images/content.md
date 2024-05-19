# 图像库

存放图像文件，可以在任何页面中用 `<script>SXYH_setwallpaper("");</script>` 设置为背景。

`SXYH_setwallpaper(img="", opacity=0.8, size="cover")` 的参数说明：

- img: 代表图像文件，支持jpg、png、webp、svg等多种图像格式，可以设置多种参数
	- `"xxx.jpg"`，代表页面同一目录下的图像文件。
	- `"xx/xx/xx.png"`，指定目录的图像文件。
	- `"https://xxxx.xxxx.xxxx/xx.webp"`，指定网络文件。
	- `{{IMG_LIB}}xx.jpg`: 图像库中的文件。
	- `""` 或 `RANDOM"`，代表随机显示系统图像库（[`datasets/documents/homepage/config/images`]({{APP_PATH}}homepage/config/images) 目录）中的图像文件。
	- `"DAY"`，随机显示（一天内相同） 系统图像库（[`datasets/documents/homepage/config/images`]({{APP_PATH}}homepage/config/images) 目录）中的图像文件。
	- `"BING"`，用必应每日一图作为背景。
	- `"BING_AUTOSAVE"`，用必应每日一图作为背景，并保存图像到系统图像库。
- opacity: 代表图像不透明度，参数范围是[0-1]，数值越小代表越清晰，越大越模糊，默认是0.8。对于颜色较鲜艳的图像，不透明度过小会让页面中的内容不易看清，因此设置适当的不透明度可以既丰富页面效果又不会影响显示内容。
- size: 图像显示大小，默认是 “cover”，代表缩放背景图片以完全覆盖背景区，但是背景图片部分可能看不见。其它参数请参考CSS中相关说明。


当前墙纸：<span id="SXYH_WALLPAPER_NAME"></span>

<script>
SXYH_ShowImageLibrary();
SXYH_setwallpaper("");
SXYH_js("RANDOM");
</script>


<script>
setTimeout("show_js_name()", 2000 );
function show_js_name(){
	let content=document.getElementById('SXYH_WALLPAPER_NAME');  
	content.innerHTML=SXYH_WALLPAPER_CURRENT;
}
</script>

