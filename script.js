/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result gets added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, prevDice, gamePlaying, setScore;      //initially creating my variables in the global context so it can be accesible from anywhere


init();     //this is a method of calling a function initially so that it would be accesible throughout the entire document


//dice = Math.floor(Math.random() * 6) + 1;     //math.floor is used to round math calcs to integers. //Math.random is used to generate random numbers from 0 - 1, we multiply by the highest number we want to see, and we can to show the lowest number we wish to see,

//console.log(dice);                            

//document.querySelector('#current-' + activePlayer).textContent = dice;        //document.querySelector() is used to target/select a class/id in the html doc. //.textContent is used to mutate the text content of the element/class/id we select.

//document.querySelector('#current-' + activePlayer).innerHTML = '<em>'+ dice +'</em>'

//var x = document.querySelector('#score-0').textContent;       


// .addEventListner is used to call a corollary reaction when a certain action/change occurs on a certain predefined/selected/targeted class/element/id or text.

document.querySelector('.btn-roll').addEventListener('click', function () {

    if (gamePlaying) {
        // 1. generate Random number(integer)
        var dice = Math.floor(Math.random() * 6) + 1;
        var dices = Math.floor(Math.random() * 6) + 1;
        
        // 2. Display the result
        var diceDOM = document.querySelector('.dice');
        var diceDOMs = document.querySelector('#dice-2');
        console.log(diceDOM);
        console.log(diceDOMs);
        diceDOM.style.display = 'block';        //'style.display' is used to push a css rule (property & value) to a selection.
        diceDOMs.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';  //.src is used to replace/change a src for a file eg. img, video, etc. 
        diceDOMs.src = 'dice-' + dices + '.png';
        
        //if a player rolls two successive 6s
        if (prevDice === 6 && (dice === 6 || dices === 6)) {
            scores[activePlayer] = 0;
            document.getElementById('score-' + activePlayer).textContent = '0'; 
            nextPlayer();


        // 3. Update the round IF the rolled number was NOT a 1
        } else if (dice !== 1 && dices !== 1){
            //add score
            roundScore += (dice + dices);     //means roundscore = roundscore + (dice + dices)
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
            
        } else {
            nextPlayer();
        } 

        prevDice = dice;
        prevDices = dices;
    }   

});

document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
        //Add current score to global score
        scores[activePlayer] += roundScore;     //here shows a typical use case for arrays in js!

        //Update the user interface
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        setScore = document.querySelector('.max-score').value;

        if (setScore) {
            winScore = setScore;
        } else {
            winScore = 100;
        }

        //Check if player won the game
        if (scores[activePlayer] >= winScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('#dice-2').style.display = 'none';

            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

            gamePlaying = false;

        } else {
            //Next Player
            nextPlayer();
        }
    }   
})

function nextPlayer() {
    //next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    //what is displayed in the count box
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    //visually show active player
    document.querySelector('.player-0-panel').classList.toggle('active');       //.classList is used to show that we are trying to manipulate classes
    document.querySelector('.player-1-panel').classList.toggle('active');       //.toggle is used to switch between add & remove.
    
    //document.querySelector('.player-0-panel').classList.remove('active');     //.remove removes a class
    //document.querySelector('.player-1-panel').classList.add('active');        //.add adds a class, in this case, '.active' class
    
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('#dice-2').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {       //this function is written to set the initial game condition and environment.

    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    //setMaxScore();
    

    document.querySelector('.dice').style.display = 'none';
    document.querySelector('#dice-2').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');

    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    document.querySelector('.player-0-panel').classList.add('active');

    /*
    function setMaxScore() {
        var maxScoreDefault = setScore.defaultValue;
        var maxScoreCurrent = setScore.value;

        if (maxScoreDefault === maxScoreCurrent) {
            document.getElementByClassName('max-score').innerHTML = maxScoreDefault;
        } else {
            document.getElementByClassName('max-score').innerHTML = maxScoreCurrent;
        }
    }
    */
}





















