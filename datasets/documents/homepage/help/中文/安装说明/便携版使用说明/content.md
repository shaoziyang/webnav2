# 🖫便携版使用说明

便携版是使用了类似 portable app 的方式，将 windows 版本（64位）的迷你（精简） Apache2、php 服务器软件和随心远航系统打包在一起，可以放在U盘、移动硬盘等设备中使用。

使用时，只需要将文件解压缩并复制到任意目录，然后运行其中的 `sxyhPortable.exe`。

此便携版本默认全部使用了 64 位程序，如果需要使用 32 位版本程序（例如在 32 位 windows 上运行），请自行替换软件和扩展模块为 32 位版本。


## 便携版软件目录结构

```
便携版软件目录
    |
    |--  home              用户主页
    |      |--  nav2       随心远航系统
    |      
    |--  server            服务器软件目录
    |      |--  a2.4.57_p8.2.10  迷你服务器（ Apache 2.4.57 + php 8.2.10 ）
    |            |--  conf       apache2 服务器配置
    |            |--  logs       apache2 日志文件
    |            |--  tmp        服务器临时文件目录
    |            |--  modules    apache 的 模块
    |            |--  php        php 软件目录
    |                  |--  ext  php 的模块
    |
    |--  sxyhPortable.exe，便携软件主文件
    |--  sxyhPortable.ini，便携软件配置


```

## 便携软件配置

便携版软件的配置在文件`sxyhPortable.ini`中，是一个标准的ini文件，用任意文本编辑器打开它就可以设置。主要配置参数如下：

```
[server]
apache=server\a2.4.57_p8.2.10\httpd.exe

[browser]
app=..\tools\SeaMonkeyPortable\SeaMonkeyPortable.exe
;app=
open_browser=1
```

- `[server]` 下的 `apache=server\a2.4.57_p8.2.10\httpd.exe` 设置 apache 服务器的主文件名，这里需要使用相对路径。如果改变了服务器目录，需要将这个参数做对应修改。
    - 可以存放多个不同版本服务器软件在 server 目录下的不同子目录，通过 ini 文件快速切换。
- `[browser]` 下的 `app=..\tools\SeaMonkeyPortable\SeaMonkeyPortable.exe` 设置浏览器文件名，通常指定一个和便携版软件在相同磁盘的便携版浏览器，如SeaMonkeyPortable、FirefoxPortable、EdgePortable、百分浏览器等。如果不指定文件名，将使用系统默认浏览器。
- `[browser]` 下的 `open_browser` 代表是否在软件运行时自动打开上面设置的浏览器，如果是 1 将打开浏览器，如果是 0 将不打开。

## 服务器配置

### apache2

Apache2 服务器的配置方法和正常一样，因为只保留了最基本的文件和模块，所有配置也更加简单，只需要配置很少几个参数。Apache2 的配置文件在 `server\a2.4.57_p8.2.10\conf\httpd.conf`。

- `Listen 8800`，配置端口号，默认使用了 8800，可以修改为不与系统冲突的任意有效端口号。
- `DocumentRoot ../../home`，设置服务器主页目录。
- `LoadModule php_module php/php8apache2_4.dll`，指定 php 模块对应的 DLL 文件。


其它参数可以参考 apache 软件的文档。


### php

php 软件在 `server\a2.4.57_p8.2.10\php` 下，配置文件是 `server\a2.4.57_p8.2.10\php\php.ini`。

一般情况下，不需要修改 `php.ini` 就能正常使用。如果需要增加或修改扩展模块，可以将文件复制到 `php\ext` 目录下，然后在 `php.ini` 中添加或修改 `extension=xxxx`。

## 升级服务器软件

Apache2 和 PHP 软件都会定期更新，可以自行下载最新的服务器软件，提取其中相应的文件，替换旧版本文件，就可以完成升级。

- [Apache2](https://httpd.apache.org/) 的官网不直接提供编译后的二进制文件，升级的一种方式是自行编译源码，另一种方式是从第三方网站下载。官网推荐的下载网站有：
    - [ApacheHaus](https://www.apachehaus.com/cgi-bin/download.plx)
    - [Apache Lounge](https://www.apachelounge.com/download/)
    - [Bitnami WAMP Stack](https://bitnami.com/stack/wamp)
    - [WampServer](https://www.wampserver.com/)
    - [XAMPP](https://www.apachefriends.org/en/xampp.html)
- [PHP](https://php.net/) 在官网就可以直接下载升级文件。PHP 分为 `Non Thread Safe` 和 `Thread Safe` 版本，通常 Apache2 使用 Thread Safe 版本。


**注**
- 迷你服务器借鉴了 [dokuwiki](https://download.dokuwiki.org/) 中的 MicroApache 服务器，更新和增加了部分文件。
