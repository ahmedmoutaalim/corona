//--------------------selectors-----------------:

const testButton = document.getElementById('start-btn');
const sectionQuestion = document.getElementById('container');
const informationSection = document.getElementById('information');
const scroll = document.querySelectorAll('.steppers h1');
const nextButton = document.getElementById('next-btn');
const question = document.getElementById('nextQuestion');
const selectInputs = document.querySelector('.answer-inputs');
const buttPrevious = document.getElementById('pré-btn');
const progressBar = document.getElementsByClassName('progress');
const serialPlus = document.querySelector('.question-number');
const bar = document.querySelector('.bar');
const title =document.querySelector('.container__titre');
const controleAnimation=document.querySelector('.animated-element');
const resultMessage= document.querySelectorAll('.container p');



let questionIndex=0;
let knowQuetion={};




//---------------------events-------------------:
testButton.addEventListener('click' , startTest);
nextButton.addEventListener('click',nextQuetion);
selectInputs.addEventListener('change',typeOfButton);






//-----------------------start_test--------------:
function startTest(){

    testButton.classList.add('hide');
    sectionQuestion.classList.remove('hide');
    informationSection.classList.add('hide');
    scroll[0].classList.remove('actuel-part');
    scroll[1].classList.add('actuel-part');
                               
   nextButton.disabled=true;

   controlButtons();
   
   
}

//---------------------------next_Question-----------------------:




 function nextQuetion(){
     
if(questionIndex < 21){
    questionIndex++;
    showQuestion( questions[questionIndex]);
    progressButtons(questionIndex);

    nextButton.disabled=true;
    controlButtons() ;
    animation('next');
   
    if (questionIndex === 21){
       
        nextButton.innerHTML='terminer le test';
        nextButton.classList.add('result');
        const doneTest = document.querySelector('.result');
        doneTest.addEventListener('click',comptQuetion);
       
    
    }else{

        nextButton.innerHTML='suivant';
    }
}
  
   
  
 }





//-----------------------------how to show questions----------------------

function showQuestion(questions){

    question.innerText=questions.question;
    selectInputs.innerHTML = ''


    if(questions.input.type==='radio'){

      questions.input.answer.forEach(answer =>{

        selectInputs.innerHTML += 
         `<div>
        <input type="radio"  name="${questions.input.questionNumber}" id="${answer.text}">
        <label for="${answer.text}">
            <i class="fa ${ answer.icon}"></i>
            <span>${answer.text}</span> </label>
        </div>
        `

      })
    
    }else{

        selectInputs.innerHTML=` <input type="number" name="${questions.input.questionNumber}"  id="${questions.input.name}"
         min="${questions.input.min}" max="${questions.input.max}" placeholder=" ${questions.input.min}- ${questions.input.max}">
        <span class="input-span">${questions.input.name}</span>`
        
    }


}



//-------------------------previous_question----------------------------:

buttPrevious.addEventListener('click',()=>{

    questionIndex--;
     
    showQuestion( questions[questionIndex]);

    progressButtons(questionIndex);

    nextButton.disabled=true ;
    animation('previous');
    controlButtons();
  
    if (questionIndex === 21) {
        nextButton.innerText = 'Terminer le test';



    } else {
        nextButton.innerText = 'Suivant';
        nextButton.classList.remove('result');
    }
    
})


//---------------------controle_progress_bar----------------------:

function progressButtons(number){


    const addNumber = number + 1 ;
    serialPlus.innerHTML= addNumber ;

    bar.style.width =`calc(${addNumber}*calc(100%/22))` ;

   
}
 


//----------------------------inclickable & clickable button--------------:
function typeOfButton(event){

    const input=event.target;
    
if (input.type === 'number') {



        const number = parseFloat(input.value)
                    
        if (number >= input.min && number <= input.max) {
            nextButton.disabled = false;
            knowQuetion[input.name]=input.value;
        } else {
            nextButton.disabled = true;
              


        }

} else {

        nextButton.disabled = false;

        knowQuetion[input.name] = input.id;
        console.log(knowQuetion);
    }

   
}

//--------controle Button précédent-----:


function controlButtons(){

    if(questionIndex===0){

        buttPrevious.style.visibility='hidden';
 
    }else{ 

        buttPrevious.style.visibility='visible';

    }

}









//------------show result of the quiz:


function showResult(damage){

    scroll[1].classList.remove('actuel-part');
    scroll[2].classList.add('actuel-part');
    sectionQuestion.classList.add('hide');
    informationSection.classList.remove('hide');
    testButton.classList.remove('hide');
    testButton.innerText='Recommoncer le test';
    title.innerHTML='resultat';
    testButton.addEventListener('click',()=>{

        window.location.reload();
    })

    if (damage === 0) {
        resultMessage[0].innerText =
            "Votre situation ne relève probablement pas du Covid-19. N’hésitez pas à contacter votre médecin en cas de doute. Vous pouvez refaire le test en cas de nouveau symptôme pour réévaluer la situation. Pour toute information concernant le Covid-19, consulter la page Conseils";
        resultMessage[1].innerText =
            "Restez chez vous au maximum en attendant que les symptômes disparaissent. Prenez votre température deux fois par jour. Rappel des mesures d’hygiène.";
        resultMessage[0].style.fontSize = "25px";
        resultMessage[0].style.fontWeight = "bold";
        resultMessage[0].style.color = "#026534";
    } else if (damage === 1) {
        resultMessage[0].innerText =
            "Nous vous conseillons de rester à votre domicile et de contacter votre médecin en cas d’apparition de nouveaux symptômes. Vous pourrez aussi utiliser à nouveau l’application pour réévaluer vos symptômes";
        resultMessage[1].innerText =
            "Restez chez vous au maximum en attendant que les symptômes disparaissent. Prenez votre température deux fois par jour. Rappel des mesures d’hygiène.";
        resultMessage[0].style.fontSize = "25px";
        resultMessage[0].style.fontWeight = "bold";
        resultMessage[0].style.color = "#026534";
    } else if (damage === 2) {
        resultMessage[0].innerText =
            "Vous pouvez faire une téléconsultation ou médecin généraliste ou visite à domicile. Appelez le 141 si une gêne respiratoire ou des difficultés importantes pour s’alimenter ou boire pendant plus de 24h apparaissent.";
        resultMessage[1].innerText =
            "Restez chez vous au maximum en attendant que les symptômes disparaissent. Prenez votre température deux fois par jour. Rappel des mesures d’hygiène.";
        resultMessage[0].style.fontSize = "25px";
        resultMessage[0].style.fontWeight = "bold";
        resultMessage[0].style.color = "#787878";
    } else {
        resultMessage[0].innerText = "Appelez le 141";
        resultMessage[1].innerText =
            "Restez chez vous au maximum en attendant que les symptômes disparaissent. Prenez votre température deux fois par jour. Rappel des mesures d’hygiène.";
    
        resultMessage[0].style.color = "#d63031";
        resultMessage[0].style.fontSize = "28px";
        resultMessage[0].style.fontWeight = "bolder";
    }
}





//-------------animation----------------:
function animation(transition){

    controleAnimation.style.animation= `${transition} .6s ease`;
    controleAnimation.addEventListener('animationend', () => {
        controleAnimation.style.animation = ``;
    })    
    }




let damage = 0; 


function comptQuetion(){

    if(knowQuetion['Q1']==='oui'){

        damage++
    }

    if(parseFloat(knowQuetion['Q2'] >39) || parseFloat(knowQuetion['Q2'] <35)){

        damage++
    }


    if(knowQuetion['Q3']==='oui' ){

        damage++

    }

    if(knowQuetion['Q10']==='Fatigué(e)' || knowQuetion['Q10']=== 'Très fatigué' ){

        damage++
    }

    if(parseFloat(knowQuetion['Q12'] >120) || parseFloat(knowQuetion['Q12'] < 40)){

        damage++
    }

    if(knowQuetion['Q16']!=='non'){

        damage++
    }
 
    showResult(damage)
   
}
























//------------------------------les questions--------------------------:

const questions = [{
    question: 'Pensez-vous avoir ou avoir eu de la fièvre ces 10 derniers jours (frissons, sueurs) ?',

    input: {
        type: 'radio',
        questionNumber: 'Q1',
        answer: [{
            text: 'Oui',
            icon: 'fa-check'
        }, {
            text: 'Non',
            icon: 'fa-times'
        }]
    }
}, {
    question: 'Quelle est votre température corporelle ?',

    input: {
        type: 'number',
        questionNumber: 'Q2',
        name: 'degrés',
        min: 34,
        max: 42
    }
}, {
    question: 'Ces derniers jours, avez-vous une toux ou une augmentation de votre toux habituelle ?',

    input: {
        type: 'radio',
        questionNumber: 'Q3',
        answer: [{
            text: 'Oui',
            icon: 'fa-check'
        }, {
            text: 'Non',
            icon: 'fa-times'
        }]
    }
}, {
    question:'Avez-vous eu des courbatures inhabituelles au cours des derniers jours ?',

    input: {
        type: 'radio',
        questionNumber: 'Q4',
        answer: [{
            text: 'Oui',
            icon: 'fa-check'
        }, {
            text: 'Non',
            icon: 'fa-times'
        }]
    }
}, {
    question: 'Ces derniers jours, avez-vous un mal de gorge ?',

    input: {
        type: 'radio',
        questionNumber: 'Q5',
        answer: [{
            text: 'Oui',
            icon: 'fa-check'
        }, {
            text: 'Non',
            icon: 'fa-times'
        }]
    }
}, {
    question: 'Ces dernières 24 heures, avez-vous de la diarrhée ? Avec au moins 3 selles molles.',

    input: {
        type: 'radio',
        questionNumber: 'Q6',
        answer: [{
            text: 'Oui',
            icon: 'fa-check'
        }, {
            text: 'Non',
            icon: 'fa-times'
        }]
    }
}, {
    question: 'Ces derniers jours, avez-vous une fatigue inhabituelle qui vous a obligé à vous reposer plus de la moitié de la journée ?',

    input: {
        type: 'radio',
        questionNumber: 'Q7',
        answer: [{
            text: 'Oui',
            icon: 'fa-check'
        }, {
            text: 'Non',
            icon: 'fa-times'
        }]
    }
}, {
    question: 'Avez-vous des difficultés importantes pour vous alimenter ou boire depuis plus de 24h ?',

    input: {
        type: 'radio',
        questionNumber: 'Q8',
        answer: [{
            text: 'Oui',
            icon: 'fa-check'
        }, {
            text: 'Non',
            icon: 'fa-times'
        }]
    }
}, {
    question: 'Dans les dernières 24 heures, avez-vous noté un manque de souffle inhabituel lorsque vous parlez ou faites un petit effort ?',

    input: {
        type: 'radio',
        questionNumber: 'Q9',
        answer: [{
            text: 'Oui',
            icon: 'fa-check'
        }, {
            text: 'Non',
            icon: 'fa-times'
        }]
    }
}, {
    question: 'Actuellement, comment vous vous sentez ?',

    input: {
        type: 'radio',
        questionNumber: 'Q10',
        answer: [{
            text: 'Bien',
            icon: ' far fa-laugh'
        }, {
            text: 'Assez bien',
            icon: ' far fa-smile'
        }, {
            text: 'Fatigué(e)',
            icon: ' far fa-frown'
        }, {
            text: 'Très fatigué',
            icon: 'far fa-dizzy'
        }]
    }
}, {
    question: 'Quel est votre âge ? Ceci, afin de calculer un facteur de risque spécifique.',

    input: {
        type: 'number',
        questionNumber: 'Q11',
        name: 'ans',
        min: 15,
        max: 110
    }
}, 

{
    question: 'Quel est votre poids ? Afin de calculer l’indice de masse corporelle qui est un facteur influençant le risque de complications de l’infection.',

    input: {
        type: 'number',
        questionNumber: 'Q12',
        name: 'kg',
        min: 20,
        max: 250
    }
}, 

{
    question: 'Quelle est votre taille ? Afin de calculer l’indice de masse corporelle qui est un facteur influençant le risque de complications de l’infection.',

    input: {
        type: 'number',
        questionNumber: 'Q13',
        name: 'cm',
        min: 80,
        max: 250
    }
},

{
    question: 'Avez-vous de l’hypertension artérielle mal équilibrée ? Ou avez-vous une maladie cardiaque ou vasculaire ? Ou prenez-vous un traitement à visée cardiologique ?',

    input: {
        type: 'radio',
        questionNumber: 'Q14',
        answer: [{
            text: 'Oui',
            icon: 'fa-check'
        }, {
            text: 'Non',
            icon: 'fa-times'
        }]
    }
},

{
    question: 'Êtes-vous diabétique ?',

    input: {
        type: 'radio',
        questionNumber: 'Q15',
        answer: [{
            text: 'Oui',
            icon: 'fa-check'
        }, {
            text: 'Non',
            icon: 'fa-times'
        }]
    }
},

{
    question: 'Avez-vous ou avez-vous eu un cancer ?',

    input: {
        type: 'radio',
        questionNumber: 'Q16',
        answer: [{
            text: 'Oui',
            icon: 'fa-check'
        }, {
            text: 'Non',
            icon: 'fa-times'
        }]
    }
}, 

{
    question: 'Avez-vous une maladie respiratoire ? Ou êtes-vous suivi par un pneumologue ?',

    input: {
        type: 'radio',
        questionNumber: 'Q17',
        answer: [{
            text: 'Oui',
            icon: 'fa-check'
        }, {
            text: 'Non',
            icon: 'fa-times'
        }]
    }
},

{
    question: 'Avez-vous une insuffisance rénale chronique dialysée ?',

    input: {
        type: 'radio',
        questionNumber: 'Q18',
        answer: [{
            text: 'Oui',
            icon: 'fa-check'
        }, {
            text: 'Non',
            icon: 'fa-times'
        }]
    }
}, 

{
    question: 'Avez-vous une maladie chronique du foie ?',

    input: {
        type: 'radio',
        questionNumber: 'Q19',
        answer: [{
            text: 'Oui',
            icon: 'fa-check'
        }, {
            text: 'Non',
            icon: 'fa-times'
        }]
    }
}, 
{
    question: 'Êtes-vous enceinte ?',

    input: {
        type: 'radio',
        questionNumber: 'Q20',
        answer: [{
            text: 'Oui',
            icon: 'fa-check'
        }, {
            text: 'Non',
            icon: 'fa-times'
        }, {
            text: 'Homme',
            icon: 'fa-male'

        }]
    }
},
 {
    question: 'Avez-vous une maladie connue pour diminuer vos défenses immunitaires ?',

    input: {
        type: 'radio',
        questionNumber: 'Q21',
        answer: [{
            text: 'Oui',
            icon: 'fa-check'
        }, {
            text: 'Non',
            icon: 'fa-times'
        }]
    }
}, 
{
    question: 'Prenez-vous un traitement immunosuppresseur ? C’est un traitement qui diminue vos défenses contre les infections. Voici quelques exemples : corticoïdes, méthotrexate, ciclosporine, tacrolimus, azathioprine, cyclophosphamide (liste non exhaustive).',
    
    input: {
        type: 'radio',
        questionNumber: 'Q22',
        answer: [{
            text: 'Oui',
            icon: 'fa-check'
        }, {
            text: 'Non',
            icon: 'fa-times'
        }]
    }
}

]