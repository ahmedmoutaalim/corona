//--------------------selectors-----------------:

const testButton = document.getElementById('start-btn')
const sectionQuestion = document.getElementById('container')
const informationSection = document.getElementById('information')
const scroll = document.querySelectorAll('.steppers h1')
const nextButton = document.getElementById('next-btn')
const question = document.getElementById('nextQuestion')
const selectInputs = document.querySelector('.answer-inputs')


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

//-----------------------srealQuestion-----------:

 function nextQuetion(){

    questionIndex++
     
    showQuestion( questions[questionIndex])

 }





//-----------------------------how to show questions----------------------

function showQuestion(questions){

    question.innerText=questions.question

    if(questions.input.type==='radio'){

      questions.input.answer.forEach(answer =>{

        selectInputs.innerHTML += 
         `   <div>
        <input type="radio"  name="chois" id="${answer.text}">
        <label for="${answer.text}">
            <i class="fas fa-check"></i>
            <span>${answer.text}</span> </label>
        </div>`

        

      })



        
    }


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
        }, {
            text: 'Non',
            icon: 'fa-times'
        }]
    }
}]