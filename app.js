const header=document.querySelector(".header")
const input=document.querySelector("#task")
const addToDo=document.querySelector("#liveToastBtn")
const myList=document.querySelector("#list-group")
const secondBody=document.querySelector(".secondBody")
const clearBtn=document.querySelector(".Clearbutton")


let todos=[]


runEvents()

function runEvents(){
    document.addEventListener("DOMContentLoaded",pageLoaded)
    secondBody.addEventListener("click",removeTodo)
    secondBody.addEventListener("click",ToggleChecked)
    clearBtn.addEventListener("click",removeList)


}

function removeList(){
    const todoList=document.querySelectorAll("#list-group")
    if(todoList.length>0){
            todoList.forEach(element => {
            element.remove()
            showAlert("success","To Do Listesi Temizlenmistir")});
    }
    else{
        showAlert("warning","Silinecek To Do Listesi Bulunmamaktadir.")
    }
    todos=[]
    localStorage.setItem("todos",JSON.stringify(todos))

        
    

        
    
       
}

function ToggleChecked(e){
    if(e.target.className==="list-group-item d-flex justify-content-between"){
        e.target.className="checked"
    }
}

function removeTodo(e){

   
   if(e.target.className==="bi bi-trash"){
        const todo=e.target.parentElement
        todo.remove()

        showAlert("success","To Do Basarili Bir Sekilde Silinmistir..")

        deleteFromLocalStorage(todo.textContent)
   }
}

function deleteFromLocalStorage(deleteTodo){
    checkLocalStorage()
    todos.forEach((todo,index)=>{
        if(deleteTodo===todo){
            todos.splice(index,1)
        }
    })
    localStorage.setItem("todos",JSON.stringify(todos))
}

function pageLoaded(){
    checkLocalStorage()
    todos.forEach((todo)=>{
        addToDoUI(todo)
    })
}

function newElement(newTodo){
    const inputText=input.value.trim()
    if(inputText==null || inputText==""){
        showAlert("warning","En Az Bir Adet To Do Girilmelidir")
    }else{
        addToDoUI(inputText)
        addLocalStorage(inputText)
    }
}

function addToDoUI(newTodo){

    const li=document.createElement("li")
    li.className="list-group-item d-flex justify-content-between"
    li.textContent=newTodo

    const i=document.createElement("i")
    i.className="bi bi-trash"

    li.appendChild(i)
    myList.appendChild(li)

    showAlert("success","To Do Basarili Bir Sekilde Eklenmistir.")

    input.value=""
}

function addLocalStorage(newTodo){
    checkLocalStorage()
    todos.push(newTodo)
    localStorage.setItem("todos",JSON.stringify(todos))
}

function checkLocalStorage(){
    if(localStorage.getItem("todos")==null){
        todos=[]
    }else{
        todos=JSON.parse(localStorage.getItem("todos"))
    }
}

function showAlert(type,message){
    //     <div class="alert alert-primary" role="alert">
    //   A simple primary alert—check it out!
    // </div>

    const div=document.createElement("div")
    div.className=`alert alert-${type}`
    div.role="alert"
    div.textContent=message

    secondBody.appendChild(div)

    setTimeout(function(){
        div.remove()
    },2000)
}

