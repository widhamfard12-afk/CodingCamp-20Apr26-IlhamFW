function updateDateTime() {
  const now = new Date();
  const hour = now.getHours();

  document.getElementById("time").textContent =
    now.toLocaleTimeString("en-US", {
      hour12: false
    });

  document.getElementById("date").textContent =
    now.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric"
    });

  let greet = "";

  if (hour >= 5 && hour < 12) {
    greet = "Good Morning";
  } else if (hour >= 12 && hour < 15) {
    greet = "Good Afternoon";
  } else if (hour >= 15 && hour < 19) {
    greet = "Good Evening";
  } else {
    greet = "Good Night";
  }

  document.getElementById("greeting").textContent = greet;
}

setInterval(updateDateTime, 1000);
updateDateTime();


let time = 1500;
let interval;

function updateTimer() {
  const min = Math.floor(time / 60);
  const sec = time % 60;
  document.getElementById("timer").textContent =
    `${min}:${sec < 10 ? "0" : ""}${sec}`;
}

function startTimer() {
  clearInterval(interval);
  interval = setInterval(() => {
    if (time > 0) {
      time--;
      updateTimer();
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(interval);
}

function resetTimer() {
  clearInterval(interval);
  time = 1500;
  updateTimer();
}

function setCustomTimer() {
  const minutes = parseInt(document.getElementById("customMinutes").value);
  if (!minutes || minutes < 1) return;
  clearInterval(interval);
  time = minutes * 60;
  updateTimer();
  document.getElementById("customMinutes").value = "";
}

updateTimer();


function addTask() {
  const input = document.getElementById("taskInput");
  const task = input.value.trim();

  if (!task) return;

  const li = document.createElement("li");

  li.innerHTML = `
    <div class="task-left">
      <input type="checkbox" onclick="toggleDone(this)">
      <span onclick="editTask(this)">${task}</span>
    </div>
    <button class="delete-task" onclick="deleteTask(this)">Delete</button>
  `;

  document.getElementById("taskList").appendChild(li);
  input.value = "";
}

function editTask(span) {
  const newTask = prompt("Edit task:", span.textContent);

  if (newTask !== null && newTask.trim() !== "") {
    span.textContent = newTask.trim();
  }
}

function deleteTask(button) {
  button.parentElement.remove();
}

function toggleDone(checkbox) {
  const li = checkbox.closest("li");
  li.classList.toggle("done");
}


function addLink() {
  const name = document.getElementById("linkName").value.trim();
  const url = document.getElementById("linkURL").value.trim();

  if (!name || !url) return;

  const linkBox = document.createElement("div");
  linkBox.className = "link-box";

  linkBox.innerHTML = `
    <a href="${url}" target="_blank">${name}</a>
    <span class="delete-link" onclick="this.parentElement.remove()">×</span>
  `;

  document.getElementById("links").appendChild(linkBox);

  document.getElementById("linkName").value = "";
  document.getElementById("linkURL").value = "";
}


const toggle = document.getElementById("theme-toggle");

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  toggle.textContent = "Light Mode";
}

toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
    toggle.textContent = "Light Mode";
  } else {
    localStorage.setItem("theme", "light");
    toggle.textContent = "Dark Mode";
  }
});

const nameInput = document.getElementById("nameInput");
const saveBtn = document.getElementById("saveNameBtn");
const customGreeting = document.getElementById("customGreeting");

let savedName = localStorage.getItem("username");

function updateGreeting() {
  if (savedName) {
    customGreeting.textContent = `${document.getElementById("greeting").textContent}, ${savedName} 👋`;
  }
}

function saveName() {
  const name = nameInput.value.trim();
  if (!name) return;

  localStorage.setItem("username", name);
  savedName = name;
  updateGreeting();
  nameInput.value = "";
}

saveBtn.addEventListener("click", saveName);

updateGreeting();
