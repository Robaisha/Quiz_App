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
let no = 0;

const setTimer = () => {};
const createCard = (obj) => {
  let noOfQuestions = document.createElement("p");
  let card = document.createElement("li");
  card.setAttribute("id", obj.questionId);
  noOfQuestions.innerHTML = `Question ${no + 1} / ${quizArray.length}`;
  card.append(noOfQuestions);
  let question = document.createElement("p");

  question.innerText = obj.questionText;
  card.append(question);

  obj.answerArray.forEach((item, index) => {
    let answerButton = document.createElement("button");
    answerButton.innerHTML = obj.answerArray[index].answer;
    answerButton.addEventListener("click", () => {
      submitAnswer(obj.answerArray[index].answerId, obj.questionId);
    });
    answerButton.setAttribute("id", obj.answerArray[index].answerId);
    answerButton.addEventListener("click", () => {
      showNextCard();
    });
    card.append(answerButton);
  });
  return card;
};
const showNextCard = () => {
  no += 1;
  renderCard();
};
const renderCard = () => {
  list.innerHTML = "";
  if (no < quizArray.length) {
    question = quizArray[no];
    let card = createCard(question);
    list.append(card);
  }
};
const submitAnswer = (answerId, questionId) => {
  let selectedCard = document.getElementById(questionId);
  let newArray = answerListByUser.find((obj) => obj.questionId == questionId);
  if (newArray) {
    let updatedArray = answerListByUser.map((item) => {
      if (item.questionId == questionId) {
        item.answerId = answerId;
      }
      return item;
    });
    answerListByUser = updatedArray;
  } else {
    answerListByUser.push({ questionId, answerId });
  }
  selectedCard.childNodes.forEach((item, id) => {
    if (item.nodeName == "BUTTON") {
      if (item.id == answerId) {
        selectedCard.childNodes[item.id].classList.add("selected_button");
        return;
      }
      selectedCard.childNodes[item.id]?.classList.remove("selected_button");
    }
  });
};
const calculateScore = () => {
  list.classList.toggle("d-none");
  let score = 0;
  let overallScore = document.getElementById("results");
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
  no = 0;
  let playAgain = document.createElement("button");
  playAgain.innerHTML = "Play Again";
  playAgain.addEventListener("click", () => {
    play();
  });
  playAgain.addEventListener("click", () => {
    overallScore.classList.toggle("d-none");
  });
  overallScore.append(playAgain);
};
const play = () => {
  list.classList.toggle("d-block");
  let timeOut = setTimeout(calculateScore, 10000);
  let timeLeft = 10;
  let tt = setInterval(function () {
    if (timeLeft <= 0) {
      clearInterval(tt);
      dateTime.innerHTML = "Finished";
      no = 0;
    } else if (quizArray.length < no + 1) {
      clearInterval(tt);
      clearTimeout(timeOut);
      dateTime.innerHTML = "Finished";
      calculateScore();
    } else {
      renderCard();
      dateTime.innerHTML = timeLeft + " seconds remaining";
    }
    timeLeft -= 1;
  }, 1000);
};
play();
