'use strict';

{
  const question = document.getElementById('question');
  const choices = document.getElementById('choices');
  const btn = document.getElementById('btn');
  const result = document.getElementById('result');
  const scoreLabel = document.querySelector('#result > p');

  const quizSet = shuffle([
    {q: 'お玉はルフィの事を何と呼んで慕っていたか？', 
    c: ['アニキ', 'おにぃ', 'あんちゃん']},
    {q: 'ジャックの異名は名のジャックか？', 
    c: ['旱害のジャック', '災害のジャック', '火災のジャック']},
    {q: '漫画1000話のタイトルは？', 
    c: ['麦わらのルフィ', '麦わらの一味', '麦わら海賊団']},
    {q: '20年前にワノ国の城下町だった場所とは？', 
    c: ['博羅町', 'おでん城の跡地', '花の都']},
    {q: '剣豪リューマの墓が荒らされたのはいつ？', 
    c: ['23年前', '20年前', '25年前']},
    {q: '大工フランキーのワノ国での名前は？', 
    c: ['フラの介', 'フラ吉', 'フラ蔵']},
    {q: '次のうちで、一番年齢が若いのは？', 
    c: ['ルフィ', 'ゾロ', 'サンジ']},
    {q: '次のうちで、一番身長が大きいのは？', 
    c: ['ゾロ', 'ウソップ', 'サンジ']},
    {q: 'クイーンの懸賞金の額は？', 
    c: ['13億2000万ベリー', '13億3000万ベリー', '13億4000万ベリー']},
    {q: '光月おでんはシャンクスの事を何と呼んでいたか？', 
    c: ['赤太郎', '赤髪', '赤髪の坊や']},
    {q: 'お玉の年齢は？', 
    c: ['8歳', '7歳', '6歳']},

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