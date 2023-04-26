import React, {useState} from 'react';
import CheckerPiece from './Checkerpiece.js';

function Checkerboard({yourTurn, boardState, onMove}) {
  const [selectedSquare, setSelectedSquare] = useState(null);
  const handleSquareClick = (row, col) => {
    if (yourTurn){
    const clickedPiece = boardState[row][col];
    if (selectedSquare && !clickedPiece) {
      onMove(selectedSquare, { row, col });
      setSelectedSquare(null);
    } else if (clickedPiece) {
      setSelectedSquare({ row, col });
    }
  }
  };

  const rows = 8;
  const cols = 8;

  const board = [];
  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < cols; j++) {
      const isWhite = (i % 2 === j % 2);

      const checkerPieceData = boardState[i][j];
      const checkerPiece = checkerPieceData ? (
        <CheckerPiece color={checkerPieceData.color} king={checkerPieceData.king}/>
      ) : null;

      row.push(
        <div
        className={`square ${i % 2 === j % 2 ? 'square-white' : 'square-black'}`}
          key={`${i},${j}`}
          onClick={() => handleSquareClick(i, j)}
        >
          {checkerPiece}
        </div>
      );
    }
    board.push(
      <div className="row" key={i}>
        {row}
      </div>
    );
  }

  return <div className="checkerboard">{board}</div>;
}

export default Checkerboard;

