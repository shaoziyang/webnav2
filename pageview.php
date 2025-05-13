<?php
// 页面浏览量统计脚本

// 初始化变量
$currentTime = time();
$lastVisitTime = 0;
$viewCount = 0;
$pageview = '';

try {
    // 获取应用基础路径
    $basePath = realpath(dirname(__DIR__));
    if (!$basePath) {
        throw new Exception('无法确定基础路径');
    }

    // 安全处理URL输入
    $requestURI = urldecode($_SERVER['REQUEST_URI'] ?? '');
    if (empty($requestURI)) {
        throw new InvalidArgumentException('无效的请求URI');
    }

    // 移除查询参数并验证URL格式
    $cleanURL = strtok($requestURI, '?');
    if (strpos($cleanURL, '..') !== false) {
        throw new InvalidArgumentException('检测到非法路径字符');
    }

    // 构建文件路径
    $appPath = $APP->PATH ?? '';
    $urlPath = $cleanURL;
    
    // 处理根路径访问
    if ($urlPath === $appPath) {
        $urlPath = $appPath . 'homepage/';
    }
    
    // 插入固定路径前缀
    $documentPath = substr_replace($urlPath, 'datasets/documents/', strlen($appPath), 0);
    
    // 构建完整文件路径
    $filePath = $basePath . '/' . ltrim($documentPath, '/') . '/content.md.view';
    
    // 读取现有统计数据
    if (file_exists($filePath)) {
        $fileContent = file_get_contents($filePath);
        if ($fileContent === false) {
            throw new Exception("无法读取文件: $filePath");
        }
        
        list($viewCount, $lastVisitTime) = explode('||', $fileContent . '||0||0', 3);
        $viewCount = (int)$viewCount;
        $lastVisitTime = (int)$lastVisitTime;
    }

    // 防止频繁计数（防抖）
    if (($currentTime - $lastVisitTime) > 2) {
        $viewCount++;
        
        // 使用带锁的原子操作直接写入目标文件
        $content = "$viewCount||$currentTime";
        $result = file_put_contents($filePath, $content, LOCK_EX);
    }
    
    $pageview = $TXT->ViewCount.": <b>".$viewCount."</b>";

} catch (Exception $e) {
    // 记录错误但继续执行，保证页面正常显示
    error_log("Pageview counter error: " . $e->getMessage());
}

?>
