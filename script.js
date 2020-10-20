var btnNew = document.querySelector('.btn-new');
var btnRoll = document.querySelector('.btn-roll');
var btnHold = document.querySelector('.btn-hold');
var finalScore = document.querySelector('.final-score');
var dice = document.querySelector('.dice');

var score, currentScore, activePlayer, gameStatus, activePlayerPanel;

var init = function(){
    score = [0,0];
    currentScore = 0;
    activePlayer = 0;
    gameStatus = false;

    activePlayerPanel = document.querySelector('.player-' + activePlayer + '-panel');

    dice.style.display = 'none';
    document.querySelector('.player-0-panel .player-score').textContent = '0';
    document.querySelector('.player-0-panel .player-current-score').textContent = '0';
    document.querySelector('.player-1-panel .player-score').textContent = '0';
    document.querySelector('.player-1-panel .player-current-score').textContent = '0';
    document.querySelector('.player-0-panel .player-name').textContent = 'Player 1';
    document.querySelector('.player-1-panel .player-name').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    finalScore.disabled = false;
    finalScore.placeholder = 'Winner Score';
    finalScore.value = '';
};

var next = function(){
    activePlayerPanel.querySelector('.player-current-score').textContent = 0;
    activePlayerPanel.classList.remove('active');
    activePlayer = activePlayer == 0 ? 1 : 0;
    activePlayerPanel = document.querySelector('.player-' + activePlayer + '-panel');
    activePlayerPanel.classList.add('active');
    currentScore = 0;
    dice.style.display = 'none';
};

init(); 

btnRoll.addEventListener('click', function(){
    if (finalScore.value) {
        var randomNumber = Math.floor((Math.random() * 6) + 1);
        currentScore += randomNumber;
        dice.src = 'img/dice-' + randomNumber + '.png';
        gameStatus = true;
        dice.style.display = 'block';
        finalScore.disabled = true;

        if (randomNumber !== 1) {    
            activePlayerPanel.querySelector('.player-current-score').textContent = currentScore;
        } else {
            next();
        }   
    }else{
        finalScore.focus();
        finalScore.placeholder = 'Please Insert Winner Score';
    }


});


btnHold.addEventListener('click', function(){
    if (gameStatus) {
        var endGameScore = document.querySelector('.final-score').value;

        score[activePlayer] += currentScore;
        activePlayerPanel.querySelector('.player-score').textContent = score[activePlayer];
        
        activePlayerPanel.querySelector('.player-current-score').textContent = 0;
    
        if (score[activePlayer] >= +endGameScore) {
            activePlayerPanel.classList.remove('active');
            activePlayerPanel.classList.add('winner');
            dice.style.display = 'none';
            gameStatus = false;
            finalScore.placeholder = 'Winner Score';
            finalScore.value = '';
        } else {
            next();
        } 
    }
});

btnNew.addEventListener('click', function(){
    //document.location.reload();
    init()
});