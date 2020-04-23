//--------------------selectors-----------------:

const testButton = document.getElementById('start-btn')
const sectionQuestion = document.getElementById('container')
const informationSection = document.getElementById('information')
const scroll = document.querySelectorAll('.steppers h1')
const nextButton = document.getElementById('next-btn')
const question = document.getElementById('nextQuestion')
const selectInputs = document.querySelector('.answer-inputs')
const buttPrevious = document.getElementById('pré-btn')
const progressBar = document.getElementsByClassName('progress')
const serialPlus = document.querySelector('.question-number')
const bar = document.querySelector('.bar')


let questionIndex=0;



//---------------------events-------------------:
testButton.addEventListener('click' , startTest)
nextButton.addEventListener('click',nextQuetion)






//-----------------------start_test--------------:
function startTest(){

    testButton.classList.add('hide')
    sectionQuestion.classList.remove('hide')
    informationSection.classList.add('hide')
    scroll[0].classList.remove('actuel-part')
    scroll[1].classList.add('actuel-part')



}

//---------------------------next_Question-----------------------:

 function nextQuetion(){

    questionIndex++
     
    showQuestion( questions[questionIndex])

    progressButtons(questionIndex)
    

 }





//-----------------------------how to show questions----------------------

function showQuestion(questions){

    question.innerText=questions.question
    selectInputs.innerHTML = ''


    if(questions.input.type==='radio'){

      questions.input.answer.forEach(answer =>{

        selectInputs.innerHTML += 
         `<div>
        <input type="radio"  name="chois" id="${answer.text}">
        <label for="${answer.text}">
            <i class="${answer.icon}"></i>
            <span>${answer.text}</span> </label>
        </div>
        `

      })
    
    }else{

        selectInputs.innerHTML=` <input type="number"  id="${questions.input.name}"
         min="${questions.input.min}" max="${questions.input.max}" placeholder=" ${questions.input.min}- ${questions.input.max}">
        <span class="input-span">${questions.input.name}</span>`
        
    }


}



//-------------------------previous_question-------------------:

buttPrevious.addEventListener('click',()=>{

    questionIndex--
     
    showQuestion( questions[questionIndex])

    progressButtons(questionIndex)

})


//---------------------controle_progressbar----------------------:

function progressButtons(number){


    const addNumber = number + 1 ;
    serialPlus.innerHTML= addNumber ;


    bar.style.width =` calc(${addNumber}*calc(100%/22))` 

   

}



















//------------------------------les questions--------------------------:

const questions = [{
    question: 'Pensez-vous avoir ou avoir eu de la fièvre ces 10 derniers jours (frissons, sueurs) ?',

    input: {
        type: 'radio',
        answer: [{
            text: 'Oui',
            icon: 'fa-check'
        }, 
        {
            text: 'Non',
            icon: 'fa-times'
        }]
    }
},

{
    question:'Quelle est votre température corporelle ?',

    input: {
        type: 'number',
        name: 'degrés',
        min: 34,
        max: 42
    }
}, 

{
    question:'Ces derniers jours, avez-vous une toux ou une augmentation de votre toux habituelle ?',

    input: {
        type: 'radio',
        answer: [{
            text: 'Oui',
            icon: 'fa-check'
        }, 
        {
            text: 'Non',
            icon: 'fa-times'
        }]
    }
}]