/* jesli chodzi o this.getAttribute - https://developer.mozilla.org/en-US/docs/Web/API/Event/target//ok
- zamiast if (isNaN(params.roundsToPlay) === true) { wystarczy samo if (isNaN(params.roundsToPlay))
 {, wyrazenie wewnatrz jest true samo w sobie //ok
- zamiast progress = new Array(); wystarczy progress = [] //ok

- co do tabeli
* wydziel osobna funkcje która tworzy jedna komórkę
* wydziel osobną funkcję która tworzy nagłówki
* wydziel osobna funkcje która tworzy ciało tabeli
* nazwij zmienne bardziej odpowiednio (a nie td2 itd)
*/
"use strict";
var newGame = document.getElementById("game");
var output = document.getElementById("output");
var result = document.getElementById("result");
var buttons = document.getElementsByClassName('player-move');
var overlay = document.querySelector('#modal-overlay');
var output = document.getElementById("output");
var modals = document.querySelectorAll('.modal');
var params = {
    playerPoints: 0,
    computerPoints: 0,
    roundsToPlay: 0,
    roundsPlayed: 0,
    roundResult: 0,
};
var progress;
var choice = {
    paper: 'paper',
    rock: 'rock',
    scissors: 'scissors'
};
var attributeButtons = function() {
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", function(event) {
            var dataMove = event.target.getAttribute('data-move');
            playRound(dataMove);
        });
    };
};
var setButtonsDisabledState = function(isDisabled) {
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].disabled = isDisabled;
    }
}
newGame.addEventListener("click", function() {
    params.roundsToPlay = parseInt(window.prompt("ile rund?"));
    if (isNaN(params.roundsToPlay)) {
        alert('error');
        return
    }
    setButtonsDisabledState(false);
    params.roundsPlayed = 0;
    params.playerPoints = 0;
    params.computerPoints = 0;
    progress = [];
});
var playRound = function(playerMove) {
    var computerMove = choice[Object.keys(choice)[Math.floor(Math.random() * Object.keys(choice).length)]];
    var roundResult = compare(playerMove, computerMove);
    params.roundsPlayed++;
    progress.push({
        playerMove: playerMove,
        computerMove: computerMove,
        roundsPlayed: params.roundsPlayed,
        roundResult: roundResult,
        playerPoints: params.playerPoints,
        computerPoints: params.computerPoints
    });
    output.innerHTML = 'yours move:' + playerMove + ', computer move: ' + computerMove + ', result: ' + roundResult;
    checkConditionEndOfGame(params);
};
var compare = function(playerMove, scriptDrawing) {
    if (playerMove === ('paper') && scriptDrawing === ('rock')) {
        params.playerPoints++;
        return "Paper beats Rock - player win!"
    } else if (playerMove === ('rock') && scriptDrawing === ('paper')) {
        params.computerPoints++;
        return "Paper beats Rock - computer win!";
    } else if (playerMove === ('rock') && scriptDrawing === ('scissors')) {
        params.playerPoints++;
        return "Rock beats Scissors - player win!";
    } else if (playerMove === ('scissors') && scriptDrawing === ('rock')) {
        params.computerPoints++;
        return "Rock beats Scissors - computer win ";
    } else if (playerMove === ('scissors') && scriptDrawing === ('paper')) {
        params.playerPoints++;
        return "Scissors beats Paper - player win! ";
    } else if (playerMove === ('paper') && scriptDrawing === ('scissors')) {
        params.computerPoints++;
        return "Scissors beats Paper - computer win! ";
    } else {
        return " Draw";
    }
};
var checkConditionEndOfGame = function() {
    if (params.roundsPlayed === params.roundsToPlay) {
        if (params.playerPoints > params.computerPoints) {
            var outcome = 'playerWon';
            showModal(outcome);
        } else if (params.playerPoints < params.computerPoints) {
            var outcome = 'computerWon';
            showModal(outcome);
        } else {
            var outcome = 'draw';
            showModal(outcome);
        }
        setButtonsDisabledState(true);
        output.innerHTML = '';
    } else return
};
var showModal = function(outcome) {
    hideModal();
    tableCreate(outcome);
    overlay.classList.add('show');
    document.querySelector('#' + outcome).classList.add('show');
};
var hideModal = function(event) {
    overlay.classList.remove('show');
    document.querySelectorAll('table').forEach(function(removeTable) {
        removeTable.remove();
    })
    for (i = 0; i < modals.length; i++) {
        modals[i].classList.remove('show');
    }
};
var closeButtons = document.querySelectorAll('.modal .close');
for (var i = 0; i < closeButtons.length; i++) {
    closeButtons[i].addEventListener('click', hideModal);
}
document.querySelector('#modal-overlay').addEventListener('click', hideModal);
for (var i = 0; i < modals.length; i++) {
    modals[i].addEventListener('click', function(event) {
        event.stopPropagation();
    });
}

function createCell(data) {
    var cell = document.createElement('td');
    cell.innerHTML = data;
    cell.style.width = '80px';
    return cell;
};

function createHeader() {
    var thead = document.createElement('thead');
    thead.appendChild(createCell('Rounds played'));
    thead.appendChild(createCell('player move'));
    thead.appendChild(createCell('computer move'));
    thead.appendChild(createCell('round result'));
    thead.appendChild(createCell('game result after round'));
    return thead;
};

function createBody() {
    var tbody = document.createElement('tbody');
    progress.forEach(function(roundObj) {
        var row = document.createElement('row');
        row.appendChild(createCell(roundObj.roundsPlayed));
        row.appendChild(createCell(roundObj.playerMove));
        row.appendChild(createCell(roundObj.computerMove));
        row.appendChild(createCell(roundObj.roundResult));
        row.appendChild(createCell(roundObj.playerPoints + ":" + roundObj.computerPoints));
        tbody.appendChild(row);
    })
    return tbody;
};

function tableCreate(modalID) {
    var modal = document.getElementById(modalID);
    var table = document.createElement('table');
    table.appendChild(createHeader());
    table.appendChild(createBody());
    modal.appendChild(table);
    table.classList.add('table');
};
attributeButtons();
setButtonsDisabledState(true);