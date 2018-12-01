var words = [
  ["3", "d", "h", "u", "b", "s"],
  ["m","a","r","v","i","n"],
  ["p","r","i","n","t"],
  ["f","i","l","a","m","e","n","t"],
  ["o","r","d","e","r"],
  ["l","a","y","e","r"]
]; // Array to store word dictionary 
var random = Math.floor((Math.random()*(words.length-1)));
var guessWord = words[random]; // The word to guess will be chosen randomly from the array above
var currentWord = new Array(guessWord.length); //Initialising 'current word' which will be the user facing instance of the word. 
var error = 0;
var maxError = 5; // Number of life given to any player

// every letter in the word is symbolized by an underscore in the guessfield in the first instance
for (var i = 0; i < currentWord.length; i++){
	currentWord[i] = "_ ";
}

// prints the guessfield
function printcurrentWord(){
	for (var i = 0; i < currentWord.length; i++){
		var word = document.getElementById("word");
		var alphabet = document.createTextNode(currentWord[i]);
		word.appendChild(alphabet);
	}
}

// checks if the the letter provided by the user matches one or more of the letters in the word
var checkLetter = function(){
	var lifeGone = true; // boolean to check whether player's life is gone or not
	var match = false; // boolean to check whether a match to word is found or not
	var wrongLetter = document.getElementById("wrongLetter");
	
	var character = document.getElementById("insertLetter").value; // the letter provided by the user
	character = character.toLowerCase();
	for (var i = 0; i < guessWord.length; i++){
		if(guessWord[i] === character){
			currentWord[i] = character + " ";
			match = true;
		}
	}
	document.getElementById("insertLetter").value = '';
	
	var word = document.getElementById("word");
	word.innerHTML=""; //deletes the current word
	printcurrentWord(); //replacing with new current word

	if(!match && typeof wrongLetter != "undefined") {
		var alreadyWrongLetters = wrongLetter.textContent.split(" ");
		for (var i = 0; i < alreadyWrongLetters.length; i++){
			if (character === alreadyWrongLetters[i]) {
				lifeGone = false; //false letter already entered by user before. So no need to deduct a life
			}
		}
	}

	// if entered letter is not in the word, letter will be put on the "wrong letters" list
	if(!match && lifeGone){
		var alphabet = document.createTextNode(" " + character);
		wrongLetter.appendChild(alphabet);
		error++; // keeps the count of error a player makes
		
		// logic to show cracked image when the guess is wrong -other wise- hit is false
		var divs = document.getElementsByClassName("status");
		for (var i=0; i<= maxError; i++) {
			if( i != error) {
				divs[i].style.display = 'none'; // Hide all divs other than one that matches the error step
			}
			else {
				divs[i].style.display = 'block'; // Show the div that corresponds to current error state
			}
		}
	}

	//checks if all letters have been found
	var done = true;
	for (var i = 0; i < currentWord.length; i++){
		if(currentWord[i] === "_ "){
			done = false;
		}
	}
	
	if(done){ // if player succeeds
		document.getElementById("mylives").innerHTML = "You saved 3D hubs :)";
		document.getElementById("guessButton").style.display = 'none';
		document.getElementById("insertLetter").style.display = 'none';
	}

	if(error === maxError){ //Checks player used all his life or not
		document.getElementById("mylives").innerHTML = "Sorry your 3D product came out cracked. Please try again";
		document.getElementById("guessButton").style.display = 'none';
		document.getElementById("insertLetter").style.display = 'none';
	}
}

function init(){
	printcurrentWord();
}

window.onload = init;