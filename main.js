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
let no = 0;

const createCard = (obj) => {
  let card = document.createElement("li");
  card.setAttribute('id',obj.questionId)
  let question = document.createElement("p");

  question.innerText = obj.questionText;
  card.append(question);

  obj.answerArray.forEach((item, index) => {
    let answerButton = document.createElement("button");
    answerButton.innerHTML = obj.answerArray[index].answer;
    answerButton.addEventListener("click", () => {
      submitAnswer(obj.answerArray[index].answerId, obj.questionId);
    });
    answerButton.setAttribute("id",obj.answerArray[index].answerId)
    card.append(answerButton);
  });

  //next button
  let nextButton = document.createElement("button");
  nextButton.addEventListener("click", () => {
    showNextCard();
  });
  if (quizArray?.length > obj.questionId) {
    nextButton.innerText = "Next";
    nextButton.setAttribute("class", "next");
  } else {
    nextButton.innerText = "Submit";
    nextButton.addEventListener("click", () => {
        calculateScore()
    });

    nextButton.setAttribute("class", "submit");
  }

  card.append(nextButton);
  return card;
};
const showNextCard = () => {
  no += 1;
  renderCard();
};
const renderCard = () => {
  list.innerHTML = "";
  quizArray.forEach((question, index) => {
    if (index == no) {
      let card = createCard(question);
      list.append(card);
    }
  });
};
const submitAnswer = (answerId, questionId) => {
  let selectedCard=document.getElementById(questionId)
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
  selectedCard.childNodes.forEach((item,id)=>{
    if(item.nodeName=="BUTTON"){
    if(item.id==answerId ){
      selectedCard.childNodes[item.id].classList.add('selected_button')
      return
    }
    selectedCard.childNodes[item.id]?.classList.remove('selected_button')
  }
  })

};
const calculateScore = () => {
  let score = 0;
  quizArray.forEach((answerid, count) => {
    if (answerListByUser[count]?.answerId == answerid.correctAnsId) {
      score += 1;
      document.write("Question no ", count + 1, " correct");
      document.write("<br>");
    } else {
      document.write("Question no ", count + 1, "incorrect");
      document.write("<br>");
    }
  });
  document.write("Your overall Score is ", score);
};
renderCard();
