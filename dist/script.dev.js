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

var questions = [new Question("Le SPM, qu’est-ce que c’est?", ["Le syndrome prémenstruel", "Une maladie sexuelle", "Serviette de protection"]), new Question("Bonne réponse ! ", ["Le syndrome prémenstruel"]), new Question("Le SPM, c’est le syndrome prémenstruel: un ensemble de symptômes temporaires qui apparaissent environ une semaine avant l’arrivée de tes règles. C'est différent pour chaque fille, tu peux parfois constater que ton humeur change ou ressentir certains inconforts physiques.", ["Continuer"]), new Question("Pour en apprendre d'avantage ", ["Question 1 : SPM", "Question 2 : Seins", "Question 3 : Acné", "Question 4 : Poils", "Question 5 : première règle", "Question 6 : Émotions"])];

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
    endQuizHTML = "\n    <button class=\"acne\"> Question 3 : Acn\xE9 </button>\n      <h1> Tout public </h1>\n      <button class=\"toutpublic\">\n      <p>Qu\u2019est-ce que l\u2019acn\xE9 ?</p>\n\n      L\u2019acn\xE9 est une dermatose chronique b\xE9nigne, mais g\xEAnante sur le plan esth\xE9tique. Elle \xE9volue par pouss\xE9es, atteint principalement le visage, et peut parfois avoir des cons\xE9quences psychologiques importantes. Elle est fr\xE9quente chez l\u2019adolescent (plus de 70% des gar\xE7ons), et r\xE9gresse dans plus de 90% des cas avant 20-25 ans. Le traitement est simple : des cr\xE8mes et traitements oraux seront associ\xE9s \xE0 des mesures d\u2019hygi\xE8ne.\n  \n      <p>On distingue 3 types de l\xE9sions:</p>\n      \n      l\u2019hyper-s\xE9borrh\xE9e (aspect gras au toucher de la peau, pr\xE9dominant sur le nez, le front, les joues et la r\xE9gion thoracique sup\xE9rieure, et qui donne un aspect brillant au visage),\n      les l\xE9sions r\xE9tentionnelles (com\xE9dons = points noirs, kystes = points blancs),\n      les l\xE9sions inflammatoires, \xABrouges\xBB pouvant \xEAtre douloureuses (papules = l\xE9sions rouges, pustules = points blancs sur fond rouge).\n      Les facteurs responsables de l\u2019acn\xE9 sont divers. Il existerait un lien h\xE9r\xE9ditaire pour les acn\xE9s s\xE9v\xE8res et un lien av\xE9r\xE9 avec les changements hormonaux. C\u2019est pourquoi l\u2019adolescence est la p\xE9riode la plus propice \xE0 ce probl\xE8me tout comme la p\xE9riode des r\xE8gles ou de la grossesse chez les femmes.</button>\n      <a href=\"page-filles.html\" class=\"buttonrose\">Revenir aux th\xE8mes</a> \n    <h3> R\xE9sultat : ".concat(quiz.score, " / ").concat(quiz.questions.length, "</h3>");
    this.elementShown("quiz", endQuizHTML);
  },
  question: function question() {
    this.elementShown("question", quiz.getCurrentQuestion().text);
  },
  choices: function choices() {
    var choices = quiz.getCurrentQuestion().choices;
    document.getElementById("choices").innerHTML = "";
    var i = 0;
    choices.forEach(function (choice) {
      document.getElementById("choices").innerHTML += "\n      <button id=\"guess".concat(i, "\" class=\"btn\"><p id=\"choice").concat(i, "\">").concat(choice, "</p></button>\n      ");
      i++;
    });

    guessHandler = function guessHandler(id, guess) {
      document.getElementById(id).onclick = function () {
        quiz.guess(guess);
        quizApp();
      };
    }; // affichage choix + prise en compte du choix


    for (var _i = 0; _i < choices.length; _i++) {
      this.elementShown("choice" + _i, choices[_i]);
      guessHandler("guess" + _i, choices[_i]);
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