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
        question: "a) \\(71+14+(-86)+(-52)=\\)",
        type: "scalar",
        answer: -53,
        difficulty: 1
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