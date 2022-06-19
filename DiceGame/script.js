'use strict';
let currentScore = 0;
let activePlayer = 0;
let scoreVal = [0, 0];
let playing = true;

function switchPlayer() {
    currentEl.textContent = currentScore;
    activePlEl.classList.remove('player--active');
    activePlayer = (activePlayer == 1) ? 0 : 1;
    activePlEl = document.querySelector(`.player--${activePlayer}`);
    activePlEl.classList.add('player--active');
    currentScore = 0; currentEl.textContent = 0;
}

function rollTheDice() {
    if (playing) {
        let diceVal = Math.trunc(Math.random() * 6) + 1;
        diceEl.classList.remove("hidden");
        diceEl.src = `dice-${diceVal}.png`;
        currentEl = document.querySelector(".player--active .current-score");
        if (diceVal == 1) {
            // switch player
            currentScore = 0;
            switchPlayer();

        } else {
            // add the score to the current score
            currentScore = currentScore + diceVal;
            currentEl.textContent = currentScore;
        }
    }
}

function winOutput() {
    document.querySelector(`.player--active`).classList.add("player--winner");
    console.log(`Player ${activePlayer + 1} wins!`);
};

function holdScore() {
    if (playing) {
        activePlSc = document.querySelector(`.score--${activePlayer}`);
        scoreEl = document.querySelector(".player--active .score");
        scoreVal[activePlayer] = Number(Number(scoreEl.textContent) + currentScore);
        scoreEl.textContent = scoreVal[activePlayer];
        if (scoreVal[activePlayer] >= 100) {
            playing = false;
            winOutput();
            diceEl.classList.add("hidden");
        } else {
            switchPlayer();
        }
    }
}
function resetGame() {
    document.querySelector(`.player--active`).classList.remove("player--winner");
    currentScore = 0;
    scoreVal = [0, 0];
    playing = true;
    score0El.textContent = 0;
    score1El.textContent = 0;
    document.querySelector("#current--0").textContent = 0;
    document.querySelector("#current--1").textContent = 0;
    if (activePlayer == 1) {
        switchPlayer();
    }
    diceEl.classList.add("hidden");
    activePlEl = document.querySelector(`.player--${activePlayer}`);
    activePlSc = document.getElementById(`.score--${activePlayer}`);

}

let score0El = document.querySelector("#score--0");
let score1El = document.querySelector("#score--1");
let diceEl = document.querySelector(".dice");
let currentEl = document.querySelector(".player--active .current-score");
let activePlEl = document.querySelector(`.player--${activePlayer}`);
let activePlSc = document.getElementById(`.score--${activePlayer}`);
let holdEl = document.querySelector(".btn--hold");
let scoreEl = document.querySelector(".player--active .score");
document.querySelector(".btn--new").addEventListener("click", resetGame);

score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add("hidden");
const btnDice = document.querySelector('.btn--roll');
btnDice.addEventListener("click", rollTheDice);
holdEl.addEventListener("click", holdScore);
