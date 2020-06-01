var userClickedPattern = [];
var gamePattern = [];
var buttonColors = ["green","red","yellow","blue"];
var level=1;
var points = level - 1;
var started = false;
var highScore = points;
$(document).on("keydown",function() {
	if(started === false)
	{
		started = true;	
		nextSequence();
	}
});

function nextSequence() {
	userClickedPattern = [];
	var randomNumber = Math.floor(Math.random()*4);
	var randomChosenColor = buttonColors[randomNumber];
	gamePattern.push(randomChosenColor);
	$("#level-title").html("Level "+level);
	$("#point").html("Points = "+points);
	$("#highscore").html("HighScore = "+highScore);
	$("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
	playSound(randomChosenColor);	
	level = level + 1;
}

$(".btn").on("click",function() {
	var userChosenColor = $(this).attr("id");
	animatePress(userChosenColor);
	userClickedPattern.push(userChosenColor);
	playSound(userChosenColor);
	var x = userClickedPattern.length - 1;
	//console.log(x);
	checkAnswer(x);
	console.log(userClickedPattern);
});
function playSound(name) {
	var audio = new Audio("sounds/"+name+".mp3");
	audio.play();
}
function checkAnswer(currentLevl) {
	if(userClickedPattern[currentLevl]===gamePattern[currentLevl])
	{
		points++;
		if (userClickedPattern.length===gamePattern.length) 
		{
			setTimeout(function() {
				nextSequence();
			},1000);
		}
	}
	else
	{
		playSound("wrong");
		$("body").addClass("game-over");
		setTimeout(function() {
			$("body").removeClass("game-over");
		},200);
		$("#level-title").html("Game Over, Press Any key to Restart");
		$("#point").html("Points = "+points);
		startOver();
	}
}
function animatePress(currentColour) {
	$("#"+currentColour).addClass("pressed");
	setTimeout(function() {
		$("#"+currentColour).removeClass("pressed");
	},100);
}
function startOver() {
	if(points>highScore)
	{
		highScore = points;
	}

	$("#highscore").html("HighScore = "+highScore);	
	level = 1;
	points = 0;
	gamePattern = [];
	started = false;
	
}

