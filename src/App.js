import React, { useEffect } from "react";
import "./App.css";
import Checkerboard from "./components/Checkerboard";
// import useSocket from "./useSocket";
import io from 'socket.io-client';
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Leaderboard from "./components/Leaderboard";
import Matchmaker from "./components/Matchmaker"

const socket = io('http://ec2-18-224-82-33.us-east-2.compute.amazonaws.com:5000');

function App() {
    const [turn, setTurn] = React.useState(false);
    const [board, setBoard] = React.useState(createInitialBoard());
    const [username, setUsername] = React.useState("");

    useEffect(() => {
        socket.on('match_found', enforceGame)
    }, [])

    const handleMove = (from, to) => {
        const newBoard = movePiece(board, from, to);
        if (newBoard!== board){
            setBoard(newBoard);
            setTurn(false);
            socket.emit("move", { board: newBoard });
            
        }
      };

    const joinMatchmaking = () => {
    if (username!=null) {
        socket.emit("join_matchmaking", username);
    } 
    else {
        alert("Please log in before joining matchmaking.");
    }
    };
    function enforceGame(stuff) {
        createInitialBoard();
        if (stuff["player1"]===username){
            setTurn(true);
        }
        let gameOver = false;
        while (!gameOver){
            
            // emit move to other guy
            // check is game is over
            // set turn to red
        }
        
    }
    
    function createInitialBoard() {
        const rows = 8;
        const cols = 8;
        const board = [];
      
        for (let i = 0; i < rows; i++) {
          const row = [];
          for (let j = 0; j < cols; j++) {
            const isWhite = i % 2 === j % 2;
      
            let checkerPiece = null;
            if (!isWhite) {
              if (i < 3) {
                checkerPiece = { color: 'red', king:false };
              } else if (i > 4) {
                checkerPiece = { color: 'black', king:false };
              }
            }
            row.push(checkerPiece);
          }
          board.push(row);
        }
        return board;
      }
    
      function movePiece(board, from, to) {
        const newBoard = [...board.map(row => [...row])];
        const piece = newBoard[from.row][from.col];
        console.log("hi")
      
        const rowDiff = from.row - to.row;
        const colDiff = from.col - to.col;
        console.log("rowDiff:"+ rowDiff + "colDiff:"+colDiff)
        let capturedRow;
        let capturedCol;
        // Check if the move is legal
        let isLegalMove = false;
        console.log("isKing" + piece.king)
        if (piece.color === 'red') {
          if (piece.king) {
            isLegalMove = (Math.abs(rowDiff)===1) && (Math.abs(colDiff) === 1);
          } else {
            isLegalMove = rowDiff === -1 && Math.abs(colDiff) === 1;
          }
        }
        if (piece.color === 'black') {
          if (piece.king) {
            isLegalMove = (Math.abs(rowDiff)===1) && (Math.abs(colDiff) === 1);
          } else {
            isLegalMove = rowDiff === 1 && Math.abs(colDiff) === 1;
          }
        }
        console.log("isLegalMove:"+isLegalMove);
        // Check if the move is a legal capture
        let isLegalCapture = false;
        if (!isLegalMove && (Math.abs(rowDiff)===2 && Math.abs(colDiff)===2)) {
            capturedRow = (from.row + to.row) / 2;
            capturedCol = (from.col + to.col) / 2;
            const capturedPiece = newBoard[capturedRow][capturedCol];
            console.log(capturedPiece)
          if (capturedPiece!==null && capturedPiece.color !== piece.color) {
            if (piece.color === 'red') {
              if (piece.king) {
                isLegalCapture = (Math.abs(rowDiff)===2) && (Math.abs(colDiff) === 2);
              } else {
                isLegalCapture = rowDiff === -2 && Math.abs(colDiff) === 2;
              }
            }
            if (piece.color === 'black') {
              if (piece.king) {
                isLegalCapture = (Math.abs(rowDiff)===2) && (Math.abs(colDiff) === 2);
              } else {
                isLegalCapture = rowDiff === 2 && Math.abs(colDiff) === 2;
              }
            }
          }
        }
        console.log("isLegal" + isLegalMove + isLegalCapture)
        console.log("row:"+to.row);
        if (isLegalMove || isLegalCapture) {
          // Move the piece
          newBoard[to.row][to.col] = piece;
          newBoard[from.row][from.col] = null;
      
          // Remove the captured piece, if any
          if (isLegalCapture) {
            newBoard[capturedRow][capturedCol] = null;
          }
      
          // Check if the piece should be kinged
          if (
            (!piece.king && piece.color === 'black' && to.row === 0) ||
            (!piece.king && piece.color === 'red' && to.row === 7)
          ) {
            piece.king = true;
          }
        } else {
          // If the move is not legal, return the original board
          return board;
        }
      
        return newBoard;
      }

  return (
    <div className="App">
        <div className="interface">
            <p className="username-display">Logged in as: {username || 'Guest'}</p>
            <Leaderboard />
            <button onClick={joinMatchmaking}>Join Matchmaking</button>
            <div className="forms">
                <LoginForm onLogin={setUsername} />
                <RegisterForm onRegister={setUsername} />
            </div>
            <div className="checkerboard-container">
                <Checkerboard turn={turn} boardState={board} onMove={handleMove}/>
            </div>
        </div>
    </div>
  );
}

export default App;

