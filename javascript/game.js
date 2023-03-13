let h = localStorage.getItem("Height"),
    w = localStorage.getItem("Width"),
    mode = localStorage.getItem("Mode"),
    moves = localStorage.getItem("Move"),
    players = localStorage.getItem("Players"),
    score = -100,
    cardSize = h * w;
var currentPlayer = 0;
selectCards();
selectMode();
updateScore();
const cards = document.querySelectorAll(".card"),
    numberCard = document.querySelector(".listSpan"),
    wrapper = document.querySelector(".wrapper");
console.log(h, w, cardSize);

wrapper.style.width = "500px";
wrapper.style.height = "500px";

let matchedCard = 0;
let cardOne, cardTwo;
let disableDeck = false,
    winOrNot = false;

function selectCards() {
    for (let i = 0; i < cardSize; i++) {
        let temp = (i % 8) + 1;
        document.querySelector(".cards").insertAdjacentHTML("beforeend", `<li class="card">
                <div class="view front-view">
                    <span class="material-icons">question_mark</span>
                </div>
                <div class="view back-view">
                   <img src="../assests/memory-card-game-images/img-${temp}.png" alt="card-image">
                </div>
            </li>`)
    }
}


function flipCard(e) {
    let clickedCard = e.target;
    if (clickedCard !== cardOne && !disableDeck) {
        clickedCard.classList.add("flip");
        if (!cardOne) {
            return cardOne = clickedCard;
        }
        cardTwo = clickedCard;
        disableDeck = true;
        let cardOneImg = cardOne.querySelector("img").src,
            cardTwoImg = cardTwo.querySelector("img").src;
        matchCards(cardOneImg, cardTwoImg);
    }

}

function matchCards(img1, img2) {
    if (img1 === img2) {
        if (mode === "multiplayer") {
            scoreUp();
        } else
            updateScore();
        matchedCard++;
        if (matchedCard == cardSize / 2) {
            if (mode === "multiplayer") {
                setTimeout(() => {
                    return whoWin()
                }, 1000);
            } else {
                setTimeout(() => {
                    winOrNot = true;
                    return winningOrNot();
                }, 1000)
            }
        }
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = "";
        return disableDeck = false;
    }
    setTimeout(() => {
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    }, 400)

    setTimeout(() => {
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");
        cardOne = cardTwo = "";
        disableDeck = false;
    }, 1200)

    if (mode === "moves") {
        setTimeout(() => {
            movesReduce();
        }, 1200)
    }
    if (mode === "multiplayer") {
        setTimeout(() => {
            yourTurn();
        }, 1200)
    }



}


function shuffleCards() {
    matchedCard = 0;
    cardOne = cardTwo = "";
    disableDeck = false;
    let arr = [];
    for (let i = 0; i < cardSize / 2; i++) {
        let temp = i % 8 + 1;
        arr.push(temp);
        arr.push(temp);

    }
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);
    console.log(arr);
    cards.forEach((card, index) => {
        card.classList.remove("flip");
        let imgTag = card.querySelector("img");
        imgTag.src = `../assests/memory-card-game-images/img-${arr[index]}.png`;
        card.addEventListener("click", flipCard);
    });
}

shuffleCards();

cards.forEach(card => {
    // card.classList.add("flip");
    card.addEventListener("click", flipCard);
    card.style.width = `calc((100% / ${w} - ( (calc(100% / ${w}))/20))`;
    card.style.height = `calc((100% / ${h} - ( (calc(100% / ${h}))/20))`;
})

// function to select mode
function selectMode() {
    if (mode == "time")
        timeMode();
    else if (mode == "moves")
        moveMode();
    else if (mode == "multiplayer")
        multiplayerMode();
}


// function for time mode

function timeMode() {
    document.querySelector(".timer-page").style.display = "flex";
    document.querySelector(".header-bar").style.display = "flex";
    const timeTag = document.querySelector(".timer");
    let time = localStorage.getItem("time-value");
    let minute, second;
    let checkWin = false,
        winOrNot = false;

    setTimer();

    function setTimer() {
        setInterval(() => {
            if (time >= 0) setTime();
            else {
                if (!checkWin)
                    winningOrNot();
                else
                    return;
            }
        }, 1000);
    }
    //function to set values of minute and sec
    function setTime() {
        minute = Math.floor(time / 60);
        second = time % 60;
        second = second >= 10 ? second : '0' + second;
        timeTag.innerHTML = `0${minute} : ${second} `;
        time--;
    }
}


// function for moves-mode

function moveMode() {
    document.querySelector(".moves-page").style.display = "flex";
    document.querySelector(".header-bar").style.display = "flex";
    const circles = document.querySelector(".circles");
    for (let i = 0; i < moves; i++)
        circles.insertAdjacentHTML("beforeend", '<div class="circle"></div>')


}

function movesReduce() {
    if (!moves) {
        winningOrNot()
    }
    moves--;
    const circle = document.querySelectorAll(".circle");
    circle[moves].style.background = "pink";

}

// functions to check win or not

function winningOrNot() {
    checkWin = true;
    if (winOrNot) {
        alert("Hurry ! you won please click on ok to play again");
    } else
        alert("sorry! you lose please try again");
    history.back();
}


//functions for multiplayer

function multiplayerMode() {
    document.querySelector(".multiplayer").style.display = "flex";
    document.querySelector(".header").style.display = "flex";
    for (let i = 1; i <= players; i++) {
        document.querySelector(".players-data").insertAdjacentHTML("beforeend", `<div class="row">
                    <div class="col player-${i}">
                        <h2>Player-${i}</h2>
                        <h2 class="turn">Turn</h2>
                        <h2 class = "score">00</h2>
                    </div>
                </div>`)
    }
    yourTurn();
}

//  function to change turn

function yourTurn() {
    if (currentPlayer >= players)
        currentPlayer = 0;
    currentPlayer++;

    document.querySelector(`.player-${currentPlayer}`).classList.add("yourTurn");
    document.querySelector(`.player-${currentPlayer} .turn`).innerHTML = "Your Turn";
    if (currentPlayer > 1) {
        document.querySelector(`.player-${currentPlayer-1} .turn`).innerHTML = "Turn";
        document.querySelector(`.player-${currentPlayer-1}`).classList.remove("yourTurn");
    } else {
        document.querySelector(`.player-${players} .turn`).innerHTML = "Turn";
        document.querySelector(`.player-${players}`).classList.remove("yourTurn");
    }


}

//  function to score up

function scoreUp() {
    let temp = document.querySelector(`.player-${currentPlayer} .score`).innerHTML;
    temp = parseInt(temp);
    temp += 100;
    document.querySelector(`.player-${currentPlayer} .score`).innerHTML = `${temp}`;
}

//  function to select won player

function whoWin() {
    let j = 0,
        maxScore = 0;
    for (let i = 1; i <= players; i++) {
        let temp = document.querySelector(`.player-${i} .score`).innerHTML;
        temp = parseInt(temp);
        if (temp >= maxScore) {
            j = i;
            maxScore = temp;
        }
    }
    alert(`Hurray player-${j} won `)
}

// function for back button 

function backButton() {
    if (confirm("Are You Sure Your Progress Will Be Lost"))
        window.history.back();
    else
        return;
}

//  function to update score 

function updateScore() {
    score += 100;
    document.getElementById("score").innerText = ` Score: ${score}`;
}