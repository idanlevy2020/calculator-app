// Display — contains the display area on the top

import './Display.css';

function addCommas(expressions) {
	console.log('in addCommas expression', expressions);
	// loop over all expressions
	// if expression its number -> check if need comma
	// if its need comma -> add comma
	// else return expressions
	return expressions.map(expression => {
		if (!isNaN(Number(expression))) {
			//nubmer
			const dot = expression.indexOf('.');
			let afterDot = null;
			let numbers;
			if (dot === -1) {
				numbers = expression.split('').reverse();
			} else {
				numbers = expression.split('.')[0].split('').reverse();
				afterDot = expression.split('.')[1];
			}
			let result = [];
			console.log('numbers', numbers);
			numbers.forEach((number, index) => {
				if (index > 0 && index % 3 === 0) {
					result.push(',');
					result.push(number);
				} else {
					result.push(number);
				}
			});
      console.log('afterDot',afterDot);
			let final = result.reverse().join('');
			if (dot !== -1) {
				final = final + '.' + afterDot;
			}
			return final;
		} else {
			// not numbers
			return expression;
		}
	});
}

function Display(props) {
	// let e=addComma(props.expression)
	console.log('in props.expression', props.expression);
	const displayValue = addCommas(props.expression);
	console.log('displayValue', displayValue);
	return (
		<div id='Display'>
			{/* <span id="DisplayValue">{e}</span> */}
			<span id="DisplayValue">{displayValue}</span> 
			{/* <input type="text" id='DisplayValue' placeholder={displayValue} /> */}
		</div>
		
	);
}

export default Display;

 
