<?php

function console_log($data){
    if (is_array($data) || is_object($data))
        echo("<script>console.log(".json_encode($data).");</script>");
    else
        echo("<script>console.log('".$data."');</script>");
}

// random int number per day
function randint_day(){
    $D1 = new DateTime('1900-01-01');
    $D2 = new DateTime();
    $n = $D1->diff($D2)->days;
    for($i=0;$i<5;$i++)
        $n = (142857*$n+31)%65536;
    return $n;
}

function getImagelist($path) {
    $image_list = array_merge(glob($path.'*.png'), glob($path.'*.jpg'), glob($path.'*.jpeg'), glob($path.'*.svg'), glob($path.'*.webp'));
    foreach ($image_list as &$v){
        $v = substr($v, strlen($path));
    }
    return $image_list;
}

function sendPostRequestFileGetContents($url, $data){

    $options = [
        'http' => [
            'timeout' => 0,
            'method'  => 'POST',
            'header'  => 'Content-type: application/x-www-form-urlencoded',
            'content' => http_build_query($data)
        ]
    ];
    $context  = stream_context_create($options);
    $result = file_get_contents($url, false, $context);

    return $result;
}

function HTTPS() {
    if (isset($_SERVER['HTTPS']) && ($_SERVER['HTTPS'] == 'on' || $_SERVER['HTTPS'] == 1)) {
        return 'https://';
    } elseif (isset($_SERVER['HTTP_X_FORWARDED_PROTO']) && $_SERVER['HTTP_X_FORWARDED_PROTO'] === 'https') {
        return 'https://';
    } else {
        return 'http://';
    }
}

?>