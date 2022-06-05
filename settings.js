//#region TIMER SETTINGS
var settings = document.querySelector("#settings");
let duration = document.querySelector("#durationInput");
let shortBreak = document.querySelector("#sBreakInput");
let longBreak = document.querySelector("#lBreakInput");
let delay = document.querySelector("#lbDelayInput");
let goal = document.querySelector("#goalInput");
let summary = document.querySelector("#settingsSummary");
let apply = document.querySelector("#applyButton");
summary.value = "";

let finalSetts = [0, 0, 0, 0, 0];
let finalSettsCopy = [0, 0, 0, 0, 0];
settings.addEventListener("input", settingsSummmary);

function settingsSummmary() {
  if (
    duration.value != 0 &&
    shortBreak.value != 0 &&
    longBreak.value != 0 &&
    delay.value != 0 &&
    goal.value != 0
  ) {
    summary.value =
      duration.value +
      "-" +
      shortBreak.value +
      "-" +
      longBreak.value +
      "-" +
      delay.value +
      "-" +
      goal.value;
    finalSetts = [
      duration.value,
      shortBreak.value,
      longBreak.value,
      delay.value,
      goal.value,
    ];
    finalSettsCopy = [
      duration.value,
      shortBreak.value,
      longBreak.value,
      delay.value,
      goal.value,
    ];
  }
}

optOne = document.querySelector("#optionOne");
optTwo = document.querySelector("#optionTwo");
optThree = document.querySelector("#optionThree");

optOne.addEventListener("click", () => {
  duration.value = 20;
  shortBreak.value = 5;
  longBreak.value = 10;
  delay.value = 4;
  goal.value = 5;
  settingsSummmary();
});

optTwo.addEventListener("click", () => {
  duration.value = 30;
  shortBreak.value = 10;
  longBreak.value = 20;
  delay.value = 3;
  goal.value = 4;
  settingsSummmary();
});

optThree.addEventListener("click", () => {
  duration.value = 45;
  shortBreak.value = 15;
  longBreak.value = 30;
  delay.value = 2;
  goal.value = 3;
  settingsSummmary();
});
summary.addEventListener("input", () => {
  if (!summary.checkValidity()) {
    summary.style.background = "rgba(177, 38, 38,0.75)";
    document.removeEventListener("keydown", () => {});
  } else {
    summary.style.background = "white";
    document.addEventListener("keydown", (e) => {
      if (e.code === "Enter") {
        let setts = summary.value.split("-");
        duration.value = setts[0];
        shortBreak.value = setts[1];
        longBreak.value = setts[2];
        delay.value = setts[3];
        goal.value = setts[4];
        finalSetts = [
          duration.value,
          shortBreak.value,
          longBreak.value,
          delay.value,
          goal.value,
        ];
        finalSettsCopy = [
          duration.value,
          shortBreak.value,
          longBreak.value,
          delay.value,
          goal.value,
        ];
      }
    });
  }
});

apply.addEventListener("click", () => {
  finalSetts = [
    duration.value,
    shortBreak.value,
    longBreak.value,
    delay.value,
    goal.value,
  ];
  finalSettsCopy = [
    duration.value,
    shortBreak.value,
    longBreak.value,
    delay.value,
    goal.value,
  ];
  console.log(finalSetts);
});
//#endregion

//#region ALARM
// let volume = document.querySelector("#alarmVolume");
// pathInput = document.querySelector("#alarmSound");
// let music = new Audio("music.mp3");
// pathInput.addEventListener("change", () => {
//   let path = pathInput.value;

//   pathTab = path.split("\\");
//   console.log(pathTab[pathTab.length - 1]);
//   music = new Audio(pathTab[pathTab.length - 1]);

//   volume.addEventListener("input", () => {
//     music.volume = document.querySelector("#alarmVolume").value / 100;
//     //console.log(music.volume);
//   });
// });

//#endregion

//#region MODE SETTINGS
let root = document.documentElement;
mainColor = document.querySelector("#mainColor");
mainColor.addEventListener("input", () => {
  root.style.setProperty("--data-pomodoro-color", mainColor.value);
  console.log(root.style.getPropertyValue("--data-pomodoro-color"));
});
settsColor = document.querySelector("#settsColor");
settsColor.addEventListener("input", () => {
  root.style.setProperty("--data-settings-color", settsColor.value);
  console.log(root.style.getPropertyValue("--data-settings-color"));
});

mode = document.querySelector("#modeInput");
body = document.querySelector("body");
mode.addEventListener("input", () => {
  console.log(mode.checked);
  if (mode.checked == true) {
    body.style.background = "rgb(12,12,12)";
    body.style.color = "white";
    document.querySelector("#pMode").innerHTML = "Dark";
  } else {
    body.style.background = "white";
    body.style.color = "black";
    document.querySelector("#pMode").innerHTML = "Light";
  }
});
//#endregion

let autoBreak = document.getElementById("autoBreak");
let autoPomodoro = document.getElementById("autoPomodoro");
let autoBreakValue = false;
let autoPomodoroValue = false;

autoBreak.addEventListener("input", () => {
  if (autoBreak.checked == true) {
    autoBreakValue = true;
  } else {
    autoBreakValue = false;
  }
});

autoPomodoro.addEventListener("input", () => {
  if (autoPomodoro.checked == true) {
    autoPomodoroValue = true;
  } else {
    autoPomodoroValue = false;
  }
});
