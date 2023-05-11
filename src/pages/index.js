import { Chessboard } from "react-chessboard";
import { useState, useRef } from "react";
import { Chess } from "chess.js";

// function PlayRandomMoveEngine() {
//     const [game, setGame] = useState(new Chess());

//     function makeAMove(move) {
//         const gameCopy = { ...game };
//         const result = gameCopy.move(move);
//         setGame(gameCopy);
//         return result; // null if the move was illegal, the move object if the move was legal
//     }

//     function makeRandomMove() {
//         const possibleMoves = game.moves();
//         if (game.game_over() || game.in_draw() || possibleMoves.length === 0) return; // exit if the game is over
//         const randomIndex = Math.floor(Math.random() * possibleMoves.length);
//         makeAMove(possibleMoves[randomIndex]);
//     }

//     function onDrop(sourceSquare, targetSquare) {
//         const move = makeAMove({
//             from: sourceSquare,
//             to: targetSquare,
//             promotion: "q", // always promote to a queen for example simplicity
//         });

//         // illegal move
//         if (move === null) return false;
//         setTimeout(makeRandomMove, 200);
//         return true;
//     }

//     return (
//         <>
//             <Chessboard position={game.fen()} onPieceDrop={onDrop} />
//             <div class='flex flex-row justify-center items-center mt-4'>
//                 <button class='bg-gray-100 hover:bg-gray-200 px-10 py-2 rounded-lg'>Next random move</button>
//             </div>
//         </>
//     )
// }

function History({ onHistoryClick, verboseHistory }) {
    console.log('history', verboseHistory)
    const items = verboseHistory.map((item) => {
        <li onClick={() => onHistoryClick(item.after)}>item.to</li>
    })
    return (
        <ul class='flex flex-row'>
            {items}
        </ul>
    )
}

export default function Home() {
    const [game, setGame] = useState(new Chess())
    const [fen, setFen] = useState(game.fen())

    function handleRandomMove() {
        const moves = game.moves()
        const move = moves[Math.floor(Math.random() * moves.length)]
        game.move(move)
        setFen(game.fen())
    }

    function onHistoryClick(fen) {
        setFen(game.fen())
    }

    return (
        <div class='flex flex-col justify-center items-center w-full h-full'>
            <div class='w-1/3 h-1/3 pt-10'>
                <Chessboard position={fen}/>
                {/* <PlayRandomMoveEngine /> */}
            </div>
            <button 
                class='bg-gray-100 hover:bg-gray-200 px-10 py-2 rounded-lg mt-10'
                onClick={() => {handleRandomMove()}}
            >
                Next random move
            </button>
            <History onHistoryClick={(fen) => {onHistoryClick(fen)}} verboseHistory={game.history({ verbose: true })}/>
        </div>
    );
}