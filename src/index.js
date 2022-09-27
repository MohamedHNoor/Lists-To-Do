import './style.css';

const tasks = [
  {
    description: 'Run every day',
    completed: true,
    index: 0,
  },
  {
    description: 'Study JavaScript',
    completed: true,
    index: 1,
  },
  {
    description: 'Finish Tasks',
    completed: true,
    index: 2,
  },
];
const listContainer = document.querySelector('.listContainer');
tasks.forEach((task, index) => {
  if (index === task.index) {
    const inputList = document.createElement('div');
    inputList.className = 'inputList';
    inputList.innerHTML += `
  <div class="chexboxSpan">
  <input type="checkbox" class="checkbox"/>
  <span>${task.description}</span>
  </div>
  <i class="fa-solid fa-ellipsis-vertical"></i>
  <i class="fa-solid fa-trash"></i>
  `;
    listContainer.appendChild(inputList);
  }
});

listContainer.addEventListener('DOMContentLoaded', tasks);
