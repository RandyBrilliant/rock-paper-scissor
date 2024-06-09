const btn = document.querySelector('.btn-group');
const CHOICES = ['r', 'p', 's'];
const playerScreen = document.getElementById('player-result');
const computerScreen = document.getElementById('computer-result');
const tableData = document.getElementById('game-result');
const noResult = document.getElementById('no-result');
const resetBtn = document.querySelector('.reset-btn');
const buttonClickAudio = new Audio('button-press.mp3');

let game = '';

btn.addEventListener('click', function(e) {
    buttonClickAudio.play();
    gameStarted(e.target.innerText);
});

function gameStarted(userChoice) {
    if (userChoice == "✊") {
        game += 'r';
    } else if (userChoice == "🖐") {
        game += 'p';
    } else if (userChoice == "✌") {
        game += 's';
    } else {
        return;
    }

    const computerChoice = getComputerChoice();
    game += computerChoice;

    checkWinner(game);
    game = '';
}

function getComputerChoice() {
    const randomNum = Math.floor(Math.random() * CHOICES.length);
    const computerChoice = CHOICES[randomNum];
    return computerChoice;
}

function checkWinner(game) {
    const userChoice = game[0];
    const computerChoice = game[1];

    if (userChoice === computerChoice) {
        showScore('draw');
    } else if (
        (userChoice === 'r' && computerChoice === 's') ||
        (userChoice === 'p' && computerChoice === 'r') ||
        (userChoice === 's' && computerChoice === 'p')
    ) {
        showScore('win');
    } else {
        showScore('lose');
    }
}

function showScore(result) {
    let playerScore = parseInt(playerScreen.innerText);
    let computerScore = parseInt(computerScreen.innerText);

    if (result === 'win') {
        playerScore++;
        addTable('win');
    } else if (result === 'lose') {
        computerScore++;
        addTable('lose');
    } else {
        addTable('draw');
    }

    rerender(playerScore, computerScore);
}

function rerender(playerScore, computerScore) {
    playerScreen.innerText = "" + playerScore;
    computerScreen.innerText = "" + computerScore;
}

function addTable(result) {
    if (noResult) {
        noResult.hidden = true;
    }
    const tableRow = document.createElement('tr');
    const playerChoiceCell = document.createElement('td');
    const computerChoiceCell = document.createElement('td');
    const resultCell = document.createElement('td');

    playerChoiceCell.innerText = getSymbolFromChoice(game[0]);
    computerChoiceCell.innerText = getSymbolFromChoice(game[1]);
    if (result === 'win') {
        playerChoiceCell.style.fontSize = '1.2rem';
        resultCell.style.color = 'green';
    }
    if (result === 'lose') {
        computerChoiceCell.style.fontSize = '1.2rem';
        resultCell.style.color = 'red';
    }
    resultCell.innerText = getResultText(result);
    resultCell.classList.add("style-result1");

    tableRow.appendChild(playerChoiceCell);
    tableRow.appendChild(computerChoiceCell);
    tableRow.appendChild(resultCell);

    tableData.appendChild(tableRow);
}

function getSymbolFromChoice(choice) {
    if (choice === 'r') {
        return '✊';
    } else if (choice === 'p') {
        return '✋';
    } else {
        return '✌️';
    }
}

function getResultText(result) {
    if (result === 'win') {
        return 'You Win';
    } else if (result === 'lose') {
        return 'You Lose';
    } else {
        return 'Draw';
    }
}

resetBtn.addEventListener('click', function() {
    playerScreen.innerText = '0';
    computerScreen.innerText = '0';
    tableData.innerHTML = '';
    noResult.hidden = false;
    tableData.appendChild(noResult);
});