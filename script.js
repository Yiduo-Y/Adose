class Question {
  constructor(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
  }
  isCorrectAnswer(choice) {
    return this.answer === choice;
  }
}
const questions = [
  new Question("Le SPM, qu’est-ce que c’est?", ["Le syndrome prémenstruel", "Une maladie sexuelle", "Serviette de protection"]),
  new Question("Bonne réponse ! ", ["Le syndrome prémenstruel"]),
  new Question("Le SPM, c’est le syndrome prémenstruel: un ensemble de symptômes temporaires qui apparaissent environ une semaine avant l’arrivée de tes règles. C'est différent pour chaque fille, tu peux parfois constater que ton humeur change ou ressentir certains inconforts physiques.", ["Continuer"]),
  new Question("Pour en apprendre d'avantage ", ["Question 1 : SPM", "Question 2 : Seins", "Question 3 : Acné", "Question 4 : Poils", "Question 5 : première règle", "Question 6 : Émotions"]),
];

class Quiz {
  constructor(questions) {
    this.score = 0;
    this.questions = questions;
    this.currentQuestionIndex = 0;
  }
  getCurrentQuestion() {
    return this.questions[this.currentQuestionIndex];
  }
  guess(answer) {
    if (this.getCurrentQuestion().isCorrectAnswer(answer)) {
      this.score++;
    }
    this.currentQuestionIndex++;
  }
  hasEnded() {
    return this.currentQuestionIndex >= this.questions.length;
  }
}

const display = {
  elementShown: function(id, text) {
    let element = document.getElementById(id);
    element.innerHTML = text;
  },
  endQuiz: function() {
    endQuizHTML = `
    <button class="acne"> Question 3 : Acné </button>
      <h1> Tout public </h1>
      <button class="toutpublic">
      <p>Qu’est-ce que l’acné ?</p>

      L’acné est une dermatose chronique bénigne, mais gênante sur le plan esthétique. Elle évolue par poussées, atteint principalement le visage, et peut parfois avoir des conséquences psychologiques importantes. Elle est fréquente chez l’adolescent (plus de 70% des garçons), et régresse dans plus de 90% des cas avant 20-25 ans. Le traitement est simple : des crèmes et traitements oraux seront associés à des mesures d’hygiène.
  
      <p>On distingue 3 types de lésions:</p>
      
      l’hyper-séborrhée (aspect gras au toucher de la peau, prédominant sur le nez, le front, les joues et la région thoracique supérieure, et qui donne un aspect brillant au visage),
      les lésions rétentionnelles (comédons = points noirs, kystes = points blancs),
      les lésions inflammatoires, «rouges» pouvant être douloureuses (papules = lésions rouges, pustules = points blancs sur fond rouge).
      Les facteurs responsables de l’acné sont divers. Il existerait un lien héréditaire pour les acnés sévères et un lien avéré avec les changements hormonaux. C’est pourquoi l’adolescence est la période la plus propice à ce problème tout comme la période des règles ou de la grossesse chez les femmes.</button>
      <a href="page-filles.html" class="buttonrose">Revenir aux thèmes</a> 
    <h3> Résultat : ${quiz.score} / ${quiz.questions.length}</h3>`;
    this.elementShown("quiz", endQuizHTML);
  },
  question: function() {
    this.elementShown("question", quiz.getCurrentQuestion().text);
  },
  choices: function() {
    let choices = quiz.getCurrentQuestion().choices;
    document.getElementById("choices").innerHTML = "";
    let i = 0;

    choices.forEach(choice => {
      document.getElementById("choices").innerHTML +=
      `
      <button id="guess${i}" class="btn"><p id="choice${i}">${choice}</p></button>
      `;
      i++;
    });

    guessHandler = (id, guess) => {
      document.getElementById(id).onclick = function() {
        quiz.guess(guess);
        quizApp();
      }
    }
    // affichage choix + prise en compte du choix
    for(let i = 0; i < choices.length; i++) {
      this.elementShown("choice" + i, choices[i]);
      guessHandler("guess" + i, choices[i]);
    }
  },
  progress: function() {
    let currentQuestionNumber = quiz.currentQuestionIndex + 1;
    this.elementShown("progress", "Question " + currentQuestionNumber + " sur " + quiz.questions.length);
  },
};

// Game logic
quizApp = () => {
  if (quiz.hasEnded()) {
    display.endQuiz();
  } else {
    display.question();
    display.choices();
    display.progress();
  } 
}
// Create Quiz
let quiz = new Quiz(questions);
quizApp();
