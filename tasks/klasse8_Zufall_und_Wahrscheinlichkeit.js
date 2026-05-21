// ============================================
// LEVEL-STRUKTUR MIT IHREN AUFGABEN
// ============================================

const levels = [
  // Aufgabe 1: Glücksrad
  {
    id: "task1_gluecksrad",
       tasks: [
      {
        id: "task1_task_a",
        question: "a) Ergebnismenge \\(\\Omega\\) des Glücksrades:",
        type: "set",
        answer: [1,2,3,4,5,6,7,8,9,10,11,12],
        difficulty: 1
      },
      {
      id: "prob_b",
      question: "b) Die Zahl ist durch 4 teilbar.",
      type: "probability",
      fields: ["set", "fraction", "decimal", "percent"],
      answer: {
        set: ["4,8,12"],  // oder ["red"] oder ["r"]
        fraction: "3/12",
        decimal: 0.25,
        percent: 25
      },
      difficulty: 1,
      },
      {
      id: "prob_c",
      question: "c) Die Zahl ist ein Vielfaches von 6.",
      type: "probability",
      fields: ["set", "fraction", "decimal", "percent"],
      answer: {
        set: ["6,12"],  // oder ["red"] oder ["r"]
        fraction: "2/12",
        decimal: 0.167,
        percent: 16.67
      },
      difficulty: 1,
      },
      {
      id: "prob_d",
      question: "d) Die Zahl ist größer als 4 und kleiner als 11.",
      type: "probability",
      fields: ["set", "fraction", "decimal", "percent"],
      answer: {
        set: ["5,6,7,8,9,10"],  // oder ["red"] oder ["r"]
        fraction: "6/12",
        decimal: 0.5,
        percent: 50
      },
      difficulty: 1,
      }
              ]
  },  
  // Aufgabe 2: Lostrommel
  {
    id: "task2_lostrommel",
       tasks: [
      {
        id: "task2_task_a",
        question: "a) \\(71+14+(-86)+(-52)=\\)",
        type: "scalar",
        answer: -53,
        difficulty: 1
      }
    ]
  },
  // Aufgabe 3: Secher Würfel
  {
    id: "task3_sechser_wuerfel",
       tasks: [
      {
        id: "task3_task_a",
        question: "a) \\(71+14+(-86)+(-52)=\\)",
        type: "scalar",
        answer: -53,
        difficulty: 1
      }
    ]
  },
  // Aufgabe 4: Kufeln
  {
    id: "task4_kugeln",
       tasks: [
      {
        id: "task4_task_a",
        question: "a) \\(71+14+(-86)+(-52)=\\)",
        type: "scalar",
        answer: -53,
        difficulty: 1
      }
    ]
  },
  // Aufgabe 5: Martin
  {
    id: "task5_martin",
       tasks: [
      {
        id: "task5_task_a",
        question: "a) \\(71+14+(-86)+(-52)=\\)",
        type: "scalar",
        answer: -53,
        difficulty: 1
      }
    ]
  },
  // Aufgabe 6: Urne
  {
    id: "task6_urne",
       tasks: [
      {
        id: "task6_task_a",
        question: "a) \\(71+14+(-86)+(-52)=\\)",
        type: "scalar",
        answer: -53,
        difficulty: 1
      }
    ]
  },
  // Aufgabe 7: Skatkarten
  {
    id: "task7_skatkarten",
       tasks: [
      {
        id: "task7_task_a",
        question: "a) \\(71+14+(-86)+(-52)=\\)",
        type: "scalar",
        answer: -53,
        difficulty: 1
      }
    ]
  },
  // Aufgabe 8: Glücksrad Absolute Häufigkeit
  {
    id: "task8_gluecksrad",
       tasks: [
      {
        id: "task8_task_a",
        question: "a) \\(71+14+(-86)+(-52)=\\)",
        type: "scalar",
        answer: -53,
        difficulty: 1
      }
    ]
  },
  // Aufgabe 9: Baumdiagramm
  {
    id: "task9_baumdiagramm",
       tasks: [
      {
        id: "task9_task_a",
        question: "a) \\(71+14+(-86)+(-52)=\\)",
        type: "scalar",
        answer: -53,
        difficulty: 1
      }
    ]
  },
  // Aufgabe 10: Baumdiagramm 2
  {
    id: "task10_baumdiagramm",
       tasks: [
      {
        id: "task10_task_a",
        question: "a) \\(71+14+(-86)+(-52)=\\)",
        type: "scalar",
        answer: -53,
        difficulty: 1
      }
    ]
  },
  // Aufgabe 11: Urnen Baumdiagramm
  {
    id: "task11_urnen_baumdiagramm",
       tasks: [
      {
        id: "task11_task_a",
        question: "a) \\(71+14+(-86)+(-52)=\\)",
        type: "scalar",
        answer: -53,
        difficulty: 1
      }
    ]
  },
  // Aufgabe 12: Ereignisse
  {
    id: "task12_ereignisse",
       tasks: [
      {
        id: "task12_task_a",
        question: "a) \\(71+14+(-86)+(-52)=\\)",
        type: "scalar",
        answer: -53,
        difficulty: 1
      }
    ]
  },// Aufgabe 13: Laplace-Experiment
  {
    id: "task13_laplace_experiment",
       tasks: [
      {
        id: "task13_task_a",
        question: "a) \\(71+14+(-86)+(-52)=\\)",
        type: "scalar",
        answer: -53,
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