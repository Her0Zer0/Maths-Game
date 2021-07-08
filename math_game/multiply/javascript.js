var playing = false;
var score;
var action;
var timeremaining;
var correctAnswer;

//if we click on the start/reset button
document.getElementById("startReset").onclick = function(){
        //if we are playing
    if(playing == true){
        
        location.reload(); //reloading page
        
    }else{//2.if we are not playing 
        //change mode to playing
        playing = true;
        
        //hide game over if we have played once already
        hide("gameOver");
        
        //set score to 0
        score = 0;
        
        document.getElementById("scorevalue").innerHTML = score;
        
        //show countdown box
        show("timeremaining");
        //set the time on the time block
                timeremaining = 120;
        document.getElementById("timevalue").innerHTML = timeremaining;
        
        //change button to reset
        document.getElementById("startReset").innerHTML = "Reset Game";
        
        //start Countdown
        
        startCountdown();
        
        //generate questions and answers
        
        generateQA();
        
    };
}
                

for(j = 1; j < 5; j++){
    document.getElementById("box" + j).onclick = function(){
    //check if playing
    if(playing == true){//yes
        
        if(this.innerHTML == correctAnswer){
            //correct answer
            
            //increase score and update score box
            score ++;
            document.getElementById("scorevalue").innerHTML = score;
            
            //hide wrong box and show correct
            hide("wrong");
            show("correct");
            setInterval(function(){
                hide("correct");
            },1000);
            //generate another question
            
            generateQA();
            
        }else{
            //wrong answer
            hide("correct");
            show("wrong");
            setInterval(function(){
                hide("wrong");
            },1000);
        };
        
    };
}
}

//functions

//start counter
function startCountdown(){
    
    action = setInterval(function(){
        timeremaining -= 1;
        document.getElementById("timevalue").innerHTML = timeremaining;
        
        if(timeremaining == 0){//gameover
            stopCountdown();
            //show game over box
            show("gameOver");
            //display game over message
            document.getElementById("gameOver").innerHTML = "<p>Time Is Up!</p><p>Your score is " + score + "</p>";
            //hide timer box
            hide("timeremaining");
            hide("correct");
            hide("wrong");
            playing = false;
            document.getElementById("startReset").innerHTML = "Start Game";           
        }
    },1000);
}

//stop counter
function stopCountdown(){
    clearInterval(action);
}

//hides a certain element
function hide(id){
    document.getElementById(id).style.display = 'none';
}

//show a certian element
function show(id){
    document.getElementById(id).style.display = 'block';
}

function generateQA(){
    var x = 1 + Math.round(Math.random() * 9);   
    var y = 1 + Math.round(Math.random() * 9);   
    correctAnswer = x * y;   
    
    document.getElementById("question").innerHTML = x + "x" + y;
    
    var correctPosition = 1 + Math.round(Math.random() * 3);
    
    document.getElementById("box" + correctPosition).innerHTML = correctAnswer; // fill one box with the correct answer. 
    
    //fill the other boxes with wrong answers
    
    var answers = [correctAnswer];
    
    for(i=1; i < 5; i++){
        if(i != correctPosition){
            var wrongAnswer;

            do{
            wrongAnswer = (1 + Math.round(Math.random() * 9)) * (1 + Math.round(Math.random() * 9));//a wrong answer 
            }while(answers.indexOf(wrongAnswer)> -1)
            
            document.getElementById("box" + i).innerHTML = wrongAnswer;
            
                    answers.push(wrongAnswer);
        }
    }    
}