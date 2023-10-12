/* :::: >>>> animal memory game main js <<<< :::: */


(function(){
'use strict';
const cards = document.querySelectorAll('.card');
const cardBack = document.querySelectorAll('.back');
const resetBtn = document.querySelector('#reset_button');
const flipCount = document.querySelector('#flip_count');
const matches = document.querySelector('#match_count');

/* counters: */
let matchNumber = 0;
let flipNumber = 0;

/* arrays for game logic:*/ 
let activeCards = [];
let dataArray = [];
let cardsArray = [];
let idArray = [];

/* lock the cards after second click */
let lockCards = false;


cards.forEach( item =>{
    activeCards.push(item);
});

activeCards.forEach(activeCard => {
    activeCard.addEventListener('click',(e)=> gameLogic(e, activeCard));
});


/*:::: ----  main game logic function ---- ::::*/
function gameLogic(event, card){

    /*if =>(2 cards are open)*/
    if(lockCards){
        return
    }

    /* prevent event on matched Cards */
    if(event.currentTarget.getAttribute('name')){
        return
    }

    /* enable backwards rotation after click*/
    card.style.transform = 'rotateY(180deg)';
        
    /* enable turn around on click */
    card.classList.toggle('turn_card');
    
    /* track the clicked cards element */
    let clickedCard = event.currentTarget;
    /* collect them in cardsArray */
    cardsArray.push(clickedCard);
    let cardOne = cardsArray.at(0);
    let cardTwo = cardsArray.at(1);
    
    /* track the clicked cards data-image */
    let clickedDataImage = event.currentTarget.dataset.image;
    dataArray.push(clickedDataImage);
    let dataCardOne = dataArray.at(0);
    let dataCardTwo = dataArray.at(1);

    /* track the clicked cards id */
    let clickedID = event.currentTarget.id;
    idArray.push(clickedID);
    let idCardOne = idArray.at(0);
    let idCardTwo = idArray.at(1);

    let cardIndexOne = activeCards.indexOf(cardOne);
    let cardIndexTwo = activeCards.indexOf(cardTwo);

    /* :::: >>>> matched cards :::: */
    if( dataArray.length === 2 
        && dataCardOne === dataCardTwo
        && idCardOne != idCardTwo ) {

        lockCards = true;

        matchNumber++
        matches.innerText = `${matchNumber}`;

        /* set flag to disable event on cards*/
        cardOne.setAttribute('name', 'locked');
        cardTwo.setAttribute('name', 'locked');
      
        /* animation: */
        setTimeout( () => { 
            cardOne.classList.add('match_animation');
            cardTwo.classList.add('match_animation');
        }, 500 );
        setTimeout( () => { 
            cardOne.classList.remove('match_animation');
            cardTwo.classList.remove('match_animation');
        }, 1000 );

        activeCards.splice(cardIndexOne, 1);
        activeCards.splice(cardIndexTwo, 1);
        
        setTimeout(() => {
            lockCards = false;
        }, 1200);

        dataArray = [];
        cardsArray = [];
        idArray = [];
    }

    /* :::: unequal cards :::: */
    if( dataArray.length === 2 
        && !(dataCardOne === dataCardTwo)
        || idCardOne === idCardTwo) {
    
        lockCards = true;

        setTimeout(() => {
            cardOne.style.transform = 'rotateY(360deg)';
            cardTwo.style.transform = 'rotateY(360deg)'; 
        }, 1000);

        setTimeout(() => {
            lockCards = false;
        }, 1020);

        dataArray = [];
        cardsArray = [];
        idArray = [];

    }
    /* game over call */
    if( activeCards.length === 0
        && matchNumber === 8){

        setTimeout( () => { 
            gameOver(flipNumber);
        }, 1800 );

    }

};


function gameOver(x){
    
    const modalDIV = document.querySelector('.game_over_modal');
    const modalMessage = document.querySelector('.modal_message');
    const modalClose = document.querySelector('.close');

    let gameOverMessage = 
        `Game Over!

          you win 
       with ${x} flips!

      close and restart`;

    modalMessage.innerText = gameOverMessage;

    modalDIV.style.display = 'block';

    modalClose.addEventListener('click', ()=>{

        modalDIV.style.display = 'none';

        setTimeout( () => { 
            resetMemory();
        }, 100 );
       
    })

    /* click anywhere to close the modal */
    window.onclick = function(e) {

        if (e.target == modalDIV) {

        modalDIV.style.display = 'none';
          setTimeout( () => { 
            resetMemory();
         }, 400 );
       
        }
    }

};


/** flip count function: (double check)
*  count only when you click on the back of the card */
cardBack.forEach( back =>{
    back.addEventListener('click',()=>{
        flipNumber++;
        flipCount.innerText = `${flipNumber}`;
    });
});


/* random card faces */
function cardPosition() {

    cards.forEach( card => {

      let randomPos = Math.floor(
            Math.random() * 16);

        /** order properity(where
        * card is placed in flexBox):
        * if many cards get the same
        * random value -> they will
        * order auto side by side.*/
        card.style.order = randomPos;

    })

}
cardPosition();


function resetMemory(){

    cards.forEach( item =>{
        activeCards.push(item);
        item.style.transform = 'rotateY(0deg)';
        item.removeAttribute('name');
    });

    dataArray = [];

    cardsArray = [];

    activeCards = [];

    idArray = [];

    matchNumber = 0;
    matches.innerText = '';

    flipNumber = 0;
    flipCount.innerText = '';

    cardPosition();

}

resetBtn.addEventListener('click', resetMemory);

/**  reset button animation
* should play on every click*/
resetBtn.addEventListener('pointerdown',()=>{
    resetBtn.classList.add('button_reset_turn');
});
resetBtn.addEventListener('animationend',()=>{
    resetBtn.classList.remove('button_reset_turn');
});

/* reset on pageload */
onload = ()=> {resetMemory()};


}());