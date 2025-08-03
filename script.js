let gameSeq = [];
let userSeq = [];

let btns = ["red", "green", "yellow", "blue"];

let startingStatement = document.querySelector('.st');
let level = 0;
let gameStart = false;

// Start the game on keypress
document.addEventListener('keypress', function () {
    if (!gameStart) {
        gameStart = true;
        levelUp();
    }
});

// Flash animation for game sequence
function gameFlash(box) {
    box.classList.add("flash");
    setTimeout(() => box.classList.remove("flash"), 300);
}

// Flash animation when user clicks
function clickFlash(box) {
    box.classList.add("flash");
    setTimeout(() => box.classList.remove("flash"), 300);
}

// Go to next level
function levelUp() {
    userSeq = [];
    level++;
    startingStatement.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);

    gameSeq.push(randColor);
    console.log("Game Sequence:", gameSeq);

    gameFlash(randBtn);
}

// When user clicks a button
function pressBtn() {
    let clickedBtn = this;
    clickFlash(clickedBtn);

    let userColor = clickedBtn.getAttribute('id');
    userSeq.push(userColor);

    checkAnswer(userSeq.length - 1);
}

// Check the user's answer
function checkAnswer(currentIdx) {
    if (gameSeq[currentIdx] === userSeq[currentIdx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        resetGame();
    }
}

// Reset game when user makes a mistake
function resetGame() {
    startingStatement.innerHTML = `Game Over!! <b>Your score was ${level}</b><br>Press any key to restart`;

    gameStart = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}

// Attach event listeners to all buttons
let allBtns = document.querySelectorAll(".box");
for (let btn of allBtns) {
    btn.addEventListener('click', pressBtn);
}
