import "./App.css";
import CalculatorButtons from "./CalculatorButtons";
import CalculatorDisplay from "./CalculatorDisplay";
import { useState } from "react";

function App() {
    const [expression, setExpression] = useState([0]);

    console.log("expression", expression);

    // check if use keyboard keys instead of mouse in calculator
    window.addEventListener('keypress', function(e) {
      console.log('e.which:',e.which);
      console.log('e.keyCode',e.keyCode);
      var keycode = e.which || e.keyCode;
      var valueEntered = String.fromCharCode(keycode);


      let valueEnteredNumber=Number(valueEntered);
      if(isNaN(valueEnteredNumber)){
        console.log('not number');
        onClick(valueEntered);
      }
      else{
        console.log('number');
        // onClick(valueEnteredNumber);
        // if (buttons.value==valueEnteredNumber){
        //   console.log('number');
        // }
      }
    });


    function onClick(button) {
      console.log("in onClick expression", expression);
      let copy_array=Array.from(expression);//Copy array by value
      console.log("in onClick copy_array", copy_array);

      if (button.value==="DEL"){
        console.log('in del expression.length',expression.length);
        if(expression.length==1){ 
        //for example: in [998] after del -> [99]
          let div = Math.trunc(expression[0]/10);
          return setExpression([div]); //return number div 10
        } 
        else{ //if(expression.length>1)
          if(typeof expression[expression.length-1]=='number'){
            //for example: in [123, "+", 456] after del -> [123, "+", 45]
            let div = Math.trunc(expression[expression.length-1]/10);
            if (div==0) copy_array.pop();
            else if (div!=0) copy_array[copy_array.length-1]=div;
          }
          else{//else in operators 
            //for example in operators: in [123, "+"] after del -> [123]
            copy_array.pop();
          }
          //return last number in expression div 10 or expression without operator
          return setExpression(copy_array);
        } 
      } 
      if (button.value==="RESET"){
        return setExpression([0]);
      } 

      if((typeof button.value=='number')&&(typeof expression[expression.length-1]=='number')){
        if ((expression.length == 1)&&(expression[0]==0)){ //if ((expression == [0])
        //for example: in input 03 return 3
        //in input 0+ we wait for another input of number
        copy_array[copy_array.length-1]=button.value;  //swap last character in valueBtn
        return setExpression(copy_array) //swap last charcter in valueBtn);
        }
        else if (expression[expression.length-1]!=0){ 
          copy_array[expression.length-1]= (copy_array[expression.length-1]*10)+button.value;  //swap last character in valueBtn
          return setExpression(copy_array) //swap last charcter in valueBtn);
          }
      } 

      /*********if the user clicks the same operator twice **********/
      //for example: in 4*8++ return 4*8+ , in 2+3.. return 2+3.
      if((button.operator)&&((expression[expression.length-1]=="+") ||
      (expression[expression.length-1]=="-") ||
      (expression[expression.length-1]=="/") ||
      (expression[expression.length-1]=="*") ||
      (expression[expression.length-1]=="."))){
        if (button.value === expression[expression.length-1]) {
          //ignoring from the last click (button.value)
          return setExpression(copy_array); //remove the last character
        } 
        else if (button.value != expression[expression.length-1]) {
          /*******swap lastChar in valueBtn ******/
          //for example: before swap 2+3*/ , after swap 2+3/
          copy_array[copy_array.length-1]=button.value;  //swap last charcter in valueBtn
          return setExpression(copy_array) //swap last charcter in valueBtn);
        }
      }

      if ((expression.length >= 1) && (button.value !== "=") && (button.value !== "DEL") && (button.value !== "RESET")) {
        copy_array.push(button.value);
        return setExpression(copy_array);
      }

      /*********calculation without eval **********/
      if(button.value === "="){
        if ((expression[expression.length-1]=="+") || (expression[expression.length-1]=="-") ||
          (expression[expression.length-1]=="/") || (expression[expression.length-1]=="*") ||
          (expression[expression.length-1]==".")){
        //for example: in input: 2+3/= The calculation operation will not be performed
        alert("Enter another number");
        return; ////Ignoring from the last click (Request for calculation)
      }

      if((expression.length==1)&&(typeof expression[0]=='number')){
        return setExpression(expression);
      }

      else if(expression.length>1){
        //Calculation of multiplication and division operations on the array itself
        for(let i=0;i<expression.length;i++){
          console.log('i',i,'values[i]',expression[i]);
          if ((expression[i]=='*')||(expression[i]=='/')){
              if (expression[i]=='*') expression[i-1]=expression[i-1]*expression[i+1];
              else if (expression[i]=='/') expression[i-1]=expression[i-1]/expression[i+1];
              expression.splice(i, 2); //delete two members from the array
              i=i-2; //i go back two indexes after deleting
              console.log('expression after * or /:',expression);
          }
        }
      }

      //Calculation of addition and subtraction operations on the array itself
      for(let i=0;i<expression.length;i++){
          console.log('i',i,'expression[i]',expression[i]);
          if ((expression[i]=='+')||(expression[i]=='-')){
              if (expression[i]=='+') expression[i-1]=expression[i-1]+expression[i+1];
              else if (expression[i]=='-') expression[i-1]=expression[i-1]-expression[i+1];
              expression.splice(i, 2); ////delete two members from the array
              i=i-2; //i go back two indexes after deleting
              console.log('expression after + or -:',expression);
          }
      }
          let sum=expression[0];
          return setExpression([sum]);
      }/*********end calculation **********/ 
    } //end function onClick()
    return (
        <div className="App flex-column">
            <div className="header flex-row">
                <h1 id="calc">calc</h1>
                <span>THEME</span>
                <div>
                    <span className="SeveralSituations"> 1 </span>
                    <span className="SeveralSituations"> 2 </span>
                    <span className="SeveralSituations"> 3 </span>
                    <button className="toggleBtn">
                        <div></div>
                    </button>
                </div>
            </div>
            <CalculatorDisplay expression={expression} />
            <CalculatorButtons onClick={onClick} />
        </div>
    );
}

export default App;
