"use strict";
// Jack Widmer - Lab 2 js file.

/** @global {string} */  let result;								//Result
/** @global {boolean} */ let calculatorOn;							// Remember if the calculator is on or off.
/** @global {string} */  let currentNumberEntered;					// The current number entered and shown in the display.
/** @global {string} */  let memoryStore;							// Used for MRC/M-/M+ buttons.
/** @global {string} */  let operationClicked;						// The operation [%+x-÷] that was clicked.
/** @global {string} */  let previousAreaClicked;					// The previous area that was clicked.
/** @global {string} */  let previousNumberEntered;					// The previous number entered.
/** @global {string} */  let previousOperand_2;						// The previous second operand. Used for following on = calculations.


function _Initialize() {
	turnCalculatorOn();
	turnCalculatorOff();
}

/**
 * Perform the calculator button function.
 *
 * @param {string} numberClicked - The value of the button that was clicked.
 */
function addKeyToCurrentNumberEntered(numberClicked) {
	if (Number(currentNumberEntered)) {
		currentNumberEntered += numberClicked;
	} else {
		currentNumberEntered = numberClicked;
	}
} // END addKeyToCurrentNumberEntered.

/**
* Get the calculator display value.
*
* @return {string} The current display string.
*/
function getDisplay() {
	return document.getElementById('calculatorDisplay').innerText;
} // END getDisplay.

/**
 * Perform the calculator button function.
 *
 * @param {object} e - The area that was clicked on.
 * @return (false) Stops the area href from being opened.
 */
function performCalculatorButton(e) {
	let btnClicked = e.title;
	console.log(`performCalculatorButton[] btnClicked = ${btnClicked}`);
	if (calculatorOn) {
		switch (btnClicked) {

			case '00':
				if (currentNumberEntered == '' || currentNumberEntered == '0') {
					btnClicked = '0';
					break;
				}
			case '.':
				if (btnClicked === '.' && getDisplay().indexOf('.') !== -1) {
					break;
				}
			case '0':
			case '1':
			case '2':
			case '3':
			case '4':
			case '5':
			case '6':
			case '7':
			case '8':
			case '9':
				previousAreaClicked = btnClicked;
				addKeyToCurrentNumberEntered(btnClicked);
				setDisplay(currentNumberEntered);
				memoryStore = previousNumberEntered;
				break;
			case 'on':
				if (calculatorOn) {
					turnCalculatorOff();
				}
				break;
			case 'MRC':
				if (previousAreaClicked === 'MRC') {
					resetCalculator();
				}
				else {
					operationClicked = '';
					setDisplay(memoryStore);
				}
				console.log(`previousNumberEntered = ${previousNumberEntered}`);
				console.log(`operationClicked = ${operationClicked}`);
				console.log(`currentNumberEntered = ${currentNumberEntered}`);
				console.log(`previousAreaClicked = ${previousAreaClicked}`);
				console.log(`memoryStore = ${memoryStore}`);
				break;
			case '+':
			case '-':
			case '/':
			case 'x':
			case '%':
				if (previousAreaClicked !== '=') {
					previousNumberEntered = currentNumberEntered;
				}
				operationClicked = btnClicked;
				previousNumberEntered = currentNumberEntered;
				currentNumberEntered = '';
				setDisplay(btnClicked);
				break;
			case '=':
				if (previousAreaClicked === '=') {
					if (previousOperand_2 !== '' && currentNumberEntered === '') {
						currentNumberEntered = previousOperand_2;
					} else {
					}
				}
				switch (operationClicked) {
					case '+':
						result = (parseFloat(previousNumberEntered) + parseFloat(currentNumberEntered)); //For addition
						break;
					case '-':
						result = (parseFloat(previousNumberEntered) - parseFloat(currentNumberEntered)); //For Subtraction
						break;
					case '/':
						result = (parseFloat(previousNumberEntered) / parseFloat(currentNumberEntered)); //For Division
						break;
					case 'x':
						result = (parseFloat(previousNumberEntered) * parseFloat(currentNumberEntered)); //For Multiplication
						break;
					case '%':
						result = (parseFloat(previousNumberEntered) % parseFloat(currentNumberEntered)); //For Remainder
						break;
				}
				if (result === Infinity) {
					resetCalculator();
					alert('Divide by 0 error');
				} else {
					previousOperand_2 = currentNumberEntered;
					currentNumberEntered = result;
					setDisplay(result);
				}
				console.log(`previousNumberEntered = ${previousNumberEntered}`);
				console.log(`operationClicked = ${operationClicked}`);
				console.log(`currentNumberEntered = ${currentNumberEntered}`); //All these console lines are for testing, actually super helpful
				console.log(`previousAreaClicked = ${previousAreaClicked}`);
				console.log(`memoryStore = ${memoryStore}`);
				console.log(`result = ${result}`);
				break;
			case 'M-':
				result = ((parseFloat(memoryStore)) - parseFloat(currentNumberEntered));//Subtracts from memory
				previousNumberEntered = result;
				setDisplay(result);
				console.log(`previousNumberEntered = ${previousNumberEntered}`);
				console.log(`operationClicked = ${operationClicked}`);
				console.log(`currentNumberEntered = ${currentNumberEntered}`); //All these console lines are for testing, actually super helpful
				console.log(`previousAreaClicked = ${previousAreaClicked}`);
				break;
			case 'M+':
				result = ((parseFloat(memoryStore)) + parseFloat(currentNumberEntered));//Adds to memory
				previousNumberEntered = result;
				setDisplay(result);
				console.log(`previousNumberEntered = ${previousNumberEntered}`);
				console.log(`operationClicked = ${operationClicked}`);
				console.log(`currentNumberEntered = ${currentNumberEntered}`); //All these console lines are for testing, actually super helpful
				console.log(`previousAreaClicked = ${previousAreaClicked}`);
				break;
			case '+/-':
				if (currentNumberEntered > 0) {
					function pos_to_neg(num) {
						return -Math.abs(num);
					}
					currentNumberEntered = pos_to_neg(currentNumberEntered); //For changing the current number to negative
					setDisplay(currentNumberEntered);
				}
				else if (currentNumberEntered < 0) {
					currentNumberEntered = Math.abs(currentNumberEntered); //Changes current number to positive
					setDisplay(currentNumberEntered);
				}
				break;
			case 'arr':
				currentNumberEntered = currentNumberEntered.slice(0, -1); //Used as a backspace
				setDisplay(currentNumberEntered);
				break;
			default:
				console.log(`${btnClicked} not programmed.`);
		}
		previousAreaClicked = btnClicked;
	} else {
		if (btnClicked === 'on') {
			turnCalculatorOn(); //Turn on the calculator
		}
	}
	return false;
} // END performCalculatorButton.

/**
 * Turn on and reset the calculator global variables.
 */
function resetCalculator() {
	currentNumberEntered = '';
	operationClicked = '';
	memoryStore = '0';
	previousAreaClicked = '';
	previousNumberEntered = '0';
	setDisplay('0');
} // END resetCalculator.

/**
 * Turn off the calculator.
 */
function turnCalculatorOff() {
	console.log('turnCalculatorOff[]');
	calculatorOn = false;
	document.getElementById('calculatorDisplay').style.backgroundColor = 'black';
} // END turnCalculatorOff.

/**
 * Turn on and reset the calculator.
 */
function turnCalculatorOn() {
	console.log('turnCalculatorOn[]');
	calculatorOn = true;
	resetCalculator();
	setDisplay('0');
	document.getElementById('calculatorDisplay').style.backgroundColor = 'silver';
} // END turnCalculatorOn.

/**
 * Set the calculator display value.
 *
 * @param {object} displayValue - The value to display.
 */
function setDisplay(displayValue) {
	document.getElementById('calculatorDisplay').innerText = displayValue;
} // END setDisplay.
