let secretNumber = Math.floor(Math.random() * 100) + 1;

function checkGuess() {
    let guess = document.getElementById("guess").value;
    let feedback = document.getElementById("feedback");

    if (guess < secretNumber) {
        feedback.textContent = "Too low! Try again.";
    } else if (guess > secretNumber) {
        feedback.textContent = "Too high! Try again.";
    } else {
        feedback.textContent = "🎉 Correct! You guessed it!";
    }
}
