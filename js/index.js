"use strict";
/*
 - przypisz 1, 2, 3 do jakichś zmiennych/obiektu zeby w bardziej czytelny sposob przedstawic co one reprezentują
- usun    result.innerHTML = "";
*/

var newGame = document.getElementById("game");
var output = document.getElementById("output");
var result = document.getElementById("result");
var playerPoints;
var scriptPoints;
var rounds;
var choice = {
  paper: 1,
  stone: 2,
  scissors: 3
};

var disableButtons = function(){
   buttonPaper.disabled = true;
   buttonRock.disabled = true;
   buttonScissors.disabled = true;
};

var unlockButtons = function(){
  buttonPaper.disabled = false;
  buttonRock.disabled = false;
  buttonScissors.disabled = false;
}

newGame.addEventListener("click", function() {
  unlockButtons();
  playerPoints = 0;
  scriptPoints = 0;
  rounds = parseInt(window.prompt("ile rund?"));
});

var playRound = function(playerMove) {
  var scriptDrawing = Math.floor(Math.random() * 3) + 1;
  compare(playerMove, scriptDrawing);
  result.innerHTML = "Player:" + playerPoints + " Computer:" + scriptPoints;
  if (playerPoints === rounds || scriptPoints === rounds) {
   disableButtons();
    if (playerPoints > scriptPoints) {
      result.innerHTML = "YOU WON THE ENTIRE GAME!";
    } else {
      result.innerHTML = "COMPUTER WON THE ENTIRE GAME!";
    }
  }
};
var buttonPaper = document.getElementById("button-paper");
buttonPaper.addEventListener("click", function() {
  playRound(choice.paper);
});
var buttonRock = document.getElementById("button-rock");
buttonRock.addEventListener("click", function() {
  playRound(choice.stone);
});
var buttonScissors = document.getElementById("button-scissors");
buttonScissors.addEventListener("click", function() {
  playRound(choice.scissors);
});
var compare = function(playerMove, scriptDrawing) {
  if (playerMove === scriptDrawing) {
    output.innerHTML += " Draw <br>";
  } else if (playerMove === (choice.paper) && scriptDrawing === (choice.stone)) {
    output.innerHTML += "Paper beats Rock - player win!  <br>";
    playerPoints++;
  } else if (playerMove === (choice.stone) && scriptDrawing === (choice.paper)) {
    output.innerHTML += "Paper beats Rock - computer win! <br>";
    scriptPoints++;
  } else if (playerMove === (choice.stone) && scriptDrawing === (choice.scissors)) {
    output.innerHTML += "Rock beats Scissors - player win! <br>";
    playerPoints++;
  } else if (playerMove === (choice.scissors) && scriptDrawing === (choice.stone)) {
    output.innerHTML += "Rock beats Scissors - computer win <br>";
    scriptPoints++;
  } else if (playerMove === (choice.scissors) && scriptDrawing === (choice.paper)) {
    output.innerHTML += "Scissors beats Paper - player win! <br>";
    playerPoints++;
  } else if (playerMove === (choice.paper) && scriptDrawing === (choice.scissors)) {
    output.innerHTML += "Scissors beats Paper - computer win! <br>";
    scriptPoints++;
  }
};


disableButtons();