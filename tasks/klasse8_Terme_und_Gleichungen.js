// ============================================
// KLASSE 8 – TERME UND GLEICHUNGEN
// Die Aufgabennummern entsprechen dem Tutory-Arbeitsblatt.
// ============================================

const levels = [
  // Aufgabe 1: Terme zusammenfassen
  {
    id: "tg8_task1",
    title: "Terme zusammenfassen",
    tasks: [
      {
        id: "tg8_task1_a",
        question: "a) \\(3x+5x\\)",
        type: "term",
        answer: "8x",
        form: "simplified",
        difficulty: 1
      },
      {
        id: "tg8_task1_b",
        question: "b) \\(7a-2a+4a\\)",
        type: "term",
        answer: "9a",
        form: "simplified",
        difficulty: 1
      },
      {
        id: "tg8_task1_c",
        question: "c) \\(4x+3y+2x-y\\)",
        type: "term",
        answer: "6x+2y",
        form: "simplified",
        difficulty: 1
      },
      {
        id: "tg8_task1_d",
        question: "d) \\(9b-4-3b+10\\)",
        type: "term",
        answer: "6b+6",
        form: "simplified",
        difficulty: 1
      },
      {
        id: "tg8_task1_e",
        question: "e) \\(5ab+2a-3ab+a\\)",
        type: "term",
        answer: "2ab+3a",
        form: "simplified",
        difficulty: 2
      }
    ]
  },

  // Aufgabe 2: Produkte und Quotienten
  {
    id: "tg8_task2",
    title: "Produkte und Quotienten",
    tasks: [
      {
        id: "tg8_task2_a",
        question: "a) \\(3\\cdot 4x\\)",
        type: "term",
        answer: "12x",
        form: "simplified",
        difficulty: 1
      },
      {
        id: "tg8_task2_b",
        question: "b) \\(2a\\cdot 5b\\)",
        type: "term",
        answer: "10ab",
        form: "simplified",
        difficulty: 1
      },
      {
        id: "tg8_task2_c",
        question: "c) \\(x\\cdot x\\)",
        type: "term",
        answer: "x^2",
        form: "simplified",
        difficulty: 1
      },
      {
        id: "tg8_task2_d",
        question: "d) \\((-3x)\\cdot 2x\\)",
        type: "term",
        answer: "-6x^2",
        form: "simplified",
        difficulty: 2
      },
      {
        id: "tg8_task2_e",
        question: "e) \\(12x:4\\)",
        type: "term",
        answer: "3x",
        form: "simplified",
        difficulty: 1
      }
    ]
  },

  // Aufgabe 3: Termwerte berechnen
  {
    id: "tg8_task3",
    title: "Termwerte berechnen",
    tasks: [
      {
        id: "tg8_task3_a",
        question: "a) \\(4x+7\\) für \\(x=3\\)",
        type: "scalar",
        answer: 19,
        difficulty: 1
      },
      {
        id: "tg8_task3_b",
        question: "b) \\(x^2+2x\\) für \\(x=5\\)",
        type: "scalar",
        answer: 35,
        difficulty: 1
      },
      {
        id: "tg8_task3_c",
        question: "c) \\(2(x-4)+x\\) für \\(x=8\\)",
        type: "scalar",
        answer: 16,
        difficulty: 1
      },
      {
        id: "tg8_task3_d",
        question: "d) \\(3a-2b\\) für \\(a=4,\\; b=-5\\)",
        type: "scalar",
        answer: 22,
        difficulty: 2
      },
      {
        id: "tg8_task3_e",
        question: "e) \\(x^2-x\\) für \\(x=-3\\)",
        type: "scalar",
        answer: 12,
        difficulty: 2
      }
    ]
  },

  // Aufgabe 4: Klammern auflösen
  {
    id: "tg8_task4",
    title: "Klammern auflösen",
    tasks: [
      {
        id: "tg8_task4_a",
        question: "a) \\(5x+(3x-2)\\)",
        type: "term",
        answer: "8x-2",
        form: "simplified",
        difficulty: 1
      },
      {
        id: "tg8_task4_b",
        question: "b) \\(9a-(4a+6)\\)",
        type: "term",
        answer: "5a-6",
        form: "simplified",
        difficulty: 1
      },
      {
        id: "tg8_task4_c",
        question: "c) \\(7-(2x-5)\\)",
        type: "term",
        answer: "-2x+12",
        form: "simplified",
        difficulty: 2
      },
      {
        id: "tg8_task4_d",
        question: "d) \\((3x+4y)-(x-2y)\\)",
        type: "term",
        answer: "2x+6y",
        form: "simplified",
        difficulty: 2
      },
      {
        id: "tg8_task4_e",
        question: "e) \\(10b-(3b-8)+(2-b)\\)",
        type: "term",
        answer: "6b+10",
        form: "simplified",
        difficulty: 2
      }
    ]
  },

  // Aufgabe 5: Ausmultiplizieren
  {
    id: "tg8_task5",
    title: "Ausmultiplizieren",
    tasks: [
      {
        id: "tg8_task5_a",
        question: "a) \\(3(x+4)\\)",
        type: "term",
        answer: "3x+12",
        form: "simplified",
        difficulty: 1
      },
      {
        id: "tg8_task5_b",
        question: "b) \\(-2(4x-7)\\)",
        type: "term",
        answer: "-8x+14",
        form: "simplified",
        difficulty: 1
      },
      {
        id: "tg8_task5_c",
        question: "c) \\(x(x+6)\\)",
        type: "term",
        answer: "x^2+6x",
        form: "simplified",
        difficulty: 1
      },
      {
        id: "tg8_task5_d",
        question: "d) \\(4a(2a-3b)\\)",
        type: "term",
        answer: "8a^2-12ab",
        form: "simplified",
        difficulty: 2
      },
      {
        id: "tg8_task5_e",
        question: "e) \\((6x-9):3\\)",
        type: "term",
        answer: "2x-3",
        form: "simplified",
        difficulty: 2
      }
    ]
  },

  // Aufgabe 6: Ausklammern
  {
    id: "tg8_task6",
    title: "Ausklammern",
    tasks: [
      {
        id: "tg8_task6_a",
        question: "a) \\(6x+12\\)",
        type: "term",
        answer: "6(x+2)",
        form: "factored",
        factor: "6",
        difficulty: 2
      },
      {
        id: "tg8_task6_b",
        question: "b) \\(15a-10\\)",
        type: "term",
        answer: "5(3a-2)",
        form: "factored",
        factor: "5",
        difficulty: 2
      },
      {
        id: "tg8_task6_c",
        question: "c) \\(8x+12y\\)",
        type: "term",
        answer: "4(2x+3y)",
        form: "factored",
        factor: "4",
        difficulty: 2
      },
      {
        id: "tg8_task6_d",
        question: "d) \\(x^2+5x\\)",
        type: "term",
        answer: "x(x+5)",
        form: "factored",
        factor: "x",
        difficulty: 2
      },
      {
        id: "tg8_task6_e",
        question: "e) \\(12ab-18a\\)",
        type: "term",
        answer: "6a(2b-3)",
        form: "factored",
        factor: "6a",
        difficulty: 3
      }
    ]
  },

  // Aufgabe 7: Ausmultiplizieren und zusammenfassen
  {
    id: "tg8_task7",
    title: "Ausmultiplizieren und zusammenfassen",
    tasks: [
      {
        id: "tg8_task7_a",
        question: "a) \\(2(x+3)+4x\\)",
        type: "term",
        answer: "6x+6",
        form: "simplified",
        difficulty: 2
      },
      {
        id: "tg8_task7_b",
        question: "b) \\(5(a-2)-3(a+1)\\)",
        type: "term",
        answer: "2a-13",
        form: "simplified",
        difficulty: 2
      },
      {
        id: "tg8_task7_c",
        question: "c) \\(4(2x-1)-(3x-9)\\)",
        type: "term",
        answer: "5x+5",
        form: "simplified",
        difficulty: 2
      },
      {
        id: "tg8_task7_d",
        question: "d) \\((x+2)(x+5)\\)",
        type: "term",
        answer: "x^2+7x+10",
        form: "simplified",
        difficulty: 3
      },
      {
        id: "tg8_task7_e",
        question: "e) \\((2a-3)(a+4)\\)",
        type: "term",
        answer: "2a^2+5a-12",
        form: "simplified",
        difficulty: 3
      }
    ]
  },

  // Aufgabe 8: Lösung durch Einsetzen finden
  {
    id: "tg8_task8",
    title: "Lösung durch Einsetzen finden",
    tasks: [
      {
        id: "tg8_task8_a",
        question: "a) \\(3x+4=19\\)",
        type: "scalar",
        answer: 5,
        difficulty: 1
      },
      {
        id: "tg8_task8_b",
        question: "b) \\(2x-7=x+1\\)",
        type: "scalar",
        answer: 8,
        difficulty: 1
      },
      {
        id: "tg8_task8_c",
        question: "c) \\(x^2=4x-4\\)",
        type: "scalar",
        answer: 2,
        difficulty: 2
      },
      {
        id: "tg8_task8_d",
        question: "d) \\(\\frac{x}{2}+3=2x-6\\)",
        type: "scalar",
        answer: 6,
        difficulty: 2
      }
    ]
  },

  // Aufgabe 9: Äquivalenzumformungen erkennen
  {
    id: "tg8_task9",
    title: "Äquivalenzumformungen erkennen",
    tasks: [
      {
        id: "tg8_task9_a",
        question: "a) \\(x+7=12 \\;\\Rightarrow\\; x=5\\)",
        type: "umformung",
        answer: "-7",
        difficulty: 1
      },
      {
        id: "tg8_task9_b",
        question: "b) \\(4x=28 \\;\\Rightarrow\\; x=7\\)",
        type: "umformung",
        answer: ":4",
        difficulty: 1
      },
      {
        id: "tg8_task9_c",
        question: "c) \\(\\frac{x}{5}=3 \\;\\Rightarrow\\; x=15\\)",
        type: "umformung",
        answer: "*5",
        difficulty: 1
      },
      {
        id: "tg8_task9_d",
        question: "d) \\(3x+8=20 \\;\\Rightarrow\\; 3x=12\\)",
        type: "umformung",
        answer: "-8",
        difficulty: 1
      },
      {
        id: "tg8_task9_e",
        question: "e) \\(5x=2x+9 \\;\\Rightarrow\\; 3x=9\\)",
        type: "umformung",
        answer: "-2x",
        difficulty: 2
      }
    ]
  },

  // Aufgabe 10: Äquivalenzumformungen durchführen
  {
    id: "tg8_task10",
    title: "Äquivalenzumformungen durchführen",
    tasks: [
      {
        id: "tg8_task10_a",
        question: "a) \\(2x+9=23 \\quad |\\,-9\\) ergibt \\(2x=\\square\\)",
        type: "scalar",
        answer: 14,
        difficulty: 1
      },
      {
        id: "tg8_task10_b",
        question: "b) \\(\\frac{x}{4}=-6 \\quad |\\,\\cdot 4\\) ergibt \\(x=\\square\\)",
        type: "scalar",
        answer: -24,
        difficulty: 1
      },
      {
        id: "tg8_task10_c",
        question: "c) \\(7x-4=3x+20 \\quad |\\,-3x\\) ergibt \\(\\square\\cdot x-4=20\\)",
        type: "scalar",
        answer: 4,
        difficulty: 1
      },
      {
        id: "tg8_task10_d",
        question: "d) \\(5x+6=2x-9 \\quad |\\,-6\\) ergibt \\(5x=2x+\\square\\)",
        type: "scalar",
        answer: -15,
        difficulty: 2
      }
    ]
  },

  // Aufgabe 11: Einfache Gleichungen
  {
    id: "tg8_task11",
    title: "Einfache Gleichungen",
    tasks: [
      {
        id: "tg8_task11_a",
        question: "a) \\(6x=-42\\)",
        type: "scalar",
        answer: -7,
        difficulty: 1
      },
      {
        id: "tg8_task11_b",
        question: "b) \\(3x+5=26\\)",
        type: "scalar",
        answer: 7,
        difficulty: 1
      },
      {
        id: "tg8_task11_c",
        question: "c) \\(4x-9=15\\)",
        type: "scalar",
        answer: 6,
        difficulty: 1
      },
      {
        id: "tg8_task11_d",
        question: "d) \\(\\frac{x}{3}-2=4\\)",
        type: "scalar",
        answer: 18,
        difficulty: 1
      },
      {
        id: "tg8_task11_e",
        question: "e) \\(12-2x=4\\)",
        type: "scalar",
        answer: 4,
        difficulty: 1
      }
    ]
  },

  // Aufgabe 12: Gleichungen mit x auf beiden Seiten
  {
    id: "tg8_task12",
    title: "Gleichungen mit x auf beiden Seiten",
    tasks: [
      {
        id: "tg8_task12_a",
        question: "a) \\(5x+3=2x+18\\)",
        type: "scalar",
        answer: 5,
        difficulty: 2
      },
      {
        id: "tg8_task12_b",
        question: "b) \\(4x+10=9x-5\\)",
        type: "scalar",
        answer: 3,
        difficulty: 2
      },
      {
        id: "tg8_task12_c",
        question: "c) \\(2x-7=5x+8\\)",
        type: "scalar",
        answer: -5,
        difficulty: 2
      },
      {
        id: "tg8_task12_d",
        question: "d) \\(9-x=3x-19\\)",
        type: "scalar",
        answer: 7,
        difficulty: 2
      },
      {
        id: "tg8_task12_e",
        question: "e) \\(8x+1=3x+3\\)",
        type: "term",
        answer: "2/5",
        form: "value",
        difficulty: 2
      }
    ]
  },

  // Aufgabe 13: Gleichungen mit Klammern
  {
    id: "tg8_task13",
    title: "Gleichungen mit Klammern",
    tasks: [
      {
        id: "tg8_task13_a",
        question: "a) \\(2(x-5)=x+4\\)",
        type: "scalar",
        answer: 14,
        difficulty: 2
      },
      {
        id: "tg8_task13_b",
        question: "b) \\(5(x-1)=3(x+5)\\)",
        type: "scalar",
        answer: 10,
        difficulty: 2
      },
      {
        id: "tg8_task13_c",
        question: "c) \\(4(2x-3)-2x=3(x+4)\\)",
        type: "scalar",
        answer: 8,
        difficulty: 3
      },
      {
        id: "tg8_task13_d",
        question: "d) \\(7-(3x-5)=2(x+1)\\)",
        type: "scalar",
        answer: 2,
        difficulty: 3
      },
      {
        id: "tg8_task13_e",
        question: "e) \\((x+3)(x-2)=x^2+6\\)",
        type: "scalar",
        answer: 12,
        difficulty: 3
      }
    ]
  },

  // Aufgabe 14: Terme aufstellen
  {
    id: "tg8_task14",
    title: "Terme aufstellen",
    tasks: [
      {
        id: "tg8_task14_a",
        question: "a) Term für den Umfang",
        type: "term",
        answer: "4x+6",
        form: "simplified",
        difficulty: 2
      },
      {
        id: "tg8_task14_b",
        question: "b) Term für die Gesamtkosten",
        type: "term",
        answer: "9n+4",
        form: "simplified",
        difficulty: 2
      },
      {
        id: "tg8_task14_c",
        question: "c) Term für das Gesamtalter",
        type: "term",
        answer: "5x-3",
        form: "simplified",
        difficulty: 2
      },
      {
        id: "tg8_task14_d",
        question: "d) Term für den Flächeninhalt",
        type: "term",
        answer: "2x^2+10x",
        form: "simplified",
        difficulty: 3
      }
    ]
  },

  // Aufgabe 15: Sachaufgaben
  {
    id: "tg8_task15",
    title: "Sachaufgaben",
    tasks: [
      {
        id: "tg8_task15_a",
        question: "a) Gesuchte Zahl",
        type: "scalar",
        answer: 9,
        difficulty: 2
      },
      {
        id: "tg8_task15_b",
        question: "b) Kleinste Zahl",
        type: "scalar",
        answer: 27,
        difficulty: 2
      },
      {
        id: "tg8_task15_c",
        question: "c) Breite in cm",
        type: "scalar",
        answer: 10,
        difficulty: 2
      },
      {
        id: "tg8_task15_d",
        question: "d) Anzahl der Monate",
        type: "scalar",
        answer: 6,
        difficulty: 3
      },
      {
        id: "tg8_task15_e",
        question: "e) Mias Alter in Jahren",
        type: "scalar",
        answer: 8,
        difficulty: 3
      },
      {
        id: "tg8_task15_f",
        question: "f) Jonas Flaggen",
        type: "scalar",
        answer: 25,
        difficulty: 3
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
