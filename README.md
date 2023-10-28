# memory

Animal Memory Game _ Pure CSS and Vanilla Script

play @ codepen: https://codepen.io/Konrad-Wittich/pen/JjxGyRv

This tiny memory game is only done with html, css and javascript.
Its build for all children and grown up children...


how its done:

First create an ordinary html file
with a main element and a game section inside.

Create three sections one for the game status/ game display.
One for the whole cards / the game.
And one for a modal message that occurs when the game is over.

Then add 16 divs with a card class inside the game-section.
They need a data attribut called here data-image to target and compare them with java-script later on.

For the game its recommended to wrap the game section with flexbox.
Later on we need the flexbox order properiety
for the random order of the cards, shuffeld new after every reset,

Inside the card divs we have two divs, one for the backface and one for the frontface of your card. 
Thats important because we need them for the turn around effect.
Inside the frontface we write our HTML-Entities for the Emoji Animals...

In CSS we add an perspective to the game wrap so all childs inside will
be 3d elements.
Than we hide the backface/visibillity of the cards and add 3d transform styles to the main card class 
so we can play around here with 3d rotations and have a nice turn around effect. 
We will write this in an extra class who gets called later on with javascript.


JAVA SCRIPT:-----------------------------------------------------------------------

get all needed elements.. 

10 -32:
Create two variables one for the match and one for the flips..
We later increment these values by every click on a card or every match
between two cards.
Then we create:
one array for alll the cards of our document.. // activeCards;
one array for all data that we target with our click listener later..  //dataArray;
one array for the cards to collect two cards..  //cardsArray;
one array to compare if the card is equal clicked.. // idArray;
All Array values get compared then by conditions later on..
And finally we need a boolean who tells the programm if the cards are locked or open. 
For the case if two cards are open the others should not be clickable.

Now we push all cards with a forEach Method in to the activeCards array.
And add there to every card an EventListener for a click event,..
- again with a forEach´M.

36:
GAME LOGIC function:
After that the main game logic funtion starts.

39: If our locked boolean is true we will return, else we run the function,

44:  If the click event targets enters a card with an name attribute, 
that is given later here in that function - we else will return.
This ensures that all cards that are matched in the game are not called anymore by 
our main game logic function.

49:  Now the cards style.transform will set back to the default position first.
For a default turn.. Then we add the classList for the flip around behaviour.

55-59: Track the clicked cards element.
We get the current event target from our click-event,  also the whole card div element.
Push it in the cards array. Then create variables, cardOne, cardTwo, that acces to the index 0 and 1 of the cardsArray.  
So we have two cards.- Bingo!

62-65: Now track the data-image values.
Doing the same thing like we did with the cards elements but we push it in the dataArray.. 
so we have two data values that we can compare each other

68-71: Finally we track the ids from the cards.
And push them into the idArray to compare them later to ensure that the cards are not
doubleclikced for the compare conditions.

73-74: So what we need is the actual clicked card located in our document right?
So we go to the index of the activeCards array 
(remember all our DOM cards are here) 
and compare the index with our two collected cards elements inside our card array later on..

77-110: MATCHED CARDS:
Stop the cardsArray. When he contains more than 2 elements!
An then compare those two =>elements_data-image values from the dataArray.
Also ensure that not the same Card is doubleclicked( id ).
81: We need to lock the cards or others could be clicked so our boolen is set to true.
Our match counter increases by one..
and we write it in our DOM.

87-88: here we set our name Attribute to the matched cards. 
so we ensure if we run again the main function they wont get invoked anymore.
Look at 42-44 there we read that little flag out..

91-98: then we run our matched card animation with a timeout..

100-101: After that we throw the cards out of our active card array
to ensure that in the end of our game this array will be empty...
// important for the game over function.

103: We reset the boolean again..to get acces to the other cards again.
107-109:  clear the arrays... for the next round.

113:
UNEQUAL CARDS:
When the dataArray is over 2 again and our cardsData does not match..
we set locked boolean to true again.
With an little timeout our cards wíll turn around again.
With an following timeout the locked boolean will set to false again. 
So we can play on... 
Again clear data and cards array again..

133:
GAME OVER CALL:
When our activeCards array is empty and we have 8 matches then 
our gameover funbction runs with the fippedCards Number inside
cause this number will shown up in our game over modal..

146:
GAME OVER FUNCTION:
152 Write a message for the modal.
162 Make the modal visible. //In our css display is set to none.
164 Add an click Event to the close button of our modal.
175 Also ensure that the user can close the modal when he clicks in to the window

192:
FLIP Count:
This function ensures that only an flip is counted when you click on the backside of a card.
/EventListener, counter and innerText for the DOM:..

201:
RANDOM CARDS Faces: cards arrangement for the game field.
We add with a forEach Method an random number to each card(Math.random)
and this number will be the value for the flex-order attribute of each card.
!Beware: Set the flex-order in our css (.card) to unset or issues will occure..
Don t worry if some cards have the same random number..
Flexbox will order those cards automatically beneath each other.

221:
RESET function:
223 Turn all the cards around again.
229 Clear all arrays here
237 clear the counters, also in the DOM.
243 Randomize the flex order of the cards again for the next round..

247:
REST BUTTON:
Three eventListeners are needed because our tiny reset button runs an animation..
If you toggle classes here it will only work @ every second click.
But first we add an click event for the reset functinoality..

Then add the reset_button class with an pointerdown/(click will also work)
and remove that classList after the end of our little animation
Event: animationend...

259:
on page load reset all...


:: I guess thats it.. have fun play around _ give it to your kids 

☻Regards! Konrad ☻
