const board = document.querySelector(".board");
const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetButton = document.getElementById("reset");

let currentPlayer = "X";
let boardState = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

cells.forEach(cell => {
    cell.addEventListener("click", () => {
        if (!gameActive || cell.textContent !== "" || currentPlayer !== "X") return;

        const index = cell.getAttribute("data-index");
        boardState[index] = "X";
        cell.textContent = "X";

        if (checkWinner()) return;
        currentPlayer = "O";
        setTimeout(aiMove, 500); // AI makes its move
    });
});

resetButton.addEventListener("click", resetGame);

function resetGame() {
    boardState.fill("");
    gameActive = true;
    cells.forEach(cell => cell.textContent = "");
    statusText.textContent = "Player X's turn";
    currentPlayer = "X";
}

function checkWinner() {
    for (const condition of winConditions) {
        const [a, b, c] = condition;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            statusText.textContent = `Player ${boardState[a]} Wins!`;
            animateWin(condition);
            gameActive = false;
            return true;
        }
    }

    if (!boardState.includes("")) {
        statusText.textContent = "It's a Draw!";
        gameActive = false;
        return true;
    }

    return false;
}

function animateWin(cells) {
    cells.forEach(index => {
        document.querySelector(`.cell[data-index="${index}"]`).style.background = "#00ff00";
        document.querySelector(`.cell[data-index="${index}"]`).style.color = "black";
    });
}

// AI Move (Minimax Algorithm)
function aiMove() {
    let bestMove = minimax(boardState, "O").index;
    boardState[bestMove] = "O";
    cells[bestMove].textContent = "O";

    if (checkWinner()) return;
    currentPlayer = "X";
    statusText.textContent = "Player X's turn";
}

// Minimax Algorithm for AI
function minimax(board, player) {
    const availableSpots = board.map((v, i) => v === "" ? i : null).filter(v => v !== null);

    if (checkWin(board, "X")) return { score: -10 };
    if (checkWin(board, "O")) return { score: 10 };
    if (availableSpots.length === 0) return { score: 0 };

    let moves = [];
    for (let spot of availableSpots) {
        let move = { index: spot };
        board[spot] = player;

        if (player === "O") {
            let result = minimax(board, "X");
            move.score = result.score;
        } else {
            let result = minimax(board, "O");
            move.score = result.score;
        }

        board[spot] = "";
        moves.push(move);
    }

    return player === "O" ? moves.reduce((best, move) => move.score > best.score ? move : best, { score: -Infinity })
                          : moves.reduce((best, move) => move.score < best.score ? move : best, { score: Infinity });
}

// Check win for Minimax
function checkWin(board, player) {
    return winConditions.some(condition => condition.every(index => board[index] === player));
}
