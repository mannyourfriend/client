import React from 'react';

function CheckerPiece({ color, king }) {
    const pieceClasses = ['checker-piece', color, king ? 'king' : ''].join(' ');
    return <div className={pieceClasses}></div>;
}

export default CheckerPiece;