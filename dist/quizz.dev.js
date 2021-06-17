"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Question =
/*#__PURE__*/
function () {
  function Question(text, choices, answer) {
    _classCallCheck(this, Question);

    this.text = text;
    this.choices = choices;
    this.answer = answer;
  }

  _createClass(Question, [{
    key: "isCorrectAnswer",
    value: function isCorrectAnswer(choice) {
      return this.answer === choice;
    }
  }]);

  return Question;
}();

var questions = [new Question("Quelle méthode Javascript permet de filtrer les éléments d'un tableau", ["indexOf()", "map()", "filter()", "reduce()"], "filter()"), new Question("Quelle méthode Javascript permet de vérifier si un élément figure dans un tableau", ["isNaN()", "includes()", "findIndex()", "isOdd()"], "includes()"), new Question("Quelle méthode transforme du JSON en un objet Javascript ?", ["JSON.parse()", "JSON.stringify()", "JSON.object()", "JSON.toJS"], "JSON.parse()"), new Question("Quel objet Javascript permet d'arrondir à l'entier le plus proche", ["Math.ceil()", "Math.floor()", "Math.round()", "Math.random()"], "Math.round()")];

var Quiz =
/*#__PURE__*/
function () {
  function Quiz(questions) {
    _classCallCheck(this, Quiz);

    this.score = 0;
    this.questions = questions;
    this.currentQuestionIndex = 0;
  }

  _createClass(Quiz, [{
    key: "getCurrentQuestion",
    value: function getCurrentQuestion() {
      return this.questions[this.currentQuestionIndex];
    }
  }, {
    key: "guess",
    value: function guess(answer) {
      if (this.getCurrentQuestion().isCorrectAnswer(answer)) {
        this.score++;
      }

      this.currentQuestionIndex++;
    }
  }, {
    key: "hasEnded",
    value: function hasEnded() {
      return this.currentQuestionIndex >= this.questions.length;
    }
  }]);

  return Quiz;
}();

var display = {
  elementShown: function elementShown(id, text) {
    var element = document.getElementById(id);
    element.innerHTML = text;
  },
  endQuiz: function endQuiz() {
    endQuizHTML = "\n      <h1>Quiz termin\xE9 !</h1>\n      <h3> Votre score est de : ".concat(quiz.score, " / ").concat(quiz.questions.length, "</h3>");
    this.elementShown("quiz", endQuizHTML);
  },
  question: function question() {
    this.elementShown("question", quiz.getCurrentQuestion().text);
  },
  choices: function choices() {
    var choices = quiz.getCurrentQuestion().choices;

    guessHandler = function guessHandler(id, guess) {
      document.getElementById(id).onclick = function () {
        quiz.guess(guess);
        quizApp();
      };
    }; // affichage choix + prise en compte du choix


    for (var i = 0; i < choices.length; i++) {
      this.elementShown("choice" + i, choices[i]);
      guessHandler("guess" + i, choices[i]);
    }
  },
  progress: function progress() {
    var currentQuestionNumber = quiz.currentQuestionIndex + 1;
    this.elementShown("progress", "Question " + currentQuestionNumber + " sur " + quiz.questions.length);
  }
}; // Game logic

quizApp = function quizApp() {
  if (quiz.hasEnded()) {
    display.endQuiz();
  } else {
    display.question();
    display.choices();
    display.progress();
  }
}; // Create Quiz


var quiz = new Quiz(questions);
quizApp();