let unidadeSelecionadaId = null; 
let graficosInstances = { radar: null, pizza: null, barras: null };

function populateUnitSelect() {
  const select = document.getElementById("globalSearch");
  if (!select) return;
  
  select.innerHTML = '<option value="">Todas as Unidades (Visão Rede)</option>';
  const sortedUnits = [...UNITS].sort((a, b) => a.name.localeCompare(b.name));
  
  sortedUnits.forEach((u) => {
    const option = document.createElement("option");
    option.value = u.name.toLowerCase();
    option.textContent = u.name;
    select.appendChild(option);
  });
}

function aplicarFiltroGlobal() {
  const select = document.getElementById("globalSearch");
  if (!select) return;
  
  const valor = select.value;
  if (valor === "") {
    unidadeSelecionadaId = null;
    const titulo = document.getElementById("titulo-graficos");
    if(titulo) titulo.textContent = "Visão Geral da Rede";
  } else {
    const idx = UNITS.findIndex(u => u.name.toLowerCase() === valor);
    unidadeSelecionadaId = idx !== -1 ? idx : null;
    const titulo = document.getElementById("titulo-graficos");
    if(titulo) titulo.textContent = unidadeSelecionadaId !== null ? "Análise Visual: " + UNITS[unidadeSelecionadaId].name : "Visão Geral da Rede";
  }
  atualizarTudo();
}

function limparFiltroGlobal() {
  const select = document.getElementById("globalSearch");
  if(select) select.value = "";
  unidadeSelecionadaId = null;
  atualizarTudo();
}

function atualizarTudo() {
  atualizarSemaforoCards();
  renderTable();
  renderBars();
  renderInsights();
  renderGraficos();
  atualizarPainelAnotacoes();
  renderResumoExecutivo();
}

function atualizarSemaforoCards() {
  let total = 0, g = 0, y = 0, r = 0;
  
  if (unidadeSelecionadaId !== null) {
    const u = UNITS[unidadeSelecionadaId];
    u.matrix.forEach(s => { total++; if (s === "g") g++; else if (s === "y") y++; else if (s === "r") r++; });
  } else {
    UNITS.forEach(u => u.matrix.forEach(s => { total++; if (s === "g") g++; else if (s === "y") y++; else if (s === "r") r++; }));
  }

  const elG = document.getElementById("kpi-green");
  if(elG) elG.textContent = Math.round(g/total*100) + "%";
  const elY = document.getElementById("kpi-yellow");
  if(elY) elY.textContent = Math.round(y/total*100) + "%";
  const elR = document.getElementById("kpi-red");
  if(elR) elR.textContent = Math.round(r/total*100) + "%";
  
  let count = 0;
  AXES.forEach((_, j) => {
    let reds = 0;
    if (unidadeSelecionadaId !== null) {
      if (UNITS[unidadeSelecionadaId].matrix[j] === "r") reds++;
      if (reds > 0) count++;
    } else {
      UNITS.forEach(u => { if (u.matrix[j] === "r") reds++; });
      if (reds / UNITS.length > 0.5) count++;
    }
  });
  const kpiActions = document.getElementById("kpi-actions");
  if (kpiActions) kpiActions.textContent = count;
}

function renderHead(){
  const tr = document.getElementById("tableHead");
  if (tr) {
    tr.innerHTML = "<th>Unidade</th>" + AXES.map(a => `<th>${a}</th>`).join("") + "<th>Status Geral</th>";
  }
}

function renderTable(){
  const tbody = document.getElementById("networkTable");
  if (!tbody) return;
  tbody.innerHTML = "";
  
  UNITS.forEach((u, idx) => {
    if (unidadeSelecionadaId !== null && unidadeSelecionadaId !== idx) return;

    const tr = document.createElement("tr");
    if (unidadeSelecionadaId === idx) tr.classList.add("selected");
    
    let statusGeral = "g";
    if (u.matrix.includes("r")) statusGeral = "r";
    else if (u.matrix.includes("y")) statusGeral = "y";

    let html = `<td>${u.name}</td>`;
    u.matrix.forEach(s => {
      const texto = s === 'g' ? 'Consolidado' : s === 'y' ? 'Atenção' : 'Crítico';
      html += `<td><span class="status ${s}" title="${texto}">${s === "g" ? "✓" : "!"}</span></td>`;
    });
    html += `<td><span class="pill ${statusGeral}">${statusGeral === 'g' ? 'Bom' : statusGeral === 'y' ? 'Alerta' : 'Crítico'}</span></td>`;
    tr.innerHTML = html;
    tr.addEventListener("click", () => {
      const select = document.getElementById("globalSearch");
      if(select) select.value = u.name.toLowerCase();
      aplicarFiltroGlobal();
    });
    tbody.appendChild(tr);
  });
}

function renderBars(){
  const bars = document.getElementById("bars");
  if (!bars) return;
  bars.innerHTML = "";
  
  AXES.forEach((axis, j) => {
    let c = { r:0, y:0, g:0 };
    if (unidadeSelecionadaId !== null) {
      const s = UNITS[unidadeSelecionadaId].matrix[j];
      c[s] = 1;
    } else {
      UNITS.forEach(u => c[u.matrix[j]]++);
    }
    const total = unidadeSelecionadaId !== null ? 1 : UNITS.length;
    const pr = Math.round(c.r/total*100), py = Math.round(c.y/total*100), pg = 100 - pr - py;
    
    bars.innerHTML += `
      <div class="bar-row">
        <div class="bar-label"><span>${axis}</span><span>${pg}% verde · ${py}% amarelo · ${pr}% vermelho</span></div>
        <div class="bar"><div class="g" style="width:${pg}%"></div><div class="y" style="width:${py}%"></div><div class="r" style="width:${pr}%"></div></div>
      </div>`;
  });
}

function renderInsights(){
  const prioridade = [], atencao = [], potencial = [];
  if (unidadeSelecionadaId !== null) {
    const u = UNITS[unidadeSelecionadaId];
    AXES.forEach((axis, j) => {
      const s = u.matrix[j];
      if (s === "r") prioridade.push(axis);
      else if (s === "y") atencao.push(axis);
      else potencial.push(axis);
    });
  } else {
    AXES.forEach((axis, j) => {
      let r=0, y=0, g=0;
      UNITS.forEach(u => { const s = u.matrix[j]; if (s === "r") r++; else if (s === "y") y++; else g++; });
      const total = UNITS.length;
      if (r/total > 0.5) prioridade.push(axis);
      else if (y/total > 0.5) atencao.push(axis);
      else if (g/total > 0.5) potencial.push(axis);
    });
  }
  const fill = (id, arr, fallback) => {
    const ul = document.getElementById(id);
    if (!ul) return;
    ul.innerHTML = arr.length ? arr.map(t => `<li>${t}</li>`).join("") : `<li><em style="color:#829ab1">${fallback}</em></li>`;
  };
  fill("insight-red", prioridade, "Nenhum eixo crítico");
  fill("insight-yellow", atencao, "Nenhum eixo em atenção");
  fill("insight-green", potencial, "Nenhum eixo consolidado");
}

function renderResumoExecutivo() {
  const div = document.getElementById("resumo-executivo");
  if (!div) return;
  if (unidadeSelecionadaId === null) {
    div.innerHTML = "<strong>Visão da Rede:</strong> Selecione uma unidade no filtro acima para ver o diagnóstico.";
    return;
  }
  const u = UNITS[unidadeSelecionadaId];
  const verdes = u.matrix.filter(s => s === "g").length;
  const amarelos = u.matrix.filter(s => s === "y").length;
  const vermelhos = u.matrix.filter(s => s === "r").length;
  let fraseFinal = vermelhos > 0 ? "A atenção prioritária deve ser voltada para os eixos em vermelho." : amarelos > 0 ? "A unidade não tem pontos críticos, mas precisa monitorar os eixos em amarelo." : "Excelente! Todos os eixos estão consolidados.";
  div.innerHTML = `<strong>Diagnóstico de ${u.name}:</strong> A unidade possui <b>${verdes} eixos consolidados</b>, <b>${amarelos} em monitoramento</b> e <b>${vermelhos} críticos</b>. ${fraseFinal}`;
}

function atualizarPainelAnotacoes() {
  const titulo = document.getElementById("titulo-anotacoes");
  const sub = document.getElementById("sub-anotacoes");
  const boxUnidade = document.getElementById("box-anotacao-unidade");
  const boxGlobal = document.getElementById("box-anotacao-global");
  const listaGestao = document.getElementById("lista-comentarios-gestao");
  const userNotes = document.getElementById("user-notes");
  const globalNotes = document.getElementById("global-notes");

  if (!titulo || !boxUnidade || !boxGlobal || !listaGestao) return;

  if (unidadeSelecionadaId !== null) {
    const u = UNITS[unidadeSelecionadaId];
    titulo.textContent = "📝 Meus Comentários: " + u.name;
    sub.textContent = "Suas observações privadas sobre esta unidade.";
    boxUnidade.style.display = "block";
    boxGlobal.style.display = "none";
    
    // Só carrega do banco se o campo NÃO estiver em foco (evita apagar o que você está digitando)
    if (document.activeElement !== userNotes) {
      userNotes.value = localStorage.getItem("semaforo_note_" + u.name.replace(/\s+/g, '_').toLowerCase()) || "";
    }
    
    if (u.comentariosGestao && u.comentariosGestao.length > 0) {
      listaGestao.innerHTML = `<ul>${u.comentariosGestao.map(c => `<li>${c}</li>`).join("")}</ul>`;
    } else {
      listaGestao.innerHTML = "<p style='color: var(--muted); font-style: italic;'>Nenhum comentário aberto registrado para esta unidade.</p>";
    }

  } else {
    titulo.textContent = "📝 Meus Comentários Gerais da Rede";
    sub.textContent = "Observações macro (não atreladas a uma unidade).";
    boxUnidade.style.display = "none";
    boxGlobal.style.display = "block";
    
    if (document.activeElement !== globalNotes) {
      globalNotes.value = localStorage.getItem("semaforo_global_notes") || "";
    }
    
    listaGestao.innerHTML = "<p style='color: var(--muted); font-style: italic;'>Os comentários da gestão aparecem apenas quando uma unidade é selecionada.</p>";
  }
}
function saveNote() {
  if (unidadeSelecionadaId === null) return;
  const u = UNITS[unidadeSelecionadaId];
  const text = document.getElementById("user-notes").value;
  localStorage.setItem("semaforo_note_" + u.name.replace(/\s+/g, '_').toLowerCase(), text);
  const status = document.getElementById("note-status");
  if(status) { status.innerText = "Salvo com sucesso!"; setTimeout(() => status.innerText = "", 3000); }
}
function deleteNote() {
  if (unidadeSelecionadaId === null || !confirm("Excluir anotação desta unidade?")) return;
  const u = UNITS[unidadeSelecionadaId];
  localStorage.removeItem("semaforo_note_" + u.name.replace(/\s+/g, '_').toLowerCase());
  const el = document.getElementById("user-notes");
  if(el) el.value = "";
  const status = document.getElementById("note-status");
  if(status) { status.innerText = "Anotação excluída."; setTimeout(() => status.innerText = "", 3000); }
}

function saveGlobalNote() {
  localStorage.setItem("semaforo_global_notes", document.getElementById("global-notes").value);
  const status = document.getElementById("global-note-status");
  if(status) { status.innerText = "Salvo!"; setTimeout(() => status.innerText = "", 3000); }
}
function deleteGlobalNote() {
  if(!confirm("Excluir anotações gerais da rede?")) return;
  localStorage.removeItem("semaforo_global_notes");
  const el = document.getElementById("global-notes");
  if(el) el.value = "";
  const status = document.getElementById("global-note-status");
  if(status) { status.innerText = "Excluído."; setTimeout(() => status.innerText = "", 3000); }
}

function renderGraficos() {
  const aviso = document.getElementById("aviso-sem-dados");
  const conteudo = document.getElementById("conteudo-graficos");
  if (!aviso || !conteudo) return;

  if (unidadeSelecionadaId === null) {
    aviso.style.display = "block";
    conteudo.style.display = "none";
    return;
  }
  const unidade = UNITS[unidadeSelecionadaId];
  if (!unidade.dadosGraficos) {
    aviso.style.display = "block";
    conteudo.style.display = "none";
    aviso.innerHTML = "<h3>Sem dados gráficos para esta unidade.</h3>";
    return;
  }
  aviso.style.display = "none";
  conteudo.style.display = "block";
  const dados = unidade.dadosGraficos;
  const elResumo = document.getElementById("resumo-ia-texto");
  if(elResumo) elResumo.innerText = dados.insightsText.resumo;

  if (graficosInstances.radar) graficosInstances.radar.destroy();
  if (graficosInstances.pizza) graficosInstances.pizza.destroy();
  if (graficosInstances.barras) graficosInstances.barras.destroy();

  if (document.getElementById('radarChart')) {
    graficosInstances.radar = new Chart(document.getElementById('radarChart').getContext('2d'), {
      type: 'radar',
      data: { labels: dados.radar.labels, datasets: [{ label: 'Nota', data: dados.radar.data, backgroundColor: 'rgba(21, 50, 75, 0.2)', borderColor: 'rgba(21, 50, 75, 1)', pointBackgroundColor: 'rgba(21, 50, 75, 1)' }] },
      options: { responsive: true, maintainAspectRatio: false, scales: { r: { beginAtZero: true, max: 10, ticks: { stepSize: 2, font: { size: 14 } } } }, plugins: { legend: { labels: { font: { size: 14 } } } } }
    });
  }
  if (document.getElementById('pizzaChart')) {
    graficosInstances.pizza = new Chart(document.getElementById('pizzaChart').getContext('2d'), {
      type: 'doughnut',
      data: { labels: dados.pizzaStatus.labels, datasets: [{ data: dados.pizzaStatus.data, backgroundColor: ['#2f8b57', '#d69d16', '#c53d3d'], borderWidth: 1 }] },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { font: { size: 14 } } } } }
    });
  }
  if (document.getElementById('barrasChart')) {
    graficosInstances.barras = new Chart(document.getElementById('barrasChart').getContext('2d'), {
      type: 'bar',
      data: { labels: dados.barrasSegmentos.labels, datasets: dados.barrasSegmentos.datasets },
      options: { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true, ticks: { stepSize: 1, font: { size: 14 } } }, x: { ticks: { font: { size: 14 } } } }, plugins: { legend: { position: 'bottom', labels: { font: { size: 14 } } } } }
    });
  }
}

function openTab(tabId) {
  document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));
  const tab = document.getElementById(tabId);
  if(tab) tab.classList.add('active');
  if(event && event.currentTarget) event.currentTarget.classList.add('active');
}

window.onload = function() {
  const elPeriodo = document.getElementById("periodo");
  if(elPeriodo) elPeriodo.textContent = PERIODO;
  const elTotal = document.getElementById("totalUnits");
  if(elTotal) elTotal.textContent = UNITS.length;
  
  populateUnitSelect();
  renderHead();
  atualizarTudo();
};
