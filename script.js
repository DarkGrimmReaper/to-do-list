const localStorageKey = 'to-do-list'

function valNewTask() {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    let inputValue = document.getElementById('itask').value
    let exists = values.find(x => x.name == inputValue)
    return !exists ? false : true
}

function newTask(){
    let input = document.getElementById('itask')
    input.style.border = ''

    //  validação
    if(!input.value) {
        input.style.border = '1px solid red'
        alert('Digite algo para inserir em sua lista')
    } else if (valNewTask()){
        alert('Já existe uma tarefa com essa descrição')
    } else {
        // localStorage
        let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
        values.push({
            name: input.value
        })
        localStorage.setItem(localStorageKey, JSON.stringify(values))
        showValues()
    }
    input.value = ''
}

function showValues() {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    let list = document.getElementById('ilist')
    list.innerHTML = ''
    for(let i = 0; i < values.length; i++){
        list.innerHTML += `<li>${values[i]['name']}<button id='ok' onclick='removeItem("${values[i]['name']}")'><i class="material-icons">done</i></button><li>`
    }
}

function removeItem(data) {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    let index = values.find(x => x.name == data)
    values.splice(index,1)
    localStorage.setItem(localStorageKey, JSON.stringify(values))
    showValues()
}

showValues()
