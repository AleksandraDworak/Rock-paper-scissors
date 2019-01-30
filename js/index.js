"use strict";

var newGame = document.getElementById("game");
var output = document.getElementById("output");
var result = document.getElementById("result");
var buttons = document.getElementsByClassName('player-move');

var params={playerPoints: 0,
            computerPoints: 0,
            roundsToPlay: 0,
            roundsPlayed: 0,
            progress:{}
           };
var choice ={paper: 1,
             stone: 2,
             scissors: 3
};
var setButtonsDisabledState = function(isDisabled){
  for (var i=0; i < buttons.length; i++){
    buttons[i].disabled=isDisabled;
  }
}


newGame.addEventListener("click", function() {
  setButtonsDisabledState(false);
  params.roundsToPlay = parseInt(window.prompt("ile rund?"));
  params.roundsPlayed = 0;
  params.playerPoints = 0;
  params.computerPoints = 0;
  output.innerHTML = "<br>";
});

var playRound = function(playerMove) {
  
  var scriptDrawing = Math.floor(Math.random() * 3) + 1;
  compare(playerMove, scriptDrawing);
  params.roundsPlayed++;
  params.proggres.push({playerMove:playerMove, scriptDrawing:scriptDrawing });
 
  output.innerHTML += params.roundsPlayed +"<br>";
  if (params.roundsPlayed === params.roundsToPlay) {
   
    if (params.playerPoints > params.computerPoints) {
      var outcome = 'playerWon';
      showModal(outcome);
    } else if (params.playerPoints < params.computerPoints){
      var outcome = 'computerWon';
      showModal(outcome);
    } else {
      var outcome = 'Draw';
      showModal(outcome);
    }
    
    
    setButtonsDisabledState(true);
    result.innerHTML = params.progress;
    
    
  }
  
};

var attributeButtons = function(){
 
  for (var i=0; i<buttons.length; i++){
    buttons[i].addEventListener("click", function() {
      var c = this.getAttribute('data-move');
      playRound(c);
      
    });
  };
};

var compare = function(playerMove, scriptDrawing) {
    if (playerMove === ('paper') && scriptDrawing === (choice.stone)) {
    output.innerHTML += "Paper beats Rock - player win!  <br>";
    params.playerPoints++;
  } else if (playerMove === ('rock') && scriptDrawing === (choice.paper)) {
    output.innerHTML += "Paper beats Rock - computer win! <br>";
    params.computerPoints++;
  } else if (playerMove === ('rock') && scriptDrawing === (choice.scissors)) {
    output.innerHTML += "Rock beats Scissors - player win! <br>";
    params.playerPoints++;
  } else if (playerMove === ('scissors') && scriptDrawing === (choice.stone)) {
    output.innerHTML += "Rock beats Scissors - computer win <br>";
    params.computerPoints++;
  } else if (playerMove === ('scissors') && scriptDrawing === (choice.paper)) {
    output.innerHTML += "Scissors beats Paper - player win! <br>";
    params.playerPoints++;
  } else if (playerMove === ('paper') && scriptDrawing === (choice.scissors)) {
    output.innerHTML += "Scissors beats Paper - computer win! <br>";
    params.computerPoints++;
  }
    else{
    output.innerHTML += " Draw <br>";
  }
};
attributeButtons();
setButtonsDisabledState(true);

var hideModals=function() {
  var modals = document.getElementsByClassName('modal');
  for (i = 0; i < modals.length; i++) {
  modals[i].classList.remove('show');
  }
} 
  var showModal = function(outcome){
    hideModals();
    document.querySelector('#modal-overlay').classList.add('show');
    document.querySelector('#' + outcome).classList.add('show');
  };

  var modalLinks = document.querySelectorAll('.show-modal');
  
  for(var i = 0; i < modalLinks.length; i++){
    modalLinks[i].addEventListener('click', showModal);
  }

  var hideModal = function(event){
    event.preventDefault();
    document.querySelector('#modal-overlay').classList.remove('show');
  };
  
  var closeButtons = document.querySelectorAll('.modal .close');
  
  for(var i = 0; i < closeButtons.length; i++){
    closeButtons[i].addEventListener('click', hideModal);
  }
  document.querySelector('#modal-overlay').addEventListener('click', hideModal);
  var modals = document.querySelectorAll('.modal');
  
  for(var i = 0; i < modals.length; i++){
    modals[i].addEventListener('click', function(event){
      event.stopPropagation();
    });
  }

