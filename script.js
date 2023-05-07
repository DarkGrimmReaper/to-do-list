const localStorageKey = 'to-do-list';

function valNewTask() {
  let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
  let inputValue = document.getElementById('itask').value;
  let exists = values.find(x => x.name == inputValue);
  return !exists ? false : true;
}

function newTask() {
  let input = document.getElementById('itask');
  input.style.border = '';

  //  validação
  if (!input.value) {
    input.style.border = '1px solid red';
    alert('Digite algo para inserir em sua lista');
  } else if (valNewTask()) {
    alert('Já existe uma tarefa com essa descrição');
  } else {
    // localStorage
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
    values.push({
      name: input.value,
      completed: false // adiciona o campo completed com valor inicial de false
    });
    localStorage.setItem(localStorageKey, JSON.stringify(values));
    showValues();
  }
  input.value = '';
}

function showValues() {
  let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
  let list = document.getElementById('ilist');
  list.innerHTML = '';
  for (let i = 0; i < values.length; i++) {
    if (!values[i].completed) { // verifica se a tarefa está incompleta
      list.innerHTML += `<li>${values[i]['name']}<button id='ok' onclick='removeItem("${values[i]['name']}")'><i class="material-icons">done</i></button><li>`;
    }
  }
}

function removeItem(data) {
  let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
  let index = values.findIndex(x => x.name == data);
  values[index].completed = true; // altera o campo completed para true
  localStorage.setItem(localStorageKey, JSON.stringify(values));
  showValues();

  // remove também do histórico
  let completedValues = JSON.parse(localStorage.getItem('completed-list') || "[]");
  let task = values[index];
  task.date = new Date().toLocaleString();
  completedValues.push(task);
  localStorage.setItem('completed-list', JSON.stringify(completedValues));
}

showValues();

// IA

document.getElementById('history-btn').addEventListener('click', function() {
  window.location.href = 'historico.html';
});
