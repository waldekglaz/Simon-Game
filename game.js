let buttonColors = ['red', 'blue', 'green', 'yellow'];

let gamePattern = [];
let userClickedPattern = [];

let hasGameStarted = false;

let level = 0;
// Start the game by pressing any key 
$(document).on('keypress', function(){
    if(hasGameStarted === false){
        $('h1').text('Level ' + level);
        nextSequence();
        hasGameStarted = true;
    }
})

$('.btn').on('click', function(){
    let userChosenColor = $(this).attr('id')
    userClickedPattern.push(userChosenColor);
    animatePress(userChosenColor)
    playSound(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log('sucess');

        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000)
        }
    }else{
        playSound('wrong');
        $('body').addClass('game-over');
        setTimeout(function(){
            $('body').removeClass('game-over')
        }, 200);
        $('h1').text('Game Over, Press any key to Restart');
        hasGameStarted = false
        level = 0
        gamePattern = []
    }
}

function nextSequence(){
    // Resets user patern to 0
    userClickedPattern = []
    level++;
    $('h1').text('Level ' + level);

    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber]
    gamePattern.push(randomChosenColor)

    $('#' + randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

function playSound(name){
    var audio = new Audio('sounds/'+ name + '.mp3');
    audio.play()
}

function animatePress(currentColor){
    $('#' + currentColor).addClass('pressed');
    setTimeout(function(){
        $('#' + currentColor).removeClass('pressed')
    },100)
}



