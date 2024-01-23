let h2 = document.querySelector("h2");
let gameSeq = [];
let userSeq = [];
let btns = ["red", "yellow", "green", "blue"];

let started = false;
let level = 0;
let highestScore = 0;  // or Number.MIN_VALUE

document.addEventListener("keypress", function() {
    if(started == false) {
        console.log("Game Started");
        started = true;
        levelUp();
    }
});
function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level : ${level}`;
    let randOM = Math.floor(Math.random() * 12);
    let randIdx = 0;
    if(randOM < 3) {
        randIdx = 0;
    }
    else if(randOM >= 3 && randOM < 6) {
        randIdx = 1;
    }
    else if(randOM >= 6 && randOM < 9) {
        randIdx = 2;
    }
    else {
        randIdx = 3;
    }
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    // console.log(randIdx);
    // console.log(randColor);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn);
}
function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 250);
}
let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns) {
    btn.addEventListener("click", btnPress);
}
function btnPress() {
    let btn = this;
    userFlash(btn);
    console.log(this);
    let userColor = btn.getAttribute("id");
    console.log(userColor);
    userSeq.push(userColor);
    checkAns(userSeq.length-1);
}
function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(function() {
        btn.classList.remove("userFlash");
    }, 250);
}
function checkAns(idx) {
    if(userSeq[idx] === gameSeq[idx]) {
        if(userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    }
    else {
        if(highestScore < (level-1)) {
            highestScore = level - 1;
        }
        h2.innerHTML = `Game Over! <b>Your score was ${level-1}</b><br />Highest Score : ${highestScore}<br/>Press any key to start again.`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function() {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);
        reset();
    }
}
function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}
