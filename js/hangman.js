// Variables
var selectedWord = "";
var selectedHint = "";
var board = [];
var remainingGuesses = 6;
var words = [{word: "snake", hint: "It's a reptile."}, 
             {word: "monkey", hint: "It's a mammal."}, 
             {word: "beetle", hint: "It's an insect."}];
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
    selectedWord = words[randomInt].word.toUpperCase();
    selectedHint = words[randomInt].hint;
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

    for (var i=0; i < board.length; i++) {
        $("#word").append(board[i] + " ");
    }

    $("#word").append("<br />");
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

        //Check to see if this is a winning guess 
        if (!board.includes('_')) {
            endGame(true);
        }

    } else {
        remainingGuesses -=1;
        updateMan();
    }

    if (remainingGuesses <= 0) {
        endGame(false);
    }
}

// Creates letters inside the letters div tag
function createLetters() {
    for (var letter of alphabet) {
        $("#letters").append("<button class='letter' id='" + letter + "'>" + letter + "</button>");
    }
}

// Disables button and tells user if disabled 
function disableButton(btn) {
    btn.prop("disabled", true);
    btn.attr("class", "btn btn-danger");
}

// Ends game by hiding game divs and displaying win or loss messages
function endGame(win) {
    $("#letters").hide();

    if (win) {
        $('#won').show();
    }
    else {
        $('#lost').show();
    }
}

// jQuery Handlers
$(".letter").click(function(){
    checkLetter($(this).attr("id"));
    disableButton($(this));
});

$(".replayBtn").on("click", function(){
    location.reload();
});

$(".hintBtn").click(function(){
    $("#word").append("<span class='hint'>Hint: " + selectedHint + "</span");
    remainingGuesses -= 1;
    updateMan();
    $(".hintBtn").hide();
});