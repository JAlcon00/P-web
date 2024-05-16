// Variables para almacenar los valores de las variables W, X, Y & Z
let variables = {
    'W': null,
    'X': null,
    'Y': null,
    'Z': null
};

// Función para asignar valores a las variables
function setVariable(variable, value) {
    variables[variable] = value;
}

// Función para añadir entrada a la calculadora
function addToInput(value) {
    document.calculator.ans.value += value;
}

// Función para limpiar la entrada de la calculadora
function clearInput() {
    document.calculator.ans.value = '';
}

// Función para calcular el resultado de la expresión matemática ingresada
function calculate() {
    let input = document.calculator.ans.value;

    // Reemplazar () con (*) para manejar la multiplicación implícita
    input = input.replace(/\(/g, '(').replace(/\)/g, ')');
    input = input.replace(/([a-zA-Z])([a-zA-Z])/g, '$1*$2'); // Agregar operador de multiplicación implícito entre variables

    try {
        // Reemplazar variables con sus valores correspondientes
        input = input.replace(/[WXYZ]/g, match => variables[match] !== null ? variables[match] : '0');

        // Convertir la expresión en una serie de tokens (operadores y operandos)
        let tokens = input.match(/(\d+(\.\d+)?|[\+\-\*\/\(\)])|[a-zA-Z]+/g); // Expresión regular actualizada

        console.log("Tokens:", tokens);

        if (!tokens) return; // Si no hay tokens, no hay nada que calcular

        // Crear una pila para operandos y otra para operadores
        let operandStack = [];
        let operatorStack = [];

        // Función para evaluar la jerarquía de los operadores
        const precedence = (op) => {
            switch (op) {
                case '+':
                case '-':
                    return 1;
                case '*':
                case '/':
                    return 2;
                case '**':
                case '//':
                    return 3;
                default:
                    return 0;
            }
        };

        // Iterar sobre cada token de la expresión
        tokens.forEach((token, index) => {
            if (token.match(/\d+(\.\d+)?/)) { // Si es un número
                operandStack.push(parseFloat(token)); // Añadirlo a la pila de operandos
            } else if (token === '(') { // Si es un paréntesis de apertura
                // Asegurar que haya un operador explícito antes del '(' si hay un número precedente
                if (index > 0 && tokens[index - 1].match(/\d+(\.\d+)?|\)/)) {
                    operatorStack.push('*'); // Agregar operador de multiplicación implícito
                }
                operatorStack.push(token); // Añadirlo a la pila de operadores
            } else if (token === ')') { // Si es un paréntesis de cierre
                // Resolver todas las operaciones dentro del paréntesis
                while (operatorStack.length > 0 && operatorStack[operatorStack.length - 1] !== '(') {
                    evaluateOperation(); // Evaluar la operación
                }
                operatorStack.pop(); // Eliminar el '(' de la pila de operadores
            } else if (token === '*') { // Si es un operador de multiplicación
                // Manejar la multiplicación dentro de los paréntesis
                if (index > 0 && index < tokens.length - 1 && tokens[index - 1] === ')' && tokens[index + 1] === '(') {
                    operatorStack.push(token); // Agregar operador de multiplicación regular
                } else { // Si es una multiplicación regular
                    // Asegurar que haya un operador explícito antes de la multiplicación si hay un número precedente
                    if (index > 0 && tokens[index - 1].match(/\d+(\.\d+)?|\)/)) {
                        operatorStack.push('*'); // Agregar operador de multiplicación implícito
                    }
                    operatorStack.push(token); // Añadir el operador actual a la pila de operadores
                }
            } else { // Si es un operador diferente
                // Asegurar que haya un operador explícito antes del '(' o después de un número
                if (token === '(' && index > 0 && tokens[index - 1].match(/\d+(\.\d+)?|\)/)) {
                    operatorStack.push('*'); // Agregar operador de multiplicación implícito
                }
                // Mientras haya operadores con igual o mayor precedencia en la pila de operadores, evaluar
                while (operatorStack.length > 0 && precedence(operatorStack[operatorStack.length - 1]) >= precedence(token)) {
                    evaluateOperation(); // Evaluar la operación
                }
                operatorStack.push(token); // Añadir el operador actual a la pila de operadores
            }
        });

        // Evaluar las operaciones restantes en la pila de operadores
        while (operatorStack.length > 0) {
            evaluateOperation(); // Evaluar la operación
        }

        console.log("Operand Stack:", operandStack);

        if (operandStack.length === 1) {
            let result = operandStack[0];
            document.calculator.ans.value = result; // Mostrar el resultado
        } else {
            document.calculator.ans.value = 'Error'; // Mostrar 'Error' si no se puede evaluar la expresión
        }
        
        // Función para evaluar una operación
        function evaluateOperation() {
            let operator = operatorStack.pop(); // Sacar el último operador de la pila
            let operand2 = operandStack.pop(); // Sacar el segundo operando de la pila
            let operand1 = operandStack.pop(); // Sacar el primer operando de la pila
        
            console.log("Operation:", operand1, operator, operand2);
        
            // Realizar la operación correspondiente y poner el resultado en la pila de operandos
            switch (operator) {
                case '+':
                    operandStack.push(operand1 + operand2);
                    break;
                case '-':
                    operandStack.push(operand1 - operand2);
                    break;
                case '*':
                    operandStack.push(operand1 * operand2);
                    break;
                case '/':
                    if (operand2 === 0) throw new Error('Division by zero');
                    operandStack.push(operand1 / operand2);
                    break;
                case '**':
                    operandStack.push(Math.pow(operand1, operand2));
                    break;
                case '//':
                    if (operand2 === 0) throw new Error('Division by zero');
                    operandStack.push(Math.floor(operand1 / operand2));
                    break;
            }
        }
    } catch (error){
        document.calculator.ans.value = 'Error'; // Mostrar 'Error' si hay una excepción
    }
}
