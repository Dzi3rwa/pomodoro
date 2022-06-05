//todoList

let counter = 0;
let todoList = [];
let todoListHistory = [];
let volume = document.querySelector("#alarmVolume");
let pathInput = document.querySelector("#alarmSound");
let music = new Audio("music.mp3");
pathInput.addEventListener("change", () => {
  let path = pathInput.value;

  pathTab = path.split("\\");
  console.log(path);
  music = new Audio(pathTab[pathTab.length - 1]);
});
volume.addEventListener("input", () => {
  music.volume = document.querySelector("#alarmVolume").value / 100;
  console.log(music.volume);
});
i = 0;
document.addEventListener("keydown", (e) => {
  console.log(e.key);
  if (e.key == "Enter") {
    if (i % 2 == 0) {
      music.play();
      i++;
    } else {
      music.pause();
      i++;
    }
  }
});
document.getElementById("addButton").addEventListener("click", function () {
  const about = document.getElementById("inputAbout").value;
  const category = document.getElementById("inputCategory").value;
  const option = document.createElement("option");
  option.innerHTML = about + " " + category;
  option.value = about + category;
  document.getElementById("select").appendChild(option);
  newPomodoro = { about: about, category: category, value: about + category };
  todoList.push(newPomodoro);
});

document.getElementById("clearList").addEventListener("click", function () {
  todoList.length = 0;
  document.getElementById("select").innerHTML = "";
});

//timer
let start = false;
let pause = false;
let reset = false;
let pomodoroCounter = 1;
let klik = 0;
let seconds = 0;
let durationOrBreak = 0;

function timer(i) {
  klik++;
  let n = 0;
  if (i != 5) n = parseInt(finalSetts[i]) * 60;
  else {
    n = seconds;
  }

  const s = n % 60;
  const m = Math.floor((n % 3600) / 60);
  const h = Math.floor(n / 3600);

  if (durationOrBreak % 2 == 0) {
    document.getElementById("pomodoro").style.backgroundColor = "red";
  } else {
    document.getElementById("pomodoro").style.backgroundColor = "green";
  }

  if (!pause || klik < 2) {
    document.getElementById("timer").innerHTML =
      "0" + h + ":" + (m < 10 ? "0" + m : m) + ":" + (s < 10 ? "0" + s : s);
  }

  let interval = setInterval(function () {
    if (start && n > 0) {
      n--;
      let s = n % 60;
      let m = Math.floor((n % 3600) / 60);
      let h = Math.floor(n / 3600);
      if (n == 0) {
        if (durationOrBreak % 2 == 1) {
          if (pomodoroCounter == finalSetts[4]) {
            document.getElementById("timer").innerHTML = "00:00:00";
            document.getElementById("pomodoro").style.backgroundColor =
              "rgb(177, 38, 38)";
            counter++;
            pomodoroCounter = 1;
            durationOrBreak = -1;
            const about = document.getElementById("about").innerHTML;
            const category = document.getElementById("category").innerHTML;
            const data = new Date();
            const s = data.getSeconds();
            const m = data.getMinutes();
            const h = data.getHours();
            const div = document.createElement("div");
            div.innerHTML =
              "ABOUT: " +
              about +
              " CATEGORY: " +
              category +
              " " +
              "" +
              h +
              ":" +
              (m < 10 ? "0" + m : m) +
              ":" +
              (s < 10 ? "0" + s : s);
            div.style.width = "600";
            div.style.borderRadius = "5px";
            div.style.padding = "5px";
            div.style.color = "white";
            if (counter % 2 == 0) {
              div.style.backgroundColor = "rgb(52, 62, 90)";
            } else {
              div.style.backgroundColor = "rgb(177, 38, 38)";
            }
            document.getElementById("todoListHistory").appendChild(div);
          } else {
            if (autoPomodoroValue) {
              klik = 0;
              timer(0);
            } else {
              timer(0);
            }
            pomodoroCounter++;
            document.getElementById("pomodoroCounter").innerHTML =
              pomodoroCounter;
          }
        } else {
          if (pomodoroCounter == finalSetts[3] && autoBreakValue) {
            klik = 0;
            timer(2);
          } else if (pomodoroCounter != finalSetts[3] && autoBreakValue) {
            klik = 0;
            timer(1);
          } else if (pomodoroCounter == finalSetts[3]) {
            timer(2);
          } else {
            timer(1);
          }
        }
        durationOrBreak++;
        klik = 0;
        music.play();
        setTimeout(() => music.pause(), 12000);
        if (durationOrBreak % 2 == 0) {
          document.getElementById("pomodoro").style.backgroundColor = "red";
        } else {
          document.getElementById("pomodoro").style.backgroundColor = "green";
        }
      } else {
        document.getElementById("timer").innerHTML =
          "0" + h + ":" + (m < 10 ? "0" + m : m) + ":" + (s < 10 ? "0" + s : s);
      }
    }
    if (reset || pause) {
      clearInterval(interval);
    }
    seconds = n;
  }, 1000);
  if (klik > 1) {
    clearInterval(interval);
  }
}

document.getElementById("startButton").addEventListener("click", function () {
  reset = false;
  if (todoList.length > 0) {
    start = true;
    if (!pause) {
      if (durationOrBreak % 2 == 0) timer(0);
      else {
        if (pomodoroCounter == finalSetts[3]) timer(2);
        else timer(1);
      }
    } else {
      timer(5);
      pause = false;
    }
    if (durationOrBreak == 0) {
      const selectValue = document.getElementById("select").value;
      let a = "";
      let c = "";
      todoList.forEach((e) => {
        if (e.value == selectValue) {
          a = e.about;
          c = e.category;
        }
      });
      document.getElementById("about").innerHTML = a;
      document.getElementById("category").innerHTML = c;
    }
  } else {
    confirm("Dodaj zadanie i kategorie");
  }
});

document.getElementById("pauseButton").addEventListener("click", function () {
  klik = 0;
  start = false;
  pause = true;
});

document.getElementById("resetButton").addEventListener("click", function () {
  klik = 0;
  start = false;
  reset = true;
  document.getElementById("timer").innerHTML = "00:00:00";
  document.getElementById("pomodoro").style.backgroundColor =
    "rgb(177, 38, 38)";
  durationOrBreak = 0;
  pomodoroCounter = 1;
});

let pomodorobutton = document.getElementById("pomodoroButton");
let settingsbutton = document.getElementById("settingsButton");
let pomodoromain = document.getElementById("pomodoroMain");
let settingsmain = document.getElementById("settingsMain");
let visibleMain = "pomodoro";

pomodorobutton.addEventListener("click", function () {
  if (visibleMain == "settings") {
    pomodoromain.classList.toggle("hidden");
    settingsmain.classList.toggle("hidden");
    pomodorobutton.classList.toggle("selected");
    settingsbutton.classList.toggle("selected");
    visibleMain = "pomodoro";
  }
});

settingsbutton.addEventListener("click", function () {
  if (visibleMain == "pomodoro") {
    pomodoromain.classList.toggle("hidden");
    settingsmain.classList.toggle("hidden");
    pomodorobutton.classList.toggle("selected");
    settingsbutton.classList.toggle("selected");
    visibleMain = "settings";
  }
});
