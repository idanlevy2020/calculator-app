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

function CalculatorDisplay(props) {
  // let e=addComma(props.expression)
  return (
    <div id="Display">
      {/* <span id="DisplayValue">{e}</span> */}
      <span id="DisplayValue">{props.expression}</span>
    </div>
  );
}

export default CalculatorDisplay;
