// ============================================================
// DADOS DAS UNIDADES — SEMÁFORO ISJB
// ------------------------------------------------------------
// Edite SOMENTE este arquivo para atualizar o dashboard.
// Após editar, salve e recarregue o navegador (Ctrl + F5).
//
// Legenda dos status na matriz:
//   "g" = verde   (consolidado)
//   "y" = amarelo (monitorar/melhorar)
//   "r" = vermelho (prioridade)
//
// Ordem dos 8 eixos (sempre respeitar esta ordem):
//   1. PPPP
//   2. Regimento / Avaliação
//   3. Currículo RSB
//   4. Plataformas / BI
//   5. Inclusão
//   6. IA / Tecnologia
//   7. Matrículas
//   8. Secretaria / TOTVS
// ============================================================

const PERIODO = "Encerramento 2026";

const AXES = [
  "PPPP",
  "Regimento / Avaliação",
  "Currículo RSB",
  "Plataformas / BI",
  "Inclusão",
  "IA / Tecnologia",
  "Matrículas",
  "Secretaria / TOTVS"
];

const UNITS = [
  {
    name: "Goiânia",
    matrix: ["g","y","y","y","g","y","g","y"],
    summary: "",
    red:  [],
    yellow: [],
    green: [],
    actions: [],
    risk: "", opportunity: "", support: "", practice: ""
  },
  {
    name: "Dom Bosco de Araxá",
    matrix: ["g","y","y","y","y","y","y","y"],
    summary: "",
    red:  [],
    yellow: [],
    green: [],
    actions: [],
    risk: "", opportunity: "", support: "", practice: ""
  },
  {
    name: "Campos dos Goytacazes",
    matrix: ["y","g","y","y","g","y","y","y"],
    summary: "",
    red:  [],
    yellow: [],
    green: [],
    actions: [],
    risk: "", opportunity: "", support: "", practice: ""
  },
  {
    name: "Resende",
    matrix: ["g","g","g","y","g","y","g","g"],
    summary: "",
    red:  [],
    yellow: [],
    green: [],
    actions: [],
    risk: "", opportunity: "", support: "", practice: ""
  },
  {
    name: "Jacarezinho",
    matrix: ["y","y","y","y","y","y","y","y"],
    summary: "",
    red:  [],
    yellow: [],
    green: [],
    actions: [],
    risk: "", opportunity: "", support: "", practice: ""
  },
  {
    name: "Jardim Camburi",
    matrix: ["g","g","y","g","g","y","g","g"],
    summary: "",
    red:  [],
    yellow: [],
    green: [],
    actions: [],
    risk: "", opportunity: "", support: "", practice: ""
  },
  {
    name: "Nossa Senhora da Vitória",
    matrix: ["g","y","y","y","g","y","y","y"],
    summary: "",
    red:  [],
    yellow: [],
    green: [],
    actions: [],
    risk: "", opportunity: "", support: "", practice: ""
  },
  {
    name: "Região Oceânica",
    matrix: ["g","g","g","y","g","y","g","y"],
    summary: "",
    red:  [],
    yellow: [],
    green: [],
    actions: [],
    risk: "", opportunity: "", support: "", practice: ""
  },
  {
    name: "Santa Rosa",
    matrix: ["y","y","y","y","y","y","y","y"],
    summary: "",
    red:  [],
    yellow: [],
    green: [],
    actions: [],
    risk: "", opportunity: "", support: "", practice: ""
  },
  {
    name: "Salesiano BH",
    matrix: ["y","y","y","y","y","y","y","y"],
    summary: "",
    red:  [],
    yellow: [],
    green: [],
    actions: [],
    risk: "", opportunity: "", support: "", practice: ""
  },
  {
    name: "Núcleo Bandeirante",
    matrix: ["y","y","y","y","y","y","y","y"],
    summary: "",
    red:  [],
    yellow: [],
    green: [],
    actions: [],
    risk: "", opportunity: "", support: "", practice: ""
  }
];
