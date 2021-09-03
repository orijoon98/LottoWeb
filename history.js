const historyList = document.getElementById("historyList");

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

function setHistory() {
    for(var i=52;i>=0;i--) { // 최근 1년치 정보 최근부터 오래된 순으로 저장
        var newList = document.createElement("tr");

        // 회차
        var drwNo = document.createElement("th");
        drwNo.setAttribute("scope", "row");
        var drwNoText = document.createTextNode(String(drwNoArr[i]));
        drwNo.appendChild(drwNoText);

        // 당첨번호
        var number = document.createElement("td");
        var winNumber = "";
        winNumber = winNumber + String(drwtNo1Arr[i]) + ", " + String(drwtNo2Arr[i]) + ", " + String(drwtNo3Arr[i]) + ", " + String(drwtNo4Arr[i]) + ", " + String(drwtNo5Arr[i]) + ", " + String(drwtNo6Arr[i]) + " +  " + String(bnusNoArr[i]);
        var numberText = document.createTextNode(winNumber);
        number.appendChild(numberText);

        // 당첨자수
        var firstPrzwnerCo = document.createElement("td");
        var firstPrzwnerCoText = document.createTextNode(String(firstPrzwnerCoArr[i]));
        firstPrzwnerCo.appendChild(firstPrzwnerCoText);

        // 1등 당첨금
        var firstWinamnt = document.createElement("td");
        var winamnt = String(firstWinamntArr[i]);
        var winAmnt = "";
        var cnt = 0;
        for(var j=winamnt.length-1;j>=0;j--) {
            if(cnt == 3) {
                winAmnt += ",";
                cnt = 0;
            }
            winAmnt += winamnt[j];
            cnt++;
        }
        winAmnt = winAmnt.split("").reverse().join("");
        var firstWinamntText = document.createTextNode(winAmnt);
        firstWinamnt.appendChild(firstWinamntText);
        var firstPrzwnerCo = document.createElement("td");
        var firstPrzwnerCoText = document.createTextNode(String(firstPrzwnerCoArr[i]));
        firstPrzwnerCo.appendChild(firstPrzwnerCoText);

        newList.appendChild(drwNo);
        newList.appendChild(number);
        newList.appendChild(firstPrzwnerCo);
        newList.appendChild(firstWinamnt);

        historyList.appendChild(newList);
    }
}

function setRecent() { // 회차 정보
    for(var i=0;i<53;i++) {
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
            setHistory();
        } else {
            console.log("통신 실패");
        }
    }
}

function init() {
    updateLotto();
}

init();