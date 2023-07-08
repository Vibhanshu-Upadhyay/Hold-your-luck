'use strict';

let player0El = document.querySelector('.player--0');
let player1El = document.querySelector('.player--1');

let score0El = document.querySelector('#score--0');
let score1El = document.querySelector('#score--1');

let current0El = document.querySelector('#current--0');
let current1El = document.querySelector('#current--1');

let diceEl = document.querySelector('.dice');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//Starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

let final = [0, 0];
let cur_score = 0;
let activePlayer = 0;
let playing = true;

function switchPlayer() {
  cur_score = 0;
  document.getElementById(`current--${activePlayer}`).textContent = cur_score;
  activePlayer = activePlayer === 1 ? 0 : 1;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
}

btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generate a random dice number
    let diceVal = Math.trunc(Math.random() * 6) + 1;

    //2. Show the image
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${diceVal}.png`;

    //3. Check is rolled value is 1
    if (diceVal == 1) {
      //Switch players
      switchPlayer();
    } else {
      //Add the dice roll value to current score
      cur_score += diceVal;
      document.getElementById(`current--${activePlayer}`).textContent =
        cur_score;
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //1. Add current score to final score
    final[activePlayer] += cur_score;
    document.querySelector(`#score--${activePlayer}`).textContent =
      final[activePlayer];

    //2. When score is 20
    if (final[activePlayer] >= 2) {
      //Player wins
      document.querySelector(`#name--${activePlayer}`).textContent = `WINNER`;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.toggle('player--active');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.toggle('player--winner');
      diceEl.classList.add('hidden');
      playing = false;
    } else {
      //Switch players
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  document.querySelector(`#name--${activePlayer}`).textContent = `PLAYER ${
    activePlayer + 1
  }`;
  current0El.textContent = 0;
  current1El.textContent = 0;
  activePlayer = 0;
  cur_score = 0;
  final = [0, 0];
  playing = true;
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  diceEl.classList.add('hidden');
});
