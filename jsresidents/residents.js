/*jshint strict:false */
"use strict";
var inputA = document.querySelector("#num-a");
var inputB = document.querySelector("#num-b");
var result = document.querySelector("#result-0");
var currentRadio = document.querySelector("#radio-a").value;

function isNum(num) {
    return !isNaN(Number(num)) && parseFloat(num).toString() !== "NaN";
}

function checkInputs() {
    if (!isNum(inputA.value) || !isNum(inputB.value)) {
        result.innerHTML = "";
        return false;
    } else {
        return true;
    }
}

document.getElementById("code-0")
    .addEventListener("change", function (evt) {
        var target = evt.target;
        if (target.type === "radio") {
            currentRadio = target.value;
        }
    });

document.querySelectorAll("button")[0]
    .addEventListener("click", function () {
        switch (currentRadio) {
            case "a":
                result.innerHTML = inputA.value.toString() + (isNum(inputA.value) ? "是" : "不是") + "数字";
                break;
            case "b":
                result.innerHTML = inputB.value.toString() + (isNum(inputB.value) ? "是" : "不是") + "数字";
                break;
            default:
                break;
        }
    });

document.querySelectorAll("button")[1]
    .addEventListener("click", function () {
        if (checkInputs()) {
            result.innerHTML = Number(inputA.value).toFixed(Number(inputB.value));
        }
    });

document.querySelectorAll("button")[2]
    .addEventListener("click", function () {
        if (checkInputs()) {
            switch (currentRadio) {
                case "a":
                    result.innerHTML = Math.abs(Number(inputA.value));
                    break;
                case "b":
                    result.innerHTML = Math.abs(Number(inputB.value));
                    break;
                default:
                    break;
            }
        }
    });

document.querySelectorAll("button")[3]
    .addEventListener("click", function () {
        if (checkInputs()) {
            switch (currentRadio) {
                case "a":
                    result.innerHTML = Math.ceil(Number(inputA.value));
                    break;
                case "b":
                    result.innerHTML = Math.ceil(Number(inputB.value));
                    break;
                default:
                    break;
            }
        }
    });

document.querySelectorAll("button")[4]
    .addEventListener("click", function () {
        if (checkInputs()) {
            switch (currentRadio) {
                case "a":
                    result.innerHTML = Math.floor(Number(inputA.value));
                    break;
                case "b":
                    result.innerHTML = Math.floor(Number(inputB.value));
                    break;
                default:
                    break;
            }
        }
    });

document.querySelectorAll("button")[5]
    .addEventListener("click", function () {
        if (checkInputs()) {
            switch (currentRadio) {
                case "a":
                    result.innerHTML = Math.round(Number(inputA.value));
                    break;
                case "b":
                    result.innerHTML = Math.round(Number(inputB.value));
                    break;
                default:
                    break;
            }
        }
    });

document.querySelectorAll("button")[6]
    .addEventListener("click", function () {
        if (checkInputs()) {
            result.innerHTML = Math.max(Number(inputA.value), Number(inputB.value));
        }
    });

document.querySelectorAll("button")[7]
    .addEventListener("click", function () {
        if (checkInputs()) {
            result.innerHTML = Math.min(Number(inputA.value), Number(inputB.value));
        }
    });