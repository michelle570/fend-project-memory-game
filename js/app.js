/*NOTE: Create a list that holds all of your cards */
/*NOTE: Maybe just create array of list of classes*/

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

let cardArray = ['fa-key', 'fa-key', 'fa-leaf', 'fa-leaf', 'fa-paw', 'fa-paw', 'fa-rocket', 'fa-rocket', 'fa-umbrella', 'fa-umbrella', 'fa-paper-plane', 'fa-paper-plane', 'fa-bolt', 'fa-bolt', 'fa-book', 'fa-book'];

/*Open Card*/
let OpenCard;
let Score = 0;
let Moves = 0;

const deck = document.querySelector('#deck');
const resetBtn = document.querySelector('#restart');

//RESET Click Function
resetBtn.addEventListener('click', function(event) {
  ShuffledContainer();
});

/*Click Event*/
deck.addEventListener('click', function(event) {
  /*Sets Current Card Selected*/
  let card = event.target;

  /*If not matched card then Open Card*/
  if (!(card.classList.contains('match')) && !(card.classList.contains('open')) && !(deck.classList.contains('disable'))) {
    card.classList.toggle('open');
    /*Add to Moves*/
    Moves ++;
    document.querySelector('.moves').textContent = Moves;
    setStars();

    /*Verifies agains Opened Card*/
    if (!OpenCard) {
      /*Set Open Card on First Click*/
      OpenCard = card;
    }
    else {
      /*Compare Current Card with Just Opened on Second Click*/
      if (card.innerHTML == OpenCard.innerHTML) {
        /*same*/
        console.log("same");
        card.classList.toggle('match');
        OpenCard.classList.toggle('match');

        /*Add into Score*/
        Score ++;
        document.querySelector('.score').textContent = Score + "/8";
        OpenCard = "";
        if (Score == 8) {
          console.log("WON GAME!");
          GameWon();
        }

      }
      else {
        /*Not Same*/
        console.log("not same");

        /*Flip Back Cards*/
        card.classList.add('unmatch');
        OpenCard.classList.add('unmatch');

        /*Disable board temporarily*/
        deck.classList.add('disable');

        setTimeout (function() {
          console.log(card);
          console.log(OpenCard);
          card.classList.remove('open', 'unmatch');
          OpenCard.classList.remove('open', 'unmatch');
          /*clear OpenCard*/
          OpenCard = "";

          /*Enable deck again*/
          deck.classList.remove('disable');
        }, 1100);

      }
    }
  }

});


function GameWon() {
  modal.style.display = "block";
  /*Display Modal Info*/
  //FIX THIS INFORMATION DISPLAYED
  document.querySelector('.win-score').textContent = Score;
  document.querySelector('.win-stars').textContent = Moves;

  /*NOTE: ADD reset function*/
}

function setStars() {
  /*Set Stars*/
  displayStars = document.querySelector('.win-stars');
   if (Moves > 16) {
     /*set 2 stars*/
   }
   else if(Moves > 32) {
     /*Set 1 Star*/
   }
   else if (Moves > 48) {
     /*Set 0 star*/
   }

}
/*SET EVERYTHING IN FUNCTIONS*/

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
  cardArray = shuffle(cardArray);
  console.log(cardArray);
  //create new container...

  //Reset All Values

  //Close All Cards
}


/*MODAL FUNCTIONS adapted from https://www.w3schools.com/howto/howto_css_modals.asp*/
// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the modal
var modal = document.getElementById('myModal');

// Get the <span> element that closes the modal
var CloseSpan = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
  document.querySelector('.win-score').textContent = Score;
  document.querySelector('.win-stars').textContent = Moves;
}

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
