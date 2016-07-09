var inquirer = require("inquirer");
var Word = require("./word");
var game = require("./game");
var wordBank = game.wordBank;
var alphabet = game.alphabet;
var userGuess;
var remainingGuesses;
var currentAnswer;
var displayedAnswer = [];
var correctWord = [];
var incorrectGuesses = [];

currentAnswer = wordBank[(Math.floor(Math.random() * wordBank.length))];
remainingGuesses = currentAnswer.difficulty;
for(var i = 0; i < currentAnswer.word.length; i++){
	correctWord.push(currentAnswer.word[i]);
	displayedAnswer.push('_');
}

function display(){
	console.log(displayedAnswer.toString().replace(/,/g, ' ') + '\r\n');
	console.log("Already Guessed: " + incorrectGuesses.toString() + '\r\n');
	console.log("Remaining Guesses: " + remainingGuesses + '\r\n');
}

function prompt(){
	display();
	var isCorrectGuess = false;
	inquirer.prompt([
		{
			type: "input",
			message: "Guess a letter.",
			name: "userInput"
		}
	]).then(function(guess){
		userGuess = guess.userInput;
		if(alphabet.indexOf(userGuess) != -1){
			for(var i = 0; i < correctWord.length; i++){
				var tempCorrect = false;
				if(userGuess == correctWord[i]){
					isCorrectGuess = true;
					tempCorrect = true;
				}
				if(tempCorrect == true){
					displayedAnswer[i] = correctWord[i];
				}
			}
			if(isCorrectGuess == false){
				remainingGuesses--;
				incorrectGuesses = incorrectGuesses + userGuess;
			}
			if(remainingGuesses == 0){
				console.log("You lose!");
				console.log("The answer was: " + correctWord.toString().replace(/,/g, ''));
			}
			else if(displayedAnswer.indexOf('_') < 0){
				console.log("You win!")
				console.log("The answer was: " + correctWord.toString().replace(/,/g, ''));
			}
			else{
				prompt();
			}
		}
	});
}

console.log("United States Presidents Hangman!");
console.log("---------------------------------");
console.log("Hint: " + currentAnswer.hint + '\r\n');
prompt();