// export.js

// Exporta os dados de um único gado
function exportCattle(cattle) {
  const dataStr = JSON.stringify(cattle, null, 4);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${cattle.name.replace(/\\s+/g, '_')}_detalhes.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

// Exporta todos os dados dos gados
function exportAllCattle() {
  if (!cattleData.length) {
    alert('Nenhum dado para exportar.');
    return;
  }
  const dataStr = JSON.stringify(cattleData, null, 4);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `todos_os_gados.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
