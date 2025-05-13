<?php

// 配置常量
if (!isset($RECENT_MAX_NUMBER)) {
    $RECENT_MAX_NUMBER = 20;
}

// 获取当前URL
$currentUrl = urldecode($_SERVER['REQUEST_URI']);
$linkFormat = ' ['.$currentUrl.']('.$currentUrl.')'.PHP_EOL;
$recentLink = '';
$recentPageUrl = $APP->PATH.'homepage/recent';

// 排除编辑模式和最近页面
if (str_contains($currentUrl, '?') || strcasecmp($currentUrl, $recentPageUrl) === 0) {
    return;
}

// 文件路径处理
$storageDir = dirname(__FILE__)."/datasets/documents/homepage/recent";
$storagePath = $storageDir . "/content.md";
$storageDir = str_replace('\\', '/', $storageDir);
$storagePath = str_replace('\\', '/', $storagePath);

try {
    // 确保存储目录存在
    if (!is_dir($storageDir)) {
        if (!mkdir($storageDir, 0755, true)) {
            throw new RuntimeException("无法创建目录: $storageDir");
        }
    }

    // 读取现有内容
    $lines = [];
    if (file_exists($storagePath)) {
        $lines = file($storagePath, FILE_IGNORE_NEW_LINES);
        
        // 移除重复URL
        $lines = array_filter($lines, function($line) use ($linkFormat) {
            list(, $urlPart) = explode(',', $line, 2);
            return $urlPart !== $linkFormat;
        });
        
        // 重置数组索引
        $lines = array_values($lines);
    }

    // 添加新记录
    $newRecord = '1. '.date("Y-m-d H:i:s").','.$linkFormat;
    $lines[] = $newRecord;

    // 限制记录数量
    if (count($lines) > $RECENT_MAX_NUMBER) {
        $lines = array_slice($lines, -$RECENT_MAX_NUMBER);
    }

    // 写入文件
    $writeResult = file_put_contents(
        $storagePath,
        implode(PHP_EOL, $lines),
        LOCK_EX
    );
    
    if ($writeResult === false) {
        throw new RuntimeException("无法写入文件: $storagePath");
    }

    // 生成导航链接
    $RecentLink = "<a href='{$recentPageUrl}' title='{$TXT->Recent}'>📒</a>&nbsp;&nbsp;";

} catch (Exception $e) {
    // 记录错误但不中断页面加载
    error_log("Recent links error: " . $e->getMessage());
}

?>
