export function calculatorManager(expression,button,lastVal,typeofLastVal) {
//function calculatorManage() calculates the new expression after clicking one of the buttons
//for example expression=['9','+'], button.value='9'
//returns copy_array=['9','+','9']
//function onclick() in App.js will update the use state new expression=copy_array
    let copy_array = Array.from(expression); //Copy array by value
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
        // return setExpression(copy_array);
        return copy_array;
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
        // return setExpression(copy_array);
        return copy_array;
    }
}



