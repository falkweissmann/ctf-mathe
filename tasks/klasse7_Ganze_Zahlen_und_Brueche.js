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
  
   // Aufgabe 3: Zahlenstrahl
{
  title:"📐", 
  id: "task3_sketch",
  tasks: [
    {
     id: "task3_task_a",
        question: "a) ",
        type: "scalar",
        answer: 2,
        difficulty: 1,
    },
    {
     id: "task3_task_b",
        question: "b) ",
        type: "scalar",
        answer: 5,
        difficulty: 1,
    },
    {
     id: "task3_task_c",
        question: "c) ",
        type: "scalar",
        answer: 0,
        difficulty: 1,
    },
    {
     id: "task3_task_d",
        question: "d) ",
        type: "scalar",
        answer: 0,
        difficulty: 1,
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
  // Aufgabe 9 Klammer Auflösen
  {
    id: "Klammern_auflösen",
    tasks: [
        {
        id: "task9_task_a",
        question: "a) \\(223 - (45 - 31) - [155 + ( -87 - 19)]=\\) ",
        type: "scalar",
        answer: 160,
        difficulty: 1
        },
        {
        id: "task9_task_b",
        question: "b) \\([120 - (45 + 30)] + (-200 - 85)=\\) ",
        type: "scalar",
        answer: -240,
        difficulty: 1
        },
        {
        id: "task9_task_c",
        question: "c) \\(350 - [(150 - 50) + 40] - 25=\\) ",
        type: "scalar",
        answer: 185,
        difficulty: 1
        },
        {
        id: "task9_task_d",
        question: "d) \\((500 - 200) - [120 + (30 - 70)]=\\) ",
        type: "scalar",
        answer: 220,
        difficulty: 1
        },
         {
        id: "task9_task_e",
        question: "e) \\([250 + (60 - 90)] - (130 - 45)=\\) ",
        type: "scalar",
        answer: 135,
        difficulty: 1
        }
    ]
  },
  // Aufgabe 10
  {
  id: "task_magic_square_1",
  tasks: [
    {
      id: "magic_square_a",
      question: "Vervollständige das magische Quadrat (alle Zeilen und Spalten haben das gleiche Produkt):",
      type: "grid_fill",
      size: 3,
      operation: "multiplikativ",
      // Vorgegebene Werte: "leer" bedeutet Eingabefeld
      given: [
        [-1, -1, "leer"],
        [1, "leer", -1],
        ["leer", 1, "leer"]
      ],
      // Lösung (wird zum Prüfen verwendet)
      answer: {
        values: [
          [-1, -1, 1],
          [1, -1, -1],
          [-1, 1, -1]
        ]
      },
      difficulty: 2,
     },
     {
      id: "magic_square_b",
      question: "Vervollständige das magische Quadrat (alle Zeilen und Spalten haben das gleiche Produkt):",
      type: "grid_fill",
      size: 3,
      operation: "multiplikativ",
      // Vorgegebene Werte: "leer" bedeutet Eingabefeld
      given: [
        ["leer", "leer", 1],
        [1, "leer", -3],
        ["leer", -1, 2]
      ],
      // Lösung (wird zum Prüfen verwendet)
      answer: {
        values: [
          [-2, 3, 1],
          [1, 2, -3],
          [3, -1, 2]
        ]
      },
      difficulty: 2,
     },
     {
      id: "magic_square_c",
      question: "Vervollständige das magische Quadrat (alle Zeilen und Spalten haben das gleiche Produkt):",
      type: "grid_fill",
      size: 3,
      operation: "multiplikativ",
      // Vorgegebene Werte: "leer" bedeutet Eingabefeld
      given: [
        [-2, -3, "leer"],
        [3, "leer", "leer"],
        [-3, "leer", -2]
      ],
      // Lösung (wird zum Prüfen verwendet)
      answer: {
        values: [
        [-2, -3, 3],
        [3, -2,-3],
        [-3, 3, -2]
        ]
      },
      difficulty: 2,
     }
  ]
},
  // Aufgabe 11
    {
    id: "Ausklammern",
    tasks: [
        {
        id: "task11_task_a",
        question: "a) \\((-4)\\cdot(-16)+(-4)\\cdot7=\\)",
        type: "scalar",
        answer: 36,
        difficulty: 1
        },
        {
        id: "task11_task_b",
        question: "b) \\(128\\cdot(-7) + (-7)\\cdot(-28)=\\)",
        type: "scalar",
        answer: -700,
        difficulty: 1
        },
        {
        id: "task11_task_c",
        question: "c) \\(25\\cdot(-19) + 24\\cdot25=\\)",
        type: "scalar",
        answer: 125,
        difficulty: 1
        },
         {
        id: "task11_task_d",
        question: "d) \\(34\\cdot(-23) - 17\\cdot(-7)=\\)",
        type: "scalar",
        answer: -663,
        difficulty: 2
        },
        {
        id: "task11_task_e",
        question: "e) \\((-5)\\cdot12+(-5)\\cdot(-8)=\\)",
        type: "scalar",
        answer: -20,
        difficulty: 1
        },
        {
        id: "task11_task_f",
        question: "f) \\(45\\cdot(-6)+(-6)\\cdot15=\\)",
        type: "scalar",
        answer: -360,
        difficulty: 1
        },
        {
        id: "task11_task_g",
        question: "g) \\(2,5\\cdot(-4,5)+10\\cdot2,5=\\)",
        type: "scalar",
        answer: 13.75,
        difficulty: 1
        },
        {
        id: "task11_task_h",
        question: "h) \\((-30)\\cdot18-15\\cdot(-6)=\\)",
        type: "scalar",
        answer: -450,
        difficulty: 2
        },
        {
        id: "task11_task_i",
        question: "i) \\((-6)\\cdot15+(-6)\\cdot9=\\)",
        type: "scalar",
        answer: -144,
        difficulty: 1
        }
    ]
  },
  // Aufgabe 12: Textaufgabe 1
  {
    id: "task12_text1",
      tasks: [
      {
        id: "task12_task_a",
        question: "Der Kontostand nach dem Zusammenführen der Konten beträgt:",
        type: "scalar",
        answer: -2450,
        difficulty: 2
      }
    ]
  },
  // Aufgabe 13: Textaufgabe 2
  {
    id: "task13_text1",
      tasks: [
      {
        id: "task13_task_a",
        question: "Lena's Geldbeträge sind:",
        type: "scalar",
        answer: 180,
        difficulty: 2
      }
    ]
  },
  // Aufgabe 14: Textaufgabe 3
  {
    id: "task14_text1",
      tasks: [
      {
        id: "task14_task_a",
        question: "Tom's Gesamtpunkte betragen",
        type: "scalar",
        answer: 25,
        difficulty: 2
      }
    ]
  },
  // Aufgabe 15: Textaufgabe 4
  {
    id: "task15_text1",
      tasks: [
      {
        id: "task15_task_a",
        question: "Der Gesamtbestand an Früchten im Laden beträgt:",
        type: "scalar",
        answer: 245,
        difficulty: 2
      }
    ]
  },
  // Aufgabe 16: Textaufgabe 5
  {
    id: "task16_text1",
      tasks: [
      {
        id: "task16_task_a",
        question: "Die Temperatur am ersten Tag betrug:",
        type: "scalar",
        answer: 27,
        difficulty: 3
      }
    ]
  },
  // Aufgabe 17: Textaufgabe 6
  {
    id: "task17_text1",
      tasks: [
      {
        id: "task17_task_a",
        question: "Die Höhe des Wanderers beträgt:",
        type: "scalar",
        answer: 2600,
        difficulty: 2
      }
    ]
  },
  // Aufgabe 18: Quadrataufgaben
  {
    id: "task18_text1",
      tasks: [
      {
        id: "task18_task_a",
        question: "a) \\((-2 \\cdot (3 + 1))^2 =  \\)",
        type: "scalar",
        answer: 64,
        difficulty: 2
      },
      {  
        id: "task18_task_b",
        question: "b) \\((1 - 4)^3 + 5 =   \\)",
        type: "scalar",
        answer: -22,
        difficulty: 2
      },             
      {
        id: "task18_task_c",
        question: "c) \\((-1 \\cdot (2 + 3))^2 - 4 =   \\)",
        type: "scalar",
        answer: 21,
        difficulty: 2
      },
      {
        id: "task18_task_d",
        question: "d) \\(((-3) + 2)^3 =  \\)",
        type: "scalar",
        answer: -1,
        difficulty: 2
      },
      {
        id: "task18_task_e",
        question: "e) \\(2 \\cdot (1 - 3)^2 =   \\)",
        type: "scalar",
        answer: 8,
        difficulty: 2
      },
      {
        id: "task18_task_f",
        question: "f) \\((-1 \\cdot (4 + 1))^2 + 6 =   \\)",
        type: "scalar",
        answer: 31,
        difficulty: 2
      }
    ]
  },
  // Aufgabe 19: Textaufgabe 7
  {
    id: "task19_text1",
      tasks: [
      {
        id: "task19_task_a",
        question: "a) Die Temperatur des Föhnwindes in München beträgt:",
        type: "scalar",
        answer: 10,
        difficulty: 2
      },
      {
        id: "task19_task_b",
        question: "b) Die Temperatur des Föhnwindes in Italien beträgt:",
        type: "scalar",
        answer: 15,
        difficulty: 2
      }
    ]
  },
  // Aufgabe 20: Brüche Kürzen
  {
    id: "task20_text1",
      tasks: [
      {
        id: "task20_task_a",
        question: "a) \\( \\frac{4}{6} =  \\)",
        type: "scalar",
        answer: 2/3,
        difficulty: 1
      },
      {  
        id: "task20_task_b",
        question: "b) \\(\\frac{9}{12} =   \\)",
        type: "scalar",
        answer: 3/4,
        difficulty: 1
      },             
      {
        id: "task20_task_c",
        question: "c) \\(\\frac{6}{18} =   \\)",
        type: "scalar",
        answer: 1/3,
        difficulty: 1
      },
      {
        id: "task20_task_d",
        question: "d) \\(\\frac{9}{21} =  \\)",
        type: "scalar",
        answer: 3/7,
        difficulty: 1
      },
      {
        id: "task20_task_e",
        question: "e) \\(\\frac{12}{27} =   \\)",
        type: "scalar",
        answer: 4/9,
        difficulty: 1
      },
      {
        id: "task20_task_f",
        question: "f) \\(\\frac{20}{24} =   \\)",
        type: "scalar",
        answer: 5/6,
        difficulty: 1
      },
      {
        id: "task20_task_g",
        question: "g) \\( \\frac{18}{39} =  \\)",
        type: "scalar",
        answer: 6/13,
        difficulty: 1
      },
      {  
        id: "task20_task_h",
        question: "h) \\(\\frac{30}{42} =   \\)",
        type: "scalar",
        answer: 5/7,
        difficulty: 1
      },             
      {
        id: "task20_task_i",
        question: "i) \\(\\frac{120}{150} =   \\)",
        type: "scalar",
        answer: 4/5,
        difficulty: 1
      },
      {
        id: "task20_task_j",
        question: "j) \\(\\frac{126}{210} =  \\)",
        type: "scalar",
        answer: 3/5,
        difficulty: 1
      },
      {
        id: "task20_task_k",
        question: "k) \\(\\frac{135}{180} =   \\)",
        type: "scalar",
        answer: 3/4,
        difficulty: 1
      },
      {
        id: "task20_task_l",
        question: "l) \\(\\frac{198}{306} =   \\)",
        type: "scalar",
        answer: 11/17,
        difficulty: 1
      }
    ]
  },
  // Aufgabe 21: Brüche Erweitern
  {
    id: "task21_text1",
      tasks: [
      {
        id: "task21_task_a",
        question: "a) \\( \\frac{8}{12} =  \\)",
        type: "scalar",
        answer: 96/144,
        difficulty: 1
      },
      {
        id: "task21_task_b",
        question: "b) \\( \\frac{3}{5} =  \\)",
        type: "scalar",
        answer: 9/15,
        difficulty: 1
      },
      {
        id: "task21_task_c",
        question: "c) \\( \\frac{7}{8} =  \\)",
        type: "scalar",
        answer: 49/56,
        difficulty: 1
      },
      {
        id: "task21_task_d",
        question: "d) \\( \\frac{21}{3} =  \\)",
        type: "scalar",
        answer: 147/21,
        difficulty: 1
      },
      {
        id: "task21_task_e",
        question: "e) \\( \\frac{2}{13} =  \\)",
        type: "scalar",
        answer: 6/39,
        difficulty: 1
      },
      {
        id: "task21_task_f",
        question: "f) \\( \\frac{2}{7} =  \\)",
        type: "scalar",
        answer: 24/84,
        difficulty: 1
      },
     ]
  },
  // Aufgabe 22: Brüche Addieren und Subtrahieren
  {
    id: "task22_text1",
      tasks: [
      {
        id: "task22_task_a",
        question: "a) ",
        type: "scalar",
        answer: 47/40,
        difficulty: 1
      },
      {
        id: "task22_task_b",
        question: "b) ",
        type: "scalar",
        answer: 3/7,
        difficulty: 1
      },
      {
        id: "task22_task_c",
        question: "c) ",
        type: "scalar",
        answer: 5/2,
        difficulty: 1
      },
      {
        id: "task22_task_d",
        question: "d) ",
        type: "scalar",
        answer: 9/10,
        difficulty: 1
      },
      {
        id: "task22_task_e",
        question: "e) ",
        type: "scalar",
        answer: 23/14,
        difficulty: 1
      },
      {
        id: "task22_task_f",
        question: "f) ",
        type: "scalar",
        answer: 25/3,
        difficulty: 1
      },
      {
        id: "task22_task_g",
        question: "g) ",
        type: "scalar",
        answer: 17/14,
        difficulty: 1
      },
      {
        id: "task22_task_h",
        question: "h) ",
        type: "scalar",
        answer: 23/90,
        difficulty: 1
      },
      {
        id: "task22_task_i",
        question: "i) ",
        type: "scalar",
        answer: 44/9,
        difficulty: 1
      },
      {
        id: "task22_task_j",
        question: "j) ",
        type: "scalar",
        answer: 26/55,
        difficulty: 1
      },
      {
        id: "task22_task_k",
        question: "k) ",
        type: "scalar",
        answer: 0,
        difficulty: 1
      },
      {
        id: "task22_task_l",
        question: "l) ",
        type: "scalar",
        answer: 24/5,
        difficulty: 1
      }
     ]
  },
  // Aufgabe 23: Brüche Multiplizieren
  {
    id: "task23_text1",
      tasks: [
      {
        id: "task23_task_a",
        question: "a) ",
        type: "scalar",
        answer: 1/11,
        difficulty: 1
      },
      {
        id: "task23_task_b",
        question: "b) ",
        type: "scalar",
        answer: 10/49,
        difficulty: 1
      },
      {
        id: "task23_task_c",
        question: "c) ",
        type: "scalar",
        answer: 2/11,
        difficulty: 1
      },
      {
        id: "task23_task_d",
        question: "d) ",
        type: "scalar",
        answer: 6,
        difficulty: 1
      },
      {
        id: "task23_task_e",
        question: "e) ",
        type: "scalar",
        answer: 4/21,
        difficulty: 1
      },
      {
        id: "task23_task_f",
        question: "f) ",
        type: "scalar",
        answer: 7/4,
        difficulty: 1
      },
      {
        id: "task23_task_g",
        question: "g) ",
        type: "scalar",
        answer: 2/3,
        difficulty: 1
      },
      {
        id: "task23_task_h",
        question: "h) ",
        type: "scalar",
        answer: 36/55,
        difficulty: 1
      }
     ]
  },
  // Aufgabe 24: Brüche Dividieren
  {
    id: "task24_text1",
      tasks: [
      {
        id: "task24_task_a",
        question: "a) ",
        type: "scalar",
        answer: 10/7,
        difficulty: 1
      },
      {
        id: "task24_task_b",
        question: "b) ",
        type: "scalar",
        answer: 3/4,
        difficulty: 1
      },
      {
        id: "task24_task_c",
        question: "c) ",
        type: "scalar",
        answer: 6,
        difficulty: 1
      },
      {
        id: "task24_task_d",
        question: "d) ",
        type: "scalar",
        answer: 27/2,
        difficulty: 1
      },
      {
        id: "task24_task_e",
        question: "e) ",
        type: "scalar",
        answer: 9/10,
        difficulty: 1
      },
      {
        id: "task24_task_f",
        question: "f) ",
        type: "scalar",
        answer: 3/2,
        difficulty: 1
      },
      {
        id: "task24_task_g",
        question: "g) ",
        type: "scalar",
        answer: 6/5,
        difficulty: 1
      },
      {
        id: "task24_task_h",
        question: "h) ",
        type: "scalar",
        answer: 2,
        difficulty: 1
      }
     ]
  },

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