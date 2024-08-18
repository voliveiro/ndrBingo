console.log("app.js works");
document.addEventListener("DOMContentLoaded", function () {
    const bingoCard = document.getElementById('bingo-card');
    const bingoBanner = document.getElementById('bingo-banner');

    const phrases = [
        "Inclusive", "Growth", "Compact", "Cohesion", "Identity", "Sustainable", "Innovation", "Digital", "Community", "Global",
        "AI", "VUCA", "Resilience", "Security", "Disruption",
        "Success", "Skills", "Kampung", "Climate", "Meritocracy",
        "Complex", "Harness", "Synergy", "Strategy"
    ];

    let selectedSquares = Array(5).fill(null).map(() => Array(5).fill(false));

    function checkBingo() {
        for (let i = 0; i < 5; i++) {
            if (selectedSquares[i].every(val => val)) {
                highlightRow(i);
                return true;
            }
            if (selectedSquares.every(row => row[i])) {
                highlightColumn(i);
                return true;
            }
        }
        if (selectedSquares.every((row, idx) => row[idx])) {
            highlightDiagonal('left');
            return true;
        }
        if (selectedSquares.every((row, idx) => row[4 - idx])) {
            highlightDiagonal('right');
            return true;
        }
        return false;
    }

    function highlightRow(row) {
        for (let i = 0; i < 5; i++) {
            document.getElementById(`square-${row}-${i}`).classList.add('bingo-row');
        }
        bingoBanner.textContent = "Bingo!";
        bingoBanner.style.visibility = 'visible';
    }

    function highlightColumn(col) {
        for (let i = 0; i < 5; i++) {
            document.getElementById(`square-${i}-${col}`).classList.add('bingo-column');
        }
        bingoBanner.textContent = "Bingo!";
        bingoBanner.style.visibility = 'visible';
    }

    function highlightDiagonal(direction) {
        if (direction === 'left') {
            for (let i = 0; i < 5; i++) {
                document.getElementById(`square-${i}-${i}`).classList.add('bingo-diagonal');
            }
        } else {
            for (let i = 0; i < 5; i++) {
                document.getElementById(`square-${i}-${4 - i}`).classList.add('bingo-diagonal');
            }
        }
        bingoBanner.textContent = "Bingo!";
        bingoBanner.style.visibility = 'visible';
    }

    // Generate the 5x5 bingo card
    let phraseIndex = 0;
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            const square = document.createElement('div');
            square.classList.add('square');
            square.id = `square-${i}-${j}`;

            // Leave the middle square empty and allow the user to enter their own phrase
            if (i === 2 && j === 2) {
                square.classList.add('empty');
                square.addEventListener('click', () => {
                    const userPhrase = prompt("Enter your phrase for the center square:");
                    if (userPhrase) {
                        square.textContent = userPhrase;
                    }
                });
            } else {
                square.textContent = phrases[phraseIndex++];
                square.addEventListener('click', () => {
                    square.classList.toggle('selected');
                    selectedSquares[i][j] = !selectedSquares[i][j];
                    square.style.backgroundColor = selectedSquares[i][j] ? 'yellow' : ''; // Toggle background color
                    checkBingo();
                });
            }

            bingoCard.appendChild(square);
        }
    }
});
