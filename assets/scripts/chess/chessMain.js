import { checkIfValid } from './chessMovement.js';

const gameBoard = document.querySelector("#gameboard")
const playerDisplay = document.querySelector("#player")
const infoDisplay = document.querySelector("#info-display")

const width = 8;
let playerGo = 'blackPiece'
playerDisplay.textContent = 'black'

const startPieces = 
[
    rook, knight, bishop, queen, king, bishop, knight, rook,
    pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn,
    '','','','','','','','',
    '','','','','','','','',
    '','','','','','','','',
    '','','','','','','','',
    pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn,
    rook, knight, bishop, queen, king, bishop, knight, rook,
]

const colorPresets = [
    { white: 'rgb(104, 119, 160)', black: 'rgb(80, 77, 109)' }, // Original Blueish
    { white: '#ebecd0', black: '#779556' },                   // Classic Green
    { white: '#f0d9b5', black: '#b58863' },                   // Wood / Brown
    { white: '#ffffff', black: '#808080' },                   // High Contrast Grey
    { white: '#ffce9e', black: '#d18b47' }                    // Burnt Orange
];

function applyRandomTheme() {
    const theme = colorPresets[Math.floor(Math.random() * colorPresets.length)];
    
    const root = document.documentElement;
    root.style.setProperty('--white-square', theme.white);
    root.style.setProperty('--black-square', theme.black);
}

function createBoard()
{
    applyRandomTheme();
    startPieces.forEach((startPiece, i) =>
    {
        const square = document.createElement('div')
        square.classList.add('square')
        square.innerHTML = startPiece;
        square.firstElementChild?.setAttribute('draggable', 'true');
        square.setAttribute('square-id', i.toString())
        const row = Math.floor((63 - i) / 8) + 1
        if(row % 2 === 0)
        {
            square.classList.add(i % 2 === 0 ? "white" : "black")
        }
        else
        {
            square.classList.add(i % 2 === 0 ? "black" : "white")
        }

        if(i <= 15)
        {
            square.firstElementChild.firstElementChild.classList.add('blackPiece');
        }
        else if(i >= 48)
        {
            square.firstElementChild.firstElementChild.classList.add('whitePiece');
        }
        gameBoard.append(square)
    })
}


createBoard();

let allSquares = document.querySelectorAll(".square")

allSquares.forEach(square => {
    square.addEventListener('dragstart', dragStart);
    square.addEventListener('dragover', dragOver);
    square.addEventListener('drop', (e) => {
        dragDrop(e);
        clearHighlights(); 
    });
    square.addEventListener('dragend', clearHighlights);
});

let startPositionId
let draggedElement

function dragStart(e) {
    const isCorrectPlayer = e.target.firstChild?.classList.contains(playerGo);

    if (!isCorrectPlayer) {
        e.preventDefault(); // Stop the drag from happening
        infoDisplay.textContent = `Wait! It is ${playerGo === 'whitePiece' ? 'white' : 'black'}'s turn.`;
        setTimeout(() => infoDisplay.textContent = "", 2000);
        return;
    }

    startPositionId = e.target.parentNode.getAttribute('square-id');
    draggedElement = e.target;
    
    const opponentGo = playerGo === 'whitePiece' ? 'blackPiece' : 'whitePiece';
    
    allSquares.forEach(square => {
        const isOccupied = square.firstChild;
        const takenByOpponent = square.firstElementChild?.firstElementChild?.classList.contains(opponentGo);
        const valid = checkIfValid(square, startPositionId, width, draggedElement);

        if (valid) {
            if (!isOccupied || takenByOpponent) {
                square.classList.add('valid-move');
                
                if (takenByOpponent) {
                    square.classList.add('contains-enemy');
                }
            }
        }
    });
}

function clearHighlights() {
    allSquares.forEach(square => {
        square.classList.remove('valid-move');
        square.classList.remove('contains-enemy');
    });
}

function dragOver(e)
{
    e.preventDefault()
}
function dragDrop(e)
{
    e.stopPropagation();
    const targetSquare = e.target.closest('.square');
    if (!targetSquare) return;

    const targetId = Number(targetSquare.getAttribute('square-id'));
    const opponentGo = playerGo === 'whitePiece' ? 'blackPiece' : 'whitePiece';

    const existingPiece = targetSquare.querySelector('.piece');
    const takenByOpponent = existingPiece?.firstChild?.classList.contains(opponentGo);
    
    const valid = checkIfValid(targetSquare, startPositionId, width, draggedElement);
    const correctGo = draggedElement.firstChild.classList.contains(playerGo);

    if(correctGo)
    {
        if(takenByOpponent && valid)
        {
            existingPiece.remove(); 
            targetSquare.append(draggedElement);
            checkForWin();
            changePlayer();
            return;
        }
        if(existingPiece && !takenByOpponent)
        {
            infoDisplay.textContent = "You cannot go here!"
            setTimeout(() => infoDisplay.textContent = "", 2000)
            return
        }
        if(valid)
        {
            targetSquare.append(draggedElement);
            checkForWin()
            changePlayer()
            return
        }
    }
}
function changePlayer()
{
    if(playerGo === "blackPiece")
    {
        reverseIds();
        playerGo = "whitePiece"
        playerDisplay.textContent = "white"
    }
    else
    {
        revertIds();
        playerGo = "blackPiece"
        playerDisplay.textContent = "black"
    }
}
function reverseIds()
{
    const allSquares = document.querySelectorAll(".square")
    allSquares.forEach((square, i) => {
        const newId = (width * width - 1) - i;
        square.setAttribute('square-id', newId.toString());
    });
}

function revertIds()
{
    const allSquares = document.querySelectorAll(".square")
    allSquares.forEach((square, i) => 
        square.setAttribute('square-id', i.toString()))
}

function checkForWin()
{
    const kings = Array.from(document.querySelectorAll('#king'))
    if(!kings.some(king => king.firstElementChild.classList.contains('whitePiece')))
    {
        infoDisplay.innerHTML = "Black player wins!"
        const allSquares = document.querySelectorAll('.square')
        allSquares.forEach(square => square.firstElementChild?.setAttribute('draggable', 'false'))
    }
    else if(!kings.some(king => king.firstElementChild.classList.contains('blackPiece')))
    {
        infoDisplay.innerHTML = "White player wins!"
        const allSquares = document.querySelectorAll('.square')
        allSquares.forEach(square => square.firstElementChild?.setAttribute('draggable', 'false'))
    }
}

const resetBtn = document.querySelector('#reset-btn'); 
//This puts this function on the reset button in the html
resetBtn.addEventListener('click', resetGame);
function resetGame() {
    gameBoard.innerHTML = '';
    
    playerGo = 'blackPiece';
    playerDisplay.textContent = 'black';
    infoDisplay.textContent = '';
    
    createBoard();
    
    const newSquares = document.querySelectorAll(".square");
    newSquares.forEach(square => {
        square.addEventListener('dragstart', dragStart);
        square.addEventListener('dragover', dragOver);
        square.addEventListener('drop', (e) => {
            dragDrop(e);
            clearHighlights(); 
        });
        square.addEventListener('dragend', clearHighlights);
    });

    allSquares = document.querySelectorAll(".square");
}