// Sample Data
const lessons = {
    vocabulary: [
        { word: "Hola", translation: "Hello" },
        { word: "Gracias", translation: "Thank you" },
        { word: "Perro", translation: "Dog" },
        { word: "Gato", translation: "Cat" }
    ],
    grammar: [
        { word: "Yo soy", translation: "I am" },
        { word: "Tú eres", translation: "You are" },
        { word: "Él es", translation: "He is" },
        { word: "Ella es", translation: "She is" }
    ]
};

let currentCategory = "";
let currentIndex = 0;
let quizIndex = 0;

// DOM Elements
const wordEl = document.getElementById("word");
const translationEl = document.getElementById("translation");
const nextBtn = document.getElementById("next-btn");
const pronounceBtn = document.getElementById("pronounce-btn");
const categoryBtns = document.querySelectorAll(".category-btn");

const quizQuestion = document.getElementById("quiz-question");
const quizAnswer = document.getElementById("quiz-answer");
const checkAnswerBtn = document.getElementById("check-answer");
const quizResult = document.getElementById("quiz-result");
const startQuizBtn = document.getElementById("start-quiz");

// Load category
categoryBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        currentCategory = btn.dataset.category;
        currentIndex = 0;
        showFlashcard();
    });
});

// Show flashcard
function showFlashcard() {
    if (!currentCategory) return;
    const item = lessons[currentCategory][currentIndex];
    wordEl.textContent = item.word;
    translationEl.textContent = item.translation;
}

// Next card
nextBtn.addEventListener("click", () => {
    if (!currentCategory) return;
    currentIndex = (currentIndex + 1) % lessons[currentCategory].length;
    showFlashcard();
});

// Pronounce word
pronounceBtn.addEventListener("click", () => {
    if (!currentCategory) return;
    const item = lessons[currentCategory][currentIndex];
    let utterance = new SpeechSynthesisUtterance(item.word);
    utterance.lang = "es-ES"; // Spanish
    speechSynthesis.speak(utterance);
});

// Start Quiz
startQuizBtn.addEventListener("click", () => {
    if (!currentCategory) return;
    quizIndex = 0;
    showQuizQuestion();
});

// Show quiz question
function showQuizQuestion() {
    const item = lessons[currentCategory][quizIndex];
    quizQuestion.textContent = `Translate: ${item.word}`;
    quizAnswer.value = "";
    quizResult.textContent = "";
}

// Check quiz answer
checkAnswerBtn.addEventListener("click", () => {
    const item = lessons[currentCategory][quizIndex];
    if (quizAnswer.value.trim().toLowerCase() === item.translation.toLowerCase()) {
        quizResult.textContent = "✅ Correct!";
    } else {
        quizResult.textContent = `❌ Wrong! Correct answer: ${item.translation}`;
    }
    quizIndex = (quizIndex + 1) % lessons[currentCategory].length;
    setTimeout(showQuizQuestion, 1500);
});
