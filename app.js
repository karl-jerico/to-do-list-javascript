let storedItems = localStorage.getItem("user_tasks");
storedItems = storedItems ? JSON.parse(storedItems) : [];

document.addEventListener("DOMContentLoaded", function () {
  saveLocalStorageTasks();
  displayUserTasks();
  completedTask(li)
});

function saveLocalStorageTasks() {
  const userInput = document.getElementById("userInput");
  const enterButton = document.getElementById("enter");

  enterButton.addEventListener("click", function () {
    const newItem = userInput.value.trim();
    if (newItem !== "") {
      storedItems.push(newItem);
      localStorage.setItem("user_tasks", JSON.stringify(storedItems));
      userInput.value = "";
      displayUserTasks();
    } else {
      console.log("bobo");
    }
  });
}

function displayUserTasks() {
  const ul = document.querySelector("ul");
  ul.innerHTML = "";

  storedItems.forEach(function (item, index) {
    const li = document.createElement("li");
    li.textContent = item;

    if (localStorage.getItem("completed_tasks")) {
      const completedTasks = JSON.parse(localStorage.getItem("completed_tasks"));
      if (completedTasks.includes(index.toString())) {
        li.classList.add("done");
      }
    }

    li.addEventListener("click", function() {
      li.classList.toggle("done");
      updateCompletedTasks(index, li.classList.contains("done"));
    });


    const dBtn = document.createElement("button");
    dBtn.textContent = "X";
    dBtn.classList.add("delete-button");

    dBtn.addEventListener("click", function () {
      deleteUserInput(index);
    });

    const eBtn = document.createElement("button");
    eBtn.textContent = "Edit";
    eBtn.classList.add("edit-button"); 

    eBtn.addEventListener("click", function () {
      editUserInput(index);
    });

    ul.appendChild(li);
    li.appendChild(dBtn);
    li.appendChild(eBtn);
  });
}


function deleteUserInput(index) {
  if (index >= 0 && index < storedItems.length) {
      storedItems.splice(index, 1);
      localStorage.setItem("user_tasks", JSON.stringify(storedItems));
      displayUserTasks();
    }
}

function editUserInput(index) {
  const newValue = prompt("Enter the new value:");
  if (newValue !== null && newValue.trim() !== "") {
    storedItems[index] = newValue.trim();
    localStorage.setItem("user_tasks", JSON.stringify(storedItems));
    displayUserTasks();
  } else {
    console.log("Invalid input or cancelled.");
  }
}

function updateCompletedTasks(index, isCompleted) {
  let completedTasks = localStorage.getItem("completed_tasks");
  completedTasks = completedTasks ? JSON.parse(completedTasks) : [];

  if (isCompleted && !completedTasks.includes(index.toString())) {
    completedTasks.push(index.toString());
  } else if (!isCompleted && completedTasks.includes(index.toString())) {
    completedTasks = completedTasks.filter(taskIndex => taskIndex !== index.toString());
  }

  localStorage.setItem("completed_tasks", JSON.stringify(completedTasks));
}