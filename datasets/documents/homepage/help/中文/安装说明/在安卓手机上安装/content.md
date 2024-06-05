# 在安卓手机📱上安装

在安卓手机上运行随心导航，可以作为随身服务器，小巧方便，随处可用。如果配合可道云、Alist等软件，会更加方便。基本原理就是先在安卓手机上安装 apache / php 服务器，然后再使用[随心导航](https://github.com/shaoziyang/webnav2)系统。实现方式有多种，下面介绍使用开源的 termux 进行安装的方法： 

- 先安装 [Termux](https://termux.dev/en/)
	- 正常情况需要安卓7.0以上版本，安卓5/6上参考[官方wiki说明](https://github.com/termux/termux-app/wiki/Termux-on-android-5-or-6)进行安装
	- 安装后先进行更新和升级
```
apt update
apt upgrade
```
  - 如果下载速度较慢，可以换源 `termux-change-repo`
- 在 Termux 中安装 ssh，方便通过远程访问（主要是为了在pc上输入命令）
	- `apt install openssh`
	- 配置 openssh
		- 用 `ssh-keygen -A` 生成ssh密钥
		- 运行 `sshd`，如果可以成功启动就说明安装成功
	- 用 `whoami` 查看用户名并记录（termux中不能修改和添加用户）
	- 用 `passwd` 设置密码
	- 在 pc 上使用 mobaxterm/putty 等软件用上面的用户名和密码通过 ssh 远程连接（注意默认端口号是 8022 而不是 22），后面就不用在手机上输入命令了。
- 在 Termnux 中安装系统服务，方便管理，而且运行 Termux 后可以自动启动相关服务。
	- `apt install runit termux-services busybox`，安装后需要重新启动一次 termux （退出后重新运行），才能使服务功能生效
	- 启用 sshd 服务：`sv up sshd`
	- 自动启动 sshd：`sv-enable sshd`
- 安装 apache2 服务器
	- 安装：`apt install apache2`
	- 配置：`nano $PREFIX/etc/apache2/httpd.conf`，设置`DocumentRoot`、`Listen` 等参数，注意在没有 root 情况下，端口号要大于 1000。
	- 启动服务器：`httpd`
	- 其它：
		- 启动httpd系统服务：`sv up httpd`
		- 自动启动系统服务：`sv-enable httpd`
		- 停止httpd服务：`sv down httpd`
- 安装 php
	- `apt install php php-apache php-fpm`
	- 通常不用修改参数，如果需要修改参数，运行：`nano $PREFIX/lib/php.ini`
- 再次配置 apache：`nano $PREFIX/etc/apache2/httpd.conf`
	- 载入 php 解释器（添加一行）：`LoadModule php_module libexec/apache2/libphp.so`
	- 添加 php 文件支持（添加一行）：`AddType application/x-httpd-php .php`
	- 添加 php 文件名解析，找到`<IfModule dir_module>`，在 index.html 后添加 `index.php`：
```
<IfModule dir_module>
    DirectoryIndex index.html index.php
</IfModule>
```
	- 重启httpd服务 `sv restarrt httpd`
- 解压并复制**随心远航**系统到 apache2 服务器的文件目录下（`DocumentRoot` 中设定的目录）
- 运行浏览器，打开**随心远航**对应网址，进行参数配置

---

⚡
- 可以通过 tailscale 等软件实现设备间通过设备名称方式访问（MagicDNS）和跨网络访问，避免网络变化时带来的不便。
- 可以通过 cpolar / frp 等软件实现内网穿透，实现广域网访问。
