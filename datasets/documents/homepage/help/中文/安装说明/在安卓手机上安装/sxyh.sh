#!/data/data/com.termux/files/usr/bin/sh

echo "\n检测 termux-services 是否安装"
if ! command -v sv >/dev/null 2>&1; then
    echo "未检测到 termux-services，正在安装..."
    pkg update -y && pkg install -y termux-services

    echo "\n安装完成，请手动重启 Termux 以应用配置（在应用管理中强制停止 Termux, 然后重新打开）"
    read key
    pkill -f termux
else
    echo "\ntermux-services 已安装"
fi

echo "\n安装 python 和 wget\n"
apt install -y python wget || { echo "安装失败！请检查网络状态。"; exit 1; }

echo "\n部署 apache/php 服务器，并安装随心远航系统\n"

wget -O $PREFIX/tmp/sxyh.py https://gitee.com/shaoziyang/webnav2/raw/main/datasets/documents/homepage/help/中文/安装说明/在安卓手机上安装/sxyh.py
python $PREFIX/tmp/sxyh.py
