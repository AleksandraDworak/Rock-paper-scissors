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
var attributeButtons = function(event) {
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", function() {
            var dataMove = this.getAttribute('data-move');
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
    if (isNaN(params.roundsToPlay) === true) {
        alert('error');
        return
    }
    setButtonsDisabledState(false);
    params.roundsPlayed = 0;
    params.playerPoints = 0;
    params.computerPoints = 0;
    progress = new Array();
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

function tableCreate(modalID) {
    var modal = document.getElementById(modalID);
    var table = document.createElement('table');
    var tbody = document.createElement('tbody');
    var thead = document.createElement('thead');
    for (var i = 0; i < params.roundsToPlay; i++) {
        var tr = document.createElement('tr'); {
            var td = document.createElement('td');
            td.innerHTML = (progress[i].roundsPlayed);
            var td2 = document.createElement('td');
            td2.innerHTML = (progress[i].playerMove);
            var td3 = document.createElement('td');
            td3.innerHTML = (progress[i].computerMove);
            var td4 = document.createElement('td');
            td4.innerHTML = (progress[i].roundResult);
            var td5 = document.createElement('td');
            td5.innerHTML = (progress[i].playerPoints + ':' + progress[i].computerPoints);
            tr.appendChild(td)
            tr.appendChild(td2)
            tr.appendChild(td3)
            tr.appendChild(td4)
            tr.appendChild(td5)
        }
        tbody.appendChild(tr);
    }
    table.appendChild(tbody);
    modal.appendChild(table);
    table.classList.add('table');
};
attributeButtons();
setButtonsDisabledState(true);