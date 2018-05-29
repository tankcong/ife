"use strict";

var postfixList = ['163.com', 'gmail.com', '126.com', 'qq.com', '263.net'];
var inputNode = document.getElementById("email-input");
var hintNode = document.getElementById("email-sug-wrapper");
var selectedLiIndex = -1;

window.onload = function () {
    inputNode.focus();
    processHint(getInput());
    inputNode.addEventListener("input", function (e) {
        processHint(getInput());
    });
    hintNode.addEventListener("click", function (event) {
        if (event.target.tagName.toLowerCase() === "li") {
            inputNode.value = event.target.innerText;
            inputNode.focus();
            hideHint();
        }
    });
    inputNode.addEventListener("keydown", function (event) {
        console.log(event);
        if (hintNode.style.display === "none") {
            console.log("display none");
            return;
        }
        switch (event.keyCode) {
            case 38:
                {
                    // 上
                    var liNodes = hintNode.childNodes;
                    if (selectedLiIndex - 1 >= 0) {
                        liNodes[selectedLiIndex].className = "";
                        liNodes[selectedLiIndex - 1].className = "selected";
                        selectedLiIndex = selectedLiIndex - 1;
                    }
                    event.stopImmediatePropagation();
                }
                break;
            case 40:
                {
                    // 下
                    var liNodes = hintNode.childNodes;
                    if (liNodes.length > selectedLiIndex + 1) {
                        liNodes[selectedLiIndex].className = "";
                        liNodes[selectedLiIndex + 1].className = "selected";
                        selectedLiIndex = selectedLiIndex + 1;
                    }
                }
                break;
            case 13:
                // enter
                inputNode.value = hintNode.childNodes[selectedLiIndex].innerText;
                inputNode.focus();
                hideHint();
                break;
            case 27:
                inputNode.select();
                break;
        }
    });
};

function processHint(input) {
    hintNode.innerHTML = "";
    if (!input || input.length === 0) {
        hideHint();
        return;
    }
    input = input.trim();
    var index = input.indexOf("@");
    if (index >= 0 && index < input.length - 1) {
        var postAt = input.substring(index + 1, input.length);
        var preAt = input.substring(0, index);
        if (postAt.length > 0) {
            var matchedList = [];
            for (var i = 0; i < postfixList.length; i++) {
                if (postfixList[i].startsWith(postAt)) {
                    matchedList.push(postfixList[i]);
                }
            }
            if (matchedList.length > 0) {
                showHint(preAt, matchedList);
                return;
            } else {
                input = preAt;
            }
        }
    }
    showHint(input, postfixList);
}

function showHint(input, mailList) {
    for (var i = 0; i < mailList.length; i++) {
        var hint = generateHint(input, mailList[i]);
        if (hint) {
            createHintElement(hint);
        }
    }
    hintNode.style.display = "block";
}

function hideHint() {
    hintNode.style.display = "none";
}

/**
 * @returns {String}
 */
function getInput() {
    return inputNode.value.trim();
}

function generateHint(input, hint) {
    if (!input) {
        return;
    }
    var index = input.indexOf("@");
    if (index < 0) {
        return input + "@" + hint;
    } else if (index === input.length - 1) {
        return input + hint;
    }
}

function createHintElement(value) {
    var liNode = document.createElement("li");
    liNode.innerText = value;
    hintNode.appendChild(liNode);
    if (liNode === hintNode.firstChild) {
        liNode.className = "selected";
        selectedLiIndex = 0;
    }
}