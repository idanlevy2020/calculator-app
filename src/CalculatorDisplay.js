import './CalculatorDisplay.css';

function addComma(expression) {
	let exp = '';
	for (let i = 0; i < expression.length; i++) {
		if (
			expression[i] == '+' ||
			expression[i] == '-' ||
			expression[i] == '/' ||
			expression[i] == '*' ||
			expression[i] == '.'
		) {
			exp = exp + expression[i];
		} else exp += expression[i].toLocaleString();
	}
	return exp;
}

function CalculatorDisplay(props) {
	let e = addComma(props.expression);
	return (
		<div id='CalculatorDisplay'>
			<span id='CalculatorDisplayValue'>{e}</span>
		</div>
	);
}

export default CalculatorDisplay;
