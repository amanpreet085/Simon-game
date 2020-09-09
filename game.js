//console.log($("h1"));
var userClickedPattern = [];

var gamePattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];
//console.log(buttonColours);

var keyPresses = 0;

var level = 0;

var buttonClicked = 0;

function nextSequence() {
  level++;
  displayTitle(level);
  var randomNumber =  Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).animate({opacity:0.2},50).animate({opacity:1},50);
  playSound(randomChosenColour);
  userClickedPattern=[];
  buttonClicked=0;
}
//console.log(nextSequence());

function playSound(name){
  var soundToPlay = "sounds/"+name+".mp3";
  var audio = new Audio(soundToPlay);
  audio.play();
}



//id of the button that was clicked
$(".btn").click(function (event) {
  //console.log(event.target.id);
  buttonClicked++;
  var userChosenColour = event.target.id;
  userClickedPattern.push(userChosenColour);
  $("#"+event.target.id).animate({opacity:0.2},50).animate({opacity:1},50);
  playSound(event.target.id);
  animatePress(userChosenColour);
  isPlayerCorrect(buttonClicked);
})

/*
Logic for checking user pattern dynamically

whenever button clicked

  ++ buttonclicked
  check userClickedPattern[buttonclicked] == gamePattern[buttonclicked]
    if true and buttonclicked = gamePattern.length
      then nextSequence
      otherwise wait for next click
    else
      then end game

*/

function isPlayerCorrect(btnClicked) {
  console.log("user pattern "+userClickedPattern);
  console.log("game pattern "+gamePattern);

  if (JSON.stringify(gamePattern.slice(0,btnClicked))==JSON.stringify(userClickedPattern.slice(0,btnClicked))) {
    if (btnClicked == gamePattern.length) {
      console.log("matched pattern, calling next sequence");
      setTimeout(function () {
        nextSequence();
      },2000)
    } else {
      console.log("pattern matches so far, waiting for user to complete pattern");
    }
  } else {
    console.log("game over");
    gameOver();
  }

  // if player is Correct
      // then next sequence
  // if not Correct
      // display gameover and refresh page
  // console.log(JSON.stringify(gamePattern)==JSON.stringify(userClickedPattern));

/*
  if (JSON.stringify(gamePattern)==JSON.stringify(userClickedPattern)) {
    console.log("user Correct");
    setTimeout(function () {
      nextSequence();
    },1000)

  } else {
    console.log("game over");
  }

  */
}

// this is where the game starts
document.addEventListener("keypress",function () {
  keyPresses = keyPresses+1;

  if (keyPresses==1) {
    level=-1;
    nextSequence();
  }
  //console.log(keyPresses);
})

function gameOver() {
  $("h1").text("Game Over.... game will restart in a second");
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  },200)
  setTimeout(function () {
    location.reload();
  },2000)
}


function animatePress(currentColour) {
  $("#"+currentColour).addClass("pressed");
  setTimeout(function () {
    $("#"+currentColour).removeClass("pressed");
  },100)
}

function displayTitle(title) {
  $("#level-title").text("Level "+title);
}
