const add = function(a,b) {
    return a + b;
};

const subtract = function(a,b) {
    return a - b;
};

const multiply = function(numbers) {
    return numbers.reduce((result,number) => result * number);
};

const divide = function(a,b) {
    return a/b;
}

const operate = function (a,b,operator) {
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

module.exports = {
    add,
    subtract,
    multiply,
    divide
}