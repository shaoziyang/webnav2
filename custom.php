<?php

// 配置常量
define('APP_PATH', substr(urldecode($_SERVER['REQUEST_URI']), 0, strpos(urldecode($_SERVER['REQUEST_URI']), 'custom.php')));
define('DIR_PATH', rtrim(str_replace('\\', '/', dirname(__FILE__)), '/') . '/');
define('DAT_PATH', DIR_PATH . 'datasets/documents/');
define('CFG_PATH', DAT_PATH . 'homepage/config/');

// 安全检查：确保命令参数存在且有效
if (!isset($_GET['cmd'])) {
    http_response_code(400);
    die('Missing command parameter');
}

// 规范化命令并验证
$cmd = strtoupper($_GET['cmd']);
$validCommands = [
    'IMAGE_OF_DAY', 'IMAGE_OF_RANDOM', 'IMAGE_OF_BING', 'IMAGE_OF_BING_AUTOSAVE', 'IMAGE_LIBRARY',
    'JS_OF_DAY', 'JS_OF_RANDOM', 'NAV', 'SEARCH', 'DAILYMOTTO', 'NEW'
];

if (!in_array($cmd, $validCommands)) {
    http_response_code(400);
    die('Invalid command');
}

// 设置正确的Content-Type头
header('Content-Type: text/plain; charset=utf-8');

/**
 * 生成基于日期的随机数
 * @return int
 */
function randint_day() {
    static $cache = null;
    if ($cache !== null) return $cache;
    
    $d1 = new DateTime('2000-01-01');
    $d2 = new DateTime();
    $n = $d1->diff($d2)->days;
    
    for ($i = 0; $i < 5; $i++) {
        $n = (31415 * ($n % 0xffff) + ($n >> 16) + 31) % 0xfffffff;
    }
    
    return $cache = $n;
}

/**
 * 获取指定目录下的所有图片文件
 * @param string $path
 * @return array
 */
function get_image_list($path) {
    $extensions = ['png', 'jpg', 'jpeg', 'svg', 'webp'];
    $files = [];
    
    foreach ($extensions as $ext) {
        $matches = glob($path . '*.' . $ext);
        if ($matches) {
            $files = array_merge($files, $matches);
        }
    }
    
    return array_map(function($file) use ($path) {
        return substr($file, strlen($path));
    }, $files);
}

/**
 * 获取随机图片
 * @param int $mode 0=完全随机，1=每天相同随机
 * @return string|null
 */
function random_image($mode) {
    $image_list = get_image_list(CFG_PATH . 'images/');
    if (empty($image_list)) return null;
    
    $index = ($mode == 0) ? rand(0, count($image_list) - 1) : randint_day() % count($image_list);
    return $image_list[$index];
}

/**
 * 获取Bing今日图片URL
 * @return string|null
 */
function get_bing_today_imageurl() {
    $context = stream_context_create([
        'http' => [
            'timeout' => 10,
            'header' => 'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        ]
    ]);
    
    $url = 'https://cn.bing.com/HPImageArchive.aspx?idx=0&n=1';
    $str = @file_get_contents($url, false, $context);
    
    if (!$str) return null;
    
    if (preg_match("/<url>(.+?)<\/url>/", $str, $matches)) {
        return 'https://cn.bing.com' . $matches[1];
    }
    
    return null;
}

/**
 * 获取随机JavaScript文件
 * @param int $mode 0=完全随机，1=每天相同随机
 * @return string|null
 */
function random_js($mode) {
    $js_list = glob(CFG_PATH . 'javascript/*.js');
    if (empty($js_list)) return null;
    
    $js_list = array_map(function($file) {
        return substr($file, strlen(CFG_PATH . 'javascript/'));
    }, $js_list);
    
    $index = ($mode == 0) ? rand(0, count($js_list) - 1) : randint_day() % count($js_list);
    return $js_list[$index];
}

/**
 * 分析配置文件并生成数组格式
 * @param string $path 配置文件路径
 * @param string &$result 结果引用
 */
function analyze_config($path, &$result) {
    $result = '';
    
    $file = isset($_GET['file']) && $_GET['file'] !== '' 
        ? CFG_PATH . $path . $_GET['file'] 
        : CFG_PATH . $path . 'content.md';
    
    if (!file_exists($file)) return;
    
    $lines = file($file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    
    foreach ($lines as $line) {
        $line = trim($line);
        if (empty($line) || ($line[0] !== '-' && $line[0] !== '*')) continue;
        
        $items = explode('|', substr($line, 1));
        $items = array_map(function($item) {
            return '"' . trim($item) . '"';
        }, $items);
        
        $result .= '[' . implode(',', $items) . '],';
    }
    
    $result = '[' . $result . '[""]]';
}

/**
 * 获取导航配置
 * @return string
 */
function get_nav() {
    $result = '';
    analyze_config("nav/", $result);
    return $result;
}

/**
 * 获取搜索配置
 * @return string
 */
function get_search() {
    $result = '';
    analyze_config("search/", $result);
    return $result;
}

/**
 * 获取每日格言
 * @return string
 */
function get_dailymotto() {
    $result = '';
    analyze_config("dailymotto/", $result);
    return $result;
}

/**
 * 获取最新内容
 * @param int $num 最大返回数量
 * @return string
 */
function get_new_content($num = 20) {
    $xml_file = 'sitemap.xml';
    
    if (!file_exists($xml_file)) return '';
    
    try {
        $xml = simplexml_load_file($xml_file);
        if (!$xml) throw new Exception('Failed to load sitemap.xml');
        
        $urls = [];
        foreach ($xml->url as $url_node) {
            $loc = (string)$url_node->loc;
            $lastmod = (string)$url_node->lastmod;
            
            // 忽略非法时间
            if (empty($lastmod) || strtotime($lastmod) <= 0) continue;
            
            $urls[] = [
                'time' => strtotime($lastmod),
                'url' => $loc
            ];
        }
        
        // 按时间排序
        usort($urls, function($a, $b) {
            return $b['time'] - $a['time'];
        });
        
        // 限制数量
        $urls = array_slice($urls, 0, min($num, 50));
        
        // 生成输出
        $output = '';
        foreach ($urls as $item) {
            $output .= date('Y-m-d H:i:s', $item['time']) . ",{$item['url']}|";
        }
        
        return rtrim($output, '|');
        
    } catch (Exception $e) {
        error_log('Error processing sitemap: ' . $e->getMessage());
        return '';
    }
}

// 命令处理
try {
    switch ($cmd) {
        case "IMAGE_OF_DAY":
            echo random_image(1) ?: '';
            break;
            
        case "IMAGE_OF_RANDOM":
            echo random_image(0) ?: '';
            break;
            
        case "IMAGE_OF_BING":
        case "IMAGE_OF_BING_AUTOSAVE":
            $cache_file = CFG_PATH . 'images/BING_OF_DAY.txt';
            $today = intdiv(time() + 8 * 3600, 24 * 3600);
            
            // 检查缓存
            if (file_exists($cache_file)) {
                $data = file_get_contents($cache_file);
                list($cache_day, $cache_path) = explode('|', $data, 2);
                
                if ($cache_day == $today && file_exists($cache_path)) {
                    echo basename($cache_path);
                    exit;
                }
            }
            
            // 获取Bing图片URL
            $url = null;
            for ($i = 0; $i < 3; $i++) {
                $url = get_bing_today_imageurl();
                if ($url) break;
                sleep(1); // 重试前等待1秒
            }
            
            if (!$url) {
                http_response_code(500);
                die('Failed to fetch Bing image');
            }
            
            // 解析文件名
            $query = parse_url($url, PHP_URL_QUERY);
            parse_str($query, $params);
            $filename = isset($params['id']) ? $params['id'] : 'bing_' . time() . '.jpg';
            $save_path = CFG_PATH . 'images/' . $filename;
            
            // 检查文件是否已存在
            if (file_exists($save_path) && filesize($save_path) > 30000) {
                echo $filename;
                exit;
            }
            
            // 自动保存模式
            if ($cmd == "IMAGE_OF_BING_AUTOSAVE") {
                $success = false;
                for ($i = 0; $i < 3; $i++) {
                    $context = stream_context_create([
                        'http' => ['timeout' => 20]
                    ]);
                    
                    $image_data = @file_get_contents($url, false, $context);
                    
                    if ($image_data && strlen($image_data) > 50000) {
                        $success = file_put_contents($save_path, $image_data, LOCK_EX) !== false;
                        if ($success) break;
                    }
                    
                    sleep(1); // 重试前等待1秒
                }
                
                if ($success) {
                    file_put_contents($cache_file, "$today|$save_path", LOCK_EX);
                    echo $filename;
                } else {
                    echo $url; // 保存失败，返回URL
                }
            } else {
                echo $url; // 非保存模式直接返回URL
            }
            break;
            
        case "IMAGE_LIBRARY":
            echo json_encode(get_image_list(CFG_PATH . 'images/'));
            break;
            
        case "JS_OF_DAY":
            echo random_js(1) ?: '';
            break;
            
        case "JS_OF_RANDOM":
            echo random_js(0) ?: '';
            break;
            
        case "NAV":
            echo get_nav();
            break;
            
        case "SEARCH":
            echo get_search();
            break;
            
        case "DAILYMOTTO":
            echo get_dailymotto();
            break;
            
        case "NEW":
            $num = isset($_GET['num']) && is_numeric($_GET['num']) ? (int)$_GET['num'] : 20;
            echo get_new_content($num);
            break;
            
        default:
            http_response_code(400);
            die('Invalid command');
    }
} catch (Exception $e) {
    http_response_code(500);
    error_log('Custom script error: ' . $e->getMessage());
    die('An error occurred');
}
?>
