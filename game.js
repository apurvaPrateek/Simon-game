var gamePattern = [];
var userClickedPattern = [];
var level = 0;

var buttonColours = ["red", "blue", "green", "yellow"];

var started = false;

$(document).keydown(function () {
  if(!started){
    $("h1").text("Level " + level);
    nextSequence();
    started=true;
  }
});

$(".btn").click(function (event) {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    console.log("success");
    if(userClickedPattern.length == gamePattern.length){
      setTimeout(() => {
        userClickedPattern = [];
        nextSequence();
      }, 1000);
    }
  }
  else{
    console.log("wrong");
    var audio = new Audio("./sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);

    $("h1").text("Game Over! Press any key to Restart");
    startOver();
  }
}

function playSound(name) {
  var audio = new Audio("./sounds/" + name + ".mp3");

  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}






  function nextSequence() {
    level++;
    $("h1").text("Level "+ level);
    randomNumber = Math.floor(4 * Math.random());
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    playSound(randomChosenColour);
    animatePress(randomChosenColour);
    console.log(gamePattern);
  }

  function startOver(){
    level=0;
    gamePattern=[];
    userClickedPattern=[];
    started=false;
  }

