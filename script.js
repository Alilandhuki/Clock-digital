const displayHour = document.querySelector(".hour");
const displayMinute = document.querySelector(".minute");
const displaySecond = document.querySelector(".second");
const displayAmPm = document.querySelector(".am-pm");
const displayMonth = document.querySelector(".month");
const displayDay = document.querySelector(".day");
const displayDate = document.querySelector(".date");
const localTimeToggle = document.querySelector(".local-time-toggle-button");
const displayhr = document.querySelector(".display-hr");
const alarmList = document.getElementById("alarm-list");
const alarmRingning = document.getElementById("alarm-ringing");

let alarmListArr = [];

let retrieveAlarm = JSON.parse(localStorage.getItem("LocalStorage"));

if (retrieveAlarm !== null) {
  alarmListArr = [...retrieveAlarm];
  renderList();
}

function updateTime() {
  const date = new Date();
  const hour = formatTime(date.getHours());
  const minute = formatTime(date.getMinutes());
  const min = date.getMinutes();
  const second = formatTime(date.getSeconds());
  const sec = date.getSeconds();
  const month = getMonth(date.getMonth());
  const day = getDay(date.getDay());
  const currentDate = formatTime(date.getDate());
  const ampm = hour >= 12 ? "PM" : "AM";
  let calculatedHour;

  if (localTime) {
    displayHour.innerHTML = hour;
    displayhr.innerHTML = "24hr";
    playAlarm(calculatedHour, hour, minute, min, second, sec, ampm);
    console.log(calculatedHour, minute, second, ampm);
  } else {
    if (hour > 12) {
      console.log("in1");
      calculatedHour = hour - 12;
      if (calculatedHour < 10) {
        displayHour.innerHTML = "0" + calculatedHour;
        displayhr.innerHTML = "12hr";
        playAlarm(calculatedHour, hour, minute, min, second, sec, ampm);
        console.log(calculatedHour, minute, second, ampm);
      } else {
        displayHour.innerHTML = calculatedHour;
        displayhr.innerHTML = "12hr";
        playAlarm(calculatedHour, hour, minute, min, second, sec, ampm);
        console.log(calculatedHour, minute, second, ampm);
      }
    } else if (hour == 0 && ampm == "AM") {
      console.log("in2");
      calculatedHour = 12;
      displayhr.innerHTML = "12hr";
      displayHour.innerHTML = calculatedHour;
      playAlarm(calculatedHour, hour, minute, min, second, sec, ampm);
      console.log(calculatedHour, minute, second, ampm);
    } else if (hour == 12 && ampm == "PM") {
      console.log("in3");
      calculatedHour = 12;
      displayHour.innerHTML = calculatedHour;
      displayhr.innerHTML = "12hr";
      playAlarm(calculatedHour, hour, minute, min, second, sec, ampm);
      console.log(calculatedHour, minute, second, ampm);
    } else {
      console.log("in4");
      if (hour < 9) {
        calculatedHour = Number(hour);
        displayHour.innerHTML = "0" + calculatedHour;
        displayhr.innerHTML = "12hr";
        playAlarm(calculatedHour, hour, minute, min, second, sec, ampm);
        console.log(calculatedHour, minute, second, ampm);
      } else {
        calculatedHour = Number(hour);
        displayHour.innerHTML = calculatedHour;
        displayhr.innerHTML = "12hr";
        playAlarm(calculatedHour, hour, minute, min, second, sec, ampm);
        console.log(calculatedHour, minute, second, ampm);
      }
    }
  }

  console.log(calculatedHour, minute, second, ampm);

  displayMinute.innerHTML = minute;
  displaySecond.innerHTML = second;
  displayAmPm.innerHTML = ampm;
  displayMonth.innerHTML = month;
  displayDay.innerHTML = day;
  displayDate.innerHTML = currentDate;
}
setInterval(updateTime, 1000);

function playAlarm(calculatedHour, hour, minute, min, second, sec, ampm) {
  for (let i = 0; i < alarmListArr.length; i++) {
    if (
      (alarmListArr[i].hourInput == calculatedHour ||
        alarmListArr[i].hourInput == hour) &&
      (alarmListArr[i].minuteInput == minute ||
        alarmListArr[i].minuteInput == min) &&
      (alarmListArr[i].secInput == second || alarmListArr[i].secInput == sec) &&
      alarmListArr[i].ampmInput == ampm
    ) {
      setTimeout(() => {
        alarmRingtone.pause();
        alarmRingning.style.display = "none";
      }, 300000);
    }
  }
}

function formatTime(time) {
  if (time < 10) {
    return "0" + time;
  }
  return time;
}

function getMonth(monthNumber) {
  const monthsArr = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return monthsArr[monthNumber];
}

function getDay(dayNumber) {
  const daysArr = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return daysArr[dayNumber];
}

let localTime = false;
localTimeToggle.onclick = function () {
  localTimeToggle.classList.toggle("active");
  localTime = !localTime;
  return localTime;
};

function renderList() {
  console.log("Item Rendered!");
  localStorage.setItem("LocalStorage", JSON.stringify(alarmListArr));
  alarmList.innerHTML = "";
  for (let element of alarmListArr) {
    addAlarmList(element);
  }
}
