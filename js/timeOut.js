// token 期限設定
const btnTimeOut = document.querySelector("#btnTimeOut");
let objStartTime = JSON.parse(localStorage.getItem("startTime"));
let startTime = new Date(`${objStartTime.year}-${objStartTime.month}-${objStartTime.day}`);
startTime.setHours(objStartTime.hour, objStartTime.min, objStartTime.sec);
let nowTime = new Date();
let costTime = Math.floor((nowTime - startTime) / (1000 * 60 * 60)); // 以小時計算
if(costTime>=7){
    localStorage.clear();
    btnTimeOut.click();
}