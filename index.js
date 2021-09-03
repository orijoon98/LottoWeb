const drwNo = document.getElementById("drwNo");
const drwNoDate = document.getElementById("drwNoDate");
const drwtNo1 = document.getElementById("drwtNo1");
const drwtNo2 = document.getElementById("drwtNo2");
const drwtNo3 = document.getElementById("drwtNo3");
const drwtNo4 = document.getElementById("drwtNo4");
const drwtNo5 = document.getElementById("drwtNo5");
const drwtNo6 = document.getElementById("drwtNo6");
const bnusNo = document.getElementById("bnusNo");
const firstWinamnt = document.getElementById("firstWinamnt");
const firstAccumamnt = document.getElementById("firstAccumamnt");
const firstPrzwnerCo = document.getElementById("firstPrzwnerCo");

var drwNoDateArr = new Array(53);
var drwNoArr = new Array(53);
var drwtNo1Arr = new Array(53);
var drwtNo2Arr = new Array(53);
var drwtNo3Arr = new Array(53);
var drwtNo4Arr = new Array(53);
var drwtNo5Arr = new Array(53);
var drwtNo6Arr = new Array(53);
var bnusNoArr = new Array(53);
var firstWinamntArr = new Array(53);
var firstAccumamntArr = new Array(53);
var firstPrzwnerCoArr = new Array(53);
var totSellamntArr = new Array(53);

let lotto;

function setWinPrice() { // 당첨금액 보기 편하게 수정
    var price = parseInt(firstWinamnt.innerText); // 1등 1게임당 당첨금액
    var totPrice = parseInt(firstAccumamnt.innerText); // 1등 총 당첨금액
    price = Math.floor(price / 100000000)
    totPrice = Math.floor(totPrice / 100000000)
    firstWinamnt.innerHTML = String(price);
    firstAccumamnt.innerHTML = String(totPrice);
}

function setCircleColor() { // 로또 번호별 색깔 표시
    var numArr = [drwtNo1, drwtNo2, drwtNo3, drwtNo4, drwtNo5, drwtNo6, bnusNo];
    for(var num of numArr) {
        var cur = parseInt(num.innerText);
        if(cur >= 1 && num <= 10) {
            num.style.backgroundColor = "#f1c40f";
        }
        else if(cur >= 11 && cur <= 20) {
            num.style.backgroundColor = "#3498db";
        }
        else if(cur >= 21 && cur <= 30) {
            num.style.backgroundColor = "#e74c3c";
        }
        else if(cur >= 31 && cur <= 40) {
            num.style.backgroundColor = "#bdc3c7";
        }
        else {
            num.style.backgroundColor = "#2ecc71";
        }
    }
}

function setRecent() { // 최근회차 정보 표시
    for(var i=0;i<53;i++){
        drwNoDateArr[i] = lotto["datas"][i]["drwNoDate"];
        drwNoArr[i] = lotto["datas"][i]["drwNo"];
        drwtNo1Arr[i] = lotto["datas"][i]["drwtNo1"];
        drwtNo2Arr[i] = lotto["datas"][i]["drwtNo2"];
        drwtNo3Arr[i] = lotto["datas"][i]["drwtNo3"];
        drwtNo4Arr[i] = lotto["datas"][i]["drwtNo4"];
        drwtNo5Arr[i] = lotto["datas"][i]["drwtNo5"];
        drwtNo6Arr[i] = lotto["datas"][i]["drwtNo6"];
        bnusNoArr[i] = lotto["datas"][i]["bnusNo"];
        firstWinamntArr[i] = lotto["datas"][i]["firstWinamnt"];
        firstAccumamntArr[i] = lotto["datas"][i]["firstAccumamnt"];
        firstPrzwnerCoArr[i] = lotto["datas"][i]["firstPrzwnerCo"];
        totSellamntArr[i] = lotto["datas"][i]["totSellamnt"];
    }

    drwNo.innerHTML = drwNoArr[52];
    drwNoDate.innerHTML = drwNoDateArr[52];
    drwtNo1.innerHTML = drwtNo1Arr[52];
    drwtNo2.innerHTML = drwtNo2Arr[52];
    drwtNo3.innerHTML = drwtNo3Arr[52];
    drwtNo4.innerHTML = drwtNo4Arr[52];
    drwtNo5.innerHTML = drwtNo5Arr[52];
    drwtNo6.innerHTML = drwtNo6Arr[52];
    bnusNo.innerHTML = bnusNoArr[52];
    firstWinamnt.innerHTML = firstWinamntArr[52];
    firstAccumamnt.innerHTML = firstAccumamntArr[52];
    firstPrzwnerCo.innerHTML = firstPrzwnerCoArr[52];
}

async function updateLotto() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://112.169.11.3:30080/data/lottodata.php", true)
    xhr.responseType='json';
    xhr.send();
    xhr.onload = () => {
        if (xhr.status == 200) {
            console.log("통신 성공");
            lotto = xhr.response;
            setRecent();
            setCircleColor();
            setWinPrice();
        } else {
            console.log("통신 실패");
        }
    }
}

function init() {
    updateLotto();
}

init();