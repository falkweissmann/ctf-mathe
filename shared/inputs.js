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
  sortableContainer.style.flexDirection = "row";
  sortableContainer.style.flexWrap = "wrap";
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

  // Erstelle die sortierbaren Karten
  function renderItems(numbers) {
    sortableContainer.innerHTML = "";
    
    numbers.forEach((num, index) => {
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
          e.dataTransfer.setData("text/plain", num);
          card.style.opacity = "0.5";
          e.dataTransfer.effectAllowed = "move";
        });
        
        card.addEventListener("dragend", () => {
          if (draggedItem) {
            draggedItem.style.opacity = "1";
          }
          draggedItem = null;
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
          
          const newNumbers = [...numbers];
          const fromValue = parseInt(draggedItem.getAttribute("data-value"));
          const toValue = parseInt(card.getAttribute("data-value"));
          
          const fromIndex = newNumbers.indexOf(fromValue);
          const toIndex = newNumbers.indexOf(toValue);
          
          if (fromIndex !== -1 && toIndex !== -1 && fromIndex !== toIndex) {
            [newNumbers[fromIndex], newNumbers[toIndex]] = [newNumbers[toIndex], newNumbers[fromIndex]];
            renderItems(newNumbers);
          }
        });
      }
      
      sortableContainer.appendChild(card);
      
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

  if (isSolved) {
    checkButton.disabled = true;
    checkButton.style.background = "#4caf50";
    checkButton.textContent = "✓ Gelöst";
    const cards = sortableContainer.querySelectorAll(".sortable-card");
    cards.forEach(card => {
      card.setAttribute("draggable", false);
      card.style.cursor = "default";
    });
  }

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

  buttonContainer.appendChild(checkButton);
  
  container.appendChild(sortableContainer);
  container.appendChild(buttonContainer);
  container.appendChild(feedbackDiv);

  renderItems(shuffledNumbers);
  
  return container;
});
// --------------------
// GRID_FILL - Gitter ausfüllen (additiv oder multiplikativ)
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

  const solutionValues = task.answer.values;
  const givenValues = task.given || task.questionGrid || solutionValues.map(row => [...row]);
  const size = task.size || 3;
  const operation = task.operation || "additiv";
  const inputs = [];

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

  const table = document.createElement("table");
  table.style.borderCollapse = "collapse";
  table.style.margin = "0 auto";
  table.style.backgroundColor = "white";
  table.style.borderRadius = "8px";
  table.style.overflow = "hidden";
  table.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";

  let savedValues = null;
  if (initialValue && Array.isArray(initialValue)) {
    savedValues = initialValue;
  }

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
      
      const isEmpty = givenValue === null || 
                      givenValue === undefined || 
                      givenValue === "leer" || 
                      givenValue === "" ||
                      (typeof givenValue === "string" && givenValue.toLowerCase() === "leer");
      
      if (!isEmpty && !isSolved) {
        const displaySpan = document.createElement("span");
        displaySpan.textContent = givenValue;
        displaySpan.style.fontSize = "20px";
        displaySpan.style.fontWeight = "bold";
        displaySpan.style.color = "#333";
        td.appendChild(displaySpan);
        td.style.backgroundColor = "#e8f0fe";
        inputs.push(null);
        
      } else if (isSolved) {
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
        const input = document.createElement("input");
        input.type = "number";
        input.step = "any";
        input.style.width = "60px";
        input.style.padding = "8px";
        input.style.fontSize = "16px";
        input.style.textAlign = "center";
        input.style.borderRadius = "6px";
        input.style.border = "2px solid #ddd";
        
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

  function validateGrid() {
    const currentValues = getCurrentValues();
    let filledCount = 0;
    let correctCount = 0;
    
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
    return { allCorrect: allFilled, correctCount, wrongCount: filledCount - correctCount, filledCount };
  }

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

  if (isSolved) {
    checkButton.disabled = true;
    checkButton.style.background = "#4caf50";
    checkButton.textContent = "✓ Gelöst";
  }

  checkButton.onclick = () => {
    if (isSolved) return;
    
    const result = validateGrid();
    
    if (result.allCorrect && result.filledCount > 0) {
      feedbackDiv.innerHTML = `✅ Richtig! 🎉`;
      feedbackDiv.style.background = "#e8f5e9";
      feedbackDiv.style.color = "#2e7d32";
      
      for (const item of inputs) {
        if (item && item.input) {
          item.input.classList.add("correct");
          item.input.disabled = true;
        }
      }
      
      checkButton.disabled = true;
      checkButton.style.background = "#4caf50";
      checkButton.textContent = "✓ Gelöst";
      
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

  buttonContainer.appendChild(checkButton);
  container.appendChild(buttonContainer);
  container.appendChild(feedbackDiv);

  return container;
});
// --------------------
// SCALAR - Für Zahlen, Brüche und Listen (mit Bruch-Unterstützung) - MIT PRÜFBUTTON
// --------------------
registerInput("scalar", ({ task, onCorrect, initialValue, isSolved }) => {
  const container = document.createElement("div");
  container.style.display = "flex";
  container.style.flexDirection = "column";
  container.style.gap = "8px";
  container.style.alignItems = "flex-end";
  container.style.marginTop = "10px";
  container.style.padding = "10px";
  container.style.background = "#f9f9f9";
  container.style.borderRadius = "8px";
  container.style.border = "1px solid #e0e0e0";

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

  function parseFraction(value) {
    if (typeof value !== 'string') return value;
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

  function normalizeValue(value) {
    if (typeof value === 'number') return value;
    if (typeof value === 'string') {
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
      return parseFloat(value.replace(",", "."));
    }
    return NaN;
  }

  const feedbackDiv = document.createElement("div");
  feedbackDiv.style.fontSize = "12px";
  feedbackDiv.style.textAlign = "center";
  feedbackDiv.style.padding = "6px";
  feedbackDiv.style.borderRadius = "6px";
  feedbackDiv.style.marginTop = "5px";

  const checkButton = document.createElement("button");
  checkButton.textContent = "✓ Prüfen";
  checkButton.style.padding = "8px 20px";
  checkButton.style.fontSize = "13px";
  checkButton.style.fontWeight = "bold";
  checkButton.style.cursor = "pointer";
  checkButton.style.background = "#667eea";
  checkButton.style.color = "white";
  checkButton.style.border = "none";
  checkButton.style.borderRadius = "20px";

  if (isSolved) {
    checkButton.disabled = true;
    checkButton.style.background = "#4caf50";
    checkButton.textContent = "✓ Gelöst";
  }

  const validateInput = () => {
    if (isSolved || input.disabled) return;

    const rawValue = input.value.trim();
    if (rawValue === "") {
      feedbackDiv.innerHTML = "⚠️ Bitte eine Antwort eingeben";
      feedbackDiv.style.background = "#fff3e0";
      feedbackDiv.style.color = "#ff9800";
      input.classList.remove("correct", "wrong");
      return;
    }

    let expectedAnswers = [];
    if (Array.isArray(task.answer)) {
      expectedAnswers = [...task.answer];
    } else {
      expectedAnswers = [task.answer];
    }
    
    const normalizedExpected = expectedAnswers.map(ans => normalizeValue(ans)).sort((a, b) => a - b);
    
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
      checkButton.disabled = true;
      checkButton.style.background = "#4caf50";
      checkButton.textContent = "✓ Gelöst";
      feedbackDiv.innerHTML = "✅ Richtig! 🎉";
      feedbackDiv.style.background = "#e8f5e9";
      feedbackDiv.style.color = "#2e7d32";
      onCorrect(rawValue);
    } else {
      input.classList.add("wrong");
      input.classList.remove("correct");
      feedbackDiv.innerHTML = "❌ Falsch! Versuche es noch einmal.";
      feedbackDiv.style.background = "#ffebee";
      feedbackDiv.style.color = "#c62828";
      
      setTimeout(() => {
        if (!isSolved && !input.disabled) {
          input.classList.remove("wrong");
          feedbackDiv.innerHTML = "";
          feedbackDiv.style.background = "";
        }
      }, 2000);
    }
  };

  checkButton.onclick = validateInput;
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      validateInput();
    }
  });

  container.appendChild(input);
  container.appendChild(checkButton);
  container.appendChild(feedbackDiv);
  
  return container;
});
// --------------------
// VECTOR - Mit Prüf-Button
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
  bottomContainer.style.justifyContent = "flex-end";
  bottomContainer.style.alignItems = "center";
  bottomContainer.style.marginTop = "8px";

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

  if (isSolved) {
    checkButton.disabled = true;
    checkButton.style.background = "#4caf50";
    checkButton.textContent = "✓ Gelöst";
  }

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
// VECTOR_CHECK - Mit Checkbox für "nicht möglich"
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

  const feedbackDiv = document.createElement("div");
  feedbackDiv.style.fontSize = "12px";
  feedbackDiv.style.marginTop = "5px";
  feedbackDiv.style.textAlign = "right";
  feedbackDiv.style.minHeight = "30px";

  const checkButton = document.createElement("button");
  checkButton.textContent = "✓ Antwort prüfen";
  checkButton.style.padding = "8px 16px";
  checkButton.style.fontSize = "14px";
  checkButton.style.cursor = "pointer";
  checkButton.style.background = "#667eea";
  checkButton.style.color = "white";
  checkButton.style.border = "none";
  checkButton.style.borderRadius = "5px";

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
  
  container.appendChild(checkButton);
  container.appendChild(feedbackDiv);

  if (isSolved) {
    checkButton.disabled = true;
    checkButton.style.background = "#4caf50";
    checkButton.textContent = "✓ Gelöst";
    impossibleCheckbox.disabled = true;
  }

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
        checkButton.disabled = true;
        checkButton.style.background = "#4caf50";
        checkButton.textContent = "✓ Gelöst";
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
      checkButton.disabled = true;
      checkButton.style.background = "#4caf50";
      checkButton.textContent = "✓ Gelöst";
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
        feedbackDiv.innerHTML = `❌ Falsch: ${wrongFields.join(", ")} sind nicht korrekt.`;
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
  bottomContainer.style.justifyContent = "flex-end";
  bottomContainer.style.alignItems = "center";
  bottomContainer.style.marginTop = "15px";

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

  if (isSolved) {
    checkButton.disabled = true;
    checkButton.style.background = "#4caf50";
    checkButton.textContent = "✓ Gelöst";
  }

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
  bottomContainer.style.justifyContent = "flex-end";
  bottomContainer.style.alignItems = "center";
  bottomContainer.style.marginTop = "8px";

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

  if (isSolved) {
    checkButton.disabled = true;
    checkButton.style.background = "#4caf50";
    checkButton.textContent = "✓ Gelöst";
  }

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
      checkButton.disabled = true;
      checkButton.style.background = "#4caf50";
      checkButton.textContent = "✓ Gelöst";
      
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
// ROOTS & INTERCEPT (Nullstellen und y-Achsenabschnitt) - MIT PRÜFBUTTON
// --------------------
registerInput("roots_intercept", ({ task, onCorrect, initialValue, isSolved }) => {
  const container = document.createElement("div");
  container.className = "roots-input";
  container.style.display = "flex";
  container.style.flexDirection = "column";
  container.style.gap = "12px";
  container.style.marginTop = "10px";
  container.style.padding = "15px";
  container.style.background = "#f9f9f9";
  container.style.borderRadius = "8px";
  container.style.border = "1px solid #e0e0e0";
  
  const nullstellenDiv = document.createElement("div");
  nullstellenDiv.style.display = "flex";
  nullstellenDiv.style.alignItems = "center";
  nullstellenDiv.style.gap = "10px";
  nullstellenDiv.style.justifyContent = "flex-end";
  nullstellenDiv.innerHTML = "<strong>Nullstellen:</strong> ";
  
  const nullstellenInput = document.createElement("input");
  nullstellenInput.type = "text";
  nullstellenInput.placeholder = "z.B. -12,-1,4 oder 'keine'";
  nullstellenInput.style.width = "200px";
  nullstellenInput.style.padding = "8px";
  nullstellenInput.style.borderRadius = "4px";
  nullstellenInput.style.border = "1px solid #ccc";
  
  const yachsenDiv = document.createElement("div");
  yachsenDiv.style.display = "flex";
  yachsenDiv.style.alignItems = "center";
  yachsenDiv.style.gap = "10px";
  yachsenDiv.style.justifyContent = "flex-end";
  yachsenDiv.innerHTML = "<strong>y-Achsenabschnitt:</strong> ";
  
  const yachsenInput = document.createElement("input");
  yachsenInput.type = "number";
  yachsenInput.placeholder = "z.B. 5";
  yachsenInput.style.width = "100px";
  yachsenInput.style.padding = "8px";
  yachsenInput.style.borderRadius = "4px";
  yachsenInput.style.border = "1px solid #ccc";
  
  nullstellenDiv.appendChild(nullstellenInput);
  yachsenDiv.appendChild(yachsenInput);
  container.appendChild(nullstellenDiv);
  container.appendChild(yachsenDiv);
  
  const feedbackDiv = document.createElement("div");
  feedbackDiv.style.fontSize = "12px";
  feedbackDiv.style.padding = "6px";
  feedbackDiv.style.borderRadius = "6px";
  feedbackDiv.style.marginTop = "5px";
  feedbackDiv.style.textAlign = "center";
  
  const checkButton = document.createElement("button");
  checkButton.textContent = "✓ Prüfen";
  checkButton.style.padding = "8px 20px";
  checkButton.style.fontSize = "14px";
  checkButton.style.cursor = "pointer";
  checkButton.style.background = "#667eea";
  checkButton.style.color = "white";
  checkButton.style.border = "none";
  checkButton.style.borderRadius = "20px";
  checkButton.style.marginTop = "10px";
  checkButton.style.alignSelf = "flex-end";
  
  if (isSolved) {
    if (initialValue) {
      if (initialValue.nullstellen) {
        nullstellenInput.value = Array.isArray(initialValue.nullstellen) 
          ? initialValue.nullstellen.join(",") 
          : initialValue.nullstellen;
      }
      if (initialValue.yachsenabschnitt !== undefined) {
        yachsenInput.value = initialValue.yachsenabschnitt;
      }
    }
    nullstellenInput.disabled = true;
    yachsenInput.disabled = true;
    checkButton.disabled = true;
    checkButton.style.background = "#4caf50";
    checkButton.textContent = "✓ Gelöst";
  }
  
  const validate = () => {
    if (isSolved || nullstellenInput.disabled) return;
    
    let nullstellenRaw = nullstellenInput.value.trim();
    let yachsenabschnitt = parseFloat(yachsenInput.value);
    
    let nullstellenArray = [];
    if (nullstellenRaw.toLowerCase() === "keine" || nullstellenRaw === "") {
      nullstellenArray = [];
    } else {
      nullstellenArray = nullstellenRaw.split(",").map(n => parseFloat(n.trim())).filter(n => !isNaN(n));
    }
    nullstellenArray.sort((a, b) => a - b);
    
    const expectedNull = task.answer.nullstellen;
    const expectedY = task.answer.yachsenabschnitt;
    
    const expectedNullSorted = [...expectedNull].sort((a, b) => a - b);
    
    const nullstellenOk = nullstellenArray.length === expectedNullSorted.length && 
                          nullstellenArray.every((v, i) => Math.abs(v - expectedNullSorted[i]) < 0.01);
    const yachsenOk = !isNaN(yachsenabschnitt) && Math.abs(yachsenabschnitt - expectedY) < 0.01;
    
    if (!nullstellenRaw && isNaN(yachsenabschnitt)) {
      feedbackDiv.innerHTML = "⚠️ Bitte beide Felder ausfüllen";
      feedbackDiv.style.background = "#fff3e0";
      feedbackDiv.style.color = "#ff9800";
      return;
    }
    
    if (nullstellenOk && yachsenOk) {
      nullstellenInput.classList.add("correct");
      yachsenInput.classList.add("correct");
      nullstellenInput.classList.remove("wrong");
      yachsenInput.classList.remove("wrong");
      nullstellenInput.disabled = true;
      yachsenInput.disabled = true;
      checkButton.disabled = true;
      checkButton.style.background = "#4caf50";
      checkButton.textContent = "✓ Gelöst";
      feedbackDiv.innerHTML = "✅ Richtig! 🎉";
      feedbackDiv.style.background = "#e8f5e9";
      feedbackDiv.style.color = "#2e7d32";
      onCorrect({ nullstellen: nullstellenArray, yachsenabschnitt: yachsenabschnitt });
    } else {
      if (!nullstellenOk) nullstellenInput.classList.add("wrong");
      else nullstellenInput.classList.remove("wrong");
      if (!yachsenOk) yachsenInput.classList.add("wrong");
      else yachsenInput.classList.remove("wrong");
      feedbackDiv.innerHTML = "❌ Falsch! Versuche es noch einmal.";
      feedbackDiv.style.background = "#ffebee";
      feedbackDiv.style.color = "#c62828";
      
      setTimeout(() => {
        if (!isSolved) {
          nullstellenInput.classList.remove("wrong");
          yachsenInput.classList.remove("wrong");
          feedbackDiv.innerHTML = "";
        }
      }, 2000);
    }
  };
  
  checkButton.onclick = validate;
  nullstellenInput.addEventListener("keypress", (e) => { if (e.key === "Enter") validate(); });
  yachsenInput.addEventListener("keypress", (e) => { if (e.key === "Enter") validate(); });
  
  container.appendChild(checkButton);
  container.appendChild(feedbackDiv);
  
  return container;
});

// --------------------
// ROOTS (nur Nullstellen) - MIT PRÜFBUTTON
// --------------------
registerInput("roots", ({ task, onCorrect, initialValue, isSolved }) => {
  const container = document.createElement("div");
  container.style.display = "flex";
  container.style.flexDirection = "column";
  container.style.gap = "8px";
  container.style.marginTop = "10px";
  container.style.padding = "10px";
  container.style.background = "#f9f9f9";
  container.style.borderRadius = "8px";
  container.style.border = "1px solid #e0e0e0";
  
  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "z.B. -1,0,2";
  input.style.width = "100%";
  input.style.padding = "8px";
  input.style.borderRadius = "4px";
  input.style.border = "1px solid #ccc";
  
  const feedbackDiv = document.createElement("div");
  feedbackDiv.style.fontSize = "12px";
  feedbackDiv.style.padding = "6px";
  feedbackDiv.style.borderRadius = "6px";
  feedbackDiv.style.textAlign = "center";
  
  const checkButton = document.createElement("button");
  checkButton.textContent = "✓ Prüfen";
  checkButton.style.padding = "6px 18px";
  checkButton.style.fontSize = "13px";
  checkButton.style.cursor = "pointer";
  checkButton.style.background = "#667eea";
  checkButton.style.color = "white";
  checkButton.style.border = "none";
  checkButton.style.borderRadius = "20px";
  checkButton.style.alignSelf = "flex-end";
  
  if (isSolved && initialValue) {
    input.value = Array.isArray(initialValue) ? initialValue.join(", ") : initialValue;
    input.disabled = true;
    checkButton.disabled = true;
    checkButton.style.background = "#4caf50";
    checkButton.textContent = "✓ Gelöst";
  }
  
  const validate = () => {
    if (isSolved || input.disabled) return;
    
    const rawValue = input.value.trim();
    if (rawValue === "") {
      feedbackDiv.innerHTML = "⚠️ Bitte Nullstellen eingeben";
      feedbackDiv.style.background = "#fff3e0";
      feedbackDiv.style.color = "#ff9800";
      return;
    }
    
    const values = rawValue.split(",").map(v => parseFloat(v.trim())).filter(v => !isNaN(v));
    values.sort((a, b) => a - b);
    const expected = task.answer.nullstellen;
    const expectedSorted = [...expected].sort((a, b) => a - b);
    
    const isCorrect = values.length === expectedSorted.length && 
                      values.every((v, i) => Math.abs(v - expectedSorted[i]) < 0.01);
    
    if (isCorrect) {
      input.classList.add("correct");
      input.classList.remove("wrong");
      input.disabled = true;
      checkButton.disabled = true;
      checkButton.style.background = "#4caf50";
      checkButton.textContent = "✓ Gelöst";
      feedbackDiv.innerHTML = "✅ Richtig! 🎉";
      feedbackDiv.style.background = "#e8f5e9";
      feedbackDiv.style.color = "#2e7d32";
      onCorrect(values);
    } else {
      input.classList.add("wrong");
      input.classList.remove("correct");
      feedbackDiv.innerHTML = "❌ Falsch! Versuche es noch einmal.";
      feedbackDiv.style.background = "#ffebee";
      feedbackDiv.style.color = "#c62828";
      
      setTimeout(() => {
        if (!isSolved) {
          input.classList.remove("wrong");
          feedbackDiv.innerHTML = "";
        }
      }, 2000);
    }
  };
  
  checkButton.onclick = validate;
  input.addEventListener("keypress", (e) => { if (e.key === "Enter") validate(); });
  
  container.appendChild(input);
  container.appendChild(checkButton);
  container.appendChild(feedbackDiv);
  
  return container;
});

// --------------------
// FUNCTION (für Ableitungen) - MIT PRÜFBUTTON
// --------------------
registerInput("function", ({ task, onCorrect, initialValue, isSolved }) => {
  const container = document.createElement("div");
  container.style.display = "flex";
  container.style.flexDirection = "column";
  container.style.gap = "8px";
  container.style.marginTop = "10px";
  container.style.padding = "10px";
  container.style.background = "#f9f9f9";
  container.style.borderRadius = "8px";
  container.style.border = "1px solid #e0e0e0";
  
  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "z.B. 3x^2+2x";
  input.style.width = "100%";
  input.style.padding = "8px";
  input.style.borderRadius = "4px";
  input.style.border = "1px solid #ccc";
  
  const feedbackDiv = document.createElement("div");
  feedbackDiv.style.fontSize = "12px";
  feedbackDiv.style.padding = "6px";
  feedbackDiv.style.borderRadius = "6px";
  feedbackDiv.style.textAlign = "center";
  
  const checkButton = document.createElement("button");
  checkButton.textContent = "✓ Prüfen";
  checkButton.style.padding = "6px 18px";
  checkButton.style.fontSize = "13px";
  checkButton.style.cursor = "pointer";
  checkButton.style.background = "#667eea";
  checkButton.style.color = "white";
  checkButton.style.border = "none";
  checkButton.style.borderRadius = "20px";
  checkButton.style.alignSelf = "flex-end";
  
  if (isSolved && initialValue) {
    input.value = initialValue;
    input.disabled = true;
    checkButton.disabled = true;
    checkButton.style.background = "#4caf50";
    checkButton.textContent = "✓ Gelöst";
  }
  
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
    if (isSolved || input.disabled) return;
    
    const rawValue = input.value.trim();
    if (rawValue === "") {
      feedbackDiv.innerHTML = "⚠️ Bitte eine Funktion eingeben";
      feedbackDiv.style.background = "#fff3e0";
      feedbackDiv.style.color = "#ff9800";
      return;
    }
    
    const userFunc = normalizeFunction(rawValue);
    const expected = normalizeFunction(task.answer.loesung);
    const alternatives = (task.answer.alternativen || []).map(normalizeFunction);
    
    const isCorrect = userFunc === expected || alternatives.includes(userFunc);
    
    if (isCorrect) {
      input.classList.add("correct");
      input.classList.remove("wrong");
      input.disabled = true;
      checkButton.disabled = true;
      checkButton.style.background = "#4caf50";
      checkButton.textContent = "✓ Gelöst";
      feedbackDiv.innerHTML = "✅ Richtig! 🎉";
      feedbackDiv.style.background = "#e8f5e9";
      feedbackDiv.style.color = "#2e7d32";
      onCorrect(rawValue);
    } else {
      input.classList.add("wrong");
      input.classList.remove("correct");
      feedbackDiv.innerHTML = "❌ Falsch! Versuche es noch einmal.";
      feedbackDiv.style.background = "#ffebee";
      feedbackDiv.style.color = "#c62828";
      
      setTimeout(() => {
        if (!isSolved) {
          input.classList.remove("wrong");
          feedbackDiv.innerHTML = "";
        }
      }, 2000);
    }
  };
  
  checkButton.onclick = validate;
  input.addEventListener("keypress", (e) => { if (e.key === "Enter") validate(); });
  
  container.appendChild(input);
  container.appendChild(checkButton);
  container.appendChild(feedbackDiv);
  
  return container;
});

// --------------------
// CODE - Für Lehrer-Codes
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
      input.disabled = true;
      verifyBtn.disabled = true;
      onCorrect(userCode);
    } else if (userCode.length > 0) {
      input.classList.add("wrong");
      input.classList.remove("correct");
      messageDiv.innerHTML = "❌ Falscher Code. Bitte versuchen Sie es erneut!";
      messageDiv.style.color = "#c62828";
      
      setTimeout(() => {
        if (!isSolved) {
          input.classList.remove("wrong");
          messageDiv.innerHTML = task.answer.message || "✏️ Bitte geben Sie den Code von Ihrer Lehrkraft ein.";
          messageDiv.style.color = "#666";
        }
      }, 2000);
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
// POINT - Mit Prüf-Button
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
  bottomContainer.style.justifyContent = "flex-end";
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

  if (isSolved) {
    checkButton.disabled = true;
    checkButton.style.background = "#4caf50";
    checkButton.textContent = "✓ Gelöst";
  }

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
// SET - Für Ergebnismengen (Mengenlehre) - MIT PRÜFBUTTON
// --------------------
registerInput("set", ({ task, onCorrect, initialValue, isSolved }) => {
  const container = document.createElement("div");
  container.style.display = "flex";
  container.style.flexDirection = "column";
  container.style.gap = "8px";
  container.style.alignItems = "flex-end";
  container.style.marginTop = "10px";
  container.style.padding = "10px";
  container.style.background = "#f9f9f9";
  container.style.borderRadius = "8px";
  container.style.border = "1px solid #e0e0e0";
  container.style.width = "100%";

  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = task.placeholder || "z.B. {1,2,3} oder 1,2,3 oder leere Menge";
  input.style.width = "100%";
  input.style.padding = "10px";
  input.style.fontSize = "16px";
  input.style.fontFamily = "monospace";
  input.style.textAlign = "left";
  input.style.borderRadius = "4px";
  input.style.border = "1px solid #ccc";

  if (initialValue) {
    input.value = initialValue;
  }

  if (isSolved) {
    input.disabled = true;
    input.classList.add("solved-input");
  }

  const feedbackDiv = document.createElement("div");
  feedbackDiv.style.fontSize = "12px";
  feedbackDiv.style.padding = "6px";
  feedbackDiv.style.borderRadius = "6px";
  feedbackDiv.style.marginTop = "5px";
  feedbackDiv.style.textAlign = "center";

  const checkButton = document.createElement("button");
  checkButton.textContent = "✓ Prüfen";
  checkButton.style.padding = "8px 20px";
  checkButton.style.fontSize = "13px";
  checkButton.style.fontWeight = "bold";
  checkButton.style.cursor = "pointer";
  checkButton.style.background = "#667eea";
  checkButton.style.color = "white";
  checkButton.style.border = "none";
  checkButton.style.borderRadius = "20px";
  checkButton.style.alignSelf = "flex-end";

  if (isSolved) {
    checkButton.disabled = true;
    checkButton.style.background = "#4caf50";
    checkButton.textContent = "✓ Gelöst";
  }

  function normalizeSet(inputStr) {
    if (!inputStr || inputStr.trim() === "") return null;
    
    let cleaned = inputStr.trim();
    
    if (cleaned === "∅" || 
        cleaned === "{}" || 
        cleaned === "{ }" || 
        cleaned === "leere Menge" || 
        cleaned === "leer" ||
        cleaned === "keine" ||
        cleaned === "nichts") {
      return [];
    }
    
    if (cleaned.startsWith("{") && cleaned.endsWith("}")) {
      cleaned = cleaned.slice(1, -1).trim();
    }
    
    if (cleaned === "") {
      return [];
    }
    
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
        const fractionParts = trimmed.split("/");
        if (fractionParts.length === 2) {
          const numerator = parseFloat(fractionParts[0].trim());
          const denominator = parseFloat(fractionParts[1].trim());
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
    if (set1 === null || set2 === null) return false;
    if (set1.length !== set2.length) return false;
    
    for (let i = 0; i < set1.length; i++) {
      if (Math.abs(set1[i] - set2[i]) > tolerance) {
        return false;
      }
    }
    return true;
  }

  const validateInput = () => {
    if (isSolved || input.disabled) return;

    const rawValue = input.value.trim();
    if (rawValue === "") {
      feedbackDiv.innerHTML = "⚠️ Bitte eine Menge eingeben";
      feedbackDiv.style.background = "#fff3e0";
      feedbackDiv.style.color = "#ff9800";
      input.classList.remove("correct", "wrong");
      return;
    }

    let expectedSet;
    if (Array.isArray(task.answer)) {
      expectedSet = [...task.answer].sort((a, b) => a - b);
    } else if (typeof task.answer === 'object' && task.answer.values) {
      expectedSet = [...task.answer.values].sort((a, b) => a - b);
    } else {
      expectedSet = normalizeSet(String(task.answer));
    }
    
    const userSet = normalizeSet(rawValue);
    
    if (userSet === null) {
      feedbackDiv.innerHTML = "❌ Ungültiges Format";
      feedbackDiv.style.background = "#ffebee";
      feedbackDiv.style.color = "#c62828";
      input.classList.add("wrong");
      input.classList.remove("correct");
      return;
    }
    
    const tolerance = task.tolerance || 0.001;
    const isCorrect = setsAreEqual(userSet, expectedSet, tolerance);
    
    if (isCorrect) {
      input.classList.add("correct");
      input.classList.remove("wrong");
      input.disabled = true;
      checkButton.disabled = true;
      checkButton.style.background = "#4caf50";
      checkButton.textContent = "✓ Gelöst";
      feedbackDiv.innerHTML = "✅ Richtig! 🎉";
      feedbackDiv.style.background = "#e8f5e9";
      feedbackDiv.style.color = "#2e7d32";
      onCorrect(rawValue);
    } else {
      input.classList.add("wrong");
      input.classList.remove("correct");
      feedbackDiv.innerHTML = "❌ Falsch! Versuche es noch einmal.";
      feedbackDiv.style.background = "#ffebee";
      feedbackDiv.style.color = "#c62828";
      
      setTimeout(() => {
        if (!isSolved && !input.disabled) {
          input.classList.remove("wrong");
          feedbackDiv.innerHTML = "";
          feedbackDiv.style.background = "";
        }
      }, 2000);
    }
  };

  checkButton.onclick = validateInput;
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      validateInput();
    }
  });

  container.appendChild(input);
  container.appendChild(checkButton);
  container.appendChild(feedbackDiv);
  
  return container;
});
// --------------------
// PROBABILITY - Wahrscheinlichkeit mit Ergebnismenge
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

  const fields = task.fields || ["set", "fraction", "decimal", "percent"];
  const expected = task.answer;
  const inputs = {};

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
    
    if (cleaned === "∅" || cleaned === "{}" || cleaned === "{ }" || 
        cleaned === "leere Menge" || cleaned === "leer" || cleaned === "keine") {
      return [];
    }
    
    if (cleaned.startsWith("{") && cleaned.endsWith("}")) {
      cleaned = cleaned.slice(1, -1).trim();
    }
    
    if (cleaned === "") return [];
    
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

    const labelSpan = document.createElement("span");
    labelSpan.innerHTML = `<strong>${label}</strong>`;
    labelSpan.style.minWidth = "130px";
    labelSpan.style.fontSize = "14px";
    
    if (initialValue && initialValue[field] !== undefined) {
      input.value = initialValue[field];
    }
    
    if (isSolved) {
      input.disabled = true;
      input.classList.add("solved-input");
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
  checkButton.style.alignSelf = "center";

  if (isSolved) {
    checkButton.disabled = true;
    checkButton.style.background = "#4caf50";
    checkButton.textContent = "✓ Gelöst";
  }

  checkButton.onclick = () => {
    if (isSolved) return;
    
    let errorCount = 0;
    const totalFields = Object.keys(inputs).length;
    const results = {};
    
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
      
      for (const key in inputs) {
        inputs[key].input.disabled = true;
      }
      
      checkButton.disabled = true;
      checkButton.style.background = "#4caf50";
      checkButton.textContent = "✓ Gelöst";
      
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
      
      setTimeout(() => {
        if (!isSolved) {
          for (const key in inputs) {
            inputs[key].input.classList.remove("wrong");
          }
        }
      }, 2000);
    }
  };

  container.appendChild(checkButton);
  container.appendChild(feedbackDiv);

  return container;
});
// --------------------
// PAIR_MATCH - Drag & Drop Paare zuordnen (2 oder 3 Spalten)
// Beim Verbinden wird die Ziel-Karte mit der Karte in der Quell-Zeile getauscht
// Beim Prüfen werden nur falsche Verbindungen zurückgesetzt
// --------------------
registerInput("pair_match", ({ task, onCorrect, initialValue, isSolved }) => {
  const container = document.createElement("div");
  container.className = "pair-match-container";
  container.style.display = "flex";
  container.style.flexDirection = "column";
  container.style.gap = "20px";
  container.style.marginTop = "10px";
  container.style.padding = "15px";
  container.style.background = "#f9f9f9";
  container.style.borderRadius = "12px";
  container.style.border = "1px solid #e0e0e0";
  container.style.position = "relative";

  // Konfiguration
  const numColumns = task.numColumns || 2;
  const pairs = task.pairs || [];
  
  // Normalisiere pairs
  const normalizedPairs = pairs.map((pair, idx) => ({
    id: idx,
    left: pair.left,
    middle: pair.middle || null,
    right: pair.right,
    leftId: `left_${idx}`,
    middleId: `middle_${idx}`,
    rightId: `right_${idx}`
  }));

  // Spalten-Definitionen
  const columns = [];
  if (numColumns === 2) {
    columns.push(
      { key: 'left', title: task.leftTitle || "📦 Spalte 1", color: "#667eea", bgColor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" },
      { key: 'right', title: task.rightTitle || "🔗 Spalte 2", color: "#4caf50", bgColor: "linear-gradient(135deg, #4caf50 0%, #45a049 100%)" }
    );
  } else {
    columns.push(
      { key: 'left', title: task.leftTitle || "📦 Ausgeklammert", color: "#667eea", bgColor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" },
      { key: 'middle', title: task.middleTitle || "🔄 Ausmultipliziert", color: "#ff9800", bgColor: "linear-gradient(135deg, #ff9800 0%, #f57c00 100%)" },
      { key: 'right', title: task.rightTitle || "🔗 Ergebnis", color: "#4caf50", bgColor: "linear-gradient(135deg, #4caf50 0%, #45a049 100%)" }
    );
  }

  // Items für jede Spalte - als Array (Reihenfolge = Zeilen)
  let columnItems = {
    left: [],
    middle: [],
    right: []
  };

  normalizedPairs.forEach(pair => {
    columnItems.left.push({
      id: pair.leftId,
      pairId: pair.id,
      text: pair.left,
      column: 'left',
      connectedTo: null,
      connectedFrom: null
    });
    
    if (numColumns === 3 && pair.middle) {
      columnItems.middle.push({
        id: pair.middleId,
        pairId: pair.id,
        text: pair.middle,
        column: 'middle',
        connectedTo: null,
        connectedFrom: null
      });
    }
    
    columnItems.right.push({
      id: pair.rightId,
      pairId: pair.id,
      text: pair.right,
      column: 'right',
      connectedTo: null,
      connectedFrom: null
    });
  });

  // Verbindungen speichern
  let connections = [];
  let showErrors = false;

  // Lade gespeicherte Verbindungen
  if (initialValue && typeof initialValue === 'object') {
    if (initialValue.connections) {
      connections = initialValue.connections;
    }
    if (initialValue.columnItems) {
      columnItems = initialValue.columnItems;
    }
    // Stelle Verbindungen in Items wieder her
    connections.forEach(conn => {
      const fromItem = findItemById(conn.fromId);
      const toItem = findItemById(conn.toId);
      if (fromItem) fromItem.connectedTo = conn.toId;
      if (toItem) toItem.connectedFrom = conn.fromId;
    });
  }

  // Mische die Reihenfolge (nur initial)
  function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  if (!isSolved && (!initialValue || Object.keys(initialValue).length === 0)) {
    columnItems.left = shuffleArray([...columnItems.left]);
    if (numColumns === 3) columnItems.middle = shuffleArray([...columnItems.middle]);
    columnItems.right = shuffleArray([...columnItems.right]);
  }

  function findItemById(id) {
    for (const col of ['left', 'middle', 'right']) {
      const found = columnItems[col].find(item => item.id === id);
      if (found) return found;
    }
    return null;
  }

  function findItemByPairIdAndColumn(pairId, column) {
    return columnItems[column].find(item => item.pairId === pairId);
  }

  function findItemIndex(column, pairId) {
    return columnItems[column].findIndex(item => item.pairId === pairId);
  }

  function swapItems(column, indexA, indexB) {
    if (indexA === indexB) return;
    [columnItems[column][indexA], columnItems[column][indexB]] = 
    [columnItems[column][indexB], columnItems[column][indexA]];
  }

  function isFullyConnected(item) {
    if (numColumns === 2) {
      if (item.column === 'left') return item.connectedTo !== null;
      if (item.column === 'right') return item.connectedFrom !== null;
      return false;
    } else {
      if (item.column === 'left') return item.connectedTo !== null;
      if (item.column === 'middle') return item.connectedFrom !== null && item.connectedTo !== null;
      if (item.column === 'right') return item.connectedFrom !== null;
      return false;
    }
  }

  function canBeDragged(item) {
    if (isSolved) return false;
    if (item.column === 'right') return false;
    if (numColumns === 3 && item.column === 'middle') {
      return item.connectedFrom !== null && item.connectedTo === null;
    }
    return item.connectedTo === null;
  }

  function canBeDropTarget(item, fromColumn) {
    if (isSolved) return false;
    if (isFullyConnected(item)) return false;
    
    if (fromColumn === 'left' && item.column === 'middle') {
      return item.connectedFrom === null;
    }
    if (fromColumn === 'middle' && item.column === 'right') {
      return item.connectedFrom === null;
    }
    return false;
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
  instruction.innerHTML = task.instruction || "🎯 Ziehe die Karten in die richtige Reihenfolge!";
  container.appendChild(instruction);

  // Container für die Spalten
  const columnsContainer = document.createElement("div");
  columnsContainer.style.display = "flex";
  columnsContainer.style.gap = "20px";
  columnsContainer.style.justifyContent = "center";
  columnsContainer.style.flexWrap = "wrap";
  columnsContainer.style.position = "relative";

  const listElements = {};

  // Erstelle Spalten
  columns.forEach(col => {
    const columnDiv = document.createElement("div");
    columnDiv.className = `match-column ${col.key}-column`;
    columnDiv.style.flex = "1";
    columnDiv.style.minWidth = "200px";
    columnDiv.style.background = "white";
    columnDiv.style.borderRadius = "8px";
    columnDiv.style.padding = "10px";
    columnDiv.style.border = `2px solid ${col.color}`;
    columnDiv.style.position = "relative";
    
    const title = document.createElement("div");
    title.style.textAlign = "center";
    title.style.fontWeight = "bold";
    title.style.padding = "8px";
    title.style.background = col.color;
    title.style.color = "white";
    title.style.borderRadius = "6px";
    title.style.marginBottom = "10px";
    title.innerHTML = col.title;
    columnDiv.appendChild(title);
    
    const list = document.createElement("div");
    list.className = `match-list ${col.key}-list`;
    list.style.display = "flex";
    list.style.flexDirection = "column";
    list.style.gap = "10px";
    list.style.minHeight = "300px";
    list.style.position = "relative";
    columnDiv.appendChild(list);
    
    columnsContainer.appendChild(columnDiv);
    listElements[col.key] = list;
  });
  
  container.appendChild(columnsContainer);

  // Canvas für Verbindungslinien
  const canvas = document.createElement("canvas");
  canvas.style.position = "absolute";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.style.pointerEvents = "none";
  canvas.style.zIndex = "10";
  container.style.position = "relative";
  container.appendChild(canvas);

  function drawLines() {
    if (!canvas || !canvas.getContext) return;
    
    const rect = container.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    
    canvas.width = rect.width;
    canvas.height = rect.height;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    connections.forEach(conn => {
      const fromElement = document.querySelector(`.match-card[data-id="${conn.fromId}"]`);
      const toElement = document.querySelector(`.match-card[data-id="${conn.toId}"]`);
      
      if (fromElement && toElement) {
        const fromRect = fromElement.getBoundingClientRect();
        const toRect = toElement.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        
        const fromX = fromRect.right - containerRect.left - 5;
        const fromY = (fromRect.top + fromRect.bottom) / 2 - containerRect.top;
        const toX = toRect.left - containerRect.left + 5;
        const toY = (toRect.top + toRect.bottom) / 2 - containerRect.top;
        
        let lineColor = "#4caf50";
        if (showErrors && conn.isWrong) {
          lineColor = "#f44336";
        }
        
        ctx.beginPath();
        ctx.moveTo(fromX, fromY);
        ctx.lineTo(toX, toY);
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = 3;
        ctx.stroke();
        
        // Endpunkt
        ctx.beginPath();
        ctx.arc(toX, toY, 6, 0, 2 * Math.PI);
        ctx.fillStyle = lineColor;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(toX, toY, 3, 0, 2 * Math.PI);
        ctx.fillStyle = "white";
        ctx.fill();
        
        // Startpunkt
        ctx.beginPath();
        ctx.arc(fromX, fromY, 6, 0, 2 * Math.PI);
        ctx.fillStyle = lineColor;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(fromX, fromY, 3, 0, 2 * Math.PI);
        ctx.fillStyle = "white";
        ctx.fill();
      }
    });
  }

  let draggedItem = null;
  let draggedColumn = null;
  let draggedRow = null;

  function renderItems() {
    for (const col of ['left', 'middle', 'right']) {
      if (listElements[col]) {
        listElements[col].innerHTML = "";
      }
    }
    
    columnItems.left.forEach((item, idx) => {
      renderCard(item, listElements.left, columns[0].bgColor, idx);
    });
    
    if (numColumns === 3) {
      columnItems.middle.forEach((item, idx) => {
        renderCard(item, listElements.middle, columns[1].bgColor, idx);
      });
    }
    
    columnItems.right.forEach((item, idx) => {
      renderCard(item, listElements.right, columns[numColumns-1].bgColor, idx);
    });
    
    setTimeout(drawLines, 50);
  }
  
  function renderCard(item, listEl, bgGradient, rowIndex) {
    const connected = isFullyConnected(item);
    const draggable = canBeDragged(item);
    
    const card = document.createElement("div");
    card.className = `match-card ${item.column}-card`;
    card.setAttribute("data-id", item.id);
    card.setAttribute("data-pair-id", item.pairId);
    card.setAttribute("data-column", item.column);
    card.setAttribute("data-row", rowIndex);
    card.setAttribute("draggable", draggable);
    
    if (connected) {
      card.style.background = "#e8f5e9";
      card.style.color = "#2e7d32";
      card.style.border = "2px solid #a5d6a7";
    } else {
      card.style.background = bgGradient;
      card.style.color = "white";
      card.style.border = "none";
    }
    
    card.style.padding = "12px";
    card.style.borderRadius = "8px";
    card.style.cursor = draggable ? "grab" : "default";
    card.style.textAlign = "center";
    card.style.fontSize = "16px";
    card.style.fontWeight = "500";
    card.style.boxShadow = "0 2px 5px rgba(0,0,0,0.1)";
    card.style.transition = "all 0.2s";
    card.style.opacity = "1";
    card.innerHTML = item.text;
    // LaTeX im Kartentext rendern
  if (typeof renderMathInElement !== 'undefined') {
    setTimeout(() => {
      renderMathInElement(card, {
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
    if (draggable) {
      card.addEventListener("dragstart", (e) => {
        draggedItem = card;
        draggedColumn = item.column;
        draggedRow = rowIndex;
        e.dataTransfer.setData("text/plain", item.id);
        card.style.opacity = "0.5";
        e.dataTransfer.effectAllowed = "move";
      });
      
      card.addEventListener("dragend", () => {
        if (draggedItem) {
          draggedItem.style.opacity = "1";
        }
        draggedItem = null;
        draggedColumn = null;
        draggedRow = null;
      });
    }
    
    card.addEventListener("dragover", (e) => {
      if (!draggedItem) return;
      const targetItem = findItemById(card.getAttribute("data-id"));
      if (targetItem && canBeDropTarget(targetItem, draggedColumn)) {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
        card.style.transform = "scale(1.02)";
        card.style.boxShadow = "0 4px 10px rgba(0,0,0,0.2)";
      }
    });
    
    card.addEventListener("dragleave", () => {
      card.style.transform = "scale(1)";
      card.style.boxShadow = "0 2px 5px rgba(0,0,0,0.1)";
    });
    
    card.addEventListener("drop", (e) => {
      e.preventDefault();
      card.style.transform = "scale(1)";
      card.style.boxShadow = "0 2px 5px rgba(0,0,0,0.1)";
      
      if (!draggedItem) return;
      
      const fromId = draggedItem.getAttribute("data-id");
      const fromRow = parseInt(draggedItem.getAttribute("data-row"));
      const fromItem = findItemById(fromId);
      const toItem = findItemById(card.getAttribute("data-id"));
      const toRow = parseInt(card.getAttribute("data-row"));
      
      if (!fromItem || !toItem) return;
      
      const isValidConnection = (draggedColumn === 'left' && toItem.column === 'middle') ||
                                (draggedColumn === 'middle' && toItem.column === 'right');
      
      if (!isValidConnection) {
        showError("❌ Falsche Verbindung! Ziehe von links nach rechts.");
        return;
      }
      
      if (toItem.connectedFrom !== null) {
        showError("❌ Diese Karte ist bereits verbunden!");
        return;
      }
      
      if (draggedColumn === 'middle' && fromItem.connectedFrom === null) {
        showError("❌ Du musst zuerst die linke Karte mit dieser mittleren Karte verbinden!");
        return;
      }
      
      // Entferne alte Verbindung des fromItems falls vorhanden
      if (fromItem.connectedTo !== null) {
        const oldConnIndex = connections.findIndex(c => c.fromId === fromId);
        if (oldConnIndex !== -1) {
          const oldToItem = findItemById(connections[oldConnIndex].toId);
          if (oldToItem) {
            oldToItem.connectedFrom = null;
          }
          connections.splice(oldConnIndex, 1);
        }
        fromItem.connectedTo = null;
      }
      
      // Swap: Tausche die Ziel-Karte mit der Karte in der Quell-Zeile
      if (toRow !== fromRow) {
        swapItems(toItem.column, toRow, fromRow);
      }
      
      // Verbindung erstellen
      const connection = {
        fromId: fromId,
        toId: toItem.id,
        fromPairId: fromItem.pairId,
        toPairId: toItem.pairId,
        fromColumn: draggedColumn,
        toColumn: toItem.column,
        fromRow: fromRow,
        toRow: toRow,
        isWrong: false
      };
      connections.push(connection);
      
      fromItem.connectedTo = toItem.id;
      toItem.connectedFrom = fromId;
      
      showErrors = false;
      renderItems();
    });
    
    listEl.appendChild(card);
  }
  
  function showError(message) {
    const errorMsg = document.createElement("div");
    errorMsg.textContent = message;
    errorMsg.style.position = "fixed";
    errorMsg.style.bottom = "20px";
    errorMsg.style.left = "50%";
    errorMsg.style.transform = "translateX(-50%)";
    errorMsg.style.background = "#ffebee";
    errorMsg.style.color = "#c62828";
    errorMsg.style.padding = "8px 16px";
    errorMsg.style.borderRadius = "8px";
    errorMsg.style.zIndex = "1000";
    container.appendChild(errorMsg);
    setTimeout(() => errorMsg.remove(), 1500);
  }

  function isComplete() {
    if (numColumns === 2) {
      return columnItems.left.every(item => item.connectedTo !== null) &&
             columnItems.right.every(item => item.connectedFrom !== null);
    } else {
      return columnItems.left.every(item => item.connectedTo !== null) &&
             columnItems.middle.every(item => item.connectedFrom !== null && item.connectedTo !== null) &&
             columnItems.right.every(item => item.connectedFrom !== null);
    }
  }

  // Nur falsche Verbindungen zurücksetzen
  function resetWrongConnections() {
    const wrongConnections = connections.filter(conn => conn.fromPairId !== conn.toPairId);
    
    for (const conn of wrongConnections) {
      const fromItem = findItemById(conn.fromId);
      const toItem = findItemById(conn.toId);
      
      if (fromItem) {
        fromItem.connectedTo = null;
      }
      if (toItem) {
        toItem.connectedFrom = null;
      }
    }
    
    // Entferne falsche Verbindungen aus dem Array
    connections = connections.filter(conn => conn.fromPairId === conn.toPairId);
    
    renderItems();
    return wrongConnections.length;
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

  const resetButton = document.createElement("button");
  resetButton.textContent = "🔄 Alles zurücksetzen";
  resetButton.style.padding = "10px 24px";
  resetButton.style.fontSize = "14px";
  resetButton.style.fontWeight = "bold";
  resetButton.style.cursor = "pointer";
  resetButton.style.background = "#ff9800";
  resetButton.style.color = "white";
  resetButton.style.border = "none";
  resetButton.style.borderRadius = "25px";
  resetButton.style.transition = "all 0.2s";
  
  resetButton.onclick = () => {
    if (isSolved) return;
    connections = [];
    showErrors = false;
    for (const col of ['left', 'middle', 'right']) {
      if (columnItems[col]) {
        columnItems[col].forEach(item => {
          item.connectedTo = null;
          item.connectedFrom = null;
        });
      }
    }
    // Reihenfolge zurücksetzen auf initial gemischt
    columnItems.left = shuffleArray([...columnItems.left.map(item => ({...item, connectedTo: null, connectedFrom: null}))]);
    if (numColumns === 3) columnItems.middle = shuffleArray([...columnItems.middle.map(item => ({...item, connectedTo: null, connectedFrom: null}))]);
    columnItems.right = shuffleArray([...columnItems.right.map(item => ({...item, connectedTo: null, connectedFrom: null}))]);
    renderItems();
    feedbackDiv.innerHTML = "";
  };

  const checkButton = document.createElement("button");
  checkButton.textContent = "✓ Zuordnung prüfen";
  checkButton.style.padding = "10px 24px";
  checkButton.style.fontSize = "14px";
  checkButton.style.fontWeight = "bold";
  checkButton.style.cursor = "pointer";
  checkButton.style.background = "#667eea";
  checkButton.style.color = "white";
  checkButton.style.border = "none";
  checkButton.style.borderRadius = "25px";
  checkButton.style.transition = "all 0.2s";

  const fixButton = document.createElement("button");
  fixButton.textContent = "🔧 Fehler korrigieren";
  fixButton.style.padding = "10px 24px";
  fixButton.style.fontSize = "14px";
  fixButton.style.fontWeight = "bold";
  fixButton.style.cursor = "pointer";
  fixButton.style.background = "#4caf50";
  fixButton.style.color = "white";
  fixButton.style.border = "none";
  fixButton.style.borderRadius = "25px";
  fixButton.style.transition = "all 0.2s";
  fixButton.style.display = "none";

  if (isSolved) {
    checkButton.disabled = true;
    checkButton.style.background = "#4caf50";
    checkButton.textContent = "✓ Gelöst";
    resetButton.disabled = true;
    resetButton.style.background = "#ccc";
    fixButton.style.display = "none";
  }

  checkButton.onclick = () => {
    if (isSolved) return;
    
    const complete = isComplete();
    
    if (complete) {
      let allCorrect = true;
      let wrongCount = 0;
      
      for (const conn of connections) {
        if (conn.fromPairId !== conn.toPairId) {
          allCorrect = false;
          wrongCount++;
          conn.isWrong = true;
        } else {
          conn.isWrong = false;
        }
      }
      
      if (allCorrect) {
        feedbackDiv.innerHTML = "✅ Richtig! Alle Zuordnungen sind korrekt! 🎉";
        feedbackDiv.style.background = "#e8f5e9";
        feedbackDiv.style.color = "#2e7d32";
        checkButton.disabled = true;
        checkButton.style.background = "#4caf50";
        checkButton.textContent = "✓ Gelöst";
        resetButton.disabled = true;
        resetButton.style.background = "#ccc";
        fixButton.style.display = "none";
        
        const result = {
          connections: connections,
          columnItems: columnItems
        };
        onCorrect(result);
      } else {
        showErrors = true;
        feedbackDiv.innerHTML = `❌ ${wrongCount} Fehler gefunden! Klicke auf "Fehler korrigieren" um nur die falschen Verbindungen zu lösen.`;
        feedbackDiv.style.background = "#ffebee";
        feedbackDiv.style.color = "#c62828";
        fixButton.style.display = "inline-block";
        drawLines();
      }
    } else {
      feedbackDiv.innerHTML = "⚠️ Bitte verbinde alle Karten miteinander!";
      feedbackDiv.style.background = "#fff3e0";
      feedbackDiv.style.color = "#ff9800";
      fixButton.style.display = "none";
      
      setTimeout(() => {
        if (!isSolved) {
          feedbackDiv.innerHTML = "";
        }
      }, 2000);
    }
  };

  fixButton.onclick = () => {
    if (isSolved) return;
    
    const removedCount = resetWrongConnections();
    showErrors = false;
    fixButton.style.display = "none";
    
    if (removedCount > 0) {
      feedbackDiv.innerHTML = `🔧 ${removedCount} falsche Verbindung(en) wurden gelöst. Du kannst sie jetzt neu verbinden!`;
      feedbackDiv.style.background = "#e8f5e9";
      feedbackDiv.style.color = "#2e7d32";
    } else {
      feedbackDiv.innerHTML = "✅ Keine falschen Verbindungen gefunden!";
      feedbackDiv.style.background = "#e8f5e9";
      feedbackDiv.style.color = "#2e7d32";
    }
    
    setTimeout(() => {
      if (!isSolved) {
        feedbackDiv.innerHTML = "";
      }
    }, 3000);
  };

  buttonContainer.appendChild(resetButton);
  buttonContainer.appendChild(checkButton);
  buttonContainer.appendChild(fixButton);
  container.appendChild(buttonContainer);
  container.appendChild(feedbackDiv);

  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      if (!isSolved) drawLines();
    }, 100);
  });

  renderItems();

  return container;
});
// --------------------
// TIMED_QUIZ - Zeitgesteuertes Quiz mit Flaggen-System
// Dynamische Flaggen basierend auf Geschwindigkeit (0-3)
// --------------------
registerInput("timed_quiz", ({ task, onCorrect, initialValue, isSolved }) => {
  const container = document.createElement("div");
  container.className = "timed-quiz";
  container.style.display = "flex";
  container.style.flexDirection = "column";
  container.style.gap = "16px";
  container.style.padding = "20px";
  container.style.background = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
  container.style.borderRadius = "16px";
  container.style.color = "white";
  container.style.boxShadow = "0 10px 30px rgba(0,0,0,0.2)";
  container.style.width = "100%";
  container.style.boxSizing = "border-box";

  // Quiz-Konfiguration
  const timeLimit = task.timeLimit || 60;
  const questionPool = task.questionPool || "multiplication";
  const maxNumber = task.maxNumber || 12;
  const inputMode = task.inputMode || "text";
  const choicesCount = task.choicesCount || 4;
  
  const flag3Threshold = task.flag3Threshold || 2.0;
  const flag2Threshold = task.flag2Threshold || 5.0;
  
  const quizTitle = task.quizTitle || "⚡ Kopfrechnen-Quiz ⚡";
  
  // Quiz-Zustand
  let currentQuestion = null;
  let score = 0;
  let wrongAnswers = 0;
  let timeLeft = timeLimit;
  let timerInterval = null;
  let isActive = false;
  let isFinished = false;
  let startTime = null;
  let endTime = null;
  let userAnswers = [];
  let achievedFlags = 0;

  // Lade gespeicherten Zustand
  let savedState = null;
  if (initialValue && typeof initialValue === 'object') {
    savedState = initialValue;
    isFinished = savedState.isFinished || false;
    if (isFinished) {
      score = savedState.score || 0;
      wrongAnswers = savedState.wrongAnswers || 0;
      achievedFlags = savedState.achievedFlags || 0;
    }
  }

  // ========== TITEL-BEREICH ==========
  const titleContainer = document.createElement("div");
  titleContainer.style.textAlign = "center";
  titleContainer.style.marginBottom = "20px";
  titleContainer.style.padding = "15px";
  titleContainer.style.background = "rgba(255,255,255,0.15)";
  titleContainer.style.borderRadius = "12px";
  titleContainer.style.borderBottom = "2px solid rgba(255,255,255,0.3)";
  
  const titleText = document.createElement("div");
  titleText.style.fontSize = "28px";
  titleText.style.fontWeight = "bold";
  titleText.style.textShadow = "2px 2px 4px rgba(0,0,0,0.2)";
  titleText.innerHTML = quizTitle;
  titleContainer.appendChild(titleText);
  container.appendChild(titleContainer);

  // ========== STATISTIK-BEREICH ==========
  const statsContainer = document.createElement("div");
  statsContainer.style.display = "flex";
  statsContainer.style.justifyContent = "space-between";
  statsContainer.style.alignItems = "center";
  statsContainer.style.marginBottom = "10px";
  statsContainer.style.padding = "10px";
  statsContainer.style.background = "rgba(255,255,255,0.2)";
  statsContainer.style.borderRadius = "12px";
  statsContainer.style.flexWrap = "wrap";
  statsContainer.style.gap = "10px";

  const scoreDisplay = document.createElement("div");
  scoreDisplay.style.fontSize = "20px";
  scoreDisplay.style.fontWeight = "bold";
  scoreDisplay.innerHTML = `✅ ${score}`;

  const wrongDisplay = document.createElement("div");
  wrongDisplay.style.fontSize = "20px";
  wrongDisplay.style.fontWeight = "bold";
  wrongDisplay.innerHTML = `❌ ${wrongAnswers}`;

  const timerDisplay = document.createElement("div");
  timerDisplay.style.fontSize = "20px";
  timerDisplay.style.fontWeight = "bold";
  timerDisplay.style.fontFamily = "monospace";
  timerDisplay.style.background = "rgba(0,0,0,0.3)";
  timerDisplay.style.padding = "5px 15px";
  timerDisplay.style.borderRadius = "30px";
  timerDisplay.innerHTML = formatTime(timeLeft);

  statsContainer.appendChild(scoreDisplay);
  statsContainer.appendChild(wrongDisplay);
  statsContainer.appendChild(timerDisplay);
  container.appendChild(statsContainer);

  // ========== START-BUTTON ==========
  const startContainer = document.createElement("div");
  startContainer.style.display = "flex";
  startContainer.style.justifyContent = "center";
  startContainer.style.marginBottom = "20px";

  const startButton = document.createElement("button");
  startButton.textContent = "🚀 START 🚀";
  startButton.style.padding = "15px 40px";
  startButton.style.fontSize = "24px";
  startButton.style.fontWeight = "bold";
  startButton.style.background = "#ffd700";
  startButton.style.color = "#333";
  startButton.style.border = "none";
  startButton.style.borderRadius = "50px";
  startButton.style.cursor = "pointer";
  startButton.style.transition = "transform 0.2s, background 0.2s";
  
  startButton.onmouseenter = () => startButton.style.transform = "scale(1.05)";
  startButton.onmouseleave = () => startButton.style.transform = "scale(1)";
  
  startContainer.appendChild(startButton);
  container.appendChild(startContainer);

  // ========== FRAGEBEREICH ==========
  const questionContainer = document.createElement("div");
  questionContainer.style.display = "none";
  questionContainer.style.textAlign = "center";
  questionContainer.style.padding = "20px";
  questionContainer.style.background = "rgba(255,255,255,0.15)";
  questionContainer.style.borderRadius = "16px";
  questionContainer.style.marginBottom = "20px";

  const questionText = document.createElement("div");
  questionText.style.fontSize = "48px";
  questionText.style.fontWeight = "bold";
  questionText.style.marginBottom = "20px";
  questionText.style.fontFamily = "monospace";

  const inputArea = document.createElement("div");
  inputArea.style.display = "flex";
  inputArea.style.flexDirection = "column";
  inputArea.style.alignItems = "center";
  inputArea.style.gap = "10px";

  questionContainer.appendChild(questionText);
  questionContainer.appendChild(inputArea);
  container.appendChild(questionContainer);

  // ========== ERGEBNISBEREICH ==========
  const resultContainer = document.createElement("div");
  resultContainer.style.textAlign = "center";
  resultContainer.style.padding = "15px";
  resultContainer.style.borderRadius = "12px";
  resultContainer.style.background = "rgba(0,0,0,0.3)";
  resultContainer.style.marginTop = "10px";

  const resultText = document.createElement("div");
  resultText.style.fontSize = "16px";
  resultContainer.appendChild(resultText);
  container.appendChild(resultContainer);

  // ============================================
  // HILFSFUNKTIONEN
  // ============================================
  
  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  function updateTimerDisplay() {
    timerDisplay.innerHTML = formatTime(timeLeft);
    if (timeLeft <= 10 && isActive) {
      timerDisplay.style.background = "rgba(255,0,0,0.5)";
      timerDisplay.style.animation = "pulse 1s infinite";
    } else {
      timerDisplay.style.background = "rgba(0,0,0,0.3)";
      timerDisplay.style.animation = "none";
    }
  }

  function updateScoreDisplay() {
    scoreDisplay.innerHTML = `✅ ${score}`;
  }

  function updateWrongDisplay() {
    wrongDisplay.innerHTML = `❌ ${wrongAnswers}`;
  }

  function calculateFlags() {
    const hasMoreCorrectThanWrong = score > wrongAnswers;
    
    if (!hasMoreCorrectThanWrong || score === 0) {
      return { flags: 0, secondsPerAnswer: 0, difficultyText: "Keine Flagge - Mehr richtige Antworten benötigt!" };
    }
    
    if (!startTime) {
      return { flags: 0, secondsPerAnswer: 0, difficultyText: "Keine Flagge" };
    }
    
    const endTimeUsed = endTime || Date.now();
    const elapsedSeconds = (endTimeUsed - startTime) / 1000;
    const secondsPerAnswer = elapsedSeconds / score;
    
    let flags = 1;
    let difficultyText = "";
    
    if (secondsPerAnswer < flag3Threshold) {
      flags = 3;
      difficultyText = "Sturm";
    } else if (secondsPerAnswer < flag2Threshold) {
      flags = 2;
      difficultyText = "Wind";
    } else {
      flags = 1;
      difficultyText = "Brise";
    }
    
    achievedFlags = flags;
    
    return { flags, secondsPerAnswer, difficultyText };
  }

  function finishQuiz() {
    if (isFinished) return;
    
    isActive = false;
    isFinished = true;
    endTime = Date.now();
    
    if (timerInterval) clearInterval(timerInterval);
    
    const { flags, secondsPerAnswer, difficultyText } = calculateFlags();
    
    questionContainer.style.display = "none";
    startContainer.style.display = "none";
    
    const gameOverContainer = document.createElement("div");
    gameOverContainer.style.textAlign = "center";
    gameOverContainer.style.padding = "20px";
    
    let medalEmoji = "";
    let flagMessage = "";
    
    if (flags === 3) {
      medalEmoji = "🏆🏆🏆";
      flagMessage = "Du erhältst 3 Flaggen! (Sturm)";
    } else if (flags === 2) {
      medalEmoji = "🏆🏆";
      flagMessage = "Du erhältst 2 Flaggen! (Wind)";
    } else if (flags === 1) {
      medalEmoji = "🏆";
      flagMessage = "Du erhältst 1 Flagge! (Brise)";
    } else {
      medalEmoji = "❌";
      flagMessage = "Keine Flagge - Du brauchst mehr richtige als falsche Antworten!";
    }
    
    gameOverContainer.innerHTML = `
      <div style="font-size: 28px; font-weight: bold; margin-bottom: 15px;">⏰ QUIZ BEENDET! ⏰</div>
      <div style="font-size: 24px; margin-bottom: 10px;">${medalEmoji}</div>
      <div style="font-size: 20px; margin-bottom: 10px;">✅ Richtige Antworten: ${score}</div>
      <div style="font-size: 20px; margin-bottom: 10px;">❌ Falsche Antworten: ${wrongAnswers}</div>
      ${secondsPerAnswer ? `<div style="font-size: 16px; margin-bottom: 5px;">⚡ Durchschnittliche Zeit pro richtige Antwort: ${secondsPerAnswer.toFixed(2)} Sekunden</div>` : ''}
      <div style="font-size: 18px; font-weight: bold; margin-top: 15px; padding: 10px; background: rgba(255,215,0,0.3); border-radius: 10px;">
        🎉 ${flagMessage} 🎉
      </div>
    `;
    
    while (resultContainer.firstChild) resultContainer.removeChild(resultContainer.firstChild);
    resultContainer.appendChild(gameOverContainer);
    resultContainer.style.background = "rgba(0,0,0,0.5)";
    
    // ========== WICHTIG: Rückgabe für das Flaggen-System ==========
    // Die app.js zeigt unter dem Spielfeld die task.difficulty an
    // Deshalb übergeben wir die erreichte Flaggenzahl als Ergebnis
    // Die app.js speichert diesen Wert und zeigt bei der Belohnung die richtige Anzahl an
    
    const finalResult = {
      score: score,
      wrongAnswers: wrongAnswers,
      achievedFlags: flags,
      secondsPerAnswer: secondsPerAnswer || 0,
      totalQuestions: score + wrongAnswers,
      userAnswers: userAnswers,
      isFinished: true
    };
    
    // Wir übergeben die erreichte Flaggenzahl (0-3)
    // Das System speichert diesen Wert und verwendet ihn für die Anzeige
    onCorrect(flags);
  }

  function generateQuestion() {
    if (!isActive || isFinished) return;
    
    let num1, num2, operator, questionStr, correctAnswer;
    
    let questionType = questionPool;
    if (questionType === "mixed") {
      const types = ["addition", "subtraction", "multiplication", "division"];
      questionType = types[Math.floor(Math.random() * types.length)];
    }
    
    switch (questionType) {
      case "addition":
        num1 = Math.floor(Math.random() * maxNumber) + 1;
        num2 = Math.floor(Math.random() * maxNumber) + 1;
        operator = "+";
        correctAnswer = num1 + num2;
        questionStr = `${num1} ${operator} ${num2}`;
        break;
        
      case "subtraction":
        num1 = Math.floor(Math.random() * maxNumber) + 1;
        num2 = Math.floor(Math.random() * maxNumber) + 1;
        if (num1 < num2) [num1, num2] = [num2, num1];
        operator = "-";
        correctAnswer = num1 - num2;
        questionStr = `${num1} ${operator} ${num2}`;
        break;
        
      case "division":
        num2 = Math.floor(Math.random() * maxNumber) + 1;
        const result = Math.floor(Math.random() * maxNumber) + 1;
        num1 = num2 * result;
        operator = ":";
        correctAnswer = result;
        questionStr = `${num1} ${operator} ${num2}`;
        break;
        
      case "multiplication":
      default:
        num1 = Math.floor(Math.random() * maxNumber) + 1;
        num2 = Math.floor(Math.random() * maxNumber) + 1;
        operator = "×";
        correctAnswer = num1 * num2;
        questionStr = `${num1} ${operator} ${num2}`;
        break;
    }
    
    currentQuestion = {
      text: questionStr,
      answer: correctAnswer,
      type: questionType
    };
    
    questionText.innerHTML = questionStr;
    
    inputArea.innerHTML = "";
    
    if (inputMode === "multiple_choice") {
      const choices = generateChoices(correctAnswer, choicesCount);
      const buttonsContainer = document.createElement("div");
      buttonsContainer.style.display = "grid";
      buttonsContainer.style.gridTemplateColumns = `repeat(${Math.min(choicesCount, 4)}, 1fr)`;
      buttonsContainer.style.gap = "10px";
      buttonsContainer.style.width = "100%";
      buttonsContainer.style.maxWidth = "400px";
      
      choices.forEach(choice => {
        const btn = document.createElement("button");
        btn.textContent = choice;
        btn.style.padding = "15px 20px";
        btn.style.fontSize = "20px";
        btn.style.fontWeight = "bold";
        btn.style.background = "white";
        btn.style.color = "#667eea";
        btn.style.border = "none";
        btn.style.borderRadius = "12px";
        btn.style.cursor = "pointer";
        btn.style.transition = "transform 0.1s";
        
        btn.onclick = () => {
          if (!isActive || isFinished) return;
          checkAnswer(choice);
        };
        
        btn.onmouseenter = () => btn.style.transform = "scale(1.05)";
        btn.onmouseleave = () => btn.style.transform = "scale(1)";
        
        buttonsContainer.appendChild(btn);
      });
      
      inputArea.appendChild(buttonsContainer);
      
    } else {
      const textInput = document.createElement("input");
      textInput.type = "number";
      textInput.placeholder = "Antwort eingeben...";
      textInput.style.padding = "15px 20px";
      textInput.style.fontSize = "20px";
      textInput.style.textAlign = "center";
      textInput.style.borderRadius = "12px";
      textInput.style.border = "none";
      textInput.style.width = "150px";
      
      const submitBtn = document.createElement("button");
      submitBtn.textContent = "✓ Prüfen";
      submitBtn.style.padding = "12px 25px";
      submitBtn.style.fontSize = "16px";
      submitBtn.style.fontWeight = "bold";
      submitBtn.style.background = "#ffd700";
      submitBtn.style.color = "#333";
      submitBtn.style.border = "none";
      submitBtn.style.borderRadius = "25px";
      submitBtn.style.cursor = "pointer";
      
      const checkAnswerHandler = () => {
        if (!isActive || isFinished) return;
        const userAnswer = parseFloat(textInput.value);
        if (!isNaN(userAnswer)) {
          checkAnswer(userAnswer);
          textInput.value = "";
          textInput.focus();
        } else {
          resultText.innerHTML = "⚠️ Bitte eine Zahl eingeben!";
          setTimeout(() => {
            if (isActive && !isFinished) resultText.innerHTML = "";
          }, 1000);
        }
      };
      
      submitBtn.onclick = checkAnswerHandler;
      textInput.onkeypress = (e) => {
        if (e.key === "Enter") checkAnswerHandler();
      };
      
      const inputRow = document.createElement("div");
      inputRow.style.display = "flex";
      inputRow.style.gap = "10px";
      inputRow.style.alignItems = "center";
      inputRow.style.justifyContent = "center";
      inputRow.appendChild(textInput);
      inputRow.appendChild(submitBtn);
      
      inputArea.appendChild(inputRow);
      
      setTimeout(() => textInput.focus(), 10);
    }
  }
  
  function generateChoices(correct, count) {
    const choices = new Set();
    choices.add(correct);
    
    const variation = Math.max(3, Math.floor(correct * 0.3));
    
    while (choices.size < count) {
      let wrong;
      if (Math.random() > 0.5) {
        wrong = correct + (Math.floor(Math.random() * variation) + 1);
      } else {
        wrong = correct - (Math.floor(Math.random() * variation) + 1);
      }
      if (wrong > 0) choices.add(wrong);
    }
    
    const choicesArray = Array.from(choices);
    for (let i = choicesArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [choicesArray[i], choicesArray[j]] = [choicesArray[j], choicesArray[i]];
    }
    
    return choicesArray;
  }
  
  function checkAnswer(userAnswer) {
    if (!isActive || isFinished) return;
    
    const isCorrect = Math.abs(userAnswer - currentQuestion.answer) < 0.01;
    
    if (isCorrect) {
      score++;
      userAnswers.push({
        question: currentQuestion.text,
        userAnswer: userAnswer,
        correctAnswer: currentQuestion.answer,
        isCorrect: true,
        timestamp: Date.now()
      });
      
      resultText.innerHTML = "✅ Richtig! ✅";
      resultText.style.color = "#90EE90";
      
      setTimeout(() => {
        if (isActive && !isFinished) {
          resultText.innerHTML = "";
          generateQuestion();
        }
      }, 200);
      
      updateScoreDisplay();
      
    } else {
      wrongAnswers++;
      userAnswers.push({
        question: currentQuestion.text,
        userAnswer: userAnswer,
        correctAnswer: currentQuestion.answer,
        isCorrect: false,
        timestamp: Date.now()
      });
      
      resultText.innerHTML = `❌ Falsch! ${currentQuestion.text} = ${currentQuestion.answer} ❌`;
      resultText.style.color = "#ff9999";
      
      setTimeout(() => {
        if (isActive && !isFinished) {
          resultText.innerHTML = "";
          generateQuestion();
        }
      }, 600);
      
      updateWrongDisplay();
    }
  }
  
  function startTimer() {
    if (timerInterval) clearInterval(timerInterval);
    
    timerInterval = setInterval(() => {
      if (!isActive || isFinished) return;
      
      if (timeLeft <= 1) {
        if (timerInterval) clearInterval(timerInterval);
        timeLeft = 0;
        updateTimerDisplay();
        finishQuiz();
      } else {
        timeLeft--;
        updateTimerDisplay();
        
        if (timeLeft === 5) {
          resultText.innerHTML = "⚠️ Nur noch 5 Sekunden! ⚠️";
          resultText.style.color = "#ffcc00";
          setTimeout(() => {
            if (isActive && !isFinished && timeLeft > 0) resultText.innerHTML = "";
          }, 2000);
        }
      }
    }, 1000);
  }
  
  function startQuiz() {
    if (isFinished) return;
    
    isActive = true;
    startTime = Date.now();
    score = 0;
    wrongAnswers = 0;
    timeLeft = timeLimit;
    userAnswers = [];
    achievedFlags = 0;
    
    updateScoreDisplay();
    updateWrongDisplay();
    updateTimerDisplay();
    
    startContainer.style.display = "none";
    questionContainer.style.display = "block";
    
    resultContainer.innerHTML = "";
    const newResultText = document.createElement("div");
    newResultText.style.fontSize = "16px";
    resultContainer.appendChild(newResultText);
    resultText.innerHTML = "";
    
    startTimer();
    generateQuestion();
  }
  
  startButton.onclick = startQuiz;
  
  if (isFinished && savedState) {
    startContainer.style.display = "none";
    questionContainer.style.display = "none";
    
    const completedContainer = document.createElement("div");
    completedContainer.style.textAlign = "center";
    completedContainer.style.padding = "20px";
    
    let medalEmoji = "";
    if (achievedFlags === 3) medalEmoji = "🏆🏆🏆";
    else if (achievedFlags === 2) medalEmoji = "🏆🏆";
    else if (achievedFlags === 1) medalEmoji = "🏆";
    else medalEmoji = "❌";
    
    completedContainer.innerHTML = `
      <div style="font-size: 24px; font-weight: bold; margin-bottom: 15px;">✅ Quiz bereits abgeschlossen! ✅</div>
      <div style="font-size: 20px; margin-bottom: 10px;">${medalEmoji}</div>
      <div style="font-size: 18px;">✅ Richtige Antworten: ${score}</div>
      <div style="font-size: 18px;">❌ Falsche Antworten: ${savedState.wrongAnswers || 0}</div>
      <div style="font-size: 18px;">Erhaltene Flaggen: ${achievedFlags}</div>
    `;
    
    while (resultContainer.firstChild) resultContainer.removeChild(resultContainer.firstChild);
    resultContainer.appendChild(completedContainer);
  }
  
  const style = document.createElement('style');
  style.textContent = `
    @keyframes pulse {
      0% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.05); opacity: 0.8; }
      100% { transform: scale(1); opacity: 1; }
    }
  `;
  document.head.appendChild(style);
  
  return container;
});
// --------------------
// DIVISIBILITY_QUIZ - Ja/Nein Quiz mit vordefinierten Zahlen
// Nutzbar für Teilbarkeit, Primzahlen, etc.
// Die Aufgabe hat eine feste difficulty (wie andere Aufgaben auch)
// Die Flagge wird nur vergeben, wenn die Prozentzahl erreicht wird
// --------------------
registerInput("divisibility_quiz", ({ task, onCorrect, initialValue, isSolved }) => {
  const container = document.createElement("div");
  container.className = "divisibility-quiz";
  container.style.display = "flex";
  container.style.flexDirection = "column";
  container.style.gap = "16px";
  container.style.padding = "20px";
  container.style.background = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
  container.style.borderRadius = "16px";
  container.style.color = "white";
  container.style.boxShadow = "0 10px 30px rgba(0,0,0,0.2)";
  container.style.width = "100%";
  container.style.boxSizing = "border-box";

  // Quiz-Konfiguration
  const timeLimit = task.timeLimit || 60;
  const requiredPercent = task.requiredPercent || 70; // Prozent für Flagge (0-100)
  const difficulty = task.difficulty || 1; // Feste difficulty für die Aufgabe
  
  // Zahlen-Set aus der Task-Konfiguration
  const numbersSet = task.numbers || [];
  const checkFunctionName = task.checkFunction || "divisible";
  const checkDivisor = task.divisor || 2;
  const threshold = task.threshold || 100;
  
  const quizTitle = task.quizTitle || `🔢 Quiz`;
  const questionText = task.questionText || "Ist die Zahl...?";
  
  // Quiz-Zustand
  let currentNumber = null;
  let currentAnswer = null;
  let score = 0;
  let answered = 0;
  let timeLeft = timeLimit;
  let timerInterval = null;
  let isActive = false;
  let isFinished = false;
  let questions = [];
  let currentQuestionIndex = 0;
  let waitingForNext = false;
  let nextQuestionTimeout = null;

  // Lade gespeicherten Zustand
  let savedState = null;
  if (initialValue && typeof initialValue === 'object') {
    savedState = initialValue;
    isFinished = savedState.isFinished || false;
    if (isFinished) {
      score = savedState.score || 0;
      answered = savedState.answered || 0;
    }
  }

  // ========== PRÜFFUNKTIONEN ==========
  const checkFunctions = {
    divisible: (num) => num % checkDivisor === 0,
    
    isPrime: (num) => {
      if (num < 2) return false;
      for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
      }
      return true;
    },
    
    isEven: (num) => num % 2 === 0,
    isOdd: (num) => num % 2 !== 0,
    
    greaterThan: (num) => num > threshold,
    lessThan: (num) => num < threshold,
    
    isPerfectSquare: (num) => {
      const root = Math.sqrt(num);
      return root === Math.floor(root);
    },
    
    divisibleBy3: (num) => {
      let sum = 0;
      let n = Math.abs(num);
      while (n > 0) {
        sum += n % 10;
        n = Math.floor(n / 10);
      }
      return sum % 3 === 0;
    },
    divisibleBy5: (num) => num % 5 === 0,
    divisibleBy10: (num) => num % 10 === 0
  };
  
  let checkFunction = checkFunctions[checkFunctionName];
  if (!checkFunction) {
    checkFunction = (num) => num % checkDivisor === 0;
  }

  // ========== FRAGEN GENERIEREN ==========
  function generateQuestionsFromSet() {
    const newQuestions = [];
    
    if (numbersSet && numbersSet.length > 0) {
      for (const item of numbersSet) {
        let number, answer;
        
        if (typeof item === 'object') {
          number = item.value;
          answer = item.answer;
        } else {
          number = item;
          answer = checkFunction(number);
        }
        
        newQuestions.push({ number, answer });
      }
    }
    
    return newQuestions;
  }

  // ========== UI ELEMENTE ==========
  
  // Titel-Bereich
  const titleContainer = document.createElement("div");
  titleContainer.style.textAlign = "center";
  titleContainer.style.marginBottom = "20px";
  titleContainer.style.padding = "15px";
  titleContainer.style.background = "rgba(255,255,255,0.15)";
  titleContainer.style.borderRadius = "12px";
  titleContainer.style.borderBottom = "2px solid rgba(255,255,255,0.3)";
  
  const titleText = document.createElement("div");
  titleText.style.fontSize = "24px";
  titleText.style.fontWeight = "bold";
  titleText.innerHTML = quizTitle;
  titleContainer.appendChild(titleText);
  
  const subText = document.createElement("div");
  subText.style.fontSize = "14px";
  subText.style.marginTop = "8px";
  subText.style.opacity = "0.9";
  subText.innerHTML = `${questionText} (${requiredPercent}% richtig für Flagge)`;
  titleContainer.appendChild(subText);
  
  container.appendChild(titleContainer);

  // Statistik-Bereich
  const statsContainer = document.createElement("div");
  statsContainer.style.display = "flex";
  statsContainer.style.justifyContent = "space-between";
  statsContainer.style.alignItems = "center";
  statsContainer.style.marginBottom = "10px";
  statsContainer.style.padding = "10px";
  statsContainer.style.background = "rgba(255,255,255,0.2)";
  statsContainer.style.borderRadius = "12px";
  statsContainer.style.flexWrap = "wrap";
  statsContainer.style.gap = "10px";

  const scoreDisplay = document.createElement("div");
  scoreDisplay.style.fontSize = "18px";
  scoreDisplay.style.fontWeight = "bold";
  scoreDisplay.innerHTML = `✅ 0/${numbersSet.length}`;

  const timerDisplay = document.createElement("div");
  timerDisplay.style.fontSize = "20px";
  timerDisplay.style.fontWeight = "bold";
  timerDisplay.style.fontFamily = "monospace";
  timerDisplay.style.background = "rgba(0,0,0,0.3)";
  timerDisplay.style.padding = "5px 15px";
  timerDisplay.style.borderRadius = "30px";
  timerDisplay.innerHTML = formatTime(timeLeft);

  const progressDisplay = document.createElement("div");
  progressDisplay.style.fontSize = "16px";
  progressDisplay.style.fontWeight = "bold";
  progressDisplay.innerHTML = "📊 0%";

  statsContainer.appendChild(scoreDisplay);
  statsContainer.appendChild(progressDisplay);
  statsContainer.appendChild(timerDisplay);
  container.appendChild(statsContainer);

  // Start-Button
  const startContainer = document.createElement("div");
  startContainer.style.display = "flex";
  startContainer.style.justifyContent = "center";
  startContainer.style.marginBottom = "20px";

  const startButton = document.createElement("button");
  startButton.textContent = "🚀 START 🚀";
  startButton.style.padding = "15px 40px";
  startButton.style.fontSize = "24px";
  startButton.style.fontWeight = "bold";
  startButton.style.background = "#ffd700";
  startButton.style.color = "#333";
  startButton.style.border = "none";
  startButton.style.borderRadius = "50px";
  startButton.style.cursor = "pointer";
  startButton.style.transition = "transform 0.2s, background 0.2s";
  
  startButton.onmouseenter = () => startButton.style.transform = "scale(1.05)";
  startButton.onmouseleave = () => startButton.style.transform = "scale(1)";
  
  startContainer.appendChild(startButton);
  container.appendChild(startContainer);

  // Fragebereich
  const questionContainer = document.createElement("div");
  questionContainer.style.display = "none";
  questionContainer.style.textAlign = "center";
  questionContainer.style.padding = "20px";
  questionContainer.style.background = "rgba(255,255,255,0.15)";
  questionContainer.style.borderRadius = "16px";
  questionContainer.style.marginBottom = "20px";

  const numberDisplay = document.createElement("div");
  numberDisplay.style.fontSize = "64px";
  numberDisplay.style.fontWeight = "bold";
  numberDisplay.style.marginBottom = "30px";
  numberDisplay.style.fontFamily = "monospace";
  numberDisplay.style.letterSpacing = "2px";
  
  const buttonContainer = document.createElement("div");
  buttonContainer.style.display = "flex";
  buttonContainer.style.gap = "20px";
  buttonContainer.style.justifyContent = "center";
  
  const yesButton = document.createElement("button");
  yesButton.textContent = "✅ JA";
  yesButton.style.padding = "15px 40px";
  yesButton.style.fontSize = "24px";
  yesButton.style.fontWeight = "bold";
  yesButton.style.background = "#4caf50";
  yesButton.style.color = "white";
  yesButton.style.border = "none";
  yesButton.style.borderRadius = "50px";
  yesButton.style.cursor = "pointer";
  yesButton.style.transition = "transform 0.2s";
  
  const noButton = document.createElement("button");
  noButton.textContent = "❌ NEIN";
  noButton.style.padding = "15px 40px";
  noButton.style.fontSize = "24px";
  noButton.style.fontWeight = "bold";
  noButton.style.background = "#f44336";
  noButton.style.color = "white";
  noButton.style.border = "none";
  noButton.style.borderRadius = "50px";
  noButton.style.cursor = "pointer";
  noButton.style.transition = "transform 0.2s";
  
  buttonContainer.appendChild(yesButton);
  buttonContainer.appendChild(noButton);
  
  questionContainer.appendChild(numberDisplay);
  questionContainer.appendChild(buttonContainer);
  container.appendChild(questionContainer);

  // Ergebnisbereich
  const resultContainer = document.createElement("div");
  resultContainer.style.textAlign = "center";
  resultContainer.style.padding = "15px";
  resultContainer.style.borderRadius = "12px";
  resultContainer.style.background = "rgba(0,0,0,0.3)";
  resultContainer.style.marginTop = "10px";

  const resultText = document.createElement("div");
  resultText.style.fontSize = "16px";
  resultContainer.appendChild(resultText);
  container.appendChild(resultContainer);

  // ============================================
  // HILFSFUNKTIONEN
  // ============================================
  
  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  function updateTimerDisplay() {
    timerDisplay.innerHTML = formatTime(timeLeft);
    if (timeLeft <= 10 && isActive) {
      timerDisplay.style.background = "rgba(255,0,0,0.5)";
      timerDisplay.style.animation = "pulse 1s infinite";
    } else {
      timerDisplay.style.background = "rgba(0,0,0,0.3)";
      timerDisplay.style.animation = "none";
    }
  }

  function updateStats() {
    const total = numbersSet.length;
    scoreDisplay.innerHTML = `✅ ${score}/${total}`;
    const percent = Math.round((answered / total) * 100);
    progressDisplay.innerHTML = `📊 ${percent}%`;
  }

  function generateQuestions() {
    return generateQuestionsFromSet();
  }

  function showCurrentQuestion() {
    if (currentQuestionIndex >= questions.length) {
      finishQuiz();
      return;
    }
    
    const q = questions[currentQuestionIndex];
    numberDisplay.innerHTML = q.number.toLocaleString('de-DE');
    currentNumber = q.number;
    currentAnswer = q.answer;
    
    yesButton.disabled = false;
    noButton.disabled = false;
    waitingForNext = false;
  }

  function finishQuiz() {
    if (isFinished) return;
    
    if (nextQuestionTimeout) clearTimeout(nextQuestionTimeout);
    
    isActive = false;
    isFinished = true;
    
    if (timerInterval) clearInterval(timerInterval);
    
    const percentCorrect = (score / questions.length) * 100;
    const achieved = percentCorrect >= requiredPercent;
    
    questionContainer.style.display = "none";
    startContainer.style.display = "none";
    
    let medalEmoji = achieved ? "🏆" : "❌";
    let flagMessage = achieved 
      ? `🎉 Flagge erhalten! (${difficulty} Flagge(n)) 🎉`
      : `❌ Keine Flagge - ${requiredPercent}% waren nötig, du hast ${percentCorrect.toFixed(1)}% erreicht.`;
    
    const gameOverContainer = document.createElement("div");
    gameOverContainer.style.textAlign = "center";
    gameOverContainer.style.padding = "20px";
    
    gameOverContainer.innerHTML = `
      <div style="font-size: 28px; font-weight: bold; margin-bottom: 15px;">⏰ QUIZ BEENDET! ⏰</div>
      <div style="font-size: 24px; margin-bottom: 10px;">${medalEmoji}</div>
      <div style="font-size: 20px; margin-bottom: 10px;">✅ Richtige Antworten: ${score}/${questions.length}</div>
      <div style="font-size: 16px; margin-bottom: 5px;">📊 Erfolgsquote: ${percentCorrect.toFixed(1)}%</div>
      <div style="font-size: 18px; font-weight: bold; margin-top: 15px; padding: 10px; background: rgba(255,215,0,0.3); border-radius: 10px;">
        ${flagMessage}
      </div>
    `;
    
    while (resultContainer.firstChild) resultContainer.removeChild(resultContainer.firstChild);
    resultContainer.appendChild(gameOverContainer);
    resultContainer.style.background = "rgba(0,0,0,0.5)";
    
    // Nur wenn die erforderliche Prozentzahl erreicht wurde, wird die Aufgabe als gelöst markiert
    if (achieved) {
      onCorrect(achieved);
    } else {
      // Wenn nicht erreicht, kann die Aufgabe wiederholt werden
      // Wir markieren sie nicht als gelöst, sondern zeigen einen Hinweis
      const retryButton = document.createElement("button");
      retryButton.textContent = "🔄 Quiz wiederholen";
      retryButton.style.padding = "10px 20px";
      retryButton.style.fontSize = "16px";
      retryButton.style.fontWeight = "bold";
      retryButton.style.background = "#ff9800";
      retryButton.style.color = "white";
      retryButton.style.border = "none";
      retryButton.style.borderRadius = "25px";
      retryButton.style.cursor = "pointer";
      retryButton.style.marginTop = "15px";
      
      retryButton.onclick = () => {
        // Quiz zurücksetzen und neu starten
        isFinished = false;
        isActive = false;
        score = 0;
        answered = 0;
        timeLeft = timeLimit;
        currentQuestionIndex = 0;
        waitingForNext = false;
        
        if (nextQuestionTimeout) clearTimeout(nextQuestionTimeout);
        if (timerInterval) clearInterval(timerInterval);
        
        startContainer.style.display = "flex";
        questionContainer.style.display = "none";
        
        resultContainer.innerHTML = "";
        const newResultText = document.createElement("div");
        newResultText.style.fontSize = "16px";
        resultContainer.appendChild(newResultText);
        
        updateStats();
        updateTimerDisplay();
      };
      
      gameOverContainer.appendChild(retryButton);
    }
  }

  function handleAnswer(userChoice) {
    if (!isActive || isFinished || waitingForNext) return;
    
    waitingForNext = true;
    yesButton.disabled = true;
    noButton.disabled = true;
    
    const isCorrect = (userChoice === currentAnswer);
    
    if (isCorrect) {
      score++;
      resultText.innerHTML = "✅ Richtig! ✅";
      resultText.style.color = "#90EE90";
    } else {
      const answerText = currentAnswer ? "JA" : "NEIN";
      resultText.innerHTML = `❌ Falsch! ${currentNumber.toLocaleString('de-DE')} → Richtige Antwort: ${answerText} ❌`;
      resultText.style.color = "#ff9999";
    }
    
    answered++;
    updateStats();
    
    if (nextQuestionTimeout) clearTimeout(nextQuestionTimeout);
    nextQuestionTimeout = setTimeout(() => {
      if (!isFinished && isActive) {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
          showCurrentQuestion();
          resultText.innerHTML = "";
        } else {
          finishQuiz();
        }
      }
    }, 600);
  }

  function startTimer() {
    if (timerInterval) clearInterval(timerInterval);
    
    timerInterval = setInterval(() => {
      if (!isActive || isFinished) return;
      
      if (timeLeft <= 1) {
        clearInterval(timerInterval);
        timeLeft = 0;
        updateTimerDisplay();
        finishQuiz();
      } else {
        timeLeft--;
        updateTimerDisplay();
        
        if (timeLeft === 10) {
          resultText.innerHTML = "⚠️ Nur noch 10 Sekunden! ⚠️";
          resultText.style.color = "#ffcc00";
          setTimeout(() => {
            if (isActive && !isFinished) resultText.innerHTML = "";
          }, 2000);
        }
      }
    }, 1000);
  }
  
  function startQuiz() {
    if (isFinished) return;
    
    isActive = true;
    score = 0;
    answered = 0;
    timeLeft = timeLimit;
    currentQuestionIndex = 0;
    waitingForNext = false;
    
    questions = generateQuestions();
    
    if (questions.length === 0) {
      resultText.innerHTML = "⚠️ Keine Zahlen definiert! Bitte Aufgabenstellung prüfen.";
      resultText.style.color = "#ffcc00";
      return;
    }
    
    updateStats();
    updateTimerDisplay();
    
    startContainer.style.display = "none";
    questionContainer.style.display = "block";
    
    resultContainer.innerHTML = "";
    const newResultText = document.createElement("div");
    newResultText.style.fontSize = "16px";
    resultContainer.appendChild(newResultText);
    resultText.innerHTML = "";
    
    showCurrentQuestion();
    startTimer();
  }
  
  yesButton.onclick = () => handleAnswer(true);
  noButton.onclick = () => handleAnswer(false);
  startButton.onclick = startQuiz;
  
  if (isFinished && savedState) {
    startContainer.style.display = "none";
    questionContainer.style.display = "none";
    
    const completedContainer = document.createElement("div");
    completedContainer.style.textAlign = "center";
    completedContainer.style.padding = "20px";
    
    const percent = (score / numbersSet.length) * 100;
    const achieved = percent >= requiredPercent;
    const medalEmoji = achieved ? "🏆" : "❌";
    
    completedContainer.innerHTML = `
      <div style="font-size: 24px; font-weight: bold; margin-bottom: 15px;">✅ Quiz bereits abgeschlossen! ✅</div>
      <div style="font-size: 20px; margin-bottom: 10px;">${medalEmoji}</div>
      <div style="font-size: 18px;">✅ Richtige Antworten: ${score}/${numbersSet.length}</div>
      <div style="font-size: 18px;">📊 Erfolgsquote: ${percent.toFixed(1)}%</div>
      <div style="font-size: 18px;">Erforderlich: ${requiredPercent}%</div>
      <div style="font-size: 18px; margin-top: 10px;">Erhaltene Flaggen: ${achieved ? difficulty : 0}</div>
    `;
    
    while (resultContainer.firstChild) resultContainer.removeChild(resultContainer.firstChild);
    resultContainer.appendChild(completedContainer);
  }
  
  const style = document.createElement('style');
  style.textContent = `
    @keyframes pulse {
      0% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.05); opacity: 0.8; }
      100% { transform: scale(1); opacity: 1; }
    }
  `;
  document.head.appendChild(style);
  
  return container;
});
// --------------------
// PRIME_FACTORS - Primfaktorzerlegung mit Buttons
// Die Zahl bleibt konstant, Schüler baut die Primfaktorzerlegung auf
// --------------------
registerInput("prime_factors", ({ task, onCorrect, initialValue, isSolved }) => {
  const container = document.createElement("div");
  container.className = "prime-factors-input";
  container.style.display = "flex";
  container.style.flexDirection = "column";
  container.style.gap = "16px";
  container.style.marginTop = "10px";
  container.style.padding = "15px";
  container.style.background = "#f9f9f9";
  container.style.borderRadius = "12px";
  container.style.border = "1px solid #e0e0e0";

  const targetNumber = task.number || 12;
  const expectedFactors = task.answer || { 2: 2, 3: 1 };
  
  // Zustand
  let factors = {};
  let clickHistory = [];
  
  // Lade gespeicherten Zustand
  if (initialValue && typeof initialValue === 'object') {
    factors = initialValue.factors || {};
    clickHistory = initialValue.clickHistory || [];
  }
  
  // Primzahlen von 2 bis 11 (immer verfügbar)
  const availablePrimes = [2, 3, 5, 7, 11];
  
  // ========== UI ELEMENTE ==========
  
  // Kopfzeile
  const instruction = document.createElement("div");
  instruction.style.fontSize = "16px";
  instruction.style.fontWeight = "bold";
  instruction.style.color = "#333";
  instruction.style.textAlign = "center";
  instruction.style.padding = "12px";
  instruction.style.background = "#e8f0fe";
  instruction.style.borderRadius = "8px";
  instruction.style.marginBottom = "10px";
  instruction.innerHTML = `🔢 Primfaktorzerlegung von ${targetNumber}`;
  container.appendChild(instruction);
  
  // Anzeige der Zahl und der Faktoren
  const displayContainer = document.createElement("div");
  displayContainer.style.textAlign = "center";
  displayContainer.style.marginBottom = "15px";
  displayContainer.style.padding = "15px";
  displayContainer.style.background = "white";
  displayContainer.style.borderRadius = "10px";
  displayContainer.style.border = "2px solid #667eea";
  
  const numberSpan = document.createElement("span");
  numberSpan.style.fontSize = "36px";
  numberSpan.style.fontWeight = "bold";
  numberSpan.style.color = "#667eea";
  numberSpan.innerHTML = targetNumber;
  
  const equalsSpan = document.createElement("span");
  equalsSpan.style.fontSize = "24px";
  equalsSpan.style.margin = "0 10px";
  equalsSpan.innerHTML = "=";
  
  const factorsSpan = document.createElement("span");
  factorsSpan.style.fontSize = "20px";
  factorsSpan.style.fontFamily = "monospace";
  factorsSpan.innerHTML = formatFactors(factors);
  
  displayContainer.appendChild(numberSpan);
  displayContainer.appendChild(equalsSpan);
  displayContainer.appendChild(factorsSpan);
  container.appendChild(displayContainer);
  
  // Primzahlen Buttons (immer aktiv, immer sichtbar)
  const buttonsContainer = document.createElement("div");
  buttonsContainer.style.display = "flex";
  buttonsContainer.style.flexWrap = "wrap";
  buttonsContainer.style.gap = "15px";
  buttonsContainer.style.justifyContent = "center";
  buttonsContainer.style.marginBottom = "15px";
  
  const primeButtons = [];
  
  availablePrimes.forEach(prime => {
    const btnContainer = document.createElement("div");
    btnContainer.style.display = "flex";
    btnContainer.style.flexDirection = "column";
    btnContainer.style.alignItems = "center";
    btnContainer.style.gap = "5px";
    
    const btn = document.createElement("button");
    btn.textContent = prime;
    btn.style.padding = "15px 25px";
    btn.style.fontSize = "24px";
    btn.style.fontWeight = "bold";
    btn.style.background = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
    btn.style.color = "white";
    btn.style.border = "none";
    btn.style.borderRadius = "12px";
    btn.style.cursor = "pointer";
    btn.style.transition = "all 0.2s";
    btn.style.minWidth = "70px";
    
    if (isSolved) {
      btn.disabled = true;
      btn.style.opacity = "0.5";
      btn.style.cursor = "not-allowed";
    }
    
    btn.onmouseenter = () => {
      if (!btn.disabled) btn.style.transform = "scale(1.05)";
    };
    btn.onmouseleave = () => {
      if (!btn.disabled) btn.style.transform = "scale(1)";
    };
    
    btn.onclick = () => {
      if (isSolved) return;
      addFactor(prime);
    };
    
    // Exponent Anzeige unter dem Button
    const exponentSpan = document.createElement("span");
    exponentSpan.style.fontSize = "14px";
    exponentSpan.style.fontWeight = "bold";
    exponentSpan.style.color = "#666";
    exponentSpan.innerHTML = getExponentDisplay(prime);
    
    btnContainer.appendChild(btn);
    btnContainer.appendChild(exponentSpan);
    buttonsContainer.appendChild(btnContainer);
    
    primeButtons.push({ btn, prime, exponentSpan });
  });
  
  container.appendChild(buttonsContainer);
  
  // Aktions-Buttons
  const actionContainer = document.createElement("div");
  actionContainer.style.display = "flex";
  actionContainer.style.gap = "10px";
  actionContainer.style.justifyContent = "center";
  actionContainer.style.marginTop = "10px";
  
  const clearButton = document.createElement("button");
  clearButton.textContent = "🗑️ Alles löschen";
  clearButton.style.padding = "10px 20px";
  clearButton.style.fontSize = "14px";
  clearButton.style.background = "#ff9800";
  clearButton.style.color = "white";
  clearButton.style.border = "none";
  clearButton.style.borderRadius = "8px";
  clearButton.style.cursor = "pointer";
  clearButton.disabled = isSolved;
  
  clearButton.onclick = () => {
    if (isSolved) return;
    resetFactors();
  };
  
  const undoButton = document.createElement("button");
  undoButton.textContent = "↩️ Rückgängig";
  undoButton.style.padding = "10px 20px";
  undoButton.style.fontSize = "14px";
  undoButton.style.background = "#2196f3";
  undoButton.style.color = "white";
  undoButton.style.border = "none";
  undoButton.style.borderRadius = "8px";
  undoButton.style.cursor = "pointer";
  undoButton.disabled = isSolved || clickHistory.length === 0;
  
  undoButton.onclick = () => {
    if (isSolved || clickHistory.length === 0) return;
    undoLastFactor();
  };
  
  actionContainer.appendChild(undoButton);
  actionContainer.appendChild(clearButton);
  container.appendChild(actionContainer);
  
  // Feedback und Prüfbutton
  const feedbackDiv = document.createElement("div");
  feedbackDiv.style.fontSize = "13px";
  feedbackDiv.style.textAlign = "center";
  feedbackDiv.style.padding = "8px";
  feedbackDiv.style.borderRadius = "8px";
  feedbackDiv.style.marginTop = "10px";
  
  const checkButton = document.createElement("button");
  checkButton.textContent = "✓ Primfaktorzerlegung prüfen";
  checkButton.style.padding = "12px 24px";
  checkButton.style.fontSize = "16px";
  checkButton.style.fontWeight = "bold";
  checkButton.style.cursor = "pointer";
  checkButton.style.background = "#667eea";
  checkButton.style.color = "white";
  checkButton.style.border = "none";
  checkButton.style.borderRadius = "25px";
  checkButton.style.marginTop = "15px";
  checkButton.style.width = "100%";
  checkButton.disabled = isSolved;
  
  if (isSolved) {
    checkButton.disabled = true;
    checkButton.style.background = "#4caf50";
    checkButton.textContent = "✓ Gelöst";
  }
  
  container.appendChild(checkButton);
  container.appendChild(feedbackDiv);
  
  // ============================================
  // HILFSFUNKTIONEN
  // ============================================
  
  function getExponentDisplay(prime) {
    const exp = factors[prime] || 0;
    if (exp === 0) return "";
    if (exp === 1) return `${prime}¹`;
    return `${prime}${'²³⁴⁵⁶⁷⁸⁹'[exp-1] || '^' + exp}`;
  }
  
  function updateExponentDisplays() {
    primeButtons.forEach(({ prime, exponentSpan }) => {
      exponentSpan.innerHTML = getExponentDisplay(prime);
    });
  }
  
  function formatFactors(factorsObj) {
    const entries = Object.entries(factorsObj).filter(([_, exp]) => exp > 0);
    if (entries.length === 0) return "";
    
    return entries.map(([prime, exp]) => {
      if (exp === 1) return prime;
      const exponentChar = getExponentChar(exp);
      return `${prime}${exponentChar}`;
    }).join(" × ");
  }
  
  function getExponentChar(exp) {
    const exponents = { 2: "²", 3: "³", 4: "⁴", 5: "⁵", 6: "⁶", 7: "⁷", 8: "⁸", 9: "⁹" };
    return exponents[exp] || `^${exp}`;
  }
  
  function updateDisplay() {
    factorsSpan.innerHTML = formatFactors(factors);
    updateExponentDisplays();
    undoButton.disabled = isSolved || clickHistory.length === 0;
  }
  
  function addFactor(prime) {
    if (isSolved) return;
    
    // Speichere für Undo
    clickHistory.push({ prime, action: 'add' });
    
    // Erhöhe Exponent
    factors[prime] = (factors[prime] || 0) + 1;
    
    // Visuelles Feedback
    const btnInfo = primeButtons.find(p => p.prime === prime);
    if (btnInfo) {
      btnInfo.btn.style.transform = "scale(0.95)";
      setTimeout(() => {
        btnInfo.btn.style.transform = "scale(1)";
      }, 100);
    }
    
    updateDisplay();
    
    // Nur Warnung wenn Produkt zu groß wird
    const product = calculateProduct();
    if (product > targetNumber) {
      feedbackDiv.innerHTML = `⚠️ Das Produkt (${product}) ist bereits größer als ${targetNumber}!`;
      feedbackDiv.style.background = "#fff3e0";
      feedbackDiv.style.color = "#ff9800";
    } else {
      feedbackDiv.innerHTML = "";
      feedbackDiv.style.background = "";
    }
  }
  
  function undoLastFactor() {
    if (isSolved || clickHistory.length === 0) return;
    
    const last = clickHistory.pop();
    if (last.action === 'add') {
      const prime = last.prime;
      factors[prime]--;
      if (factors[prime] === 0) {
        delete factors[prime];
      }
    }
    
    updateDisplay();
    feedbackDiv.innerHTML = "";
    feedbackDiv.style.background = "";
  }
  
  function resetFactors() {
    factors = {};
    clickHistory = [];
    updateDisplay();
    feedbackDiv.innerHTML = "";
    feedbackDiv.style.background = "";
  }
  
  function calculateProduct() {
    let product = 1;
    for (const [prime, exp] of Object.entries(factors)) {
      product *= Math.pow(parseInt(prime), exp);
    }
    return product;
  }
  
  function compareFactors(factors1, factors2) {
    const keys1 = Object.keys(factors1).sort();
    const keys2 = Object.keys(factors2).sort();
    
    if (keys1.length !== keys2.length) return false;
    
    for (const key of keys1) {
      if ((factors1[key] || 0) !== (factors2[key] || 0)) return false;
    }
    return true;
  }
  
  function checkFactors() {
    if (isSolved) return;
    
    const product = calculateProduct();
    const isProductCorrect = (product === targetNumber);
    const isFactorsCorrect = compareFactors(factors, expectedFactors);
    
    if (isProductCorrect && isFactorsCorrect) {
      feedbackDiv.innerHTML = "✅ Richtig! Die Primfaktorzerlegung ist korrekt! 🎉";
      feedbackDiv.style.background = "#e8f5e9";
      feedbackDiv.style.color = "#2e7d32";
      checkButton.disabled = true;
      checkButton.style.background = "#4caf50";
      checkButton.textContent = "✓ Gelöst";
      
      // Buttons deaktivieren
      primeButtons.forEach(({ btn }) => {
        btn.disabled = true;
        btn.style.opacity = "0.5";
        btn.style.cursor = "not-allowed";
      });
      undoButton.disabled = true;
      clearButton.disabled = true;
      
      const result = {
        number: targetNumber,
        factors: factors,
        clickHistory: clickHistory
      };
      onCorrect(result);
    } else if (product !== targetNumber) {
      feedbackDiv.innerHTML = `❌ Das Produkt (${product}) ist nicht gleich ${targetNumber}. Überprüfe deine Faktoren!`;
      feedbackDiv.style.background = "#ffebee";
      feedbackDiv.style.color = "#c62828";
    } else {
      feedbackDiv.innerHTML = "❌ Falsche Primfaktorzerlegung! Versuche es noch einmal.";
      feedbackDiv.style.background = "#ffebee";
      feedbackDiv.style.color = "#c62828";
    }
  }
  
  checkButton.onclick = checkFactors;
  
  return container;
});
// --------------------
// TEXT - Für Textantworten - MIT PRÜFBUTTON
// --------------------
registerInput("text", ({ task, onCorrect, initialValue, isSolved }) => {
  const container = document.createElement("div");
  container.style.display = "flex";
  container.style.flexDirection = "column";
  container.style.gap = "8px";
  container.style.marginTop = "10px";
  container.style.padding = "10px";
  container.style.background = "#f9f9f9";
  container.style.borderRadius = "8px";
  container.style.border = "1px solid #e0e0e0";
  
  const input = document.createElement("input");
  input.type = "text";
  // Unterstützt jetzt task.placeholder, falls vorhanden
  input.placeholder = task.placeholder || "Antwort eingeben...";
  input.style.width = "100%";
  input.style.padding = "8px";
  input.style.borderRadius = "4px";
  input.style.border = "1px solid #ccc";
  
  const feedbackDiv = document.createElement("div");
  feedbackDiv.style.fontSize = "12px";
  feedbackDiv.style.padding = "6px";
  feedbackDiv.style.borderRadius = "6px";
  feedbackDiv.style.textAlign = "center";
  
  const checkButton = document.createElement("button");
  checkButton.textContent = "✓ Prüfen";
  checkButton.style.padding = "6px 18px";
  checkButton.style.fontSize = "13px";
  checkButton.style.cursor = "pointer";
  checkButton.style.background = "#667eea";
  checkButton.style.color = "white";
  checkButton.style.border = "none";
  checkButton.style.borderRadius = "20px";
  checkButton.style.alignSelf = "flex-end";
  
  if (initialValue) input.value = initialValue;
  if (isSolved) {
    input.disabled = true;
    input.classList.add("solved-input");
    checkButton.disabled = true;
    checkButton.style.background = "#4caf50";
    checkButton.textContent = "✓ Gelöst";
  }
  
  const validateAndSubmit = () => {
    if (isSolved || input.disabled) return;
    
    const userAnswer = input.value.trim().toLowerCase();
    if (userAnswer === "") {
      feedbackDiv.innerHTML = "⚠️ Bitte eine Antwort eingeben";
      feedbackDiv.style.background = "#fff3e0";
      feedbackDiv.style.color = "#ff9800";
      return;
    }
    
    const expectedAnswer = task.answer.toLowerCase();
    const alternatives = (task.alternatives || []).map(alt => alt.toLowerCase());
    
    const isCorrect = userAnswer === expectedAnswer || alternatives.includes(userAnswer);
    
    if (isCorrect) {
      input.classList.add("correct");
      input.classList.remove("wrong");
      input.disabled = true;
      checkButton.disabled = true;
      checkButton.style.background = "#4caf50";
      checkButton.textContent = "✓ Gelöst";
      feedbackDiv.innerHTML = "✅ Richtig! 🎉";
      feedbackDiv.style.background = "#e8f5e9";
      feedbackDiv.style.color = "#2e7d32";
      onCorrect(input.value);
    } else {
      input.classList.add("wrong");
      input.classList.remove("correct");
      feedbackDiv.innerHTML = "❌ Falsch! Versuche es noch einmal.";
      feedbackDiv.style.background = "#ffebee";
      feedbackDiv.style.color = "#c62828";
      
      setTimeout(() => {
        if (!isSolved) {
          input.classList.remove("wrong");
          feedbackDiv.innerHTML = "";
        }
      }, 2000);
    }
  };
  
  checkButton.onclick = validateAndSubmit;
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      validateAndSubmit();
    }
  });
  
  container.appendChild(input);
  container.appendChild(checkButton);
  container.appendChild(feedbackDiv);
  
  return container;
});