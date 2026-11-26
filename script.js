/* ============================================================
   1. DADOS
   Troque os nomes das unidades e os status aqui.
   Status possíveis: "g" (verde), "y" (amarelo), "r" (vermelho)
   ============================================================ */
const EIXOS = [
  "PPPP", "Reg.", "Currículo", "Plataf.",
  "Inclusão", "IA/Tec", "Matríc.", "Secret."
];

const UNIDADES = [
  { id: "u01", nome: "Araxá",                     matriz: ["g", "g", "g", "y", "g", "y", "g", "g"] },
  { id: "u02", nome: "BH",                        matriz: ["r", "y", "y", "r", "y", "r", "y", "y"] },
  { id: "u03", nome: "Goiânia",                   matriz: ["g", "g", "y", "g", "g", "y", "g", "g"] },
  { id: "u04", nome: "Núcleo Bandeirante",        matriz: ["y", "y", "g", "y", "y", "g", "y", "g"] },
  { id: "u05", nome: "Jardim Camburi",            matriz: ["g", "g", "g", "g", "g", "g", "g", "g"] },
  { id: "u06", nome: "Nossa Senhora da Vitória",  matriz: ["r", "r", "y", "y", "r", "y", "y", "r"] },
  { id: "u07", nome: "Jacarezinho",               matriz: ["y", "g", "g", "y", "g", "y", "g", "g"] },
  { id: "u08", nome: "Resende",                   matriz: ["g", "y", "y", "g", "y", "y", "g", "y"] },
  { id: "u09", nome: "Campos",                    matriz: ["y", "y", "r", "y", "y", "r", "y", "y"] },
  { id: "u10", nome: "Região Oceânica",           matriz: ["g", "g", "y", "g", "g", "g", "y", "g"] },
  { id: "u11", nome: "Santa Rosa",                matriz: ["r", "y", "y", "r", "y", "y", "r", "y"] }
];

const CORES = ["r", "y", "g"];

/* ============================================================
   2. ESTADO GLOBAL
   ============================================================ */
let unidadeSelecionada = null; // null = visão da rede
let indiceEmEdicao = null;     // card de gestão em edição

const graficos = {
  radarVisao: null,
  radarAnalise: null,
  doughnut: null,
  barras: null
};

/* ============================================================
   3. INICIALIZAÇÃO
   ============================================================ */
document.addEventListener("DOMContentLoaded", iniciar);

function iniciar() {
  migrarChavesAntigas();
  montarFiltro();
  montarAbas();
  montarObservacoes();
  montarComentariosGestao();
  montarAcoes();
  renderCabecalhoTabela();
  atualizarTudo();
}

function montarFiltro() {
  const select = document.getElementById("filtro-unidade");
  select.innerHTML = "";

  const todas = document.createElement("option");
  todas.value = "";
  todas.textContent = "Todas as Unidades (Visão Rede)";
  select.appendChild(todas);

  UNIDADES.forEach(function (u, i) {
    const opt = document.createElement("option");
    opt.value = String(i);
    opt.textContent = u.nome;
    select.appendChild(opt);
  });

  select.addEventListener("change", function () {
    unidadeSelecionada = select.value === "" ? null : Number(select.value);
    atualizarTudo();
  });
}

function montarAbas() {
  document.querySelectorAll(".nav-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      ativarAba(btn.dataset.tab);
    });
  });
}

function ativarAba(id) {
  document.querySelectorAll(".nav-btn").forEach(function (b) {
    b.classList.toggle("active", b.dataset.tab === id);
  });

  document.querySelectorAll(".tab-panel").forEach(function (p) {
    p.classList.toggle("active", p.id === "tab-" + id);
  });

  // Gráficos dentro de aba escondida nascem com tamanho zero.
  // Por isso redesenhamos ao entrar na aba.
  if (id === "visao-geral") renderRadarVisao();
  if (id === "analise") renderAnalise();
}

function abaAtiva() {
  const painel = document.querySelector(".tab-panel.active");
  return painel ? painel.id.replace("tab-", "") : "";
}

/* ============================================================
   4. ATUALIZAÇÃO GERAL
   ============================================================ */
function atualizarTudo() {
  indiceEmEdicao = null;
  renderTabela();
  renderMiniCards();
  renderRadarVisao();
  renderSemaforoExecutivo();
  renderObservacoes();
  renderComentariosGestao();
  renderAcoes();
  renderAnalise();
}

/* ============================================================
   5. HELPERS DE STATUS
   ============================================================ */
function valorStatus(s) {
  if (s === "g") return 3;
  if (s === "y") return 2;
  return 1;
}

function statusGeral(unidade) {
  if (unidade.matriz.indexOf("r") !== -1) return "r";
  if (unidade.matriz.indexOf("y") !== -1) return "y";
  return "g";
}

function rotuloStatus(s) {
  if (s === "g") return "Bom";
  if (s === "y") return "Alerta";
  return "Crítico";
}

function mediaRede() {
  return EIXOS.map(function (_, j) {
    let soma = 0;
    UNIDADES.forEach(function (u) {
      soma += valorStatus(u.matriz[j]);
    });
    return soma / UNIDADES.length;
  });
}

/* Cor do ponto conforme o nível: 3 = borda externa, 2 = meio, 1 = centro */
function corDoNivel(valor) {
  if (valor >= 2.5) return "#2f8b57"; // verde
  if (valor >= 1.5) return "#d69d16"; // amarelo
  return "#c53d3d";                    // vermelho
}

/* ============================================================
   6. CHAVES DE ARMAZENAMENTO E MIGRAÇÃO
   ============================================================ */
function idAtual() {
  return unidadeSelecionada === null ? "rede" : UNIDADES[unidadeSelecionada].id;
}

function chaveObservacoes() {
  return "semaforo_obs_" + idAtual();
}

function chaveComentarios() {
  return "semaforo_gestao_" + idAtual();
}

function chaveAcoes() {
  return "semaforo_acoes_" + idAtual();
}

/* Copia dados salvos com o padrão antigo (por nome) para o padrão novo (por id) */
function migrarChavesAntigas() {
  UNIDADES.forEach(function (u) {
    const slugAntigo = u.nome.toLowerCase().replace(/\s+/g, "_");

    ["semaforo_obs_", "semaforo_gestao_"].forEach(function (prefixo) {
      const chaveAntiga = prefixo + slugAntigo;
      const chaveNova = prefixo + u.id;
      const valor = localStorage.getItem(chaveAntiga);

      if (valor !== null && localStorage.getItem(chaveNova) === null) {
        localStorage.setItem(chaveNova, valor);
      }
    });
  });
}

/* ============================================================
   7. ABA 1 — TABELA
   ============================================================ */
function renderCabecalhoTabela() {
  const tr = document.getElementById("tabela-cabecalho");
  if (!tr) return;

  const titulos = ["Unidade"].concat(EIXOS).concat(["Status"]);
  tr.innerHTML = titulos.map(function (t) {
    return "<th>" + t + "</th>";
  }).join("");
}

function renderTabela() {
  const corpo = document.getElementById("tabela-corpo");
  if (!corpo) return;

  corpo.innerHTML = "";

  corpo.classList.toggle("com-filtro", unidadeSelecionada !== null);

  UNIDADES.forEach(function (u, indice) {
    const tr = document.createElement("tr");
    if (unidadeSelecionada === indice) tr.classList.add("selecionada");

    let html = "<td>" + u.nome + "</td>";

    u.matriz.forEach(function (s) {
      const titulo = s === "g" ? "Consolidado" : (s === "y" ? "Atenção" : "Crítico");
      const simbolo = s === "g" ? "✓" : "!";
      html += '<td><span class="status ' + s + '" title="' + titulo + '">' + simbolo + "</span></td>";
    });

    const geral = statusGeral(u);
    html += '<td><span class="pill ' + geral + '">' + rotuloStatus(geral) + "</span></td>";

    tr.innerHTML = html;
    tr.addEventListener("click", function () {
      selecionarUnidade(indice);
    });

    corpo.appendChild(tr);
  });
}

function selecionarUnidade(indice) {
  unidadeSelecionada = indice;
  const select = document.getElementById("filtro-unidade");
  if (select) select.value = indice === null ? "" : String(indice);
  atualizarTudo();
}

/* ============================================================
   8. ABA 1 — MINI CARDS
   ============================================================ */
function renderMiniCards() {
  let total = 0, verdes = 0, amarelos = 0, vermelhos = 0;

  const unidades = unidadeSelecionada === null
    ? UNIDADES
    : [UNIDADES[unidadeSelecionada]];

  unidades.forEach(function (u) {
    u.matriz.forEach(function (s) {
      total++;
      if (s === "g") verdes++;
      else if (s === "y") amarelos++;
      else vermelhos++;
    });
  });

  if (total === 0) return;

  document.getElementById("kpi-prioridade").textContent =
    Math.round(vermelhos / total * 100) + "%";
  document.getElementById("kpi-atencao").textContent =
    Math.round(amarelos / total * 100) + "%";
  document.getElementById("kpi-consolidado").textContent =
    Math.round(verdes / total * 100) + "%";
}

/* ============================================================
   9. ABA 1 — RADAR
   ============================================================ */
function renderRadarVisao() {
  if (abaAtiva() !== "visao-geral") return;

  const canvas = document.getElementById("chart-radar-visao");
  if (!canvas) return;

  const dados = unidadeSelecionada === null
    ? mediaRede()
    : UNIDADES[unidadeSelecionada].matriz.map(valorStatus);

  const rotulo = unidadeSelecionada === null
    ? "Média da Rede"
    : UNIDADES[unidadeSelecionada].nome;

  const coresPontos = dados.map(corDoNivel);

  if (graficos.radarVisao) graficos.radarVisao.destroy();

  graficos.radarVisao = new Chart(canvas, {
    type: "radar",
    data: {
      labels: EIXOS,
      datasets: [{
        label: rotulo,
        data: dados,
        backgroundColor: "rgba(21, 50, 75, .06)",
        borderColor: "rgba(21, 50, 75, .45)",
        borderWidth: 1.5,
        pointBackgroundColor: coresPontos,
        pointBorderColor: "#ffffff",
        pointBorderWidth: 1.5,
        pointRadius: 5,
        pointHoverRadius: 7
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        r: {
          min: 0,
          max: 3,
          ticks: { display: false, stepSize: 1 },
          grid: {
            color: [
              "rgba(197, 61, 61, .30)",
              "rgba(214, 157, 22, .30)",
              "rgba(47, 139, 87, .30)"
            ]
          },
          angleLines: { color: "#dfe5ea" },
          pointLabels: {
            color: "#21303c",
            font: { size: 9, weight: "bold" }
          }
        }
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: function (ctx) {
              const nomes = { 3: "Consolidado", 2: "Atenção", 1: "Prioridade" };
              return nomes[Math.round(ctx.raw)] || "";
            }
          }
        }
      }
    }
  });
}

/* ============================================================
   10. ABA 1 — AÇÕES PRIORITÁRIAS
   ============================================================ */
const ACOES_LINHAS = 3;
const ACOES_COLUNAS = 3;

function acoesVazias() {
  const vazio = [];
  for (let i = 0; i < ACOES_LINHAS; i++) {
    vazio.push(["", "", ""]);
  }
  return vazio;
}

function lerAcoes() {
  try {
    const dados = JSON.parse(localStorage.getItem(chaveAcoes()));

    if (Array.isArray(dados) && dados.length === ACOES_LINHAS) {
      return dados.map(function (linha) {
        return Array.isArray(linha) && linha.length === ACOES_COLUNAS
          ? linha
          : ["", "", ""];
      });
    }
  } catch (erro) {
    // sem dados salvos para esta unidade
  }

  return acoesVazias();
}

function gravarAcoes(dados) {
  localStorage.setItem(chaveAcoes(), JSON.stringify(dados));
}

function montarAcoes() {
  const corpo = document.getElementById("acoes-corpo");
  if (!corpo) return;

  // focusout borbulha (blur não), então funciona para todas as células
  corpo.addEventListener("focusout", salvarAcoes);
}

function renderAcoes() {
  const corpo = document.getElementById("acoes-corpo");
  if (!corpo) return;

  const dados = lerAcoes();
  const celulas = corpo.querySelectorAll("td");

  celulas.forEach(function (td, indice) {
    const linha = Math.floor(indice / ACOES_COLUNAS);
    const coluna = indice % ACOES_COLUNAS;
    const valor = dados[linha][coluna] || "";

    if (td.innerText !== valor) td.innerText = valor;
  });
}

function salvarAcoes() {
  const corpo = document.getElementById("acoes-corpo");
  if (!corpo) return;

  const dados = acoesVazias();
  const celulas = corpo.querySelectorAll("td");

  celulas.forEach(function (td, indice) {
    const linha = Math.floor(indice / ACOES_COLUNAS);
    const coluna = indice % ACOES_COLUNAS;
    dados[linha][coluna] = td.innerText.trim();
  });

  gravarAcoes(dados);
}

/* ============================================================
   11. ABA 2 — SEMÁFORO EXECUTIVO
   ============================================================ */
function renderSemaforoExecutivo() {
  const prioridades = [];
  const atencoes = [];
  const potenciais = [];

  if (unidadeSelecionada === null) {
    // Visão da rede: um eixo entra na lista quando a maioria está naquela cor
    EIXOS.forEach(function (eixo, j) {
      let r = 0, y = 0, g = 0;
      UNIDADES.forEach(function (u) {
        const s = u.matriz[j];
        if (s === "r") r++;
        else if (s === "y") y++;
        else g++;
      });
      const total = UNIDADES.length;
      if (r / total > 0.5) prioridades.push(eixo);
      else if (y / total > 0.5) atencoes.push(eixo);
      else if (g / total > 0.5) potenciais.push(eixo);
    });
  } else {
    const u = UNIDADES[unidadeSelecionada];
    EIXOS.forEach(function (eixo, j) {
      const s = u.matriz[j];
      if (s === "r") prioridades.push(eixo);
      else if (s === "y") atencoes.push(eixo);
      else potenciais.push(eixo);
    });
  }

  preencherLista("lista-prioridades", prioridades, "Nenhum eixo crítico");
  preencherLista("lista-atencoes", atencoes, "Nenhum eixo em atenção");
  preencherLista("lista-potenciais", potenciais, "Nenhum eixo consolidado");
}

function preencherLista(id, itens, textoVazio) {
  const ul = document.getElementById(id);
  if (!ul) return;

  ul.innerHTML = "";

  if (itens.length === 0) {
    const li = document.createElement("li");
    li.className = "vazio";
    li.textContent = textoVazio;
    ul.appendChild(li);
    return;
  }

  itens.forEach(function (item) {
    const li = document.createElement("li");
    li.textContent = item;
    ul.appendChild(li);
  });
}

/* ============================================================
   12. ABA 2 — OBSERVAÇÕES ANALISTA
   ============================================================ */
function montarObservacoes() {
  document.querySelectorAll(".obs-add button").forEach(function (btn) {
    btn.addEventListener("click", function () {
      adicionarCard(btn.dataset.cor);
    });
  });

  document.querySelectorAll(".obs-add input").forEach(function (input) {
    input.addEventListener("keydown", function (evento) {
      if (evento.key === "Enter") {
        evento.preventDefault();
        adicionarCard(input.dataset.cor);
      }
    });
  });
}

function lerObservacoes() {
  try {
    const bruto = localStorage.getItem(chaveObservacoes());
    const dados = JSON.parse(bruto);
    if (dados && typeof dados === "object") {
      return {
        r: Array.isArray(dados.r) ? dados.r : [],
        y: Array.isArray(dados.y) ? dados.y : [],
        g: Array.isArray(dados.g) ? dados.g : []
      };
    }
  } catch (erro) {
    // sem dados salvos ou formato inválido
  }
  return { r: [], y: [], g: [] };
}

function gravarObservacoes(dados) {
  localStorage.setItem(chaveObservacoes(), JSON.stringify(dados));
}

function renderObservacoes() {
  const dados = lerObservacoes();

  CORES.forEach(function (cor) {
    const lista = document.getElementById("obs-lista-" + cor);
    const contador = document.getElementById("contador-" + cor);
    if (!lista) return;

    lista.innerHTML = "";

    dados[cor].forEach(function (texto, indice) {
      const card = document.createElement("div");
      card.className = "obs-card";

      const span = document.createElement("span");
      span.textContent = texto; // textContent evita injeção de HTML

      const btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = "×";
      btn.title = "Excluir card";
      btn.addEventListener("click", function () {
        excluirCard(cor, indice);
      });

      card.appendChild(span);
      card.appendChild(btn);
      lista.appendChild(card);
    });

    if (contador) contador.textContent = dados[cor].length;
  });
}

function adicionarCard(cor) {
  const input = document.getElementById("obs-input-" + cor);
  if (!input) return;

  const texto = input.value.trim();
  if (texto === "") return;

  const dados = lerObservacoes();
  dados[cor].push(texto);
  gravarObservacoes(dados);

  input.value = "";
  input.focus();

  renderObservacoes();
}

function excluirCard(cor, indice) {
  const dados = lerObservacoes();
  dados[cor].splice(indice, 1);
  gravarObservacoes(dados);
  renderObservacoes();
}

/* ============================================================
   13. ABA 2 — COMENTÁRIOS DA GESTÃO
   ============================================================ */
function montarComentariosGestao() {
  const botao = document.getElementById("gestao-btn-add");
  const input = document.getElementById("gestao-input");

  if (botao) {
    botao.addEventListener("click", adicionarComentario);
  }

  if (input) {
    input.addEventListener("keydown", function (evento) {
      if (evento.key === "Enter") {
        evento.preventDefault();
        adicionarComentario();
      }
    });
  }
}

function lerComentarios() {
  const bruto = localStorage.getItem(chaveComentarios());
  if (!bruto) return [];

  try {
    const dados = JSON.parse(bruto);

    if (Array.isArray(dados)) {
      return dados.filter(function (t) {
        return typeof t === "string" && t.trim() !== "";
      });
    }

    if (typeof dados === "string") {
      return dados.trim() === "" ? [] : [dados];
    }
  } catch (erro) {
    // valor antigo salvo como texto puro, sem JSON
    return bruto.trim() === "" ? [] : [bruto];
  }

  return [];
}

function gravarComentarios(itens) {
  localStorage.setItem(chaveComentarios(), JSON.stringify(itens));
}

function renderComentariosGestao() {
  const lista = document.getElementById("gestao-lista");
  if (!lista) return;

  const itens = lerComentarios();
  lista.innerHTML = "";

  if (itens.length === 0) {
    const vazio = document.createElement("p");
    vazio.className = "gestao-vazio";
    vazio.textContent = "Nenhum comentário registrado.";
    lista.appendChild(vazio);
    return;
  }

  itens.forEach(function (texto, indice) {
    const card = document.createElement("div");
    card.className = "gestao-card";

    if (indiceEmEdicao === indice) {
      const area = document.createElement("textarea");
      area.className = "gestao-edit";
      area.value = texto;

      const acoes = document.createElement("div");
      acoes.className = "gestao-edit-acoes";

      const cancelar = document.createElement("button");
      cancelar.type = "button";
      cancelar.className = "btn-cancelar";
      cancelar.textContent = "Cancelar";
      cancelar.addEventListener("click", function () {
        indiceEmEdicao = null;
        renderComentariosGestao();
      });

      const salvar = document.createElement("button");
      salvar.type = "button";
      salvar.className = "btn-salvar";
      salvar.textContent = "Salvar";
      salvar.addEventListener("click", function () {
        salvarEdicaoComentario(indice, area.value);
      });

      acoes.appendChild(cancelar);
      acoes.appendChild(salvar);
      card.appendChild(area);
      card.appendChild(acoes);
    } else {
      const span = document.createElement("span");
      span.className = "gestao-texto";
      span.textContent = texto;

      const editar = document.createElement("button");
      editar.type = "button";
      editar.className = "gestao-btn-editar";
      editar.textContent = "✎";
      editar.title = "Editar";
      editar.addEventListener("click", function () {
        indiceEmEdicao = indice;
        renderComentariosGestao();
      });

      const excluir = document.createElement("button");
      excluir.type = "button";
      excluir.className = "gestao-btn-excluir";
      excluir.textContent = "×";
      excluir.title = "Excluir";
      excluir.addEventListener("click", function () {
        excluirComentario(indice);
      });

      card.appendChild(span);
      card.appendChild(editar);
      card.appendChild(excluir);
    }

    lista.appendChild(card);
  });
}

function adicionarComentario() {
  const input = document.getElementById("gestao-input");
  if (!input) return;

  const texto = input.value.trim();
  if (texto === "") return;

  const itens = lerComentarios();
  itens.push(texto);
  gravarComentarios(itens);

  input.value = "";
  input.focus();

  indiceEmEdicao = null;
  renderComentariosGestao();
}

function salvarEdicaoComentario(indice, novoTexto) {
  const texto = novoTexto.trim();
  const itens = lerComentarios();

  if (texto === "") {
    itens.splice(indice, 1);
  } else {
    itens[indice] = texto;
  }

  gravarComentarios(itens);
  indiceEmEdicao = null;
  renderComentariosGestao();
}

function excluirComentario(indice) {
  const itens = lerComentarios();
  itens.splice(indice, 1);
  gravarComentarios(itens);

  indiceEmEdicao = null;
  renderComentariosGestao();
}

/* ============================================================
   14. ABA 3 — ANÁLISE GRÁFICA
   ============================================================ */
function renderAnalise() {
  if (abaAtiva() !== "analise") return;

  renderLeitura();
  renderRadarAnalise();
  renderDoughnut();
  renderBarras();
}

function renderLeitura() {
  const el = document.getElementById("texto-leitura");
  if (!el) return;

  if (unidadeSelecionada === null) {
    let verdes = 0, amarelos = 0, vermelhos = 0;
    UNIDADES.forEach(function (u) {
      u.matriz.forEach(function (s) {
        if (s === "g") verdes++;
        else if (s === "y") amarelos++;
        else vermelhos++;
      });
    });

    el.innerHTML =
      "<strong>Visão da Rede:</strong> as 11 unidades somam " +
      (verdes + amarelos + vermelhos) + " avaliações de eixo, sendo " +
      "<strong>" + verdes + " consolidadas</strong>, " +
      "<strong>" + amarelos + " em atenção</strong> e " +
      "<strong>" + vermelhos + " críticas</strong>. " +
      "Selecione uma unidade no filtro para ver a leitura individual.";
    return;
  }

  const u = UNIDADES[unidadeSelecionada];
  const verdes = u.matriz.filter(function (s) { return s === "g"; }).length;
  const amarelos = u.matriz.filter(function (s) { return s === "y"; }).length;
  const vermelhos = u.matriz.filter(function (s) { return s === "r"; }).length;

  const criticos = EIXOS.filter(function (e, i) { return u.matriz[i] === "r"; });
  const atencao = EIXOS.filter(function (e, i) { return u.matriz[i] === "y"; });

  let frase = "";

  if (vermelhos > 0) {
    frase = "A prioridade de intervenção está em " + criticos.join(", ") + ".";
  } else if (amarelos > 0) {
    frase = "Não há eixos críticos, mas é preciso monitorar " + atencao.join(", ") + ".";
  } else {
    frase = "Todos os eixos estão consolidados.";
  }

  el.innerHTML =
    "<strong>" + u.nome + ":</strong> " +
    "<strong>" + verdes + " eixos consolidados</strong>, " +
    "<strong>" + amarelos + " em atenção</strong> e " +
    "<strong>" + vermelhos + " críticos</strong>. " + frase;
}

function renderRadarAnalise() {
  const canvas = document.getElementById("chart-radar-analise");
  if (!canvas) return;

  const media = mediaRede();
  const datasets = [];

  if (unidadeSelecionada !== null) {
    datasets.push({
      label: UNIDADES[unidadeSelecionada].nome,
      data: UNIDADES[unidadeSelecionada].matriz.map(valorStatus),
      backgroundColor: "rgba(21, 50, 75, .18)",
      borderColor: "#15324b",
      borderWidth: 2,
      pointBackgroundColor: "#15324b",
      pointRadius: 3
    });
  }

  datasets.push({
    label: "Média da Rede",
    data: media,
    backgroundColor: "rgba(215, 165, 63, .12)",
    borderColor: "#d7a53f",
    borderWidth: 2,
    borderDash: [5, 4],
    pointBackgroundColor: "#d7a53f",
    pointRadius: 2
  });

  if (graficos.radarAnalise) graficos.radarAnalise.destroy();

  graficos.radarAnalise = new Chart(canvas, {
    type: "radar",
    data: { labels: EIXOS, datasets: datasets },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        r: {
          min: 0,
          max: 3,
          ticks: { display: false, stepSize: 1 },
          grid: { color: "#dfe5ea" },
          angleLines: { color: "#dfe5ea" },
          pointLabels: {
            color: "#21303c",
            font: { size: 9, weight: "bold" }
          }
        }
      },
      plugins: {
        legend: {
          position: "bottom",
          labels: { boxWidth: 10, font: { size: 10 } }
        }
      }
    }
  });
}

function renderDoughnut() {
  const canvas = document.getElementById("chart-doughnut");
  if (!canvas) return;

  let verdes = 0, amarelos = 0, vermelhos = 0;

  const unidades = unidadeSelecionada === null
    ? UNIDADES
    : [UNIDADES[unidadeSelecionada]];

  unidades.forEach(function (u) {
    u.matriz.forEach(function (s) {
      if (s === "g") verdes++;
      else if (s === "y") amarelos++;
      else vermelhos++;
    });
  });

  if (graficos.doughnut) graficos.doughnut.destroy();

  graficos.doughnut = new Chart(canvas, {
    type: "doughnut",
    data: {
      labels: ["Consolidado", "Atenção", "Prioridade"],
      datasets: [{
        data: [verdes, amarelos, vermelhos],
        backgroundColor: ["#2f8b57", "#d69d16", "#c53d3d"],
        borderWidth: 2,
        borderColor: "#ffffff"
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: "58%",
      plugins: {
        legend: {
          position: "bottom",
          labels: { boxWidth: 10, font: { size: 10 } }
        }
      }
    }
  });
}

function renderBarras() {
  const canvas = document.getElementById("chart-barras");
  if (!canvas) return;

  const consolidado = EIXOS.map(function (_, j) {
    return UNIDADES.filter(function (u) { return u.matriz[j] === "g"; }).length;
  });

  const atencao = EIXOS.map(function (_, j) {
    return UNIDADES.filter(function (u) { return u.matriz[j] !== "g"; }).length;
  });

  if (graficos.barras) graficos.barras.destroy();

  graficos.barras = new Chart(canvas, {
    type: "bar",
    data: {
      labels: EIXOS,
      datasets: [
        {
          label: "Consolidado",
          data: consolidado,
          backgroundColor: "#2f8b57",
          borderRadius: 4
        },
        {
          label: "Atenção + Prioridade",
          data: atencao,
          backgroundColor: "#c53d3d",
          borderRadius: 4
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: "y",
      scales: {
        x: {
          beginAtZero: true,
          max: UNIDADES.length,
          ticks: { stepSize: 1, font: { size: 10 } },
          grid: { color: "#eef3f7" }
        },
        y: {
          ticks: { font: { size: 10, weight: "bold" } },
          grid: { display: false }
        }
      },
      plugins: {
        legend: {
          position: "bottom",
          labels: { boxWidth: 10, font: { size: 10 } }
        }
      }
    }
  });
}
