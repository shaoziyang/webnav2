<?php

$u = HTTPS().$_SERVER['HTTP_HOST'].dirname(urldecode($_SERVER['REQUEST_URI'])).'/updatefilecount.php?cmd=update';
sendPostRequestFileGetContents($u, array());


$datafile = str_replace('\\','/',dirname(__FILE__)."/datasets/documents/homepage/statistics.txt");

if(!file_exists($datafile)){
    $pagenumber = '📝 <b>0</b> 🖼️ <b>0</b>';
    return;
}

$c = file($datafile);
if(count($c)<1){
    $pagenumber = '📝 <b>0</b> 🖼️ <b>0</b>';
    return;
}

$arr = explode('||', $c[0]);
if(count($arr)<2){
    $pagenumber = '📝 <b>0</b> 🖼️ <b>0</b>';
    return;
}

$pagenumber = '📝 <b>'.$arr[0].'</b> 🖼️ <b>'.$arr[1].'</b>';


?>