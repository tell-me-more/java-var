// Lernwebseite: Interaktive Elemente zu Variablen in Java

// 1) Visuelle Variablen-Box
let punkte = 0;
const punkteAnzeige = document.getElementById("punkteAnzeige");

function renderPunkte() {
  punkteAnzeige.textContent = String(punkte);
}

document.getElementById("plusPunkt").addEventListener("click", () => {
  punkte += 1;
  renderPunkte();
});

document.getElementById("minusPunkt").addEventListener("click", () => {
  punkte -= 1;
  renderPunkte();
});

document.getElementById("resetPunkt").addEventListener("click", () => {
  punkte = 0;
  renderPunkte();
});

// 2) Schritt-für-Schritt-Erklärung
const schritte = [
  "1) Deklaration: Es wird eine Variable mit dem Namen 'punkte' angelegt (Typ: int).",
  "2) Initialisierung: int punkte = 0; → In 'punkte' wird der Startwert 0 gespeichert.",
  "3) Alter Wert lesen: Bei punkte = punkte + 1; liest Java zuerst den aktuellen Wert von 'punkte'.",
  "4) Rechnen: Zu diesem Wert wird 1 addiert.",
  "5) Speichern: Das Ergebnis wird wieder in 'punkte' gespeichert. Der Name bleibt gleich.",
];

const stepList = document.getElementById("stepList");
let aktuellerSchritt = 0;

function renderSchritte() {
  stepList.innerHTML = "";
  if (aktuellerSchritt === 0) {
    const li = document.createElement("li");
    li.textContent = "Klicke auf 'Nächster Schritt', um zu starten.";
    stepList.appendChild(li);
    return;
  }

  for (let i = 0; i < aktuellerSchritt; i += 1) {
    const li = document.createElement("li");
    li.textContent = schritte[i];
    stepList.appendChild(li);
  }
}

document.getElementById("nextStep").addEventListener("click", () => {
  if (aktuellerSchritt < schritte.length) {
    aktuellerSchritt += 1;
    renderSchritte();
  }
});

document.getElementById("resetStep").addEventListener("click", () => {
  aktuellerSchritt = 0;
  renderSchritte();
});

// 3) Datentypen-Übung mit direktem Feedback
const datentypSelects = Array.from(document.querySelectorAll("#datentypForm select"));

datentypSelects.forEach((select) => {
  select.addEventListener("change", () => {
    const korrekt = select.dataset.correct;
    const feedback = document.getElementById(`fb-${select.id}`);

    if (!select.value) {
      feedback.textContent = "";
      feedback.className = "feedback";
      return;
    }

    if (select.value === korrekt) {
      feedback.textContent = "Richtig!";
      feedback.className = "feedback ok";
    } else {
      feedback.textContent = `Noch nicht richtig. Korrekt ist: ${korrekt}.`;
      feedback.className = "feedback error";
    }
  });
});

// 4) Fehler finden
const errorItems = Array.from(document.querySelectorAll(".error-item"));

errorItems.forEach((item) => {
  const buttons = item.querySelectorAll(".error-btn");
  const feedback = item.querySelector(".feedback");
  const korrekt = item.dataset.correct;
  const codeText = item.querySelector("code").textContent;

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const antwort = button.dataset.answer;
      if (antwort === korrekt) {
        feedback.className = "feedback ok";
        if (codeText.includes("String name = Mia")) {
          feedback.textContent =
            "Richtig! 'Mia' ist Text und braucht Anführungszeichen: String name = \"Mia\";";
        } else if (codeText.includes('boolean fertig = "true"')) {
          feedback.textContent =
            "Richtig! Bei boolean schreibt man true ohne Anführungszeichen.";
        } else {
          feedback.textContent = "Richtig! Diese Zeile ist korrekt geschrieben.";
        }
      } else {
        feedback.className = "feedback error";
        if (codeText.includes("int alter = 12")) {
          feedback.textContent =
            "Nicht ganz. Das ist korrekt: Typ int, Name alter, Wert 12.";
        } else if (codeText.includes("String name = Mia")) {
          feedback.textContent =
            "Noch nicht. 'Mia' muss in Anführungszeichen stehen.";
        } else if (codeText.includes("double hund = ")){ 
          feedback.textContent = 
            "Leider nicht richtig. Schau dir Datentyp und Inhalt nochmal genau an."
        } else {
          feedback.textContent =
            "Noch nicht. boolean nutzt true/false ohne Anführungszeichen.";
        }
      }
    });
  });
});

// 5) Mini-Quiz
const quizAntworten = {
  q1: "b",
  q2: "c",
  q3: "a",
  q4: "b",
  q5: "a",
  q6: "b",
};

function getQuizRuemeldung(punktezahl, maxPunkte) {
  if (punktezahl === maxPunkte) {
    return "Super! Du hast alles richtig. Sehr stark!";
  }
  if (punktezahl >= Math.ceil(maxPunkte * 0.7)) {
    return "Gut gemacht! Du hast das meiste verstanden.";
  }
  if (punktezahl >= Math.ceil(maxPunkte * 0.4)) {
    return "Guter Anfang. Schau dir die Beispiele noch einmal an.";
  }
  return "Kein Problem: Übe noch einmal mit den Boxen und Beispielen.";
}

document.getElementById("quizAuswerten").addEventListener("click", () => {
  let punktezahl = 0;
  const maxPunkte = Object.keys(quizAntworten).length;

  Object.entries(quizAntworten).forEach(([frage, korrekt]) => {
    const checked = document.querySelector(`input[name="${frage}"]:checked`);
    if (checked && checked.value === korrekt) {
      punktezahl += 1;
    }
  });

  const ergebnis = document.getElementById("quizErgebnis");
  ergebnis.textContent = `Du hast ${punktezahl} von ${maxPunkte} Punkten. ${getQuizRuemeldung(
    punktezahl,
    maxPunkte
  )}`;
});

// Initiale Darstellung
renderPunkte();
renderSchritte();
