/*List of Classes for Cards*/
let cardArray = ['fa-key', 'fa-key', 'fa-leaf', 'fa-leaf', 'fa-paw', 'fa-paw', 'fa-rocket', 'fa-rocket', 'fa-umbrella', 'fa-umbrella', 'fa-paper-plane', 'fa-paper-plane', 'fa-bolt', 'fa-bolt', 'fa-book', 'fa-book'];

/*Open Card*/
let OpenCard;
let Score = 0;
let Moves = 0;

const deck = document.querySelector('#deck');
const resetBtn = document.querySelector('#restart');
const playAgainBtn = document.querySelector('#PlayAgain');

//Reset on Load
document.addEventListener('DOMContentLoaded', function () {
    ShuffledContainer();
});

//RESET Click Function
resetBtn.addEventListener('click', function(event) {
  ShuffledContainer();
});

//Modal Button Click Function
playAgainBtn.addEventListener('click', function(event) {
  /*CLOSE MODAL*/
  modal.style.display = "none";

  /*Shuffle/Restart Cards*/
  ShuffledContainer();
});

/*Click Event*/
deck.addEventListener('click', function(event) {
  /*Sets Current Card Clicked*/
  let card = event.target;

  /*Verifies if card is not already opened, already been matched, is temporarily disabled or is the deck area*/
  if (!(card.classList.contains('match')) && !(card.classList.contains('open')) && !(deck.classList.contains('disable')) && (card.classList.contains('card')) ){

    card.classList.toggle('open');


    /*Add to Moves*/
    Moves ++;
    document.querySelector('.moves').textContent = Moves;
    setStars();

    /*Verifies if there is an open card*/
    if (!OpenCard) {
      /*Set Open Card on First Click*/
      OpenCard = card;
    }
    else {
      /*Compare Current Card with Just Opened on Second Click*/

      if (card.innerHTML == OpenCard.innerHTML) {
        /*Cards are a match*/
        card.classList.toggle('match');
        OpenCard.classList.toggle('match');

        /*Add into Score & Resets Open Card*/
        Score ++;
        document.querySelector('.score').textContent = Score + "/8";
        OpenCard = "";

        /*Verifies if match makes the user win*/
        if (Score == 8) {
          console.log("WON GAME!");
          GameWon();
        }

      }
      else {
        /*Cards are not a match*/

        /*Flip Back Cards*/
        card.classList.add('unmatch');
        OpenCard.classList.add('unmatch');

        /*Disable board temporarily*/
        deck.classList.add('disable');


        setTimeout (function() {
          card.classList.remove('open', 'unmatch');
          OpenCard.classList.remove('open','unmatch');
          /*clear OpenCard*/
          OpenCard = "";

          /*Enable deck again*/
          deck.classList.remove('disable');
        }, 1800);

      }
    }
  }

});


//FUNCTIONS

function GameWon() {
  /*Display Modal Info*/
  modal.style.display = "block";
  document.querySelector('.win-moves').textContent = Moves;
  document.querySelector('.win-stars').innerHTML = document.querySelector('.stars').innerHTML;
}

function setStars() {
  let stars = "";

   if (Moves == 16) {
     stars = "<li><i class='fas fa-star'></i></li><li><i class='fas fa-star'></i></li><li><i class='far fa-star'></i></i>"
     document.querySelector('.stars').innerHTML = stars;
   }
   else if(Moves == 32) {
     stars = "<li><i class='fas fa-star'></i></li><li><i class='far fa-star'></i></li><li><i class='far fa-star'></i></i>"
     document.querySelector('.stars').innerHTML = stars;
   }
   else if (Moves == 48) {
     stars = "<li><i class='far fa-star'></i></li><li><i class='far fa-star'></i></li><li><i class='far fa-star'></i></i>"
     document.querySelector('.stars').innerHTML = stars;
   }

}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function ShuffledContainer() {
  /*Shuffle Array*/
  shuffle(cardArray);

  //create new container...
  let newContainer = "";
  for (const cardclass of cardArray) {
    newContainer += "<li class='card'><i class='fas " + cardclass +"'></i></li>";
  }
  deck.innerHTML = newContainer;

  /*Reset Scores and Stars*/
  Reset();
}

function Reset() {
  Score = 0;
  Moves = 0;
  OpenCard = "";
  document.querySelector('.stars').innerHTML = "<li><i class='fas fa-star'></i></li><li><i class='fas fa-star'></i></li><li><i class='fas fa-star'></i></i>";
  document.querySelector('.moves').textContent = Moves;
  document.querySelector('.score').textContent = Score + "/8";
}

/*MODAL FUNCTIONS adapted from https://www.w3schools.com/howto/howto_css_modals.asp*/

// Get the modal
var modal = document.getElementById('myModal');

// Get the <span> element that closes the modal
var CloseSpan = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
CloseSpan.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
/*END OF MODAL FUNCTIONS*/
