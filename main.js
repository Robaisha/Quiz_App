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
let count = 0;
let answerListByUser = [];

const createCard = (obj) => {
  let card = document.createElement("li");
  let question = document.createElement("p");
  question.innerText = obj.questionText;
  //option 1
  let answer1 = document.createElement("button");
  answer1.innerHTML = obj.answerArray[0].answer;
  answer1.addEventListener("click", () => {
    submitAnswer(obj.answerArray[0].answerId);
  });
  //option 2
  let answer2 = document.createElement("button");
  answer2.innerHTML = obj.answerArray[1].answer;
  answer2.addEventListener("click", () => {
    submitAnswer(obj.answerArray[1].answerId);
  });
  //option 3
  let answer3 = document.createElement("button");
  answer3.innerHTML = obj.answerArray[2].answer;
  answer3.addEventListener("click", () => {
    submitAnswer(obj.answerArray[2].answerId);
  });

  card.append(question);
  card.append(answer1);
  card.append(answer2);
  card.append(answer3);
  return card;
};
const renderCard = () => {
  quizArray.forEach((question) => {
    let card = createCard(question);
    list.append(card);
  });
};
const submitAnswer = (answerId) => {
  answerListByUser[count] = answerId;
  console.log(answerListByUser[count]);
  count += 1;
  if (count == quizArray.length) {
    calculateScore();
  }
};
const calculateScore = () => {
  let score = 0;
  count = 0;
  quizArray.forEach((answerid) => {
    if (answerListByUser[count] == answerid.correctAnsId) {
      score += 1;
      document.write("Question no ", count + 1, " correct");
      document.write('<br>')
    }
    else{
        document.writeln("Question no ", count + 1, "incorrect");
        document.write('<br>')
    }
    count += 1;
  });
  document.write("Your overall Score is ", score);
};
renderCard();
