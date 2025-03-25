let gridItems = document.getElementsByClassName("square")
let currentTurn = "x"
let gameIsFinished = false

let boardArray = [
    "0", "1", "2",
    "3", "4", "5",
    "6", "7", "8"
]

// Define the winning combinations (using boardArray indices)
const winningCombos = [
    [0, 1, 2], // Row 1
    [3, 4, 5], // Row 2
    [6, 7, 8], // Row 3
    [0, 3, 6], // Column 1
    [1, 4, 7], // Column 2
    [2, 5, 8], // Column 3
    [0, 4, 8], // Diagonal from top-left
    [2, 4, 6]  // Diagonal from top-right
];

for (const item of gridItems) {
    item.addEventListener("click", function () {
        if (gameIsFinished) {
            return
        }

        let value = item.getAttribute("value")
        let index = value - 1

        // Prevent moves on already marked squares
        if (boardArray[index] === "x" || boardArray[index] === "o") {
            return
        }

        // Select the text element inside the square
        let squareContent = item.querySelector(".square-content");
        squareContent.innerHTML = currentTurn;

        // Update the logical board
        boardArray[index] = currentTurn

        // Set a faster animation duration for bounceIn (1 second)
        squareContent.style.setProperty('--animate-duration', '1s');

        // Animate the text element with bounceIn animation
        squareContent.classList.add('animate__animated', 'animate__bounceIn');
        squareContent.addEventListener("animationend", function () {
            squareContent.classList.remove('animate__animated', 'animate__bounceIn');
        }, { once: true });

        // Evaluate the board state
        evaluateBoard();
        if (gameIsFinished) return;

        // Toggle turn and update header
        currentTurn = currentTurn === "x" ? "o" : "x";
        document.getElementById("instruction").textContent = `${currentTurn.toUpperCase()} turn`;
    });
}

function evaluateBoard() {
    // Check for a winning combination
    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (
            boardArray[a] === boardArray[b] &&
            boardArray[b] === boardArray[c]
        ) {
            // A win is detected
            gameIsFinished = true;
            const winner = boardArray[a];

            // Animate the winning squares with tada animation
            combo.forEach(idx => {
                // Each square's value attribute is 1-indexed
                let winSquareContent = document.querySelector(`.square[value="${idx + 1}"] .square-content`);
                // Set a faster animation duration (1 second)
                winSquareContent.style.setProperty('--animate-duration', '1s');
                winSquareContent.classList.add('animate__animated', 'animate__tada');
                winSquareContent.addEventListener("animationend", function () {
                    winSquareContent.classList.remove('animate__animated', 'animate__tada');
                }, { once: true });
            });

            // Custom alert using SweetAlert2 for win
            Swal.fire({
                title: `${winner.toUpperCase()} Won!`,
                icon: 'success',
                confirmButtonText: 'OK'
            });
            return;
        }
    }

    // Check for a draw if no win was detected
    let isDraw = boardArray.every(square => square === "x" || square === "o");
    if (isDraw) {
        gameIsFinished = true;
        Swal.fire({
            title: 'Draw',
            icon: 'info',
            confirmButtonText: 'OK'
        });
    }
}

document.getElementById("reset-btn").addEventListener("click", function () {
    reset();
});

function reset() {
    // Animate the text with bounceOut (duration remains 2s) and then clear it
    for (let item of gridItems) {
        let squareContent = item.querySelector(".square-content");
        // Set longer duration for bounceOut animation (2 seconds)
        squareContent.style.setProperty('--animate-duration', '2s');
        squareContent.classList.add('animate__animated', 'animate__bounceOut');
        squareContent.addEventListener("animationend", function () {
            squareContent.innerHTML = "";
            squareContent.classList.remove('animate__animated', 'animate__bounceOut');
        }, { once: true });
    }
    // Reset logical board
    boardArray = [
        "0", "1", "2",
        "3", "4", "5",
        "6", "7", "8"
    ];
    // Reset game state
    gameIsFinished = false;
    currentTurn = "x";
    document.getElementById("instruction").textContent = `${currentTurn.toUpperCase()} turn`;
}
