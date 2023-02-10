function add(a,b) {
    return a+b;
};
function subtract(a,b) {
    return a-b;
};
function multiply(a,b) {
    return a*b;
};
function divide(a,b) {
    return a/b;
};
function operate(operator,a,b) {
    if (operator == '+') return add(a,b);
    if (operator == '-') return subtract(a,b);
    if (operator == '×') return multiply(a,b);
    if (operator == '÷') return divide(a,b);
};
const display = document.querySelector('.display');
const displayValue = document.querySelector('.display-value')

const buttons = document.querySelectorAll('button');
let value = '';
let sign = '';
let a = '';
buttons.forEach((button) => {
    button.addEventListener('click', () => {
        if (button.classList == 'clear') {
            displayValue.textContent = sign = value = '';
            display.textContent = 0;
        }
        else if (button.classList == 'delete') {
            if(value.length == 0 || value.length == 1 ){
                value = '';
                display.textContent = 0;
            }
            else {
                display.textContent = value = value.toString().slice(0, -1);
            }
        }
        else if (value.length >= 17 ) {
            num = parseFloat(value)
            value = num.toExponential();
        }
        else if (button.classList == 'number') {
            display.textContent = value += button.id;
        }
        else if (button.classList == 'period' && !value.toString().includes('.')) {
            display.textContent = value += button.id;
        }
        else if (button.classList == 'operator' && sign == '') {
            a = value;
            sign = button.id;
            displayValue.textContent = value + ' ' + sign;
            display.textContent = value = '';
        }
        else if (button.id == '=' && sign == '÷' && value == 0 ||
        button.classList == 'operator' && sign == '÷' && value == 0) {
            display.textContent = "can't divide by zero";
            displayValue.textContent = value = '';
        }
        else if (button.classList == 'operator' && sign != ''){
            if (value == '' && sign != '') {
                return;
            }
            a = operate(sign, +a, +value);//here result is a cause a will be needed in next iteration
            //previous operator will act as sign
            sign = button.id;//then new operator will replace it 
            display.textContent = value = '';
            displayValue.textContent = a + ' ' + sign;
            console.log(value)
            
        }
        else if (button.id == '=' && value == '') {
            return; //so something like '10 + =' will not create problem
        }
        else if (button.id == '=' && value >= 0 && sign != '') {
            displayValue.textContent += ' ' + value;
            let result = operate(sign, +a, +value);
            display.textContent = value = result.toExponential();
            console.log(value);
            sign = '';
        }
    })
});