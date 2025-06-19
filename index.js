import {operate} from './operations.js';
let operator = '';
let var1 = '';
let var2 = '';
let state = "idle";


const buttonsContainer = document.querySelector('.container.buttons');
const screenResult = document.querySelector('.screen.result');


function populateToScreen(toOperate = false) {
    if(toOperate && state === '2ndVar') {
        screenResult.innerText = operate(parseFloat(var1),parseFloat(var2),operator);
        state = 'result';
    }
    else {
        screenResult.textContent = var1 + operator + var2;
    }
}

function updateInputs(button) {
    switch(button.classList[0]) {
        case 'digit':
            //to clear then assign number at screen
            if(state === "result") {
                clear();
            }
            assignNumber(button.textContent);
            populateToScreen();
            break;
        case 'op':
            assignOperator(button.id);
            populateToScreen();
            break;
        case 'control':
            switch(button.id) {
                case 'operate':
                    populateToScreen(true);
                    break;
                case 'clear':
                    clear();
                    break;
                case 'backspace':
                    backspace();
                    break;
                case 'period':
                    addPeriod();
                    populateToScreen();
                    break;
                case 'plus/minus':
                    changePlusMinus();
                    populateToScreen();
            };
            break;
    }
}

function clear() {
    var1 = var2 = operator = '';
    screenResult.textContent = '';
    state = 'idle';
}

function backspace() {
    switch(state) {
        case '1stVar':
            var1 =var1.slice(0,-1);
            break;
        case '2ndVar':
            //if var2 empty change state to op and remove it
            if(var2 === '') {
                state = 'operator';
                backspace();
                return;
            }    
            var2 =var2.slice(0,-1);
            break;
        case 'operator':
            if(operator === '') {
                state = '1stVar';
                backspace();
                return;
            }    
            operator = operator.slice(0,-1);
            break;
    }
    //then update screen too
    screenResult.textContent = screenResult.textContent.slice(0,-1);
} 

function addPeriod() {
    switch(state) {
        case '1stVar':
            var1 += '.';
            break;
        case '2ndVar':
            var2 += '.';
            break;
    }
}

function changePlusMinus() {
    switch(state) {
        case '1stVar':
            if(!var1.includes('-'))
                var1 = '-' + var1;
            else
                var1 = var1.slice(1);
            break;
        case '2ndVar':
            if(operator === '-')
                operator = '+';
            else if(operator === '+') {
                operator = '-';
            } else {
                if(!var2.includes('-'))
                    var2 = '(-' + var2 + ')';
                else
                    var2 = var2.slice(2,-1);
            }
            break;
    }
}

function assignNumber(number) {
    //update States
    if(state === 'idle') state = '1stVar';
    else if(state === 'operator') state = '2ndVar';

    switch(state) {
        case '1stVar':
            var1 += number;
            break;
        case '2ndVar':
            var2 += number;
            break;
    }
}

function assignOperator(op) {
    if(state !== "1stVar") return;
    console.log(op);
    operator = op;
    state = 'operator';
}

buttonsContainer.addEventListener("click",(e) => {
    if(e.target.tagName !== "BUTTON") return;
    updateInputs(e.target);
})