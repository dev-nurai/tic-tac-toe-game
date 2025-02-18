import { useState } from 'react';

import Player from './components/Player.jsx';
import GameBoard from './components/GameBoard.jsx';
import Log from './components/Log.jsx';
import GameOver from './components/GameOver.jsx';
import { WINNING_COMBINATIONS } from './winning-combinations.js';

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2'
};

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X';

  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }

  return currentPlayer;
}

function deriveGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map((array) => [...array])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  return gameBoard;
}

function deriveWinner(gameBoard, players) {
  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  }

  return winner;
}

function App() {
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];

      return updatedTurns;
    });
  }

  function handleRestart() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: newName
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === 'X'}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            initialName={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === 'O'}
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;

// import { useState } from "react";
// import GameBoard from "./components/GameBoard";
// import Player from "./components/Player";
// import Log from "./components/Log";
// import { WINNING_COMBINATIONS } from './winning-combinations';
// import GameOver from "./components/GameOver";

// const initialGameBoard = [
//   [null, null, null],
//   [null, null, null],
//   [null, null, null]
// ];

// function deriveActivePlayer(gameTurns) {
//   let currentPlayer = 'X';

//   if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
//     currentPlayer = 'O';
//   }
//   return currentPlayer;
// }

// function App() {
//   const [players, setPlayers] = useState({
//     'X': 'Player 1',
//     'O': 'Player 2'
//   });
//   const [gameTurns, setGameTurns] = useState([]);
//   // const [ activePlayer, setActivePlayer ] = useState("X");

//   const activePlayer = deriveActivePlayer(gameTurns);

//   let gameBoard = [...initialGameBoard.map(array => [...array])];

//   for (const turn of gameTurns) {
//     const { square, player } = turn;
//     const { row, col } = square;

//     gameBoard[row][col] = player;
//   }

//   let winner;

//   for (const combination of WINNING_COMBINATIONS) {
//     const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
//     const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
//     const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

//     if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
//       winner = players[firstSquareSymbol];
//     }
//   }

//   console.log("turns", gameTurns);
//   const hasDraw = gameTurns.length === 9 && !winner;

//   function handleSelectSquare(rowIndex, colIndex) {
//     // setActivePlayer((curActivePlayer) => curActivePlayer === 'X' ? 'O' : 'X');
//     setGameTurns((prevTurns) => {
//       const currentPlayer = deriveActivePlayer(prevTurns);
//       const updateturns = [
//         { square: { row: rowIndex, col: colIndex }, player: currentPlayer }
//       ]

//       return updateturns;
//     });
//   };

//   function handleRestart() {
//     setGameTurns([]);
//   }

//   function handlePlayerNameChange(symbol, newName) {
//     setPlayers(prevPlayers => {
//       return {
//         ...prevPlayers,
//         [symbol]: newName
//       };
//     });
//   }

//   return (
//     <main>
//       <div id="game-container">
//         <ol id="players" className="highlight-player">
//           <Player
//             initialName='Player 1'
//             symbol='X'
//             isActive={activePlayer === "X"}
//             onChangeName={handlePlayerNameChange}
//           />
//           <Player
//             initialName='Player 2'
//             symbol='O'
//             isActive={activePlayer === "O"}
//             onChangeName={handlePlayerNameChange}
//           />
//         </ol>
//         {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart} />}
//         <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
//       </div>
//       <Log turns={gameTurns} />
//     </main>
//   );
// }

// export default App;
