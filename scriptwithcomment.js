'use strict';

//// Selecting elements

const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');
const score0Element = document.querySelector('#score--0');
// the other way to call id, passing a name of the id, so without # here:
const score1Element = document.getElementById('score--1');
const current0Element = document.querySelector('#current--0');
const current1Element = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//declaring them to be accesible for other functions - it is a scope rule
let scores;
let currentScore;
let activePlayer;
let playing;
// Starting conditions as a new game, so setting the values to zero, js converts 0 to '0'
// score0Element.textContent = 0;
// score1Element.textContent = 0;
// the dice is gone, display:none
// diceEl.classList.add('hidden');

// storing the total scores of both players in an array,player 0 is first[0 - index], player 1 has an index 1
// const scores = [0, 0];
// we need to hold this initial value outside of the function, if it was inside in the function then each time when the button is clicked it would be set to zero
// let currentScore = 0;
// let activePlayer = 0;
//its gonna be 0 (current--0 or 1 current--1)
// now we need to create a state when we say that we play so the buttons Worker, the game is finished so we disable the buttons
// let playing = true;

// initiliazation - start of a new game and when the button is clicked to reset
const init = function () {
  //reaasigning their value
  // storing the total scores of both players in an array,player 0 is first, player 1 has an index 1
  scores = [0, 0];
  // we need to hold this initial value outside of the function, if it was inside in the function then each time when the button is clicked it would be set to zero
  currentScore = 0;
  activePlayer = 0; //its gonna be 0 (current--0 or 1 current--1)
  // now we need to create a state when we say that we play so the buttons Worker, the game is finished so we disable the buttons
  playing = true;
  //alll resets
  score0Element.textContent = 0;
  score1Element.textContent = 0;
  current0Element.textContent = 0;
  current1Element.textContent = 0;
  diceEl.classList.add('hidden');
  player0Element.classList.remove('player--winner');
  player1Element.classList.remove('player--winner');
  player0Element.classList.add('player--active');
  player1Element.classList.remove('player--active');
};
//when we open the game we call it
init();

//we dont need any argument at all beause the code is exactly the same in both situations
const switchPlayer = function () {
  //   if the active player is 0 change it to a new active player 1 else 0. Set the current score back to 0 and the same for the new player wants to gain scores form the beginning, also the background changes
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  // toggle will add a class if it is not there, it will remove if it is there, so when we roll 1 the class will be switched and a background
  player0Element.classList.toggle('player--active');
  player1Element.classList.toggle('player--active');
};
// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // playing is a boolean so dont need to say that it is equal true
    // 1. Generating a random dice roll between 1-6
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);
    // 2. Remove hidden class and Display dice img according to the number thanks to source property (from html)
    diceEl.classList.remove('hidden');
    //the source attribute of diceEl
    diceEl.src = `dice-${dice}.png`;
    // 3. Check for rolled 1: if true, switch to next player, if not 1, add dice to the current score. We need to now which player is active, playing
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      //   switching players
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  // now we need to create a state when we say that we play so the buttons Worker, the game is finished so we disable the buttons
  if (playing) {
    //1. add current score to active player's score
    scores[activePlayer] += currentScore;
    // scores[1] = scores[1] + currentScore
    //displaying it but not switching it yet so for ex 6 would be added to the current1 all the time
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2. check if player's score is >= 100 then the game is finished

    if (scores[activePlayer] >= 20) {
      // to disable the buttoms as the game is over and to hide the dice
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //3. if less than 20, then switch to the next player
      switchPlayer();
    }
  }
});

//clicking on new game and it resets all scores to zero
//waiting for a click for button new and want to execute what is inside the function
//no () after init as it is a js who calls the function after the button is clicked
btnNew.addEventListener('click', init);
