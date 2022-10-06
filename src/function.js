import './style.css';
/* eslint-disable */
const form = document.getElementById('#form');
const inputcontainer = document.getElementById('inputcontainer');
const userInput = document.getElementById('userInput');
const userTasks = document.getElementById('userTasks');

inputcontainer.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    addToDo(userInput.value);
  }
});

let data = [];

const addToDo = (item) => {
  if (item !== '') {
    const todo = {
      description: String,
      completed: false,
      index: Number
    };
    todo.description = item;
    todo.index = data.length;
    data.push(todo);
    addToLocalStorage(data);
    userInput.value = '';
  }
};

const renderToDos = (todos) => {
  userTasks.innerHTML = '';
  todos.forEach((item) => {
    // const checked = item.completed ? 'checked' : null;
    const divEl = document.createElement('div');
    divEl.setAttribute('class', 'item');
    divEl.setAttribute('data-key', item.index);
    divEl.innerHTML = `
      <input type="checkbox" id="checkbox" />
      <p id="description" class="listText">${item.description}</p>
      <i id="${item.index}" class="fa-solid fa-trash-can trash"></i>
    `;
    userTasks.appendChild(divEl);

    const description = document.querySelectorAll('#description');
    description.forEach((e) => {
      e.addEventListener('click', () => {
        if (e.parentElement !== null) {
          editTask(
            divEl,
            e.parentElement.lastElementChild.previousElementSibling
          );
          divEl.classList.toggle('bgColor');
        }
      });
    });
    const trash = document.querySelectorAll('.fa-trash-can');
    trash.forEach((e) => {
      e.addEventListener('click', (e) => {
        const { id } = e.target;
        const childEl = document.getElementById(id);
        deletTask(childEl);
      });
    });
  });
};

const deletTask = (task) => {
  if (task.parentElement !== '') {
    task.parentElement.remove();
    data.splice(task.parentElement.index, 1);
  }
  data.forEach((task, index) => {
    task.index = index;
  });
  localStorage.setItem('data', JSON.stringify(data));
};

const addToLocalStorage = () => {
  localStorage.setItem('data', JSON.stringify(data));
  renderToDos(data);
};

const editTask = (itemContainer, todo) => {
  const editInput = document.createElement('input');
  editInput.type = 'text';
  editInput.className = 'editedList';
  editInput.value = todo.textContent;
  itemContainer.replaceChild(editInput, todo);

  editInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const listContainer = document.querySelectorAll('.item');
      const data = JSON.parse(localStorage.getItem('data'));
      for (let i = 0; i < listContainer.length; i++) {
        if (listContainer[i].classList.contains('bgColor')) {
          data[i].description = editInput.value;
          localStorage.setItem('data', JSON.stringify(data));
        }
      }
      editInput.parentElement.remove('bgColor');
      itemContainer.replaceChild(todo, editInput);
      todo.textContent = editInput.value;
      getFromLocalStorage();
    }
  });
};

const getFromLocalStorage = () => {
  const reference = localStorage.getItem('data');
  if (reference) {
    data = JSON.parse(reference);
    renderToDos(data);
  }
};
getFromLocalStorage();
