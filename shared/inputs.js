const InputRegistry = {};

function registerInput(type, builder) {
  InputRegistry[type] = builder;
}

function createInput(type, config) {
  const builder = InputRegistry[type];

  if (!builder) {
    console.warn("Unbekannter Input-Typ:", type);
    return document.createElement("div");
  }

  return builder(config);
}
// --------------------
// NUMBER_ORDERING_DRAG - Zahlen per Drag & Drop ordnen
// --------------------
registerInput("number_ordering_drag", ({ task, onCorrect, initialValue, isSolved }) => {
  const container = document.createElement("div");
  container.className = "number-ordering-drag";
  container.style.display = "flex";
  container.style.flexDirection = "column";
  container.style.gap = "16px";
  container.style.marginTop = "10px";
  container.style.padding = "15px";
  container.style.background = "#f9f9f9";
  container.style.borderRadius = "12px";
  container.style.border = "1px solid #e0e0e0";

  const expectedValues = [...task.answer.values];
  const ordering = task.answer.ordering || "asc";

  // Initiale gemischte Reihenfolge
  let shuffledNumbers = [...expectedValues];
  if (!isSolved && (!initialValue || initialValue.length === 0)) {
    for (let i = shuffledNumbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledNumbers[i], shuffledNumbers[j]] = [shuffledNumbers[j], shuffledNumbers[i]];
    }
  } else if (initialValue && initialValue.length > 0) {
    shuffledNumbers = [...initialValue];
  }

  // Kopfzeile
  const instruction = document.createElement("div");
  instruction.style.fontSize = "14px";
  instruction.style.fontWeight = "bold";
  instruction.style.color = "#333";
  instruction.style.textAlign = "center";
  instruction.style.padding = "8px";
  instruction.style.background = "#e8f0fe";
  instruction.style.borderRadius = "8px";
  instruction.style.marginBottom = "10px";
  
  if (ordering === "asc") {
    instruction.innerHTML = "🎯 Ziehe die Zahlen in die richtige Reihenfolge!";
  } else {
    instruction.innerHTML = "🎯 Ziehe die Zahlen in die richtige Reihenfolge!";
  }
  container.appendChild(instruction);

  // Container für die sortierbaren Elemente (eine Zeile)
  const sortableContainer = document.createElement("div");
  sortableContainer.className = "sortable-container";
  sortableContainer.style.display = "flex";
  sortableContainer.style.flexDirection = "row";  // ← Eine Zeile
  sortableContainer.style.flexWrap = "wrap";      // ← Umbrechen bei zu kleinen Bildschirmen
  sortableContainer.style.justifyContent = "center";
  sortableContainer.style.alignItems = "center";
  sortableContainer.style.gap = "8px";
  sortableContainer.style.padding = "15px";
  sortableContainer.style.background = "white";
  sortableContainer.style.borderRadius = "10px";
  sortableContainer.style.border = "2px solid #e0e0e0";
  sortableContainer.style.minHeight = "80px";

  const orderSymbol = ordering === "asc" ? "<" : ">";

  // Drag & Drop Funktionalität
  let draggedItem = null;
  let draggedItemParent = null;

  // Erstelle die sortierbaren Karten
  function renderItems(numbers) {
    sortableContainer.innerHTML = "";
    
    numbers.forEach((num, index) => {
      // Karte erstellen
      const card = document.createElement("div");
      card.className = "sortable-card";
      card.setAttribute("data-value", num);
      card.setAttribute("data-index", index);
      card.setAttribute("draggable", !isSolved);
      card.style.background = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
      card.style.color = "white";
      card.style.padding = "12px 20px";
      card.style.borderRadius = "12px";
      card.style.fontSize = "18px";
      card.style.fontWeight = "bold";
      card.style.cursor = isSolved ? "default" : "grab";
      card.style.textAlign = "center";
      card.style.minWidth = "60px";
      card.style.boxShadow = "0 2px 8px rgba(0,0,0,0.15)";
      card.style.transition = "transform 0.2s, opacity 0.2s";
      card.style.userSelect = "none";
      card.textContent = num;
      
      if (!isSolved) {
        card.addEventListener("dragstart", (e) => {
          draggedItem = card;
          draggedItemParent = card.parentElement;
          e.dataTransfer.setData("text/plain", num);
          card.style.opacity = "0.5";
          e.dataTransfer.effectAllowed = "move";
        });
        
        card.addEventListener("dragend", () => {
          if (draggedItem) {
            draggedItem.style.opacity = "1";
          }
          draggedItem = null;
          draggedItemParent = null;
        });
        
        card.addEventListener("dragover", (e) => {
          e.preventDefault();
          e.dataTransfer.dropEffect = "move";
          card.style.transform = "scale(1.05)";
          card.style.boxShadow = "0 4px 12px rgba(0,0,0,0.25)";
        });
        
        card.addEventListener("dragleave", () => {
          card.style.transform = "scale(1)";
          card.style.boxShadow = "0 2px 8px rgba(0,0,0,0.15)";
        });
        
        card.addEventListener("drop", (e) => {
          e.preventDefault();
          card.style.transform = "scale(1)";
          card.style.boxShadow = "0 2px 8px rgba(0,0,0,0.15)";
          
          if (!draggedItem || draggedItem === card) return;
          
          // Tausche die Positionen (swap, nicht verschieben)
          const newNumbers = [...numbers];
          const fromValue = parseInt(draggedItem.getAttribute("data-value"));
          const toValue = parseInt(card.getAttribute("data-value"));
          
          const fromIndex = newNumbers.indexOf(fromValue);
          const toIndex = newNumbers.indexOf(toValue);
          
          if (fromIndex !== -1 && toIndex !== -1 && fromIndex !== toIndex) {
            // Swap: Nur die beiden Zahlen tauschen
            [newNumbers[fromIndex], newNumbers[toIndex]] = [newNumbers[toIndex], newNumbers[fromIndex]];
            renderItems(newNumbers);
          }
        });
      }
      
      sortableContainer.appendChild(card);
      
      // Ordnungszeichen nach der Karte (außer nach der letzten)
      if (index < numbers.length - 1) {
        const symbolSpan = document.createElement("span");
        symbolSpan.textContent = orderSymbol;
        symbolSpan.style.fontSize = "24px";
        symbolSpan.style.fontWeight = "bold";
        symbolSpan.style.color = "#4caf50";
        symbolSpan.style.margin = "0 4px";
        symbolSpan.style.userSelect = "none";
        sortableContainer.appendChild(symbolSpan);
      }
    });
  }

  // Reihenfolge prüfen
  function checkOrdering(currentNumbers) {
    let isCorrect = true;
    const tolerance = 0.01;
    
    if (ordering === "asc") {
      for (let i = 0; i < currentNumbers.length - 1; i++) {
        if (currentNumbers[i] >= currentNumbers[i + 1] - tolerance) {
          isCorrect = false;
          break;
        }
      }
      // Prüfen ob alle Zahlen da sind (Menge)
      const userSorted = [...currentNumbers].sort((a, b) => a - b);
      const expectedSorted = [...expectedValues].sort((a, b) => a - b);
      for (let i = 0; i < expectedValues.length; i++) {
        if (Math.abs(userSorted[i] - expectedSorted[i]) > tolerance) {
          isCorrect = false;
          break;
        }
      }
    } else {
      for (let i = 0; i < currentNumbers.length - 1; i++) {
        if (currentNumbers[i] <= currentNumbers[i + 1] + tolerance) {
          isCorrect = false;
          break;
        }
      }
      const userSorted = [...currentNumbers].sort((a, b) => b - a);
      const expectedSorted = [...expectedValues].sort((a, b) => b - a);
      for (let i = 0; i < expectedValues.length; i++) {
        if (Math.abs(userSorted[i] - expectedSorted[i]) > tolerance) {
          isCorrect = false;
          break;
        }
      }
    }
    
    return isCorrect;
  }

  // Button und Feedback
  const buttonContainer = document.createElement("div");
  buttonContainer.style.display = "flex";
  buttonContainer.style.gap = "10px";
  buttonContainer.style.justifyContent = "center";
  buttonContainer.style.marginTop = "10px";

  const feedbackDiv = document.createElement("div");
  feedbackDiv.style.fontSize = "13px";
  feedbackDiv.style.textAlign = "center";
  feedbackDiv.style.padding = "8px";
  feedbackDiv.style.borderRadius = "8px";
  feedbackDiv.style.marginTop = "10px";

  const checkButton = document.createElement("button");
  checkButton.textContent = "✓ Reihenfolge prüfen";
  checkButton.style.padding = "10px 24px";
  checkButton.style.fontSize = "14px";
  checkButton.style.fontWeight = "bold";
  checkButton.style.cursor = "pointer";
  checkButton.style.background = "#667eea";
  checkButton.style.color = "white";
  checkButton.style.border = "none";
  checkButton.style.borderRadius = "25px";
  checkButton.style.transition = "all 0.2s";

  const resetButton = document.createElement("button");
  resetButton.textContent = "🔄 Mischen";
  resetButton.style.padding = "10px 24px";
  resetButton.style.fontSize = "14px";
  resetButton.style.fontWeight = "bold";
  resetButton.style.cursor = "pointer";
  resetButton.style.background = "#ff9800";
  resetButton.style.color = "white";
  resetButton.style.border = "none";
  resetButton.style.borderRadius = "25px";
  resetButton.style.transition = "all 0.2s";

  // Nach dem Lösen einer Aufgabe: Alle weiteren Aufgaben sollen noch ziehbar sein
  // Das Problem war, dass isSolved global für die Aufgabe gilt, nicht für einzelne Karten
  // Wir müssen den Button deaktivieren, aber nicht die Drag-Funktionalität anderer Aufgaben
  
  if (isSolved) {
    checkButton.disabled = true;
    checkButton.style.background = "#4caf50";
    checkButton.textContent = "✓ Gelöst";
    resetButton.disabled = true;
    resetButton.style.opacity = "0.5";
    // Karten nicht mehr dragbar machen
    const cards = sortableContainer.querySelectorAll(".sortable-card");
    cards.forEach(card => {
      card.setAttribute("draggable", false);
      card.style.cursor = "default";
    });
  }

  resetButton.onclick = () => {
    if (isSolved) return;
    const newShuffled = [...expectedValues];
    for (let i = newShuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newShuffled[i], newShuffled[j]] = [newShuffled[j], newShuffled[i]];
    }
    renderItems(newShuffled);
    feedbackDiv.innerHTML = "";
    feedbackDiv.style.background = "";
  };

  checkButton.onclick = () => {
    if (isSolved) return;
    
    const currentNumbers = [];
    const cards = sortableContainer.querySelectorAll(".sortable-card");
    cards.forEach(card => {
      currentNumbers.push(parseInt(card.getAttribute("data-value")));
    });
    
    const isCorrect = checkOrdering(currentNumbers);
    
    if (isCorrect) {
      feedbackDiv.innerHTML = "✅ Richtig! Die Reihenfolge ist korrekt! 🎉";
      feedbackDiv.style.background = "#e8f5e9";
      feedbackDiv.style.color = "#2e7d32";
      checkButton.disabled = true;
      checkButton.style.background = "#4caf50";
      checkButton.textContent = "✓ Gelöst";
      resetButton.disabled = true;
      resetButton.style.opacity = "0.5";
      
      // Karten nicht mehr dragbar machen
      const cards = sortableContainer.querySelectorAll(".sortable-card");
      cards.forEach(card => {
        card.setAttribute("draggable", false);
        card.style.cursor = "default";
      });
      
      onCorrect(currentNumbers);
    } else {
      feedbackDiv.innerHTML = "❌ Falsche Reihenfolge! Versuche es noch einmal.";
      feedbackDiv.style.background = "#ffebee";
      feedbackDiv.style.color = "#c62828";
      
      setTimeout(() => {
        if (!isSolved) {
          feedbackDiv.innerHTML = "";
          feedbackDiv.style.background = "";
        }
      }, 2000);
    }
  };

  buttonContainer.appendChild(resetButton);
  buttonContainer.appendChild(checkButton);
  
  container.appendChild(sortableContainer);
  container.appendChild(buttonContainer);
  container.appendChild(feedbackDiv);

  // Initial rendern
  renderItems(shuffledNumbers);
  
  return container;
});
// --------------------
// GRID_FILL - Gitter ausfüllen (additiv oder multiplikativ)
// Nur Vergleich der eingegebenen Werte mit der Lösung
// --------------------
registerInput("grid_fill", ({ task, onCorrect, initialValue, isSolved }) => {
  const container = document.createElement("div");
  container.className = "grid-fill-input";
  container.style.display = "flex";
  container.style.flexDirection = "column";
  container.style.alignItems = "center";
  container.style.gap = "16px";
  container.style.marginTop = "10px";
  container.style.padding = "20px";
  container.style.background = "#f9f9f9";
  container.style.borderRadius = "12px";
  container.style.border = "1px solid #e0e0e0";

  // Lösungswerte (3x3 Array)
  const solutionValues = task.answer.values;
  
  // Vorgegebene Startwerte (aus der question)
  const givenValues = task.given || task.questionGrid || solutionValues.map(row => [...row]);
  
  // Gitter-Größe (default 3x3, kann aber auch 2x2, 4x4 etc. sein)
  const size = task.size || 3;
  
  // Operation für Feedback (optional, nur für Anzeige)
  const operation = task.operation || "additiv"; // "additiv" oder "multiplikativ"
  
  // Speicher für die Eingabefelder
  const inputs = [];

  // Kopfzeile mit Erklärung
  const instruction = document.createElement("div");
  instruction.style.fontSize = "14px";
  instruction.style.fontWeight = "bold";
  instruction.style.color = "#333";
  instruction.style.textAlign = "center";
  instruction.style.padding = "8px";
  instruction.style.background = "#e8f0fe";
  instruction.style.borderRadius = "8px";
  instruction.style.marginBottom = "10px";
  
  if (operation === "multiplikativ") {
    instruction.innerHTML = "✖️ Fülle die leeren Felder aus (multiplikatives Viereck)";
  } else {
    instruction.innerHTML = "➕ Fülle die leeren Felder aus (additives Viereck)";
  }
  container.appendChild(instruction);

  // Tabelle für das Gitter
  const table = document.createElement("table");
  table.style.borderCollapse = "collapse";
  table.style.margin = "0 auto";
  table.style.backgroundColor = "white";
  table.style.borderRadius = "8px";
  table.style.overflow = "hidden";
  table.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";

  // Initiale Werte aus saved data laden
  let savedValues = null;
  if (initialValue && Array.isArray(initialValue)) {
    savedValues = initialValue;
  }

  // Erstelle das Gitter
  for (let row = 0; row < size; row++) {
    const tr = document.createElement("tr");
    
    for (let col = 0; col < size; col++) {
      const td = document.createElement("td");
      td.style.border = "1px solid #ddd";
      td.style.padding = "12px";
      td.style.textAlign = "center";
      td.style.verticalAlign = "middle";
      td.style.minWidth = "70px";
      td.style.minHeight = "70px";

      const givenValue = givenValues[row]?.[col];
      const solutionValue = solutionValues[row]?.[col];
      
      // Prüfen ob das Feld ein Eingabefeld ist
      const isEmpty = givenValue === null || 
                      givenValue === undefined || 
                      givenValue === "leer" || 
                      givenValue === "" ||
                      (typeof givenValue === "string" && givenValue.toLowerCase() === "leer");
      
      if (!isEmpty && !isSolved) {
        // Vorgegebene Zahl (nur anzeigen, nicht editierbar)
        const displaySpan = document.createElement("span");
        displaySpan.textContent = givenValue;
        displaySpan.style.fontSize = "20px";
        displaySpan.style.fontWeight = "bold";
        displaySpan.style.color = "#333";
        td.appendChild(displaySpan);
        td.style.backgroundColor = "#e8f0fe";
        inputs.push(null);
        
      } else if (isSolved) {
        // Gelöste Aufgabe: Zeige die Lösung an
        const displaySpan = document.createElement("span");
        displaySpan.textContent = solutionValue;
        displaySpan.style.fontSize = "20px";
        displaySpan.style.fontWeight = "bold";
        displaySpan.style.color = "#2e7d32";
        displaySpan.style.backgroundColor = "#e8f5e9";
        displaySpan.style.padding = "8px 12px";
        displaySpan.style.borderRadius = "6px";
        td.appendChild(displaySpan);
        td.style.backgroundColor = "#f5f5f5";
        inputs.push(null);
        
      } else {
        // Eingabefeld für leere Zelle
        const input = document.createElement("input");
        input.type = "number";
        input.step = "any";
        input.style.width = "60px";
        input.style.padding = "8px";
        input.style.fontSize = "16px";
        input.style.textAlign = "center";
        input.style.borderRadius = "6px";
        input.style.border = "2px solid #ddd";
        
        // Gespeicherten Wert laden
        if (savedValues && savedValues[row] && savedValues[row][col] !== undefined) {
          input.value = savedValues[row][col];
        }
        
        td.appendChild(input);
        td.style.backgroundColor = "#fff";
        inputs.push({ input, row, col });
      }
      
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
  
  container.appendChild(table);

  // Aktuelle Werte auslesen
  function getCurrentValues() {
    const values = Array(size).fill().map(() => Array(size).fill(null));
    
    for (const item of inputs) {
      if (item && item.input) {
        const val = parseFloat(item.input.value);
        if (!isNaN(val)) {
          values[item.row][item.col] = val;
        }
      }
    }
    
    // Vorgegebene Werte übernehmen
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        const givenValue = givenValues[row]?.[col];
        const isEmpty = givenValue === null || 
                        givenValue === undefined || 
                        givenValue === "leer" || 
                        givenValue === "" ||
                        (typeof givenValue === "string" && givenValue.toLowerCase() === "leer");
        if (!isEmpty && values[row][col] === null) {
          values[row][col] = givenValue;
        }
      }
    }
    
    return values;
  }

  // Prüfen ob die eingegebenen Werte mit der Lösung übereinstimmen
  function validateGrid() {
    const currentValues = getCurrentValues();
    let filledCount = 0;
    let correctCount = 0;
    
    // Nur die Eingabefelder prüfen (wo das Feld leer war)
    for (const item of inputs) {
      if (item && item.input) {
        filledCount++;
        const userValue = currentValues[item.row][item.col];
        const expectedValue = solutionValues[item.row]?.[item.col];
        
        if (userValue !== null && !isNaN(userValue) && Math.abs(userValue - expectedValue) < 0.01) {
          correctCount++;
        }
      }
    }
    
    const allFilled = filledCount > 0 && filledCount === correctCount;
    const wrongCount = filledCount - correctCount;
    
    return { allCorrect: allFilled, correctCount, wrongCount, filledCount };
  }

  // Button und Feedback
  const buttonContainer = document.createElement("div");
  buttonContainer.style.display = "flex";
  buttonContainer.style.gap = "10px";
  buttonContainer.style.justifyContent = "center";
  buttonContainer.style.marginTop = "15px";

  const feedbackDiv = document.createElement("div");
  feedbackDiv.style.fontSize = "13px";
  feedbackDiv.style.textAlign = "center";
  feedbackDiv.style.padding = "8px";
  feedbackDiv.style.borderRadius = "8px";
  feedbackDiv.style.marginTop = "10px";

  const checkButton = document.createElement("button");
  checkButton.textContent = "✓ Prüfen";
  checkButton.style.padding = "10px 24px";
  checkButton.style.fontSize = "14px";
  checkButton.style.fontWeight = "bold";
  checkButton.style.cursor = "pointer";
  checkButton.style.background = "#667eea";
  checkButton.style.color = "white";
  checkButton.style.border = "none";
  checkButton.style.borderRadius = "25px";
  checkButton.style.transition = "all 0.2s";

  const resetButton = document.createElement("button");
  resetButton.textContent = "🔄 Zurücksetzen";
  resetButton.style.padding = "10px 24px";
  resetButton.style.fontSize = "14px";
  resetButton.style.fontWeight = "bold";
  resetButton.style.cursor = "pointer";
  resetButton.style.background = "#ff9800";
  resetButton.style.color = "white";
  resetButton.style.border = "none";
  resetButton.style.borderRadius = "25px";
  resetButton.style.transition = "all 0.2s";

  if (isSolved) {
    checkButton.disabled = true;
    checkButton.style.background = "#4caf50";
    checkButton.textContent = "✓ Gelöst";
    resetButton.disabled = true;
    resetButton.style.opacity = "0.5";
  }

  // Reset-Funktion
  resetButton.onclick = () => {
    if (isSolved) return;
    for (const item of inputs) {
      if (item && item.input) {
        item.input.value = "";
        item.input.classList.remove("correct", "wrong");
      }
    }
    feedbackDiv.innerHTML = "";
    feedbackDiv.style.background = "";
  };

  // Prüf-Funktion
  checkButton.onclick = () => {
    if (isSolved) return;
    
    const result = validateGrid();
    
    if (result.allCorrect && result.filledCount > 0) {
      feedbackDiv.innerHTML = `✅ Richtig! 🎉`;
      feedbackDiv.style.background = "#e8f5e9";
      feedbackDiv.style.color = "#2e7d32";
      
      // Alle Eingabefelder als korrekt markieren und deaktivieren
      for (const item of inputs) {
        if (item && item.input) {
          item.input.classList.add("correct");
          item.input.disabled = true;
        }
      }
      
      checkButton.disabled = true;
      checkButton.style.background = "#4caf50";
      checkButton.textContent = "✓ Gelöst";
      resetButton.disabled = true;
      resetButton.style.opacity = "0.5";
      
      // Speichern der Lösung
      const solutionArray = getCurrentValues();
      onCorrect(solutionArray);
      
    } else if (result.filledCount === 0) {
      feedbackDiv.innerHTML = `⚠️ Bitte fülle die leeren Felder aus!`;
      feedbackDiv.style.background = "#fff3e0";
      feedbackDiv.style.color = "#ff9800";
      
    } else {
      const wrongCount = result.wrongCount;
      if (wrongCount === 1) {
        feedbackDiv.innerHTML = `❌ 1 Feld ist falsch. Versuche es noch einmal!`;
      } else {
        feedbackDiv.innerHTML = `❌ ${wrongCount} Felder sind falsch. Versuche es noch einmal!`;
      }
      feedbackDiv.style.background = "#ffebee";
      feedbackDiv.style.color = "#c62828";
      
      // Markiere die falschen Eingabefelder
      const currentValues = getCurrentValues();
      for (const item of inputs) {
        if (item && item.input) {
          const userValue = currentValues[item.row][item.col];
          const expectedValue = solutionValues[item.row]?.[item.col];
          
          if (userValue !== null && !isNaN(userValue) && Math.abs(userValue - expectedValue) < 0.01) {
            item.input.classList.add("correct");
            item.input.classList.remove("wrong");
          } else if (item.input.value !== "") {
            item.input.classList.add("wrong");
            item.input.classList.remove("correct");
          } else {
            item.input.classList.remove("correct", "wrong");
          }
        }
      }
      
      // Nach 2 Sekunden die Fehlermarkierung entfernen
      setTimeout(() => {
        if (!isSolved) {
          for (const item of inputs) {
            if (item && item.input) {
              item.input.classList.remove("wrong");
            }
          }
        }
      }, 2000);
    }
  };

  buttonContainer.appendChild(resetButton);
  buttonContainer.appendChild(checkButton);
  container.appendChild(buttonContainer);
  container.appendChild(feedbackDiv);

  return container;
});
// --------------------
// SCALAR - Für Zahlen, Brüche und Listen (mit Bruch-Unterstützung)
// Erkennt: 3/15, 1/2, -3/4, 0.75, -67, 42
// --------------------
registerInput("scalar", ({ task, onCorrect, initialValue, isSolved }) => {
  const container = document.createElement("div");
  container.style.display = "flex";
  container.style.flexDirection = "column";
  container.style.gap = "5px";
  container.style.alignItems = "flex-end";

  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "z.B. 3/15, 0.2, -67, 42";
  input.style.width = "200px";
  input.style.padding = "8px";
  input.style.fontSize = "16px";
  input.style.textAlign = "right";

  if (initialValue) {
    input.value = initialValue;
  }

  if (isSolved) {
    input.disabled = true;
    input.classList.add("solved-input");
  }

  // Hilfsfunktion: Bruch in Dezimalzahl umwandeln
  function parseFraction(value) {
    if (typeof value !== 'string') return value;
    
    const trimmed = value.trim();
    
    // Prüfen ob es ein Bruch ist (enthält /)
    if (trimmed.includes('/')) {
      const parts = trimmed.split('/');
      if (parts.length === 2) {
        const numerator = parseFloat(parts[0].trim());
        const denominator = parseFloat(parts[1].trim());
        if (!isNaN(numerator) && !isNaN(denominator) && denominator !== 0) {
          return numerator / denominator;
        }
      }
    }
    
    // Kein Bruch, normale Zahl
    return parseFloat(trimmed.replace(",", "."));
  }

  // Hilfsfunktion: Wert in standardisierte Form für Vergleich
  function normalizeValue(value) {
    if (typeof value === 'number') return value;
    if (typeof value === 'string') {
      // Bruch parsen
      if (value.includes('/')) {
        const parts = value.split('/');
        if (parts.length === 2) {
          const numerator = parseFloat(parts[0].trim());
          const denominator = parseFloat(parts[1].trim());
          if (!isNaN(numerator) && !isNaN(denominator) && denominator !== 0) {
            return numerator / denominator;
          }
        }
      }
      // Dezimalzahl mit Komma
      return parseFloat(value.replace(",", "."));
    }
    return NaN;
  }

  const validateInput = () => {
    if (input.disabled) return;

    const rawValue = input.value.trim();
    if (rawValue === "") {
      input.classList.remove("correct", "wrong");
      return;
    }

    // Erwartete Antworten (können Zahlen oder Brüche als Strings sein)
    let expectedAnswers = [];
    if (Array.isArray(task.answer)) {
      expectedAnswers = [...task.answer];
    } else {
      expectedAnswers = [task.answer];
    }
    
    // Normalisiere erwartete Antworten (wandle Brüche in Dezimalzahlen um)
    const normalizedExpected = expectedAnswers.map(ans => normalizeValue(ans)).sort((a, b) => a - b);
    
    // Benutzerantwort parsen
    let userAnswers = [];
    const parts = rawValue.split(",");
    for (const part of parts) {
      const trimmed = part.trim();
      const num = parseFraction(trimmed);
      if (!isNaN(num)) {
        userAnswers.push(num);
      }
    }
    userAnswers.sort((a, b) => a - b);

    let allCorrect = false;
    
    if (userAnswers.length === normalizedExpected.length && normalizedExpected.length > 0) {
      allCorrect = true;
      const tolerance = task.tolerance || 0.001;
      
      for (let i = 0; i < normalizedExpected.length; i++) {
        if (Math.abs(userAnswers[i] - normalizedExpected[i]) >= tolerance) {
          allCorrect = false;
          break;
        }
      }
    } else if (normalizedExpected.length === 0 && userAnswers.length === 0) {
      allCorrect = true;
    }

    if (allCorrect) {
      input.classList.add("correct");
      input.classList.remove("wrong");
      input.disabled = true;
      
      // Speichere die originale Eingabe (nicht die umgewandelte)
      onCorrect(rawValue);
    } else {
      input.classList.add("wrong");
      input.classList.remove("correct");
    }
  };

  input.addEventListener("input", validateInput);
  input.addEventListener("change", validateInput);

  container.appendChild(input);
  return container;
});
// --------------------
// VECTOR - Mit Prüf-Button (Anzeige wie viele falsch sind)
// --------------------
registerInput("vector", ({ task, onCorrect, initialValue, isSolved }) => {
  const container = document.createElement("div");
  container.className = "vector-input-vertical";
  container.style.display = "flex";
  container.style.flexDirection = "column";
  container.style.gap = "12px";
  container.style.marginTop = "10px";
  container.style.padding = "10px";
  container.style.background = "#f9f9f9";
  container.style.borderRadius = "8px";
  container.style.border = "1px solid #e0e0e0";

  const inputs = [];
  const expectedValues = task.answer.values;
  const dimension = expectedValues.length;

  const subscripts = ["₁", "₂", "₃", "₄", "₅", "₆", "₇", "₈", "₉", "₁₀"];
  const placeholders = [];
  for (let i = 1; i <= dimension; i++) {
    placeholders.push(`x${subscripts[i-1]}`);
  }

  const inputsContainer = document.createElement("div");
  inputsContainer.style.display = "flex";
  inputsContainer.style.flexDirection = "column";
  inputsContainer.style.gap = "8px";
  inputsContainer.style.alignItems = "flex-end";

  let initialValues = [];
  if (initialValue && Array.isArray(initialValue)) {
    initialValues = initialValue;
  } else if (initialValue && typeof initialValue === 'object' && initialValue.values) {
    initialValues = initialValue.values;
  }

  expectedValues.forEach((expected, idx) => {
    const wrapper = document.createElement("div");
    wrapper.style.display = "flex";
    wrapper.style.alignItems = "center";
    wrapper.style.gap = "10px";

    const input = document.createElement("input");
    input.type = "number";
    input.placeholder = placeholders[idx];
    input.step = "any";
    input.style.width = "80px";
    input.style.padding = "8px";
    input.style.fontSize = "16px";
    input.style.textAlign = "center";

    if (initialValues[idx] !== undefined && initialValues[idx] !== null) {
      input.value = initialValues[idx];
    }

    if (isSolved) {
      input.disabled = true;
      input.classList.add("solved-input");
    }

    wrapper.appendChild(input);
    inputsContainer.appendChild(wrapper);
    inputs.push(input);
  });

  const bottomContainer = document.createElement("div");
  bottomContainer.style.display = "flex";
  bottomContainer.style.justifyContent = "space-between";
  bottomContainer.style.alignItems = "center";
  bottomContainer.style.marginTop = "8px";
  bottomContainer.style.gap = "10px";

  const feedbackDiv = document.createElement("div");
  feedbackDiv.style.fontSize = "11px";
  feedbackDiv.style.color = "#666";
  feedbackDiv.style.flex = "1";
  feedbackDiv.style.textAlign = "left";

  const checkButton = document.createElement("button");
  checkButton.textContent = "✓ Prüfen";
  checkButton.style.padding = "5px 15px";
  checkButton.style.fontSize = "13px";
  checkButton.style.cursor = "pointer";
  checkButton.style.background = "#667eea";
  checkButton.style.color = "white";
  checkButton.style.border = "none";
  checkButton.style.borderRadius = "4px";
  checkButton.style.transition = "all 0.2s";

  checkButton.onmouseenter = () => checkButton.style.transform = "scale(1.02)";
  checkButton.onmouseleave = () => checkButton.style.transform = "scale(1)";

  bottomContainer.appendChild(feedbackDiv);
  bottomContainer.appendChild(checkButton);

  container.appendChild(inputsContainer);
  container.appendChild(bottomContainer);

  const validate = () => {
    if (isSolved) return;

    const values = inputs.map(input => {
      const val = parseFloat(input.value);
      return isNaN(val) ? null : val;
    });

    const allFilled = values.every(v => v !== null);
    
    if (!allFilled) {
      feedbackDiv.innerHTML = "⚠️ Bitte alle Felder ausfüllen";
      feedbackDiv.style.color = "#ff9800";
      return;
    }

    let correctCount = 0;
    const tolerance = task.tolerance || 0.001;
    
    for (let i = 0; i < dimension; i++) {
      if (Math.abs(values[i] - expectedValues[i]) < tolerance) {
        correctCount++;
      }
    }

    const wrongCount = dimension - correctCount;
    const allCorrect = (wrongCount === 0);

    if (allCorrect) {
      feedbackDiv.innerHTML = "✅ Richtig!";
      feedbackDiv.style.color = "#2e7d32";
      
      inputs.forEach(input => {
        input.classList.add("correct");
        input.classList.remove("wrong");
        input.disabled = true;
      });
      checkButton.disabled = true;
      checkButton.style.background = "#4caf50";
      checkButton.textContent = "✓ Gelöst";
      onCorrect(values);
    } else {
      feedbackDiv.innerHTML = `❌ ${wrongCount} Fehler (${correctCount}/${dimension} richtig)`;
      feedbackDiv.style.color = "#c62828";
      
      inputs.forEach(input => {
        input.classList.add("wrong");
        input.classList.remove("correct");
      });
      
      setTimeout(() => {
        if (!isSolved) {
          inputs.forEach(input => {
            input.classList.remove("wrong");
          });
          setTimeout(() => {
            if (!isSolved && feedbackDiv.innerHTML !== "✅ Richtig!") {
              feedbackDiv.innerHTML = "";
            }
          }, 1000);
        }
      }, 1500);
    }
  };

  checkButton.onclick = validate;
  
  if (inputs.length > 0) {
    inputs[inputs.length - 1].addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        validate();
      }
    });
  }

  return container;
});

// --------------------
// VECTOR_CHECK - Mit Checkbox für "nicht möglich" und Prüfen-Button
// --------------------
registerInput("vector_check", ({ task, onCorrect, initialValue, isSolved }) => {
  const container = document.createElement("div");
  container.className = "vector-input-vertical";
  container.style.display = "flex";
  container.style.flexDirection = "column";
  container.style.gap = "8px";
  container.style.marginTop = "10px";
  container.style.alignItems = "flex-end";

  const inputs = [];
  const answerValue = task.answer.values;
  
  let isImpossibleTask = false;
  let showInputFields = true;
  let dimension = 2;
  
  if (Array.isArray(answerValue) && answerValue[0] === "n" && answerValue[1] === "L") {
    isImpossibleTask = true;
    showInputFields = answerValue[2] === 1;
    dimension = showInputFields ? 2 : 0;
  } else {
    dimension = answerValue.length;
  }

  const subscripts = ["₁", "₂", "₃", "₄", "₅", "₆", "₇", "₈", "₉", "₁₀"];
  const placeholders = [];
  for (let i = 1; i <= dimension; i++) {
    placeholders.push(`x${subscripts[i-1]}`);
  }

  const inputsContainer = document.createElement("div");
  inputsContainer.style.display = "flex";
  inputsContainer.style.flexDirection = "column";
  inputsContainer.style.gap = "8px";

  const checkboxContainer = document.createElement("div");
  checkboxContainer.style.display = "flex";
  checkboxContainer.style.alignItems = "center";
  checkboxContainer.style.gap = "8px";
  checkboxContainer.style.marginBottom = "10px";
  checkboxContainer.style.justifyContent = "flex-end";

  const impossibleCheckbox = document.createElement("input");
  impossibleCheckbox.type = "checkbox";
  impossibleCheckbox.style.width = "18px";
  impossibleCheckbox.style.height = "18px";
  impossibleCheckbox.style.cursor = "pointer";

  const checkboxLabel = document.createElement("label");
  checkboxLabel.textContent = "❌ Nicht möglich / Keine Lösung";
  checkboxLabel.style.cursor = "pointer";
  checkboxLabel.style.fontSize = "14px";
  checkboxLabel.style.color = "#666";

  checkboxContainer.appendChild(impossibleCheckbox);
  checkboxContainer.appendChild(checkboxLabel);

  const buttonContainer = document.createElement("div");
  buttonContainer.style.display = "flex";
  buttonContainer.style.justifyContent = "flex-end";
  buttonContainer.style.marginTop = "10px";

  const checkButton = document.createElement("button");
  checkButton.textContent = "✓ Antwort prüfen";
  checkButton.style.padding = "8px 16px";
  checkButton.style.fontSize = "14px";
  checkButton.style.cursor = "pointer";
  checkButton.style.background = "#667eea";
  checkButton.style.color = "white";
  checkButton.style.border = "none";
  checkButton.style.borderRadius = "5px";
  checkButton.style.transition = "all 0.2s";

  checkButton.onmouseenter = () => checkButton.style.transform = "scale(1.05)";
  checkButton.onmouseleave = () => checkButton.style.transform = "scale(1)";

  const feedbackDiv = document.createElement("div");
  feedbackDiv.style.fontSize = "12px";
  feedbackDiv.style.marginTop = "5px";
  feedbackDiv.style.textAlign = "right";
  feedbackDiv.style.minHeight = "30px";

  let initialValues = [];
  if (initialValue && Array.isArray(initialValue)) {
    initialValues = initialValue;
  } else if (initialValue && typeof initialValue === 'object' && initialValue.values) {
    initialValues = initialValue.values;
  }

  let wasImpossible = false;
  if (initialValues[0] === "nicht" && initialValues[1] === "möglich") {
    wasImpossible = true;
    impossibleCheckbox.checked = true;
  }

  if (showInputFields) {
    for (let idx = 0; idx < dimension; idx++) {
      const wrapper = document.createElement("div");
      wrapper.style.display = "flex";
      wrapper.style.alignItems = "center";
      wrapper.style.gap = "10px";

      const input = document.createElement("input");
      input.type = "number";
      input.placeholder = placeholders[idx];
      input.step = "any";
      input.style.width = "80px";
      input.style.padding = "8px";
      input.style.fontSize = "16px";
      input.style.textAlign = "center";

      if (!wasImpossible && initialValues[idx] !== undefined && initialValues[idx] !== null && typeof initialValues[idx] === 'number') {
        input.value = initialValues[idx];
      }

      if (isSolved) {
        input.disabled = true;
        input.classList.add("solved-input");
      }

      inputs.push(input);
      wrapper.appendChild(input);
      inputsContainer.appendChild(wrapper);
    }
  } else {
    for (let i = 0; i < 2; i++) {
      const dummyInput = document.createElement("input");
      dummyInput.type = "hidden";
      inputs.push(dummyInput);
    }
  }

  container.appendChild(checkboxContainer);
  
  if (showInputFields && (!isSolved || !wasImpossible)) {
    container.appendChild(inputsContainer);
  }
  
  container.appendChild(buttonContainer);
  buttonContainer.appendChild(checkButton);
  container.appendChild(feedbackDiv);

  const validate = () => {
    if (isSolved) return;

    const isImpossibleChecked = impossibleCheckbox.checked;

    if (isImpossibleTask) {
      if (isImpossibleChecked) {
        feedbackDiv.innerHTML = "✅ Richtig! Die Aufgabe ist nicht lösbar.";
        feedbackDiv.style.color = "#2e7d32";
        checkboxContainer.style.border = "2px solid #4caf50";
        checkboxContainer.style.borderRadius = "5px";
        checkboxContainer.style.padding = "5px";
        checkboxContainer.style.background = "#e8f5e9";
        
        impossibleCheckbox.disabled = true;
        if (showInputFields) {
          inputs.forEach(i => {
            if (i.type !== 'hidden') i.disabled = true;
          });
        }
        onCorrect(["nicht", "möglich"]);
      } else {
        feedbackDiv.innerHTML = "❌ Falsch! Überlegen Sie: Sind die Dimensionen der Vektoren kompatibel?";
        feedbackDiv.style.color = "#c62828";
        checkboxContainer.style.border = "2px solid #f44336";
        checkboxContainer.style.borderRadius = "5px";
        checkboxContainer.style.padding = "5px";
        checkboxContainer.style.background = "#ffebee";
        
        setTimeout(() => {
          if (!isSolved) {
            checkboxContainer.style.border = "";
            checkboxContainer.style.borderRadius = "";
            checkboxContainer.style.padding = "";
            checkboxContainer.style.background = "";
          }
        }, 2000);
      }
      return;
    }

    if (isImpossibleChecked) {
      feedbackDiv.innerHTML = "❌ Falsch! Diese Aufgabe ist lösbar. Bitte geben Sie die korrekten Zahlen ein.";
      feedbackDiv.style.color = "#c62828";
      checkboxContainer.style.border = "2px solid #f44336";
      checkboxContainer.style.borderRadius = "5px";
      checkboxContainer.style.padding = "5px";
      checkboxContainer.style.background = "#ffebee";
      
      setTimeout(() => {
        if (!isSolved) {
          checkboxContainer.style.border = "";
          checkboxContainer.style.borderRadius = "";
          checkboxContainer.style.padding = "";
          checkboxContainer.style.background = "";
        }
      }, 2000);
      return;
    }

    const values = inputs.map(i => {
      const val = parseFloat(i.value);
      return isNaN(val) ? null : val;
    });

    const allFilled = values.every(v => v !== null);
    
    if (!allFilled) {
      feedbackDiv.innerHTML = "⚠️ Bitte füllen Sie alle Felder aus.";
      feedbackDiv.style.color = "#ff9800";
      return;
    }
    
    const allCorrect = values.every((v, i) => v === answerValue[i]);

    if (allCorrect) {
      feedbackDiv.innerHTML = "✅ Richtig! Gut gemacht!";
      feedbackDiv.style.color = "#2e7d32";
      
      inputs.forEach(inputEl => {
        if (inputEl.type !== 'hidden') {
          inputEl.classList.add("correct");
        }
      });
      inputs.forEach(i => {
        if (i.type !== 'hidden') i.disabled = true;
      });
      impossibleCheckbox.disabled = true;
      onCorrect(values);
    } else {
      let wrongFields = [];
      inputs.forEach((inputEl, i) => {
        if (inputEl.type === 'hidden') return;
        
        const currentVal = parseFloat(inputEl.value);
        const expectedVal = answerValue[i];
        
        if (currentVal !== expectedVal) {
          inputEl.classList.add("wrong");
          inputEl.classList.remove("correct");
          wrongFields.push(placeholders[i]);
        } else {
          inputEl.classList.remove("wrong", "correct");
        }
      });
      
      if (wrongFields.length > 0) {
        feedbackDiv.innerHTML = `❌ Falsch: ${wrongFields.join(", ")} sind nicht korrekt. Versuchen Sie es nochmal!`;
        feedbackDiv.style.color = "#c62828";
      }
    }
  };

  checkButton.onclick = validate;
  
  if (inputs.length > 0) {
    const lastInput = inputs[inputs.length - 1];
    if (lastInput.type !== 'hidden') {
      lastInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          validate();
        }
      });
    }
  }

  return container;
});

// --------------------
// ANALYSIS_FORM - Allgemeines Formular für Funktionsanalyse
// --------------------
registerInput("analysis_form", ({ task, onCorrect, initialValue, isSolved }) => {
  const container = document.createElement("div");
  container.className = "analysis-form";
  container.style.display = "flex";
  container.style.flexDirection = "column";
  container.style.gap = "12px";
  container.style.marginTop = "10px";
  container.style.padding = "15px";
  container.style.background = "#f9f9f9";
  container.style.borderRadius = "8px";
  container.style.border = "1px solid #e0e0e0";
  container.style.width = "100%";

  const fields = task.fields || [];
  const inputs = {};

  fields.forEach((field, idx) => {
    const fieldContainer = document.createElement("div");
    fieldContainer.style.display = "flex";
    fieldContainer.style.justifyContent = "space-between";
    fieldContainer.style.alignItems = "center";
    fieldContainer.style.gap = "10px";
    fieldContainer.style.flexWrap = "wrap";
    if (idx > 0) fieldContainer.style.marginTop = "8px";

    const label = document.createElement("span");
    label.innerHTML = `<strong>${field.label}:</strong>`;
    label.style.fontSize = "14px";
    label.style.minWidth = "120px";

    let input;
    if (field.type === "function") {
      input = document.createElement("input");
      input.type = "text";
      input.placeholder = field.placeholder || "z.B. 3x^3+2x^2-3";
      input.style.flex = "1";
      input.style.padding = "8px";
      input.style.fontSize = "14px";
      input.style.minWidth = "150px";
    } else if (field.type === "roots") {
      input = document.createElement("input");
      input.type = "text";
      input.placeholder = field.placeholder || "kommagetrennt, z.B. -3,2";
      input.style.flex = "1";
      input.style.padding = "8px";
      input.style.fontSize = "14px";
      input.style.minWidth = "150px";
    } else if (field.type === "number") {
      input = document.createElement("input");
      input.type = "number";
      input.placeholder = field.placeholder || "0";
      input.step = field.step || "1";
      input.style.width = "80px";
      input.style.padding = "8px";
      input.style.textAlign = "center";
    } else {
      input = document.createElement("input");
      input.type = "text";
      input.placeholder = field.placeholder || "";
      input.style.flex = "1";
      input.style.padding = "8px";
      input.style.fontSize = "14px";
    }

    if (initialValue && initialValue[field.id] !== undefined) {
      if (field.type === "roots" && Array.isArray(initialValue[field.id])) {
        input.value = initialValue[field.id].join(", ");
      } else {
        input.value = initialValue[field.id];
      }
    }

    if (isSolved) {
      input.disabled = true;
      input.classList.add("solved-input");
    }

    fieldContainer.appendChild(label);
    fieldContainer.appendChild(input);
    container.appendChild(fieldContainer);
    
    inputs[field.id] = input;
  });

  const bottomContainer = document.createElement("div");
  bottomContainer.style.display = "flex";
  bottomContainer.style.justifyContent = "space-between";
  bottomContainer.style.alignItems = "center";
  bottomContainer.style.marginTop = "15px";
  bottomContainer.style.gap = "10px";

  const feedbackDiv = document.createElement("div");
  feedbackDiv.style.fontSize = "12px";
  feedbackDiv.style.color = "#666";
  feedbackDiv.style.flex = "1";
  feedbackDiv.style.textAlign = "left";

  const checkButton = document.createElement("button");
  checkButton.textContent = "✓ Alle prüfen";
  checkButton.style.padding = "8px 20px";
  checkButton.style.fontSize = "14px";
  checkButton.style.cursor = "pointer";
  checkButton.style.background = "#667eea";
  checkButton.style.color = "white";
  checkButton.style.border = "none";
  checkButton.style.borderRadius = "5px";
  checkButton.style.transition = "all 0.2s";

  bottomContainer.appendChild(feedbackDiv);
  bottomContainer.appendChild(checkButton);
  container.appendChild(bottomContainer);

  const normalizeFunction = (func) => {
    if (!func) return "";
    return func
      .toLowerCase()
      .replace(/\s/g, '')
      .replace(/\\?\(/g, '(')
      .replace(/\\?\)/g, ')')
      .replace(/\^/g, '^')
      .replace(/[*]/g, '')
      .replace(/²/g, '^2')
      .replace(/³/g, '^3')
      .replace(/½/g, '0.5')
      .replace(/¼/g, '0.25');
  };

  const validate = () => {
    if (isSolved) return;

    const expected = task.answer;
    let errorCount = 0;
    const totalFields = fields.length;

    for (const field of fields) {
      const input = inputs[field.id];
      const userValue = input.value.trim();
      
      if (userValue === "") {
        errorCount++;
        continue;
      }

      let isCorrect = false;
      
      if (field.type === "function") {
        const normalizedUser = normalizeFunction(userValue);
        const normalizedExpected = normalizeFunction(expected[field.id]);
        const alternatives = (expected[`${field.id}Alternatives`] || []).map(normalizeFunction);
        isCorrect = normalizedUser === normalizedExpected || alternatives.includes(normalizedUser);
      } 
      else if (field.type === "roots") {
        const userRoots = userValue.split(",").map(v => parseFloat(v.trim())).filter(v => !isNaN(v));
        userRoots.sort((a, b) => a - b);
        const expectedRoots = [...expected[field.id]].sort((a, b) => a - b);
        isCorrect = userRoots.length === expectedRoots.length && 
                    userRoots.every((v, i) => Math.abs(v - expectedRoots[i]) < 0.01);
      }
      else if (field.type === "number") {
        const userNum = parseFloat(userValue);
        isCorrect = !isNaN(userNum) && userNum === expected[field.id];
      }
      else {
        isCorrect = userValue === expected[field.id];
      }
      
      if (!isCorrect) errorCount++;
    }

    const allCorrect = errorCount === 0;

    if (allCorrect) {
      feedbackDiv.innerHTML = "✅ Richtig! Alle Antworten sind korrekt!";
      feedbackDiv.style.color = "#2e7d32";
      
      for (const field of fields) {
        const input = inputs[field.id];
        input.classList.add("correct");
        input.disabled = true;
      }
      checkButton.disabled = true;
      checkButton.style.background = "#4caf50";
      checkButton.textContent = "✓ Gelöst";
      
      const result = {};
      for (const field of fields) {
        const input = inputs[field.id];
        if (field.type === "roots") {
          result[field.id] = input.value.split(",").map(v => parseFloat(v.trim())).filter(v => !isNaN(v));
        } else if (field.type === "number") {
          result[field.id] = parseFloat(input.value);
        } else {
          result[field.id] = input.value;
        }
      }
      onCorrect(result);
    } else {
      feedbackDiv.innerHTML = `❌ ${errorCount} Fehler (${totalFields - errorCount}/${totalFields} richtig)`;
      feedbackDiv.style.color = "#c62828";
      
      for (const field of fields) {
        const input = inputs[field.id];
        input.classList.add("wrong");
        input.classList.remove("correct");
      }
      
      setTimeout(() => {
        if (!isSolved) {
          for (const field of fields) {
            const input = inputs[field.id];
            input.classList.remove("wrong");
          }
          setTimeout(() => {
            if (!isSolved && feedbackDiv.innerHTML !== "✅ Richtig! Alle Antworten sind korrekt!") {
              feedbackDiv.innerHTML = "";
            }
          }, 1000);
        }
      }, 2000);
    }
  };

  checkButton.onclick = validate;

  return container;
});

// --------------------
// TRIANGLE_PROPERTIES - Kompakte Version für Dreiecksaufgaben
// --------------------
registerInput("triangle_properties", ({ task, onCorrect, initialValue, isSolved }) => {
  const container = document.createElement("div");
  container.className = "triangle-input";
  container.style.display = "flex";
  container.style.flexDirection = "column";
  container.style.gap = "12px";
  container.style.marginTop = "10px";
  container.style.padding = "12px";
  container.style.background = "#f9f9f9";
  container.style.borderRadius = "8px";
  container.style.border = "1px solid #e0e0e0";

  const sidesConfig = task.sides || [
    { name: "AB", expected: 0, placeholder: "Länge AB" },
    { name: "BC", expected: 0, placeholder: "Länge BC" },
    { name: "CA", expected: 0, placeholder: "Länge CA" }
  ];
  
  const propertiesConfig = task.properties || [
    { name: "isosceles", label: "gleichschenklig", expected: false },
    { name: "equilateral", label: "gleichseitig", expected: false },
    { name: "right", label: "rechtwinklig", expected: false }
  ];

  const lengthsContainer = document.createElement("div");
  lengthsContainer.style.display = "flex";
  lengthsContainer.style.flexWrap = "wrap";
  lengthsContainer.style.gap = "12px";
  lengthsContainer.style.justifyContent = "flex-end";
  lengthsContainer.style.alignItems = "center";

  const inputs = [];
  const expectedLengths = sidesConfig.map(s => s.expected);

  sidesConfig.forEach((side, idx) => {
    const wrapper = document.createElement("div");
    wrapper.style.display = "flex";
    wrapper.style.alignItems = "center";
    wrapper.style.gap = "5px";

    const label = document.createElement("span");
    label.textContent = `${side.name}:`;
    label.style.fontWeight = "bold";
    label.style.fontSize = "14px";

    const input = document.createElement("input");
    input.type = "number";
    input.placeholder = side.placeholder || "0";
    input.step = "any";
    input.style.width = "70px";
    input.style.padding = "6px";
    input.style.fontSize = "14px";
    input.style.textAlign = "center";

    if (initialValue && initialValue.lengths && initialValue.lengths[idx] !== undefined) {
      input.value = initialValue.lengths[idx];
    }

    if (isSolved) {
      input.disabled = true;
      input.classList.add("solved-input");
    }

    wrapper.appendChild(label);
    wrapper.appendChild(input);
    lengthsContainer.appendChild(wrapper);
    inputs.push(input);
  });

  const propertiesContainer = document.createElement("div");
  propertiesContainer.style.display = "flex";
  propertiesContainer.style.flexWrap = "wrap";
  propertiesContainer.style.gap = "15px";
  propertiesContainer.style.justifyContent = "flex-end";
  propertiesContainer.style.alignItems = "center";
  propertiesContainer.style.paddingTop = "8px";
  propertiesContainer.style.borderTop = "1px dashed #e0e0e0";

  const checkboxes = [];
  const checkboxElements = [];

  propertiesConfig.forEach((prop, idx) => {
    const propContainer = document.createElement("div");
    propContainer.style.display = "flex";
    propContainer.style.alignItems = "center";
    propContainer.style.gap = "5px";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.style.width = "16px";
    checkbox.style.height = "16px";
    checkbox.style.cursor = "pointer";

    const label = document.createElement("label");
    label.textContent = prop.label;
    label.style.cursor = "pointer";
    label.style.fontSize = "13px";

    if (initialValue && initialValue.properties && initialValue.properties[prop.name] !== undefined) {
      checkbox.checked = initialValue.properties[prop.name];
    }

    if (isSolved) {
      checkbox.disabled = true;
    }

    propContainer.appendChild(checkbox);
    propContainer.appendChild(label);
    propertiesContainer.appendChild(propContainer);
    
    checkboxes.push(checkbox);
    checkboxElements.push(propContainer);
  });

  const bottomContainer = document.createElement("div");
  bottomContainer.style.display = "flex";
  bottomContainer.style.justifyContent = "space-between";
  bottomContainer.style.alignItems = "center";
  bottomContainer.style.marginTop = "8px";
  bottomContainer.style.gap = "10px";

  const feedbackDiv = document.createElement("div");
  feedbackDiv.style.fontSize = "11px";
  feedbackDiv.style.color = "#666";
  feedbackDiv.style.flex = "1";
  feedbackDiv.style.textAlign = "left";

  const checkButton = document.createElement("button");
  checkButton.textContent = "✓ Prüfen";
  checkButton.style.padding = "5px 15px";
  checkButton.style.fontSize = "13px";
  checkButton.style.cursor = "pointer";
  checkButton.style.background = "#667eea";
  checkButton.style.color = "white";
  checkButton.style.border = "none";
  checkButton.style.borderRadius = "4px";

  bottomContainer.appendChild(feedbackDiv);
  bottomContainer.appendChild(checkButton);

  container.appendChild(lengthsContainer);
  container.appendChild(propertiesContainer);
  container.appendChild(bottomContainer);

  const validate = () => {
    if (isSolved) return;

    const lengthValues = inputs.map(input => parseFloat(input.value));
    const allLengthsFilled = lengthValues.every(v => !isNaN(v));
    
    if (!allLengthsFilled) {
      feedbackDiv.innerHTML = "⚠️ Alle Längen eingeben";
      feedbackDiv.style.color = "#ff9800";
      return;
    }

    const lengthsCorrect = lengthValues.every((val, idx) => {
      const expected = expectedLengths[idx];
      return Math.abs(val - expected) < 0.01;
    });

    let propertiesCorrect = true;
    
    checkboxes.forEach((checkbox, idx) => {
      const expected = propertiesConfig[idx].expected;
      const isChecked = checkbox.checked;
      if (isChecked !== expected) propertiesCorrect = false;
    });

    if (lengthsCorrect && propertiesCorrect) {
      feedbackDiv.innerHTML = "✅ Richtig!";
      feedbackDiv.style.color = "#2e7d32";
      
      inputs.forEach(input => {
        input.classList.add("correct");
        input.disabled = true;
      });
      checkboxes.forEach(checkbox => checkbox.disabled = true);
      
      const result = {
        lengths: lengthValues,
        properties: {}
      };
      propertiesConfig.forEach((prop, idx) => {
        result.properties[prop.name] = checkboxes[idx].checked;
      });
      
      onCorrect(result);
    } else {
      let errorCount = 0;
      
      if (!lengthsCorrect) {
        inputs.forEach((input, idx) => {
          const val = parseFloat(input.value);
          const expected = expectedLengths[idx];
          if (Math.abs(val - expected) >= 0.01) {
            input.classList.add("wrong");
            errorCount++;
          } else {
            input.classList.remove("wrong", "correct");
          }
        });
      } else {
        inputs.forEach(input => input.classList.remove("wrong", "correct"));
      }
      
      checkboxes.forEach((checkbox, idx) => {
        const expected = propertiesConfig[idx].expected;
        const isChecked = checkbox.checked;
        const propContainer = checkboxElements[idx];
        
        if (isChecked !== expected) {
          errorCount++;
          propContainer.style.color = "#c62828";
          propContainer.style.fontWeight = "bold";
        } else {
          propContainer.style.color = "";
          propContainer.style.fontWeight = "";
        }
      });
      
      if (errorCount > 0) {
        feedbackDiv.innerHTML = `❌ ${errorCount} Fehler`;
        feedbackDiv.style.color = "#c62828";
      }
      
      setTimeout(() => {
        if (!isSolved) {
          inputs.forEach(input => input.classList.remove("wrong"));
          checkboxElements.forEach(container => {
            container.style.color = "";
            container.style.fontWeight = "";
          });
        }
      }, 1500);
    }
  };

  checkButton.onclick = validate;
  
  if (inputs.length > 0) {
    inputs[inputs.length - 1].addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        validate();
      }
    });
  }

  return container;
});

// --------------------
// NOTE - Für Skizzenaufgaben
// --------------------
registerInput("note", ({ task, onCorrect, initialValue, isSolved }) => {
  const container = document.createElement("div");
  container.className = "note-input";
  container.style.padding = "15px";
  container.style.background = "#fff3e0";
  container.style.borderRadius = "8px";
  container.style.borderLeft = "4px solid #ff9800";
  
  const message = document.createElement("div");
  message.innerHTML = task.answer.message || "✏️ Bitte mit Lehrkraft besprechen";
  message.style.marginBottom = "10px";
  message.style.fontWeight = "bold";
  
  const code = document.createElement("div");
  if (task.code) {
    code.textContent = `Code: ${task.code}`;
    code.style.fontSize = "12px";
    code.style.color = "#666";
    code.style.marginTop = "5px";
  }
  
  const confirmBtn = document.createElement("button");
  confirmBtn.textContent = "✓ Als besprochen markieren";
  confirmBtn.style.marginTop = "10px";
  confirmBtn.style.padding = "5px 15px";
  confirmBtn.style.backgroundColor = "#ff9800";
  confirmBtn.style.color = "white";
  confirmBtn.style.border = "none";
  confirmBtn.style.borderRadius = "5px";
  confirmBtn.style.cursor = "pointer";
  
  if (!isSolved) {
    confirmBtn.onclick = () => {
      onCorrect("besprochen");
      confirmBtn.disabled = true;
      confirmBtn.textContent = "✓ Besprochen";
    };
  } else {
    confirmBtn.disabled = true;
    confirmBtn.textContent = "✓ Besprochen";
  }
  
  container.appendChild(message);
  container.appendChild(code);
  container.appendChild(confirmBtn);
  
  return container;
});

// --------------------
// ROOTS & INTERCEPT (Nullstellen und y-Achsenabschnitt)
// --------------------
registerInput("roots_intercept", ({ task, onCorrect, initialValue, isSolved }) => {
  const container = document.createElement("div");
  container.className = "roots-input";
  
  const nullstellenDiv = document.createElement("div");
  nullstellenDiv.style.marginBottom = "10px";
  nullstellenDiv.innerHTML = "<strong>Nullstellen:</strong> ";
  
  const nullstellenInput = document.createElement("input");
  nullstellenInput.type = "text";
  nullstellenInput.placeholder = "z.B. -12,-1,4 oder 'keine'";
  nullstellenInput.style.width = "200px";
  nullstellenInput.style.marginLeft = "10px";
  
  const yachsenDiv = document.createElement("div");
  yachsenDiv.innerHTML = "<strong>y-Achsenabschnitt:</strong> ";
  
  const yachsenInput = document.createElement("input");
  yachsenInput.type = "text";
  yachsenInput.placeholder = "z.B. 5";
  yachsenInput.style.width = "100px";
  yachsenInput.style.marginLeft = "10px";
  
  nullstellenDiv.appendChild(nullstellenInput);
  yachsenDiv.appendChild(yachsenInput);
  container.appendChild(nullstellenDiv);
  container.appendChild(yachsenDiv);
  
  if (isSolved && initialValue) {
    if (initialValue.nullstellen) {
      nullstellenInput.value = Array.isArray(initialValue.nullstellen) 
        ? initialValue.nullstellen.join(",") 
        : initialValue.nullstellen;
    }
    if (initialValue.yachsenabschnitt !== undefined) {
      yachsenInput.value = initialValue.yachsenabschnitt;
    }
    nullstellenInput.disabled = true;
    yachsenInput.disabled = true;
  }
  
  const validate = () => {
    if (nullstellenInput.disabled) return;
    
    let nullstellen = nullstellenInput.value.trim();
    let yachsenabschnitt = parseFloat(yachsenInput.value);
    
    let nullstellenArray = [];
    if (nullstellen.toLowerCase() === "keine") {
      nullstellenArray = [];
    } else {
      nullstellenArray = nullstellen.split(",").map(n => parseFloat(n.trim())).filter(n => !isNaN(n));
    }
    
    const expectedNull = task.answer.nullstellen;
    const expectedY = task.answer.yachsenabschnitt;
    
    const nullstellenOk = JSON.stringify(nullstellenArray.sort()) === JSON.stringify(expectedNull.sort());
    const yachsenOk = !isNaN(yachsenabschnitt) && Math.abs(yachsenabschnitt - expectedY) < 0.01;
    
    if (nullstellenOk && yachsenOk) {
      onCorrect({ nullstellen: nullstellenArray, yachsenabschnitt: yachsenabschnitt });
    }
  };
  
  nullstellenInput.addEventListener("input", validate);
  yachsenInput.addEventListener("input", validate);
  
  return container;
});

// --------------------
// ROOTS (nur Nullstellen)
// --------------------
registerInput("roots", ({ task, onCorrect, initialValue, isSolved }) => {
  const container = document.createElement("div");
  
  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "z.B. -1,0,2";
  input.style.width = "100%";
  
  if (isSolved && initialValue) {
    input.value = Array.isArray(initialValue) ? initialValue.join(", ") : initialValue;
    input.disabled = true;
  }
  
  const validate = () => {
    if (input.disabled) return;
    
    const values = input.value.split(",").map(v => parseFloat(v.trim())).filter(v => !isNaN(v));
    const expected = task.answer.nullstellen;
    
    if (values.length === expected.length && values.every((v, i) => v === expected[i])) {
      onCorrect(values);
    }
  };
  
  input.addEventListener("input", validate);
  container.appendChild(input);
  
  return container;
});

// --------------------
// FUNCTION (für Ableitungen)
// --------------------
registerInput("function", ({ task, onCorrect, initialValue, isSolved }) => {
  const container = document.createElement("div");
  
  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "z.B. 3x^2+2x";
  input.style.width = "100%";
  
  if (isSolved && initialValue) {
    input.value = initialValue;
    input.disabled = true;
  }
  
  const normalizeFunction = (func) => {
    return func
      .toLowerCase()
      .replace(/\s/g, '')
      .replace(/\\?\(/g, '(')
      .replace(/\\?\)/g, ')')
      .replace(/\^/g, '^')
      .replace(/[*]/g, '')
      .replace(/²/g, '^2')
      .replace(/³/g, '^3');
  };
  
  const validate = () => {
    if (input.disabled) return;
    
    const userFunc = normalizeFunction(input.value);
    const expected = normalizeFunction(task.answer.loesung);
    const alternatives = (task.answer.alternativen || []).map(normalizeFunction);
    
    const isCorrect = userFunc === expected || alternatives.includes(userFunc);
    
    if (isCorrect) {
      onCorrect(input.value);
    }
  };
  
  input.addEventListener("input", validate);
  container.appendChild(input);
  
  return container;
});

// --------------------
// CODE - Für Lehrer-Codes (mit Bestätigungsknopf)
// --------------------
registerInput("code", ({ task, onCorrect, initialValue, isSolved }) => {
  const container = document.createElement("div");
  container.className = "code-input";
  container.style.display = "flex";
  container.style.flexDirection = "column";
  container.style.gap = "10px";
  container.style.marginTop = "10px";

  const inputContainer = document.createElement("div");
  inputContainer.style.display = "flex";
  inputContainer.style.gap = "10px";
  inputContainer.style.alignItems = "center";
  inputContainer.style.justifyContent = "flex-end";

  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Code eingeben (z.B. SK11)";
  input.style.padding = "8px";
  input.style.fontSize = "16px";
  input.style.width = "150px";
  input.style.textAlign = "center";
  input.style.textTransform = "uppercase";

  const verifyBtn = document.createElement("button");
  verifyBtn.textContent = "🔓 Code prüfen";
  verifyBtn.style.padding = "8px 15px";
  verifyBtn.style.fontSize = "14px";
  verifyBtn.style.cursor = "pointer";
  verifyBtn.style.background = "#667eea";
  verifyBtn.style.color = "white";
  verifyBtn.style.border = "none";
  verifyBtn.style.borderRadius = "5px";
  verifyBtn.style.transition = "all 0.2s";

  verifyBtn.onmouseenter = () => verifyBtn.style.transform = "scale(1.05)";
  verifyBtn.onmouseleave = () => verifyBtn.style.transform = "scale(1)";

  const messageDiv = document.createElement("div");
  messageDiv.style.fontSize = "12px";
  messageDiv.style.marginTop = "5px";
  messageDiv.style.textAlign = "right";

  if (initialValue) {
    input.value = initialValue;
  }

  if (isSolved) {
    input.disabled = true;
    verifyBtn.disabled = true;
    verifyBtn.style.background = "#4caf50";
    verifyBtn.textContent = "✓ Freigeschaltet";
    messageDiv.innerHTML = "✅ Aufgabe erfolgreich freigeschaltet!";
    messageDiv.style.color = "#2e7d32";
  }

  const checkCode = () => {
    if (input.disabled) return;

    const userCode = input.value.trim().toUpperCase();
    const expectedCode = task.answer.code.toUpperCase();

    if (userCode === expectedCode) {
      input.classList.add("correct");
      input.classList.remove("wrong");
      messageDiv.innerHTML = "✅ Code korrekt! Aufgabe wird freigeschaltet...";
      messageDiv.style.color = "#2e7d32";
      verifyBtn.style.background = "#4caf50";
      verifyBtn.textContent = "✓ Freigeschaltet";
      onCorrect(userCode);
    } else if (userCode.length > 0) {
      input.classList.add("wrong");
      input.classList.remove("correct");
      messageDiv.innerHTML = "❌ Falscher Code. Bitte versuchen Sie es erneut!";
      messageDiv.style.color = "#c62828";
    } else {
      input.classList.remove("correct", "wrong");
      messageDiv.innerHTML = task.answer.message || "✏️ Bitte geben Sie den Code von Ihrer Lehrkraft ein.";
      messageDiv.style.color = "#666";
    }
  };

  verifyBtn.onclick = checkCode;
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      checkCode();
    }
  });

  inputContainer.appendChild(input);
  inputContainer.appendChild(verifyBtn);
  container.appendChild(inputContainer);
  container.appendChild(messageDiv);

  return container;
});

// --------------------
// POINT - Mit Prüf-Button (Anzeige wie viele falsch sind)
// --------------------
registerInput("point", ({ task, onCorrect, initialValue, isSolved }) => {
  const container = document.createElement("div");
  container.className = "point-input-horizontal";
  container.style.display = "flex";
  container.style.flexWrap = "wrap";
  container.style.gap = "8px";
  container.style.alignItems = "center";
  container.style.marginTop = "10px";
  container.style.padding = "10px";
  container.style.background = "#f9f9f9";
  container.style.borderRadius = "8px";
  container.style.border = "1px solid #e0e0e0";
  container.style.justifyContent = "flex-end";

  const inputs = [];
  const expectedValues = task.answer.values;
  const dimension = expectedValues.length;

  const subscripts = ["₁", "₂", "₃", "₄", "₅", "₆", "₇", "₈", "₉", "₁₀"];
  const placeholders = [];
  for (let i = 1; i <= dimension; i++) {
    placeholders.push(`x${subscripts[i-1]}`);
  }

  let initialValues = [];
  if (initialValue && Array.isArray(initialValue)) {
    initialValues = initialValue;
  } else if (initialValue && typeof initialValue === 'object' && initialValue.values) {
    initialValues = initialValue.values;
  }

  const openBracket = document.createElement("span");
  openBracket.textContent = "(";
  openBracket.style.fontSize = "18px";
  openBracket.style.fontWeight = "bold";
  container.appendChild(openBracket);

  expectedValues.forEach((expected, idx) => {
    const input = document.createElement("input");
    input.type = "number";
    input.placeholder = placeholders[idx];
    input.step = "any";
    input.style.width = "70px";
    input.style.padding = "6px";
    input.style.textAlign = "center";

    if (initialValues[idx] !== undefined && initialValues[idx] !== null) {
      input.value = initialValues[idx];
    }

    if (isSolved) {
      input.disabled = true;
      input.classList.add("solved-input");
    }

    inputs.push(input);
    container.appendChild(input);

    if (idx < expectedValues.length - 1) {
      const comma = document.createElement("span");
      comma.textContent = ",";
      comma.style.fontSize = "16px";
      container.appendChild(comma);
    }
  });

  const closeBracket = document.createElement("span");
  closeBracket.textContent = ")";
  closeBracket.style.fontSize = "18px";
  closeBracket.style.fontWeight = "bold";
  container.appendChild(closeBracket);

  const bottomContainer = document.createElement("div");
  bottomContainer.style.display = "flex";
  bottomContainer.style.justifyContent = "space-between";
  bottomContainer.style.alignItems = "center";
  bottomContainer.style.marginTop = "10px";
  bottomContainer.style.gap = "10px";
  bottomContainer.style.width = "100%";

  const feedbackDiv = document.createElement("div");
  feedbackDiv.style.fontSize = "11px";
  feedbackDiv.style.color = "#666";
  feedbackDiv.style.flex = "1";
  feedbackDiv.style.textAlign = "left";

  const checkButton = document.createElement("button");
  checkButton.textContent = "✓ Prüfen";
  checkButton.style.padding = "5px 15px";
  checkButton.style.fontSize = "13px";
  checkButton.style.cursor = "pointer";
  checkButton.style.background = "#667eea";
  checkButton.style.color = "white";
  checkButton.style.border = "none";
  checkButton.style.borderRadius = "4px";

  bottomContainer.appendChild(feedbackDiv);
  bottomContainer.appendChild(checkButton);
  container.appendChild(bottomContainer);

  const validate = () => {
    if (isSolved) return;

    const values = inputs.map(input => parseFloat(input.value));
    const allFilled = values.every(v => !isNaN(v));
    
    if (!allFilled) {
      feedbackDiv.innerHTML = "⚠️ Bitte alle Koordinaten eingeben";
      feedbackDiv.style.color = "#ff9800";
      return;
    }

    let correctCount = 0;
    for (let i = 0; i < dimension; i++) {
      if (Math.abs(values[i] - expectedValues[i]) < 0.01) {
        correctCount++;
      }
    }

    const wrongCount = dimension - correctCount;
    const allCorrect = (wrongCount === 0);

    if (allCorrect) {
      feedbackDiv.innerHTML = "✅ Richtig!";
      feedbackDiv.style.color = "#2e7d32";
      inputs.forEach(input => {
        input.classList.add("correct");
        input.disabled = true;
      });
      checkButton.disabled = true;
      checkButton.style.background = "#4caf50";
      checkButton.textContent = "✓ Gelöst";
      onCorrect(values);
    } else {
      feedbackDiv.innerHTML = `❌ ${wrongCount} Fehler (${correctCount}/${dimension} richtig)`;
      feedbackDiv.style.color = "#c62828";
      
      inputs.forEach(input => {
        input.classList.add("wrong");
        input.classList.remove("correct");
      });
      
      setTimeout(() => {
        if (!isSolved) {
          inputs.forEach(input => input.classList.remove("wrong"));
          setTimeout(() => {
            if (!isSolved && feedbackDiv.innerHTML !== "✅ Richtig!") {
              feedbackDiv.innerHTML = "";
            }
          }, 1000);
        }
      }, 1500);
    }
  };

  checkButton.onclick = validate;
  
  if (inputs.length > 0) {
    inputs[inputs.length - 1].addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        validate();
      }
    });
  }

  return container;
});
// --------------------
// SET - Für Ergebnismengen (Mengenlehre)
// Erkennt: {1,2,3}, 1,2,3, {1;2;3}, leere Menge, ∅, { }
// --------------------
registerInput("set", ({ task, onCorrect, initialValue, isSolved }) => {
  const container = document.createElement("div");
  container.style.display = "flex";
  container.style.flexDirection = "column";
  container.style.gap = "8px";
  container.style.alignItems = "flex-end";
  container.style.width = "100%";

  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = task.placeholder || "z.B. {1,2,3} oder 1,2,3 oder leere Menge";
  input.style.width = "250px";
  input.style.padding = "10px";
  input.style.fontSize = "16px";
  input.style.fontFamily = "monospace";
  input.style.textAlign = "left";

  if (initialValue) {
    input.value = initialValue;
  }

  if (isSolved) {
    input.disabled = true;
    input.classList.add("solved-input");
  }

  // Hilfsfunktion: Normalisiere eine Mengen-Eingabe
  function normalizeSet(inputStr) {
    if (!inputStr || inputStr.trim() === "") return null;
    
    let cleaned = inputStr.trim();
    
    // Leere Menge erkennen
    if (cleaned === "∅" || 
        cleaned === "{}" || 
        cleaned === "{ }" || 
        cleaned === "leere Menge" || 
        cleaned === "leer" ||
        cleaned === "keine" ||
        cleaned === "nichts") {
      return []; // Leere Menge
    }
    
    // Entferne geschweifte Klammern, wenn vorhanden
    if (cleaned.startsWith("{") && cleaned.endsWith("}")) {
      cleaned = cleaned.slice(1, -1).trim();
    }
    
    // Leere Menge nach Entfernen der Klammern
    if (cleaned === "") {
      return [];
    }
    
    // Teile nach Komma oder Semikolon
    let parts;
    if (cleaned.includes(",")) {
      parts = cleaned.split(",");
    } else if (cleaned.includes(";")) {
      parts = cleaned.split(";");
    } else {
      parts = [cleaned];
    }
    
    // Konvertiere jedes Element zu einer Zahl
    const numbers = [];
    for (const part of parts) {
      const trimmed = part.trim();
      if (trimmed === "") continue;
      
      // Bruch erkennen (z.B. 1/2)
      let num;
      if (trimmed.includes("/")) {
        const fractionParts = trimmed.split("/");
        if (fractionParts.length === 2) {
          const numerator = parseFloat(fractionParts[0].trim());
          const denominator = parseFloat(fractionParts[1].trim());
          if (!isNaN(numerator) && !isNaN(denominator) && denominator !== 0) {
            num = numerator / denominator;
          }
        }
      } else {
        // Normale Zahl (mit Komma als Dezimaltrenner)
        num = parseFloat(trimmed.replace(",", "."));
      }
      
      if (!isNaN(num)) {
        numbers.push(num);
      }
    }
    
    // Sortiere für konsistenten Vergleich
    numbers.sort((a, b) => a - b);
    return numbers;
  }

  // Hilfsfunktion: Vergleiche zwei Mengen
  function setsAreEqual(set1, set2, tolerance = 0.001) {
    if (set1 === null || set2 === null) return false;
    if (set1.length !== set2.length) return false;
    
    for (let i = 0; i < set1.length; i++) {
      if (Math.abs(set1[i] - set2[i]) > tolerance) {
        return false;
      }
    }
    return true;
  }

  // Formatierte Anzeige der Menge (für Feedback)
  function formatSet(set) {
    if (!set || set.length === 0) return "∅";
    return "{ " + set.join(", ") + " }";
  }

  const validateInput = () => {
    if (input.disabled) return;

    const rawValue = input.value.trim();
    if (rawValue === "") {
      input.classList.remove("correct", "wrong");
      return;
    }

    // Erwartete Antwort normalisieren
    let expectedSet;
    if (Array.isArray(task.answer)) {
      expectedSet = [...task.answer].sort((a, b) => a - b);
    } else if (typeof task.answer === 'object' && task.answer.values) {
      expectedSet = [...task.answer.values].sort((a, b) => a - b);
    } else {
      expectedSet = normalizeSet(String(task.answer));
    }
    
    // Benutzerantwort normalisieren
    const userSet = normalizeSet(rawValue);
    
    if (userSet === null) {
      input.classList.add("wrong");
      input.classList.remove("correct");
      return;
    }
    
    const tolerance = task.tolerance || 0.001;
    const isCorrect = setsAreEqual(userSet, expectedSet, tolerance);
    
    // Zusätzlich: Prüfen ob die Reihenfolge der Elemente egal ist
    // (bereits durch sortieren erledigt)
    
    if (isCorrect) {
      input.classList.add("correct");
      input.classList.remove("wrong");
      input.disabled = true;
      onCorrect(rawValue);
    } else {
      input.classList.add("wrong");
      input.classList.remove("correct");
    }
  };

  input.addEventListener("input", validateInput);
  input.addEventListener("change", validateInput);
  
  // Enter-Taste bestätigt die Eingabe
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      validateInput();
    }
  });

  container.appendChild(input);
  
  return container;
});
// --------------------
// PROBABILITY - Wahrscheinlichkeit mit Ergebnismenge
// Flexible Felder: set, fraction, decimal, percent
// --------------------
registerInput("probability", ({ task, onCorrect, initialValue, isSolved }) => {
  const container = document.createElement("div");
  container.className = "probability-input";
  container.style.display = "flex";
  container.style.flexDirection = "column";
  container.style.gap = "16px";
  container.style.marginTop = "10px";
  container.style.padding = "15px";
  container.style.background = "#f9f9f9";
  container.style.borderRadius = "12px";
  container.style.border = "1px solid #e0e0e0";

  // Konfiguration aus der task
  const fields = task.fields || ["set", "fraction", "decimal", "percent"];
  const expected = task.answer;
  
  // Speicher für die Eingabefelder
  const inputs = {};
  const feedbackFields = {};

  // Kopfzeile
  const instruction = document.createElement("div");
  instruction.style.fontSize = "14px";
  instruction.style.fontWeight = "bold";
  instruction.style.color = "#333";
  instruction.style.textAlign = "center";
  instruction.style.padding = "8px";
  instruction.style.background = "#e8f0fe";
  instruction.style.borderRadius = "8px";
  instruction.style.marginBottom = "10px";
  instruction.innerHTML = task.instruction || "📊 Gib die Ergebnismenge und die Wahrscheinlichkeit in verschiedenen Formen an:";
  container.appendChild(instruction);

  // Hilfsfunktionen
  function parseFraction(value) {
    if (!value || typeof value !== 'string') return NaN;
    const trimmed = value.trim();
    if (trimmed.includes('/')) {
      const parts = trimmed.split('/');
      if (parts.length === 2) {
        const numerator = parseFloat(parts[0].trim());
        const denominator = parseFloat(parts[1].trim());
        if (!isNaN(numerator) && !isNaN(denominator) && denominator !== 0) {
          return numerator / denominator;
        }
      }
    }
    return parseFloat(trimmed.replace(",", "."));
  }

  function parseSet(inputStr) {
    if (!inputStr || inputStr.trim() === "") return null;
    
    let cleaned = inputStr.trim();
    
    // Leere Menge erkennen
    if (cleaned === "∅" || cleaned === "{}" || cleaned === "{ }" || 
        cleaned === "leere Menge" || cleaned === "leer" || cleaned === "keine") {
      return [];
    }
    
    // Entferne geschweifte Klammern
    if (cleaned.startsWith("{") && cleaned.endsWith("}")) {
      cleaned = cleaned.slice(1, -1).trim();
    }
    
    if (cleaned === "") return [];
    
    // Teile nach Komma oder Semikolon
    let parts;
    if (cleaned.includes(",")) {
      parts = cleaned.split(",");
    } else if (cleaned.includes(";")) {
      parts = cleaned.split(";");
    } else {
      parts = [cleaned];
    }
    
    const numbers = [];
    for (const part of parts) {
      const trimmed = part.trim();
      if (trimmed === "") continue;
      
      let num;
      if (trimmed.includes("/")) {
        const fracParts = trimmed.split("/");
        if (fracParts.length === 2) {
          const numerator = parseFloat(fracParts[0].trim());
          const denominator = parseFloat(fracParts[1].trim());
          if (!isNaN(numerator) && !isNaN(denominator) && denominator !== 0) {
            num = numerator / denominator;
          }
        }
      } else {
        num = parseFloat(trimmed.replace(",", "."));
      }
      
      if (!isNaN(num)) {
        numbers.push(num);
      }
    }
    
    numbers.sort((a, b) => a - b);
    return numbers;
  }

  function setsAreEqual(set1, set2, tolerance = 0.001) {
    if (!set1 || !set2) return false;
    if (set1.length !== set2.length) return false;
    for (let i = 0; i < set1.length; i++) {
      if (Math.abs(set1[i] - set2[i]) > tolerance) return false;
    }
    return true;
  }

  // Erstelle die Eingabefelder basierend auf den definierten fields
  const formContainer = document.createElement("div");
  formContainer.style.display = "flex";
  formContainer.style.flexDirection = "column";
  formContainer.style.gap = "12px";

  for (const field of fields) {
    const fieldContainer = document.createElement("div");
    fieldContainer.style.display = "flex";
    fieldContainer.style.justifyContent = "space-between";
    fieldContainer.style.alignItems = "center";
    fieldContainer.style.gap = "15px";
    fieldContainer.style.flexWrap = "wrap";
    fieldContainer.style.padding = "8px";
    fieldContainer.style.background = "white";
    fieldContainer.style.borderRadius = "8px";
    fieldContainer.style.border = "1px solid #eee";

    let label, input, expectedValue, placeholder;

    switch (field) {
      case "set":
        label = "📦 Ergebnismenge:";
        expectedValue = expected.set || expected.values || [];
        placeholder = "z.B. {1,2,3} oder ∅";
        input = document.createElement("input");
        input.type = "text";
        input.placeholder = placeholder;
        input.style.flex = "1";
        input.style.padding = "8px";
        input.style.fontFamily = "monospace";
        break;
        
      case "fraction":
        label = "📐 Als Bruch:";
        expectedValue = expected.fraction || "";
        placeholder = "z.B. 1/2";
        input = document.createElement("input");
        input.type = "text";
        input.placeholder = placeholder;
        input.style.flex = "1";
        input.style.padding = "8px";
        break;
        
      case "decimal":
        label = "🔢 Als Dezimalzahl:";
        expectedValue = expected.decimal !== undefined ? expected.decimal : 
                        (typeof expected.value === 'number' ? expected.value : null);
        placeholder = "z.B. 0.5";
        input = document.createElement("input");
        input.type = "number";
        input.step = "any";
        input.placeholder = placeholder;
        input.style.flex = "1";
        input.style.padding = "8px";
        break;
        
      case "percent":
        label = "📊 In Prozent:";
        expectedValue = expected.percent !== undefined ? expected.percent :
                        (expected.decimal !== undefined ? expected.decimal * 100 : null);
        placeholder = "z.B. 50%";
        input = document.createElement("input");
        input.type = "text";
        input.placeholder = placeholder;
        input.style.flex = "1";
        input.style.padding = "8px";
        break;
        
      default:
        continue;
    }

    // Label erstellen
    const labelSpan = document.createElement("span");
    labelSpan.innerHTML = `<strong>${label}</strong>`;
    labelSpan.style.minWidth = "130px";
    labelSpan.style.fontSize = "14px";
    
    // Gespeicherten Wert laden
    if (initialValue && initialValue[field] !== undefined) {
      input.value = initialValue[field];
    }
    
    // Bei gelöster Aufgabe deaktivieren
    if (isSolved) {
      input.disabled = true;
      input.classList.add("solved-input");
      // Zeige die erwartete Lösung an
      if (field === "set" && Array.isArray(expectedValue)) {
        const displaySpan = document.createElement("span");
        displaySpan.style.fontSize = "13px";
        displaySpan.style.color = "#2e7d32";
        displaySpan.style.marginLeft = "10px";
        if (expectedValue.length === 0) {
          displaySpan.textContent = "✓ ∅";
        } else {
          displaySpan.textContent = `✓ {${expectedValue.join(", ")}}`;
        }
        fieldContainer.appendChild(displaySpan);
      } else if (field === "fraction" && expectedValue) {
        const displaySpan = document.createElement("span");
        displaySpan.style.fontSize = "13px";
        displaySpan.style.color = "#2e7d32";
        displaySpan.style.marginLeft = "10px";
        displaySpan.textContent = `✓ ${expectedValue}`;
        fieldContainer.appendChild(displaySpan);
      } else if (field === "decimal" && expectedValue !== null) {
        const displaySpan = document.createElement("span");
        displaySpan.style.fontSize = "13px";
        displaySpan.style.color = "#2e7d32";
        displaySpan.style.marginLeft = "10px";
        displaySpan.textContent = `✓ ${expectedValue}`;
        fieldContainer.appendChild(displaySpan);
      } else if (field === "percent" && expectedValue !== null) {
        const displaySpan = document.createElement("span");
        displaySpan.style.fontSize = "13px";
        displaySpan.style.color = "#2e7d32";
        displaySpan.style.marginLeft = "10px";
        displaySpan.textContent = `✓ ${expectedValue}%`;
        fieldContainer.appendChild(displaySpan);
      }
    }
    
    fieldContainer.appendChild(labelSpan);
    fieldContainer.appendChild(input);
    formContainer.appendChild(fieldContainer);
    
    inputs[field] = { input, expectedValue, field };
  }

  container.appendChild(formContainer);

  // Feedback und Buttons
  const buttonContainer = document.createElement("div");
  buttonContainer.style.display = "flex";
  buttonContainer.style.gap = "10px";
  buttonContainer.style.justifyContent = "center";
  buttonContainer.style.marginTop = "15px";

  const feedbackDiv = document.createElement("div");
  feedbackDiv.style.fontSize = "13px";
  feedbackDiv.style.textAlign = "center";
  feedbackDiv.style.padding = "8px";
  feedbackDiv.style.borderRadius = "8px";
  feedbackDiv.style.marginTop = "10px";

  const checkButton = document.createElement("button");
  checkButton.textContent = "✓ Prüfen";
  checkButton.style.padding = "10px 24px";
  checkButton.style.fontSize = "14px";
  checkButton.style.fontWeight = "bold";
  checkButton.style.cursor = "pointer";
  checkButton.style.background = "#667eea";
  checkButton.style.color = "white";
  checkButton.style.border = "none";
  checkButton.style.borderRadius = "25px";
  checkButton.style.transition = "all 0.2s";

  const resetButton = document.createElement("button");
  resetButton.textContent = "🔄 Zurücksetzen";
  resetButton.style.padding = "10px 24px";
  resetButton.style.fontSize = "14px";
  resetButton.style.fontWeight = "bold";
  resetButton.style.cursor = "pointer";
  resetButton.style.background = "#ff9800";
  resetButton.style.color = "white";
  resetButton.style.border = "none";
  resetButton.style.borderRadius = "25px";
  resetButton.style.transition = "all 0.2s";

  if (isSolved) {
    checkButton.disabled = true;
    checkButton.style.background = "#4caf50";
    checkButton.textContent = "✓ Gelöst";
    resetButton.disabled = true;
    resetButton.style.opacity = "0.5";
  }

  resetButton.onclick = () => {
    if (isSolved) return;
    for (const key in inputs) {
      inputs[key].input.value = "";
      inputs[key].input.classList.remove("correct", "wrong");
    }
    feedbackDiv.innerHTML = "";
    feedbackDiv.style.background = "";
  };

  checkButton.onclick = () => {
    if (isSolved) return;
    
    let errorCount = 0;
    const totalFields = Object.keys(inputs).length;
    const results = {};
    
    // Prüfe jedes Feld
    for (const key in inputs) {
      const { input, expectedValue, field } = inputs[key];
      const userValue = input.value.trim();
      let isCorrect = false;
      
      if (userValue === "") {
        errorCount++;
        continue;
      }
      
      switch (field) {
        case "set":
          const userSet = parseSet(userValue);
          const expectedSet = Array.isArray(expectedValue) ? expectedValue : [];
          isCorrect = setsAreEqual(userSet, expectedSet, 0.001);
          results.set = userSet;
          break;
          
        case "fraction":
          const userDecimal = parseFraction(userValue);
          let expectedDecimal;
          if (typeof expectedValue === 'string' && expectedValue.includes('/')) {
            expectedDecimal = parseFraction(expectedValue);
          } else if (typeof expectedValue === 'number') {
            expectedDecimal = expectedValue;
          } else {
            expectedDecimal = parseFraction(String(expectedValue));
          }
          isCorrect = !isNaN(userDecimal) && Math.abs(userDecimal - expectedDecimal) < 0.001;
          results.fraction = userValue;
          break;
          
        case "decimal":
          const userNum = parseFloat(userValue);
          const expectedNum = typeof expectedValue === 'number' ? expectedValue : parseFloat(expectedValue);
          isCorrect = !isNaN(userNum) && Math.abs(userNum - expectedNum) < 0.001;
          results.decimal = userNum;
          break;
          
        case "percent":
          let percentValue = parseFloat(userValue.replace("%", "").trim());
          let expectedPercent = typeof expectedValue === 'number' ? expectedValue : parseFloat(expectedValue);
          isCorrect = !isNaN(percentValue) && Math.abs(percentValue - expectedPercent) < 0.1;
          results.percent = percentValue;
          break;
      }
      
      if (isCorrect) {
        input.classList.add("correct");
        input.classList.remove("wrong");
      } else {
        input.classList.add("wrong");
        input.classList.remove("correct");
        errorCount++;
      }
    }
    
    const allCorrect = errorCount === 0 && totalFields > 0;
    
    if (allCorrect) {
      feedbackDiv.innerHTML = `✅ Richtig! 🎉`;
      feedbackDiv.style.background = "#e8f5e9";
      feedbackDiv.style.color = "#2e7d32";
      
      // Alle Felder deaktivieren
      for (const key in inputs) {
        inputs[key].input.disabled = true;
      }
      
      checkButton.disabled = true;
      checkButton.style.background = "#4caf50";
      checkButton.textContent = "✓ Gelöst";
      resetButton.disabled = true;
      resetButton.style.opacity = "0.5";
      
      onCorrect(results);
      
    } else if (totalFields === 0) {
      feedbackDiv.innerHTML = `⚠️ Keine Felder definiert!`;
      feedbackDiv.style.background = "#fff3e0";
      feedbackDiv.style.color = "#ff9800";
      
    } else {
      if (errorCount === 1) {
        feedbackDiv.innerHTML = `❌ 1 Feld ist falsch. Versuche es noch einmal!`;
      } else {
        feedbackDiv.innerHTML = `❌ ${errorCount} Felder sind falsch. Versuche es noch einmal!`;
      }
      feedbackDiv.style.background = "#ffebee";
      feedbackDiv.style.color = "#c62828";
      
      // Nach 2 Sekunden die Fehlermarkierung entfernen
      setTimeout(() => {
        if (!isSolved) {
          for (const key in inputs) {
            inputs[key].input.classList.remove("wrong");
          }
        }
      }, 2000);
    }
  };

  buttonContainer.appendChild(resetButton);
  buttonContainer.appendChild(checkButton);
  container.appendChild(buttonContainer);
  container.appendChild(feedbackDiv);

  return container;
});
// --------------------
// TEXT - Für Textantworten
// --------------------
registerInput("text", ({ task, onCorrect, initialValue, isSolved }) => {
  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Antwort eingeben...";
  input.style.width = "100%";
  
  if (initialValue) input.value = initialValue;
  if (isSolved) {
    input.disabled = true;
    input.classList.add("solved-input");
  }

  const validateAndSubmit = () => {
    if (input.disabled) return;
    
    const userAnswer = input.value.trim().toLowerCase();
    const expectedAnswer = task.answer.toLowerCase();
    const alternatives = (task.alternatives || []).map(alt => alt.toLowerCase());
    
    const isCorrect = userAnswer === expectedAnswer || alternatives.includes(userAnswer);
    
    if (isCorrect) {
      input.classList.add("correct");
      input.classList.remove("wrong");
      onCorrect(input.value);
    } else if (input.value !== "") {
      input.classList.add("wrong");
      input.classList.remove("correct");
    } else {
      input.classList.remove("correct", "wrong");
    }
  };

  input.addEventListener("input", validateAndSubmit);
  return input;
});