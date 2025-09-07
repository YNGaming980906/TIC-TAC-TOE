let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg")
let container = document.querySelector(".container")
let whoseTurn = document.querySelector("#whose-turn")

let turnO = true;//playerX, playerY
let count = 0;//To Track Draw

const winPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetGame = () => {
    turnO =  true;
    count = 0;
    whoseTurn.innerText = "Turn:- O";
    enableBoxes();
    msgContainer.classList.add("hide");
    resetBtn.classList.remove("hide");
    container.classList.remove("hide");
    whoseTurn.classList.remove("hide");
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turnO) {
            //playerO
            whoseTurn.innerText = "Turn:- X";
            box.innerText =  "O";
            turnO = false;
        } else {
            //playerX
            whoseTurn.innerText = "Turn:- O";
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        count++

        let isWinner = checkWinner();

        if (count === 9 && !isWinner) {
            gameDraw();
        }
    });
});

const gameDraw = () => {
    msg.innerText = `Game was Draw, Play Again`;
    msgContainer.classList.remove("hide");
    resetBtn.classList.add("hide");
    container.classList.add("hide");
    whoseTurn.classList.add("hide");
    disableBoxes();
}

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

const showWinner = (winner) => {
    msg.innerText = `Congratulation, Winner is", ${winner}`;
};

const checkWinner = () => {
    for(let pattern of winPattern) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
                msgContainer.classList.remove("hide");
                resetBtn.classList.add("hide");
                container.classList.add("hide");
                whoseTurn.classList.add("hide");
                disableBoxes();
                return true; // We have a Winner
            }
        } 
    }
    return false; // No Winner
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);