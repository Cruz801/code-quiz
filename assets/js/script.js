// array of questions

var questions = [
    {
        title: "What car manufacturer made the Supra", // put question
        choices: ['Nissan', 'Toyota', 'Acura'], // put options
        answer: 'Toyota'
    },
    {
        title: "What year was the r32 Skyline 1st manufactured?",
        choices: ['1972', '1969', '1989'],
        answer: '1989'
    },
    {
        title: "What engine came in the MK4 Supra?",
        choices: ['rb26dett', '2jzgte', 'ka24e'],
        answer: '2jzgte'
    },
    {
        title: "What was the last year the r34 Skyline manufactured?",
        choices: ['2002', '2010', '2004'],
        answer: '2002'
    },
    {
        title: "which car model is referred to as Godzilla?",
        choices: ['Supra', 'Skyline Gtr', 'Civiv'],
        answer: 'Skyline Gtr'
    },
];

// var declaration

var currentQuestionIndex = 0
var secondQuestionIndex = 0

var questionsEl = document.getElementById("questions");
var choicesEl = document.getElementById("choices");
var timerEl = document.getElementById("time");
var submitBtn = document.getElementById("submit");
var startBtn = document.getElementById("start");
var initialsEl = document.getElementById("initials");
var feedbackEl = document.getElementById("feedback")
var endTest = document.getElementById("end-test")
var questionTitle = document.getElementById("questions-title")
var finalScore = document.getElementById("final-score")
var score = 0
// timer references

var timeLeft = questions.length * 10;
var timerInterval;

function startQuiz() {
    var startScreenEl = document.getElementById("start-screen");

    startScreenEl.setAttribute("class", "hide");
   
    nextQuestion();
  
    questionsEl.classList.remove('hide')

    timerInterval = setInterval(function () {
        // As long as the `timeLeft` is greater than 1
        if (timeLeft > 1) {
            // Set the `textContent` of `timerEl` to show the remaining seconds
            timerEl.textContent = timeLeft + ' seconds remaining';
            // Decrement `timeLeft` by 1
            timeLeft--;
        } else if (timeLeft === 1) {
            // When `timeLeft` is equal to 1, rename to 'second' instead of 'seconds'
            timerEl.textContent = timeLeft + ' second remaining';
            timeLeft--;
        } else {
            // Once `timeLeft` gets to 0, set `timerEl` to an empty string
            timerEl.textContent = '';
            // Use `clearInterval()` to stop the timer
            clearInterval(timerInterval);
            // Call the `displayMessage()` function
            endScreen();
        }
    }, 1000);

}


function compareQuestion(answer) {
    console.log(answer)
nextQuestion()
}


function nextQuestion(){
    // use cerrent question index to get question instance//
    //update text for question title
    // insert choices
    // add event listeners to choices 
    //increment current question index
    // check if quiz is finished if so display end screen()
    if (currentQuestionIndex >= questions.length){
        clearInterval(timerInterval)
        endScreen()
        return 
    }
    choicesEl.innerHTML =  ""
    var question = questions[currentQuestionIndex]
    questionTitle.textContent = question.title
    
    for (let i = 0; i < question.choices.length; i++) {
        var p = document.createElement("p")
        p.classList.add('choice')
        p.textContent = question.choices[i]
        console.log(p.textContent, p)
        p.addEventListener('click', function(e) {
            // console.log(e.target.textContent,question.answer)
            if (e.target.textContent === question.answer) {
                console.log('this')
                score += 1
                console.log(score)
            } 
            finalScore.textContent= score
        })
        p.addEventListener('click', nextQuestion);
        choicesEl.append(p)
    }
    currentQuestionIndex++ 
}

var submitButton = (function(e) {
    // console.log(score, timeLeft, initialsEl.value)
    localStorage.setItem(initialsEl.value, score, timeLeft)
})
   





function endScreen() {
    endTest.classList.remove('hide')
    questionsEl.classList.add('hide')
}



startBtn.addEventListener("click", startQuiz);

submitBtn.addEventListener('click', submitButton)


// const element2 = document.querySelector("#sign-up");

// element2.addEventListener("click", () => {
//   console.log("element2");

//   element2.classList.add("animate__animated", "animate__rotateIn");
// });





