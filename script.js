let prevOperand;
let nextOperand;
let operator;

let bigDisplay = document.getElementById("big-display");
let smallDisplay = document.getElementById("small-display");
let resultDisplay = document.getElementById("result");

let buttons = document.getElementsByClassName("btn");
let numbersBtn = document.querySelectorAll(".btnNum");
let operatorBtn = document.querySelectorAll(".btnOperator");
let equalBtn = document.querySelector("#equal");
let allClear = document.querySelector("#ac");
let backSpace = document.querySelector("#delete");

let display1 = "";
let display2 = "";
let result = null;
let lastOperator = "";
let haveDecimal = false;

numbersBtn.forEach( number => {
    number.addEventListener('click', (e) => {
        if (e.target.innerText === "." && !haveDecimal) {
            haveDecimal = true;
        }else if (e.target.innerText === "." && haveDecimal) {
            return;
        }
        display2 += e.target.innerText;
        bigDisplay.innerText = display2;
    })
})


operatorBtn.forEach( operator => {
    operator.addEventListener('click', (e) => {
        if (!display2) return;
        haveDecimal = false;
        const operatorName = e.target.innerText;
        if (display1 && display2 && operatorName) {
            operate();
        }else {
            result = parseFloat(display2);

        }
        clearVar(operatorName);
        lastOperator = operatorName;
    })
});

function clearVar(name = ""){
    display1 += display2 + " " + name + " ";
    smallDisplay.innerText = display1;
    bigDisplay.innerText = "0";
    display2 = "";
    resultDisplay.innerText = result;
}


const backSpaceFunction = function () {
    console.log("clicked DEl");

}

const allClearFunction = function () {
    bigDisplay.innerText = "0";
    smallDisplay.innerText = "";
}


// for (let i = 0; i < buttons.length; i++) {
//     let btn = buttons[i];

//     btn.addEventListener("click", (e) => {
//         populateDisplay(e.target.innerText)
//     })

// }


// const populateDisplay = function (input) {

//     // display.innerText = displayNum;

//     prevOperand = bigDisplay.innerText;

//     if (input == "AC") {
//         allClear();

//     } else if (input == "DEL") {
//         backSpace();

//     } else if (input == "+" || input == "-" || input == "x" || input == "/") {
//         operator = input;
//         prevOperand = ~~bigDisplay.innerText;
//         smallDisplay.innerText = prevOperand + " " + input;
//         bigDisplay.innerText = "0";

//         console.log(prevOperand, operator, nextOperand);


//     } else if (input == ".") {


//     } else if (input == "=") {
//         nextOperand = ~~bigDisplay.innerText
//         let result = operate(prevOperand, nextOperand, operator);
//         console.log(result);
//         bigDisplay.innerText = result;

//         smallDisplay.innerText = prevOperand + " " + operator + " " + nextOperand + " " + "=";
//     }
//     else if (prevOperand != "0") {
//         bigDisplay.innerText = prevOperand + input
//     } else {
//         bigDisplay.innerText = input
//     }
// }




console.log(prevOperand, operator, nextOperand);

//-----------
// const add = function (num1, num2) {
//     return num1 + num2;
// };

// const sub = function (num1, num2) {
//     return num1 - num2

// };

// const multiply = function (num1, num2) {
//     return num1 * num2

// };

// const divide = function (num1, num2) {
//     return num1 / num2

// };


//------------------
const operate = function () {
    switch (lastOperator) {
        case "+":
            result = parseFloat(result) + parseFloat(display2);
            break;

        case "-":
            result = parseFloat(result) - parseFloat(display2);
            break;

        case "x":
            result = parseFloat(result) * parseFloat(display2);
            break;

        case "/":
            result = parseFloat(result) / parseFloat(display2);
            break;
        default:
            return null;
    }
}

equalBtn.addEventListener("click", e => {
    if(!display1 || !display2) return;
    haveDot = false;
    operate()
    clearVar();
    bigDisplay.innerText = result;
    resultDisplay.innerText = ''
    display2 = result;
    display1 = '';
})


allClear.addEventListener('click', () => {
    smallDisplay.innerText = "";
    bigDisplay.innerText = "0";
    resultDisplay.innerText = "";
    display1 = "";
    display2 = "";
    result = "";
})

backSpace.addEventListener('click', () => {
    bigDisplay.textContent = bigDisplay.textContent
        .toString()
        .slice(0, -1)
        console.log(bigDisplay.textContent);
})


window.addEventListener("keydown", e => {
    if (
        
        e.key === "0" ||
        e.key === "1" ||
        e.key === "2" ||
        e.key === "3" ||
        e.key === "4" ||
        e.key === "5" ||
        e.key === "6" ||
        e.key === "7" ||
        e.key === "8" ||
        e.key === "9" ||
        e.key === "." 
    ) {
        clickNumberBtn(e.key);
    } else if (
        e.key === "+" ||
        e.key === "-" ||
        e.key === "/" 
    ){
        clickOperator(e.key);
    }else if(e.key === "*"){
        clickOperator("x");
    }else if(e.key === "Enter" || e.key === "="){
        clickEqual();
    }
})

function clickNumberBtn(key) {
    numbersBtn.forEach(button => {
        if (button.innerText === key) {
            button.click();
        }
    })
}

function clickOperator(key) {
    operatorBtn.forEach(operator => {
        if (operator.innerText === key) {
            operator.click()
        }
    })
}

function clickEqual(key) {
    equalBtn.click();
}