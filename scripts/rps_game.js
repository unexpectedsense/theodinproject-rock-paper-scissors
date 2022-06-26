console.log('Hello, welcome to the Game!');
let result = [];
const OptionsThrow = ['rock', 'paper', 'scissors'];

function computerPlay(){
    let rng = Math.floor(Math.random() * (3));
    return OptionsThrow[rng]
}

function playRound(playerSelection, computerSelection) {
    result.push(playerSelection + '|' + computerSelection);
    console.log(`You: ${playerSelection} | Computer: ${computerSelection}`);
}

function gammerPlay(){
    let flag = false;
    let playerTrow = prompt('Throw Player').toLowerCase();
    
    let checkFlag = (_throw)=>{
        flag = OptionsThrow.some(element => element === _throw);
    }

    checkFlag(playerTrow);

    while (!flag){
        playerTrow = prompt('Bad Throw... again').toLowerCase();
        checkFlag(playerTrow);
    }

    return playerTrow
}

function checkWinner(){
    if(result.length > 0){
        let playerScore = 0, machineScore = 0, tables = 0;
        let winnerByRound = result.map(element => {

            const [ player, machine ]  = element.split('|');
            switch(player){
                case 'paper':
                    if(machine === 'paper'     ){ tables++;         return 'table'   };
                    if(machine === 'rock'      ){ playerScore++;    return 'player'  };
                    if(machine === 'scissors'  ){ machineScore++;   return 'machine' };

                case 'rock':
                    if(machine === 'rock'      ){ tables++;         return 'table'   };
                    if(machine === 'scissors'  ){ playerScore++;    return 'player'  };
                    if(machine === 'paper'     ){ machineScore++;   return 'machine' };

                case 'scissors':
                    if(machine === 'scissors'  ){ tables++;         return 'table'   };
                    if(machine === 'paper'     ){ playerScore++;    return 'player'  };
                    if(machine === 'rock'      ){ machineScore++;   return 'machine' };
            }
        });

        console.log('winnerByRound: ', winnerByRound);

        if(playerScore === machineScore){ console.log('TABLAS!'); }
        else if(playerScore > machineScore){ console.log('The Winner is... PLAYER!'); }
        else{ console.log('The Winner is... MACHINE!'); }
    }
}

function game(){
    for (let i = 0; i < 5; i++) {
        playRound(gammerPlay(), computerPlay());
    }
    checkWinner();
}

game();


