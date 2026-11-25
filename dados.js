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
    name: "Araxá",
    matrix: ["g","y","y","y","y","y","y","y"],
    summary: "",
    red:  [],
    yellow: [],
    green: [],
    actions: [],
    risk: "", opportunity: "", support: "", practice: ""
  },
  {
    name: "BH",
    matrix: ["y","y","y","y","y","y","y","y"],
    summary: "",
    red:  [],
    yellow: [],
    green: [],
    actions: [],
    risk: "", opportunity: "", support: "", practice: ""
  },
  {
    // ============================================================
    // MODELO COMPLETO DE PREENCHIMENTO: GOIÂNIA
    // ============================================================
    name: "Goiânia",
    matrix: ["y", "y", "g", "y", "r", "y", "g", "y"], 
    
    // 1. Resumo Executivo (Aparece no topo do One-Page)
    summary: "Qualificação dos espaços de aprendizagem da Educação Infantil; Ampliação da participação dos estudantes em olimpíadas acadêmicas; Desenvolvimento da Plataforma Vínculo.",
    
    // 2. Listas Gerais (Aparecem nos quadros coloridos do One-Page)
    red: [
      "Falta de professores capacitados para adaptação curricular (Inclusão).",
      "Dificuldades no acolhimento e acompanhamento pedagógico de estudantes da inclusão."
    ],
    yellow: [
      "Consolidação da nova equipe gestora (Direção, Supervisão, Orientação).",
      "Alinhamento dos processos de gestão e acompanhamento pedagógico.",
      "Necessidade de maior presença da Pastoral Escolar."
    ],
    green: [
      "Qualificação dos espaços de aprendizagem da Educação Infantil.",
      "Ampliação da participação em olimpíadas acadêmicas.",
      "Fortalecimento do Atendimento Educacional Especializado (AEE)."
    ],
    
    // 3. Plano de Ação Macro (Aparece na tabela do One-Page)
    actions: [
      { prazo: "2027", acao: "Intensificar formações continuadas sobre educação inclusiva.", ind: "Professores capacitados e seguros." },
      { prazo: "2027", acao: "Fortalecer a Pastoral Escolar e a identidade salesiana.", ind: "Maior presença e articulação." }
    ],
    
    // 4. Pontos para a Devolutiva (Tabela final do One-Page)
    risk: "Acredito que sim (Sobre pendências do CI).",
    opportunity: "Fortalecimento da identidade salesiana e aproximação com as famílias.",
    support: "Avaliar possibilidade de profissionais dedicados ao marketing do colégio.",
    practice: "Projeto Escola HIAQ e ações de empreendedorismo (FIACS).",
    
    // 5. ANÁLISE POR SEGMENTO (A nova aba no One-Page)
    segments: {
      gestao: {
        titulo: "Avaliação da Gestão",
        pontosFortes: [
          "A governança é vista como função prioritária da Inspetoria e a gestão local atua no operacional.",
          "A equipe gestora trabalha em sintonia."
        ],
        pontosAtencao: [
          "Registros em ata, mas sem acompanhamento sistemático.",
          "Comunicação com famílias é parcialmente efetiva.",
          "Marketing dividido com o CESAN, gerando falta de agilidade."
        ],
        acoes: "Fortalecer a integração dos setores, definir prioridades claras para a Pastoral e avaliar a possibilidade de um profissional dedicado exclusivamente ao marketing do colégio."
      },
      infantil: {
        titulo: "Educação Infantil",
        pontosFortes: [
          "Qualificação dos espaços de aprendizagem (desenvolvimento do Parque).",
          "Experiências investigativas e lúdicas favorecendo a autonomia."
        ],
        pontosAtencao: [
          "Alta quantidade de casos de inclusão.",
          "Necessidade de maior apoio para adaptação curricular."
        ],
        acoes: "Manter o projeto de qualificação dos parques e ampliar o acompanhamento do AEE para os professores regentes."
      },
      efai: {
        titulo: "Ens. Fund. Anos Iniciais",
        pontosFortes: [
          "Ampliação da participação dos estudantes em olimpíadas acadêmicas.",
          "Maior incentivo e envolvimento dos alunos."
        ],
        pontosAtencao: [
          "Consolidação da nova equipe gestora (Direção, Supervisão, Orientação).",
          "Alinhamento dos processos de gestão."
        ],
        acoes: "Reuniões semanais de alinhamento com coordenadores e foco no protagonismo dos alunos."
      },
      efaf: {
        titulo: "Ens. Fund. Anos Finais",
        pontosFortes: [
          "Desenvolvimento da Plataforma Vínculo.",
          "Fortalecimento do Atendimento Educacional Especializado (AEE)."
        ],
        pontosAtencao: [
          "Falta de professores capacitados para adaptação curricular.",
          "Dificuldades no acolhimento e acompanhamento pedagógico."
        ],
        acoes: "Intensificar formações continuadas sobre educação inclusiva e acompanhamento individualizado."
      }
    },

    // 6. Dados Gráficos gerados pela IA
    dadosGraficos: {
      radar: {
        labels: ['Governança', 'Inclusão', 'Aprendizagem', 'Clima/Equipe', 'Comunicação'],
        data: [5.0, 10.0, 7.1, 8.3, 7.5]
      },
      barrasSegmentos: {
        labels: ['Educação Infantil', 'EFAI', 'EFAF', 'Ensino Médio'],
        datasets: [
          { label: 'Pontos Fortes', data: [3, 8, 2, 0], backgroundColor: '#2f8b57' },
          { label: 'Pontos de Atenção', data: [1, 1, 1, 0], backgroundColor: '#c53d3d' }
        ]
      },
      pizzaStatus: {
        labels: ['Verde (Consolidado)', 'Amarelo (Atenção)', 'Vermelho (Prioridade)'],
        data: [14, 15, 4]
      },
      insightsText: {
        resumo: "Goiânia apresenta inclusão e clima de equipe como pontos fortes, com articulação entre professores, famílias e equipe técnica avaliada como muito satisfatória nos três segmentos. As fragilidades se concentram em governança e estrutura institucional: ausência de protocolo formal de proteção, falta de regra escrita para atividades ao ar livre em calor extremo e baixa integração entre Pastoral e supervisão pedagógica. O EFAF é o segmento mais crítico, com média 5,58 e gargalos de aprendizagem ligados à falta de hábito de estudo e à apropriação da proposta pedagógica."
      }
    },

    // 7. Comentários Abertos da Gestão
    comentariosGestao: [
      '"A governança é vista como função prioritária da Inspetoria, onde são tomadas as decisões estratégicas."',
      '"Dificuldade de alinhamento com as famílias."',
      '"Falta de professores capacitados para adaptação curricular."',
      '"A confecção de históricos manualmente ainda é um gargalo."'
    ]
  },
  // ============================================================
  // FIM DO MODELO GOIÂNIA
  // ============================================================
  {
    name: "Núcleo Bandeirante",
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
  }
];
