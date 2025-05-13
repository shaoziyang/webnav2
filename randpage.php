<?php
// 配置文件路径
$siteMapPath = __DIR__ . '/sitemap.xml';
$siteMapPath = str_replace('\\', '/', $siteMapPath); // 统一路径分隔符
$baseUrl = dirname($_SERVER['REQUEST_URI']);

try {
    // 文件不存在时跳转
    if (!file_exists($siteMapPath)) {        
        header('Location: ' . $baseUrl, true, 302);
        exit;
    }

    // 加载并验证XML
    $dom = new DOMDocument();
    $dom->strictErrorChecking = true;
    $dom->recover = false; // 禁用错误恢复以确保XML有效性
    
    if (!$dom->load($siteMapPath, LIBXML_NOWARNING | LIBXML_NOERROR)) {
        header('Location: ' . $baseUrl, true, 302);
        exit;
    }

    // 获取所有URL节点
    $urlNodes = $dom->getElementsByTagName('loc');
    
    if ($urlNodes->length === 0) {
        header('Location: ' . $baseUrl, true, 302);
        exit;
    }

    // 随机选择URL
    $randomIndex = random_int(0, $urlNodes->length - 1);
    $randomUrl = $urlNodes->item($randomIndex)->nodeValue;

    // 执行重定向
    header('Location: ' . $randomUrl, true, 302);
    exit;

} catch (Exception $e) {
    exit;
}
?>
