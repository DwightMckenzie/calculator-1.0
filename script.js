const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');

// calculate first and secon value depending operator
const calculate = {
  '/': (firstNumber, secondNumber) => firstNumber / secondNumber,

  '*': (firstNumber, secondNumber) => firstNumber * secondNumber,

  '+': (firstNumber, secondNumber) => firstNumber + secondNumber,

  '-': (firstNumber, secondNumber) => firstNumber - secondNumber,

  '=': (firstNumber, secondNumber) => firstNumber = secondNumber
}

let firstValue = 0;
let operatorValue = '';
let awaitingNextValue = false;

function sendNumberValue(number) {
  // console.log(number);

  // if current display value is 0, rpelace it, if not add number

  // const displayValue = calculatorDisplay.textContent;
  // calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number;
  // calculatorDisplay.textContent

  // repplace current display value if first value is entered
  if (awaitingNextValue) {
    calculatorDisplay.textContent = number;
    awaitingNextValue = false;
  } else {
    const displayValue = calculatorDisplay.textContent;
    calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number;
  }
}

function addDecimal() {
  // if operator ScriptProcessorNode, dont add deciaml
  if (awaitingNextValue) return;

  // if no decimal add one
  if (!calculatorDisplay.textContent.includes('.')) {
    calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
  } 

}

function useOperator(operator) {
  const currentValue = Number(calculatorDisplay.textContent);
  // prevent multiple operators
  if (operatorValue && awaitingNextValue) {
    operatorValue = operator;
    return;
  }
  // assign firstvalue if no value
  if (!firstValue) {
    firstValue = currentValue;
  } else {
    // console.log(firstValue, operatorValue, currentValue);
    const calculation = calculate[operatorValue](firstValue, currentValue);
    // console.log('calculation', calculation); 
    calculatorDisplay.textContent = calculation;
    firstValue = calculation;
  }


  // ready for next value atore operator
  awaitingNextValue = true;
  operatorValue = operator;
  // console.log('firstValue ', firstValue);
  // console.log('operator ', operator);

}

/// add event listeners for numbers, operators, and decimal buttons
inputBtns.forEach((inputBtn) => {
  if (inputBtn.classList.length === 0) {
    inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value));
  } else if (inputBtn.classList.contains('operator')) {
    inputBtn.addEventListener('click', () => useOperator(inputBtn.value));
  } else if (inputBtn.classList.contains('decimal')) {
    inputBtn.addEventListener('click', () => addDecimal());
  }
});

// reset all value, display
function resetAll() {
  firstValue = 0;
  operatorValue = '';
  awaitingNextValue = false;
  calculatorDisplay.textContent ='0';
}

// event listeners
clearBtn.addEventListener('click', resetAll);


