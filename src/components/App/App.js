//App - main component containing all the rest
import './App.css';
import Keypad from '../Keypad/Keypad';
import {buttons} from '../Keypad/Keypad';
import Display from '../Display/Display';
import {calculatorManager} from '../../calculatorManager.js';
import {calculation} from '../../calculation.js';

import { useState } from 'react';

function App() {
	const [expression, setExpression] = useState(['0']);
	const [theme, setTheme] = useState(1);

	console.log('expression', expression);

	function pressingkeys(){
	// check if use keyboard keys instead of mouse in calculator
		window.addEventListener('keypress', function (e) {
			console.log('e.which:', e.which);
			console.log('e.keyCode', e.keyCode);
			var keycode = e.which || e.keyCode;
			let valueEntered = String.fromCharCode(keycode);
	
			console.log('valueEntered:',valueEntered);
			
			let obj = buttons.find(button => button.value === valueEntered);
			console.log('obj', obj);
	
			if (obj!=undefined){
				let a=onClick(valueEntered);
				console.log('a', a);
			}
		});
	}

	pressingkeys();

	function toggleTheme() {
		if (theme === 1) return setTheme(2);
		if (theme === 2) return setTheme(3);
		if (theme === 3) return setTheme(1);
	}

	function onClick(button) {
	//onClick() gets a new value(button) and updates and render the new expression
		console.log('first: in onClick button:',button);
		console.log('first: in onClick expression:',expression);
		let lastVal = expression[expression.length - 1];
		//lastVal - is the expression before clicking on the button (before enter new value)
		let typeofLastVal = '';
	
		if (lastVal == '+' || lastVal == '-' || lastVal == '*' || lastVal == '/') {
			typeofLastVal = 'operator';
		} 
		else typeofLastVal = 'number';

		if (button.value === '='){
			let sum=calculation(expression,button,lastVal,typeofLastVal);
			return setExpression(sum); //update use state expression=sum and render 
		} 
		else{
			//update use state expression=(new expression) after clicking one of the buttons and render 
			let new_exp=calculatorManager(expression,button,lastVal,typeofLastVal);
			return setExpression(new_exp);  
		} 
	} 

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
						<div id="toggle">
							<div id="circle"></div>
						</div>
					</button>
				</div>
			</div>
			<Display expression={expression} />
			<Keypad onClick={onClick} />
		</div>
	);
}

export default App;
