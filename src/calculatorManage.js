import ReactDOM from "react-dom";
import CalculatorDisplay from "./CalculatorDisplay";
import App from "./App";
import { useState } from "react";

let root = document.querySelector(".root");

export function updateValue(valueBtn) {
    let displayValue = document.getElementById(
        "CalculatorDisplayValue"
    ).innerHTML;
    let lastChar = displayValue.substr(displayValue.length - 1);
    let str = ""; //The string will contain a collection of characters / actions

    switch (valueBtn) {
        case "DEL":
            str = displayValue.slice(0, -1); //remove the last character
            break;
        case "RESET":
            str = "0"; //Reset
            break;
        default:
            if (valueBtn !== "DEL" && valueBtn !== "RESET") {
                /*if 0 is displayed on the screen and the user entered
          example number 3 then 3 will be displayed and not 03 will be displayed */
                if (displayValue == "0" && Number.isInteger(valueBtn))
                    str = valueBtn;
                else str = displayValue + valueBtn;
            }
    }

    /*********if the user clicks the same action twice **********/
    if (
        (valueBtn == "+" ||
            valueBtn == "-" ||
            valueBtn == "/" ||
            valueBtn == "*" ||
            valueBtn == ".") &&
        (lastChar == "+" ||
            lastChar == "-" ||
            lastChar == "/" ||
            lastChar == "*" ||
            lastChar == ".")
    ) {
        if (valueBtn == lastChar) {
            return; //Ignoring from the last click
            //for example: 4*8++ is 4*8+ , 2+3.. is 2+3.
        } else if (valueBtn != lastChar) {
            /*******swap lastChar in valueBtn ******/
            //for example: before swap 2+3*/ , after swap 2+3/
            const myArr = displayValue.split(""); //array to sting
            myArr[myArr.length - 1] = valueBtn; //swap last charcter in valueBtn
            str = myArr.join(""); //string to array
        }
    }

    ReactDOM.render(<App value={str} />, root);
}

export function calculated(calculation) {
    let displayValue = document.getElementById(
        "CalculatorDisplayValue"
    ).innerHTML;
    let lastChar = displayValue.substr(displayValue.length - 1);
    if (
        lastChar == "+" ||
        lastChar == "-" ||
        lastChar == "/" ||
        lastChar == "*"
    ) {
        //for example: in input: 2+3/= The calculation operation will not be performed
        alert("Enter another number");
        return; ////Ignoring from the last click (Request for calculation)
    } else ReactDOM.render(<App value={eval(calculation)} />, root);
}

/**
 * 
 * @param {string} expression 
 * @returns  Number
 */
export function calc(expression){
  let result = 0;
  return result;
}


