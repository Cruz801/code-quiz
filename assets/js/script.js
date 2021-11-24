// array of questions

var questions = [
    {
        title: "What car manufacture made the Supra", // put question
        choices: ['Nissan', 'Toyota', 'Acura'], // put options
        answer: 'B'
    },
{
    title: "What year was the r32 Skyline 1st manufactured?",
    choices: ['1972', '1969', '1989'],
    answer: 'C'
},
{
    title: "What engine came in the MK4 Supra?",
    choices: ['rb26dett', '2jzgte', 'ka24e'],
    answer: 'B'
},
{
    title: "What was the last year the r34 Skyline manufactured?",
    choices: ['2002', '2010', '2004'],
    answer: 'A'
},
{
    title: "which car model is referred to as Godzilla?",
    choices: ['Supra', 'Skyline Gtr', 'Civiv'],
    answer: 'B'
},
];

// var declaration

var currentQuestionIndex = 0


var timeInterval = 6000
var questionsEl = document.getElementById("questions");
var choicesEl = document.getElementById("choices");
var timerEl = document.getElementById("timer");
var submitBtn = document.getElementById("submit");
var startBtn = document.getElementById("start");
var initialsEl = document.getElementById("initials");
var feedbackEl = document.getElementById("feedback")

// timer references

var time = questions.length * 15;
var timerId;

function startQuiz() {
    var startScreenEl = document.getElementById("start-screen");
    
    startScreenEl.setAttribute("class", "hide");
    startBtn.addEventListener("click",startQuiz)

    questionsEl.removeAttribute("class");

    timerId = setInterval(clockTick, 6000);

    timerEl.textContent = time;               
     getQuestion();                   


}

function getQuestion(){
    var currentQuestion = questions[currentQuestionIndex];

    var titleEl = document.getElementById("question-title");
    //titleEl.textContent = currentQuestion.title                    hh

    choicesEl.innerHTML = "";

    currentQuestionIndex.choices.forEach(function(choice, i) {
        var choiceNode = document.createElement("button");
        choiceNode.setAttribute("class", 'choice');
        choiceNode.setAttribute("value", choice);

        choiceNode.textContent = i + 1 + choice;

        choiceNode.onClick = questionsClick;

        choicesEl.appendChild(choiceNode);

    });

}


function questionsClick(){
    if (this.value !== questions[currentQuestionIndex]){
        time -= 10; //change penalty time

        if (time < 0){
             time = 0;
        }
        timerEl.textContent = time;
        feedbackEl.textContent = " wrong";

    }else {
        feedbackEl.textContent = "correct!";
    }

    feedbackEl.setAttribute("class", 'feedback');
    setTimeout(function() {
        feedbackEl.setAttribute("class", 'feedback hide');

    }, 6000);

    currentQuestionIndex++;

    if (currentQuestionIndex === questions.length){
        quizEnd();
    } else {
        getQuestion();
    }
}

function quizEnd(){
    clearInterval(timerId);

    var endScreenEl= document.getElementById("end-screen");
    endScreenEl.removeAttribute("class");

    var finalScoreEl = document.getElementById("final-score");
    finalScoreEl.textContent = time;

    questionsEl.setAttribute("class", 'hide');
}

function clockTick() {
    time--;
    //timerEl.textContent = time;               hhh

    if (time <= 0){
        quizEnd();
    }
}

function saveHighScore(){
    var initials = initialsEl.value.trim();

    if (initials !== ""){
        var highscores = JSON.parse(window.localStorage.getItem("highscores.html")) || [];

        var newScore = {
            score:time,
            initials: initials
        };

        highscores.push(newScore);
        window.localStorage.setItem("highscores", JSON.stringify(highscores));

        window.location.href = "highscores.html";
    }


}

startBtn.onclick = startQuiz;

submitBtn.onclick = startQuiz










//  var timeInterval = setInterval(function () {
//     // As long as the `timeLeft` is greater than 1
//     if (timeLeft > 1) {
//       // Set the `textContent` of `timerEl` to show the remaining seconds
//       timerEl.textContent = timeLeft + ' seconds remaining';
//       // Decrement `timeLeft` by 1
//       timeLeft--;
//     } else if (timeLeft === 1) {
//       // When `timeLeft` is equal to 1, rename to 'second' instead of 'seconds'
//       timerEl.textContent = timeLeft + ' second remaining';
//       timeLeft--;
//     } else {
//       // Once `timeLeft` gets to 0, set `timerEl` to an empty string
//       timerEl.textContent = '';
//       // Use `clearInterval()` to stop the timer
//       clearInterval(timeInterval);
//       // Call the `displayMessage()` function
//       displayMessage();
//     }
//   }, 6000);
