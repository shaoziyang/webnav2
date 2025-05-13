// 字符串处理工具
const StringUtils = {
    // 在指定位置插入字符串
    insert(str, index, insertStr) {
        return str.substring(0, index) + insertStr + str.substring(index);
    },
    
    // 左侧补零
    padLeft(num, length) {
        return (Array(length).join('0') + num).slice(-length);
    },
    
    // 解码HTML实体
    decodeHtmlEntities(encodedString) {
        const textArea = document.createElement('textarea');
        textArea.innerHTML = encodedString;
        return textArea.value;
    }
};

// URL路径工具
const PathUtils = {
    // 获取主机名
    getHostName() {
        const url = window.location.href;
        let position = -1;
        let count = 0;

        for (let i = 0; i < url.length; i++) {
            if (url[i] === '/') {
                count++;
                if (count === 3) {
                    position = i;
                    break;
                }
            }
        }

        return position === -1 ? "" : url.substr(0, position + 1);
    },

    // 获取文档路径
    DOC_PATH() {
        let pathname = document.location.pathname;
        if (pathname.substr(-1) !== '/') pathname += '/';
        const index = pathname.substr(1).indexOf("/");
        return StringUtils.insert(pathname, index + 1, '/datasets/documents');
    },

    // 获取应用路径
    APP_PATH() {
        const pathname = document.location.pathname;
        const index = pathname.substr(1).indexOf("/");
        return pathname.substr(0, index + 2);
    },

    // 获取主页路径
    getHomePath() {
        return this.APP_PATH() + 'datasets/documents/';
    },

    // 获取图片路径
    getImagePath() {
        return this.getHomePath() + 'homepage/config/images/';
    },

    // 获取JavaScript路径
    getJsPath() {
        return this.getHomePath() + 'homepage/config/javascript/';
    }
};

// HTTP请求工具
const HttpUtils = {
    // 发送异步POST请求
    async post(url) {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.text();
        } catch (error) {
            console.error('Fetch error:', error);
            throw error;
        }
    }
};

// 随机数生成器
const RandomUtils = {
    // 生成基于日期的随机数
    randintDay() {
        const D1 = new Date('2000-01-01');
        const D2 = new Date();
        let n = Math.floor((D2 - D1) / (1000 * 60 * 60 * 24)); // 获取日期差
        
        // 迭代5次生成更随机的数
        for (let i = 0; i < 5; i++) {
            n = (31415 * (n % 0xffff) + (n >> 16) + 31) % 0xfffffff;
        }
        
        return n;
    }
};

// DOM操作工具
const DomUtils = {
    // 在文档中写入内容
    write(content) {
        document.write(content);
    },
    
    // 获取DOM元素
    getElement(id) {
        return document.getElementById(id);
    }
};

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// 导航栏显示功能
async function SXYH_ShowNav(file = '', title = '') {
    DomUtils.write(`<div id="SXYH_NAV_${file}"></div>`);
    try {
        await delay(100);
        const response = await HttpUtils.post(`${PathUtils.APP_PATH()}custom.php?cmd=NAV&file=${file}`);
        const navItems = JSON.parse(response);
        const navElement = DomUtils.getElement(`SXYH_NAV_${file}`);
        let html = '';
        
        if (title) {
            html += `<span class="sxyh_nav_Title">${title}</span>`;
        }
        
        html += '<table cellpadding="0" cellspacing="0"><tr class="no-border"><td width="48" class="sxyh_nav_td">';
        
        navItems.forEach((item, index) => {
            if (item.length < 1) return;
            
            const [text, link = '', tip = '', style = ''] = item;
            
            if (item.length < 2 || index === 0 || link.indexOf('/') === -1) {
                const categoryStyle = style === '' && tip === '' && link !== '' ? link : style;
                html += `</td></tr><tr class="no-border"><td class="sxyh_nav_td"><span class="sxyh_nav_category" title="${tip}" style="${categoryStyle}">${text}</span></td><td class="sxyh_nav_td">`;
            } else {
                const resolvedLink = link.replace('{{APP_PATH}}', PathUtils.APP_PATH())
                                         .replace('{{DOC_PATH}}', PathUtils.DOC_PATH());
                html += `<div class="sxyh_nav_container"><a class="sxyh_nav_link" href="${resolvedLink}" onclick="openUrlWithNewWindow('${resolvedLink}');return false;" title="${tip}" style="${style}">${text}</a></div>`;
            }
        });
        
        html += '</td></tr></table>';
        navElement.innerHTML = html;
    } catch (error) {
        console.error('Error parsing navigation data:', error);
    }
}

// 搜索框显示功能
async function SXYH_ShowSearch(file = '', title = '') {
    DomUtils.write(`<div id="SXYH_SEARCH_${file}"></div>`);
    try {
        await delay(200);
        const response = await HttpUtils.post(`${PathUtils.APP_PATH()}custom.php?cmd=SEARCH&file=${file}`);
        const searchItems = JSON.parse(response);
        const searchElement = DomUtils.getElement(`SXYH_SEARCH_${file}`);
        let html = '';
        
        if (title) {
            html += `<span class="sxyh_search_Title">${title}</span>`;
        }
        
        searchItems.forEach((item, index) => {
            if (item.length < 1) return;
            
            const [v0, v1 = '', v2 = '', v3 = '', v4 = ''] = item;
            const vid = `SearchInput${index}`;
            
            if ((v1.indexOf('://') === -1) || (index === 0)) {
                html += `<div class="sxyh_search_category"><span class="sxyh_search_category" style="${v4}">${v0}</span></div>`;
            } else {
                html += `<div class="sxyh_search_container"><form onclick="return false"><input class="sxyh_search_input browser-default" style="${v3}" type="text" id="${vid}" placeholder="${v2}"> <button class="sxyh_search_button" style="${v4}" onclick="openUrlWithQuery('${v1}' , '${vid}')">${v0}</button></form></div>`;
            }
        });
        
        searchElement.innerHTML = html;
    } catch (error) {
        console.error('Error parsing search data:', error);
    }
}

// 每日格言显示功能
async function SXYH_ShowDailyMotto(style = "") {
    DomUtils.write('<div class="SXYH_divDiaryMotto" id="SXYH_DAILYMOTTO"></div>');
    try {
        await delay(300);
        const response = await HttpUtils.post(`${PathUtils.APP_PATH()}custom.php?cmd=DAILYMOTTO`);
        const mottoItems = JSON.parse(response);
        const mottoElement = DomUtils.getElement("SXYH_DAILYMOTTO");
        let motto = 'Nothing is impossible';
        let hint = '没有什么是不可能的';
        let mottoStyle = style;
        
        if (mottoItems.length > 1) {
            const dailyIndex = RandomUtils.randintDay() % (mottoItems.length - 1);
            const dailyMotto = mottoItems[dailyIndex];
            
            if (dailyMotto.length > 0) motto = dailyMotto[0];
            if (dailyMotto.length > 1) hint = dailyMotto[1];
            if (dailyMotto.length > 2) mottoStyle = dailyMotto[2];
        }
        
        mottoElement.innerHTML = `<span class="SXYH_DiaryMotto" style="${mottoStyle}" title="${hint}">${motto}</span>`;
    } catch (error) {
        console.error('Error parsing daily motto data:', error);
    }
}

// 设置壁纸功能
async function SXYH_setwallpaper(img = "", opacity = 0.8, size = "cover") {
    const v = StringUtils.decodeHtmlEntities(img).replace(/\\/g, "/");
    
    // 根据不透明度确定遮罩层
    let opacityFile = '';
    switch (Math.floor(opacity * 10)) {
        case 9: opacityFile = 'opacity_90.png'; break;
        case 8: opacityFile = 'opacity_80.png'; break;
        case 7: opacityFile = 'opacity_70.png'; break;
        case 6: opacityFile = 'opacity_60.png'; break;
        case 5: opacityFile = 'opacity_50.png'; break;
        case 4: opacityFile = 'opacity_40.png'; break;
        case 3: opacityFile = 'opacity_30.png'; break;
        case 2: opacityFile = 'opacity_20.png'; break;
        case 1: opacityFile = 'opacity_10.png'; break;
        case 0: opacityFile = ''; break;
        default: return;
    }
    
    const opacityUrl = opacityFile ? `url(${PathUtils.APP_PATH()}scripts/${opacityFile}),` : '';
    
    if (v === "" || ["RANDOM", "DAY", "BING", "BING_AUTOSAVE"].includes(v)) {
        try {
            const response = await HttpUtils.post(`${PathUtils.APP_PATH()}custom.php?cmd=IMAGE_OF_${v || "RANDOM"}`);
            const imageUrl = response.indexOf('://') === -1 ? PathUtils.getImagePath() + response : response;
            document.body.style.background = `${opacityUrl}url(${imageUrl}) no-repeat fixed center`;
            document.body.style.backgroundSize = size;
            SXYH_WALLPAPER_CURRENT = response;
        } catch (error) {
            console.error('Error setting wallpaper:', error);
        }
    } else {
        let imageUrl = "";
        if (v.substr(0, '{{IMG_LIB}}'.length) === '{{IMG_LIB}}') {
            imageUrl = PathUtils.getImagePath() + v.substr('{{IMG_LIB}}'.length);
        } else if (v.indexOf("/") > -1) {
            imageUrl = v;
        } else {
            imageUrl = PathUtils.DOC_PATH() + v;
        }
        
        document.body.style.background = `${opacityUrl}url(${imageUrl}) no-repeat fixed center`;
        document.body.style.backgroundSize = size;
        SXYH_WALLPAPER_CURRENT = imageUrl;
    }
}

// 获取图片路径功能
async function SXYH_getimage(img = "") {
    const v = StringUtils.decodeHtmlEntities(img).replace(/\\/g, "/");
    
    if (v === "" || ["RANDOM", "DAY", "BING", "BING_AUTOSAVE"].includes(v)) {
        try {
            const response = await HttpUtils.post(`${PathUtils.APP_PATH()}custom.php?cmd=IMAGE_OF_${v || "RANDOM"}`);
            const imageUrl = response.indexOf('://') === -1 ? PathUtils.getImagePath() + response : response;
            console.log(imageUrl);
            return imageUrl;
        } catch (error) {
            console.error('Error getting image:', error);
            throw error;
        }
    } else {
        let imageUrl = "";
        if (v.substr(0, '{{IMG_LIB}}'.length) === '{{IMG_LIB}}') {
            imageUrl = PathUtils.getImagePath() + v.substr('{{IMG_LIB}}'.length);
        } else if (v.indexOf("/") > -1) {
            imageUrl = v;
        } else {
            imageUrl = PathUtils.DOC_PATH() + v;
        }
        
        return imageUrl;
    }
}

// 显示图片库功能
async function SXYH_ShowImageLibrary(title = '', showfilename = true) {
    DomUtils.write('<div>');
    if (title) {
        DomUtils.write(`<span class="sxyh_nav_Title">${title}</span>`);
    }
    DomUtils.write('<div id="SXYH_ImageLibrary"></div></div>');
    try {
        const response = await HttpUtils.post(`${PathUtils.APP_PATH()}custom.php?cmd=IMAGE_LIBRARY`);
        const imageList = JSON.parse(response);
        const imageElement = DomUtils.getElement("SXYH_ImageLibrary");
        let html = '';
        
        imageList.forEach((image, index) => {
            const tip = `Title="${index + 1}/${imageList.length} ${image}"`;
            html += `<a class="SXYH_imageLibrary" target="_blank" href="${PathUtils.getImagePath() + image}" ${tip}><img width="240" border="8" style="border-color:#E5A032;border-style:ridge;" src="${PathUtils.getImagePath() + image}" ${tip}>`;
            
            if (showfilename) {
                html += `<span class="SXYH_imageLibraryFileName"><b>${index + 1}</b> - [ ${image} ]</span>`;
            }
            
            html += `</a>`;
        });
        
        imageElement.innerHTML = html;
    } catch (error) {
        console.error('Error parsing image library data:', error);
    }
}

// 加载JavaScript功能
async function SXYH_js(filename) {
    const v = StringUtils.decodeHtmlEntities(filename.toUpperCase()).replace(/\\/g, "/");
    
    if (["RANDOM", "DAY"].includes(v)) {
        try {
            const response = await HttpUtils.post(`${PathUtils.APP_PATH()}custom.php?cmd=JS_OF_${filename}`);
            const script = document.createElement('script');
            script.src = PathUtils.getJsPath() + response;
            document.body.appendChild(script);
            SXYH_JS_CURRENT = response;
        } catch (error) {
            console.error('Error loading JavaScript:', error);
        }
    } else {
        const scriptUrl = filename.indexOf('://') === -1 ? PathUtils.getJsPath() + filename : filename;
        DomUtils.write(`<script src="${scriptUrl}"></script>`);
        SXYH_JS_CURRENT = scriptUrl;
    }
}

// 显示新内容功能
async function SXYH_new_content() {
    DomUtils.write('<span id="SXYH_NEW_CONTENT_LIST"> </span>');
    try {
        const response = await HttpUtils.post(`${PathUtils.APP_PATH()}custom.php?cmd=NEW`);
        if (!response) return;
        const items = response.split('|');
        let html = '';
        
        items.forEach(item => {
            const [text, link] = item.split(',');
            if (link) {
                html += `<li> ${text}, <a href="${link}">${link}</a></li>`;
            }
        });
        
        const element = DomUtils.getElement("SXYH_NEW_CONTENT_LIST");
        element.innerHTML = `<ol type="1">${html}</ol>`;
    } catch (error) {
        console.error('Error parsing new content data:', error);
    }
}

// 打开带查询参数的URL
function openUrlWithQuery(url, id) {
    const inputValue = document.getElementById(id).value;
    const queryUrl = url.indexOf("%1") > -1 
        ? url.replace("%1", encodeURI(inputValue)) 
        : url + encodeURIComponent(inputValue);
    
    window.open(queryUrl);
}

// 在新窗口打开URL
function openUrlWithNewWindow(url) {
    window.open(url);
}

// 显示图片
function showimage(img, width) {
    const fn = PathUtils.DOC_PATH() + img;
    DomUtils.write(`<a href="${fn}"><img src="${fn}" width="${width}"></a>`);
}

// 更新文件计数
async function update_filecount() {
    if (window.SXYH_FLAG_UPDATE_FILECOUNT) {
        window.SXYH_FLAG_UPDATE_FILECOUNT = 0;
        try {
            await HttpUtils.post(`${PathUtils.APP_PATH()}updatefilecount.php?cmd=update`);
        } catch (error) {
            console.error('Error updating file count:', error);
        }
    }
}

// 初始化调用
update_filecount();    