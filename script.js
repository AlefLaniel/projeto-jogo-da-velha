// Dados iniciais
let square = {
    a1: '', a2: '', a3: '',
    b1: '', b2: '', b3: '',
    c1: '', c2: '', c3: ''
};
let player= '';
let warning = '';
let playing = false;

reset();

// Eventos
document.querySelector('.reset').addEventListener('click', reset);
document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', itemClick);
});

// Funções
function itemClick(event) {
    let item = event.target.getAttribute('data-item');
    if (playing && square[item] === '') {
        square[item] = player;
        renderSquare();
        togglePlayer();
    }
}

function reset() {
    warning = '';

    let random = Math.floor(Math.random() * 2);
    player = (random === 0) ? 'x' : 'o';

    for (const i in square) {
       square[i] = '';
    }
    playing = true;

    document.querySelector('.jogador1 img').setAttribute('src', '/images/pessoa.png');
    document.querySelector('.jogador2 img').setAttribute('src', '/images/pessoa.png');
    renderSquare();
    renderInfo();
    removeanimationW();
}

function renderSquare() {
    for(let i in square){
        let item = document.querySelector(`div[data-item=${i}]`);
        item.innerHTML  = square[i];
    }

    checkGame();
}

function renderInfo() {
    document.querySelector('.vez').innerHTML = player;
    document.querySelector('.resultado').innerHTML = warning;
    
    if (player === 'x') {
        document.querySelector('.jogador2 img').setAttribute('src', '/images/esperando.png');
        document.querySelector('.jogador1 img').setAttribute('src', '/images/pessoa.png');
        checkGame();
    }
    if(player === 'o'){
        document.querySelector('.jogador1 img').setAttribute('src', '/images/esperando.png');
        document.querySelector('.jogador2 img').setAttribute('src', '/images/pessoa.png');
        checkGame();
    }
}

function togglePlayer() {
    player = (player === 'x') ? 'o' : 'x';
    renderInfo();
}

function checkGame() {
    if (checkWinnerFor('x')) {
        warning = 'O "x" venceu';
        playing = false;
        document.querySelector('.jogador1 img').setAttribute('src', '/images/ganhou.png');
        document.querySelector('.jogador2 img').setAttribute('src', '/images/perdeu.png');
        animationWin()
    }else if (checkWinnerFor('o')) {
        warning = 'O "o" venceu';
        playing = false; 
        document.querySelector('.jogador1 img').setAttribute('src', '/images/perdeu.png');
        document.querySelector('.jogador2 img').setAttribute('src', '/images/ganhou.png');
        animationWin();
    }else if (isFull()) {
        warning = 'Deu empate';
        playing = false;
        document.querySelector('.jogador1 img').setAttribute('src', '/images/pessoa.png');
        document.querySelector('.jogador2 img').setAttribute('src', '/images/pessoa.png');
        animationWin()
    }
}

function checkWinnerFor(player) {
    let pos = [
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',

        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',

        'a1,b2,c3',
        'c1,b2,a3',
    ]; 

    for (let w in pos){
        let pArray = pos[w].split(',');
        let hasWon = pArray.every(option => square[option] === player);
        if (hasWon) {
            return true;
        }
    }

    return false;
}

function isFull() {
    for (const i in square) {
        if(square[i] === ''){
            return false;
        }
    }

    return true;
}

function animationWin() {
    document.querySelector('.jogador1 img').style.animationDuration = '3s';
    document.querySelector('.jogador1 img').style.animationName = 'slideinS';
    document.querySelector('.jogador1 img').style.animationIterationCount = 'infinite';
    document.querySelector('.jogador1 img').style.animationDirection = 'alternate';

    document.querySelector('.jogador2 img').style.animationDuration = '3s';
    document.querySelector('.jogador2 img').style.animationName = 'slideinS';
    document.querySelector('.jogador2 img').style.animationIterationCount = 'infinite';
    document.querySelector('.jogador2 img').style.animationDirection = 'alternate';


}

function removeanimationW() {
    document.querySelector('.jogador1 img').style.animationDuration = 'none';
    document.querySelector('.jogador1 img').style.animationName = 'none';
    document.querySelector('.jogador1 img').style.animationIterationCount = 'none';
    document.querySelector('.jogador1 img').style.animationDirection = 'none';

    document.querySelector('.jogador2 img').style.animationDuration = 'none';
    document.querySelector('.jogador2 img').style.animationName = 'none';
    document.querySelector('.jogador2 img').style.animationIterationCount = 'none';
    document.querySelector('.jogador2 img').style.animationDirection = 'none';
}