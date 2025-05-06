const holidayStyle = "text-align: center;width: 100%;font-size:1.2em;text-shadow: 1px 1px 2px #888888;padding: 5px;";
const holidayColor1 = 'rgb(0, 120, 220)';
const holidayColor2 = 'rgba(240,0,0,0.7)';
const holidayColor3 = 'rgba(0,240,0,0.5)';

document.write('<div id="holidayCountdown" style="'+holidayStyle+'"></div>');

// 定义节假日列表
const holidays = [
    // 2025年
    { name: "2025年元旦", date: "2025-01-01" },
    { name: "2025年春节", date: "2025-01-29" },
    { name: "2025年清明节", date: "2025-04-05" },
    { name: "2025年劳动节", date: "2025-05-01" },
    { name: "2025年端午节", date: "2025-05-31" },
    { name: "2025年国庆节", date: "2025-10-01" },
    { name: "2025年中秋节", date: "2025-10-06" },

    // 2026年
    { name: "2026年元旦", date: "2026-01-01" },
    { name: "2026年春节", date: "2026-02-17" },
    { name: "2026年清明节", date: "2026-04-05" },
    { name: "2026年劳动节", date: "2026-05-01" },
    { name: "2026年端午节", date: "2026-06-19" },
    { name: "2026年中秋节", date: "2026-09-25" },
    { name: "2026年国庆节", date: "2026-10-01" },

    // 2027年
    { name: "2027年元旦", date: "2027-01-01" },
    { name: "2027年春节", date: "2027-02-06" },
    { name: "2027年清明节", date: "2027-04-05" },
    { name: "2027年劳动节", date: "2027-05-01" },
    { name: "2027年端午节", date: "2027-06-09" },
    { name: "2027年中秋节", date: "2027-09-15" },
    { name: "2027年国庆节", date: "2027-10-01" },

    // 2028年
    { name: "2028年元旦", date: "2028-01-01" },
    { name: "2028年春节", date: "2028-01-26" },
    { name: "2028年清明节", date: "2028-04-04" },
    { name: "2028年劳动节", date: "2028-05-01" },
    { name: "2028年端午节", date: "2028-05-28" },
    { name: "2028年国庆节", date: "2028-10-01" },
    { name: "2028年中秋节", date: "2028-10-03" },

    // 2029年
    { name: "2029年元旦", date: "2029-01-01" },
    { name: "2029年春节", date: "2029-02-13" },
    { name: "2029年清明节", date: "2029-04-04" },
    { name: "2029年劳动节", date: "2029-05-01" },
    { name: "2029年端午节", date: "2029-06-16" },
    { name: "2029年中秋节", date: "2029-09-22" },
    { name: "2029年国庆节", date: "2029-10-01" },

    // 2030年
    { name: "2030年元旦", date: "2030-01-01" },
    { name: "2030年春节", date: "2030-02-03" },
    { name: "2030年清明节", date: "2030-04-05" },
    { name: "2030年劳动节", date: "2030-05-01" },
    { name: "2030年端午节", date: "2030-06-05" },
    { name: "2030年中秋节", date: "2030-09-12" },
    { name: "2030年国庆节", date: "2030-10-01" },

];

function getNearestHoliday() {
    const now = new Date();
    let nearestHoliday = null;
    let nearestDiff = Infinity;

    for (i = 0; i<holidays.length; i++) {
        const holidayDate = new Date(holidays[i].date);
        const diff = holidayDate - now;

        if (diff > 0){
            last = new Date(holidays[i-1].date);
            ldiff = now -last;
            if (ldiff < 24*3600*1000){
                return holidays[i-1];
            }
            else{
                return holidays[i];
            }
        }
    }

    return nearestHoliday;
}

function formatTimeLeft(ms) {
    const days = Math.floor(ms / (24 * 60 * 60 * 1000));
    const daysMs = ms % (24 * 60 * 60 * 1000);
    const hours = Math.floor(daysMs / (60 * 60 * 1000));
    const hoursMs = ms % (60 * 60 * 1000);
    const minutes = Math.floor(hoursMs / (60 * 1000));
    const minutesMs = ms % (60 * 1000);
    const seconds = Math.floor(minutesMs / 1000);

    return `${days}天 ${hours}小时 ${minutes}分钟 ${seconds}秒`;
}

function updateCountdown() {
    const now = new Date();
    const nearestHoliday = getNearestHoliday();
    const holidayDiv = document.getElementById("holidayCountdown");

    if (nearestHoliday) {
        const holidayDate = new Date(nearestHoliday.date);
        if (now.toDateString() === holidayDate.toDateString()) {
            holidayDiv.innerHTML = `<span style='color:${holidayColor1}'><span style='color:${holidayColor2}'>${nearestHoliday.name}</span> 快乐！</span>`;
        } else {
            const timeLeft = holidayDate - now;
            if (timeLeft > 0) {
                holidayDiv.innerHTML = `<span style='color:${holidayColor1}'>距离 <span style='color:${holidayColor2}'>${nearestHoliday.name}</span> 还有：<span style='color:${holidayColor3}'>${formatTimeLeft(timeLeft)}</span></span>`;
            } else {
                holidayDiv.innerHTML = `<span style='color:${holidayColor1}'>庆祝 <span style='color:${holidayColor2}'>${nearestHoliday.name}</span> ！</span>`;
            }
        }
    } else {
        holidayDiv.innerHTML = '没有即将到来的节日';
    }
}

// 每隔一秒更新一次倒计时
setInterval(updateCountdown, 1000);
