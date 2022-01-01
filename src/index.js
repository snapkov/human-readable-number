let singleDigits = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
let digitsFrom10to19 = ["ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
let digitsFrom20to90 = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
let rankDigits = ["", "", " thousand", " million", " billion"];

module.exports = function toReadable (number) {
    let arrayByRank = [];
    let arrayLength = 0;
    let numberToWord = "";
    let rankIndex = 0;

    let numberString = number.toString();
    let numberLength = number.toString().length;
    while (numberLength%3 != 0) {
        numberString = "0" + numberString;
        numberLength++;
    }

    arrayByRank = numberString.match(/.{1,3}/g);
    arrayLength = arrayByRank.length;
    for (let i = 0; i < arrayLength; i++) {
        if (i > 0) {
            numberToWord += " ";
        }
        rankIndex = arrayLength - i;
        numberToWord += rankToWord(arrayByRank[i]) + rankDigits[rankIndex];    
    }

    return numberToWord;  
}

function rankToWord (rank) {
    let toWord = "";
    let arrayDigits = rank.split("");
    if (Number(rank) == 100) {
        return "one hundred";
    }
    if (Number(rank) < 10) {
        toWord += singleDigits[arrayDigits[2]];
        return toWord;
    }
    if (Number(arrayDigits[0]) > 0) {
        toWord += singleDigits[arrayDigits[0]] + " hundred";
    } 
    if (Number(arrayDigits[1] == 1)) {
        if (Number(arrayDigits[0]) == 0) {
            toWord += digitsFrom10to19[arrayDigits[2]];
        } else {
            toWord += " " + digitsFrom10to19[arrayDigits[2]];
        }
        return toWord;
    } else if (Number(arrayDigits[1] > 1)) {
        if (Number(arrayDigits[0]) == 0) {
            toWord += digitsFrom20to90[arrayDigits[1]];
        } else {
            toWord += " " + digitsFrom20to90[arrayDigits[1]];
        }
    } 
    if (Number(arrayDigits[2]) == 0) {
        return toWord;
    } else {
        toWord += " " + singleDigits[arrayDigits[2]];
    }  

    return toWord;
}
