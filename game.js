
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var started = false;

var longpress = 800;
var start;
var timer;

$(document).keypress(function () {
    start();
});


$("#level-title").on('mousedown', function (e) {
    startTime = new Date().getTime();
    timer = setTimeout(function () {
        window.location.href = "howToPlay.html";
    }, longpress)
}).on('mouseleave', function (e) {
    startTime = 0;
    clearTimeout(timer);
}).on('mouseup', function (e) {
    if (new Date().getTime() < (startTime + longpress)) {
        clearTimeout(timer);
        start();
    }
});


$(".btn").click(function () {

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}


function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNuber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNuber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass('pressed');
    }, 100);
}

function playSound(userChosenColour) {
    new Audio("sounds/" + userChosenColour + ".mp3").play();
}


function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}

function start() {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
}