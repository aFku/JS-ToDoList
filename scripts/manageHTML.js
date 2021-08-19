import { updateElement, deleteElement, changeDoneStatus, getElement, createNewElement} from "./manageElements.js"
import { loadJSONToStorage, getJSON } from "./manageJSON.js"

var dateInstance = new Date()
var todayDate = new Date(dateInstance.getFullYear(), dateInstance.getMonth() + 1, dateInstance.getDate())
todayDate = todayDate.toLocaleDateString("fr-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    
})


export const refreshElement = (element, index) => {
    const htmlElement = document.querySelector(`.element-list #e_${index}`)
    htmlElement.querySelector(".element-title").innerHTML = element.title
    htmlElement.querySelector(".element-content").innerHTML = element.content
    htmlElement.querySelector(".element-deadline").innerHTML = `Deadline: ${element.deadline}. ${element.isDeadlinePassed() ? "You have still time" : "Deadline passed"}`
    htmlElement.querySelector(".element-isdone").innerHTML = `Is done: ${element.isDone ? "Yes" : "No"}`
    htmlElement.querySelector(".btn-done").innerHTML = `Mark as ${ element.isDone ? "undone" : "done" }`
}

export const printAllElements = (elementsContainer) =>{
    const htmlElementsContainer = document.querySelector(".element-list")
    elementsContainer.forEach((element, index) => {
        var htmlToDoNote = document.createElement('div')
        htmlToDoNote.class = "row"
        htmlToDoNote.innerHTML = `
            <div class="col-lg-12 list-element" id="e_${index}">
                <div class="content">
                    <h2 class="element-title">${element.title}</h2>
                    <hr>
                    <p class="element-content">${element.content}</p>
                    <p class="element-deadline">Deadline: ${element.deadline}. ${element.isDeadlinePassed() ? "You have still time" : "Deadline passed"} </p>
                    <p class="element-isdone">Is done: ${element.isDone ? "Yes" : "No"}</p>
                </div>
                <div class="utils">
                    <ul class="element-button-list">
                        <li>
                            <button class="btn-done btn btn-secondary"> Mark as ${element.isDone ? "undone" : "done"} </button>
                        </li>
                        <li>
                            <button class="btn-update btn btn-secondary"> Update </button>
                        </li>
                        <li>
                            <button class="btn-delete btn btn-danger"> Delete </button>
                        </li>
                    </ul>
                </div>
            </div>
        `
        htmlElementsContainer.appendChild(htmlToDoNote)
        htmlElementsContainer.querySelector(`#e_${index} .btn-done`).addEventListener("click", () =>{
            changeDoneStatus(index)
            refreshElement(element, index)
        })
        htmlElementsContainer.querySelector(`#e_${index} .btn-update`).addEventListener("click", () =>{
            showUpdateModal(index)
        })
        htmlElementsContainer.querySelector(`#e_${index} .btn-delete`).addEventListener("click", () =>{
            deleteElement(index)
        })
    });
}

const showUpdateModal = (index) => {
    const element = getElement(index)
    var modal = document.createElement("div")
    modal.className = "modal"
    modal.id = "modal-update"
    modal.tabIndex = -1
    modal.innerHTML = `
    <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5> Update your note </h5>
            </div>
            <div class="modal-body">
                <div class="container">
                    <div class="row modal-label">
                        <p id="modal-title-label">Title:</p>
                    </div>
                    <div class="row modal-input">
                        <input type="text" id="modal-input-title" value="${element.title}">
                    </div>
                    <div class="row modal-label">
                        <p id="modal-content-label">Content:</p>
                    </div>
                    <div class="row modal-input">
                        <input type="text" id="modal-input-content" value="${element.content}">
                    </div>
                    <div class="row modal-label">
                        <p id="modal-deadline-label">Deadline:</p>
                    </div>
                    <div class="row modal-input">
                        <input type="date" id="modal-input-deadline" value="${element.deadline}" min="${todayDate}" max="2100-01-01">
                    </div>
                </div>
            </div>
            <div class="modal-footer buttons-inline">
                <button type="button" class="btn btn-secondary" id="cancel-update-button">Cancel</button>
                <button type="button" class="btn btn-success" id="save-update-button">Save</button>
            </div>
        </div>
    </div>
    `
    modal.style.display = "block"
    modal.querySelector("#cancel-update-button").addEventListener("click", closeUpdateModal)
    modal.querySelector("#save-update-button").addEventListener("click", () =>{
        const titleField = modal.querySelector("#modal-input-title").value
        const contentField = modal.querySelector("#modal-input-content").value
        const deadlineField = modal.querySelector("#modal-input-deadline").value
        if(titleField === '' || contentField === '' || deadlineField === ''){
            alert("All fields should contain values")
            
        }else{
            updateElement(index, titleField, contentField, deadlineField)
            refreshElement(element, index)
            closeUpdateModal()
        }
    })
    document.body.appendChild(modal)
}

const closeUpdateModal = () => {
    document.querySelector("#modal-update").remove()
}

export const initAddNewElement = () =>{
    document.querySelector("#add-deadline").setAttribute("min", todayDate)
    document.querySelector("#add-deadline").setAttribute("max", "2100-01-01")
    document.querySelector("#add-button").addEventListener("click", () => {
        const title = document.querySelector("#add-title").value
        const content = document.querySelector("#add-content").value
        const deadline = document.querySelector("#add-deadline").value
        if(title === '' || content === '' || deadline === ''){
            alert("All fields should contain values")
            
        }else{
            createNewElement(title, content, deadline)
            window.location.reload()
        }
    })
}

export const initJSONSection = () => {
    document.querySelector("#json-load-button").addEventListener("click", () => {
        const fileReader = new FileReader()
        const JSONToRead = document.getElementById("json-selector").files[0]
        fileReader.readAsText(JSONToRead)
        fileReader.onload = () => {
            loadJSONToStorage(fileReader.result)
        }
        window.location.reload()

    })
    document.querySelector("#json-save-button").addEventListener("click", () =>{
        const JSONToSave = getJSON()
        var hiddenElement = document.createElement('a')
        hiddenElement.href = "data:attachment/text," + encodeURI(JSONToSave)
        hiddenElement.target = '_blank'
        hiddenElement.download = 'ToDo.json'
        hiddenElement.click()
    })
}