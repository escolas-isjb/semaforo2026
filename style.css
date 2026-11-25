/* ============================================================
   1. VARIÁVEIS E BASE
   ============================================================ */
:root {
  --primary: #15324b;
  --secondary: #315f7d;
  --accent: #d7a53f;
  --bg: #f4f6f8;
  --card: #ffffff;
  --text: #21303c;
  --muted: #6b7783;
  --border: #dfe5ea;
  --red: #c53d3d;
  --yellow: #d69d16;
  --green: #2f8b57;
  --soft-red: #fae9e9;
  --soft-yellow: #fff5d9;
  --soft-green: #e8f5ed;
}

* { box-sizing: border-box; }

html, body {
  height: 100%;
  margin: 0;
  overflow: hidden; /* regra de ouro: o painel não rola */
}

body {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 13px;
  background: var(--bg);
  color: var(--text);
  line-height: 1.35;
}

/* ============================================================
   2. ESTRUTURA — sidebar + main
   ============================================================ */
.app { display: flex; height: 100vh; }

.sidebar {
  width: 76px;
  flex-shrink: 0;
  background: linear-gradient(180deg, var(--primary), var(--secondary));
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 0;
  gap: 18px;
}

.sidebar-brand {
  color: #fff;
  font-weight: 900;
  font-size: 13px;
  letter-spacing: 1.5px;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
}

.nav-btn {
  position: relative;
  width: 48px;
  height: 48px;
  border: none;
  border-radius: 12px;
  background: transparent;
  color: rgba(255, 255, 255, .6);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background .15s, color .15s;
}

.nav-btn svg { width: 22px; height: 22px; }

.nav-btn:hover { background: rgba(255, 255, 255, .12); color: #fff; }

.nav-btn.active {
  background: rgba(255, 255, 255, .16);
  color: var(--accent);
}

.nav-btn.active::before {
  content: '';
  position: absolute;
  left: -14px;
  top: 8px;
  bottom: 8px;
  width: 3px;
  border-radius: 0 3px 3px 0;
  background: var(--accent);
}

/* Tooltip que aparece à direita do ícone */
.nav-btn::after {
  content: attr(data-label);
  position: absolute;
  left: 58px;
  top: 50%;
  transform: translateY(-50%);
  background: var(--primary);
  color: #fff;
  padding: 5px 10px;
  border-radius: 6px;
  font-size: 11px;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity .15s;
  z-index: 60;
}

.nav-btn:hover::after { opacity: 1; }

.sidebar-user {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255, 255, 255, .18);
  color: #fff;
  font-size: 11px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
}

.main {
  flex: 1;
  min-width: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

/* ============================================================
   3. TOPBAR
   ============================================================ */
.topbar {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 10px 18px;
  background: var(--card);
  border-bottom: 1px solid var(--border);
}

.topbar h1 { margin: 0; font-size: 17px; color: var(--primary); }
.topbar p { margin: 0; font-size: 11px; color: var(--muted); }

.topbar-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.topbar-actions label {
  font-size: 10px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: .4px;
  color: var(--muted);
}

.topbar-actions select {
  padding: 7px 10px;
  border: 1px solid var(--border);
  border-radius: 8px;
  font-family: inherit;
  font-size: 12px;
  font-weight: 700;
  color: var(--secondary);
  background: #fff;
  cursor: pointer;
  max-width: 280px;
}

.badge-periodo {
  background: var(--soft-yellow);
  color: #946b06;
  font-size: 11px;
  font-weight: 800;
  padding: 5px 10px;
  border-radius: 20px;
}

.btn-print {
  border: none;
  border-radius: 8px;
  padding: 8px 14px;
  background: var(--primary);
  color: #fff;
  font-family: inherit;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
}

.btn-print:hover { background: var(--secondary); }

/* ============================================================
   4. CONTEÚDO E ABAS
   ============================================================ */
.content {
  flex: 1;
  min-height: 0;
  padding: 14px;
  overflow: hidden;
}

.tab-panel { display: none; height: 100%; }
.tab-panel.active { display: block; }

/* ============================================================
   5. CARDS
   ============================================================ */
.card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 12px 14px;
  box-shadow: 0 3px 12px rgba(0, 0, 0, .04);
  display: flex;
  flex-direction: column;
  min-height: 0;
  overflow: hidden;
}

.card h2 {
  margin: 0 0 10px;
  padding-bottom: 7px;
  border-bottom: 1px solid var(--border);
  font-size: 12px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: .4px;
  color: var(--primary);
  flex-shrink: 0;
}

.subtitulo {
  margin: -4px 0 8px;
  font-size: 10px;
  color: var(--muted);
  font-style: italic;
  flex-shrink: 0;
}

/* Área de gráfico: sempre preenche o espaço que sobra */
.chart-wrap {
  position: relative;
  flex: 1;
  min-height: 0;
}

.chart-wrap canvas {
  position: absolute;
  inset: 0;
  width: 100% !important;
  height: 100% !important;
}

/* ============================================================
   6. ABA 1 — VISÃO GERAL
   ============================================================ */
.grid-visao {
  display: grid;
  grid-template-columns: 1.55fr 1fr;
  gap: 14px;
  height: 100%;
  min-height: 0;
}

.coluna-direita {
  display: grid;
  grid-template-rows: auto 1fr;
  gap: 14px;
  min-height: 0;
}

.tabela-scroll {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 10px;
  table-layout: fixed;
}

th, td {
  border-bottom: 1px solid var(--border);
  padding: 5px 3px;
  text-align: center;
  vertical-align: middle;
  word-wrap: break-word;
}

th {
  position: sticky;
  top: 0;
  background: #eef3f7;
  color: var(--primary);
  font-size: 8px;
  text-transform: uppercase;
  line-height: 1.1;
  z-index: 2;
}

td:first-child, th:first-child {
  text-align: left;
  font-weight: 700;
  width: 108px;
  padding-left: 6px;
}

tbody tr { cursor: pointer; transition: background .12s; }
tbody tr:hover { background: #f0f6fb; }
tbody tr.selecionada {
  background: #e3eef8;
  outline: 2px solid var(--secondary);
  outline-offset: -2px;
}

.status {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 8px;
  font-weight: 700;
}

.status.r { background: var(--red); }
.status.y { background: var(--yellow); }
.status.g { background: var(--green); }

.pill {
  padding: 2px 6px;
  border-radius: 6px;
  font-size: 8px;
  font-weight: 800;
  text-transform: uppercase;
}

.pill.r { background: var(--soft-red); color: var(--red); }
.pill.y { background: var(--soft-yellow); color: #946b06; }
.pill.g { background: var(--soft-green); color: var(--green); }

/* Mini cards */
.mini-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.mini-card {
  position: relative;
  overflow: hidden;
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 13px 8px 10px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .04);
}

.mini-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 4px;
}

.mini-card.red::before { background: var(--red); }
.mini-card.yellow::before { background: var(--yellow); }
.mini-card.green::before { background: var(--green); }

.mini-label {
  display: block;
  font-size: 9px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: .4px;
  color: var(--muted);
}

.mini-valor {
  display: block;
  margin-top: 2px;
  font-size: 24px;
  font-weight: 900;
  line-height: 1.1;
}

.mini-card.red .mini-valor { color: var(--red); }
.mini-card.yellow .mini-valor { color: #946b06; }
.mini-card.green .mini-valor { color: var(--green); }

/* ============================================================
   7. ABA 2 — DEVOLUTIVA
   ============================================================ */
.grid-devolutiva {
  display: grid;
  grid-template-columns: 0.6fr 1.5fr 0.9fr;
  gap: 14px;
  height: 100%;
  min-height: 0;
}

.semaforo-lista {
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
  min-height: 0;
  overflow-y: auto;
}

.semaforo-bloco {
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 9px 11px;
  flex-shrink: 0;
}

.semaforo-bloco.r { background: var(--soft-red); border-left: 4px solid var(--red); }
.semaforo-bloco.y { background: var(--soft-yellow); border-left: 4px solid var(--yellow); }
.semaforo-bloco.g { background: var(--soft-green); border-left: 4px solid var(--green); }

.semaforo-bloco h3 {
  margin: 0 0 5px;
  font-size: 10px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: .3px;
}

.semaforo-bloco ul {
  margin: 0;
  padding-left: 15px;
  font-size: 11px;
  line-height: 1.45;
}

.semaforo-bloco ul li.vazio {
  list-style: none;
  margin-left: -15px;
  color: var(--muted);
  font-style: italic;
}

/* Observações Analista */
.observacoes-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  flex: 1;
  min-height: 0;
}

.obs-coluna {
  display: flex;
  flex-direction: column;
  min-height: 0;
  border: 1px solid var(--border);
  border-radius: 10px;
  background: #fbfcfd;
  overflow: hidden;
}

.obs-header {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 7px 9px;
  font-size: 9px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: .3px;
  flex-shrink: 0;
}

.obs-header .dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.obs-header .contador {
  margin-left: auto;
  background: rgba(0, 0, 0, .08);
  border-radius: 10px;
  padding: 1px 6px;
  font-size: 9px;
}

.obs-coluna.r .obs-header { background: var(--soft-red); color: var(--red); }
.obs-coluna.y .obs-header { background: var(--soft-yellow); color: #946b06; }
.obs-coluna.g .obs-header { background: var(--soft-green); color: var(--green); }

.obs-coluna.r .dot { background: var(--red); }
.obs-coluna.y .dot { background: var(--yellow); }
.obs-coluna.g .dot { background: var(--green); }

.obs-lista {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding: 7px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.obs-card {
  position: relative;
  border-radius: 7px;
  padding: 7px 22px 7px 9px;
  font-size: 11px;
  line-height: 1.35;
  border-left: 3px solid;
  word-break: break-word;
}

.obs-coluna.r .obs-card { background: var(--soft-red); border-left-color: var(--red); color: #7d2626; }
.obs-coluna.y .obs-card { background: var(--soft-yellow); border-left-color: var(--yellow); color: #6f5205; }
.obs-coluna.g .obs-card { background: var(--soft-green); border-left-color: var(--green); color: #1f5c3a; }

.obs-card button {
  position: absolute;
  top: 3px;
  right: 3px;
  width: 16px;
  height: 16px;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: rgba(0, 0, 0, .08);
  color: inherit;
  font-size: 12px;
  line-height: 1;
  cursor: pointer;
}

.obs-card button:hover { background: rgba(0, 0, 0, .2); }

.obs-add {
  display: flex;
  gap: 5px;
  padding: 7px;
  border-top: 1px solid var(--border);
  flex-shrink: 0;
}

.obs-add input {
  flex: 1;
  min-width: 0;
  padding: 6px 8px;
  border: 1px solid var(--border);
  border-radius: 6px;
  font-family: inherit;
  font-size: 11px;
}

.obs-add input:focus {
  outline: none;
  border-color: var(--secondary);
}

.obs-add button {
  width: 28px;
  height: 28px;
  padding: 0;
  border: none;
  border-radius: 6px;
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  flex-shrink: 0;
}

.obs-coluna.r .obs-add button { background: var(--red); }
.obs-coluna.y .obs-add button { background: var(--yellow); }
.obs-coluna.g .obs-add button { background: var(--green); }

/* Comentários da Gestão */
.comentario-input {
  width: 100%;
  flex: 1;
  min-height: 0;
  padding: 10px;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: #fafbfc;
  font-family: inherit;
  font-size: 12px;
  font-style: italic;
  line-height: 1.55;
  color: var(--text);
  resize: none;
}
.comentario-input:focus {
  outline: none;
  border-color: var(--secondary);
  background: #fff;
}

.comentario-acoes {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
  flex-shrink: 0;
}

.comentario-status {
  margin-right: auto;
  font-size: 10px;
  color: var(--muted);
}

.btn-salvar,
.btn-excluir {
  border: none;
  border-radius: 6px;
  padding: 6px 12px;
  font-family: inherit;
  font-size: 11px;
  font-weight: 700;
  color: #fff;
  cursor: pointer;
}

.btn-salvar { background: var(--green); }
.btn-excluir { background: var(--red); }
.btn-salvar:hover { background: #26734a; }
.btn-excluir:hover { background: #a83232; }

/* ============================================================
   8. ABA 3 — ANÁLISE GRÁFICA
   ============================================================ */
.grid-analise {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto 1fr 1fr;
  gap: 14px;
  height: 100%;
  min-height: 0;
}

.card-leitura { grid-column: 1 / -1; }
.card-barras { grid-column: 1 / -1; }

#texto-leitura {
  margin: 0;
  font-size: 12px;
  line-height: 1.55;
}

#texto-leitura strong { color: var(--primary); }

/* ============================================================
   9. RESPONSIVO
   ============================================================ */
@media (max-width: 1100px) {
  .grid-visao,
  .grid-devolutiva,
  .grid-analise {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    height: auto;
  }

  html, body { overflow: auto; }
  .content { overflow: auto; }
  .tab-panel { height: auto; }
  .chart-wrap { height: 260px; flex: none; }
}

/* ============================================================
   10. IMPRESSÃO
   ============================================================ */
@media print {
  @page { size: A4 landscape; margin: .5cm; }

  html, body {
    height: auto;
    overflow: visible;
    background: #fff;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
    font-size: 10px;
  }

  .sidebar,
  .topbar-actions,
  .obs-add,
  .obs-card button,
  .comentario-acoes { display: none !important; }

  .app { display: block; height: auto; }
  .main { height: auto; }
  .content { height: auto; overflow: visible; padding: 0; }
  .tab-panel { height: auto; }
  .tab-panel:not(.active) { display: none !important; }

  .grid-visao,
  .grid-devolutiva,
  .grid-analise { height: auto; }

  .tabela-scroll,
  .obs-lista,
  .semaforo-lista { overflow: visible; max-height: none; }

  .card {
    box-shadow: none !important;
    border: 1px solid #ccc !important;
    break-inside: avoid;
  }

  .chart-wrap { height: 220px; flex: none; }
}
