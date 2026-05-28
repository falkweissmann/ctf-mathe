// ============================================
// CHECK-OUT KAPITEL III - RECHNEN
// ============================================

const levels = [
    
   // Nur Addition
  {
    id: "quiz_addition",
    tasks: [
      {
        id: "quiz_addition_only",
        type: "timed_quiz",
        question: "Addition von Zahlen bis 100",
        timeLimit: 45,
        questionPool: "addition",
        maxNumber: 50,
        inputMode: "text",
        choicesCount: 4,
        difficulty: 3,
      },
      {
        id: "quiz_addition_only_2",
        type: "timed_quiz",
        question: "Addition von Zahlen bis 1000",
        timeLimit: 45,
        questionPool: "addition",
        maxNumber: 500,
        inputMode: "text",
        choicesCount: 4,
        difficulty: 3,
      }
    ]
  },
  // Leichtes Quiz - 1x1 bis 6x6 und 10x10, 45 Sekunden
  {
    id: "quiz_easy",
    tasks: [
      {
        id: "quiz_easy_multiplication",
        type: "timed_quiz",
        question: "Multiplikation von Zahlen bis 6x6",
        timeLimit: 45,
        questionPool: "multiplication",
        maxNumber: 6,
        inputMode: "text",
        choicesCount: 4,
        difficulty: 3,
      },
      {
        id: "quiz_medium_multiplication",
        type: "timed_quiz",
        question: "Multiplikation von Zahlen bis 10x10",
        timeLimit: 45,
        questionPool: "multiplication",
        maxNumber: 10,
        inputMode: "text",
        choicesCount: 4,
        difficulty: 3,
      }
    ]
  },
  // Division - für Fortgeschrittene
  {
    id: "quiz_division",
    tasks: [
      {
        id: "quiz_division_only",
        question: "Division von Zahlen bis 6x6",
        type: "timed_quiz",
        timeLimit: 45,
        questionPool: "division",
        maxNumber: 12,
        inputMode: "text",
        pointsToWin: 12,
      },
      {
        id: "quiz_division_only",
        question: "Division von Zahlen bis 12x12",
        type: "timed_quiz",
        timeLimit: 45,
        questionPool: "division",
        maxNumber: 12,
        inputMode: "text",
        pointsToWin: 12,
      }
    ]
  },
  // Schweres Quiz - Gemischte Operationen, 45 Sekunden
  {
    id: "quiz_hard",
    tasks: [
      {
        id: "quiz_hard_mixed",
        type: "timed_quiz",
        question: "Gemischte Aufgaben (+ - × :)",
        timeLimit: 45,
        questionPool: "mixed",
        maxNumber: 7,
        inputMode: "text",
        choicesCount: 4,
        difficulty: 3,
      },
       {
        id: "quiz_hard_mixed",
        type: "timed_quiz",
        question: "Gemischte Aufgaben (+ - × :)",
        timeLimit: 45,
        questionPool: "mixed",
        maxNumber: 12,
        inputMode: "text",
        choicesCount: 4,
        difficulty: 3,
      }
    ]
  },
  
  // Multiple Choice Quiz
  {
    id: "quiz_multiple_choice",
    tasks: [
      {
        id: "quiz_mc_multiplication",
        type: "timed_quiz",
        question: "Multiple Choice - 1x1 bis 10x10",
        timeLimit: 45,
        questionPool: "multiplication",
        maxNumber: 10,
        inputMode: "multiple_choice",
        choicesCount: 4,
        difficulty: 3,
      },
      {
        id: "quiz_mc_multiplication",
        type: "timed_quiz",
        question: "Multiple Choice - 1x1 bis 10x10",
        timeLimit: 45,
        questionPool: "mixed",
        maxNumber: 12,
        inputMode: "multiple_choice",
        choicesCount: 4,
        difficulty: 3,
      },
      {
        id: "quiz_mc_multiplication",
        type: "timed_quiz",
        question: "Multiple Choice - 1x1 bis 10x10",
        timeLimit: 60,
        questionPool: "mixed",
        maxNumber: 12,
        inputMode: "multiple_choice",
        choicesCount: 4,
        difficulty: 3,
      }
    ]
  },
  // ==================== AUFGABE 1: Punkt-vor-Strich (leicht) - 8 Aufgaben ====================
  {
    id: "task1_point_before_line",
    difficulty: "leicht",
    description: "Punkt-vor-Strich-Rechnung",
    tasks: [
      {
        id: "task1_a",
        question: "\\(8 + 4 \\times 3\\)",
        type: "scalar",
        answer: 20,
        difficulty: 1,
      },
      {
        id: "task1_b",
        question: "\\(20 - 6 \\times 2\\)",
        type: "scalar",
        answer: 8,
        difficulty: 1,
      },
      {
        id: "task1_c",
        question: "\\(15 + 24 : 6 - 3 \\times 2\\)",
        type: "scalar",
        answer: 13,
        difficulty: 1,
      },
      {
        id: "task1_d",
        question: "\\(36 : 4 + 5 \\times 3 - 7\\)",
        type: "scalar",
        answer: 17,
        difficulty: 1,
      },
      {
        id: "task1_e",
        question: "\\(42 : 7 + 6 \\times 4 - 9\\)",
        type: "scalar",
        answer: 21,
        difficulty: 1,
      },
      {
        id: "task1_f",
        question: "\\(50 - 5 \\times 6 + 18 : 3\\)",
        type: "scalar",
        answer: 26,
        difficulty: 1,
      },
      {
        id: "task1_g",
        question: "\\(72 : 8 + 4 \\times 5 - 12\\)",
        type: "scalar",
        answer: 17,
        difficulty: 1,
      },
      {
        id: "task1_h",
        question: "\\(100 - 8 \\times 9 + 45 : 5\\)",
        type: "scalar",
        answer: 37,
        difficulty: 1,
      }
    ]
  },

  // ==================== AUFGABE 2: Klammern zuerst (leicht) - 8 Aufgaben ====================
  {
    id: "task2_parentheses_first",
    difficulty: "leicht",
    description: "Klammern zuerst berechnen",
    tasks: [
      {
        id: "task2_a",
        question: "\\((15 + 25) : 5\\)",
        type: "scalar",
        answer: 8,
        difficulty: 1,
      },
      {
        id: "task2_b",
        question: "\\(3 \\times (12 - 7)\\)",
        type: "scalar",
        answer: 15,
        difficulty: 1,
      },
      {
        id: "task2_c",
        question: "\\((36 - 18) : (9 - 6)\\)",
        type: "scalar",
        answer: 6,
        difficulty: 1,
      },
      {
        id: "task2_d",
        question: "\\(8 + 3 \\times (5 + 2)\\)",
        type: "scalar",
        answer: 29,
        difficulty: 1,
      },
      {
        id: "task2_e",
        question: "\\((40 - 15) \\times 2 + 5\\)",
        type: "scalar",
        answer: 55,
        difficulty: 1,
      },
      {
        id: "task2_f",
        question: "\\(100 : (5 + 5) + 8\\)",
        type: "scalar",
        answer: 18,
        difficulty: 1,
      },
      {
        id: "task2_g",
        question: "\\(6 \\times (14 - 9) - 12\\)",
        type: "scalar",
        answer: 18,
        difficulty: 1,
      },
      {
        id: "task2_h",
        question: "\\((48 + 12) : 6 + 4\\)",
        type: "scalar",
        answer: 14,
        difficulty: 1,
      }
    ]
  },

  // ==================== AUFGABE 3: Klammern von innen nach außen (mittel) - 8 Aufgaben ====================
  {
    id: "task3_nested_parentheses",
    difficulty: "mittel",
    description: "Klammern von innen nach außen",
    tasks: [
      {
        id: "task3_a",
        question: "\\(2 \\times (3 + (4 + 5))\\)",
        type: "scalar",
        answer: 24,
        difficulty: 2,
      },
      {
        id: "task3_b",
        question: "\\([(8 + 4) \\times 3] - 10\\)",
        type: "scalar",
        answer: 26,
        difficulty: 2,
      },
      {
        id: "task3_c",
        question: "\\(5 \\times [2 + (3 \\times 4)]\\)",
        type: "scalar",
        answer: 70,
        difficulty: 2,
      },
      {
        id: "task3_d",
        question: "\\(20 - [3 \\times (8 - 5)] + 4\\)",
        type: "scalar",
        answer: 15,
        difficulty: 2,
      },
      {
        id: "task3_e",
        question: "\\([(12 - 5) \\times 3] + [(8 + 2) : 2]\\)",
        type: "scalar",
        answer: 26,
        difficulty: 2,
      },
      {
        id: "task3_f",
        question: "\\(4 \\times [3 + (6 \\times 2)] - 10\\)",
        type: "scalar",
        answer: 50,
        difficulty: 2,
      },
      {
        id: "task3_g",
        question: "\\([20 - (8 + 2)] \\times 3\\)",
        type: "scalar",
        answer: 30,
        difficulty: 2,
      },
      {
        id: "task3_h",
        question: "\\(100 - [5 \\times (9 - 4)] + 12\\)",
        type: "scalar",
        answer: 87,
        difficulty: 2,
      }
    ]
  },

  // ==================== AUFGABE 4: Von links nach rechts (leicht) - 8 Aufgaben ====================
  {
    id: "task4_left_to_right",
    difficulty: "leicht",
    description: "Von links nach rechts rechnen (nur + und - oder nur × und :)",
    tasks: [
      {
        id: "task4_a",
        question: "\\(20 - 5 + 8 - 3\\)",
        type: "scalar",
        answer: 20,
        difficulty: 1,
      },
      {
        id: "task4_b",
        question: "\\(15 + 7 - 9 + 4 - 6\\)",
        type: "scalar",
        answer: 11,
        difficulty: 1,
      },
      {
        id: "task4_c",
        question: "\\(48 : 4 : 2 \\times 3\\)",
        type: "scalar",
        answer: 18,
        difficulty: 1,
      },
      {
        id: "task4_d",
        question: "\\(100 : 5 \\times 2 : 4\\)",
        type: "scalar",
        answer: 10,
        difficulty: 1,
      },
      {
        id: "task4_e",
        question: "\\(30 + 12 - 8 + 5 - 10\\)",
        type: "scalar",
        answer: 29,
        difficulty: 1,
      },
      {
        id: "task4_f",
        question: "\\(64 : 8 : 2 \\times 4\\)",
        type: "scalar",
        answer: 16,
        difficulty: 1,
      },
      {
        id: "task4_g",
        question: "\\(72 : 9 \\times 3 : 2\\)",
        type: "scalar",
        answer: 12,
        difficulty: 1,
      },
      {
        id: "task4_h",
        question: "\\(50 - 15 + 20 - 8 + 3\\)",
        type: "scalar",
        answer: 50,
        difficulty: 1,
      }
    ]
  },

// ==================== AUFGABE 5: Kommutativgesetz - Geschicktes Rechnen ====================
{
  id: "task5_commutative",
  difficulty: "leicht",
  description: "Kommutativgesetz - Geschicktes Rechnen durch Vertauschen",
  tasks: [
    // 3 Faktoren
    {
      id: "task5_a",
      question: "\\(25 \\times 17 \\times 4\\)",
      type: "scalar",
      answer: 1700,
      difficulty: 1
    },
    {
      id: "task5_b",
      question: "\\(8 \\times 37 \\times 125\\)",
      type: "scalar",
      answer: 37000,
      difficulty: 2
    },
    {
      id: "task5_c",
      question: "\\(50 \\times 82 \\times 2\\)",
      type: "scalar",
      answer: 8200,
      difficulty: 1
    },
    {
      id: "task5_d",
      question: "\\(4 \\times 19 \\times 25\\)",
      type: "scalar",
      answer: 1900,
      difficulty: 1
    },
    {
      id: "task5_e",
      question: "\\(20 \\times 13 \\times 5\\)",
      type: "scalar",
      answer: 1300,
      difficulty: 1
    },
    {
      id: "task5_f",
      question: "\\(125 \\times 11 \\times 8\\)",
      type: "scalar",
      answer: 11000,
      difficulty: 2
    },
    {
      id: "task5_g",
      question: "\\(2 \\times 47 \\times 50\\)",
      type: "scalar",
      answer: 4700,
      difficulty: 1
    },
    {
      id: "task5_h",
      question: "\\(5 \\times 23 \\times 20\\)",
      type: "scalar",
      answer: 2300,
      difficulty: 1
    },
    
    // 4 Faktoren
    {
      id: "task5_i",
      question: "\\(25 \\times 13 \\times 4 \\times 2\\)",
      type: "scalar",
      answer: 2600,
      difficulty: 2
    },
    {
      id: "task5_j",
      question: "\\(5 \\times 17 \\times 20 \\times 3\\)",
      type: "scalar",
      answer: 5100,
      difficulty: 2
    },
    {
      id: "task5_k",
      question: "\\(125 \\times 4 \\times 8 \\times 7\\)",
      type: "scalar",
      answer: 28000,
      difficulty: 2
    },
    
    // 6 Faktoren
    {
      id: "task5_l",
      question: "\\(2 \\times 25 \\times 3 \\times 4 \\times 5 \\times 10\\)",
      type: "scalar",
      answer: 30000,
      difficulty: 3
    },
    {
      id: "task5_m",
      question: "\\(20 \\times 125 \\times 3 \\times 8 \\times 5 \\times 2\\)",
      type: "scalar",
      answer: 600000,
      difficulty: 3
    },
    {
      id: "task5_n",
      question: "\\(10 \\times 25 \\times 5 \\times 2 \\times 20 \\times 4\\)",
      type: "scalar",
      answer: 200000,
      difficulty: 3
    }
  ]
},

// ==================== AUFGABE 6: Assoziativgesetz - Geschicktes Addieren ====================
{
  id: "task6_associative",
  difficulty: "mittel",
  description: "Assoziativgesetz - Geschicktes Addieren durch Umklammern",
  tasks: [
    // 3 Summanden
    {
      id: "task6_a",
      question: "\\(25 + 47 + 75\\)",
      type: "scalar",
      answer: 147,
      difficulty: 1
    },
    {
      id: "task6_b",
      question: "\\(38 + 22 + 62\\)",
      type: "scalar",
      answer: 122,
      difficulty: 1
    },
    {
      id: "task6_c",
      question: "\\(44 + 33 + 56\\)",
      type: "scalar",
      answer: 133,
      difficulty: 1
    },
    
    // 4 Summanden
    {
      id: "task6_d",
      question: "\\(13 + 28 + 87 + 72\\)",
      type: "scalar",
      answer: 200,
      difficulty: 2
    },
    {
      id: "task6_e",
      question: "\\(12 + 45 + 88 + 45\\)",
      type: "scalar",
      answer: 190,
      difficulty: 2
    },
    {
      id: "task6_f",
      question: "\\(24 + 46 + 76 + 64\\)",
      type: "scalar",
      answer: 210,
      difficulty: 2
    },
    {
      id: "task6_g",
      question: "\\(15 + 42 + 85 + 22\\)",
      type: "scalar",
      answer: 164,
      difficulty: 2
    },
    {
      id: "task6_h",
      question: "\\(19 + 31 + 9 + 81\\)",
      type: "scalar",
      answer: 140,
      difficulty: 2
    },
    {
      id: "task6_i",
      question: "\\(33 + 33 + 83 + 34\\)",
      type: "scalar",
      answer: 183,
      difficulty: 2
    },
    
    // 5 Summanden
    {
      id: "task6_j",
      question: "\\(10 + 20 + 30 + 40 + 52\\)",
      type: "scalar",
      answer: 152,
      difficulty: 2
    },
    {
      id: "task6_k",
      question: "\\(11 + 22 + 33 + 44 + 53\\)",
      type: "scalar",
      answer: 163,
      difficulty: 2
    },
    {
      id: "task6_l",
      question: "\\(14 + 26 + 36 + 44 + 58\\)",
      type: "scalar",
      answer: 178,
      difficulty: 2
    },  
    // 8 Summanden
    {
      id: "task6_q",
      question: "\\(5 + 15 + 25 + 35 + 45 + 55 + 65 + 73\\)",
      type: "scalar",
      answer: 318,
      difficulty: 3
    },
    {
      id: "task6_r",
      question: "\\(10 + 20 + 30 + 40 + 50 + 60 + 70 + 79\\)",
      type: "scalar",
      answer: 359,
      difficulty: 3
    },
    {
      id: "task6_s",
      question: "\\(8 + 18 + 28 + 38 + 43 + 54 + 64 + 77\\)",
      type: "scalar",
      answer: 330,
      difficulty: 3
    }
  ]
},

 {
  id: "task7_distributive",
  difficulty: "mittel",
  description: "Distributivgesetz (Verteilungsgesetz) - Ausmultiplizieren",
  tasks: [
    // 2 Terme in der Klammer
    {
      id: "task7_a",
      question: "\\(6 \\times (12 + 4)\\)",
      type: "analysis_form",
      fields: [
        { id: "ausmultipliziert", label: "Ausmultiplizierte Form", type: "text", placeholder: "z.B. 3*10 + 3*4" },
        { id: "ergebnis", label: "Ergebnis", type: "number", placeholder: "Zahl" }
      ],
      answer: {
        ausmultipliziert: "6*12+6*4",
        ergebnis: 96
      },
      difficulty: 1
    },
    {
      id: "task7_b",
      question: "\\(5 \\times (20 - 7)\\)",
      type: "analysis_form",
      fields: [
        { id: "ausmultipliziert", label: "Ausmultiplizierte Form", type: "text", placeholder: "z.B. 3*10 + 3*4" },
        { id: "ergebnis", label: "Ergebnis", type: "number", placeholder: "Zahl" }
      ],
      answer: {
        ausmultipliziert: "5*20-5*7",
        ergebnis: 65
      },
      difficulty: 1
    },
    {
      id: "task7_c",
      question: "\\(8 \\times (25 + 13)\\)",
      type: "analysis_form",
      fields: [
        { id: "ausmultipliziert", label: "Ausmultiplizierte Form", type: "text", placeholder: "z.B. 3*10 + 3*4" },
        { id: "ergebnis", label: "Ergebnis", type: "number", placeholder: "Zahl" }
      ],
      answer: {
        ausmultipliziert: "8*25+8*13",
        ergebnis: 304
      },
      difficulty: 2
    },
    {
      id: "task7_d",
      question: "\\(12 \\times (30 - 5)\\)",
      type: "analysis_form",
      fields: [
        { id: "ausmultipliziert", label: "Ausmultiplizierte Form", type: "text", placeholder: "z.B. 3*10 + 3*4" },
        { id: "ergebnis", label: "Ergebnis", type: "number", placeholder: "Zahl" }
      ],
      answer: {
        ausmultipliziert: "12*30-12*5",
        ergebnis: 300
      },
      difficulty: 2
    },
    {
      id: "task7_e",
      question: "\\(6 \\times (50 - 12)\\)",
      type: "analysis_form",
      fields: [
        { id: "ausmultipliziert", label: "Ausmultiplizierte Form", type: "text", placeholder: "z.B. 3*10 + 3*4" },
        { id: "ergebnis", label: "Ergebnis", type: "number", placeholder: "Zahl" }
      ],
      answer: {
        ausmultipliziert: "6*50-6*12",
        ergebnis: 228
      },
      difficulty: 2
    },
    {
      id: "task7_f",
      question: "\\(7 \\times (30 + 25)\\)",
      type: "analysis_form",
      fields: [
        { id: "ausmultipliziert", label: "Ausmultiplizierte Form", type: "text", placeholder: "z.B. 3*10 + 3*4" },
        { id: "ergebnis", label: "Ergebnis", type: "number", placeholder: "Zahl" }
      ],
      answer: {
        ausmultipliziert: "7*30+7*25",
        ergebnis: 385
      },
      difficulty: 2
    },
    {
      id: "task7_g",
      question: "\\(15 \\times (20 - 8)\\)",
      type: "analysis_form",
      fields: [
        { id: "ausmultipliziert", label: "Ausmultiplizierte Form", type: "text", placeholder: "z.B. 3*10 + 3*4" },
        { id: "ergebnis", label: "Ergebnis", type: "number", placeholder: "Zahl" }
      ],
      answer: {
        ausmultipliziert: "15*20-15*8",
        ergebnis: 180
      },
      difficulty: 2
    },
    
    // 3 Terme in der Klammer
    {
      id: "task7_h",
      question: "\\(9 \\times (100 + 40 + 2)\\)",
      type: "analysis_form",
      fields: [
        { id: "ausmultipliziert", label: "Ausmultiplizierte Form", type: "text", placeholder: "z.B. 3*10 + 3*4" },
        { id: "ergebnis", label: "Ergebnis", type: "number", placeholder: "Zahl" }
      ],
      answer: {
        ausmultipliziert: "9*100+9*40+9*2",
        ergebnis: 1278
      },
      difficulty: 2
    },
    {
      id: "task7_i",
      question: "\\(4 \\times (25 + 30 + 15)\\)",
      type: "analysis_form",
      fields: [
        { id: "ausmultipliziert", label: "Ausmultiplizierte Form", type: "text", placeholder: "z.B. 3*10 + 3*4" },
        { id: "ergebnis", label: "Ergebnis", type: "number", placeholder: "Zahl" }
      ],
      answer: {
        ausmultipliziert: "4*25+4*30+4*15",
        ergebnis: 280
      },
      difficulty: 2
    },
    {
      id: "task7_j",
      question: "\\(6 \\times (200 - 50 - 30)\\)",
      type: "analysis_form",
      fields: [
        { id: "ausmultipliziert", label: "Ausmultiplizierte Form", type: "text", placeholder: "z.B. 3*10 + 3*4" },
        { id: "ergebnis", label: "Ergebnis", type: "number", placeholder: "Zahl" }
      ],
      answer: {
        ausmultipliziert: "6*200-6*50-6*30",
        ergebnis: 720
      },
      difficulty: 3
    },
    {
      id: "task7_k",
      question: "\\(3 \\times (120 + 80 - 50)\\)",
      type: "analysis_form",
      fields: [
        { id: "ausmultipliziert", label: "Ausmultiplizierte Form", type: "text", placeholder: "z.B. 3*10 + 3*4" },
        { id: "ergebnis", label: "Ergebnis", type: "number", placeholder: "Zahl" }
      ],
      answer: {
        ausmultipliziert: "3*120+3*80-3*50",
        ergebnis: 450
      },
      difficulty: 3
    },
    
    // 4 Terme in der Klammer
    {
      id: "task7_l",
      question: "\\(2 \\times (50 + 45 + 12 + 14)\\)",
      type: "analysis_form",
      fields: [
        { id: "ausmultipliziert", label: "Ausmultiplizierte Form", type: "text", placeholder: "z.B. 3*10 + 3*4" },
        { id: "ergebnis", label: "Ergebnis", type: "number", placeholder: "Zahl" }
      ],
      answer: {
        ausmultipliziert: "2*50+2*45+2*12+2*14",
        ergebnis: 242
      },
      difficulty: 2
    },
    {
      id: "task7_m",
      question: "\\(5 \\times (100 - 40 - 30 - 20)\\)",
      type: "analysis_form",
      fields: [
        { id: "ausmultipliziert", label: "Ausmultiplizierte Form", type: "text", placeholder: "z.B. 3*10 + 3*4" },
        { id: "ergebnis", label: "Ergebnis", type: "number", placeholder: "Zahl" }
      ],
      answer: {
        ausmultipliziert: "5*100-5*40-5*30-5*20",
        ergebnis: 50
      },
      difficulty: 3
    },
    {
      id: "task7_n",
      question: "\\(4 \\times (25 + 15 + 10 + 5)\\)",
      type: "analysis_form",
      fields: [
        { id: "ausmultipliziert", label: "Ausmultiplizierte Form", type: "text", placeholder: "z.B. 3*10 + 3*4" },
        { id: "ergebnis", label: "Ergebnis", type: "number", placeholder: "Zahl" }
      ],
      answer: {
        ausmultipliziert: "4*25+4*15+4*10+4*5",
        ergebnis: 220
      },
      difficulty: 2
    },
    {
      id: "task7_o",
      question: "\\(3 \\times (200 + 100 - 50 - 30)\\)",
      type: "analysis_form",
      fields: [
        { id: "ausmultipliziert", label: "Ausmultiplizierte Form", type: "text", placeholder: "z.B. 3*10 + 3*4" },
        { id: "ergebnis", label: "Ergebnis", type: "number", placeholder: "Zahl" }
      ],
      answer: {
        ausmultipliziert: "3*200+3*100-3*50-3*30",
        ergebnis: 660
      },
      difficulty: 3
    }
  ]
},

 {
  id: "task7_powers",
  difficulty: "mittel",
  description: "Potenzen - Definition und Berechnung",
  tasks: [
    // ========== LEICHT (4 Aufgaben) ==========
    {
      id: "task7_power_a",
      question: "Schreibe als Potenz: \\(2 \\cdot 2 \\cdot 2 \\cdot 2\\)",
      type: "text",
      placeholder: "z.B. 4^5",
      answer: "2^4",
      alternatives: ["2⁴", "2**4", "2^4", "16"],
      difficulty: 1
    },
    {
      id: "task7_power_b",
      question: "Schreibe als Potenz: \\(3 \\cdot 3 \\cdot 3\\cdot 3 \\cdot 3 \\cdot 3\\)",
      type: "text",
      placeholder: "z.B. 4^5",
      answer: "3^3",
      alternatives: ["3³", "3**3", "3^3", "27"],
      difficulty: 1
    },
    {
      id: "task7_power_c",
      question: "Berechne: \\(5^2\\)",
      type: "scalar",
      answer: 25,
      difficulty: 1
    },
    {
      id: "task7_power_d",
      question: "Berechne: \\(2^5\\)",
      type: "scalar",
      answer: 32,
      difficulty: 1
    },
    
    // ========== MITTEL (4 Aufgaben) ==========
    {
      id: "task7_power_e",
      question: "Berechne: \\(3^4\\)",
      type: "scalar",
      answer: 81,
      difficulty: 2
    },
    {
      id: "task7_power_f",
      question: "Berechne: \\(10^4\\)",
      type: "scalar",
      answer: 10000,
      difficulty: 2
    },
    {
      id: "task7_power_g",
      question: "Berechne: \\(6^3\\)",
      type: "scalar",
      answer: 216,
      difficulty: 2
    },
    {
      id: "task7_power_h",
      question: "Schreibe 36 als Potenz mit der Basis 6: \\(6^?\\)",
      type: "text",
      placeholder: "z.B. 4^5",
      answer: "6^2",
      difficulty: 2
    },
    {
      id: "task7_power_i",
      question: "Schreibe 64 als Potenz mit der Basis 4: \\(4^?\\)",
      type: "text",
      placeholder: "z.B. 4^5",
      answer: "4^3",
      difficulty: 2
    },
    
    // ========== SCHWER (3 Aufgaben) ==========
    {
      id: "task7_power_j",
      question: "Berechne: \\(2^3 + 3^2\\)",
      type: "scalar",
      answer: 17,
      difficulty: 3
    },
    {
      id: "task7_power_k",
      question: "Berechne: \\(4^2 \\times 2^3\\)",
      type: "scalar",
      answer: 128,
      difficulty: 3
    },
    {
      id: "task7_power_l",
      question: "Schreibe 81 als Potenz mit dem Exponenten 4: \\(?^4\\)",
      type: "scalar",
      answer: 3,
      difficulty: 3
    }
  ]
},

  // ==================== AUFGABE 9: Ausklammern (mittel) - 8 Aufgaben ====================
  {
    id: "task9_factor_out",
    difficulty: "mittel",
    description: "Ausklammern (gemeinsamen Faktor finden)",
    tasks: [
    {
      id: "task7_distributive_match_3col",
      question: "Ordne die Terme richtig zu: Ausgeklammert → Ausmultipliziert → Ergebnis",
      type: "pair_match",
      numColumns: 3,
      instruction: "🎯 Ziehe die Karten in die richtige Reihenfolge!",
      leftTitle: "📦 Ausgeklammert",
      middleTitle: "🔄 Ausmultipliziert",
      rightTitle: "🔗 Ergebnis",
      pairs: [
          { left: "3 \\(\\cdot\\) (10 + 4)", middle: "3\\(\\cdot\\)10 + 3\\(\\cdot\\)4", right: "42" },
          { left: "5 \\(\\cdot\\) (20 - 7)", middle: "5\\(\\cdot\\)20 - 5\\(\\cdot\\)7", right: "65" },
          { left: "8 \\(\\cdot\\) (25 + 13)", middle: "8\\(\\cdot\\)25 + 8\\(\\cdot\\)13", right: "304" },
          { left: "12 \\(\\cdot\\) (30 - 5)", middle: "12\\(\\cdot\\)30 - 12\\(\\cdot\\)5", right: "300" },
          { left: "6 \\(\\cdot\\) (50 - 12)", middle: "6\\(\\cdot\\)50 - 6\\(\\cdot\\)12", right: "228" },
          { left: "7 \\(\\cdot\\) (30 + 25)", middle: "7\\(\\cdot\\)30 + 7\\(\\cdot\\)25", right: "385" }
            ],
      difficulty: 2
    }
    ]
  },

 // ==================== AUFGABE 13: Teilbarkeitsquiz ====================
{
  id: "task13_divisibility_quiz",
  difficulty: "mittel",
  description: "Teilbarkeitsquiz - Schnell entscheiden!",
  tasks: [
    {
      id: "divisibility_quiz_2",
      type: "divisibility_quiz",
      quizTitle: "🔢 Teilbarkeitsquiz (durch 2)",
      question:"Ist dies eine gerade Zahl?",
      questionText: "Ist die Zahl durch 2 teilbar?",
      checkFunction: "divisible",
      divisor: 2,
      requiredPercent: 60,
      timeLimit: 60,
      difficulty: 1,
      numbers: [1234, 5678, 91011, 121314, 151617, 181920, 212223, 242526, 272829, 303132]
    },
    {
      id: "divisibility_quiz_3",
      type: "divisibility_quiz",
      quizTitle: "🔢 Teilbarkeitsquiz (durch 3)",
      question:"Ist dies eine durch 3 teilbare Zahl?",
      questionText: "Ist die Zahl durch 3 teilbar?",
      checkFunction: "divisibleBy3",
      requiredPercent: 60,
      timeLimit: 90,
      difficulty: 3,
      numbers: [123, 456, 789, 111, 222, 333, 444, 555, 666, 777, 888, 999, 1002, 1005]
    },
    {
      id: "prime_quiz",
      type: "divisibility_quiz",
      quizTitle: "🔢 Primzahl-Quiz",
      question:"Ist dies eine Primzahl?",
      questionText: "Ist dies eine Primzahl?",
      checkFunction: "isPrime",
      requiredPercent: 70,
      timeLimit: 60,
      difficulty: 2,
      numbers: [17, 4, 11, 23, 16, 18, 7, 9, 3, 14, 19, 5, 8, 15, 6, 2, 10, 13, 29, 12]
    },
    {
      id: "even_odd_quiz",
      type: "divisibility_quiz",
      quizTitle: "🔢 Teilbarkeitsquiz (durch 5)",
      question:"Ist dies eine durch 5 teilbare Zahl?",
      questionText: "Ist die Zahl durch 5 teilbar?",
      checkFunction: "divisibleBy5",
      requiredPercent: 80,
      timeLimit: 60,
      difficulty: 1,
      numbers: [123115, 22432, 3343335, 443424, 541355, 667546, 7567770, 884568, 9995334, 1443000]
    }
  ]
},

  // ==================== AUFGABE 15: Primfaktorzerlegung (schwer) - 8 Aufgaben ====================
  {
    id: "task15_prime_factorization",
    difficulty: "schwer",
    description: "Primfaktorzerlegung",
    tasks: [
     {
  id: "prime_factors_12",
  type: "prime_factors",
  number: 12,
  answer: { 2: 2, 3: 1 },  // 2² × 3¹
  difficulty: 1
},
{
  id: "prime_factors_18",
  type: "prime_factors",
  number: 18,
  answer: { 2: 1, 3: 2 },  // 2¹ × 3²
  difficulty: 1
},
{
  id: "prime_factors_30",
  type: "prime_factors",
  number: 30,
  answer: { 2: 1, 3: 1, 5: 1 },  // 2¹ × 3¹ × 5¹
  difficulty: 1
},
{
  id: "prime_factors_36",
  type: "prime_factors",
  number: 36,
  answer: { 2: 2, 3: 2 },  // 2² × 3²
  difficulty: 2
},
{
  id: "prime_factors_72",
  type: "prime_factors",
  number: 72,
  answer: { 2: 3, 3: 2 },  // 2³ × 3²
  difficulty: 2
},
{
  id: "prime_factors_100",
  type: "prime_factors",
  number: 100,
  answer: { 2: 2, 5: 2 },  // 2² × 5²
  difficulty: 2
},
{
  id: "prime_factors_180",
  type: "prime_factors",
  number: 180,
  answer: { 2: 2, 3: 2, 5: 1 },  // 2² × 3² × 5¹
  difficulty: 3
}
    ]
  },

  // ==================== AUFGABE 19: Textaufgaben - Alltag (mittel-schwer) - 10 Aufgaben ====================
  {
    id: "task19_word_problems",
    difficulty: "schwer",
    description: "Textaufgaben aus dem Alltag",
    tasks: [
      {
        id: "task19_a",
        question: "Ein Bäcker backt 5 Brote pro Blech. Jedes Brot wird in 12 Scheiben geschnitten. Wie viele Scheiben sind auf 8 Blechen?",
        type: "scalar",
        answer: 480,
        difficulty: 2,
      },
      {
        id: "task19_b",
        question: "Ein LKW transportiert 3 Paletten mit je 8 Kartons. Jeder Karton enthält 6 Flaschen. Wie viele Flaschen sind auf dem LKW?",
        type: "scalar",
        answer: 144,
        difficulty: 2,
      },
      {
        id: "task19_d",
        question: "Ein Händler kauft 24 Handys für jeweils 150 € und verkauft sie für jeweils 180 €. Wie viel € Gewinn macht er insgesamt?",
        type: "scalar",
        answer: 720,
        difficulty: 2,
      },
      {
        id: "task19_e",
        question: "Eine Schulklasse mit 28 Kindern macht einen Ausflug. Jedes Kind zahlt 3 € für den Eintritt und 2 € für das Mittagessen. Wie viel € zahlt die ganze Klasse insgesamt?",
        type: "scalar",
        answer: 140,
        difficulty: 2,
      },
      {
        id: "task19_f",
        question: "Ein Auto verbraucht auf 100 km 7 Liter Benzin. Wie viele Liter braucht es für 300 km?",
        type: "scalar",
        answer: 21,
        difficulty: 2,
      },
      {
        id: "task19_g",
        question: "Ein Zug fährt um 9:30 Uhr ab und kommt um 12:15 Uhr an. Wie lange dauert die Fahrt in Minuten?",
        type: "scalar",
        answer: 165,
        difficulty: 2,
      },
      {
        id: "task19_i",
        question: "Ein Fußballturnier hat 8 Mannschaften. Jede Mannschaft spielt gegen jede andere genau einmal. Wie viele Spiele gibt es insgesamt?",
        type: "scalar",
        answer: 28,
        difficulty: 3,
      }
    ]
  }
];

// ============================================
// STATISTIK-FUNKTIONEN
// ============================================

function getTotalTasks() {
  return levels.reduce((total, level) => total + level.tasks.length, 0);
}

function getTasksByDifficulty(difficulty) {
  return levels
    .filter(level => level.difficulty === difficulty)
    .reduce((total, level) => total + level.tasks.length, 0);
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

// Statistiken ausgeben
console.log("=== AUFGABENSTATISTIK CHECK-OUT KAPITEL III ===");
console.log("Gesamtanzahl Aufgaben:", getTotalTasks());
console.log("Leichte Aufgaben:", getTasksByDifficulty("leicht"));
console.log("Mittlere Aufgaben:", getTasksByDifficulty("mittel"));
console.log("Schwere Aufgaben:", getTasksByDifficulty("schwer"));

// Export für Kompatibilität
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { levels, getTotalTasks, getLevelTasks, getLevelById, getTaskById, getTasksByDifficulty };
}