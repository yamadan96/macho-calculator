class Calculator {
    constructor(previousOperandElement, currentOperandElement) {
        this.previousOperandElement = previousOperandElement;
        this.currentOperandElement = currentOperandElement;
        this.clear();
    }

    clear() {
        this.currentOperand = "0";
        this.previousOperand = "";
        this.operation = undefined;
    }

    delete() {
        if (this.currentOperand === "0") return;
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
        if (this.currentOperand === "") this.currentOperand = "0";
    }

    appendNumber(number) {
        if (number === "." && this.currentOperand.includes(".")) return;
        if (this.currentOperand === "0" && number !== ".") {
            this.currentOperand = number.toString();
        } else {
            this.currentOperand = this.currentOperand.toString() + number.toString();
        }
    }

    chooseOperation(operation) {
        if (this.currentOperand === "0") return;
        if (this.previousOperand !== "") {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = "0";
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;
        switch (this.operation) {
            case "+":
                computation = prev + current;
                break;
            case "-":
                computation = prev - current;
                break;
            case "×":
                computation = prev * current;
                break;
            case "÷":
                computation = prev / current;
                break;
            default:
                return;
        }
        this.currentOperand = computation.toString();
        this.operation = undefined;
        this.previousOperand = "";
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split(".")[0]);
        const decimalDigits = stringNumber.split(".")[1];
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = "0";
        } else {
            integerDisplay = integerDigits.toLocaleString("ja-JP", {
                maximumFractionDigits: 0
            });
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    updateDisplay() {
        this.currentOperandElement.innerText = this.getDisplayNumber(this.currentOperand);
        if (this.operation != null) {
            this.previousOperandElement.innerText =
                `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        } else {
            this.previousOperandElement.innerText = "";
        }
    }

    // かわいいエフェクトを追加
    addButtonAnimation(button) {
        button.classList.add("pressed");
        setTimeout(() => {
            button.classList.remove("pressed");
        }, 100);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const previousOperandElement = document.querySelector(".previous-operand");
    const currentOperandElement = document.querySelector(".current-operand");
    const numberButtons = document.querySelectorAll(".number");
    const operationButtons = document.querySelectorAll(".operator");
    const equalsButton = document.querySelector(".equals");
    const deleteButton = document.querySelector(".delete");
    const clearButton = document.querySelector(".clear");
    const decimalButton = document.querySelector(".decimal");

    const calculator = new Calculator(previousOperandElement, currentOperandElement);

    // 初期表示を更新
    calculator.updateDisplay();

    numberButtons.forEach(button => {
        button.addEventListener("click", () => {
            calculator.appendNumber(button.innerText);
            calculator.updateDisplay();
            calculator.addButtonAnimation(button);
        });
    });

    operationButtons.forEach(button => {
        button.addEventListener("click", () => {
            calculator.chooseOperation(button.innerText);
            calculator.updateDisplay();
            calculator.addButtonAnimation(button);
        });
    });

    equalsButton.addEventListener("click", () => {
        calculator.compute();
        calculator.updateDisplay();
        calculator.addButtonAnimation(equalsButton);
    });

    clearButton.addEventListener("click", () => {
        calculator.clear();
        calculator.updateDisplay();
        calculator.addButtonAnimation(clearButton);
    });

    deleteButton.addEventListener("click", () => {
        calculator.delete();
        calculator.updateDisplay();
        calculator.addButtonAnimation(deleteButton);
    });

    decimalButton.addEventListener("click", () => {
        calculator.appendNumber(".");
        calculator.updateDisplay();
        calculator.addButtonAnimation(decimalButton);
    });

    // キーボード入力のサポート
    document.addEventListener("keydown", e => {
        if (e.key >= "0" && e.key <= "9") {
            const button = Array.from(numberButtons).find(btn => btn.innerText === e.key);
            if (button) {
                calculator.appendNumber(e.key);
                calculator.updateDisplay();
                calculator.addButtonAnimation(button);
            }
        } else if (e.key === ".") {
            calculator.appendNumber(".");
            calculator.updateDisplay();
            calculator.addButtonAnimation(decimalButton);
        } else if (e.key === "+" || e.key === "-") {
            const button = Array.from(operationButtons).find(btn => btn.innerText === e.key);
            if (button) {
                calculator.chooseOperation(e.key);
                calculator.updateDisplay();
                calculator.addButtonAnimation(button);
            }
        } else if (e.key === "*") {
            const button = Array.from(operationButtons).find(btn => btn.innerText === "×");
            if (button) {
                calculator.chooseOperation("×");
                calculator.updateDisplay();
                calculator.addButtonAnimation(button);
            }
        } else if (e.key === "/") {
            const button = Array.from(operationButtons).find(btn => btn.innerText === "÷");
            if (button) {
                calculator.chooseOperation("÷");
                calculator.updateDisplay();
                calculator.addButtonAnimation(button);
            }
        } else if (e.key === "Enter" || e.key === "=") {
            calculator.compute();
            calculator.updateDisplay();
            calculator.addButtonAnimation(equalsButton);
        } else if (e.key === "Backspace") {
            calculator.delete();
            calculator.updateDisplay();
            calculator.addButtonAnimation(deleteButton);
        } else if (e.key === "Escape") {
            calculator.clear();
            calculator.updateDisplay();
            calculator.addButtonAnimation(clearButton);
        }
    });
});
