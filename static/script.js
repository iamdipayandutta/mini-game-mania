function openTab(event, tabName) {
    let tabContents = document.getElementsByClassName("tab-content");
    let tabButtons = document.getElementsByClassName("tab-btn");

    for (let content of tabContents) {
        content.classList.remove("active");
    }

    for (let button of tabButtons) {
        button.classList.remove("active");
    }

    document.getElementById(tabName).classList.add("active");
    event.currentTarget.classList.add("active");

    if (tabName === "leaderboard") {
        fetchScores();
    }
}

// Fetch leaderboard scores
function fetchScores() {
    fetch('/get-scores')
    .then(response => response.json())
    .then(scores => {
        let leaderboardTable = document.getElementById("leaderboard-data");
        leaderboardTable.innerHTML = ""; // Clear old data
        scores.forEach(score => {
            let row = `<tr><td>${score.player}</td><td>${score.game}</td><td>${score.score}</td></tr>`;
            leaderboardTable.innerHTML += row;
        });
    })
    .catch(error => console.error('Error fetching scores:', error));
}

// Load default tab
document.addEventListener("DOMContentLoaded", () => {
    document.querySelector(".tab-btn").click();
});
