import { Chessboard } from "react-chessboard";
import { useState, useRef } from "react";
import { Chess } from "chess.js";

function History({ onHistoryClick, verboseHistory }) {
    const items = verboseHistory.map((item, idx) => {
        const style = 'rounded-lg px-4 py-2 m-1 '
        const color = item.color === 'w' ? 'outline outline-black' : 'bg-black text-white'
        return <button class={style + color} onClick={() => onHistoryClick(idx)} key={idx}>{item.to}</button>
    })
    return (
        <div class='flex flex-row flex-nowrap h-full w-full'>
            <button class='bg-gray-100 hover:bg-gray-200 rounded-lg px-4 py-2 m-1' onClick={() => onHistoryClick(-1)}>Restart</button>
            {items}
        </div>
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

    function onHistoryClick(idx) {
        // if resetting game
        if (idx === -1) { game.reset() }
        // normal revert move
        else {
            while (game.history().length !== idx+1) {
                game.undo()
            }
        }
        setFen(game.fen())
    }

    return (
        <div class='flex flex-col justify-center items-center w-full h-full gap-y-4'>
            <div class='text-3xl font-bold mt-8'>Random Move vs. Random Move</div>
            <div class='w-1/3 h-1/3'>
                <Chessboard position={fen}/>
                {/* <PlayRandomMoveEngine /> */}
            </div>
            <div class='w-1/3 overflow-auto'>
                <History onHistoryClick={(fen) => {onHistoryClick(fen)}} verboseHistory={game.history({ verbose: true })}/>
            </div>
            <button 
                class='bg-gray-100 hover:bg-gray-200 px-10 py-2 rounded-lg'
                onClick={() => {handleRandomMove()}}
            >
                Next random move
            </button>
        </div>
    );
}