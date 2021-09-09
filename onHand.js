const drwNo = document.getElementById("drwNo");
const drwtNo1 = document.getElementById("drwtNo1");
const drwtNo2 = document.getElementById("drwtNo2");
const drwtNo3 = document.getElementById("drwtNo3");
const drwtNo4 = document.getElementById("drwtNo4");
const drwtNo5 = document.getElementById("drwtNo5");
const drwtNo6 = document.getElementById("drwtNo6");
const inputbtn = document.getElementById("inputbtn");
const errorone = document.getElementById("errorone");
const errortwo = document.getElementById("errortwo");
const errorthree = document.getElementById("errorthree");
const errorfour = document.getElementById("errorfour");
const errorfive = document.getElementById("errorfive");
const errorsix = document.getElementById("errorsix");
const resultone = document.getElementById("resultone");
const resulttwo = document.getElementById("resulttwo");
const resultthree = document.getElementById("resultthree");
const resultfour = document.getElementById("resultfour");
const resultfive = document.getElementById("resultfive");
const resultsix = document.getElementById("resultsix");

var drwNoArr = new Array(53);
var drwtNo1Arr = new Array(53);
var drwtNo2Arr = new Array(53);
var drwtNo3Arr = new Array(53);
var drwtNo4Arr = new Array(53);
var drwtNo5Arr = new Array(53);
var drwtNo6Arr = new Array(53);
var bnusNoArr = new Array(53);

let lotto;

var inputNo; // 입력 받은 회차
var inputArr = new Array(6); // 입력 받은 번호

function backPage() {
    window.location.href = "./check.html";
}

function moveFocus(num, here, next) {
    var str = here.value.length;
    if(str == num) {
        next.focus();
    }
}

function outFocus(num, here) {
    var str = here.value.length;
    if(str == num) {
        here.blur();
    }
}

function handleEnter() { // 엔터로 입력 처리
    if(window.event.keyCode === 13) {
        inputbtn.click();
    }
}

function maxLengthCheckDrwNo(object) {
    if (object.value.length > 4) {
        object.value = object.value.slice(0, 4); 
    } 
}

function maxLengthCheck(object) {
    if (object.value.length > 2) {
        object.value = object.value.slice(0, 2); 
    } 
}

function showResult() {
    var target = parseInt(inputNo); // 입력한 회차
    var targetIndex = 52 - (parseInt(drwNoArr[52]) - target);
    var cnt = 0, bnusCnt = 0;
    var winNum = [drwtNo1Arr[targetIndex], drwtNo2Arr[targetIndex], drwtNo3Arr[targetIndex], drwtNo4Arr[targetIndex], drwtNo5Arr[targetIndex], drwtNo6Arr[targetIndex], bnusNoArr[targetIndex]];
    for(var num of inputArr) {
        for(var i=0;i<6;i++) {
            if(parseInt(num) == parseInt(winNum[i])) {
                cnt++;
            }
            if(parseInt(num) == parseInt(winNum[6])) {
                bnusCnt++;
                break;
            }
        }
    }
    if(cnt == 6) {
        resultone.click();
        return;
    }
    else if(cnt == 5 && bnusCnt == 1) {
        resulttwo.click();
        return;
    }
    else if(cnt == 5 && bnusCnt == 0) {
        resultthree.click();
        return;
    }
    else if(cnt == 4) {
        resultfour.click();
        return;
    }
    else if(cnt == 3) {
        resultfive.click();
        return;
    }
    else {
        resultsix.click();
        return;
    }
}

function checkInput() { // 번호를 제대로 입력했는지 확인
    var set = new Set();
    if(isNaN(inputNo)) { // 회차가 숫자가 아니면 경고
        errorone.click();
        return false;
    }
    if(parseInt(inputNo) < parseInt(drwNoArr[0])) { // 기한이 지난 회차면 경고
        errorfour.click();
        return false;
    }
    if(parseInt(inputNo) > parseInt(drwNoArr[52])) { // 업데이트 안된 회차면 경고
        errorfive.click();
        return false;
    }
    if(inputNo == "") { // 숫자 7개를 모두 입력하지 않으면 경고
        errorsix.click();
        return false;
    }
    for(num of inputArr) { // 숫자 7개를 모두 입력하지 않으면 경고
        if(num == "") {
            errorsix.click();
            return false;
        }
        if(isNaN(num)) { // 숫자가 아니라면 경고
            errorone.click();
            return false;
        }
        if(parseInt(num) < 1 || parseInt(num) > 45) { // 범위 벗어나면 경고
            errortwo.click();
            return false;
        }
        set.add(num);
    }
    if(set.size != 6) { // 숫자가 중복되면 경고
        errorthree.click();
        return false;
    }
    return true;
}

function getInput() { // 번호 입력
    inputNo = drwNo.value;
    inputArr[0] = drwtNo1.value;
    inputArr[1] = drwtNo2.value;
    inputArr[2] = drwtNo3.value;
    inputArr[3] = drwtNo4.value;
    inputArr[4] = drwtNo5.value;
    inputArr[5] = drwtNo6.value;
    drwNo.value = "";
    drwtNo1.value = "";
    drwtNo2.value = "";
    drwtNo3.value = "";
    drwtNo4.value = "";
    drwtNo5.value = "";
    drwtNo6.value = "";
    drwNo.blur();
    drwtNo1.blur();
    drwtNo2.blur();
    drwtNo3.blur();
    drwtNo4.blur();
    drwtNo5.blur();
    drwtNo6.blur();
    if(checkInput()) {
        showResult();
    }
}

function setRecent() { // 로또 업데이트
    for(var i=0;i<53;i++){
        drwNoArr[i] = lotto["datas"][i]["drwNo"];
        drwtNo1Arr[i] = lotto["datas"][i]["drwtNo1"];
        drwtNo2Arr[i] = lotto["datas"][i]["drwtNo2"];
        drwtNo3Arr[i] = lotto["datas"][i]["drwtNo3"];
        drwtNo4Arr[i] = lotto["datas"][i]["drwtNo4"];
        drwtNo5Arr[i] = lotto["datas"][i]["drwtNo5"];
        drwtNo6Arr[i] = lotto["datas"][i]["drwtNo6"];
        bnusNoArr[i] = lotto["datas"][i]["bnusNo"];  
    }
}

async function updateLotto() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://hyeokjoon.com/data/lottodata.php");
    xhr.responseType='json';
    xhr.send();
    xhr.onload = () => {
        if (xhr.status == 200) {
            console.log("통신 성공");
            lotto = xhr.response;
            setRecent();
        } else {
            console.log("통신 실패");
        }
    }
}

function init() {
    updateLotto();
    window.addEventListener("keyup", handleEnter);
}

init();