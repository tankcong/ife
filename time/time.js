"use strict";

var container = document.getElementById("select-container");
var yearNode = document.getElementById("year-select");
var monthNode = document.getElementById("month-select");
var dayNode = document.getElementById("day-select");
var hourNode = document.getElementById("hour-select");
var minuteNode = document.getElementById("minute-select");
var secondNode = document.getElementById("second-select");
var resultNode = document.getElementById("result-wrapper");

function hhmmss(hour, minute, second) {
    return [hour, minute, second].join(":");
}

function formatDate(date, language) {
    var d = new Date(date);
    var month = '' + (d.getMonth() + 1);
    var day = '' + d.getDate();
    var dayOfWeek = '' + d.getDay();
    var year = d.getFullYear();
    var hour = d.getHours();
    var minute = d.getMinutes();
    var second = d.getSeconds();

    month = append0(month);
    day = append0(day);
    hour = append0(hour);
    minute = append0(minute);
    second = append0(second);
    var weekDay = "";
    if (!language || language === "cn") {
        weekDay = " " + weekDayCn(dayOfWeek) + " ";
        return year + "年" + month + "月" + day + "日" + weekDay + hhmmss(hour, minute, second);
    } else {
        weekDay = " " + weekDayEn(dayOfWeek) + " ";
        return [year, month, day].join('-') + weekDay + hhmmss(hour, minute, second);
    }
}


function append0(num, bits) {
    if (!bits) {
        bits = 2;
    }
    num = num.toString();
    if (num.length < bits) {
        bits = bits - num.length;
        while (bits > 0) {
            num = '0' + num;
            bits--;
        }
        return num;
    }
    return num;
}

function weekDayCn(dayOfWeek) {
    var weekDays = ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    return weekDays[dayOfWeek];
}

function weekDayEn(dayOfWeek) {
    var weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return weekDays[dayOfWeek];
}

/**
 * 显示上方时间区域
 */
function showTime() {
    document.getElementById("time").innerHTML = formatDate(new Date(), "cn") + "<br>" + formatDate(new Date(), "en");
    showResult();
}

/**
 * 创建节点值为value的<option>
 * @param {Number} value 
 */
function createOption(value) {
    var option = document.createElement("option");
    option.value = value;
    option.text = value;
    return option;
}

/**
 * 
 * @param {Number} start 
 * @param {Number} end 
 */
function appendOptionList(parentNode, start, end) {
    parentNode.innerHTML = "";
    for (; start <= end; start++) {
        parentNode.appendChild(createOption(append0(start, 2)));
    }
}

function initOptions() {
    appendOptionList(yearNode, 2001, 2030);
    appendOptionList(monthNode, 1, 12);
    appendOptionList(hourNode, 0, 59);
    appendOptionList(minuteNode, 0, 59);
    appendOptionList(secondNode, 0, 59);
    setDayOptions(dayNode, monthNode.value, yearNode.value);
    showResult();
    container.addEventListener("change", function (event) {
        // TODO 计算时间差
        if (event.target === monthNode) {
            setDayOptions(dayNode, monthNode.value, yearNode.value);
        }
        showResult();
    });

}

function setDayOptions(dayNode, month, year) {
    var end = 1;
    var value = dayNode.value;
    month = Number(month);
    year = Number(year);
    if (month === 1 || month === 3 || month === 5 || month === 7 || month === 8 || month === 10 || month === 12) {
        end = 31;
    } else if (month === 2) {
        if (isLeapYear(year)) {
            end = 29;
        } else {
            end = 28;
        }
    } else {
        end = 30;
    }
    appendOptionList(dayNode, 1, end);
    if (value > end) {
        dayNode.value = end;
    } else {
        dayNode.value = value;
    }
}

/**
 * 判断是否为闰年 
 * @param {Number} year 
 */
function isLeapYear(year) {
    return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);
}

/**
 * @returns {Date} time
 */
function selectedTime() {
    var year = yearNode.value;
    var month = monthNode.value - 1;
    var day = dayNode.value;
    var hour = hourNode.value;
    var minute = minuteNode.value;
    var second = secondNode.value;
    return new Date(year, month, day, hour, minute, second);
}

function showResult() {
    var selected = selectedTime();
    var current = new Date();
    var time = (current - selected) / 1000;
    var period = time > 0 ? "已经过去" : "还有";

    var day = Math.floor(time / 86400);
    var hour = Math.floor((time / 3600) % 24);
    var minute = Math.floor((time / 60) % 60);
    var second = Math.floor(time % 60);
    var gap = day + "天" + hour + "小时" + minute + "分" + second + "秒";
    resultNode.innerHTML = "现在距离  " + formatDate(selectedTime(), "cn") + period + gap;
}


window.onload = function () {
    initOptions();
    showTime();
    setInterval(showTime, 1000);
};