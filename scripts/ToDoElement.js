export class ToDoElement {
    constructor(title, content, deadline){
        this.title = title;
        this.content = content;
        this.deadline = `${deadline}`;
        this.isDone = false;
    }
    setDone = function(value) {
        this.isDone = value ? true : false;
    }
    setTitle = function(title){
        this.title = title;
    }
    setContent = function(content){
        this.content = content;
    }
    setDeadline = function(deadline){
        this.deadline = deadline;
    }
    isDeadlinePassed = function(){
        return Date.now() < Date.parse(this.deadline) ? true : false;
    }
}