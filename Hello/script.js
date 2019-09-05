function getHistory(){
    return document.getElementById("history-value").innerText;
}


function printHistory(num){
    document.getElementById("history-value").innerText=num;
}

function getOutput(){
    return document.getElementById("output-value").innerText;
}

function printOutput(num){
    // allows you to clear the calculator
    if(num==""){
        document.getElementById("output-value").innerHTML=num;
    } else {
         document.getElementById("output-value").innerText=getFormattedNumber(num);
    }
   
}

// this functions allows the numbers to be formatted with (,) for better readability
function getFormattedNumber(num){
    // when you click backspace on a number it shows NaN, so to fix this you do this...
    if(num==""){
        return "";
    }
    var n = Number(num);
    var value = n.toLocaleString("en");
    return value;
}

// Reverse number (to manipulate output value back to original number with commas)
function reverseNumberFormat(num) {
    return Number(num.replace(/,/g,''));
}

// Operations of the calculator using for each loops
var operator = document.getElementsByClassName("operator");

// using foreach loop to create a alert that pops up when you click an operator
for(var i=0; i<operator.length; i++){
    operator[i].addEventListener('click', function(){
       // alert("The operator clicked:"+this.id);

       //clear button
       if(this.id=="clear"){
           printHistory("");
           printOutput("");
       }

       //backspace button
      else if(this.id=="backspace"){
           var output=reverseNumberFormat(getOutput()).toString(); // convert to string format so you can backspace
           if(output){ //if output has a value
            output=output.substr(0, output.length-1);
            printOutput(output);
           }
       } 
       else {
           var output=getOutput();
           var history=getHistory();
           // condition if you click on multiple operators
           if(output==""&&history!=""){
               if(isNaN(history[history.length-1])){
                   history=history.substr(0,history.length-1); //remove last character using substring function
               }
           }
           if(output!="" || history!=""){ //if output is not empty   or if history is not empty
               //condition? true:false
               output=output==""?
               output:reverseNumberFormat(output);
               //adding output to the history
               history=history+output;
               // if user clicks on the equal sign
               if(this.id=="="){
                   var result=eval(history);
                    printOutput(result);
                    printHistory("");
               }
               else {
                history=history+this.id;
                printHistory(history);
                printOutput("");
               }
           }
       }

    })
}

//same for numbers
var number = document.getElementsByClassName("number");
for(var i=0; i<number.length; i++){
    number[i].addEventListener('click', function(){
      //  alert("The Nummber clicked:"+this.id);

      // if output is a number, the number gets concatinated together
        var output=reverseNumberFormat(getOutput());
        if(output!=NaN){ //if output is a number 
            output=output+this.id;
            printOutput(output);
        }
    })
}