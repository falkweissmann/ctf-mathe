// ============================================
// LEVEL-STRUKTUR MIT IHREN AUFGABEN
// ============================================

const levels = [
  // Aufgabe 1: Rechenketten
  {
    id: "task1_rechenkette",
       tasks: [
      {
        id: "task1_task_a",
        question: "a) \\(71+14+(-86)+(-52)=\\)",
        type: "scalar",
        answer: -53,
        difficulty: 1
      },
      {
        id: "task1_task_b",
        question: "b) \\((-273)+(-714)+415+690=\\)",
        type: "scalar",
        answer: 118,
        difficulty: 1
      },
     {
        id: "task1_task_c",
        question: "c) \\(1-46+3-23=\\)",
        type: "scalar",
        answer: -65,
        difficulty: 1
      },
      {
        id: "task1_task_d",
        question: "d) \\(59-8+73-67=\\)",
        type: "scalar",
        answer: 57,
        difficulty: 1
      },
      {
        id: "task1_task_e",
        question: "e) \\(23-66+85-43=\\)",
        type: "scalar",
        answer: -1,
        difficulty: 1
      },
      {
        id: "task1_task_f",
        question: "f) \\(87-50+16-79=\\)",
        type: "scalar",
        answer: -26,
        difficulty: 1
      },
      {
        id: "task1_task_g",
        question: "g) \\(53-50+70-91=\\)",
        type: "scalar",
        answer: -18,
        difficulty: 1
      },
      {
        id: "task1_task_h",
        question: "h) \\(75+99+92+40=\\)",
        type: "scalar",
        answer: 306,
        difficulty: 1
      }
    ]
  },
  
  // Aufgabe 2: Multiplikation und Division
  {
    id: "task2_multiplication_division",
     tasks: [
      {
        id: "task2_task_a",
        question: "a) \\(-2\\cdot(-9)=\\)",
        type: "scalar",
        answer: 18,
        difficulty: 1,
      },
      {
        id: "task2_task_b",
        question: "b) \\(-5\\cdot3=\\)",
        type: "scalar",
        answer: -15,
        difficulty: 1,
      },
      {
        id: "task2_task_c",
        question: "c) \\(-16\\div4=\\)",
        type: "scalar",
        answer: -4,
        difficulty: 1,
      },
      {
        id: "task2_task_d",
        question: "d) \\(-(-2)\\cdot(-2)=\\)",
        type: "scalar",
        answer: -2,
        difficulty: 1,
     },
     {
        id: "task2_task_e",
        question: "e) \\(-(-75)\\div 15=\\)",
        type: "scalar",
        answer: 3,
        difficulty: 1,
     },
     {
        id: "task2_task_f",
        question: "f) \\(14\\div(-(-(-7)))=\\)",
        type: "scalar",
        answer: -2,
        difficulty: 1,
     }
    ]
  },
  
   // Aufgabe 3: Zahlenstrahl (MIT CODE-SCHLÜSSEL)
{
  title:"📐", 
  id: "task3_sketch",
  tasks: [
    {
      id: "task3_task_a",
      question: "📐 Zahlenstrahl anfertigen",
      type: "code",
      answer: { code: "SK03", message: "✏️ Bitte gib den Code von deiner Lehrkraft ein." },
      difficulty: 1,
      hint: "Die Lehrkraft gibt dir einen Code nach der Besprechung"
    },
    {
      id: "task3_task_b",
      question: "📐 Zahlenstrahl anfertigen",
      type: "code",
      answer: { code: "AF03", message: "✏️ Bitte gib den Code von deiner Lehrkraft ein." },
      difficulty: 1,
      hint: "Die Lehrkraft gibt dir einen Code nach der Besprechung"
    },
    {
      id: "task3_task_c",
      question: "📐 Zahlenstrahl anfertigen",
      type: "code",
      answer: { code: "UF03", message: "✏️ Bitte gib den Code von deiner Lehrkraft ein." },
      difficulty: 1,
      hint: "Die Lehrkraft gibt dir einen Code nach der Besprechung"
    },
    {
      id: "task3_task_d",
      question: "📐 Zahlenstrahl anfertigen",
      type: "code",
      answer: { code: "HK03", message: "✏️ Bitte gib den Code von deiner Lehrkraft ein." },
      difficulty: 1,
      hint: "Die Lehrkraft gibt dir einen Code nach der Besprechung"
    }
  ]
},
  
  // Aufgabe 4: Lücke füllen
  {
    id: "task4_lücke_füllen",
      tasks: [
      {
        id: "task4_task_a",
        question: "a) ",
        type: "scalar",
        answer: 100,
        difficulty: 1,
     },
      {
        id: "task4_task_b",
        question: "b) ",
        type: "scalar",
        answer: 120,
        difficulty: 1,
     },
     {
        id: "task4_task_c",
        question: "c) ",
        type: "scalar",
        answer: 7,
        difficulty: 1,
     },
     {
        id: "task4_task_d",
        question: "d) ",
        type: "scalar",
        answer: -5010,
        difficulty: 1,
     }
    ]
  },
  
 // Aufgabe 5: Berechnungen mit Beträgen
{
  id: "task5_berechnungen_mit_betraegen",
    tasks: [
    {
      id: "task5_task_a",
      question: "a) \\(-356 + 94= \\)",
      type: "scalar",
      answer: -262,
      difficulty: 1
    },
    {
      id: "task5_task_b",
      question: "b) \\(456-853= \\)",
      type: "scalar",
      answer: -397,
      difficulty: 1
    },
    {
      id: "task5_task_c",
      question: "c) \\(-45 - 37= \\)",
      type: "scalar",
      answer: -82,
      difficulty: 1
    },
    {
      id: "task5_task_d",
      question: "d) \\(56 + (-324)= \\)",
      type: "scalar",
      answer: -268,
      difficulty: 1
    },
    {
      id: "task5_task_e",
      question: "e) \\(- 78 - (-34)= \\)",
      type: "scalar",
      answer: -44,
      difficulty: 1
    },
    {
      id: "task5_task_f",
      question: "f) \\(-46+(-29)= \\)",
      type: "scalar",
      answer: -75,
      difficulty: 1
    },
    {
      id: "task5_task_g",
      question: "g) \\(591 + ( - 35)= \\)",
      type: "scalar",
      answer: 556,
      difficulty: 1
    },
    {
      id: "task5_task_h",
      question: "h) \\(│-9-6│-│-25│= \\)",
      type: "scalar",
      answer: -10,
      difficulty: 1
    },
    {
      id: "task5_task_i",
      question: "i) \\(-17+│-16+5│= \\)",
      type: "scalar",
      answer: -6,
      difficulty: 1
    },
    {
      id: "task5_task_j",
      question: "j) \\(-|-12|+(-3)-(+5)-2 \\)",
      type: "scalar",
      answer: -22,
      difficulty: 1
    }
  ]
},
  
  // Aufgabe 6: Lückenrätsel
  {
    id: "task6_lueckenraetsel",
    tasks: [
      {
        id: "task6_task_a",
        question: "a) ",
        type: "scalar",
        answer: -25,
        difficulty: 1
      },
       {
        id: "task6_task_b",
        question: "b) ",
        type: "scalar",
        answer: -8,
        difficulty: 1
      },
       {
        id: "task6_task_c",
        question: "c) ",
        type: "scalar",
        answer: 27,
        difficulty: 1
      },
       {
        id: "task6_task_d",
        question: "d) ",
        type: "scalar",
        answer: 11,
        difficulty: 1
      },
       {
        id: "task6_task_e",
        question: "e) ",
        type: "scalar",
        answer: 48,
        difficulty: 1
      },
       {
        id: "task6_task_f",
        question: "f) ",
        type: "scalar",
        answer: 90,
        difficulty: 1
      }
    ]
  },
  
  // Aufgabe 7: Zahlenstrahlrätsel
  {
    id: "task7_zahlenstrahlraetsel",
     tasks: [
       {
        id: "task7_task_a",
        question: "a) ",
        type: "scalar",
        answer: 61,
        difficulty: 2
      },
       {
        id: "task7_task_b",
        question: "b) ",
        type: "scalar",
        answer: -7,
        difficulty: 2
      },
       {
        id: "task7_task_c",
        question: "c) ",
        type: "scalar",
        answer: -244,
        difficulty: 2
      }
    ]
  },
  
  // Aufgabe 8: Zahlen ordnen
{
  id: "task8_zahlen_ordnen",
  tasks: [
    {
      id: "task8_task_a",
      question: "a) Ordne die Zahlen:\\(-6057; -5067; -5607; +5076; -5076; - 6507\\)",
      type: "number_ordering_drag",
      answer: { 
        values: [-6507, -6057, -5607, -5076, -5067, 5076],
        ordering: "asc"
      },
      difficulty: 1,
    },
    {
      id: "task8_task_b",
      question: "b) Ordne die Zahlen:\\(-8032; -8302; +8302; -8023; -8230; -8030\\)",
      type: "number_ordering_drag",
      answer: { 
        values: [-8302, -8032, -8030, -8023, -8230, 8302],
        ordering: "asc"
      },
      difficulty: 1,
    },
    {
      id: "task8_task_c",
      question: "c) Ordne die Zahlen:\\(-4201; +4021; -4012; -4120; -4021; -4210\\)",
      type: "number_ordering_drag",
      answer: { 
        values: [-4210, -4201, -4120, -4021, -4012, 4021],
        ordering: "asc"
      },
      difficulty: 1,
    },
    {
      id: "task8_task_d",
      question: "d) Ordne die Zahlen:\\(-9508; -9058; -9805;  -9059; -9580; +9058\\)",
      type: "number_ordering_drag",
      answer: { 
        values: [-9805, -9580, -9508, -9059, -9058, 9058],
        ordering: "asc"
      },
      difficulty: 1,
    }
  ]
},
  // Aufgabe 9
  {
    id: "verkuerzung",
    tasks: [
        {
        id: "verkuerzung_a",
        question: "Geben Sie den Vektor \\(\\vec{u}\\) an.",
        type: "vector",
        answer: { values: [84,21,-52.5] },
        difficulty: 2
        }
    ]
  },
  // Aufgabe 10
  {
    id: "wanderer",
      tasks: [
      {
        id: "wanderer_a",
        question: "Länge des Verschiebungsvektors:",
        type: "scalar",
        answer: 10,
        difficulty: 1
      },
      {
        id: "wanderer_b",
        question: "Zurückgelegte Strecke:",
        type: "scalar",
        answer: 20,
        difficulty: 1
      }
    ]
  },
  // Aufgabe 11
    {
    id: "verschiebung",
    tasks: [
        {
        id: "verschiebung_a",
        question: "Geben Sie den Vektor \\(\\vec{w}\\) an.",
        type: "vector",
        answer: { values: [14,0] },
        difficulty: 2
        },
      {
        id: "verschiebung_b",
        question: "Länge von \\(\\vec{w}\\):",
        type: "scalar",
        answer: 14,
        difficulty: 1
      }  
    ]
  },
  // Aufgabe 12: Bewegungsaufgabe
  {
    id: "task9_motion",
      tasks: [
      {
        id: "task9_task_a",
        question: "Zurückgelegte Längeneinheiten (LE):",
        type: "scalar",
        answer: 10,
        difficulty: 1
      },
      {
        id: "task9_task_b",
        question: "Geschwindigkeit in LE/h:",
        type: "scalar",
        answer: 30,
        difficulty: 1
      }
    ]
  },
  
  // Aufgabe 13: Positionsbestimmung
  {
    id: "task10_position",
    tasks: [
      {
        id: "task10_task_a",
        question: "Die Unsinkable II befindet sich auf:",
        type: "point",
        answer: { values: [30, 26] },
        difficulty: 3
      }
    ]
  },
  
  // Aufgabe 14: Skizze (MIT CODE-SCHLÜSSEL)
{
  title:"📐", 
  id: "task11_sketch",
  tasks: [
    {
      id: "task11_task_a",
      question: "📐 Skizze des Sachverhalts anfertigen",
      type: "code",
      answer: { code: "SK11", message: "✏️ Bitte geben Sie den Code von Ihrer Lehrkraft ein." },
      difficulty: 2,
      hint: "Die Lehrkraft gibt Ihnen einen Code nach der Besprechung"
    }
  ]
},

// Aufgabe 15: Skizze (MIT CODE-SCHLÜSSEL)
{
  title:"📐", 
  id: "task12_sketch",
  tasks: [
    {
      id: "task12_task_a",
      question: "📐 Skizze des Sachverhalts anfertigen",
      type: "code",
      answer: { code: "AF12", message: "✏️ Bitte geben Sie den Code von Ihrer Lehrkraft ein." },
      difficulty: 2,
      hint: "Die Lehrkraft gibt Ihnen einen Code nach der Besprechung"
    }
  ]
},

// Aufgabe 16: Skizze (MIT CODE-SCHLÜSSEL)
{
  title:"📐", 
  id: "task13_sketch",
  tasks: [
    {
      id: "task13_task_a",
      question: "📐 Skizze des Sachverhalts anfertigen",
      type: "code",
      answer: { code: "HK13", message: "✏️ Bitte geben Sie den Code von Ihrer Lehrkraft ein." },
      difficulty: 2,
      hint: "Die Lehrkraft gibt Ihnen einen Code nach der Besprechung"
    }
  ]
},

// Aufgabe 17: Skizze (mehrere Teile, ALLE MIT CODE-SCHLÜSSEL)
{
  title:"📐", 
  id: "task14_sketch",
  tasks: [
    {
      id: "task14_task_a",
      question: "a) Skizze des Sachverhalts anfertigen",
      type: "code",
      answer: { code: "UB14", message: "✏️ Bitte geben Sie den Code von Ihrer Lehrkraft ein." },
      difficulty: 1,
      hint: "Die Lehrkraft gibt Ihnen einen Code nach der Besprechung"
    },
    {
      id: "task14_task_b",
      question: "b) Skizze des Sachverhalts anfertigen",
      type: "code",
      answer: { code: "UC14", message: "✏️ Bitte geben Sie den Code von Ihrer Lehrkraft ein." },
      difficulty: 1,
      hint: "Die Lehrkraft gibt Ihnen einen Code nach der Besprechung"
    },
    {
      id: "task14_task_c",
      question: "c) Skizze des Sachverhalts anfertigen",
      type: "code",
      answer: { code: "AB14", message: "✏️ Bitte geben Sie den Code von Ihrer Lehrkraft ein." },
      difficulty: 1,
      hint: "Die Lehrkraft gibt Ihnen einen Code nach der Besprechung"
    },
    {
      id: "task14_task_d",
      question: "d) Skizze des Sachverhalts anfertigen",
      type: "code",
      answer: { code: "UD14", message: "✏️ Bitte geben Sie den Code von Ihrer Lehrkraft ein." },
      difficulty: 1,
      hint: "Die Lehrkraft gibt Ihnen einen Code nach der Besprechung"
    },
    {
      id: "task14_task_e",
      question: "e) Skizze des Sachverhalts anfertigen",
      type: "code",
      answer: { code: "AD14", message: "✏️ Bitte geben Sie den Code von Ihrer Lehrkraft ein." },
      difficulty: 1,
      hint: "Die Lehrkraft gibt Ihnen einen Code nach der Besprechung"
    },
    {
      id: "task14_task_f",
      question: "f) Skizze des Sachverhalts anfertigen",
      type: "code",
      answer: { code: "UF14", message: "✏️ Bitte geben Sie den Code von Ihrer Lehrkraft ein." },
      difficulty: 1,
      hint: "Die Lehrkraft gibt Ihnen einen Code nach der Besprechung"
    }
  ]
},
  
  // Aufgabe 18: Nullstellen & y-Achsenabschnitt
  {
    id: "task15_roots",
     tasks: [
      {
        id: "task15_task_a",
        question: "a) \\(f(x) = 2x - 10\\)\nBestimmen Sie die Nullstellen und y-Achsenabschnitt",
        type: "roots_intercept",
        answer: { nullstellen: [5], yachsenabschnitt: -10 },
        difficulty: 1
      },
      {
        id: "task15_task_b",
        question: "b) \\(f(x) = x³ - 4x\\)\nBestimmen Sie die Nullstellen und y-Achsenabschnitt",
        type: "roots_intercept",
        answer: { nullstellen: [-2, 0, 2], yachsenabschnitt: 0 },
        difficulty: 2
      },
      {
        id: "task15_task_c",
        question: "c) \\(f(x) = (x+1)² · (x-3)²\\)\nBestimmen Sie die Nullstellen und y-Achsenabschnitt",
        type: "roots_intercept",
        answer: { nullstellen: [-1, 3], yachsenabschnitt: 9 },
        difficulty: 3
      }
    ]
  },
  
  // Aufgabe 19: Ableitungen 1
  {
    id: "task16_derivatives1",
      tasks: [
      {
        id: "task16_task_a",
        question: "a) \\(f(x) = x³  f'(x) = ?\\)",
        type: "function",
        answer: { loesung: "3x^2", alternativen: ["3*x^2", "3x²"] },
        difficulty: 1
      },
      {
        id: "task16_task_b",
        question: "b) \\(g(x) = 5x²  g'(x) = ?\\)",
        type: "function",
        answer: { loesung: "10x", alternativen: ["10*x"] },
        difficulty: 1
      },
      {
        id: "task16_task_c",
        question: "c) \\(h(x) = 3x² + 6x - 8  h'(x) = ?\\)",
        type: "function",
        answer: { loesung: "6x+6", alternativen: ["6*x+6", "6x + 6"] },
        difficulty: 1
      },
       {
        id: "task16_task_d",
        question: "d) \\(i(x) = 0,5x^4 + 12x^3 +1,5x^4   i'(x) = ?\\)",
        type: "function",
        answer: { loesung: "8x^3+36x^2", alternativen: ["8*x^3+36*x^2"] },
        difficulty: 1
      }
    ]
  },
  
  // Aufgabe 20: Ableitungen 2
  {
    id: "task17_derivatives2",
      tasks: [
      {
        id: "task17_task_a",
        question: "a) \\(f(x) = (x²)³  f'(x) = ?\\)",
        type: "function",
        answer: { loesung: "6x^5", alternativen: ["6*x^5", "6x⁵"] },
        difficulty: 2
      },
      {
        id: "task17_task_b",
        question: "b) \\(g(x) = (1-3x)²  g'(x) = ?\\)",
        type: "function",
        answer: { loesung: "18x-6", alternativen: ["18*x-6", "18x - 6"] },
        difficulty: 2
      },
      {
        id: "task17_task_c",
        question: "c) \\(h(x) = (\\frac{1}{√9})·x³  h'(x) = ?\\)",
        type: "function",
        answer: { loesung: "x^2", alternativen: ["x²"] },
        difficulty: 2
      },
      {
        id: "task17_task_d",
        question: "d) \\(i(x) = \\frac{1}{3}x^3-t^2x^2  i'(x) = ?\\)",
        type: "function",
        answer: { loesung: "x^2-2t^2x", alternativen: ["x^2-2*t^2*x,x^2-t^2*2*x,x^2-t^22x"] },
        difficulty: 2
      },
      {
        id: "task17_task_e",
        question: "e) \\(j(x) = (2-4x)^2+(3x-x^2)^2  j'(x) = ?\\)",
        type: "function",
        answer: { loesung: "4x^3-18x^2+50x-16", alternativen: ["4*x^3-18*x^2+50*x-16"] },
        difficulty: 2
      },
      {
        id: "task17_task_f",
        question: "f) \\(k(x) = (1-2x)^2\\cdot(x-3x^2)^2  k'(x) = ?\\)",
        type: "function",
        answer: { loesung: "216x^5-300x^4+148x^3-30x^2+2x", alternativen: ["216*x^5-300*x^4+148*x^3-30*x^2+2*x"] },
        difficulty: 3
      }
    ]
  },
  
  // Aufgabe 21: Extremwerte
  {
  id: "task18_extrema",
  tasks: [
    {
      id: "task18_task_all",
      question: "Gegeben ist die Funktion \\(f(x) = \\frac{1}{3}x^3 + \\frac{1}{2}x^2.\\\\\\) Führen Sie eine vollständige Extremwertanalyse durch:",
      type: "analysis_form",
      fields: [
        { id: "f1", label: "f'(x)", type: "function", placeholder: "z.B. 3x^3-2x" },
        { id: "f2", label: "f''(x)", type: "function", placeholder: "z.B. 9x^2-2" },
        { id: "roots", label: "f'(x) = 0 → Lösungen", type: "roots", placeholder: "z.B. -3,2" },
        { id: "max", label: "Anzahl der Maxima", type: "number", placeholder: "0", step: "1" },
        { id: "min", label: "Anzahl der Minima", type: "number", placeholder: "0", step: "1" }
      ],
      answer: {
        f1: "x^2+x",
        f1Alternatives: ["x²+x", "x^2 + x", "x*x+x"],
        f2: "2x+1",
        f2Alternatives: ["2*x+1", "2x + 1"],
        roots: [-1, 0],
        max: 1,
        min: 1
      },
      difficulty: 3,
      }
  ]
},
  
 // Aufgabe 22: Wendepunkte
{
  id: "task19_inflection",
  tasks: [
    {
      id: "task19_task_all",
      question: "Gegeben ist die Funktion \\(f(x) = \\frac{1}{24}x^4 - \\frac{1}{6}x^3\\). Führen Sie eine vollständige Wendepunktanalyse durch:",
      type: "analysis_form",
      fields: [
        { id: "f2", label: "f''(x)", type: "function", placeholder: "z.B. 3x^3+2x" },
        { id: "f3", label: "f'''(x)", type: "function", placeholder: "z.B. 9x^2+2" },
        { id: "roots", label: "f''(x) = 0 → Lösungen", type: "roots", placeholder: "z.B. -1,3" },
        { id: "inflections", label: "Anzahl der Wendestellen", type: "number", placeholder: "0", step: "1" }
      ],
      answer: {
        f2: "1/2x^2-x",
        f2Alternatives: ["0.5x^2-x", "0.5*x^2-x", "1/2*x²-x", "0.5x²-x"],
        f3: "x-1",
        f3Alternatives: ["1x-1", "1*x-1"],
        roots: [0, 2],
        inflections: 2
      },
      difficulty: 3,
    }
  ]
},
  
  // Aufgabe 23: Nullstellenanzahl
  {
    id: "task20_root_count",
      tasks: [
      {
        id: "task20_task_a",
        question: "Anzahl der Nullstellen:",
        type: "scalar",
        answer: 3,
        difficulty: 1
      }
    ]
  },
  
  // Aufgabe 24: Extremstellenanzahl
  {
    id: "task21_extrema_count",
      tasks: [
      {
        id: "task21_task_a",
        question: "Anzahl der Extremstellen:",
        type: "scalar",
        answer: 2,
        difficulty: 1
      }
    ]
  },
  
  // Aufgabe 25: Insider (MIT HINT)
  {
    id: "task22_insider",
       tasks: [
      {
        id: "task22_task_a",
        question: "Ein Mü ist ein ...",
        type: "text",
        answer: "bisschen",
        alternatives: ["wenig", "Hauch"],
        difficulty: 1,
        hint: "Umgangssprachlich für eine kleine Menge, ähnlich wie 'ein wenig'"
      }
    ]
  }
];

// ============================================
// HILFSFUNKTIONEN
// ============================================

function getTotalTasks() {
  return levels.reduce((total, level) => total + level.tasks.length, 0);
}

function getLevelTasks(levelIndex) {
  return levels[levelIndex]?.tasks || [];
}

function getLevelById(levelId) {
  return levels.find(level => level.id === levelId);
}

function getTaskById(levelId, taskId) {
  const level = getLevelById(levelId);
  return level?.tasks.find(task => task.id === taskId);
}

// Export für Kompatibilität (falls benötigt)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { levels, getTotalTasks, getLevelTasks, getLevelById, getTaskById };
}