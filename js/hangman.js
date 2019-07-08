// Variables
var selectedWord = "";
var selectedHint = "";
var board = [];
var remainingGuesses = 6;
var words = ["snake", "monkey", "beetle"];
var alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
                'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

// Listeners
window.onload = startGame();

// Functions
function startGame() {
    createLetters();
    pickWord();
    initBoard();
    updateBoard();
}

function pickWord() {
    var randomInt = Math.floor(Math.random() * words.length);
    selectedWord = words[randomInt].toUpperCase();
}

function initBoard() {
    for (var letter in selectedWord) {
            board.push("_");
    }
}

// Update current word, then update board
function updateWord(positions, letter) {
    for (var pos of positions) {
        board[pos] = letter;
    }
    updateBoard();
}

function updateBoard() {
    $("#word").empty();

    for (var letter of board) {
        document.getElementById("word").innerHTML += letter + " ";
    }
}

// Updates stick man image 
function updateMan() {
    $("#hangImg").attr("src", "img/stick_" + (6 - remainingGuesses) + ".png");
}

// Checks to see if selected letter exists in the selected word 
function checkLetter(letter) {
    var positions = new Array();

    for (var i = 0; i < selectedWord.length; i++) {
        if (letter == selectedWord[i]) {
            positions.push(i);
        }
    }

    if (positions.length > 0) {
        updateWord(positions, letter);
    } else {
        remainingGuesses -=1;
    }
}

// Creates letters inside the letters div tag
function createLetters() {
    for (var letter of alphabet) {
        $("#letters").append("<button class='letter' id='" + letter + "'>" + letter + "</button>");
    }
}

// jQuery Functions
$("#letterBtn").click(function(){
    var boxVal = $("#letterBox").val();
    console.log("You pressed the button and it had the value: " + boxVal);
})

$(".letter").click(function(){
    checkLetter($(this).attr("id"));
});
