// Display — contains the display area on the top

import './Display.css';

// function addComma(expression){
//   function reverse(str){
//     let newString='';
//     for (var i = str.length - 1; i >= 0; i--) {
//       newString += str[i];
//     }
//     return newString;
//   }

//   let exp=[];
//   for(let i=0;i<expression.length;i++){
//     if((expression[i]=="+") ||
//         (expression[i]=="-") ||
//         (expression[i]=="/") ||
//         (expression[i]=="*")){
//         exp.push(expression[i]);
//     }
//     else{
//       // let index_point=expression[i].indexOf(".");
//       exp.push(expression[i]);
//       let val;
//       if(exp[i].length>3){
//         let index=0;
//         for(let j=0;j<exp[i].length;j++){
//           if (index%4==0) val[index]=',';
//           val[index]=exp[i][j];
//           index++;
//         }
//         console.log('val',val);
//       }
//       }
//   }
//   console.log('exp:',exp);
//   return exp;
// }

function getDisplayValue(expressions) {
	// loop over all expressions
	// if expression its number -> check if nedd comma
	//    if its need comma -> add comma
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

function CalculatorDisplay(props) {
	// let e=addComma(props.expression)

	console.log('props.expression', props.expression);
	const displayValue = getDisplayValue(props.expression);
	console.log('displayValue', displayValue);
	return (
		<div id='Display'>
			{/* <span id="DisplayValue">{e}</span> */}
			<span id='DisplayValue'>{displayValue}</span>
		</div>
	);
}

export default CalculatorDisplay;

 
