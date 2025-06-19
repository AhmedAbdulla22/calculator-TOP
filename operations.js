const add = function(a,b) {
    return a + b;
};

const subtract = function(a,b) {
    return a - b;
};

const multiply = function(a,b) {
    return a * b;
};

const divide = function(a,b) {
    if(a === 0 || b === 0)
        return 'invalid, can\'t divide on Zero!';
    return a/b;
}

export const operate = function (a,b,operator) {
    switch(operator) {
        case '+':
            return add(a,b);
        case '-':
            return subtract(a,b);
        case '*':
            return multiply(a,b);
        case '/':
            return divide(a,b);
        default: 
            return "invalid operator!";
    }
}