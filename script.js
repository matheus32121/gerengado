// script.js

let cattleData = [];
let filteredData = [];
let currentModalIndex = null;

// Carregar dados do LocalStorage
function loadData() {
  const data = localStorage.getItem('cattleData');
  if (data) {
    cattleData = JSON.parse(data);
  }
}

// Salvar dados no LocalStorage
function saveData() {
  localStorage.setItem('cattleData', JSON.stringify(cattleData));
  updateChart();
  updateChart2();
}

// Renderizar a lista de gados com filtro e ordenação
function renderCattleList() {
  const list = document.getElementById('cattleList');
  list.innerHTML = '';
  filteredData.forEach((cattle, index) => {
    const li = document.createElement('li');
    li.innerHTML = `<span><strong>${cattle.name}</strong> | Raça: ${cattle.breed} | Idade: ${cattle.age} anos | Peso: ${cattle.weight} kg</span>`;
    
    const viewBtn = document.createElement('button');
    viewBtn.textContent = 'Visualizar';
    viewBtn.className = 'view';
    viewBtn.addEventListener('click', () => openModal(index));
    li.appendChild(viewBtn);
    
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Editar';
    editBtn.className = 'edit';
    editBtn.addEventListener('click', () => openModal(index));
    li.appendChild(editBtn);
    
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Excluir';
    deleteBtn.className = 'delete';
    deleteBtn.addEventListener('click', () => deleteCattle(index));
    li.appendChild(deleteBtn);
    
    const exportBtn = document.createElement('button');
    exportBtn.textContent = 'Exportar';
    exportBtn.className = 'export';
    exportBtn.addEventListener('click', () => exportCattle(cattle));
    li.appendChild(exportBtn);
    
    list.appendChild(li);
  });
}

// Adicionar um novo gado
function addCattle(event) {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const age = parseInt(document.getElementById('age').value);
  const weight = parseFloat(document.getElementById('weight').value);
  const breed = document.getElementById('breed').value;
  
  const newCattle = { id: Date.now(), name, age, weight, breed };
  cattleData.push(newCattle);
  applyFilterAndSort();
  saveData();
  document.getElementById('cattleForm').reset();
}

// Excluir um gado
function deleteCattle(index) {
  if (confirm('Tem certeza que deseja excluir este gado?')) {
    const idToDelete = filteredData[index].id;
    cattleData = cattleData.filter(cattle => cattle.id !== idToDelete);
    applyFilterAndSort();
    saveData();
  }
}

// Abrir modal para visualizar/editar
function openModal(index) {
  currentModalIndex = index;
  const cattle = filteredData[index];
  const modalBody = document.getElementById('modalBody');
  modalBody.innerHTML = `
    <label>Nome:</label>
    <input type="text" id="modalName" value="${cattle.name}">
    <label>Raça:</label>
    <input type="text" id="modalBreed" value="${cattle.breed}">
    <label>Idade (anos):</label>
    <input type="number" id="modalAge" value="${cattle.age}">
    <label>Peso (kg):</label>
    <input type="number" id="modalWeight" value="${cattle.weight}">
  `;
  document.getElementById('modal').style.display = 'flex';
}

// Fechar modal
function closeModal() {
  document.getElementById('modal').style.display = 'none';
  currentModalIndex = null;
}

// Salvar alterações do modal
function saveModalChanges() {
  if (currentModalIndex !== null) {
    const cattle = filteredData[currentModalIndex];
    cattle.name = document.getElementById('modalName').value;
    cattle.breed = document.getElementById('modalBreed').value;
    cattle.age = parseInt(document.getElementById('modalAge').value);
    cattle.weight = parseFloat(document.getElementById('modalWeight').value);
    
    // Atualiza no array original
    const indexInData = cattleData.findIndex(item => item.id === cattle.id);
    if (indexInData !== -1) {
      cattleData[indexInData] = cattle;
    }
    applyFilterAndSort();
    saveData();
    closeModal();
  }
}

// Filtrar a lista de gados com base na pesquisa
function applyFilter() {
  const searchTerm = document.getElementById('search').value.toLowerCase();
  filteredData = cattleData.filter(cattle =>
    cattle.name.toLowerCase().includes(searchTerm) ||
    cattle.breed.toLowerCase().includes(searchTerm)
  );
}

// Ordenar a lista com base na seleção
function applySort() {
  const sortValue = document.getElementById('sort').value;
  filteredData.sort((a, b) => {
    if (sortValue === 'name' || sortValue === 'breed') {
      return a[sortValue].localeCompare(b[sortValue]);
    } else {
      return a[sortValue] - b[sortValue];
    }
  });
}

// Aplica filtro e ordenação e re-renderiza a lista
function applyFilterAndSort() {
  applyFilter();
  applySort();
  renderCattleList();
}

// Configurar listeners
document.getElementById('cattleForm').addEventListener('submit', addCattle);
document.getElementById('search').addEventListener('input', applyFilterAndSort);
document.getElementById('sort').addEventListener('change', applyFilterAndSort);
document.getElementById('exportAllBtn').addEventListener('click', exportAllCattle);
document.getElementById('closeModal').addEventListener('click', closeModal);
document.getElementById('saveModalBtn').addEventListener('click', saveModalChanges);

// Inicialização
loadData();
filteredData = [...cattleData];
applyFilterAndSort();
