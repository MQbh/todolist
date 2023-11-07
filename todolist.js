import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

let inputElement = document.querySelector('.js-input')
let addButton = document.querySelector('.js-add-buton')
let todoContainerList = document.querySelector('.todolist-container')
let h1Element =document.querySelector('.today-div')
let filterTodo = document.querySelector('.filter-todo')
let today =dayjs()
let date = today.format('dddd,MMMM D')
let isChecked =false
h1Element.innerHTML=date
addButton.addEventListener('click',()=>{
  if(inputElement.value===''){
    return
  }else{
    let todo ={
      name:inputElement.value,
    }
    renderTodoList(todo)
  }
  inputElement.value=''
  saveData()
})

function renderTodoList(todo){
  
    let div = document.createElement('div')
    div.innerHTML=todo.name
    let button = document.createElement('button')
    button.innerHTML='<img width="25" height="25" src="https://img.icons8.com/ios/50/multiply.png" alt="multiply"/>'
    div.appendChild(button)
    todoContainerList.appendChild(div)
    
    saveData()
}

todoContainerList.addEventListener('click',(e)=>{
  if(e.target.tagName==='DIV'){
    if(!isChecked){
      e.target.classList.add('check')
      isChecked=true
      saveData()
    }else {
      e.target.classList.remove('check')
      isChecked=false
      saveData()
    }
 }else if(e.target.tagName==='BUTTON'){
    e.target.parentElement.classList.add('fall')
    e.target.parentElement.addEventListener('transitionend',function(){
    e.target.parentElement.remove()
    saveData()
  })
     saveData()
 }
})

filterTodo.addEventListener('click',(e)=>{
  const todos = todoContainerList.childNodes
  todos.forEach((todo)=>{
    switch (e.target.value) {
    case "All":
      todo.style.display='flex'
      break;
    case "completed":
      if(todo.classList.contains('check')){
        todo.style.display='flex'
      }else {
        todo.style.display='none'
      }
      break;
    case "remaining":
      if(!todo.classList.contains('check')){
        todo.style.display='flex'
      }else {
        todo.style.display='none'
      }
      break;
  }
  })
  
})

function saveData(){
  localStorage.setItem('data',todoContainerList.innerHTML)
}
function showData(){
  todoContainerList.innerHTML = localStorage.getItem('data')
}
showData()

