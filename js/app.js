/*Create a list that holds all of your cards */
/*Maybe just create array of list of classes*/


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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

/*Open Card*/
let OpenCard;
let Score = 0;

const deck = document.querySelector('#deck');

/*Click Event*/
deck.addEventListener('click', function(event) {
  /*Sets Current Card Selected*/
  let card = event.target;

  /*If not matched card then Open Card*/
  if (!(card.classList.contains('match'))) {
    card.classList.toggle('open');
    /*NOTE: Also verify it is not the Same Current Card use ===?*/

    /*Verifies agains Opened Card*/
    if (!OpenCard) {
      /*Set Open Card*/
      OpenCard = card;
    }
    else {
      /*Compare Current Card with Just Opened*/
      if (card.innerHTML == OpenCard.innerHTML) {
        /*same*/
        console.log("same");
        card.classList.toggle('match');
        OpenCard.classList.toggle('match');

        /*Add into Score*/
        Score ++;
        document.querySelector('.score').textContent = Score + "/16";
      }
      else {
        /*Not Same*/
        console.log("not same");

        /*NOTE: Only one classList allowed?*/
        card.classList.add('unmatch');
        OpenCard.classList.add('unmatch');
        /*NOTE: Add a wait and then close???*/
        card.classList.remove('open');
        OpenCard.classList.remove('open');

      }
      /*clear OpenCard*/
      OpenCard = "";
      /*NOTE:Check if Won*/
    }
  }



});

/*
 * set up the event listener for a card. If a card is clicked:
    - display the card's symbol (put this functionality in another function that you call from this one)
    - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
    - if the list already has another card, check to see if the two cards match
      + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
      + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
      + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
      + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
