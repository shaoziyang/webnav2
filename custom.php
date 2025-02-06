<?php

if(!isset($_GET['cmd'])) return;

$url = urldecode($_SERVER['REQUEST_URI']);

$APP_PATH = substr($url, 0, strpos($url, 'custom.php'));
$DIR_PATH = str_replace('\\', '/', dirname(__FILE__));
if($DIR_PATH[-1] != '/')$DIR_PATH .= '/';
$DAT_PATH = $DIR_PATH.'datasets/documents/';
$CFG_PATH = $DAT_PATH.'homepage/config/';

$cmd = Strtoupper($_GET['cmd']);

// generate daily random numbers for daily quotes
function randint_day(){
    $D1 = new DateTime('2000-01-01');
    $D2 = new DateTime();
    $n = $D1->diff($D2)->days;  // get date difference
    for($i=0;$i<5;$i++)         // iteration 5 times
        $n = (31415*($n%0xffff)+($n>>16)+31)%0xfffffff;
    return $n;
}

// return image filename array
function getImagelist($path) {
    $image_list = array_merge(glob($path.'*.png'), glob($path.'*.jpg'), glob($path.'*.jpeg'), glob($path.'*.svg'), glob($path.'*.webp'));
    foreach ($image_list as &$v){
        $v = substr($v, strlen($path));
    }
    return $image_list;
}

// get random image
function random_image($mode) {
    global $CFG_PATH;

    $image_list = getImagelist($CFG_PATH.'images/');
    if(count($image_list)==0) return;

    if ($mode == 0)
        return $image_list[rand(0, count($image_list)-1)];
    else
        return $image_list[randint_day()%count($image_list)];
}

function get_bing_today_imageurl() {
	$str = file_get_contents('https://cn.bing.com/HPImageArchive.aspx?idx=0&n=1');
	if (preg_match("/<url>(.+?)<\/url>/", $str, $matches)) {
		$imgurl = 'https://cn.bing.com'.$matches[1];
		return $imgurl;
	}
}

function random_js($mode) {
    global $CFG_PATH;

    $js_list = glob($CFG_PATH.'javascript/*.js');
    if(count($js_list)==0) return;
    foreach ($js_list as &$v){
        $v = substr($v, strlen($CFG_PATH.'javascript/'));
    }
    
    if ($mode == 0)
        return $js_list[rand(0, count($js_list)-1)];
    else
        return $js_list[randint_day()%count($js_list)];
}

function AnalyseConfig($path, &$arr) {
    global $CFG_PATH;
    
    $arr = '';

    if ((isset($_GET['file']))and($_GET['file']!=''))
        $file = $CFG_PATH.$path.$_GET['file'];
    else
        $file = $CFG_PATH.$path.'content.md';

    if(file_exists($file)){
        // load file to array
        $ss = file($file);

        foreach($ss as $v){
            // trim blank
            $a = trim($v);
            if ($a == '') continue;
            // first char must be '-' or '*'
            if (($a[0] <> '-')&&(($a[0] <> '*'))) continue;
            // replace '，' to ',' then explode to sub-array $tmp
            $tmp = explode('|', substr($a, 1));
            $arr = $arr.'[';
            for($n=0; $n<count($tmp); $n++){
                $arr = $arr.'"'.trim($tmp[$n]).'"';
                if($n!=(count($tmp)-1))$arr = $arr.',';
            }
            $arr = $arr.'],';
        }
    }
    // add '[ ]'
    $arr = '['.$arr.'[""]]';
}

function get_nav() {

    $arr_nd = '';
    AnalyseConfig("nav/", $arr_nd);

    return $arr_nd;
}

function get_search() {

    $arr_sd = '';
    AnalyseConfig("search/", $arr_sd);

    return $arr_sd;
}

function get_dailymotto() {
    
    $arr_md = '';
    AnalyseConfig("dailymotto/", $arr_md);

    return $arr_md;
}

/*
custom.php?cmd=xxx&
cmd:
  IMAGE_OF_BING
  IMAGE_OF_RANDOM
  IMAGE_OF_DAY
  IMAGE_LIBRARY
  
  JS_OF_DAY
  JS_OF_RANDOM

  NAV
  SEARCH
  DAILYMOTTO
*/
switch($cmd) {
    case "IMAGE_OF_DAY":
        echo random_image(1);
        return;
    case "IMAGE_OF_RANDOM":
        echo random_image(0);
        return;
    case "IMAGE_OF_BING":
    case "IMAGE_OF_BING_AUTOSAVE":
        if(file_exists($CFG_PATH.'images/BING_OF_DAY.txt')){
            $d = file_get_contents($CFG_PATH.'images/BING_OF_DAY.txt');
            $t = explode("|", $d);
            if(($t[0]==intdiv(time()+8*3600,24*3600))&&(file_exists($t[1]))) {
                echo basename($t[1]);
                return;
            }
        }
        for($i=0; $i<3; $i++) {
            $url = get_bing_today_imageurl();
            if($url != "") break;
        }
        $v1 = parse_url($url);
        parse_str($v1['query'], $v2);
        $imgfile = $CFG_PATH.'images/'.$v2['id'];
        if (file_exists($imgfile) && (filesize($imgfile)>30000) ){
            echo $v2['id'];
            return;
        }
        else {
            if ($cmd == "IMAGE_OF_BING_AUTOSAVE") {
                $bG = false;
                for($i=0; $i<3; $i++) {
                    // get image and save to file
                    $image_data = file_get_contents($url);
                    if(strlen($image_data)>50000){
                        $bG = true;
                        break;
                    }
                }
                if($bG) {
                    file_put_contents($imgfile, $image_data, LOCK_EX);
                    $v = intdiv(time()+8*3600,24*3600);
                    file_put_contents($CFG_PATH.'images/BING_OF_DAY.txt', $v.'|'.$imgfile, LOCK_EX);
                }
            }
            echo $url;
        }
        return;
    case "IMAGE_LIBRARY":
        echo json_encode(getImagelist($CFG_PATH.'images/'));
        return;
    case "JS_OF_DAY":
        echo random_js(1);
        return;
    case "JS_OF_RANDOM":
        echo random_js(0);
        return;
    case "NAV":
		echo get_nav();
		return;
    case "SEARCH":
        echo get_search();
        return;
	case "DAILYMOTTO":
        echo get_dailymotto();
		return;
    default: return;
}

?>