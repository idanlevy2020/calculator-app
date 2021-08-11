export function calculation(expression,button,lastVal,typeofLastVal){
/* function calculation() is responsible for a calculation without a function eval
   returns the sum of the expression */
    if (button.value === '=') {
        if (typeofLastVal == 'operator') {
            //for example: in input: 2+3/= The calculation operation will not be performed
            alert('Enter another number');
            return; ////Ignoring from the last click (Request for calculation)
        } else if (typeofLastVal == 'number') {
            if (expression.length == 1) return expression;
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
                let sum = [expression[0]];
                return (sum);
            }
        }
    } /*********end calculation **********/
}