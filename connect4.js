"use strict";

/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

/**
create a Game class
  players still 1 and 2
  constructor variables- width and height
  board currPlayers
  move functions into class to make instance methods
  new Game(6, 7);
 */

/** Class holds connect four game */
class Player {
  constructor(colorName) {
    this.colorName = colorName;
  };
}
class Game {
  constructor(width, height, p1, p2) {
    this.width = width;
    this.height = height;
    this.board = [];
    this.currPlayer = p1;
    this.players = [p1, p2];
    this.start();
    // const startButton = document.querySelector("#start-button");
    // startButton.addEventListener("click", this.start.bind(this));
  }

  /** makeBoard: fill in global `board`:
   *    board = array of rows, each row is array of cells  (board[y][x])
  */

  makeBoard() {
    this.board = [];
    for (let y = 0; y < this.height; y++) {
      const emptyRow = Array(this.width).fill(null);
      this.board.push(emptyRow);
    }
  }

  /** makeHtmlBoard: make HTML table and row of column tops. */

  makeHtmlBoard() {
    const htmlBoard = document.getElementById("board");
    let rowsArr = Array.from(htmlBoard.querySelectorAll('tr'));
    rowsArr.map(row => row.remove());
    //create top row for player to drop piece
    const top = document.createElement("tr");
    top.setAttribute("id", "column-top");

    for (let x = 0; x < this.width; x++) {
      const headCell = document.createElement("td");
      headCell.setAttribute("id", `top-${x}`);
      headCell.addEventListener("click", this.handleClick.bind(this));
      top.append(headCell);
    }
    htmlBoard.append(top);

    // dynamically creates the main part of html board
    // uses height to create table rows
    // uses width to create table cells for each row
    for (let y = 0; y < this.height; y++) {
      const row = document.createElement('tr');

      for (let x = 0; x < this.width; x++) {
        const cell = document.createElement('td');
        cell.setAttribute('id', `c-${y}-${x}`);
        row.append(cell);
      }

      htmlBoard.append(row);
    }
  }

  /** findSpotForCol: given column x, return y coordinate of furthest-down spot
   *    (return null if filled) */

  findSpotForCol(x) {
    for (let y = this.height - 1; y >= 0; y--) {

      if (this.board[y][x] === null) {
        return y;
      }
    }

    return null;
  }

  /** placeInTable: update DOM to place piece into HTML table of board */

  placeInTable(y, x) {
    const piece = document.createElement('div');
    piece.classList.add('piece');
    // piece.classList.add(`p${this.currPlayer}`);
    piece.style.backgroundColor = this.currPlayer.colorName;
    const spot = document.getElementById(`c-${y}-${x}`);
    spot.append(piece);
  }

  /** endGame: announce game end */

  endGame(msg) {
    this.gameInProgress = false;
    alert(msg);
  }

  /** checkForWin: check board cell-by-cell for "does a win start here?" */

  checkForWin() {
    function _win(cells) {
      // Check four cells to see if they're all color of current player
      //  - cells: list of four (y, x) cells
      //  - returns true if all are legal coordinates & all match currPlayer
      return cells.every(
        ([y, x]) =>
          y >= 0 &&
          y < this.height &&
          x >= 0 &&
          x < this.width &&
          this.board[y][x] === this.currPlayer
      );
    };

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        // get "check list" of 4 cells (starting here) for each of the different
        // ways to win
        const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
        const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
        const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
        const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

        // find winner (only checking each win-possibility as needed)
        if (_win.call(this, horiz) || _win.call(this, vert) || _win.call(this, diagDR) || _win.call(this, diagDL)) {
          return true;
        }
      }
    }
    return false;
  }

  /** handleClick: handle click of column top to play piece */

  handleClick(evt) {
    // get x from ID of clicked cell
    if (this.gameInProgress) {

      const x = Number(evt.target.id.slice("top-".length));

      // get next spot in column (if none, ignore click)
      const y = this.findSpotForCol(x);
      if (y === null) {
        return;
      }

      // place piece in board and add to HTML table
      this.board[y][x] = this.currPlayer;
      this.placeInTable(y, x);
      console.log('handleClick this', this);

      // check for win
      if (this.checkForWin()) {
        return this.endGame(`Player ${this.currPlayer.colorName} won!`);
      }

      // check for tie: if top row is filled, board is filled
      if (this.board[0].every(cell => cell !== null)) {
        return this.endGame('Tie!');
      }

      // switch players
      this.currPlayer = this.currPlayer === this.players[0] ? this.players[1] : this.players[0];
    }
  }
  // this.currPlayer = p1;
  // this.players = [p1, p2];

  /** Start game. */

  start() {
    this.makeBoard();
    this.makeHtmlBoard();
    this.gameInProgress = true;
  }

}

const startBtn = document.querySelector('button');
startBtn.addEventListener('click', function () {
  const p1Input = document.querySelector('#player1').value;
  const p2Input = document.querySelector('#player2').value;
  const p1 = new Player(p1Input);
  const p2 = new Player(p2Input);
  const myGame = new Game(6, 7, p1, p2);
});
// let myGame =

// game1.start();

// start();

// const WIDTH = 7;
// const HEIGHT = 6;

// let currPlayer = 1; // active player: 1 or 2
// const board = []; // array of rows, each row is array of cells  (board[y][x])
// (board[5][0] would be the bottom-left spot on the board)

/** makeBoard: fill in global `board`:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

// function makeBoard() {
//   for (let y = 0; y < HEIGHT; y++) {
//     const emptyRow = Array(WIDTH).fill(null);
//     board.push(emptyRow);
//   }
// }

/** makeHtmlBoard: make HTML table and row of column tops. */

// function makeHtmlBoard() {
//   const htmlBoard = document.getElementById("board");

//   // TODO: add comment for this code
//   const top = document.createElement("tr");
//   top.setAttribute("id", "column-top");

//   for (let x = 0; x < WIDTH; x++) {
//     const headCell = document.createElement("td");
//     headCell.setAttribute("id", `top-${x}`);
//     headCell.addEventListener("click", handleClick);
//     top.append(headCell);
//   }
//   htmlBoard.append(top);

//   // dynamically creates the main part of html board
//   // uses HEIGHT to create table rows
//   // uses WIDTH to create table cells for each row
//   for (let y = 0; y < HEIGHT; y++) {
//     const row = document.createElement('tr');

//     for (let x = 0; x < WIDTH; x++) {
//       const cell = document.createElement('td');
//       cell.setAttribute('id', `c-${y}-${x}`);
//       row.append(cell);
//     }

//     htmlBoard.append(row);
//   }
// }

/** findSpotForCol: given column x, return y coordinate of furthest-down spot
 *    (return null if filled) */

// function findSpotForCol(x) {
//   for (let y = HEIGHT - 1; y >= 0; y--) {
//     if (board[y][x] === null) {
//       return y;
//     }
//   }
//   return null;
// }

/** placeInTable: update DOM to place piece into HTML table of board */

// function placeInTable(y, x) {
//   const piece = document.createElement('div');
//   piece.classList.add('piece');
//   piece.classList.add(`p${currPlayer}`);

//   const spot = document.getElementById(`c-${y}-${x}`);
//   spot.append(piece);
// }

/** endGame: announce game end */

// function endGame(msg) {
//   alert(msg);
// }

/** checkForWin: check board cell-by-cell for "does a win start here?" */

// function checkForWin() {

//   function _win(cells) {
//     // Check four cells to see if they're all color of current player
//     //  - cells: list of four (y, x) cells
//     //  - returns true if all are legal coordinates & all match currPlayer

//     return cells.every(
//       ([y, x]) =>
//         y >= 0 &&
//         y < HEIGHT &&
//         x >= 0 &&
//         x < WIDTH &&
//         board[y][x] === currPlayer
//     );
//   }

//   for (let y = 0; y < HEIGHT; y++) {
//     for (let x = 0; x < WIDTH; x++) {
//       // get "check list" of 4 cells (starting here) for each of the different
//       // ways to win
//       const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
//       const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
//       const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
//       const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

//       // find winner (only checking each win-possibility as needed)
//       if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
//         return true;
//       }
//     }
//   }
//   return false;
// }

/** handleClick: handle click of column top to play piece */

// function handleClick(evt) {
//   // get x from ID of clicked cell
//   const x = Number(evt.target.id.slice("top-".length));

//   // get next spot in column (if none, ignore click)
//   const y = findSpotForCol(x);
//   if (y === null) {
//     return;
//   }

//   // place piece in board and add to HTML table
//   board[y][x] = currPlayer;
//   placeInTable(y, x);

//   // check for win
//   if (checkForWin()) {
//     return endGame(`Player ${currPlayer} won!`);
//   }

//   // check for tie: if top row is filled, board is filled
//   if (board[0].every(cell => cell !== null)) {
//     return endGame('Tie!');
//   }

//   // switch players
//   currPlayer = currPlayer === 1 ? 2 : 1;
// }

/** Start game. */

// function start() {
//   makeBoard();
//   makeHtmlBoard();
// }

// start();