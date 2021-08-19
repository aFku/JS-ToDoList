import { ToDoElement } from "./ToDoElement.js"
import { saveList, loadList } from "./manageJSON.js"


export const createNewElement = (title, content, deadline) => {
    const newElement = new ToDoElement(title, content, deadline)
    elementsContainer.push(newElement)
    saveList(elementsContainer)
}

export const deleteElement = (index) => {
    elementsContainer.splice(index, 1)
    saveList(elementsContainer)
    window.location.reload()
}

export const updateElement = (index, title='', content='', deadline='') => {
    const element = elementsContainer[index]
    if(title != ''){
        element.setTitle(title)
    }
    if(content != ''){
        element.setContent(content)
    }
    if(deadline != ''){
        element.setDeadline(deadline)
    }
    saveList(elementsContainer)
}

export const changeDoneStatus = (index) => {
    const element = elementsContainer[index]
    element.setDone(!element.isDone)
    saveList(elementsContainer)
}

export const getElement = (index) => {
    return elementsContainer[index]
}

export const elementsContainer = loadList().length != 0 ? loadList() : []
