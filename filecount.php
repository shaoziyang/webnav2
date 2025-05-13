<?php
// 数据文件路径处理
$datafile = str_replace('\\', '/', dirname(__FILE__) . "/datasets/documents/homepage/statistics.txt");

// 初始化默认数据
$documentCount = 0;
$imageCount = 0;
$lastUpdateTime = 0;
$updateRequired = false;

// 读取数据文件并验证
if (file_exists($datafile)) {
    $fileContent = file($datafile, FILE_IGNORE_NEW_LINES);
    
    if (!empty($fileContent)) {
        $dataParts = explode('||', $fileContent[0]);
        
        if (count($dataParts) >= 2) {
            $documentCount = (int)$dataParts[0];
            $imageCount = (int)$dataParts[1];
            $lastUpdateTime = isset($dataParts[2]) ? (int)$dataParts[2] : 0;
        } else {
            $updateRequired = true;
        }
    } else {
        $updateRequired = true;
    }
} else {
    $updateRequired = true;
}

// 格式化显示数字
$pagenumber = sprintf('📝 <b>%d</b> 🖼️ <b>%d</b>', $documentCount, $imageCount);

// 判断是否需要更新
$shouldUpdate = $updateRequired || (time() - $lastUpdateTime > 300);

// 输出JavaScript变量
echo "<script>SXYH_FLAG_UPDATE_FILECOUNT = " . ($shouldUpdate ? '1' : '0') . ";</script>";
?>
