// chart.js

let chartInstance1 = null;
let chartInstance2 = null;

// Atualiza gráfico de pizza: Distribuição por Raça
function updateChart() {
  const breedCount = {};
  cattleData.forEach(cattle => {
    breedCount[cattle.breed] = (breedCount[cattle.breed] || 0) + 1;
  });
  const labels = Object.keys(breedCount);
  const data = Object.values(breedCount);
  
  const ctx1 = document.getElementById('cattleChart').getContext('2d');
  if (chartInstance1) chartInstance1.destroy();
  chartInstance1 = new Chart(ctx1, {
    type: 'pie',
    data: {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: labels.map(() => getRandomColor())
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { position: 'bottom' } }
    }
  });
}

// Atualiza gráfico de barras: Média de Peso por Raça
function updateChart2() {
  const breedStats = {};
  cattleData.forEach(cattle => {
    if (!breedStats[cattle.breed]) {
      breedStats[cattle.breed] = { totalWeight: 0, count: 0 };
    }
    breedStats[cattle.breed].totalWeight += cattle.weight;
    breedStats[cattle.breed].count++;
  });
  
  const labels = Object.keys(breedStats);
  const data = labels.map(breed => (breedStats[breed].totalWeight / breedStats[breed].count).toFixed(1));
  
  const ctx2 = document.getElementById('cattleChart2').getContext('2d');
  if (chartInstance2) chartInstance2.destroy();
  chartInstance2 = new Chart(ctx2, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Peso Médio (kg)',
        data: data,
        backgroundColor: labels.map(() => getRandomColor())
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: {
        y: { beginAtZero: true }
      }
    }
  });
}

// Função auxiliar para gerar cores aleatórias
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
