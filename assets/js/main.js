function myScope() {

    const inputTask = document.querySelector('.input-task');
    const btnSendTask = document.querySelector('.btn-send-task');
    const ulTasks = document.querySelector('.listTasks');

    btnSendTask.addEventListener('click', function () {
        if (!inputTask.value) return;
        createTask(inputTask.value);
    });

    inputTask.addEventListener('keypress', function (e) {
        if (e.keyCode === 13) {
            if (!inputTask.value) return;
            createTask(inputTask.value);
        }
    });

    document.addEventListener('click', function (e) {
        const el = e.target;

        if (el.classList.contains('delete-button')) {
            el.parentElement.remove();
            saveTasks();
        }
        if (el.classList.contains('checkBoxs')) {
            if (el.hasAttribute('checked')) {
                el.removeAttribute('checked');
                taskDone(el.parentElement, false);            
            } else {
                el.setAttribute('checked', true); 
                taskDone(el.parentElement, true);            
            }
            saveTasks();
        }

        if (el.classList.contains('clear-tasks')) {
            localStorage.clear();            
            document.location.reload(true);
        }

    });

    function createLi() {
        const newLi = document.createElement('li');
        return newLi;
    }

    function createCheckedBox(valueCheckedBox) {
        const checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        checkBox.classList = "checkBoxs";
        checkBox.defaultChecked = valueCheckedBox;
        return checkBox;
    }

    function createButtonDelete(li) {
        const buttonDelete = document.createElement('button');
        buttonDelete.innerText = 'Apagar';
        buttonDelete.setAttribute('class', 'delete-button');
        buttonDelete.setAttribute('title', 'Apagar está tarefa');

        li.innerHTML += ' ';
        li.appendChild(buttonDelete);
    }

    
    function saveTasks() {
        const liTasks = ulTasks.querySelectorAll('li');
        const listTaks = [];        
        for (let task of liTasks) {
            let taskText = task.innerText.replace('Apagar', '').trim();
            let checkedBox = task.querySelector('.checkBoxs');
            const objectTask = {
                textTask: taskText,
                valueBox: checkedBox.hasAttribute('checked')
            };
            
            listTaks.push(objectTask);
        }
        
        const listTasksJSON = JSON.stringify(listTaks);
        localStorage.setItem('list-tasks', listTasksJSON);
    }
    
    
    function recoverTasks() {
        
        const localTasks = localStorage.getItem('list-tasks');
        const listTasks = JSON.parse(localTasks);
        
        for (let task of listTasks) {
            let { textTask, valueBox } = task;
            createTask(textTask, valueBox);
        } 
    }

    function createTask(inputText, valueCheckedBox) {
        const newTask = {
            textTask: inputText,
            valueBox: valueCheckedBox ? true : false
        };

        clearInput();
        insertTask(newTask.textTask, newTask.valueBox);
    }

    function taskDone(li, valueCheckedBox){
        valueCheckedBox ? li.setAttribute('class', 'taskDone') : li.removeAttribute('class', 'taskDone');
        
    }

    function clearInput() {
        inputTask.value = '';
        inputTask.focus();
    }

    function insertTask(inputText, valueCheckedBox) {
        const li = createLi();
        const checkBox = createCheckedBox(valueCheckedBox);

        li.appendChild(checkBox);
        li.innerHTML += inputText;
        createButtonDelete(li);
        ulTasks.appendChild(li);        
        if(valueCheckedBox)  taskDone(li, true);
        saveTasks();
    }

    try {
        recoverTasks();
    }catch(e){       
    }
}

myScope();
