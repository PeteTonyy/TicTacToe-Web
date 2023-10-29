
let moves = 0;
let playerXTurn = true; // only using one var for player 1 or player 2 turn
let gameOver = false;
let xWon = false;
let tie = false;
let xWinScore = 0;
let oWinScore = 0;

let xScoreText = document.getElementById('xID');
let oScoreText = document.getElementById('oID');
let whoseTurn = document.getElementById('which-player-turn');
/*
function? 
  if (playerXTurn)
    document.getElementById('which-player-turn').innerHTML = "X Turn";
  else if (playerXTurn == false)
    document.getElementById('which-player-turn').innerHTML = "O Turn";

*/




function placeMarker(element){
  moves++;
  if (element.innerHTML == '' && gameOver == false){
    if (playerXTurn){
      whoseTurn.innerHTML = "O turn";
      whoseTurn.style.color = 'rgb(50,155,255)';
      element.innerHTML = 'X';
      element.style.color = "rgb(210,0,0)";
      
      playerXTurn = false;
    }
    else {
      whoseTurn.innerHTML = "X turn";
      whoseTurn.style.color = 'rgb(210,0,0)';

      element.innerHTML = 'O';
      element.style.color = "rgb(50,155,255)";
      playerXTurn = true;
    }
    if(moves>4)
      checkWinner();

  }
  if (gameOver)
    whoseTurn.style.opacity = '0';

}

var tempDiv = document.createElement('div');

function resetAll(){
  tie = false;
  moves = 0;
  let allCells = document.querySelectorAll('.cell');
  allCells.forEach(cell =>{
    cell.innerHTML = '';
  });
  tempDiv.parentNode.removeChild(tempDiv); // remove temporary message of who won
  gameOver = false;
  if (xWon == true){
    playerXTurn = false;
  }
  else{
    playerXTurn = true;
  }
  whoseTurn.style.opacity = '1';
}


function displayTempMessage(message){
  tempDiv.textContent = message;
  tempDiv.style.cssText = 'position: absolute; top: 2%; left: 50%; font-size:64px; transform: translateX(-50%); font-family:Times New Roman, Times, serif;';  
  document.body.appendChild(tempDiv);
  if (tie == true){
    tempDiv.style.color = 'rgb(156,156,156)';
  }
}

  let cells = document.querySelectorAll('.cell');

  let combinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6] // Diagonals
  ];

function checkWinner() {

  for (let combination of combinations) {
      let symbols = combination.map(i => cells[i].innerHTML);
      if (symbols.every(symbol => symbol == 'X')) {
        playerXTurn = false;

        xWinScore++;
        xWon = true;
        displayTempMessage('X WON');
        tempDiv.style.color = 'rgb(210,0,0)';
        xScoreText.innerHTML = 'X Wins: ' + xWinScore;
        gameOver = true;
        tie = false;
        return;
      }
      else if (symbols.every(symbol => symbol == 'O')) {
        playerXTurn = true;

        oWinScore++;
        xWon = false;
        displayTempMessage('O WON');
        tempDiv.style.color = 'rgb(50,155,255)';
        oScoreText.innerHTML = 'O Wins: ' + oWinScore;

        gameOver = true;
        tie = false;
        return;
      }
      else if (moves == 9){
        displayTempMessage('TIE');
        gameOver = true;
        tie = true;
      }
        if (gameOver)
        whoseTurn.style.opacity = '0';
  }

}
