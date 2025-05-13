<?php
// 安全检查
if (!isset($_GET['cmd']) || !isset($_SERVER['HTTP_REFERER'])) {
    http_response_code(400);
    exit('Invalid request');
}

$cmd = strtoupper(trim($_GET['cmd']));
if ($cmd !== 'UPDATE') {
    http_response_code(403);
    exit('Command not allowed');
}

// 配置参数
$config = [
    'data_file' => __DIR__ . '/datasets/documents/homepage/statistics.txt',
    'document_dir' => __DIR__ . '/datasets/documents/*',
    'image_extensions' => ['.png', '.gif', '.jpg', '.jpeg', '.svg', '.webp'],
    'update_interval' => 300,
];

// 优化的统计函数
function statistics($dirPattern, array $imageExts) {
    $docCount = 0;
    $imgCount = 0;
    $stack = [$dirPattern];
    
    while (!empty($stack)) {
        $currentDir = array_pop($stack);
        $items = glob($currentDir, GLOB_NOSORT);
        
        if ($items === false) continue;
        
        foreach ($items as $item) {
            if (is_file($item)) {
                // 检查content.md文件
                $fileNameStart = strrpos($item, '/') !== false ? strrpos($item, '/') + 1 : 0;
                if (substr($item, $fileNameStart) === 'content.md') {
                    $docCount++;
                }
                
                // 检查图片扩展名
                $extStart = strrpos($item, '.');
                if ($extStart !== false) {
                    $fileExt = strtolower(substr($item, $extStart));
                    if (in_array($fileExt, $imageExts)) {
                        $imgCount++;
                    }
                }
            } elseif (is_dir($item)) {
                $stack[] = "$item/*";
            }
        }
    }
    
    return ['documents' => $docCount, 'images' => $imgCount];
}

// 检查是否需要更新
$updateRequired = false;
$currentTime = time();

if (!file_exists($config['data_file'])) {
    $updateRequired = true;
} else {
    $content = @file_get_contents($config['data_file']);
    if ($content === false) {
        trigger_error("Failed to read statistics file", E_USER_WARNING);
        $updateRequired = true;
    } else {
        $data = explode('||', $content, 3);
        if (count($data) < 3 || ($currentTime - (int)$data[2]) > $config['update_interval']) {
            $updateRequired = true;
        }
    }
}

// 执行更新
if ($updateRequired) {
    try {
        $result = statistics($config['document_dir'], $config['image_extensions']);
        $dataToSave = "{$result['documents']}||{$result['images']}||{$currentTime}";
        
        $dir = dirname($config['data_file']);
        if (!is_dir($dir)) {
            mkdir($dir, 0755, true);
        }
        
        file_put_contents($config['data_file'], $dataToSave, LOCK_EX);
        
        clearstatcache();

    } catch (Exception $e) {
        http_response_code(500);
        error_log("File count update failed: " . $e->getMessage());
        exit('Update failed');
    }
}

?>
