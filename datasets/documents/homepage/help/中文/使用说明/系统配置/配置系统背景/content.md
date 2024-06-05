# 配置系统背景

可以使用任何本地图片或网络图片作为页面背景。在需要使用背景的页面中，用下面方式添加背景（每次刷新后显示随机背景）：

```
<script>SXYH_setwallpaper("");</script>
```

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


<div style="text-align: center;"><input type="button" class="btn btn-default active" onclick="javascript:location.reload();" value="刷新页面"></div>

<script>
SXYH_setwallpaper("");
</script>

使用函数 `SXYH_ShowImageLibrary()` 可以显示[系统图像库]({{APP_PATH}}homepage/config/images)(位于`homepage/config/images`目录)中的图像。

<div style="text-align: center;"><input type="button" class="btn btn-default active" onclick="ShowImageLibrary();" style="margin:10px;background:#2080E0" value="显示系统图像库"> <input type="button" class="btn btn-default active" style="margin:10px;background:#E08020" onclick="ShowImageLibrary(false);" value="关闭系统图像库"></div>

<div id="ShowImageLibrary" width="100%" style="display:none"><script>SXYH_ShowImageLibrary();</script></div>

<script>

function ShowImageLibrary(sw=true) {

    let content=document.getElementById('ShowImageLibrary');  
	
	if(sw)
        content.style.display  = "block";
    else
        content.style.display  = "none";

}

</script>
