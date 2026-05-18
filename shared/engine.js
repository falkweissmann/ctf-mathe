const Engine = {
  state: {
    solved: {},     // { "levelId-taskId": true }
    answers: {}     // { "levelId-taskId": value }
  },

  storageKey: "ctf_state_v2",

  load() {
    try {
      const saved = localStorage.getItem(this.storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        this.state = {
          solved: parsed.solved || {},
          answers: parsed.answers || {}
        };
      }
    } catch (e) {
      console.error("Fehler beim Laden des Spielstands:", e);
      this.state = { solved: {}, answers: {} };
    }
  },

  save() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.state));
    } catch (e) {
      console.error("Fehler beim Speichern des Spielstands:", e);
    }
  },

  getTaskKey(levelIndex, taskIndex) {
    const level = levels[levelIndex];
    const task = level?.tasks[taskIndex];
    if (!task?.id) {
      // Fallback für Kompatibilität
      return `${levelIndex}-${taskIndex}`;
    }
    return task.id;
  },

  markSolved(levelIndex, taskIndex, value) {
    const key = this.getTaskKey(levelIndex, taskIndex);
    this.state.solved[key] = true;
    this.state.answers[key] = value;
    this.save();
    
    // Event für Fortschrittsaktualisierung
    this.dispatchEvent('taskSolved', { levelIndex, taskIndex, value });
  },

  isSolved(levelIndex, taskIndex) {
    const key = this.getTaskKey(levelIndex, taskIndex);
    return !!this.state.solved[key];
  },

  getAnswer(levelIndex, taskIndex) {
    const key = this.getTaskKey(levelIndex, taskIndex);
    return this.state.answers[key] ?? null;
  },

  resetLevel(levelIndex) {
    const level = levels[levelIndex];
    if (!level) return;

    level.tasks.forEach((task, taskIndex) => {
      const key = this.getTaskKey(levelIndex, taskIndex);
      delete this.state.solved[key];
      delete this.state.answers[key];
    });
    
    this.save();
    this.dispatchEvent('levelReset', levelIndex);
  },

  resetAll() {
    this.state = { solved: {}, answers: {} };
    this.save();
    this.dispatchEvent('allReset');
  },

  getProgress(levels) {
    let total = 0;
    let solved = 0;

    levels.forEach((level, levelIndex) => {
      level.tasks.forEach((_, taskIndex) => {
        total++;
        if (this.isSolved(levelIndex, taskIndex)) solved++;
      });
    });

    return total === 0 ? 0 : Math.round((solved / total) * 100);
  },

  getSolvedCount(levelIndex) {
    const level = levels[levelIndex];
    if (!level) return 0;
    
    return level.tasks.filter((_, taskIndex) => 
      this.isSolved(levelIndex, taskIndex)
    ).length;
  },

  // Event-System für lose Kopplung
  listeners: {},
  
  on(event, callback) {
    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event].push(callback);
  },
  
  dispatchEvent(event, data) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(callback => callback(data));
    }
  }
};

// Initialisierung
Engine.load();