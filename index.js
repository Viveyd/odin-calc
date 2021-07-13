function getSum(num1, num2){
    return num1 + num2;
}
function getDiff(num1, num2){
    return num1 - num2;
}
function getProduct(num1, num2){
    return num1 * num2;
}
function getQuotient(num1, num2){
    return num1 / num2;
}
function operate(num1, operator, num2){
    if(operator == "/" && num2 == 0){
        clearAll();
        return alert(`Can't divide by zero!`);
    } 
    num1 = Number(num1);
    num2 = Number(num2);
    console.log(dataStore);
    switch(operator){
        case "+":
            return getSum(num1, num2);
        case "-":
            return getDiff(num1, num2);
        case "*":
            return getProduct(num1, num2);
        case "/":
            return getQuotient(num1, num2);
    }
}
let operatorClicked = true;
function registerInput(e){
    e.preventDefault();
    if(e.target.classList.contains('numerals')){
        if(overwrite == true){
            displayOutput(e.target.textContent, overwrite);
        } 
        else displayOutput(e.target.textContent);
        overwrite = false;
        if(dataStore['operand1']!=null && dataStore['operator']!=null){
            dataStore['operand2'] = ioDisplay.textContent;
        }
    }
    else if(e.target.classList.contains('operator')){
        if(e.target.getAttribute('id') == 'equals-btn'){
            if(dataStore['operand1'] != null && dataStore['operator'] != null && dataStore['operand2'] != null){
                result = operate(dataStore['operand1'], dataStore['operator'], dataStore['operand2']);
                if(result%1 != 0) result = parseFloat(result).toFixed(2);
                overwrite = true;
                displayOutput(result, overwrite);
                dataStore['operand1'] = result;
                dataStore['operand2'] = null;
            }
            else{
                return alert('Invalid input');
            }
        }
        else{
            if(dataStore['operand1']==null){
                dataStore['operand1'] =ioDisplay.textContent;
                overwrite = true;
                dataStore['operator'] = e.target.textContent;
            }
            else if(dataStore['operand1'] != null && dataStore['operator'] != null && dataStore['operand2'] != null){
                result = operate(dataStore['operand1'], dataStore['operator'], dataStore['operand2']);
                overwrite = true;
                if(result%1 != 0) result = parseFloat(result).toFixed(2);
                displayOutput(result, overwrite);
                dataStore['operand1'] = result;
                dataStore['operand2'] = null;
                dataStore['operator'] = e.target.textContent;
            }
            else{
                dataStore['operator'] = e.target.textContent;
            }
        }
    }
    else if(e.target.classList.contains('util') == true){
        if(e.target.getAttribute('id') == 'clear-btn'){
            clearAll();
        }
        else{
            deleteLastChar();
        }
    }
    if(ioDisplay.textContent.includes('.') == true) point.disabled = true;
    else point.disabled = false;
    
}
function deleteLastChar(){
    let ioDisplayText = ioDisplay.textContent.split('');
    ioDisplayText.pop();
    ioDisplay.textContent = ioDisplayText.join('');
    dataStore['operand1'] = ioDisplay.textContent;
    }

function clearAll(){
    dataStore = {operand1: null, operator: null, operand2: null};
    ioDisplay.textContent = "";
}

function displayOutput(output, overwrite){
    if(overwrite){
        ioDisplay.textContent = output;
        overwrite = false;
    } 
    else ioDisplay.textContent += output;
}

let lastOperator;
let currentOperand;
let result = 0;
let overwrite= false;
let matcher = ["/", "*", "-", "+", "Enter", "Del"];
let point = document.getElementById('point-btn');
let dataStore = {operand1: null, operator: null, operand2: null};
let ioDisplay = document.getElementById('io-display');
let main = document.getElementsByTagName('main')[0];
main.addEventListener('click', (e) => registerInput(e));
document.addEventListener('keydown', (e)=>{
    // if(e.key.match(/[0-9]/)) registerInput(e);
    console.log(e.key)
    if(e.key == 'Delete') clearAll();
    else if(e.key == 'Backspace') deleteLastChar();
})

