console.log("app.js works");

document.addEventListener("DOMContentLoaded", function () {
    const bingoCard = document.getElementById('bingo-card');
    const bingoBanner = document.getElementById('bingo-banner');

    const phrases = [
        "Inclusive", "Growth", "Compact", "Cohesion", "Identity", "Sustainable", "Innovation", "Digital", "Community", "Global",
        "Smart", "VUCA", "Resilience", "Security", "Disruption",
        "Success", "Skills", "Kampung", "Climate", "Meritocracy",
        "Complex", "Harness", "Synergy", "Strategy"
    ];

    // Function to shuffle the phrases array
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Shuffle the phrases
    const shuffledPhrases = shuffleArray([...phrases]);

    let selectedSquares = Array(5).fill(null).map(() => Array(5).fill(false));
    let bingoAchieved = false; // Flag to track if Bingo has been achieved

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
        showBingo();
    }

    function highlightColumn(col) {
        for (let i = 0; i < 5; i++) {
            document.getElementById(`square-${i}-${col}`).classList.add('bingo-column');
        }
        showBingo();
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
        showBingo();
    }

    function showBingo() {
        bingoBanner.textContent = "Bingo!";
        bingoBanner.classList.add('show');
        bingoAchieved = true; // Set the flag to true
        disableClicks(); // Disable further clicks
    }

    function closeBanner() {
        bingoBanner.classList.remove('show');
    }

    function disableClicks() {
        const squares = document.querySelectorAll('.square');
        squares.forEach(square => {
            square.removeEventListener('click', handleClick); // Remove click event listeners
            square.style.cursor = 'default'; // Change cursor to default
        });
    }

    function handleClick(event) {
        const square = event.currentTarget;
        const id = square.id.split('-');
        const i = parseInt(id[1], 10);
        const j = parseInt(id[2], 10);

        square.classList.toggle('selected');
        selectedSquares[i][j] = !selectedSquares[i][j];
        if (checkBingo()) {
            square.removeEventListener('click', handleClick); // Disable clicking after bingo
        }
    }

    // Add close button
    const closeButton = document.createElement('button');
    closeButton.id = 'close-banner';
    closeButton.textContent = '×';
    closeButton.addEventListener('click', closeBanner);
    bingoBanner.appendChild(closeButton);

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
                square.textContent = shuffledPhrases[phraseIndex++];
                square.addEventListener('click', handleClick); // Attach click event listener
            }

            bingoCard.appendChild(square);
        }
    }
});
