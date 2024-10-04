const colors = ['#6EC73D', '#3A4CC0', '#FCB03C', '#FF5733', '#A656DC', '#F0E68C']; // Color palette
let board = [];
const boardSize = 24; // 12x12 grid
const gameBoardElement = document.getElementById('game-board');
let moveCounter = 25; // Starting moves
const movesDisplay = document.getElementById('moves-left');
const resetButton = document.getElementById('reset-button');

// Initialize the game board
function initializeBoard() {
  console.log('initializeBoard is being called'); // Debug log to check function call
  board = []; // Clear the board before initializing
  for (let i = 0; i < boardSize; i++) {
    const row = [];
    for (let j = 0; j < boardSize; j++) {
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      row.push(randomColor); // Add random colors to each tile
    }
    board.push(row);
  }
  console.log('Board initialized:', board); // Debug log to verify board creation
  moveCounter = 25; // Reset moves
  updateMovesDisplay();
  renderBoard(); // Call to render the board
}

// Update the move display
function updateMovesDisplay() {
  movesDisplay.innerText = `Moves left: ${moveCounter}`;
}

// Render the board in the DOM
function renderBoard() {
  console.log('Rendering board...'); // Debug log to check render function call
  gameBoardElement.innerHTML = ''; // Clear previous board
  board.forEach((row, rowIndex) => {
    row.forEach((color, colIndex) => {
      const tile = document.createElement('div');
      tile.className = 'tile';
      tile.style.backgroundColor = color;
      console.log(`Appending tile at (${rowIndex}, ${colIndex}) with color ${color}`); // Debug log for each tile
      gameBoardElement.appendChild(tile);
    });
  });
}

// Flood fill function to update the tiles
function floodFill(x, y, targetColor, newColor) {
  if (x < 0 || x >= boardSize || y < 0 || y >= boardSize || board[x][y] !== targetColor || targetColor === newColor) {
    return;
  }
  board[x][y] = newColor;
  floodFill(x - 1, y, targetColor, newColor); // Up
  floodFill(x + 1, y, targetColor, newColor); // Down
  floodFill(x, y - 1, targetColor, newColor); // Left
  floodFill(x, y + 1, targetColor, newColor); // Right
  renderBoard(); // Re-render the board to show updated colors
}

// Handle color button clicks
document.querySelectorAll('.color-button').forEach(button => {
  button.addEventListener('click', () => {
    if (moveCounter <= 0) {
      alert('Game Over! You have no moves left.');
      return;
    }
    
    const selectedColor = button.getAttribute('data-color');
    const startColor = board[0][0];
    
    if (selectedColor !== startColor) {
      floodFill(0, 0, startColor, selectedColor); // Apply flood fill
      moveCounter--; // Decrease moves
      updateMovesDisplay(); // Update moves display
    }

    // Check for win condition: All tiles are the same color
    if (checkWinCondition()) {
      alert('Congratulations! You won the game!');
    }
  });
});

// Reset the game
resetButton.addEventListener('click', () => {
  initializeBoard(); // Re-initialize the board
});

// Check if the entire board is a single color (win condition)
function checkWinCondition() {
  const color = board[0][0];
  return board.every(row => row.every(tile => tile === color));
}

// Ensure that everything loads after the DOM is ready
document.addEventListener('DOMContentLoaded', (event) => {
  initializeBoard();
});
