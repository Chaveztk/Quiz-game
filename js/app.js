import Question from './Question.js';
import Quiz from './Quiz.js';


const App = (() => {
  // cache the Dom
  const quizEl = document.querySelector('.myquiz');
  const quizQuestionEl = document.querySelector('.myquiz__question');
  const trackerEl = document.querySelector('.myquiz__tracker');
  const tagLineEl = document.querySelector('.myquiz__tagline');
  const choicesEl = document.querySelector('.myquiz__choices');
  const progressInnerEl = document.querySelector('.progress__inner');
  const nextButtonEl = document.querySelector('.next');
  const restartButtonEl = document.querySelector('.restart');



  const q1 = new Question(
    'What year was JavaScript created',
    ['1995', '2000', '1989', '1997'],
    0);

  const q2 = new Question(
    'Who is the Founder of Apple?',
    ['mark zuckerberg', 'Bill Gates', 'Steve Jobs', 'Jobs Steve'],
    2);

  const q3 = new Question(
    'What Sport does Lebron James play?',
    ['Football', 'Basketball', 'Cricket', 'Tennis'],
    1);

  const q4 = new Question(
    'Who is the Founder of Amazon',
    ['Boris Johnson', 'Jeff Bezos', 'Ted Jorgensen', 'Derrick Rose'],
    1);


  const quiz = new Quiz([q1, q2, q3, q4]);

  const listeners = () => {
    nextButtonEl.addEventListener('click', function() {
      const selectedRadioElem = document.querySelector('input[name="choice"]:checked');
      if (selectedRadioElem) {
        const key = Number(selectedRadioElem.getAttribute('data-order'));
        quiz.guess(key);
        renderAll();
      }
    });


    restartButtonEl.addEventListener('click', function() {
      quiz.rest();
      renderAll();
      nextButtonEl.style.opacity = 1;
    });
  };



  const setValue = (elem, value) => {
    elem.innerHTML = value;
  };


  const renderQuestion = () => {
    const question = quiz.getCurrentQuestion().question;
    setValue(quizQuestionEl, question);
    // quizQuestionEl.innerHTML = question;
  };

  const renderChoicesElements = () => {
    let markup = '';
    const currentChoices = quiz.getCurrentQuestion().choices;
    currentChoices.forEach((elem, index) => {
      markup += `

    <li class="myquiz__choice">
      <input type="radio" name="choice" class="myquiz__input" data-order="${index}" id="choice${index}">
      <label for="choice${index}" class="myquiz__label">
        <i></i>
        <span>${elem}</span>
      </label>
    </li>
    `;
    });
    setValue(choicesEl, markup);
  };

  const renderTracker = () => {
    const index = quiz.currentIndex;
    setValue(trackerEl, `${index + 1} of ${quiz.questions.length}`);
  };


  const getPercentage = (num1, num2) => {
    return Math.round((num1/num2) * 100);
  };

  const launch = (width, maxPercent) => {
    let loadingBar = setInterval(function(){
      if (width > maxPercent) {
        clearInterval(loadingBar);
      } else {
        width++;
        progressInnerEl.style.width = width + '%';
      }
    }, 3);
  };


  const renderProgress = () => {
    const currentWidth = getPercentage(quiz.currentIndex, quiz.questions.length);
    launch(0, currentWidth);
  };

  const renderEndScreen = () => {
    setValue(quizQuestionEl, 'Good Job!');
    setValue(tagLineEl, 'Complete!');
    setValue(trackerEl,`Your score: ${getPercentage(quiz.score, quiz.questions.length)} % `);
    nextButtonEl.style.opacity = 0;
    renderProgress();
  };

  const renderAll = () => {
    if (quiz.hasEnded()) {
      renderEndScreen();
    } else {
      renderQuestion();
      renderChoicesElements();
      renderTracker();
      renderProgress();

    }
  };

  return {
    renderAll: renderAll,
    listeners: listeners
  };
})();

App.renderAll();
App.listeners();
