const choices = ["rock", "paper", "scissors"];

const playerDisplay = document.getElementById("playerDisplay");
const computerDisplay = document.getElementById("computerDisplay");
const resultDisplay = document.getElementById("resultDisplay");

let player = document.getElementById("player");
let computer = document.getElementById("computer");

const playerScoreDisplay = document.getElementById("playerScoreDisplay");
const computerScoreDisplay = document.getElementById("computerScoreDisplay");
const drawScoreDisplay = document.getElementById("drawScoreDisplay");

const rockBtn = document.getElementById("rockBtn");
const paperBtn = document.getElementById("paperBtn");
const scissorsBtn = document.getElementById("scissorsBtn");

const resetBtn = document.getElementById("resetBtn");
const autoplayBtn = document.getElementById("autoplayBtn");

let playerScore = 0;
let computerScore = 0;
let drawScore = 0;

let intervalID;
let isAutoPlaying = false;

rockBtn.addEventListener("click", () => {
    playGame('rock');
})

paperBtn.addEventListener("click", () => {
    playGame('paper');
})

scissorsBtn.addEventListener("click", () => {
    playGame('scissors');
})

document.body.addEventListener('keydown', (event) => {
    if (event.key === 'r' || event.key === 'R') {
        playGame('rock');
    } else if (event.key === 'p' || event.key === 'P') {
        playGame('paper');
    } else if (event.key === 's' || event.key === 'S') {
        playGame('scissors');
    }
});

function loadScores() {
    playerScore = JSON.parse(localStorage.getItem('playerScore')) || 0;
    computerScore = JSON.parse(localStorage.getItem('computerScore')) || 0;
    drawScore = JSON.parse(localStorage.getItem('drawScore')) || 0;

    playerScoreDisplay.textContent = playerScore;
    computerScoreDisplay.textContent = computerScore;
    drawScoreDisplay.textContent = drawScore;
}

loadScores();

function updateScores() {
    localStorage.setItem('playerScore', JSON.stringify(playerScore));
    localStorage.setItem('computerScore', JSON.stringify(computerScore));
    localStorage.setItem('drawScore', JSON.stringify(drawScore));
}

function playGame(playerChoice) {
    let computerChoice = choices[Math.floor(Math.random() * 3)];

    let result = "";

    if (playerChoice === computerChoice) {
        result = "IT'S A TIE!";
    } else {
        switch (playerChoice) {
            case "rock":
                result = (computerChoice === "scissors") ? "YOU WIN!!" : "YOU LOSE!!";
                break;

            case "paper":
                result = (computerChoice === "rock") ? "YOU WIN!!" : "YOU LOSE!!";
                break;

            case "scissors":
                result = (computerChoice === "paper") ? "YOU WIN!!" : "YOU LOSE!!";
                break;
        }
    }

    playerDisplay.innerHTML = `Player: <img src="images/${playerChoice}-emoji.png" alt="${playerChoice}" class= "imgChoices">`;

    computerDisplay.innerHTML = `Computer: <img src="images/${computerChoice}-emoji.png" alt="${computerChoice}" class="imgChoices">`;

    resultDisplay.textContent = result;

    if (playerScoreDisplay && computerScoreDisplay && drawScoreDisplay) {
        switch (result) {
            case "YOU WIN!!":
                resultDisplay.style.color = "green";
                playerScore++;
                break;

            case "YOU LOSE!!":
                resultDisplay.style.color = "red";
                computerScore++;
                break;

            case "IT'S A TIE!":
                resultDisplay.style.color = "blue";
                drawScore++;
                break;

        }

        playerScoreDisplay.textContent = playerScore;
        computerScoreDisplay.textContent = computerScore;
        drawScoreDisplay.textContent = drawScore;

        updateScores();
    }
}

resetBtn.onclick = function () {
    playerScore = 0;
    computerScore = 0;
    drawScore = 0;

    playerDisplay.textContent = `Player: `;
    computerDisplay.textContent = `Computer: `;
    resultDisplay.textContent = `Result: `
    resultDisplay.style.color = "black";

    playerScoreDisplay.textContent = playerScore;
    computerScoreDisplay.textContent = computerScore;
    drawScoreDisplay.textContent = drawScore;
    
    updateScores();
}

autoplayBtn.onclick = function autoPlay() {
    if (!isAutoPlaying) {
        intervalID = setInterval(() => {
            const playerChoice = choices[Math.floor(Math.random() * 3)];
            playGame(playerChoice);
        }, 1000);

        isAutoPlaying = true;
        autoplayBtn.textContent = "Stop";

        rockBtn.disabled = true;
        paperBtn.disabled = true;
        scissorsBtn.disabled = true;
        resetBtn.disabled = true;
    } else {
        clearInterval(intervalID);
        isAutoPlaying = false;
        autoplayBtn.textContent = "Autoplay";

        rockBtn.disabled = false;
        paperBtn.disabled = false;
        scissorsBtn.disabled = false;
        resetBtn.disabled = false;
    }
}