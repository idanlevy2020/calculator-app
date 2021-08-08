//App - main component containing all the rest
import './App.css';
import Keypad from '../Keypad/Keypad';
import Display from '../Display/Display';

import { useState } from 'react';

function App() {
	const [expression, setExpression] = useState(['0']);
	const [theme, setTheme] = useState(1);

	console.log('expression', expression);

	// check if use keyboard keys instead of mouse in calculator
	window.addEventListener('keypress', function (e) {
		console.log('e.which:', e.which);
		console.log('e.keyCode', e.keyCode);
		var keycode = e.which || e.keyCode;
		var valueEntered = String.fromCharCode(keycode);

		let valueEnteredNumber = Number(valueEntered);
		if (isNaN(valueEnteredNumber)) {
			console.log('not number');
			onClick(valueEntered);
		} else {
			console.log('number');
			// onClick(valueEnteredNumber);
			// if (buttons.value==valueEnteredNumber){
			//   console.log('number');
			// }
		}
	});

	function toggleTheme() {
		if (theme === 1) return setTheme(2);
		if (theme === 2) return setTheme(3);
		if (theme === 3) return setTheme(1);
	}

	function onClick(button) {
		console.log('in onClick expression', expression);
		let copy_array = Array.from(expression); //Copy array by value
		console.log('in onClick copy_array', copy_array);

		let lastVal = expression[expression.length - 1];
		let typeofLastVal = '';

		if (lastVal == '+' || lastVal == '-' || lastVal == '*' || lastVal == '/') {
			typeofLastVal = 'operator';
		} else typeofLastVal = 'number';

		console.log('in onclick lastVal:', lastVal);
		console.log('in onclick typeofLastVal:', typeofLastVal);
		if (button.typeVal == 'number' || button.typeVal == 'operator') {
			if (button.typeVal == 'number') {
				if (typeofLastVal == 'number') {
					console.log('button.typeVal:', button.typeVal);
					if (expression.length >= 1) {
						if (
							expression.length == 1 &&
							expression[0] == '0' &&
							button.typeVal == 'number' &&
							button.value != '.'
						) {
							//for example: in input 03 return 3
							copy_array[copy_array.length - 1] = button.value; //swap last character in valueBtn
							console.log('after swap:', copy_array);
						} else if (expression[0] == '0' && button.value == '.') copy_array[0] = '0.';
						else if (lastVal == '.') copy_array[copy_array.length - 1] = '0.' + button.value;
						else if (button.value == '.' && lastVal.indexOf('.') > 0) {
							// if the user clicks point('.') and last value contains a decimal number
							//ignoring from the last click (button.value)
							//for example: in 2.34. The last input will not enter
						} else
							copy_array[copy_array.length - 1] =
								copy_array[copy_array.length - 1] + button.value;
					}
				} else if (typeofLastVal == 'operator') copy_array.push(button.value);
			}

			if (button.typeVal == 'operator') {
				if (expression.length == 1) {
					//for example in input 0 and operator like 0+ the expression=['0','+']
					copy_array.push(button.value);
				}
				if (expression.length > 1) {
					if (typeofLastVal == 'operator') {
						if (button.value != lastVal) {
							/*******swap lastChar in valueBtn ******/
							//for example: before swap 2+3*/ , after swap 2+3/
							copy_array[copy_array.length - 1] = button.value; //swap last charcter in valueBtn
						}
						if (button.value == lastVal) {
							// if the user clicks the same operator twice
							//ignoring from the last click (button.value)
							//for example: in 4*8++ return 4*8+ , in 2+3.. return 2+3.
						}
					} else copy_array.push(button.value); //for example expression=[3,'+']
				}
			}
			return setExpression(copy_array);
		}

		if (button.typeVal == 'resetBtn' || button.typeVal == 'delBtn') {
			if (button.typeVal == 'resetBtn') {
				copy_array = ['0'];
			}
			if (button.typeVal == 'delBtn') {
				console.log('before del expression.length', expression.length);
				if (typeofLastVal == 'number') {
					if (expression.length == 1) {
						if (lastVal.length == 1) copy_array = ['0'];
						else {
							//remove last digit
							copy_array[copy_array.length - 1] = copy_array[copy_array.length - 1].slice(
								0,
								-1
							);
						}
					} else if (expression.length > 1) {
						if (lastVal.length == 1) copy_array.pop();
						else {
							//remove last digit
							copy_array[copy_array.length - 1] = copy_array[copy_array.length - 1].slice(
								0,
								-1
							);
						}
					} else if (typeofLastVal == 'operator') copy_array.pop();
				}
			}
			return setExpression(copy_array);
		}

		/*********calculation without eval **********/
		if (button.value === '=') {
			if (typeofLastVal == 'operator') {
				//for example: in input: 2+3/= The calculation operation will not be performed
				alert('Enter another number');
				return; ////Ignoring from the last click (Request for calculation)
			} else if (typeofLastVal == 'number') {
				if (expression.length == 1) return setExpression(expression);
				else if (expression.length > 1) {
					//Calculation of multiplication or division operations on the array itself
					for (let i = 0; i < expression.length; i++) {
						console.log('i', i, 'expression[i]', expression[i]);
						if (expression[i] == '*' || expression[i] == '/') {
							if (expression[i] == '*')
								expression[i - 1] = String(
									Number(expression[i - 1]) * Number(expression[i + 1])
								);
							else if (expression[i] == '/')
								expression[i - 1] = String(
									Number(expression[i - 1]) / Number(expression[i + 1])
								);
							expression.splice(i, 2); ////delete two members from the array
							i = i - 2; //i go back two indexes after deleting
							console.log('expression after * or /:', expression);
						}
					} //end for

					//Calculation of addition or subtraction operations on the array itself
					for (let i = 0; i < expression.length; i++) {
						console.log('i', i, 'expression[i]', expression[i]);
						if (expression[i] == '+' || expression[i] == '-') {
							if (expression[i] == '+')
								expression[i - 1] = String(
									Number(expression[i - 1]) + Number(expression[i + 1])
								);
							else if (expression[i] == '-')
								expression[i - 1] = String(
									Number(expression[i - 1]) - Number(expression[i + 1])
								);
							expression.splice(i, 2); ////delete two members from the array
							i = i - 2; //i go back two indexes after deleting
							console.log('expression after + or -:', expression);
						}
					} //end for
					let sum = expression[0];
					return setExpression([sum]);
				}
			}
		} /*********end calculation **********/
	} //end function onClick()
	return (
		<div className={`App theme-${theme} flex-column`}>
			<div className='header flex-row'>
				<h1 id='calc'>calc</h1>
				<span>THEME</span>
				<div>
					<span className='SeveralSituations'> 1 </span>
					<span className='SeveralSituations'> 2 </span>
					<span className='SeveralSituations'> 3 </span>
					<button onClick={toggleTheme} className='toggleBtn'>
						<div></div>
					</button>
				</div>
			</div>
			<Display expression={expression} />
			<Keypad onClick={onClick} />
		</div>
	);
}

export default App;
