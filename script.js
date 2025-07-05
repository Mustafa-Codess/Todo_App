const titleInput = document.querySelector('#title');
const descInput = document.querySelector('#desc');
const btn = document.querySelector('#btn');
const todo = document.querySelector('#todo');

let listData = [];

function saveToStorage() {
  localStorage.setItem('data', JSON.stringify(listData));
}

function addtodo() {
  const titleVal = titleInput.value.trim();
  const descVal = descInput.value.trim();

  if (titleVal && descVal) {
    const newTodo = {
      title: titleVal,
      desc: descVal,
      time: new Date().toLocaleString()
    };
    listData.push(newTodo);
    saveToStorage();
    titleInput.value = '';
    descInput.value = '';
    titleInput.focus();
    disp();
  } else {
    alert("Please enter both title and description.");
  }
}

function disp() {
  if (listData.length === 0) {
    todo.innerHTML = `<p style="text-align:center;color:gray;">No todos yet. Add one above!</p>`;
    return;
  }

  const items = listData.map((e, i) => {
    return `
      <div>
        <h2>${e.title}</h2>
        <p>${e.desc}</p>
        <small style="color: gray;">${e.time}</small><br><br>
        <button onclick="edit(${i})" title="Edit"><i class="fa-solid fa-pen-to-square"></i></button>    
        <button onclick="del(${i})" title="Delete"><i class="fa-solid fa-trash"></i></button>
      </div>
    `;
  });

  todo.innerHTML = items.join('');
}

window.onload = function () {
  const dataLS = JSON.parse(localStorage.getItem('data')) || [];
  listData = dataLS.map(e => ({
    title: e.title,
    desc: e.desc,
    time: e.time || new Date().toLocaleString()
  }));
  disp();
};

function del(index) {
  listData.splice(index, 1);
  saveToStorage();
  disp();
}

function edit(index) {
  const item = listData[index];
  titleInput.value = item.title;
  descInput.value = item.desc;
  btn.setAttribute("onclick", `edittodo(${index})`);
  btn.textContent = "Update TODO";
  titleInput.focus();
}

function edittodo(index) {
  const titleVal = titleInput.value.trim();
  const descVal = descInput.value.trim();

  if (titleVal && descVal) {
    listData[index].title = titleVal;
    listData[index].desc = descVal;
    listData[index].time = new Date().toLocaleString();
    saveToStorage();
    disp();
    btn.setAttribute("onclick", "addtodo()");
    btn.textContent = "Add TODO";
    titleInput.value = '';
    descInput.value = '';
    titleInput.focus();
  } else {
    alert("Please fill in both fields to update the todo.");
  }
}
