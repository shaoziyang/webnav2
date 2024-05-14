# Homepage

<script>
SXYH_ShowDailyMotto();
SXYH_ShowNav();
SXYH_ShowSearch();
SXYH_setwallpaper("BING_AUTOSAVE");
SXYH_js("RANDOM");
</script>

<span id="SXYH_WALLPAPER_NAME"></span> <span id="SXYH_JS_NAME"></span>

<script>
setTimeout("show_names()", 2000 );
function show_names(){
	let content=document.getElementById('SXYH_WALLPAPER_NAME');
	content.innerHTML=SXYH_WALLPAPER_CURRENT;
	let content1=document.getElementById('SXYH_JS_NAME');
	content1.innerHTML=SXYH_JS_CURRENT;
}
</script>
