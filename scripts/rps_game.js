console.log('Hello, welcome to the Game!');
let result = [];
const OptionsThrow = ['rock', 'paper', 'scissors'];

const audio = document.querySelector("audio");

const scoreData = {
    player: 0,
    machine: 0,
    tables: 0,
    setGameTo: function(who){ this[who]++; },
    winner: function(){
        let result = Object.entries(this)
        .filter(item =>{
            if(typeof item[1] !== 'function' ) return item;
        })
        .reduce((acc, current) =>{
            if(typeof current[1] === 'number' && current[1] > acc[1]){
                acc = current;
            }
            return acc;
        });

        const [ name, score] = result;
 
        if( name != 'tables' && score >= 5){
            audio.play();
            paperBt.setAttribute('disabled', '');
            rockBt.setAttribute('disabled', '');
            scissorsBt.setAttribute('disabled', '');
            return {continue: false, best:'The Winner is...: ' + name + 'the SCORE is: ' + score}
        }else{
            return {continue: true, best: name}
        }
    }
}

function computerPlay(){
    let rng = Math.floor(Math.random() * (3));
    return OptionsThrow[rng]
}

function ui_playRound(playerSelection, computerSelection) {
    // result.push(playerSelection + '|' + computerSelection);
    const thisGame = playerSelection + '|' + computerSelection
    console.log(`You: ${playerSelection} | Computer: ${computerSelection}`);
    lastGameVisor.innerHTML = `<b>You: &nbsp;</b><i>${playerSelection}</i>  &nbsp; &nbsp;| &nbsp;&nbsp; Computer: &nbsp;<i> ${computerSelection}</i>`;

    
    const theRound = ui_checkWinnerRound(thisGame);
    console.log('theRound', theRound)
    scoreData.setGameTo(theRound);

    refreshScores(theRound);

    console.log(scoreData.winner());
}

function refreshScores(roundWinner){
    switch(roundWinner){
        case 'player':
            playerScore.dataset.score = playerScore.dataset.score + 1;
            playerScore.parentNode.children[0].textContent = Number(playerScore.parentNode.children[0].textContent) + 1;
            break;

        case 'table':
            tableScore.dataset.score = tableScore.dataset.score + 1;
            tableScore.parentNode.children[0].textContent = Number(tableScore.parentNode.children[0].textContent) + 1;
            break;

        case 'machine':
            machineScore.dataset.score = machineScore.dataset.score + 1;
            machineScore.parentNode.children[0].textContent = Number(machineScore.parentNode.children[0].textContent) + 1;
            break;
    }
}

function ui_checkWinnerRound(_thisGame){
    const [ player, machine ]  = _thisGame.split('|');
    switch(player){
        case 'paper':
            if(machine === 'paper'     ){ return 'table'   };
            if(machine === 'rock'      ){ return 'player'  };
            if(machine === 'scissors'  ){ return 'machine' };

        case 'rock':
            if(machine === 'rock'      ){ return 'table'   };
            if(machine === 'scissors'  ){ return 'player'  };
            if(machine === 'paper'     ){ return 'machine' };

        case 'scissors':
            if(machine === 'scissors'  ){ return 'table'   };
            if(machine === 'paper'     ){ return 'player'  };
            if(machine === 'rock'      ){ return 'machine' };
    }
}

let paperBt = document.querySelector('.paper-bt');
let rockBt = document.querySelector('.rock-bt');
let scissorsBt = document.querySelector('.scissors-bt');

paperBt.addEventListener('click', function(e) {
    ui_playRound(e.target.dataset.trow, computerPlay());
});

rockBt.addEventListener('click', function(e) {
    ui_playRound(e.target.dataset.trow, computerPlay());
});

scissorsBt.addEventListener('click', function(e) {
    ui_playRound(e.target.dataset.trow, computerPlay());
});


let playerScore = document.querySelector('.name.player');
let tableScore = document.querySelector('.name.table');
let machineScore = document.querySelector('.name.machine');

let lastGameVisor = document.querySelector('.last-game');

let resetBt = document.querySelector('.btn.reset');

resetBt.addEventListener('click', function(e) {
    paperBt.removeAttribute('disabled', '');
    rockBt.removeAttribute('disabled', '');
    scissorsBt.removeAttribute('disabled', '');
    scoreData.player = scoreData.tables = scoreData.machine = 0;
    playerScore.parentNode.children[0].textContent = tableScore.parentNode.children[0].textContent = machineScore.parentNode.children[0].textContent = 0;
    playerScore.dataset.score = tableScore.dataset.score = playerScore.dataset.score = 0;
});