<?php

// search config file
$file_search = str_replace('\\','/',dirname(__FILE__).'/datasets/documents/homepage/config/search/content.md');
// navigator config file
$file_nav = str_replace('\\','/',dirname(__FILE__).'/datasets/documents/homepage/config/nav/content.md');
// Daily Motto
$file_dm = str_replace('\\','/',dirname(__FILE__).'/datasets/documents/homepage/config/dailymotto/content.md');


// search config array
$arr_sd = '';

// navigator url config array
$arr_nd = '';

function AnalyseConfig($file, &$arr) {
    $arr = '';
    $ss = array('');

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
                $arr = $arr.'"'.trim($tmp[$n]).'",';
            }
            $arr = $arr.'],';
        }
    }
    // add '[ ]'
    $arr = '['.$arr.'[""]];';
}

AnalyseConfig($file_search, $arr_sd);
AnalyseConfig($file_nav, $arr_nd);

$dm = $dmh = $dms = '';
if(file_exists($file_dm)){
    $ss = file($file_dm);
    $ar = array();
    foreach($ss as $v){
        // trim blank
        $a = trim($v);
        if ($a == '') continue;
        // first char must be '-' or '*'
        if (($a[0] <> '-')&&(($a[0] <> '*'))) continue;
        // add a line
        $t = trim(substr($a, 1));
        if ($t != '')
            array_push($ar, $t);
    }

    if(count($ar) > 0) {
        $tdm = explode('|', $ar[randint_day() % count($ar)]);
        if(isset($tdm[0]))$dm = $tdm[0];
        if(isset($tdm[1]))$dmh = $tdm[1];
        if(isset($tdm[2]))$dms = $tdm[2];
    }
}


echo "<script>  SXYH_ArraySearch = ".$arr_sd.";\n  SXYH_ArrayNav = ".$arr_nd.";\n  SXYH_dm = '".addslashes(trim($dm))."';\n  SXYH_dm_hint ='".addslashes(trim($dmh))."';\n  SXYH_dm_style = '".trim($dms)."';\n</script>";

?>