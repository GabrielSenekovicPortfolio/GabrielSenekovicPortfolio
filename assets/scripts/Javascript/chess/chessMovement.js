export function checkIfValid(target, startPositionId, width, draggedElement)
{
    const piece = draggedElement.id;

    switch(piece)
    {
        case 'pawn' :
            return checkIfPawnMoveValid(target, startPositionId, width); 
        case 'knight' : 
            return checkIfKnightMoveValid(target, startPositionId, width);
        case 'king' : 
            return checkIfKingMoveValid(target, startPositionId, width);
        case 'rook' :
            return checkIfRookMoveValid(target, startPositionId, width);
        case 'bishop' :
            return checkIfBishopMoveValid(target, startPositionId, width);
        case 'queen' :
            return checkIfQueenMoveValid(target, startPositionId, width);
    }
}

function checkIfPawnMoveValid(target, startPositionId, width)
{
    const targetId = Number(target.getAttribute('square-id')) || Number(target.parentNode.getAttribute('square-id'))
    const startId = Number(startPositionId);
    const startRow = [8,9,10,11,12,13,14,15]
    const targetSquare = document.querySelector(`[square-id="${targetId}"]`);

    if(startId + width - 1 === targetId && document.querySelector(`[square-id="${startId + width - 1}"]`).firstChild ||
        startId + width + 1 === targetId && document.querySelector(`[square-id="${startId + width + 1}"]`).firstChild)
    {
        if(targetSquare.firstChild)
        {
            return true
        }
    }
    if(startRow.includes(startId) && startId + width * 2 === targetId ||
        startId + width === targetId)
    {
        if(!targetSquare.firstChild)
        {
            return true
        }
    }
}
function checkIfKnightMoveValid(target, startPositionId, width)
{
    const targetId = Number(target.getAttribute('square-id')) || Number(target.parentNode.getAttribute('square-id'))
    const startId = Number(startPositionId);
    if(
        startId + width * 2 + 1 === targetId ||
        startId + width * 2 - 1 === targetId ||
        startId + width - 2 === targetId ||
        startId + width + 2 === targetId ||
        startId - width * 2 + 1 === targetId ||
        startId - width * 2 - 1 === targetId ||
        startId - width - 2 === targetId ||
        startId - width + 2 === targetId 
    )
    {
        return true;
    }
}
function checkIfKingMoveValid(target, startPositionId, width)
{
    const targetId = Number(target.getAttribute('square-id')) || Number(target.parentNode.getAttribute('square-id'))
    const startId = Number(startPositionId)
    const start_x = Math.trunc(Math.abs(startId) % width)
    const start_y = Math.trunc(Math.abs(startId) / width)
    const target_x = Math.trunc(Math.abs(targetId) % width)
    const target_y = Math.trunc(Math.abs(targetId) / width)
    const diff_x = Math.abs(Number(target_x - start_x))
    const diff_y = Math.abs(Number(target_y - start_y))
    return (diff_x === 0 || diff_x === 1) && (diff_y === 0 || diff_y === 1)
}
function checkIfQueenMoveValid(target, startPositionId, width)
{
    return checkIfRookMoveValid(target, startPositionId, width) || checkIfBishopMoveValid(target, startPositionId, width)
}
function checkIfRookMoveValid(target, startPositionId, width)
{
    //Check if target is straight from start
    const targetId = Number(target.getAttribute('square-id')) || Number(target.parentNode.getAttribute('square-id'))
    const startId = Number(startPositionId)
    const start_x = Math.trunc(Math.abs(startId) % width)
    const start_y = Math.trunc(Math.abs(startId) / width)
    const target_x = Math.trunc(Math.abs(targetId) % width)
    const target_y = Math.trunc(Math.abs(targetId) / width)
    const diff_x = Number(target_x - start_x)
    const diff_y = Number(target_y - start_y)
    const isStraight = (diff_x === 0 || diff_y == 0)
    //Now make sure there are no pieces between the target and start
    if(isStraight)
    {
        const distance = Math.max(Math.abs(diff_x), Math.abs(diff_y));
        for(let i = 1; i < distance; i++)
        {
            const checking_x = start_x + i * Math.sign(diff_x)
            const checking_y = start_y + i * Math.sign(diff_y)
            const checkingId = checking_y * width + checking_x
            if(document.querySelector(`[square-id="${checkingId}"]`)?.firstChild)
            {
                return false
            }
        }
        return true
    }
    return false
}
function checkIfBishopMoveValid(target, startPositionId, width)
{
    //Check if target is diagonal from start
    const targetId = Number(target.getAttribute('square-id')) || Number(target.parentNode.getAttribute('square-id'))
    const startId = Number(startPositionId)
    const start_x = Math.trunc(Math.abs(startId) % width)
    const start_y = Math.trunc(Math.abs(startId) / width)
    const target_x = Math.trunc(Math.abs(targetId) % width)
    const target_y = Math.trunc(Math.abs(targetId) / width)
    const diff_x = Number(target_x - start_x)
    const diff_y = Number(target_y - start_y)
    const isDiagonal = Math.abs(diff_x) === Math.abs(diff_y)
    //Now make sure there are no pieces between the target and start
    if(isDiagonal)
    {
        const distance = Math.max(Math.abs(diff_x), Math.abs(diff_y));
        for(let i = 1; i < distance; i++)
        {
            const checking_x = start_x + i * Math.sign(diff_x)
            const checking_y = start_y + i * Math.sign(diff_y)
            const checkingId = checking_y * width + checking_x
            if(document.querySelector(`[square-id="${checkingId}"]`)?.firstChild)
            {
                return false
            }
        }
        return true
    }
    return false
}