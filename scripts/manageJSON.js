import { ToDoElement } from "./ToDoElement.js"

export const saveList = function(objectsArray){
    localStorage.setItem('ToDo', JSON.stringify(objectsArray))
}

export const loadList = function(){
    const list = localStorage.getItem('ToDo')
    const todoJSON = JSON.parse(list)
    const todoList = []
    $.each(todoJSON, (index, item) =>{
        const recratedElement = new ToDoElement('', '', '', '', '')
        Object.assign(recratedElement, item)
        todoList.push(recratedElement)
    })
    return todoList
}

export const loadJSONToStorage = (data) =>{
    localStorage.setItem('ToDo', data)
}

export const getJSON = () =>{
    return localStorage.getItem('ToDo')
}
