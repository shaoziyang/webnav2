// insert "insertStr" to "str"
function insertStr (str, index, insertStr) {
    return str.substring(0, index) + insertStr + str.substring(index);
}

// fill zero in left
function padLeft(num, length) {
    return (Array(length).join('0') + num).slice(-length);
}

// get host name
function HostName(){
    let url=window.location.href;
    let position = -1;
    let count = 0;

    for (let i = 0; i<url.length ; i++) {
        if (url[i] === '/') {
            count++;
            if (count === 3) {
                position = i;
                break;
            }
        }
    }

    if (position == -1)
        return "";
    else
        return url.substr(0,position+1);
}

// like {{DOC_PATH}}
function DOC_PATH(){
    var pathname=document.location.pathname;

    if((pathname.substr(-1))!='/') pathname = pathname + '/';

    var index=pathname.substr(1).indexOf("/");
    return insertStr(pathname, index+1, '/datasets/documents');
}

// like {{APP_PATH}}
function APP_PATH(){
    var pathname=document.location.pathname;
    var index=pathname.substr(1).indexOf("/");
    return pathname.substr(0,index+2);
}

// homepage/
function HOME_PATH(){
    return APP_PATH() + 'datasets/documents/';
}

// homepage/config/images/
function IMAGE_PATH(){
    return HOME_PATH() + 'homepage/config/images/';
}

// homepage/config/javascript/
function JS_PATH(){
    return HOME_PATH() + 'homepage/config/javascript/';
}


function showimage(img, width) {
    var fn = DOC_PATH() + img;
    document.write('<a href="'+fn+'"><img src="'+fn+'" width="'+width+'"></a>');
}

function openUrlWithNewWindow(url) {
    window.open(url);
}

function openUrlWithQuery(url, id) {

    // get input value
    var inputValue = document.getElementById(id).value;

    // input value as query param
    if (url.indexOf("%1")>-1)
        queryUrl = url.replace("%1", encodeURI(inputValue));
    else
        queryUrl = url + encodeURIComponent(inputValue);

    // open url in new windows/tab
    window.open(queryUrl);
}

function openUrlWithNewWindow(url) {
    window.open(url);
}


// show search
function SXYH_ShowSearch(Title='') {
    document.write('<div>');

    // show search title
    if (Title !='')
        document.write('<span class="sxyh_search_Title"><a href="'+APP_PATH()+'homepage/config/search" title="config">Search</a></span>');

    for (i=0; i<SXYH_ArraySearch.length; i++){

        if(SXYH_ArraySearch[i].length < 1) continue;

        vid = "SearchInput" + i;

        // button
        v0 = SXYH_ArraySearch[i][0];
        v1 = v2 = v3 = v4 = "";
        // button url
        if(SXYH_ArraySearch[i].length > 1)
            v1 = SXYH_ArraySearch[i][1];
        // button url placeholder
        if(SXYH_ArraySearch[i].length > 2)
            v2 = SXYH_ArraySearch[i][2];
        // button url placeholder input_style
        if(SXYH_ArraySearch[i].length > 3)
            v3 = SXYH_ArraySearch[i][3];
        // button url placeholder input_style button_style
        if(SXYH_ArraySearch[i].length > 4)
            v4 = SXYH_ArraySearch[i][4];

        if((v1.indexOf('://') == -1)||(i == 0)) {
            search_str = '<div class="sxyh_search_category"><span class="sxyh_search_category" style="'+v4+'">'+SXYH_ArraySearch[i][0]+'</span></div>';
        }
        else {
            search_str = '<div class="sxyh_search_container"><form onclick="return false"><input class="sxyh_search_input browser-default" style="'+v3+'" type="text" id="'+vid+'" placeholder="'+v2+'"> <button class="sxyh_search_button" style="'+v4+'" onclick="openUrlWithQuery(\''+v1+'\' , \''+ vid+'\')">'+v0+'</button></form></div>';
        }

        // write
        document.write(search_str);
    }
    document.write('</div>');
}

// show navigator
function SXYH_ShowNav(Title=''){
    document.write('<div>');

    if (Title != '')
        document.write('<span class="sxyh_nav_Title"><a href="'+APP_PATH()+'homepage/config/nav" title="config">Navigator</a></span>');

    document.write('<table cellpadding="0" cellspacing="0">');
    document.write('<tr class="no-border"><td width="48" class="sxyh_nav_td">');

    for (i=0; i<SXYH_ArrayNav.length; i++) {

        if(SXYH_ArrayNav[i].length < 1) continue;

        text = SXYH_ArrayNav[i][0];
        link = '';
        tip = '';
        style = '';

        // link
        if(SXYH_ArrayNav[i].length > 1)
            link = SXYH_ArrayNav[i][1];
        // tip
        if(SXYH_ArrayNav[i].length > 2)
            tip = SXYH_ArrayNav[i][2];
        // link style
        if(SXYH_ArrayNav[i].length > 3)
            style = SXYH_ArrayNav[i][3];

        if((SXYH_ArrayNav[i].length < 2)||(i == 0)||(link.indexOf('://')==-1)){
            if((style=='')&&(tip=='')&&(link!=''))
                style=link;
            nav_str = '</td></tr><tr class="no-border"><td class="sxyh_nav_td"><span class="sxyh_nav_category"  title="'+tip+'" style="'+style+'">'+text+'</span></td><td class="sxyh_nav_td">';
        }
        else{
            v = '<a class="sxyh_nav_link" href="'+link+'" onclick="openUrlWithNewWindow(\''+link+'\');return false;" title="'+tip+'" style="'+style+'">'+text+'</a>';
            nav_str = '<div class="sxyh_nav_container">'+v+'</div> '
        }

        document.write(nav_str);
    }

    document.write('</td></tr></table></div>');
}

// show Daily Motto
function SXYH_ShowDailyMotto(){
    if (SXYH_dm == '')
        SXYH_dm = 'Nothing is impossible';

    document.write('<div class="SXYH_divDiaryMotto"><span class="SXYH_DiaryMotto">'+SXYH_dm+'</span></div>');
}

function decodeHtmlEntities(encodedString) {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = encodedString;
    return textArea.value;
}

// last wallpaper filename
var SXYH_WALLPAPER_CURRENT='';
// set current page's walpaper
// img = xx/xx/xx.png | xx.jpg | RANDOM or "" | DAY | BING
//       xx/xx/xx.png or https://xxx.jpg: Specify image file with directory or url
//       xx.jpg: image file in current directory
//       {{IMG_LIB}}xx.jpg: image file in image library
//       RANDOM: random image file in homepage/config/images/ directory every view
//       DAY: random image file in homepage/config/images/ directory per day
//       bing: get today's bing wallpaper
// opacity: 0 - 1
// size: image size, it is CSS background-size Property  
function SXYH_setwallpaper(img="", opacity=0.8, size="cover") {

    // replace "\" with "/" and convert to uppercase
    let v = decodeHtmlEntities(img).replace(/\\/g, "/");

    switch (Math.floor(opacity*10)) {
        case 9:ofile = 'opacity_90.png';break;
        case 8:ofile = 'opacity_80.png';break;
        case 7:ofile = 'opacity_70.png';break;
        case 6:ofile = 'opacity_60.png';break;
        case 5:ofile = 'opacity_50.png';break;
        case 4:ofile = 'opacity_40.png';break;
        case 3:ofile = 'opacity_30.png';break;
        case 2:ofile = 'opacity_20.png';break;
        case 1:ofile = 'opacity_10.png';break;
        case 0:ofile = '';break;
        default:return;
    }
    if(ofile != '') ofile = 'url('+APP_PATH()+'scripts/'+ofile+'),';

    imgfile = "";
    if(v == "") v = "RANDOM";
    if((v == "RANDOM")||(v == "DAY")||(v == "BING")) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", APP_PATH()+"custom.php?cmd=IMAGE_OF_"+v, true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                r = xhr.responseText;
                if(r.indexOf('://')==-1)
                    r = IMAGE_PATH()+r;
                document.body.style.background = ofile + 'url(' + r + ') no-repeat fixed center';
                document.body.style.backgroundSize = size;
                SXYH_WALLPAPER_CURRENT = xhr.responseText;
            }
        };
        xhr.send();
    }
    else {
        if (v.substr(0, '{{IMG_LIB}}'.length) == '{{IMG_LIB}}') {
            imgfile = IMAGE_PATH()+v.substr('{{IMG_LIB}}'.length);
        }
        else{        
            // include "/" or "://"
            if (v.indexOf("/") > -1){
                imgfile = v;
            }
            else{
                imgfile = DOC_PATH() + v;
            }
        }
        document.body.style.background = ofile + 'url(' + imgfile + ') no-repeat fixed center';
        document.body.style.backgroundSize = size;
        SXYH_WALLPAPER_CURRENT = v;
    }
}

// show all image library
function SXYH_ShowImageLibrary(Title='', showfilename=true) {

    document.write('<div');
    if (Title != '')
        document.write('<span class="sxyh_nav_Title">'+Title+'</span>');
    document.write('<div id="SXYH_ImageLibrary">');
    document.write('</div></div>');

    var xhr = new XMLHttpRequest();
    xhr.open("POST", APP_PATH()+"custom.php?cmd=IMAGE_LIBRARY", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            imglist = JSON.parse(xhr.responseText);
            var divElement = document.getElementById("SXYH_ImageLibrary");
            let n = 0;
            let img = '';
            for ( i=0; i < imglist.length; i++) {
                tip = 'Title="'+(i+1)+'/'+imglist.length+' '+imglist[i]+'"';
                img = img + '<a class="SXYH_imageLibrary" href="'+IMAGE_PATH()+imglist[i]+'" '+tip+'><img width="240" border="8" style="border-color:#E5A032;border-style:ridge;" src="'+IMAGE_PATH()+imglist[i]+'" '+tip+'>';
                if(showfilename)
                    img = img + '<span class="SXYH_imageLibraryFileName"><b>'+(i+1)+'</b> - [ '+imglist[i]+' ]</span>';

                img = img + '</a>';
            }
            divElement.innerHTML = img;
        }
    };
    xhr.send();
}

// use javascript
// filename = https://xx.js | xx.js | RANDOM | DAY
//            https://xx.js: Specify js file with url
//            xx.js: "js file in homepage/config/javascript/" directory
//            RANDOM: random js file in "homepage/config/javascript/" directory every view
//            DAY: random image file in "homepage/config/javascript/" directory per day
var SXYH_JS_CERRENT='';
function SXYH_js(filename) {

    // replace "\" with "/" and convert to uppercase
    let v = decodeHtmlEntities(filename.toUpperCase()).replace(/\\/g, "/");

    if ((filename == "RANDOM")||(filename == "DAY")) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", APP_PATH()+"custom.php?cmd=JS_OF_"+filename, true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var script = document.createElement('script');
                script.src = JS_PATH()+xhr.responseText;
                document.body.appendChild(script);
                SXYH_JS_CERRENT = xhr.responseText;
            }
        };
        xhr.send();
    }
    else {
        if(filename.indexOf('://')==-1)
            filename = JS_PATH()+filename;
        document.write('<script src="'+filename+'"></script>');
        SXYH_JS_CERRENT = filename;
    }
}
