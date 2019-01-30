"use strict";

var newGame = document.getElementById("game");
var output = document.getElementById("output");
var result = document.getElementById("result");
var buttons = document.getElementsByClassName('player-move');
var score;
var params={playerPoints: 0,
            computerPoints: 0,
            roundsToPlay: 0,
            roundsPlayed: 0,
            roundResult: 0,
           };

var progress= new Array();

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
  
});

var playRound = function(playerMove) {
  
  var scriptDrawing = Math.floor(Math.random() * 3) + 1;
  if (scriptDrawing === 1){
    var computerMove = "paper";
  } else if (scriptDrawing === 2){
      var computerMove = "rock";
    } else {
      var computerMove ="scissors"
    }
  
  compare(playerMove, scriptDrawing);
  params.roundsPlayed++;
  progress.push({playerMove: playerMove,
                computerMove: computerMove,
                roundsPlayed: params.roundsPlayed,
                roundResult: score,
                playerPoints:params.playerPoints,
                computerPoints:params.computerPoints
                });
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
    tableCreate();
    
    
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
    params.playerPoints++;
    return score = "Paper beats Rock - player win!"
  } else if (playerMove === ('rock') && scriptDrawing === (choice.paper)) {
    params.computerPoints++;
    return score = "Paper beats Rock - computer win!";
  } else if (playerMove === ('rock') && scriptDrawing === (choice.scissors)) {
    params.playerPoints++;
    return score = "Rock beats Scissors - player win!";  
  } else if (playerMove === ('scissors') && scriptDrawing === (choice.stone)) {
    params.computerPoints++;
    return score = "Rock beats Scissors - computer win ";    
  } else if (playerMove === ('scissors') && scriptDrawing === (choice.paper)) {
    params.playerPoints++;
    return score = "Scissors beats Paper - player win! ";
  } else if (playerMove === ('paper') && scriptDrawing === (choice.scissors)) {
    params.computerPoints++;
    return score = "Scissors beats Paper - computer win! ";  
  }
    else{
    return score = " Draw";
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

function tableCreate() {
  var body = document.getElementsByTagName('body')[0];
  var tbl = document.createElement('table');
  tbl.style.width = '100%';
  tbl.setAttribute('border', '1');
  var tbdy = document.createElement('tbody');
  for (var i = 0; i < params.roundsToPlay; i++) {
    var tr = document.createElement('tr');
    {
      
        var td = document.createElement('td');
        td.innerHTML=(progress[i].roundsPlayed);
        var td2 = document.createElement('td');
        td2.innerHTML=(progress[i].playerMove);
        var td3 = document.createElement('td');
        td3.innerHTML=(progress[i].computerMove);
        var td4 = document.createElement('td');
        td4.innerHTML=(progress[i].roundResult);
        var td5 = document.createElement('td');
        td5.innerHTML=(progress[i].playerPoints + ':' + progress[i].computerPoints);



        td.appendChild(document.createTextNode('\u0020'))
        td2.appendChild(document.createTextNode('\u0020'))
        td3.appendChild(document.createTextNode('\u0020'))
        td4.appendChild(document.createTextNode('\u0020'))
        td5.appendChild(document.createTextNode('\u0020'))
        
        tr.appendChild(td)
        tr.appendChild(td2)
        tr.appendChild(td3)
        tr.appendChild(td4)
        tr.appendChild(td5)
      }
    
    tbdy.appendChild(tr);
  }
  tbl.appendChild(tbdy);
  body.appendChild(tbl)
}

/*
function myTable (){
  var x = document.createElement("TABLE");
  createTHead();
  for (var i = 0; i < params.roundsToPlay; i++) {
    insertRow()
      createCaption(progress[i].roundsPlayed);
      createCaption(progress[i].playerPoints);
      createCaption(progress[i].computerPoints);
      createCaption()
    }


}


*/





