// Variables para almacenar los valores de las variables W, X, Y & Z
let variables = {
    'W': null,
    'X': null,
    'Y': null,
    'Z': null
};

// Función para manejar la entrada del teclado
function handleKeyPress(event) {
    const key = event.key;

    // Lista de teclas permitidas
    const allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '*', '/', '^', '(', ')', '.', 'Enter', 'Backspace', 'Delete'];

    if (allowedKeys.includes(key)) {
        switch (key) {
            case 'Enter':
                calculate();
                break;
            case 'Backspace':
                backspace();
                break;
            case 'Delete':
                clearInput();
                break;
            default:
                addToInput(key);
                break;
        }
    }
}

// Añadir el evento de escucha para las teclas presionadas
document.addEventListener('keydown', handleKeyPress);

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

// Función para eliminar el último carácter de la entrada de la calculadora
function backspace() {
    var input = document.calculator.ans.value;
    document.calculator.ans.value = input.substring(0, input.length - 1);
}

// Función para simplificar expresiones algebraicas
function simplifyExpression(expression) {
    // Simplificar sumas del tipo x + x a 2x
    expression = expression.replace(/([a-zA-Z])\s*\+\s*\1/g, '2$1');
    // Simplificar multiplicaciones del tipo x * x a x^2
    expression = expression.replace(/([a-zA-Z])\s*\*\s*\1/g, '$1^2');
    return expression;
}

// Función para manejar números negativos correctamente
function handleNegatives(expression) {
    // Manejar casos específicos donde un negativo sigue a un operador de multiplicación/división o paréntesis de apertura
    expression = expression.replace(/(\*|\/|\()-(\d+(\.\d+)?)/g, '$1(0-$2)');
    // Manejar negativos al inicio de la expresión o después de otros operadores
    expression = expression.replace(/(^|[\+\-\*\/\(\^])-(\d+(\.\d+)?)/g, '$1(0-$2)');
    return expression;
}

// Función para manejar multiplicaciones implícitas
function handleImplicitMultiplication(expression) {
    // Añadir el operador de multiplicación implícita
    expression = expression.replace(/(\d|\))\s*(\()/g, '$1*$2');
    expression = expression.replace(/(\))\s*(\d|\()/g, '$1*$2');
    return expression;
}

// Función para calcular el resultado de la expresión matemática ingresada
function calculate() {
    let input = document.calculator.ans.value.trim();

    // Verificar si la entrada está vacía
    if (!input) {
        document.calculator.ans.value = 'Error: Input is empty';
        return;
    }

    // Reemplazar variables con sus valores correspondientes y validar variables no definidas
    input = input.replace(/[wxyzWXYZ]/g, match => {
        if (variables[match.toUpperCase()] === null) {
            document.calculator.ans.value = `Error: Variable ${match.toUpperCase()} not set`;
            throw new Error(`Variable ${match.toUpperCase()} not set`);
        }
        return variables[match.toUpperCase()];
    });

    // Simplificar la expresión algebraica
    input = simplifyExpression(input);

    // Manejar números negativos
    input = handleNegatives(input);

    // Manejar multiplicaciones implícitas
    input = handleImplicitMultiplication(input);

    try {
        // Convertir la expresión en una serie de tokens (operadores y operandos)
        let tokens = input.match(/(\d+(\.\d+)?|[\^\+\-\*\/\(\)]|\*\*|\/\/|[a-zA-Z]+)/g);
        console.log("Tokens:", tokens);

        if (!tokens) {
            document.calculator.ans.value = 'Error: Invalid input';
            return;
        }

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
                case '^':
                    return 3;
                default:
                    return 0;
            }
        };

        // Función para evaluar una operación
        function evaluateOperation() {
            if (operandStack.length < 2) {
                throw new Error('Invalid expression');
            }

            let operator = operatorStack.pop();
            let operand2 = operandStack.pop();
            let operand1 = operandStack.pop();

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
                case '^':
                    operandStack.push(Math.pow(operand1, operand2));
                    break;
                case '//':
                    if (operand2 === 0) throw new Error('Division by zero');
                    operandStack.push(Math.floor(operand1 / operand2));
                    break;
            }
        }

        // Iterar sobre cada token de la expresión
        tokens.forEach((token, index) => {
            if (token.match(/\d+(\.\d+)?/)) { // Si es un número
                operandStack.push(parseFloat(token)); // Añadirlo a la pila de operandos
                // Asegurar multiplicación implícita antes del número si es necesario
                if (index > 0 && tokens[index - 1] === ')') {
                    operatorStack.push('*');
                }
            } else if (token === '(') { // Si es un paréntesis de apertura
                // Asegurar multiplicación implícita antes del '(' si es necesario
                if (index > 0 && (tokens[index - 1].match(/\d+(\.\d+)?|\)/) || tokens[index - 1].match(/[a-zA-Z]/))) {
                    operatorStack.push('*');
                }
                operatorStack.push(token); // Añadirlo a la pila de operadores
            } else if (token === ')') { // Si es un paréntesis de cierre
                // Resolver todas las operaciones dentro del paréntesis
                while (operatorStack.length > 0 && operatorStack[operatorStack.length - 1] !== '(') {
                    evaluateOperation(); // Evaluar la operación
                }
                operatorStack.pop(); // Eliminar el '(' de la pila de operadores
                // Asegurar multiplicación implícita después del ')' si es necesario
                if (index < tokens.length - 1 && (tokens[index + 1].match(/\d+(\.\d+)?|\(/) || tokens[index + 1].match(/[a-zA-Z]/))) {
                    operatorStack.push('*');
                }
            } else if (token.match(/[a-zA-Z]/)) { // Si es una variable
                // Asegurar multiplicación implícita antes de la variable si es necesario
                if (index > 0 && (tokens[index - 1].match(/\d+(\.\d+)?|\)/) || tokens[index - 1] === ')')) {
                    operatorStack.push('*');
                }
                operandStack.push(variables[token.toUpperCase()]); // Añadir la variable a la pila de operandos
            } else { // Si es un operador
                // Asegurar multiplicación implícita antes del '(' si es necesario
                if (token === '(' && index > 0 && (tokens[index - 1].match(/\d+(\.\d+)?|\)/) || tokens[index - 1].match(/[a-zA-Z]/))) {
                    operatorStack.push('*');
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

        if (operandStack.length === 1) {
            document.calculator.ans.value = operandStack[0]; // Mostrar el resultado
        } else {
            document.calculator.ans.value = 'Error: Invalid expression'; // Mostrar 'Error' si no se puede evaluar la expresión
        }
    } catch (error) {
        document.calculator.ans.value = `Error: ${error.message}`; // Mostrar 'Error' si hay una excepción
    }
}
