import {operate} from './operations.js';
let operator = '';
let var1 = '0';
let var2 = '';
let state = "idle";
const keyboardBtns = '0123456789-*/.+';


const buttonsContainer = document.querySelector('.container.buttons');
const screenResult = document.querySelector('.screen.result');

populateToScreen();

function populateToScreen(toOperate = false,toUseResultAfterward = false) {
    if(toOperate && (state === '2ndVar' || toUseResultAfterward)) {
        screenResult.innerText = operate(parseFloat(var1),parseFloat(var2),operator);
        state = (toUseResultAfterward) ? '2ndVar':'result';
        return;
    }
    else if (toOperate && state === 'result') {
        return;
    }

    screenResult.textContent = var1 + operator + var2;
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
    var1 = '0';
    var2 = operator = '';
    screenResult.textContent = '0';
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
        case 'idle': state = '1stVar';
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
    if(state === 'idle' && number === '0') return; //fix 0 problem when idle
    if(state === 'idle') {
        state = '1stVar';
        var1 = '';
    }
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
    if(state === '2ndVar' || state === 'result') {
        populateToScreen(true,true);
        const result = screenResult.textContent;
        clear();
        var1 = (parseFloat(result)) ? result: '0';
        state = '1stVar'; 
    }

    if(state === "idle") return;
    
    operator = op;
    state = 'operator';
}

buttonsContainer.addEventListener("click",(e) => {
    if(e.target.tagName !== "BUTTON") return;
    updateInputs(e.target);
})

// document.addEventListener("keydown", (e) => {
//   const key = e.key;
//   switch(key) {
//     case '0':
//         {
//             const btn = document.querySelector('#0');
//             btn.click();
//         }
//   }
// });