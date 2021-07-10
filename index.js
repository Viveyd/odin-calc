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
function registerInput(e){

    lastOutput = ioDisplay.textContent;
    if(e.target.classList.contains('util')){
        if(e.target.getAttribute('id') == 'clear-btn'){
            dataStore = {operand1: null, operator: null, operand2: null};
            ioDisplay.textContent = "";
        }
        else{
            let ioArray = ioDisplay.textContent.split('');
            ioArray.pop();
            ioDisplay.textContent = ioArray.join('');
        } 
    }
    else{
        if(e.target.classList.contains('numerals')){
            if(ioDisplay.getAttribute('showing-result') == 'true'){
                ioDisplay.setAttribute('showing-result', 'false');
                dataStore['operand1'] = null;
                dataStore['operand2'] = null;
            }
            if(overwrite){
                displayOutput(e.target.textContent, overwrite);
                overwrite = false;
            }
            else{
                displayOutput(e.target.textContent);
            }
        }
        else if(e.target.classList.contains('operator')){
            if(ioDisplay.textContent == ""){ 
                return 0 ;

            }

            if(ioDisplay.getAttribute('showing-result') == 'true' && e.target.getAttribute('id') != "equals-btn" ){
                dataStore['operand1'] = ioDisplay.textContent;
                dataStore['operator'] = e.target.textContent;
                overwrite = true;
                ioDisplay.setAttribute('showing-result', 'false');
            }
            else{
                if((dataStore['operand1'] == null && dataStore['operand2'] == null)){
                    dataStore['operand1'] = ioDisplay.textContent;
                    overwrite = true;
                   
                } 
                // else if(dataStore['operand1'] != null && dataStore['operator'] != null && dataStore['operand2'] == null){
                //     dataStore['operand2'] = ioDisplay.textContent;
                //     overwrite = true;
                // }

            }
            // if((dataStore['operand1'] == null && dataStore['operand2'] == null)){
                

            // }
            // else if(dataStore['operand1'] != null && dataStore['operand2'] == null) {
            //     dataStore['operand2'] = ioDisplay.textContent;
            //     ioDisplay.textContent = "";
            // };
            if(e.target.getAttribute('id') == "equals-btn" || (dataStore['operand1'] != null && dataStore['operator'] != null )){
                if(dataStore['operand1']!= null && dataStore['operator']!= null ){
                    dataStore['operand2'] = ioDisplay.textContent;
                    let output = operate(Number(dataStore['operand1']), dataStore['operator'], Number(dataStore['operand2']));
                    console.log(output);
                    overwrite = true;
                    displayOutput(output, overwrite);
                    dataStore['operand1'] = ioDisplay.textContent;
                    // dataStore['operator'] = null;
                    dataStore['operand2'] = null;
                    ioDisplay.setAttribute('showing-result', 'true');
                }
            }
            else{
                dataStore['operator'] = e.target.textContent;
            }
            lastTarget = e.target;
        }
    }
}

function displayOutput(output, overwrite){
    if(overwrite) ioDisplay.textContent = output;
    else ioDisplay.textContent += output;
}

let lastTarget;
let prepOperand2;
let overwrite= false;
let matcher = ["/", "*", "-", "+", "Enter", "Del"];
let point = document.getElementById('point-btn');
let dataStore = {operand1: null, operator: null, operand2: null};
let ioDisplay = document.getElementById('io-display');
let main = document.getElementsByTagName('main')[0];
main.addEventListener('click', (e) => registerInput(e));


