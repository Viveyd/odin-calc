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
function getResult(num1, operator, num2){
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
    if(overwriteNext){
        ioDisplay.textContent = "";
        overwriteNext= false;
        
    }
    if(e.target.textContent == "."){
        e.target.disabled = true;
    }
    if(e.target.classList.contains('numerals')) ioDisplay.textContent += e.target.textContent; 
    else if(e.target.classList.contains('operator')){
        if(e.target.textContent == "=" && ioDisplay.textContent != "" && dataStore['operand1'] != null && dataStore['operator'] != null){
            dataStore['operand2'] = Number(ioDisplay.textContent);
            displayResult();
            
        }
        else if(e.target.textContent != "=" ){
            if(dataStore['operand1'] != null && dataStore['operator'] != null){
                dataStore['operand2'] = Number(ioDisplay.textContent);
                displayResult();
                dataStore['operator'] = e.target.textContent;
            }
            else{
                dataStore['operand1'] = Number(ioDisplay.textContent);
                dataStore['operator'] = e.target.textContent;
                ioDisplay.textContent = "";
            }
            
        }
    }
    else if(e.target.classList.contains('util')){
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
}

function displayResult(){
    // let operand1 = dataStore['operand1'];
    if(dataStore['operand2'] == 0){
        ioDisplay.textContent = "Err0r";
        dataStore['operand1'] = null;
        dataStore['operator'] = null;
        dataStore['operand2'] = null;
        overwriteNext = true;
    } 
    else{
        let result = getResult(dataStore['operand1'], dataStore['operator'], dataStore['operand2']);
        console.log(`Operation is ${dataStore['operand1']} ${dataStore['operator']} ${dataStore['operand2']}`);
        dataStore['operand1'] = result;
        dataStore['operand2'] = null;
        ioDisplay.textContent = result;
        overwriteNext = true;
    }


}

// document.addEventListener('keydown', (e) => {
//     if (e.key != "F5")e.preventDefault();
// })
// document.addEventListener('keyup', (e) => {
    
// })
let overwriteNext = false;
let matcher = ["/", "*", "-", "+", "Enter", "Del"];
let point = document.getElementById('point-btn');
let dataStore = {operand1: null, operator: null, operand2: null};
let ioDisplay = document.getElementById('io-display');
let main = document.getElementsByTagName('main')[0];
main.addEventListener('click', (e) => registerInput(e));
main.addEventListener('mouseup', () => {
    if(ioDisplay.textContent.includes('.')){
        point.disabled = true;
    } else point.disabled = false;
}
)

