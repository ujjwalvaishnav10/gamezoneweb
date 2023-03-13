let cardSize = 16;
selectCards();
const cards = document.querySelectorAll(".card"),
    numberCard = document.querySelector(".listSpan"),
    wrapper = document.querySelector(".wrapper");
let h = 4;
let w = 4;
wrapper.style.width = (h) + "00px";
wrapper.style.height = (w) + "00px";



let matchedCard = 0;
let cardOne, cardTwo;
let disableDeck = false;

// function sizeOfCard() {
//     document.getElementsByClassName("card").style.width = "100px";
// }
// sizeOfCard();

function selectCards() {
    for (let i = 0; i < cardSize; i++) {
        let temp = (i % 8) + 1;
        document.querySelector(".cards").insertAdjacentHTML("beforeend", `<li class="card">
                <div class="view front-view">
                    <span class="material-icons">question_mark</span>
                </div>
                <div class="view back-view">
                    <img src="images/img-${temp}.png" alt="card-image">
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
        matchedCard++;
        if (matchedCard == cardSize / 2) {
            setTimeout(() => {
                return shuffleCards();
            }, 1000)
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
    // arr.sort();
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);
    console.log(arr);
    cards.forEach((card, index) => {
        card.classList.remove("flip");
        let imgTag = card.querySelector("img");
        imgTag.src = `images/img-${arr[index]}.png`;
        card.addEventListener("click", flipCard);
    });
}

shuffleCards();

cards.forEach(card => {
    // card.classList.add("flip");
    card.addEventListener("click", flipCard);
    card.style.width = `calc(100% / ${w} - 10px)`;
    card.style.height = `calc(100% / ${h} - 10px)`;
})



// script for clock timer

const timeTag = document.querySelector(".timer");

let time = 10,
    minute, second;
let checkWin = false,
    winOrNot = true;

setTimer();

function setTimer() {
    setInterval(() => {
        if (time >= 0) setTime();
        else {
            if (!checkWin)
                winning();
            else
                return;
        }
    }, 1000);
}

function setTime() {
    minute = Math.floor(time / 60);
    second = time % 60;
    second = second >= 10 ? second : '0' + second;
    timeTag.innerHTML = `0${minute} : ${second} `;
    time--;
}

function winning() {
    checkWin = true;
    console.log("you won");
}