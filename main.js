let quizArray = [
  {
    questionId: 1,
    questionText: "What country has the highest life expectancy",
    correctAnsId: 3,
    answerArray: [
      { answerId: 1, answer: "Spain" },
      { answerId: 2, answer: "Italy" },
      { answerId: 3, answer: "HongKong" },
    ],
  },
  {
    questionId: 2,
    questionText:
      "Where would you be if you were standing on the Spanish Steps?",
    correctAnsId: 2,
    answerArray: [
      { answerId: 1, answer: "Spain" },
      { answerId: 2, answer: "Rome" },
      { answerId: 3, answer: "Pakistan" },
    ],
  },
  {
    questionId: 3,
    questionText:
      "Which language has the more native speakers: English or Spanish or Arabic?",
    correctAnsId: 1,
    answerArray: [
      { answerId: 1, answer: "Spanish" },
      { answerId: 2, answer: "English " },
      { answerId: 3, answer: "Arabic" },
    ],
  },
];
let list = document.querySelector("ul");
let answerListByUser = [];
let dateTime = document.querySelector("p");
let overallScore = document.getElementById("results");
let questionNo = 0;
let timeOut;
let interval;

const calculateScore = () => {
  list.innerHTML = "";
  let score = 0;
  quizArray.forEach((answerid, count) => {
    if (answerListByUser[count]?.answerId == answerid.correctAnsId) {
      score += 1;
      let details = document.createElement("p");
      details.innerHTML = `Question no  ${count + 1}  correct`;
      overallScore.append(details);
    } else {
      let details = document.createElement("p");
      details.innerHTML = `Question no  ${count + 1} incorrect`;
      overallScore.append(details);
    }
  });

  let overall = document.createElement("p");
  overall.innerHTML = `Your overall Score is ${score}`;
  overallScore.append(overall);
  let playAgain = document.createElement("button");
  playAgain.innerHTML = "Play Again";
  playAgain.addEventListener("click", startQuiz);
  overallScore.append(playAgain);
};
const showNextCard = () => {
  if (questionNo == quizArray.length - 1) {
    clearTimeout(timeOut);
    clearInterval(interval);
    calculateScore();
  } else {
    questionNo += 1;
    renderCard();
  }
};
const submitAnswer = (answerId, questionId) => {
  answerListByUser.push({ questionId, answerId });
};
const createCard = (obj) => {
  let card = document.createElement("li");
  let noOfQuestions = document.createElement("p");
  card.setAttribute("id", obj.questionId);
  noOfQuestions.innerHTML = `Question ${questionNo + 1} / ${quizArray.length}`;
  card.append(noOfQuestions);

  let question = document.createElement("p");
  question.innerText = obj.questionText;
  card.append(question);

  obj.answerArray.forEach((item, index) => {
    let answerButton = document.createElement("button");
    answerButton.innerHTML = obj.answerArray[index].answer;
    answerButton.setAttribute("id", obj.answerArray[index].answerId);
    answerButton.addEventListener("click", () => {
      submitAnswer(obj.answerArray[index].answerId, obj.questionId);
      showNextCard();
    });
    card.append(answerButton);
  });
  return card;
};
const renderCard = () => {
  list.innerHTML = "";
  if (questionNo < quizArray.length) {
    question = quizArray[questionNo];
    let card = createCard(question);
    list.append(card);
  }
};
const displayTime = () => {
  let timeLeft = 10;
  interval = setInterval(function () {
    if (timeLeft <= 0) {
      clearInterval(interval);
      dateTime.innerHTML = "Finished";
    } else {
      dateTime.innerHTML = timeLeft + " seconds remaining";
    }
    timeLeft -= 1;
  }, 1000);
};
const startQuiz = () => {
  questionNo = 0;
  overallScore.innerHTML = "";
  list.innerHTML = "";
  renderCard();
  timeOut = setTimeout(calculateScore, 10000);
  displayTime();
};

startQuiz();
