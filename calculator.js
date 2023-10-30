function appendToInput(value) {
    const inputField = document.getElementById('input');
    inputField.value += value;
}

function clearAll() {
    const inputField = document.getElementById('input');
    inputField.value = '';
}

function clearEntry() {
    const inputField = document.getElementById('input');
    inputField.value = inputField.value.slice(0, -1);
}

function calculateResult() {
    const inputField = document.getElementById('input');
    const expression = inputField.value;
    try {
        const result = evaluateExpression(expression);
        inputField.value = result;
    } catch (error) {
        inputField.value = 'Erro';
    }
}

function evaluateExpression(expression) {
    const postfix = infixToPostfix(expression);
    return evaluatePostfix(postfix);
}

function precedence(operator) {
    if (operator === '+' || operator === '-') {
        return 1;
    } else if (operator === '*' || operator === '/') {
        return 2;
    }
    return 0;
}

function infixToPostfix(expression) {
    const output = [];
    const stack = [];
    const tokens = expression.match(/(\d+(\.\d+)?|\+|-|\*|\/|\(|\))/g);

    for (let token of tokens) {
        if (!isNaN(token)) {
            output.push(token);
        } else if (token === '(') {
            stack.push(token);
        } else if (token === ')') {
            while (stack.length > 0 && stack[stack.length - 1] !== '(') {
                output.push(stack.pop());
            }
            stack.pop();
        } else {
            while (
                stack.length > 0 &&
                precedence(stack[stack.length - 1]) >= precedence(token)
            ) {
                output.push(stack.pop());
            }
            stack.push(token);
        }
    }

    while (stack.length > 0) {
        output.push(stack.pop());
    }

    return output.join(' ');
}

function evaluatePostfix(expression) {
    const stack = [];
    const tokens = expression.split(' ');

    for (let token of tokens) {
        if (!isNaN(token)) {
            stack.push(parseFloat(token));
        } else {
            const b = stack.pop();
            const a = stack.pop();
            switch (token) {
                case '+':
                    stack.push(a + b);
                    break;
                case '-':
                    stack.push(a - b);
                    break;
                case '*':
                    stack.push(a * b);
                    break;
                case '/':
                    stack.push(a / b);
                    break;
            }
        }
    }

    return stack[0];
}
