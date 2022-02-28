let bigDisplay = document.getElementById("big-display");
let smallDisplay = document.getElementById("small-display");
let resultDisplay = document.getElementById("result");

let numbersBtn = document.querySelectorAll(".btnNum");
let operatorBtn = document.querySelectorAll(".btnOperator");
let equalBtn = document.querySelector("#equal");
let allClear = document.querySelector("#ac");
let backSpace = document.querySelector("#delete");

let previousOperand = "";
let currentOperand = "";
let result = null;
let lastOperator = "";
let haveDecimal = false;

numbersBtn.forEach( number => {
    number.addEventListener('click', (e) => {
        if(bigDisplay.innerText.length <= 13) {
            if (e.target.innerText === "." && !haveDecimal) {
                //if user click decimal and decimal wasn't clicked previously then make the havDecimal true
                haveDecimal = true;
            } else if (e.target.innerText === "." && haveDecimal) {
                return;  // if already decimal clicked then do nothing
            } 
            
            //if there is a zero in big display by default then the input number wii replace the zero otherwise input number will concat with display number
            if (bigDisplay.innerText != "0") {
                currentOperand += e.target.innerText;
            } else {
                currentOperand = e.target.innerText;
            }

            bigDisplay.innerText = currentOperand;

        }else return;
    })
})


operatorBtn.forEach( operator => {
    operator.addEventListener('click', (e) => {
        if (!currentOperand) return;

        haveDecimal = false;
        const operatorName = e.target.innerText;
        if (previousOperand && currentOperand && operatorName) {
            operate();
        }else {
            result = parseFloat(currentOperand);
        }
        populateDisplay(operatorName);
        lastOperator = operatorName;
    })
});


function populateDisplay(operator = ""){
    previousOperand += currentOperand + " " + operator + " ";
    smallDisplay.innerText = previousOperand;
    bigDisplay.innerText = "0";
    currentOperand = "";
    resultDisplay.innerText = result;
}


const operate = function () {

    switch (lastOperator) {
        case "+":
            result = parseFloat(result) + parseFloat(currentOperand);
            break;

        case "-":
            result = parseFloat(result) - parseFloat(currentOperand);
            break;

        case "x":
            result = parseFloat(result) * parseFloat(currentOperand);
            break;

        case "%":
            result = parseFloat(result) % parseFloat(currentOperand);
            break;

        case "/":
            result = currentOperand == "0" ? "Keep it real!" : parseFloat(result) / parseFloat(currentOperand);
            break;
        default:
            return null;
    }
}

equalBtn.addEventListener("click", e => {
    if(!previousOperand || !currentOperand) return;
    haveDecimal = false;
    operate()
    populateDisplay();
    bigDisplay.innerText = result;
    resultDisplay.innerText = ''
    currentOperand = result;
    previousOperand = '';
})


allClear.addEventListener('click', () => {
    smallDisplay.innerText = "";
    bigDisplay.innerText = "0";
    resultDisplay.innerText = "";
    previousOperand = "";
    currentOperand = "";
    result = "";
})

backSpace.addEventListener('click', () => {
    if (bigDisplay.innerText != "0") {
        let newCurrentOperand = bigDisplay.textContent
            .toString()
            .slice(0, -1)

        bigDisplay.innerText = newCurrentOperand;
        currentOperand = newCurrentOperand;
    }

    if (bigDisplay.innerText == "") {
        bigDisplay.innerText = "0"
    }
    
})

//Keyboard Functionality
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
        e.key === "/" ||
        e.key === "%"
    ){
        clickOperator(e.key);
    }else if(e.key === "*"){
        clickOperator("x");
    }else if(e.key === "Enter" || e.key === "="){
        clickEqual();
    } else if (e.key === "Delete") {
        clickAC();
    } else if (e.key === "Backspace") {
        clickBackSpace();
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

function clickEqual() {
    equalBtn.click();
}

function clickAC() {
    allClear.click();
} 
function clickBackSpace() {
    backSpace.click();
}