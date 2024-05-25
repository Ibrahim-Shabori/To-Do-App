const Task = (content, priority)=>
{
    return {
        content: content,
        priority: priority,
        htmlCode()
        {
            let code = `
            <div class="task-card">
                <div class="periority ${this.priorityClassStyle()}">${this.priority}</div>
                <form action="">
                    <div class="checkbox"><i class="fa-solid fa-check"></i></div>
                    <label spellcheck="false" contenteditable="true">${this.content}</label>
                    <button class="delete"><i class="fa-solid fa-xmark"></i></button>
                </form>
            </div>
            `;
            return code;
        },
        priorityClassStyle()
        {
            let styleClass = "";
            switch(this.priority)
            {
                case "urgent & important":
                    styleClass = "urgent-important";
                    break;
                case "not urgent | important":
                    styleClass = "not-urgent-important";
                    break;
                case "urgent | not important":
                    styleClass = "urgent-not-important";
                    break;
                case "not urgent & not important":
                    styleClass = "not-urgent-not-important"
                    break;
            }
            return styleClass;
        },
        addToTasksContainer()
        {
            let tasksContainer = document.querySelector("section.tasks div.tasks-container");
            tasksContainer.insertAdjacentHTML('beforeend', this.htmlCode());
        }
    }
}

// ADD button event
let addButton = document.querySelector("main button.add");
addButton.addEventListener("click", (evn)=>{
    evn.preventDefault();
    let taskText = document.querySelector("main form fieldset.task-text input").value.trim();
    let priority = document.querySelector("main form select").value.trim();
    if(taskText === "" || priority === "")
    {
        return;
    }

    let task = Task(taskText, priority);
    task.addToTasksContainer();
})



// Delete button event

let tasksContainer = document.querySelector("section.tasks div.tasks-container");

tasksContainer.addEventListener("click", (evn)=>{
    let getTaskCardOfDeleteButton = (button)=>
    {
        return button.parentNode.parentNode;
    }

    let target = evn.target;
    console.log(target.nodeName)
    if(target.nodeName == "I")
    {
        target = target.parentNode;
    }

    console.log("2", target.nodeName, target.className)

    switch(target.nodeName)
    {
        case "BUTTON":
            let taskCardB = getTaskCardOfDeleteButton(target);
            taskCardB.remove();
            break;
        case "DIV":
            if(target.className != "checkbox")
            {
                return;
            }

            let taskCard = target.parentNode.parentNode;
            let label = taskCard.querySelector('label');
            console.log(target.style.backgroundColor === '')
            if(target.style.backgroundColor === '')
            {
                target.style.backgroundColor = "aqua";
                label.style.textDecoration  = "line-through";
            }
            else
            {
                target.style.removeProperty("background-color");
                label.style.removeProperty("text-decoration");
            }
            break;

    }
    
})