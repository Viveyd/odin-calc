let result = 0;
let overwrite= true;
let point = document.getElementById('point-btn');
let dataStore = {operand1: null, operator: null, operand2: null};
let ioDisplay = document.getElementById('io-display');
let main = document.getElementsByTagName('main')[0];
let subDisplay = document.getElementById('sub-display');
let mainDisplay = document.getElementById('main-display')
let dotExists = false;

mainDisplay.textContent = 0;
//Click event listeners
main.addEventListener('click', (e) => registerInput(e));
//Keydown event listeners
document.addEventListener('keydown', (e)=>{
    if(e.key == 'F5' || e.key == 'F12') ;
    else e.preventDefault();
    if(e.key.match(/[0-9]/) && !e.key.includes('F')){
        if(overwrite == true){
            displayOutput(e.key, overwrite);
        }
        else displayOutput(e.key);
        overwrite = false;
        if(dataStore['operand1']!=null && dataStore['operator']!=null){
            dataStore['operand2'] = mainDisplay.textContent;
        }
    }
    else if(e.key == 'Enter' || e.key == '+' || e.key == '-' || e.key == '*' || e.key == '/'){
        if(e.key == 'Enter'){
            if(dataStore['operand1'] != null && dataStore['operator'] != null && dataStore['operand2'] != null){
                result = operate(dataStore['operand1'], dataStore['operator'], dataStore['operand2']);
                overwrite = true;
                displayOutput(result, overwrite);
                mainDisplay.setAttribute('showing-results', true);
                dataStore['operand1'] = result;
                dataStore['operand2'] = null;
            }
            else{
               return 0;
            }
        }
        else{
            if(dataStore['operand1']==null){
                dataStore['operand1'] =mainDisplay.textContent;
                overwrite = true;
                dataStore['operator'] = e.key;
            }
            else if(dataStore['operand1'] != null && dataStore['operator'] != null && dataStore['operand2'] != null){
                result = operate(dataStore['operand1'], dataStore['operator'], dataStore['operand2']);
                overwrite = true;
                displayOutput(result, overwrite);
                mainDisplay.setAttribute('showing-results', true);
                dataStore['operand1'] = result;
                dataStore['operand2'] = null;
                dataStore['operator'] = e.key;
            }
            else{
                dataStore['operator'] = e.key;
            }
        }
    }
    else if(e.key == 'Delete') clearAll();
    else if(e.key == 'Backspace') deleteLastChar();
    else if(e.key == '.'){
        if(mainDisplay.textContent == '0'){
            displayOutput('.');
            dotExists = true;
            overwrite = false;
        } 
        else if(dotExists && dataStore['operand1'] != null && dataStore['operator'] != null && mainDisplay.getAttribute('showing-results') == true){
            mainDisplay.setAttribute('showing-results', false); 
            displayOutput('0.', overwrite);
            dotExists = true;
            overwrite = false;
        }
        else if(dotExists){
            return 0;
        }
        else{
            if(overwrite == true){
                displayOutput('0.', overwrite);
                overwrite = false;
            } 
            else displayOutput('.')
            dotExists = true;
        }
        
    } ;
    if(mainDisplay.textContent.includes('.')) dotExists = true;
    else dotExists = false;
})

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
    let returnVal;
    if(operator == "/" && num2 == 0){
        clearAll();
        return alert(`Can't divide by zero!`);
    } 
    num1 = Number(num1);
    num2 = Number(num2);
    switch(operator){
        case "+":
            returnVal = getSum(num1, num2);
            break;
        case "-":
            returnVal = getDiff(num1, num2);
            break;
        case "*":
            returnVal = getProduct(num1, num2);
            break;
        case "/":
            returnVal = getQuotient(num1, num2);
            break;
    }
    if(returnVal%1 != 0) returnVal = Number(parseFloat(returnVal).toFixed(2));
    subDisplay.textContent = `${num1} ${operator} ${num2} = ${returnVal}`;
    return returnVal;
}
function registerInput(e){
    e.preventDefault();
    //Passes numeric key text content to display function, overwrite included if more appropriate (e.g. after pressing operator)
    if(e.target.classList.contains('numerals')){
        if(e.target == point){
            if(mainDisplay.textContent == '0'){
                displayOutput('.');
                dotExists = true;
                overwrite = false;
                return 0;
            } 
            else if(dotExists && dataStore['operand1'] != null && dataStore['operator'] != null && mainDisplay.getAttribute('showing-results') == true){
                displayOutput('0.', overwrite);
                mainDisplay.setAttribute('showing-results', false); 
                dotExists = true;
                overwrite = false;
                return 0;
            }
            else if(dotExists){
                return 0;
            }
            else{
                if(overwrite == true){
                    displayOutput('0.', overwrite);
                    overwrite = false;
                } 
                else displayOutput('.')
                dotExists = true;
                return 0;
            }
        }
        if(overwrite == true){
            displayOutput(e.target.textContent, overwrite);
        } 
        else displayOutput(e.target.textContent);
        overwrite = false;
        if(dataStore['operand1']!=null && dataStore['operator']!=null){
            dataStore['operand2'] = mainDisplay.textContent;
        }
    }
    // If you clicked an operator:
    else if(e.target.classList.contains('operator')){
        // Check if operator == equal, and all variables for operate func is ready
        if(e.target.getAttribute('id') == 'equals-btn'){
            if(dataStore['operand1'] != null && dataStore['operator'] != null && dataStore['operand2'] != null){
                result = operate(dataStore['operand1'], dataStore['operator'], dataStore['operand2']);
                overwrite = true;
                displayOutput(result, overwrite);
                mainDisplay.setAttribute('showing-results', true);
                dataStore['operand1'] = result;
                dataStore['operand2'] = null;
            }
            else{
                return 0;
            }
        }
        // If any other operator then check if all variables for operate func is ready. If all ready, then compute and display output and prep for next calculation
        // If not then just store the current display input as operand1.
        else{
            if(dataStore['operand1']==null){
                dataStore['operand1'] =mainDisplay.textContent;
                overwrite = true;
                dataStore['operator'] = e.target.textContent;
            }
            else if(dataStore['operand1'] != null && dataStore['operator'] != null && dataStore['operand2'] != null){
                result = operate(dataStore['operand1'], dataStore['operator'], dataStore['operand2']);
                overwrite = true;
                displayOutput(result, overwrite);
                mainDisplay.setAttribute('showing-results', true);
                dataStore['operand1'] = result;
                dataStore['operand2'] = null;
                dataStore['operator'] = e.target.textContent;
            }
            else{
                dataStore['operator'] = e.target.textContent;
            }
        }
    }
    // AC/CE if their button is pressed
    else if(e.target.classList.contains('util') == true){
        if(e.target.getAttribute('id') == 'clear-btn'){
            clearAll();
        }
        else{
            deleteLastChar();
        }
    }
    //  Check for point after every input + enable/disable accordingly
    if(mainDisplay.textContent.includes('.')) dotExists = true;
    else dotExists = false;
}
// Remove last character entry
function deleteLastChar(){
    let mainDisplayText = mainDisplay.textContent.split('');
    mainDisplayText.pop();
    mainDisplay.textContent = mainDisplayText.join('');
    dataStore['operand1'] = mainDisplay.textContent;
    }

// Set display content to none and reset dataStore values to default
function clearAll(){
    dataStore = {operand1: null, operator: null, operand2: null};
    mainDisplay.textContent = "0";
    subDisplay.textContent = "";
}
// Display output by appending to display unless overwrite explicitly stated
function displayOutput(output, overwrite){
    if(overwrite){
        mainDisplay.textContent = output;
        overwrite = false;
    } 
    else mainDisplay.textContent += output;
}



