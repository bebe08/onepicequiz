'use strict';

{
  const question = document.getElementById('question');
  const choices = document.getElementById('choices');
  const btn = document.getElementById('btn');
  const result = document.getElementById('result');
  const scoreLabel = document.querySelector('#result > p');

  const quizSet = shuffle([
    {q: '河童の河松は何の魚人か？', 
    c: ['トラフグ', 'ミドリフグ', 'コクテンフグ']},
    {q: '旱害のジャックは何の魚人だったか？', 
    c: ['タマカイ', 'マハタ', 'ゴライアス']},
    {q: '光月おでんの身長は何cmか？', 
    c: ['382cm', '388cm', '385cm']},
    {q: '革命軍軍隊長ベロ・ベティの懸賞金の額は？', 
    c: ['4億5700万ベリー', '4億6700万ベリー', '4億8700万ベリー']},
    {q: 'ルフィとキッドに倒された兎丼の囚人採掘場の副看守長の一人、カバのSMILEの能力者といえば？', 
    c: ['ドボン', 'ヘボン', 'デボン']},
    {q: '康イエが処刑された花の都の地区といえば？', 
    c: ['羅刹町', '兎丼', '白舞']},
    {q: '天狗が持っていた刀・二代鬼徹のランクは？', 
    c: ['大業物', '業物', '最上大業物']},
    {q: 'イゾウが隊長をつとめていたのは何番隊？', 
    c: ['16番隊', '7番隊', '12番隊']},

  ]);
  let currentNum = 0;
  let isAnswered;
  let score = 0;

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[j], arr[i]] = [arr[i], arr[j]];
    }
    return arr;
  }

  function checkAnswer(li) {
    if (isAnswered) {
      return;
    }
    isAnswered = true;

    if (li.textContent === quizSet[currentNum].c[0]) {
      li.classList.add('correct');
      score++;
    } else {
      li.classList.add('wrong');
    }

    btn.classList.remove('disabled');
  }

  function setQuiz() {
    isAnswered = false;

    question.textContent = quizSet[currentNum].q;

    while (choices.firstChild) {
      choices.removeChild(choices.firstChild);
    }

    const shuffledChoices = shuffle([...quizSet[currentNum].c]);
    shuffledChoices.forEach(choice => {
      const li = document.createElement('li');
      li.textContent = choice;
      li.addEventListener('click', () => {
        checkAnswer(li);
      });
      choices.appendChild(li);
    });

    if (currentNum === quizSet.length - 1) {
      btn.textContent = 'Show Score';
    }
  }

  setQuiz();

  btn.addEventListener('click', () => {
    if (btn.classList.contains('disabled')) {
      return;
    }
    btn.classList.add('disabled');

    if (currentNum === quizSet.length - 1) {
      scoreLabel.textContent = `Score: ${score} / ${quizSet.length}`;
      result.classList.remove('hidden');
    } else {
      currentNum++;
      setQuiz();
    }
  });
}