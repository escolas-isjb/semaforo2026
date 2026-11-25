/* ============================================================
   ESTADO GLOBAL
   ============================================================ */
let unidadeSelecionadaId = null; 
let graficosInstances = { radar: null, pizza: null, barras: null };

/* ============================================================
   INICIALIZAÇÃO E FILTRO GLOBAL
   ============================================================ */
function populateUnitSelect() {
  const select = document.getElementById("globalSearch");
  const sortedUnits = [...UNITS].sort((a, b) => a.name.localeCompare(b.name));
  
  sortedUnits.forEach((u, idx) => {
    const option = document.createElement("option");
    option.value = u.name.toLowerCase();
    option.textContent = u.name;
    select.appendChild(option);
  });
}

function aplicarFiltroGlobal() {
  const valor = document.getElementById("globalSearch").value;
  
  if (valor === "") {
    unidadeSelecionadaId = null;
    document.getElementById("titulo-graficos").textContent = "Visão Geral da Rede";
  } else {
    const idx = UNITS.findIndex(u => u.name.toLowerCase() === valor);
    unidadeSelecionadaId = idx;
    document.getElementById("titulo-graficos").textContent = "Análise Visual: " + UNITS[idx].name;
  }

  atualizarTudo();
}

function limparFiltroGlobal() {
  document.getElementById("globalSearch").value = "";
  unidadeSelecionadaId = null;
  atualizarTudo();
}

function renderTable(){
  const tbody = document.getElementById("networkTable");
  tbody.innerHTML = "";
  
  UNITS.forEach((u, idx) => {
    // A MÁGICA ESTÁ AQUI: Só filtra se uma unidade estiver selecionada E não for "todas"
    if (unidadeSelecionadaId !== null && unidadeSelecionadaId !== idx) return;

    const tr = document.createElement("tr");
    if (unidadeSelecionadaId === idx) tr.classList.add("selected");
    
    // Cria as bolinhas coloridas
    tr.innerHTML = `<td>${u.name}</td>` + u.matrix.map(s => `<td><span class="status ${s}">${s === "g" ? "✓" : "!"}</span></td>`).join("");
    
    // Ao clicar na linha, seleciona a unidade no filtro
    tr.addEventListener("click", () => {
      document.getElementById("globalSearch").value = u.name.toLowerCase();
      aplicarFiltroGlobal();
    });
    
    tbody.appendChild(tr);
  });
}

/* ============================================================
   SEMÁFORO CARDS
   ============================================================ */
function atualizarSemaforoCards() {
  let total = 0, g = 0, y = 0, r = 0;
  
  if (unidadeSelecionadaId !== null) {
    const u = UNITS[unidadeSelecionadaId];
    u.matrix.forEach(s => { total++; if (s === "g") g++; else if (s === "y") y++; else if (s === "r") r++; });
  } else {
    UNITS.forEach(u => u.matrix.forEach(s => { total++; if (s === "g") g++; else if (s === "y") y++; else if (s === "r") r++; }));
  }

  document.getElementById("kpi-green").textContent  = Math.round(g/total*100) + "%";
  document.getElementById("kpi-yellow").textContent = Math.round(y/total*100) + "%";
  document.getElementById("kpi-red").textContent    = Math.round(r/total*100) + "%";
  
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
  document.getElementById("kpi-actions").textContent = count;
}

/* ============================================================
   TABELA
   ============================================================ */
function renderHead(){
  const tr = document.getElementById("tableHead");
  tr.innerHTML = "<th>Unidade</th>" + AXES.map(a => `<th>${a}</th>`).join("");
}

function renderTable(){
  const tbody = document.getElementById("networkTable");
  tbody.innerHTML = "";
  
  UNITS.forEach((u, idx) => {
    if (unidadeSelecionadaId !== null && unidadeSelecionadaId !== idx) return;

    const tr = document.createElement("tr");
    if (unidadeSelecionadaId === idx) tr.classList.add("selected");
    
    tr.innerHTML = `<td>${u.name}</td>` + u.matrix.map(s => `<td><span class="status ${s}">${s === "g" ? "✓" : "!"}</span></td>`).join("");
    
    tr.addEventListener("click", () => {
      document.getElementById("globalSearch").value = u.name.toLowerCase();
      aplicarFiltroGlobal();
    });
    
    tbody.appendChild(tr);
  });
}

/* ============================================================
   BARRAS E INSIGHTS
   ============================================================ */
function renderBars(){
  const bars = document.getElementById("bars");
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
    ul.innerHTML = arr.length ? arr.map(t => `<li>${t}</li>`).join("") : `<li><em style="color:#829ab1">${fallback}</em></li>`;
  };
  fill("insight-red", prioridade, "Nenhum eixo crítico");
  fill("insight-yellow", atencao, "Nenhum eixo em atenção");
  fill("insight-green", potencial, "Nenhum eixo consolidado");
}

/* ============================================================
   PAINEL DE ANOTAÇÕES DINÂMICO
   ============================================================ */
function atualizarPainelAnotacoes() {
  const titulo = document.getElementById("titulo-anotacoes");
  const sub = document.getElementById("sub-anotacoes");
  const boxUnidade = document.getElementById("box-anotacao-unidade");
  const boxGlobal = document.getElementById("box-anotacao-global");

  if (unidadeSelecionadaId !== null) {
    const u = UNITS[unidadeSelecionadaId];
    titulo.textContent = "📝 Anotações: " + u.name;
    sub.textContent = "Suas observações privadas sobre esta unidade.";
    boxUnidade.style.display = "block";
    boxGlobal.style.display = "none";
    
    document.getElementById("user-notes").value = localStorage.getItem("semaforo_note_" + u.name.replace(/\s+/g, '_').toLowerCase()) || "";
  } else {
    titulo.textContent = "📝 Anotações Gerais da Rede";
    sub.textContent = "Observações estratégicas macro (não atreladas a uma unidade).";
    boxUnidade.style.display = "none";
    boxGlobal.style.display = "block";
    
    document.getElementById("global-notes").value = localStorage.getItem("semaforo_global_notes") || "";
  }
}

function saveNote() {
  if (unidadeSelecionadaId === null) return;
  const u = UNITS[unidadeSelecionadaId];
  const text = document.getElementById("user-notes").value;
  localStorage.setItem("semaforo_note_" + u.name.replace(/\s+/g, '_').toLowerCase(), text);
  document.getElementById("note-status").innerText = "Salvo!";
  setTimeout(() => document.getElementById("note-status").innerText = "", 2000);
}

function deleteNote() {
  if (unidadeSelecionadaId === null || !confirm("Excluir anotação desta unidade?")) return;
  const u = UNITS[unidadeSelecionadaId];
  localStorage.removeItem("semaforo_note_" + u.name.replace(/\s+/g, '_').toLowerCase());
  document.getElementById("user-notes").value = "";
  document.getElementById("note-status").innerText = "Excluído.";
  setTimeout(() => document.getElementById("note-status").innerText = "", 2000);
}

function saveGlobalNote() {
  localStorage.setItem("semaforo_global_notes", document.getElementById("global-notes").value);
  document.getElementById("global-note-status").innerText = "Salvo!";
  setTimeout(() => document.getElementById("global-note-status").innerText = "", 2000);
}

function deleteGlobalNote() {
  if(!confirm("Excluir anotações gerais da rede?")) return;
  localStorage.removeItem("semaforo_global_notes");
  document.getElementById("global-notes").value = "";
  document.getElementById("global-note-status").innerText = "Excluído.";
  setTimeout(() => document.getElementById("global-note-status").innerText = "", 2000);
}

/* ============================================================
   GRÁFICOS
   ============================================================ */
function renderGraficos() {
  const aviso = document.getElementById("aviso-sem-dados");
  const conteudo = document.getElementById("conteudo-graficos");

  if (unidadeSelecionadaId === null) {
    aviso.style.display = "block";
    conteudo.style.display = "none";
    return;
  }

  const unidade = UNITS[unidadeSelecionadaId];

  if (!unidade.dadosGraficos) {
    aviso.style.display = "block";
    conteudo.style.display = "none";
    aviso.innerHTML = "<h3>Sem dados gráficos para esta unidade.</h3><p>Rode o prompt da IA e cole no dados.js.</p>";
    return;
  }

  aviso.style.display = "none";
  conteudo.style.display = "block";

  const dados = unidade.dadosGraficos;
  document.getElementById("resumo-ia-texto").innerText = dados.insightsText.resumo;

  if (graficosInstances.radar) graficosInstances.radar.destroy();
  if (graficosInstances.pizza) graficosInstances.pizza.destroy();
  if (graficosInstances.barras) graficosInstances.barras.destroy();

  graficosInstances.radar = new Chart(document.getElementById('radarChart').getContext('2d'), {
    type: 'radar',
    data: {
      labels: dados.radar.labels,
      datasets: [{ label: 'Nota', data: dados.radar.data, backgroundColor: 'rgba(21, 50, 75, 0.2)', borderColor: 'rgba(21, 50, 75, 1)', pointBackgroundColor: 'rgba(21, 50, 75, 1)' }]
    },
    options: { responsive: true, maintainAspectRatio: false, scales: { r: { beginAtZero: true, max: 10, ticks: { stepSize: 2 } } } }
  });

  graficosInstances.pizza = new Chart(document.getElementById('pizzaChart').getContext('2d'), {
    type: 'doughnut',
    data: {
      labels: dados.pizzaStatus.labels,
      datasets: [{ data: dados.pizzaStatus.data, backgroundColor: ['#2f8b57', '#d69d16', '#c53d3d'], borderWidth: 1 }]
    },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }
  });

  graficosInstances.barras = new Chart(document.getElementById('barrasChart').getContext('2d'), {
    type: 'bar',
    data: { labels: dados.barrasSegmentos.labels, datasets: dados.barrasSegmentos.datasets },
    options: { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } }, plugins: { legend: { position: 'bottom' } } }
  });
}

/* ============================================================
   ABAS
   ============================================================ */
function openTab(tabId) {
  document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));
  document.getElementById(tabId).classList.add('active');
  event.currentTarget.classList.add('active');
}

/* ============================================================
   INIT
   ============================================================ */
document.getElementById("periodo").textContent = PERIODO;
document.getElementById("totalUnits").textContent = UNITS.length;
populateUnitSelect();
renderHead();
atualizarTudo();
