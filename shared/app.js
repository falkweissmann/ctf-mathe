class CTFApp {
  constructor() {
    this.app = document.getElementById("app");
    this.currentLevel = 0;
    this.init();
  }

  init() {
    // Events registrieren
    Engine.on('taskSolved', () => this.onProgressUpdate());
    Engine.on('levelReset', () => this.onLevelReset());
    Engine.on('allReset', () => this.onAllReset());
    
    // Initial rendern
    this.renderLevel(0);
    this.renderNav();
    this.updateProgress();
  }

  renderLevel(index) {
    if (!levels[index]) return;
    
    this.currentLevel = index;
    this.app.innerHTML = "";
    
    // Level Header
    const header = this.createLevelHeader(index);
    this.app.appendChild(header);
    
    // Aufgaben rendern
    const level = levels[index];
    level.tasks.forEach((task, taskIndex) => {
      const taskElement = this.createTaskElement(index, taskIndex, task);
      this.app.appendChild(taskElement);
    });
    
    // Reset-Button
    const resetBtn = this.createResetButton(index);
    this.app.appendChild(resetBtn);
    
    this.updateProgress();
    this.checkLevelCompletion();
  }

  createLevelHeader(levelIndex) {
    const level = levels[levelIndex];
    const solvedCount = Engine.getSolvedCount(levelIndex);
    const totalCount = level.tasks.length;
    
    const header = document.createElement("div");
    header.className = "level-header";
    header.style.marginBottom = "20px";
    header.style.padding = "15px";
    header.style.background = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
    header.style.borderRadius = "10px";
    header.style.color = "white";
    
    const title = document.createElement("h2");
    title.textContent = level.title;
    title.style.margin = "0 0 10px 0";
    
    const progress = document.createElement("div");
    progress.className = "level-progress";
    progress.textContent = `Fortschritt: ${solvedCount}/${totalCount} Aufgaben gelöst`;
    progress.style.fontSize = "14px";
    progress.style.opacity = "0.9";
    
    header.appendChild(title);
    header.appendChild(progress);
    
    return header;
  }

createTaskElement(levelIndex, taskIndex, task) {
  const isSolved = Engine.isSolved(levelIndex, taskIndex);
  const savedAnswer = Engine.getAnswer(levelIndex, taskIndex);
  const difficulty = task.difficulty || 1;
  
  const div = document.createElement("div");
  div.className = `task ${isSolved ? 'solved' : ''}`;
  div.dataset.difficulty = difficulty;
  div.dataset.taskId = task.id || `${levelIndex}-${taskIndex}`;
  
  // Aufgaben-Container mit Flexbox für bessere Anordnung
  const content = document.createElement("div");
  content.className = "task-content";
  content.style.display = "flex";
  content.style.flexDirection = "column";
  content.style.gap = "10px";
  
  // Hilfsfunktion für LaTeX-Rendering in dynamischen Elementen
function renderLatexInElement(element) {
  if (typeof renderMathInElement !== 'undefined') {
    setTimeout(() => {
      renderMathInElement(element, {
        delimiters: [
          {left: '$$', right: '$$', display: true},
          {left: '\\[', right: '\\]', display: true},
          {left: '\\(', right: '\\)', display: false},
          {left: '\\\\[', right: '\\\\]', display: true}
        ],
        throwOnError: false
      });
    }, 10);
  }
}
  // Frage mit LaTeX-Unterstützung
  const question = document.createElement("div");
  question.className = "task-question";
  
  const questionText = document.createElement("div");
  questionText.innerHTML = `<strong>📝 ${task.question}</strong>`;
  question.appendChild(questionText);
  
  // LaTeX rendern
  setTimeout(() => {
    if (typeof renderMathInElement !== 'undefined') {
      renderMathInElement(question, {
        delimiters: [
          {left: '$$', right: '$$', display: true},
          {left: '\\[', right: '\\]', display: true},
          {left: '\\(', right: '\\)', display: false},
          {left: '\\\\[', right: '\\\\]', display: true}
        ],
        throwOnError: false
      });
    }
  }, 10);
  
  // Container für Frage und Eingabe (nebeneinander)
  const rowContainer = document.createElement("div");
  rowContainer.style.display = "flex";
  rowContainer.style.justifyContent = "space-between";
  rowContainer.style.alignItems = "center";
  rowContainer.style.flexWrap = "wrap";
  rowContainer.style.gap = "15px";
  
  // Linke Seite: Frage + Status
  const leftSide = document.createElement("div");
  leftSide.style.flex = "1";
  
  // Status NUR mit Schwierigkeitsgrad (kein "Offen" oder "X")
  const status = document.createElement("div");
  status.className = "task-status";
  status.style.display = "flex";
  status.style.alignItems = "center";
  status.style.gap = "8px";
  status.style.marginTop = "5px";
  
  if (!isSolved) {
    let difficultyText = "";
    let difficultyIcon = "";
    
    switch(difficulty) {
      case 1:
        difficultyText = "Brise";
        difficultyIcon = "🌊";
        break;
      case 2:
        difficultyText = "Wind";
        difficultyIcon = "💨";
        break;
      case 3:
        difficultyText = "Sturm";
        difficultyIcon = "🌪️";
        break;
      default:
        difficultyText = "Brise";
        difficultyIcon = "🌊";
    }
    
    status.innerHTML = `
      <span style="display: flex; align-items: center; gap: 5px;">
        <span style="display: flex; align-items: center; gap: 4px;">
          ${difficultyIcon} ${difficultyText}
        </span>
      </span>
    `;
    status.style.color = "#666";
  } else {
    status.innerHTML = '✅ Gelöst';
    status.style.color = '#2e7d32';
  }
  
  leftSide.appendChild(question);
  leftSide.appendChild(status);
  
  // Rechte Seite: Eingabefeld
  const rightSide = document.createElement("div");
  rightSide.style.minWidth = "200px";
  rightSide.style.textAlign = "right";
  
  const inputContainer = document.createElement("div");
  inputContainer.className = "task-input";
  
  const input = createInput(task.type, {
    task,
    onCorrect: (value) => {
      Engine.markSolved(levelIndex, taskIndex, value);
      this.markTaskSolved(div, levelIndex, taskIndex, value);
    },
    initialValue: isSolved ? savedAnswer : null,
    isSolved: isSolved
  });
  
  // Für verschiedene Input-Typen die Darstellung anpassen
if (task.type === "vector") {
  inputContainer.style.display = "flex";
  inputContainer.style.justifyContent = "flex-end";
} else if (task.type === "point") {
  inputContainer.style.display = "flex";
  inputContainer.style.justifyContent = "flex-end";
} else if (task.type === "analysis_form") {
  // analysis_form hat seinen eigenen Container, nichts zusätzliches
  inputContainer.style.width = "100%";
} else {
  input.style.width = "100%";
}
  
  inputContainer.appendChild(input);
  rightSide.appendChild(inputContainer);
  
  rowContainer.appendChild(leftSide);
  rowContainer.appendChild(rightSide);
  
   // Hint (nur für bestimmte Aufgaben)
if (task.hint && !isSolved) {
  const hint = document.createElement("div");
  hint.className = "task-hint";
  hint.innerHTML = `💡 Tipp: ${task.hint}`;
  hint.style.fontSize = "12px";
  hint.style.color = "#666";
  hint.style.marginTop = "5px";
  hint.style.fontStyle = "italic";
  
  // LaTeX im Hint rendern (wenn renderLatexInElement existiert)
  if (typeof renderLatexInElement !== 'undefined') {
    renderLatexInElement(hint);
  } else if (typeof renderMathInElement !== 'undefined') {
    // Fallback: direkter Aufruf
    setTimeout(() => {
      renderMathInElement(hint, {
        delimiters: [
          {left: '$$', right: '$$', display: true},
          {left: '\\[', right: '\\]', display: true},
          {left: '\\(', right: '\\)', display: false}
        ],
        throwOnError: false
      });
    }, 10);
  }
  
  content.appendChild(hint);
}
  
  content.appendChild(rowContainer);
  div.appendChild(content);
  
  // Wenn bereits gelöst, Belohnung anzeigen
  if (isSolved) {
    setTimeout(() => this.animateFlagsSolved(div, difficulty), 100);
  }
  
  return div;
}

  createFlagBox(count, className) {
    const flagBox = document.createElement("div");
    flagBox.className = className;
    flagBox.style.position = "absolute";
    flagBox.style.top = "10px";
    flagBox.style.right = "15px";
    
    for (let i = 0; i < count; i++) {
      const flag = document.createElement("span");
      flag.textContent = "🚩";
      flag.style.fontSize = "20px";
      flagBox.appendChild(flag);
    }
    
    return flagBox;
  }

animateFlagsSolved(taskEl, difficulty) {
  if (taskEl.classList.contains('flags-animated')) return;
  
  taskEl.classList.add('flags-animated');
  
  // Schwierigkeitsgrad als Text für die Belohnung
  let difficultyText = "";
  let difficultyIcon = "";
  let stealMessage = "";
  
  switch(difficulty) {
    case 3:
      difficultyText = "Sturm";
      difficultyIcon = "🌪️";
      stealMessage = "🏴‍☠️ Es dürfen DREI Flaggen von einer anderen Gruppe geklaut werden! 🏴‍☠️";
      break;
    case 2:
      difficultyText = "Wind";
      difficultyIcon = "💨";
      stealMessage = "🏴‍☠️ Es dürfen ZWEI Flaggen von einer anderen Gruppe geklaut werden! 🏴‍☠️";
      break;
    case 1:
      difficultyText = "Brise";
      difficultyIcon = "🌊";
      stealMessage = "🏴‍☠️ Es darf EINE Flagge von einer anderen Gruppe geklaut werden! 🏴‍☠️";
      break;
    default:
      difficultyText = "Keine";
      difficultyIcon = "❌";
      stealMessage = "🏴‍☠️ Keine Flaggen erhalten - mehr richtige Antworten benötigt! 🏴‍☠️";
  }
  
  // Nur Flaggen anzeigen, wenn mindestens 1 erreicht wurde
  if (difficulty >= 1) {
    const reward = document.createElement("div");
    reward.className = "flags-center";
    reward.style.textAlign = "center";
    reward.style.marginTop = "15px";
    reward.style.padding = "15px";
    reward.style.background = "linear-gradient(135deg, #667eea15 0%, #764ba215 100%)";
    reward.style.borderRadius = "8px";
    reward.style.animation = "fadeInUp 0.5s ease-out";
    
    // Flaggen für die erreichte Schwierigkeit
    for (let i = 0; i < difficulty; i++) {
      const flag = document.createElement("span");
      flag.textContent = "🚩";
      flag.style.fontSize = "28px";
      flag.style.display = "inline-block";
      flag.style.margin = "0 5px";
      flag.style.animation = `bounce 0.5s ease-out ${i * 0.1}s`;
      reward.appendChild(flag);
    }
    
    const rewardText = document.createElement("div");
    rewardText.innerHTML = `🎉 Aufgabe gelöst! (${difficultyIcon} ${difficultyText}) 🎉`;
    rewardText.style.fontSize = "14px";
    rewardText.style.marginTop = "8px";
    rewardText.style.marginBottom = "10px";
    rewardText.style.fontWeight = "bold";
    rewardText.style.color = "#2e7d32";
    reward.appendChild(rewardText);
    
    const stealText = document.createElement("div");
    stealText.innerHTML = stealMessage;
    stealText.style.fontSize = "12px";
    stealText.style.marginTop = "8px";
    stealText.style.padding = "8px";
    stealText.style.background = "#ffebee";
    stealText.style.borderRadius = "5px";
    stealText.style.color = "#c62828";
    stealText.style.fontWeight = "bold";
    stealText.style.border = "1px solid #ffcdd2";
    reward.appendChild(stealText);
    
    taskEl.appendChild(reward);
  } else {
    // Keine Flaggen - andere Nachricht
    const noFlagsMsg = document.createElement("div");
    noFlagsMsg.className = "flags-center";
    noFlagsMsg.style.textAlign = "center";
    noFlagsMsg.style.marginTop = "15px";
    noFlagsMsg.style.padding = "15px";
    noFlagsMsg.style.background = "linear-gradient(135deg, #ffebee15 0%, #ffcdd215 100%)";
    noFlagsMsg.style.borderRadius = "8px";
    noFlagsMsg.style.animation = "fadeInUp 0.5s ease-out";
    noFlagsMsg.innerHTML = `
      <div style="font-size:20px">❌ Keine Flaggen erhalten! ❌</div>
      <div style="font-size:12px; margin-top:8px">${stealMessage}</div>
    `;
    taskEl.appendChild(noFlagsMsg);
  }
}
 markTaskSolved(taskEl, levelIndex, taskIndex, value) {
  taskEl.classList.add("solved");
  
  // Eingabefelder deaktivieren
  taskEl.querySelectorAll("input, .vector-input input").forEach(input => {
    input.disabled = true;
    input.classList.add("solved-input");
  });
  
  // Status aktualisieren
  const statusEl = taskEl.querySelector(".task-status");
  if (statusEl) {
    statusEl.innerHTML = '✅ Gelöst';
    statusEl.style.color = '#2e7d32';
  }
  
  // ========== NEU: Dynamische Schwierigkeit aus Rückgabewert ==========
  // Prüfe, ob der zurückgegebene Wert ein Objekt mit difficulty ist
  let displayDifficulty = levels[levelIndex].tasks[taskIndex].difficulty || 1;
  
  if (value && typeof value === 'object') {
    // Wenn der Rückgabewert eine difficulty-Eigenschaft hat, verwende diese
    if (value.difficulty !== undefined) {
      displayDifficulty = value.difficulty;
    }
    // Wenn der Rückgabewert eine achievedDifficulty hat
    else if (value.achievedDifficulty !== undefined) {
      displayDifficulty = value.achievedDifficulty;
    }
    // Wenn der Rückgabewert eine flagCount hat
    else if (value.flagCount !== undefined) {
      displayDifficulty = value.flagCount;
    }
  }
  // Wenn der Rückgabewert direkt eine Zahl ist (0-3)
  else if (typeof value === 'number' && value >= 0 && value <= 3) {
    displayDifficulty = value;
  }
  
  // Belohnung mit dynamischer Schwierigkeit anzeigen
  this.animateFlagsSolved(taskEl, displayDifficulty);
  
  // Level-Fortschritt aktualisieren
  this.updateLevelProgress(levelIndex);
  this.checkLevelCompletion();
  this.renderNav();
}

  updateLevelProgress(levelIndex) {
    const levelHeader = document.querySelector(".level-header .level-progress");
    if (levelHeader) {
      const solvedCount = Engine.getSolvedCount(levelIndex);
      const totalCount = levels[levelIndex].tasks.length;
      levelHeader.textContent = `Fortschritt: ${solvedCount}/${totalCount} Aufgaben gelöst`;
    }
  }

  createResetButton(levelIndex) {
    const resetContainer = document.createElement("div");
    resetContainer.style.marginTop = "20px";
    resetContainer.style.textAlign = "center";
    
    const resetBtn = document.createElement("button");
    resetBtn.textContent = "🔄 Aufgabe zurücksetzen";
    resetBtn.style.padding = "10px 20px";
    resetBtn.style.fontSize = "16px";
    resetBtn.style.cursor = "pointer";
    resetBtn.style.background = "#f44336";
    resetBtn.style.color = "white";
    resetBtn.style.border = "none";
    resetBtn.style.borderRadius = "5px";
    resetBtn.style.transition = "transform 0.2s";
    
    resetBtn.onmouseenter = () => resetBtn.style.transform = "scale(1.05)";
    resetBtn.onmouseleave = () => resetBtn.style.transform = "scale(1)";
    
    resetBtn.onclick = () => {
      if (confirm("Möchten Sie dieses Level wirklich zurücksetzen? Alle Lösungen gehen verloren!")) {
        Engine.resetLevel(levelIndex);
        this.renderLevel(levelIndex);
      }
    };
    
    resetContainer.appendChild(resetBtn);
    return resetContainer;
  }

renderNav() {
  let nav = document.getElementById("nav");
  
  if (!nav) {
    nav = document.createElement("div");
    nav.id = "nav";
    document.body.insertBefore(nav, document.getElementById("app").nextSibling);
  }
  
  nav.innerHTML = "";
  
  const navContainer = document.createElement("div");
  navContainer.style.display = "flex";
  navContainer.style.gap = "10px";
  navContainer.style.flexWrap = "wrap";
  navContainer.style.justifyContent = "center";
  
  levels.forEach((level, i) => {
    const solvedCount = Engine.getSolvedCount(i);
    const totalCount = level.tasks.length;
    const isComplete = solvedCount === totalCount;
    
    // Automatische Nummerierung: i + 1
    const displayTitle = `Aufgabe ${i + 1}${level.title ? ` – ${level.title}` : ''}`;
    
    const btn = document.createElement("button");
    btn.textContent = isComplete ? `🏁 ${displayTitle}` : displayTitle;
    btn.style.padding = "10px 20px";
    btn.style.fontSize = "16px";
    btn.style.cursor = "pointer";
    btn.style.border = i === this.currentLevel ? "2px solid #667eea" : "1px solid #ddd";
    btn.style.background = isComplete ? "#4caf50" : (i === this.currentLevel ? "#667eea" : "#fff");
    btn.style.color = (isComplete || i === this.currentLevel) ? "white" : "#333";
    btn.style.borderRadius = "8px";
    btn.style.transition = "all 0.2s";
    
    btn.title = `${solvedCount}/${totalCount} Aufgaben gelöst`;
    
    btn.onclick = () => {
      this.currentLevel = i;
      this.renderLevel(i);
      this.renderNav();
    };
    
    navContainer.appendChild(btn);
  });
  
  // Globaler Reset Button
  const resetAllBtn = document.createElement("button");
  resetAllBtn.textContent = "🗑️ Alle Aufgaben zurücksetzen";
  resetAllBtn.style.padding = "10px 20px";
  resetAllBtn.style.fontSize = "16px";
  resetAllBtn.style.cursor = "pointer";
  resetAllBtn.style.background = "#ff9800";
  resetAllBtn.style.color = "white";
  resetAllBtn.style.border = "none";
  resetAllBtn.style.borderRadius = "8px";
  resetAllBtn.onclick = () => {
    if (confirm("Möchten Sie wirklich ALLE Aufgaben zurücksetzen? Alle Fortschritte gehen verloren!")) {
      Engine.resetAll();
      this.renderLevel(0);
      this.renderNav();
      this.updateProgress();
    }
  };
  
  navContainer.appendChild(resetAllBtn);
  nav.appendChild(navContainer);
}

createLevelHeader(levelIndex) {
  const level = levels[levelIndex];
  const solvedCount = Engine.getSolvedCount(levelIndex);
  const totalCount = level.tasks.length;
  
  const header = document.createElement("div");
  header.className = "level-header";
  header.style.marginBottom = "20px";
  header.style.padding = "15px";
  header.style.background = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
  header.style.borderRadius = "10px";
  header.style.color = "white";
  
  const title = document.createElement("h2");
  // Automatische Nummerierung: levelIndex + 1
  title.textContent = `Aufgabe ${levelIndex + 1}${level.title ? ` – ${level.title}` : ''}`;
  title.style.margin = "0 0 10px 0";
  
  const progress = document.createElement("div");
  progress.className = "level-progress";
  progress.textContent = `Fortschritt: ${solvedCount}/${totalCount} Teilaufgaben gelöst`;
  progress.style.fontSize = "14px";
  progress.style.opacity = "0.9";
  
  header.appendChild(title);
  header.appendChild(progress);
  
  return header;
}
  checkLevelCompletion() {
    const navButtons = document.querySelectorAll("#nav button");
    
    levels.forEach((level, i) => {
      const allSolved = level.tasks.every((_, t) => Engine.isSolved(i, t));
      const btn = navButtons[i];
      
      if (btn && allSolved) {
        if (!btn.textContent.includes("🏁")) {
          btn.textContent = "🏁 " + level.title;
          btn.style.background = "#4caf50";
          
          // Benachrichtigung für Level-Abschluss
          this.showNotification(`🎉 ${level.title} komplett gelöst! 🎉`);
        }
      }
    });
  }

updateProgress() {
  let progressBar = document.getElementById("global-progress");
  
  if (!progressBar) {
    progressBar = document.createElement("div");
    progressBar.id = "global-progress";
    progressBar.style.position = "fixed";
    progressBar.style.top = "10px";
    progressBar.style.right = "10px";
    progressBar.style.background = "white";
    progressBar.style.padding = "10px 14px";
    progressBar.style.borderRadius = "10px";
    progressBar.style.boxShadow = "0 2px 8px rgba(0,0,0,0.12)";
    progressBar.style.zIndex = "1000";
    progressBar.style.fontSize = "13px";
    progressBar.style.minWidth = "140px";
    document.body.appendChild(progressBar);
  }
  
  // Statistiken berechnen
  let easyTotal = 0, easySolved = 0;
  let mediumTotal = 0, mediumSolved = 0;
  let hardTotal = 0, hardSolved = 0;
  let totalFlags = 0, earnedFlags = 0;
  
  levels.forEach((level, levelIndex) => {
    level.tasks.forEach((task, taskIndex) => {
      const difficulty = task.difficulty || 1;
      totalFlags += difficulty;
      
      if (Engine.isSolved(levelIndex, taskIndex)) {
        earnedFlags += difficulty;
        if (difficulty === 1) easySolved++;
        else if (difficulty === 2) mediumSolved++;
        else if (difficulty === 3) hardSolved++;
      }
      
      if (difficulty === 1) easyTotal++;
      else if (difficulty === 2) mediumTotal++;
      else if (difficulty === 3) hardTotal++;
    });
  });
  
  progressBar.innerHTML = `
    <div style="display: flex; justify-content: space-between; gap: 12px; margin-bottom: 6px;">
      <span>🌊 Brise</span>
      <span><b>${easySolved}/${easyTotal}</b></span>
    </div>
    <div style="display: flex; justify-content: space-between; gap: 12px; margin-bottom: 6px;">
      <span>💨 Wind</span>
      <span><b>${mediumSolved}/${mediumTotal}</b></span>
    </div>
    <div style="display: flex; justify-content: space-between; gap: 12px; margin-bottom: 6px;">
      <span>🌪️ Sturm</span>
      <span><b>${hardSolved}/${hardTotal}</b></span>
    </div>
    <div style="display: flex; justify-content: space-between; gap: 12px; margin-top: 6px; padding-top: 6px; border-top: 1px solid #eee;">
      <span>🏴‍☠️ Flaggen</span>
      <span><b style="color:#667eea;">${earnedFlags}/${totalFlags}</b></span>
    </div>
  `;
}
  showNotification(message) {
    const notification = document.createElement("div");
    notification.textContent = message;
    notification.style.position = "fixed";
    notification.style.bottom = "20px";
    notification.style.right = "20px";
    notification.style.background = "#4caf50";
    notification.style.color = "white";
    notification.style.padding = "12px 20px";
    notification.style.borderRadius = "8px";
    notification.style.zIndex = "2000";
    notification.style.animation = "slideIn 0.3s ease-out";
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.animation = "slideOut 0.3s ease-out";
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }

  onProgressUpdate() {
    this.updateProgress();
    this.updateLevelProgress(this.currentLevel);
  }

  onLevelReset() {
    this.renderLevel(this.currentLevel);
  }

  onAllReset() {
    this.renderLevel(0);
    this.updateProgress();
  }
  
}

// CSS Animationen hinzufügen
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes bounce {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }
  
  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
  
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
  
  .task {
    background: white;
    padding: 20px;
    margin-bottom: 15px;
    border-radius: 10px;
    position: relative;
    transition: all 0.3s;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  
  .task.solved {
    background: linear-gradient(135deg, #f5f5f5 0%, #e8f5e9 100%);
    border-left: 4px solid #4caf50;
  }
  
  .task input {
    padding: 8px 12px;
    font-size: 16px;
    border: 2px solid #ddd;
    border-radius: 5px;
    transition: all 0.2s;
  }
  
  .task input:focus {
    outline: none;
    border-color: #667eea;
  }
  
  .task input.correct {
    border-color: #4caf50;
    background-color: #e8f5e9;
  }
  
  .task input.wrong {
    border-color: #f44336;
    background-color: #ffebee;
  }
  
  .task input.solved-input {
    background-color: #f5f5f5;
    color: #333;
    font-weight: 500;
    border-color: #ccc;
  }
  
  .vector-input input {
    width: 80px;
  }
  
  button {
    transition: all 0.2s;
  }
  
  button:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  }
  
  .flags-center {
    animation: fadeInUp 0.5s ease-out;
  }
   // Am Ende der style.textContent Definition
.task-content {
  width: 100%;
}

.task-input {
  display: flex;
  justify-content: flex-end;
}

/* Für Vektor-Eingaben (vertikal) */
.vector-input-vertical {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
}

.vector-input-vertical input {
  text-align: center;
}

/* Für Point-Eingaben (horizontal) */
.point-input-horizontal {
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
}

/* Für normale Scalar-Eingaben */
.task input[type="number"],
.task input[type="text"] {
  text-align: right;
  width: 150px;
} 
  // In der style.textContent Definition
.code-input button {
  background: #667eea;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.2s;
}

.code-input button:hover:not(:disabled) {
  transform: scale(1.05);
  background: #5a67d8;
}

.code-input button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.code-input input.correct {
  border-color: #4caf50;
  background-color: #e8f5e9;
}

.code-input input.wrong {
  border-color: #f44336;
  background-color: #ffebee;
}
`;

document.head.appendChild(style);

// App starten
const app = new CTFApp();
// Am Ende der app.js
setTimeout(() => {
  if (typeof renderMathInElement !== 'undefined') {
    renderMathInElement(document.body, {
      delimiters: [
        {left: '\\(', right: '\\)', display: false},
        {left: '\\[', right: '\\]', display: true}
      ]
    });
  }
}, 500);
// "Zurück zum Menü" Button hinzufügen
function addMenuBackButton() {
  // Nur anzeigen, wenn wir NICHT auf dem echten Hauptmenü sind
  const isMainMenu = window.location.pathname === "/index.html" || 
                     window.location.pathname === "/" ||
                     window.location.pathname === "/index.html";
  
  if (isMainMenu) {
    return; // Kein Button auf dem Menü
  }
  
  const backBtn = document.createElement("button");
  backBtn.textContent = "🏠 Hauptmenü";
  backBtn.style.position = "fixed";
  backBtn.style.top = "20px";           // ← von bottom zu top geändert
  backBtn.style.left = "20px";          // ← bleibt links
  backBtn.style.padding = "8px 16px";
  backBtn.style.background = "#4caf50"; // ← von #667eea zu grün geändert
  backBtn.style.color = "white";
  backBtn.style.border = "none";
  backBtn.style.borderRadius = "25px";
  backBtn.style.cursor = "pointer";
  backBtn.style.zIndex = "1000";
  backBtn.style.fontSize = "14px";
  backBtn.style.boxShadow = "0 2px 5px rgba(0,0,0,0.2)";
  backBtn.onclick = () => {
    window.location.href = "../index.html";  // ← führendes / entfernt!
  };
  document.body.appendChild(backBtn);
}

// Button hinzufügen
addMenuBackButton();
