//create a class that we can use to modify the numbers and and operations visible in the display of calculator

class Calculator{
    constructor(previousOperandText,currentOperandText){
        this.previousOperandText = previousOperandText;
        this.currentOperandText = currentOperandText;
        
        this.clear();   // this will clear the screen everytime we create a new calculator
    }

    clear(){
        //this function is going to clear everything from display
        this.previousOperand = "";
        this.currentOperand = "";
        this.operation = "";
    }

    delete(){
        //delete a single number or decimal from the display
        this.currentOperand = this.currentOperand.toString().slice(0,-1);
    }
    
    appendNumber(number) {
        
        if(number ==='.' && this.currentOperand.includes('.')){return}
        this.currentOperand = this.currentOperand.toString() + number.toString();

    }

    chooseOperation(operation) {
        
        if(this.currentOperand == ""){return}       // this will stop the operation from executing when there is no value inside currentoperand section

        if(this.previousOperand != ''){
            this.compute();
        }
        this.operation = operation;                  // the clicked operation is selected by this function
        this.previousOperand = this.currentOperand;  // once an operation is clicked the values in currentOperand moves to previousoperand
        this.currentOperand = '';                    // once the values is moved to prevoperand we will clear the currentoperand area 
    }

    compute() {
        
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);

        if(isNaN(prev) || isNaN(current)){return}

        switch(this.operation){
            case '+': computation = prev + current;
            break;
            case '-': computation = prev-current;
            break;
            case '*': computation = prev*current;
            break;
            case '÷': computation = prev/current;
            break;
            default:
                return
        }
        this.currentOperand = computation;
        this.operarttion = undefined;
        this.previousOperand = '';
    }


    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigit = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
        if(isNaN(integerDigit)){integerDisplay = '';}
        else{integerDisplay = integerDigit.toLocaleString('en' , {maximumFractionDigits:0})}

        if(decimalDigits != null){ return `${integerDisplay}.${decimalDigits}` }
        else{return integerDisplay;}
    }


    updateDisplay() {
        

         this.currentOperandText.innerText = this.getDisplayNumber(this.currentOperand);   section

        if(this.operation != null){
            this.previousOperandText.innerText = 
            `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        }

    }
}





//Select all the buttons used in the calculator

const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandText = document.querySelector('[data-previous-operand]');
const currentOperandText = document.querySelector('[data-current-operand]');


// hook up all the variables and make them operate on the calculator object

const calculator = new Calculator(previousOperandText,currentOperandText);    // creates a new calculator 


numberButtons.forEach(button => {
    button.addEventListener('click' , function() {
       calculator.appendNumber(button.innerText);  // here we append the text inside the button to the calculator using appendNumber fn
       calculator.updateDisplay();                 // here we update the screen to display the number that is appended to the calculator
    })
})

// the below prcess will add the operator symbol to the calculator screen when clicked

operatorButtons.forEach(button => {
    button.addEventListener('click', function(){
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

// when we press the equals button the calculator should compute the values using compute function and the display thew value on the screen

equalsButton.addEventListener('click' , function() {
    calculator.compute();
    calculator.updateDisplay()
    calculator.previousOperandText.innerText = '';
})


allClearButton.addEventListener('click' , function() {
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', function() {
    calculator.delete();
    calculator.updateDisplay();
})