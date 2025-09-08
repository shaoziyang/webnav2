import subprocess
import sys, os, time

HTTPD_CONF = "/data/data/com.termux/files/usr/etc/apache2/httpd.conf"

HTTPD_PORT = "8100"
HTTPD_ROOT = "/data/data/com.termux/files/home/www"

def run_external_command(cmd):
    """
    运行外部命令，打印输出，判断是否出错
    :param cmd: 命令，可以是字符串或列表
    """
    try:
        # 运行命令，捕获 stdout 和 stderr，实时输出到终端
        result = subprocess.run(
            cmd,
            shell=True,                   # 如果 cmd 是字符串，需 shell=True
            check=False,                  # 不自动抛出异常，手动判断
            stdout=subprocess.PIPE,       # 捕获标准输出
            stderr=subprocess.STDOUT,     # 将错误输出合并到 stdout
            text=True,                    # 返回字符串而非 bytes
            encoding='utf-8'              # 指定编码（避免中文乱码）
        )

        # 实时打印输出（虽然 run 是结束后才拿到，但可以一次性打印）
        print(result.stdout)

        # 判断是否出错
        if result.returncode == 0:
            print(f"命令运行成功\n")
            return True
        else:
            print(f"程序运行失败，返回码: {result.returncode}")
            sys.exit(1)
            return False

    except FileNotFoundError:
        print(f"命令未找到: {cmd}")
        sys.exit(1)
        return False
    except Exception as e:
        print(f"运行出错: {e}")
        sys.exit(2)
        return False

def lines_find_from_index(lines, str, start_index=0):
    try:
        # 从 start_index 开始遍历
        first_index = next(
            i for i, line in enumerate(lines[start_index:], start=start_index)
            if line.startswith(str)
        )
        return first_index
    except StopIteration:
        return None

def config_httpd():
    try:
        print("打开配置文件", HTTPD_CONF)
        with open(HTTPD_CONF, 'rt') as f:
            buf = f.readlines()

        print("  修改端口")
        index = lines_find_from_index(buf, 'Listen ')
        if index == None:
            print("    未找到 Listen 项，在文件末尾添加设置")
            buf.append("Listen " + HTTPD_PORT)
        else:
            print(f"    在第 {index} 行找到 Listen")
            if buf[index] != f"Listen {HTTPD_PORT}\n":
                print("    修改为", HTTPD_PORT)
                buf[index] = f"Listen {HTTPD_PORT}\n"
            else:
                print(f"    端口已设置为 {HTTPD_PORT}，不做修改")

        print("  修改 DocumentRoot")
        index = lines_find_from_index(buf, "DocumentRoot ")
        if index == None:
            pass
        else:
            print(f"    在第 {index} 行找到 DocumentRoot")
            if buf[index] != f'DocumentRoot "{HTTPD_ROOT}"\n':
                print("    修改为", HTTPD_ROOT)
                buf[index] = f'DocumentRoot "{HTTPD_ROOT}"\n'
                print("    设置 Directory 属性")
                dindex = lines_find_from_index(buf, "<Directory ", index)
                if dindex != None:
                    buf[dindex] = f'<Directory "{HTTPD_ROOT}">\n'
                    _index = lines_find_from_index(buf, '    Options', dindex)
                    if _index:
                        buf[_index] = '    Options -Indexes +FollowSymLinks\n'
                    _index = lines_find_from_index(buf, '    AllowOverride', dindex)
                    if _index:
                        buf[_index] = '    AllowOverride All\n'
                    _index = lines_find_from_index(buf, '    Require', dindex)
                    if _index:
                        buf[_index] = '    Require all granted\n'
                else:
                    buf.insert(index+1, f'<Directory "{HTTPD_ROOT}">\n')
                    buf.insert(index+2, '    Options -Indexes +FollowSymLinks\n')
                    buf.insert(index+2, '    AllowOverride All\n')
                    buf.insert(index+2, '    Require all granted\n')
                    buf.insert(index+2, '</Directory>\n')
            else:
                print("    DocumentRoot 已经设置，不做修改")

        print("  启用 mpm_prefork_module")
        index = lines_find_from_index(buf, "#LoadModule mpm_prefork_module libexec/apache2/mod_mpm_prefork.so")
        if index:
            buf[index] = "LoadModule mpm_prefork_module libexec/apache2/mod_mpm_prefork.so\n"

        print("  注释 mpm_worker_module")
        index = lines_find_from_index(buf, "LoadModule mpm_worker_module libexec/apache2/mod_mpm_worker.so")
        if index:
            buf[index] = "#LoadModule mpm_worker_module libexec/apache2/mod_mpm_worker.so\n"

        print("  启用 rewrite_module")
        index = lines_find_from_index(buf, "#LoadModule rewrite_module libexec/apache2/mod_rewrite.so")
        if index:
            buf[index] = "LoadModule rewrite_module libexec/apache2/mod_rewrite.so\n"

        print("  添加 php_module")
        _index = lines_find_from_index(buf, "LoadModule php_module libexec/apache2/libphp.so")
        if _index == None:
            buf.insert(index+1, "LoadModule php_module libexec/apache2/libphp.so\n")

        print("  添加 index.php 到 DirectoryIndex")
        index = lines_find_from_index(buf, "    DirectoryIndex index.html")
        if index != None:
            buf[index] = "    DirectoryIndex index.html index.php\n"

        print("  添加 php 类型到 mime_module")
        index = lines_find_from_index(buf, "    AddType application/x-httpd-php .php")
        if index == None:
            _index = lines_find_from_index(buf, "    AddType application/x-gzip .gz .tgz")
            buf.insert(_index+1, "    AddType application/x-httpd-php .php\n")

        print("保存修改到配置文件")
        with open(HTTPD_CONF, 'wt') as f:
            f.write(''.join(buf))

        print("\n")

    except Exception as e:
        print(f"配置 apache2 失败: {e}")
        sys.exit(3)

def get_ip(link='wlan0'):
    r = os.popen('ifconfig').readlines()
    index = lines_find_from_index(r, link+': ')
    if index != None:
        index = lines_find_from_index(r, '        inet ', index+1)
        if index != None:
            return r[index].split()[1]
    return None

print("\n")
print("+-------------------------------+")
print("| 即将安装随心远航系统到 termux |")
print("+-------------------------------+")
print("\n")

print("请确认预先安装好系统服务：termux-services、python、wget等软件，注意安装 termux-services 后需要退出 termux 后重新运行才能使其生效。\n")
print("\n请按回车键继续运行\n")
input()

print("1. 安装 apache2、php 和 php-apache\n")
run_external_command("apt-get install -y apache2 php php-apache")

print("2. 配置 apache2\n")
config_httpd()

print("3. 安装随心远航系统\n")

if os.path.isdir(HTTPD_ROOT+'/nav2'):
    print(f"  目录 {HTTPD_ROOT}'/nav2' 已存在，跳过文件下载步骤\n")
else:
    print("  从 gitee 下载随心远航系统\n")
    run_external_command("wget -O $HOME/nav2.zip https://gitee.com/shaoziyang/webnav2/repository/archive/main.zip")
    print(f"  解压缩下载的文件到 {HTTPD_ROOT}\n")
    run_external_command(f"unzip $HOME/nav2.zip webnav2-main/* -d {HTTPD_ROOT}")
    print(f"  目录改名为 {HTTPD_ROOT}/nav2")
    run_external_command(f"mv {HTTPD_ROOT}/webnav2-main {HTTPD_ROOT}/nav2")

print("4. 启动 apache2 服务\n")
run_external_command("sv-enable httpd")
time.sleep(2)
run_external_command("sv down httpd")
time.sleep(2)
run_external_command("sv up httpd")

print("\n随心远航系统已经成功安装")
print("\n========================")

ip = get_ip()

if ip:
    url = f"http://{ip}:{HTTPD_PORT}/nav2"
else:
    url = f"如 http://192.168.1.100:8100/nav2"

print(f"\n请打开浏览器，输入手机的ip地址和端口号（{url}），进行参数设置。推荐先安装 tailscale 并登录，就可以使用设备名加端口号访问，而不用担心 ip 地址的变化了。")
