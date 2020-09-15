// Select the Elements
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");
const add = document.querySelector(".add");

// CSS classes
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

// Variables
let LIST, id;

// get item from localstorage
let data = localStorage.getItem("TODO");

// check if data is not empty
if(data){
  LIST = JSON.parse(data);
  id = LIST.length;
  loadList(LIST);
}else{
  LIST = [];
  id = 0;
}

// load items to the users interface
function loadList(array){
  array.forEach(item => {
    addToDo(item.name, item.id, item.done, item.trash);
  });
}

// clear the local storage
clear.addEventListener("click", function(){
  localStorage.clear();
  location.reload();
})

// show todays date
const options = {weekday:"long", day:"numeric", month:"short"};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("pl", options);

// add todo function

function addToDo(todo, id, done, trash){

  if(trash){ return; }

  const DONE = done ? CHECK : UNCHECK;
  const LINE = done ? LINE_THROUGH : "";

  const item = `<li class="item">
                  <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                  <p class="text ${LINE}">${todo}</p>
                  <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                </li>
                `;
  const position = "beforeend";

  list.insertAdjacentHTML(position,item);
}

// add button event listener
add.addEventListener("click", event =>{
  const todo = input.value;

  //if input isn't empty
  if(todo){
    addToDo(todo, id, false, false);

    LIST.push({
      name : todo,
      id : id,
      done : false,
      trash : false
    });

    //add item to localstorage (this code must be added where the LIST array is updated)
    localStorage.setItem("TODO", JSON.stringify(LIST));

    id++;
    input.value = "";
  }
})
// add an item on enter press
document.addEventListener("keyup", function(event){
  if(event.keyCode == 13){
    const todo = input.value;

    //if input isn't empty
    if(todo){
      addToDo(todo, id, false, false);

      LIST.push({
        name : todo,
        id : id,
        done : false,
        trash : false
      });

      //add item to localstorage (this code must be added where the LIST array is updated)
      localStorage.setItem("TODO", JSON.stringify(LIST));

      id++;
    }
    input.value = "";
  }
});

// complete to do
function completeToDo(element){
  element.classList.toggle(CHECK);
  element.classList.toggle(UNCHECK);
  element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

  LIST[element.id].done = LIST[element.id].done ? false : true;
}

// remove to do
function removeToDo(element){
  element.parentNode.parentNode.removeChild(element.parentNode);
  LIST[element.id].trash = true;
}

//
list.addEventListener("click", function(event){
  const element = event.target; //return the clicked element inside list
  const elementJob = element.attributes.job.value; //complete or delete

  if(elementJob == "complete"){ completeToDo(element); }
  else if(elementJob == "delete"){ removeToDo(element); }

  //add item to localstorage (this code must be added where the LIST array is updated)
  localStorage.setItem("TODO", JSON.stringify(LIST));
})