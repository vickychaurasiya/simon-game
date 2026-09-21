let gameSequence = [];
let userSequence = [];
let started = false;
let level = 0;
let h2 = document.querySelector("h2");
let btns = ["red", "yellow", "green", "purple"];
document.addEventListener("keypress", function() {
    if (started == false) {
        started = true;
        levelup();
    }
});

function levelup() {
    userSequence = [];
    level++;
    h2.innerText = `Level ${level}`;
    let randIdx = Math.floor(Math.random() * 3);
    let randcolor = btns[randIdx];
    let randbtn = document.querySelector(`.${randcolor}`);
    gameSequence.push(randcolor);
    gameflash(randbtn);
}

function gameflash(btn) {
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 200)
};

function userflash(btn) {
    btn.classList.add("userflash");
    setTimeout(function() {
        btn.classList.remove("userflash");
    }, 200)
};

function checkAns(idx) {
    if (gameSequence[idx] == userSequence[idx]) {
        if (userSequence.length == gameSequence.length) {
            setTimeout(levelup, 1000);
        }
    } else {
        h2.innerHTML = `Game over , Your last score <b> ${level}</b> <br> press any key to restart the Game!`;
        let body = document.querySelector("body");
        body.classList.add("wrongflash");
        setTimeout(function() {
            body.classList.remove("wrongflash");
        }, 150);
        highScore();
        reset();
    }
}

function btnpressed() {
    let btn = this;
    userflash(btn);
    userColor = btn.getAttribute("id");
    userSequence.push(userColor);
    checkAns(userSequence.length - 1);
};
let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
    btn.addEventListener("click", btnpressed);
}

function reset() {
    started = false;
    gameSequence = [];
    userSequence = [];
    level = 0;
}

function highScore() {
    let h3 = document.querySelector("h3");
    h3.innerText = `Highest score is:-${level}`
}