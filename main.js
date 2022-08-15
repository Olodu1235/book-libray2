let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let dateInput = document.getElementById("dateInput");
let textarea = document.getElementById("textarea");
let msg = document.getElementById("msg");
let tasks = document.getElementById("tasks");
let add = document.getElementById("add");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    formValidation();
  });
  
  let formValidation = () => {
    if (textInput.value === "") {
      console.log("failure");
      msg.innerHTML = "books cannot be blank";
    } else {
      console.log("success");
      msg.innerHTML = "";

      acceptData();
    add.setAttribute("data-bs-dismiss", "modal");
    add.click();

    (() => {
      add.setAttribute("data-bs-dismiss", "");
    })();
    }
  };

  let data = [];

let acceptData = () => {
  data.push({
    text: textInput.value,
    date: dateInput.value,
    description: textarea.value,
  });

  localStorage.setItem("data", JSON.stringify(data));

  console.log(data);

  createtasks();
};

let createtasks = () => {
    tasks.innerHTML = "";
    data.map((x, y) => {
      return (tasks.innerHTML += `
      <div id=${y}>
            <span class="fw-bold">${x.text}</span>
            <span class="small text-secondary">${x.date}</span>
            <p>${x.description}</p>
    
            <span class="options">
              <i onClick= "editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
              <i onClick ="deleteTask(this);createTasks()" class="fas fa-trash-alt"></i>
            </span>
          </div>
      `);

    });
  
    resetForm();
  };


  let resetForm = () => {
    textInput.value = "";
    dateInput.value = "";
    textarea.value = "";
  };

  let deleteTask = (e) => {
    e.parentElement.parentElement.remove();
  
    data.splice(e.parentElement.parentElement.id, 1);
  
    localStorage.setItem("data", JSON.stringify(data));
  
    console.log(data);
  };


  let editTask = (e) => {
    let selectedtask = e.parentElement.parentElement;
  
    textInput.value = selectedtask.children[0].innerHTML;
    dateInput.value = selectedtask.children[1].innerHTML;
    textarea.value = selectedtask.children[2].innerHTML;
  
    deleteTask(e);
  };


  (() => {
    data = JSON.parse(localStorage.getItem("data")) || [];
    console.log(data);
    createtasks();
  })();