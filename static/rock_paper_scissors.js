document.addEventListener("DOMContentLoaded", () => {
    const choices = document.querySelectorAll(".choice");
    const userChoiceText = document.querySelector("#user-choice span");
    const aiChoiceText = document.querySelector("#ai-choice span");
    const resultText = document.getElementById("result-text");
    const restartButton = document.getElementById("restart");

    const playerName = prompt("Enter your name:") || "Player";
    const choicesArray = ["rock", "paper", "scissors"];

    choices.forEach(button => {
        button.addEventListener("click", () => {
            let userChoice = button.getAttribute("data-choice");
            let aiChoice = choicesArray[Math.floor(Math.random() * 3)]; // AI randomly picks

            userChoiceText.textContent = userChoice.toUpperCase();
            aiChoiceText.textContent = aiChoice.toUpperCase();

            let result = determineWinner(userChoice, aiChoice);
            saveScore(playerName, result);
        });
    });

    function determineWinner(user, ai) {
        if (user === ai) {
            resultText.textContent = "It's a Tie!";
            resultText.style.color = "#ff0"; // Yellow glow
            return 1;
        } else if (
            (user === "rock" && ai === "scissors") ||
            (user === "paper" && ai === "rock") ||
            (user === "scissors" && ai === "paper")
        ) {
            resultText.textContent = "You Win!";
            resultText.style.color = "#0f0"; // Green glow
            return 3;
        } else {
            resultText.textContent = "AI Wins!";
            resultText.style.color = "#f00"; // Red glow
            return 0;
        }
    }

    function saveScore(player, score) {
        fetch('/submit-score', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ player: player, game: "Rock Paper Scissors", score: score })
        })
        .then(response => response.json())
        .then(data => console.log(data.message))
        .catch(error => console.error("Error submitting score:", error));
    }

    restartButton.addEventListener("click", () => {
        userChoiceText.textContent = "?";
        aiChoiceText.textContent = "?";
        resultText.textContent = "Make your move!";
        resultText.style.color = "#f00";
    });
});
