// Variables for elements
let quizWrapper = document.getElementById('quiz-wrapper');
var quizQuestions = [
    {
        question: "Find x=?, When x^2 = x^3 - 18",
        answers: {
            a: '2',
            b: '1',
            c: '3',
            d: '0'

        },
        correctAnswer : 'c',
    },
    {
        question: "Find x=?, when: 2x + 8 = 4x - 4",
        answers: {
            a: '10',
            b: '15',
            c: '8',
            d: '6'

        },
        correctAnswer : 'd',
    },
    {
        question: "What is the sum of angles in a square?",
        answers: {
            a: '90',
            b: '360',
            c: '270',
            d: '180'

        },
        correctAnswer : 'b',
    },
    {
        question: "Complete the series: 1000, 500, 250, ?",
        answers: {
            a: '200',
            b: '120',
            c: '125',
            d: '100'

        },
        correctAnswer : 'c',
    }, 
    {
        question: "The area of a square is 49, what is the length of every side?",
        answers: {
            a: '10',
            b: '6',
            c: '5',
            d: '7'

        },
        correctAnswer : 'd',
    },
    {
        question: "Find x=?, when: 7x - 9 = 51 + x",
        answers: {
            a: '10',
            b: '11',
            c: '9',
            d: '7'

        },
        correctAnswer : 'a',
    },
    {
        question: "Find x=?, when: x^2 - 1 = 8",
        answers: {
            a: '8',
            b: '9',
            c: '2',
            d: '3'

        },
        correctAnswer : 'd',
    },
    {
        question: "Find x=?, if X is 40% of Y, and Y = 200",
        answers: {
            a: '100',
            b: '40',
            c: '60',
            d: '80'

        },
        correctAnswer : 'd',
    },
    {
        question: "Find x=?, when: -20 - 2x = -36",
        answers: {
            a: '-8',
            b: '-6',
            c: '8',
            d: '6'

        },
        correctAnswer : 'c',
    },
    {
        question: "Find x=?, when: -18 - 2x = -12",
        answers: {
            a: '3',
            b: '6',
            c: '-3',
            d: '-6'

        },
        correctAnswer : 'c',
    },
];
let btnWrapper = document.getElementById('btn-wrapper')
let checkButton = document.getElementById('check-btn');

// Variables for counting the pagination and score 
let currentPage = 1;
let numCorrect = 0;

// Show the first question of the quiz
displayCard(quizQuestions, quizWrapper, currentPage);

/* Create a card for the question of the current page
Each index of the question = page + 1 */
function createCard(question, page){

    let card = document.createElement('div');
    card.classList.add('card')
    content = [];
    let answers = [];
    
    for (letter in question.answers) {
        answers.push(
            '<div class="answers">'
            + '<input type="radio" name="question'+page+'" value="'+letter+'">'
            + '<label class="answer-label-'+letter+'">'
            + question.answers[letter]
            + '</div>'
            );
        }
        
    content.push(
        '<div class="card-question">' + question.question + '</div>'
        + '<div class="card-answers">' + answers.join('') + '</div>'
        );
            
    card.innerHTML = content.join('');
    
    return card;
};


// Display the questions's card in the page
function displayCard (questions, quizWrapper, page){
    quizWrapper.innerHTML = "";
    page--;
    
    let questionIndex = questions.slice(page, page + 1);
    let currentQuestion = questionIndex[0];
    let card = createCard(currentQuestion, page);
    
    quizWrapper.appendChild(card);
};
        
// Check whether the user's answer is correct
function checkAnswer(questions, quizWrapper, page, score){
    // gather answer containers from our quiz
    var answerContainers = quizWrapper.querySelectorAll('.card-answers');
    let currentQuestion = page - 1;

    // find selected answer
    let userAnswer = (answerContainers[0].querySelector('input[name=question'+currentQuestion+']:checked') || {}).value;
    
    // Disable all the inputs
    let inputsArray = answerContainers[0].querySelectorAll('input');
    for (let i=0; i<inputsArray.length; i++) {
        inputsArray[i].setAttribute('disabled','');
        inputsArray[i].style.cursor = 'not-allowed';
    }

    // if answer is correct
    if(userAnswer===questions[currentQuestion].correctAnswer){
        // add to the number of correct answers
        score++;
        // Change the style of the correct answer
        let correctAnswerLabel = (answerContainers[0].querySelector('label[class=answer-label-'+questions[currentQuestion].correctAnswer+']'));
        correctAnswerLabel.setAttribute('class', 'correct-answer-label');
    } else {
        let correctAnswerLabel = (answerContainers[0].querySelector('label[class=answer-label-'+questions[currentQuestion].correctAnswer+']'));
        correctAnswerLabel.setAttribute('class', 'correct-answer-label');
    };    

    return score;
};
    
// When user clicks "Check Answer"
checkButton.onclick = () => {
    checkButton.setAttribute('disabled', '');
    // Check whether the user's answer is correct
    numCorrect = checkAnswer(quizQuestions, quizWrapper, currentPage, numCorrect);
    
    let nextButton = createNextButton(btnWrapper);
    nextButton.addEventListener('click', () => { nextQuestion(nextButton, checkButton, currentPage, quizQuestions, quizWrapper, btnWrapper, numCorrect) });
    currentPage++;
};
    
// Create the "next question" button
function createNextButton(btnWrapper){
let nextButton = document.createElement('button');
nextButton.classList.add('next-btn');
nextButton.innerText = 'Next Question';

btnWrapper.append(nextButton);
return nextButton;
};

// When user clicks "Next Question"
function nextQuestion (nextButton, checkButton, page, quizQuestions, quizWrapper, btnWrapper, score){
    if (page < quizQuestions.length + 1) {
        nextButton.remove();
        checkButton.removeAttribute('disabled');
        // Shows the next card
        displayCard(quizQuestions, quizWrapper, page);
    } else {
        nextButton.remove();
        checkButton.remove();
        displayScore(quizWrapper, quizQuestions, score);
    };
};

function displayScore (quizWrapper, quizQuestions, score) {
    quizWrapper.innerHTML = "";
    let scoreCard = document.createElement('div')
    scoreCard.classList.add('score-card');

    let scoreMessage = document.createElement('h3');
    scoreCard.classList.add('score-message');
    scoreMessage.innerHTML = `Your final score is ${score}/${quizQuestions.length}`;

    let replayMessage = document.createElement('p');
    scoreCard.classList.add('replay-message');
    replayMessage.innerHTML = 'Refresh the page to play again.';
    
    scoreCard.append(scoreMessage, replayMessage);
    quizWrapper.append(scoreCard);
;}

