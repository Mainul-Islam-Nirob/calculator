let prevOperand;
let nextOperand;
let operator;

let bigDisplay = document.getElementById("big-display");
let smallDisplay = document.getElementById("small-display");

let buttons = document.getElementsByClassName("btn");
let numbersBtn = document.querySelectorAll(".btnNum");
let operatorBtn = document.querySelectorAll(".btnOperator");
let equalBtn = document.querySelector("#equal");
let allClear = document.querySelector("#ac");
let backSpace = document.querySelector("#delete");


const backSpace = function () {
    console.log("clicked DEl");

}

const allClear = function () {
    bigDisplay.innerText = "0";
    smallDisplay.innerText = "";
}


for (let i = 0; i < buttons.length; i++) {
    let btn = buttons[i];

    btn.addEventListener("click", (e) => {
        populateDisplay(e.target.innerText)
    })

}


const populateDisplay = function (input) {

    // display.innerText = displayNum;

    prevOperand = bigDisplay.innerText;

    if (input == "AC") {
        allClear();

    } else if (input == "DEL") {
        backSpace();

    } else if (input == "+" || input == "-" || input == "x" || input == "/") {
        operator = input;
        prevOperand = ~~bigDisplay.innerText;
        smallDisplay.innerText = prevOperand + " " + input;
        bigDisplay.innerText = "0";

        console.log(prevOperand, operator, nextOperand);


    } else if (input == ".") {


    } else if (input == "=") {
        nextOperand = ~~bigDisplay.innerText
        let result = operate(prevOperand, nextOperand, operator);
        console.log(result);
        bigDisplay.innerText = result;

        smallDisplay.innerText = prevOperand + " " + operator + " " + nextOperand + " " + "=";
    }
    else if (prevOperand != "0") {
        bigDisplay.innerText = prevOperand + input
    } else {
        bigDisplay.innerText = input
    }
}




console.log(prevOperand, operator, nextOperand);

//-----------
const add = function (num1, num2) {
    return num1 + num2;
};

const sub = function (num1, num2) {
    return num1 - num2

};

const multiply = function (num1, num2) {
    return num1 * num2

};

const divide = function (num1, num2) {
    return num1 / num2

};


//------------------
const operate = function (num1, num2, operator) {
    switch (operator) {
        case "+":
            return add(num1, num2)
            break;

        case "-":
            return sub(num1, num2)
            break;

        case "*":
            return multiply(num1, num2)
            break;

        case "/":
            return divide(num1, num2)
            break;
        default:
            return null;
    }
}
