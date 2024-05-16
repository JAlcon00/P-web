import re

def calcular_expresion(expresion):
    pila = []
    # Dividir la expresión en tokens usando expresiones regulares
    tokens = re.findall(r'\d+\.?\d*|[a-zA-Z]+|\(|\)|\+|\-|\*|\/|\^', expresion)
    print("Tokens:", tokens)
    
    for token in tokens:
        if re.match(r'\d+\.?\d*', token):  # Si es un número
            pila.append(float(token))
        elif re.match(r'[a-zA-Z]+', token):  # Si es un literal alfanumérico
            pila.append(token)
        else:  # Si es un operador
            if len(pila) < 2:  # Verificar si hay suficientes operandos
                raise ValueError("Faltan operandos para el operador: {}".format(token))
            operando2 = pila.pop()
            operando1 = pila.pop()
            pila.append(realizar_operacion(token, operando1, operando2))
    
    if len(pila) != 1:
        raise ValueError("La expresión no está bien formada")
    
    return pila[0]

def precedencia(operador):
    if operador == '+' or operador == '-':
        return 1
    elif operador == '*' or operador == '/':
        return 2
    elif operador == '^':
        return 3
    else:
        return 0

def realizar_operacion(operador, op1, op2):
    if operador == '+':
        return op1 + op2
    elif operador == '-':
        return op1 - op2
    elif operador == '*':
        return op1 * op2
    elif operador == '/':
        return op1 / op2
    elif operador == '^':
        return op1 ** op2
    elif isinstance(op1, str) or isinstance(op2, str):
        raise ValueError("Operandos no numéricos: {}, {}".format(op1, op2))
    else:
        raise ValueError("Operador desconocido: {}".format(operador))


# Ejemplo de uso
expresion = input("Ingrese la expresión a calcular: ")
resultado = calcular_expresion(expresion)
print("El resultado es:", resultado)
