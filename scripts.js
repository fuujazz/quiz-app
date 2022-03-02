const question_el = document.getElementById("question");
const answers = document.querySelectorAll("#choices");
const tab = document.getElementById("tab");

let Question = function (_text, _choices, _answer) {
  this.text = _text;
  this.choices = _choices;
  this.answer = _answer;
};

//  question prototype

Question.prototype.checkAnswer = function (_answer) {
  return this.answer === _answer;
};

//  quiz constructor

function Quiz(_questions) {
  this.questions = _questions;
  this.score = 0;
  this.questionIndex = 0;
}

//  quiz prototype

Quiz.prototype.getQuestion = function () {
  return this.questions[this.questionIndex];
};

//  quiz isFinished

Quiz.prototype.isFinished = function () {
  return this.questions.length === this.questionIndex;
};

//  Quiz guess

Quiz.prototype.guess = function (_answer) {
  let question = this.getQuestion();

  if (question.checkAnswer(_answer)) {
    this.score++;
  }
  this.questionIndex++;
};

let q1 = new Question(
  "What's the best programming language",
  ["C#", "Solidity", "Python", "Javascript"],
  "Javascript"
);
let q2 = new Question(
  "What's the best programming language",
  ["C#", "NodeJS", "visual basic", "Javascript"],
  "Javascript"
);
let q3 = new Question(
  "What's the best modern programming language",
  ["C#", "Solidity", "Python", "Javascript"],
  "Javascript"
);

let questions = [q1, q2, q3];

//  Start Quiz

let quiz = new Quiz(questions);

loadQuestion();

function loadQuestion() {
  if (quiz.isFinished()) {
    showScore();
  } else {
    let question = quiz.getQuestion();
    let choices = question.choices;

    document.querySelector("#question").textContent = question.text;

    for (let i = 0; i < choices.length; i++) {
      let element = document.querySelector(`#choice` + i);
      element.innerHTML = choices[i];

      guess("btn" + i, choices[i]);
    }

    showProgress();
  }
}

function guess(_id, _guesss) {
  let btn = document.getElementById(_id);
  btn.onclick = function () {
    quiz.guess(_guesss);
    loadQuestion();
  };
}

function showScore() {
  let html = `<h2>Score</h2><h4>${quiz.score}</h4>`;

  document.querySelector(".card-body").innerHTML = html;
}

function showProgress() {
  let totalQuestion = quiz.questions.length;
  let currentQuestion = quiz.questionIndex + 1;
  document.querySelector("#progress").innerHTML =
    "Question " + currentQuestion + " of " + totalQuestion;
}
