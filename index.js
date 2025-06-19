import {operate} from './operations.js';
let operator = '';
let var1 = '';
let var2 = '';
let state = "idle";


const buttonsContainer = document.querySelector('.container.buttons');
const screenResult = document.querySelector('.screen.result');


function populateToScreen(toOperate = false) {
    if(toOperate) {
        screenResult.innerText = operate(parseInt(var1),parseInt(var2),operator);
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
            if(button.id === 'operate')
                populateToScreen(true);
            break;
    }
}

function clear() {
    var1 = var2 = operator = '';
    screenResult.textContent = '';
    state = 'idle';
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