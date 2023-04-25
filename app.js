document.addEventListener("DOMContentLoaded", () => {
    const squares = document.querySelectorAll(".square");
    const status = document.querySelector(".status");
    const resetButton = document.querySelector(".reset");
  
    let currentPlayer = "X";
    let gameActive = true;
    let gameState = ["", "", "", "", "", "", "", "", ""];
  
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
  
    const winningMessage = () => `Player ${currentPlayer} wins!`;
    const drawMessage = () => `Game ended in a draw`;
    const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;
  
    status.innerHTML = currentPlayerTurn();
  
    const handleSquareClick = (event) => {
      const clickedSquare = event.target;
      const clickedSquareIndex = Array.from(squares).indexOf(clickedSquare);
  
      if (gameState[clickedSquareIndex] !== "" || !gameActive) {
        return;
      }
  
      gameState[clickedSquareIndex] = currentPlayer;
      clickedSquare.classList.add(currentPlayer);
      clickedSquare.innerHTML = currentPlayer;
  
      if (checkForWin()) {
        gameActive = false;
        status.innerHTML = winningMessage();
        return;
      }
  
      if (checkForDraw()) {
        gameActive = false;
        status.innerHTML = drawMessage();
        return;
      }
  
      changePlayer();
      status.innerHTML = currentPlayerTurn();
    };
  
    const checkForWin = () => {
      for (let i = 0; i < winningCombos.length; i++) {
        const [a, b, c] = winningCombos[i];
        if (
          gameState[a] === currentPlayer &&
          gameState[b] === currentPlayer &&
          gameState[c] === currentPlayer
        ) {
          highlightWinningCombination(a, b, c);
          return true;
        }
      }
      return false;
    };
  
    const checkForDraw = () => {
      return gameState.every((cell) => cell !== "");
    };
  
    const highlightWinningCombination = (a, b, c) => {
      squares[a].classList.add("winning");
      squares[b].classList.add("winning");
      squares[c].classList.add("winning");
    };
  
    const changePlayer = () => {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
    };
  
    const handleReset = () => {
      gameActive = true;
      currentPlayer = "X";
      gameState = ["", "", "", "", "", "", "", "", ""];
      status.innerHTML = currentPlayerTurn();
      squares.forEach((square) => {
        square.innerHTML = "";
        square.classList.remove("winning");
        square.classList.remove("X");
        square.classList.remove("O");
      });
    };
  
    squares.forEach((square) => {
      square.addEventListener("click", handleSquareClick);
    });
  
    resetButton.addEventListener("click", handleReset);
  });
  