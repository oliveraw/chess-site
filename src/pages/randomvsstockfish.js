import { Chessboard } from "react-chessboard";
import { useState, useRef } from "react";
import { Chess } from "chess.js";
import { getStockfishMove } from '@/utils/stockfishMove';

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
    const [winner, setWinner] = useState(null)

    function handleRandomMove() {
        const moves = game.moves()
        const move = moves[Math.floor(Math.random() * moves.length)]
        game.move(move)
        setFen(game.fen())
    }
    function handleStockfishMove() {
        console.log('stocky stocky')
        fetch('/api/stockfish', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({fen: game.fen()}),
        })
            .then((res) => res.json())
            .then((data) => {
                const move = data.move
                game.move(move)
                setFen(game.fen())
            })
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

    function nextButton() {
        if (game.isInsufficientMaterial()) {
            return <p class='text-xl font-bold'>Drawn by Insufficient Material</p>
        }
        else if (game.isStalemate()) {
            return <p class='text-xl font-bold'>Stalemate</p>
        }
        else if (game.isThreefoldRepetition()) {
            return <p class='text-xl font-bold'>Drawn by Threefold Repetition</p>
        }
        else if (game.isCheckmate()) {
            if (game.turn() === 'w') {
                return <p class='text-xl font-bold'>Black wins!</p>
            } else {
                return <p class='text-xl font-bold'>White wins!</p>
            }
        }

        return (
            <button 
                class='bg-gray-100 hover:bg-gray-200 px-10 py-2 rounded-lg'
                onClick={() => {game.turn() === 'w' ? handleRandomMove() : handleStockfishMove()}}
            >
                Next move
            </button>
        )
    }

    return (
        <div class='flex flex-col justify-center items-center w-full h-full gap-y-4'>
            <div class='text-3xl font-bold mt-8'>Random Move (white) vs. Stockfish (black)</div>
            <div class='w-1/3 h-1/3'>
                <Chessboard position={fen}/>
            </div>
            <div class='w-1/3 overflow-auto'>
                <History onHistoryClick={(fen) => {onHistoryClick(fen)}} verboseHistory={game.history({ verbose: true })}/>
            </div>
            {nextButton()}
        </div>
    );
}

// function Stockfish() {
//     const [data, setData] = useState(null);
//     const [isLoading, setLoading] = useState(false);

//     useEffect(() => {
//         setLoading(true);
//         fetch('/api/stockfish', {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({fen: 'rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2'}),
//         })
//             .then((res) => res.json())
//             .then((data) => {
//                 console.log(data)
//                 setData(data)
//                 setLoading(false)
//             })
//     }, []);

//     if (isLoading) return <p>Loading...</p>;
//     if (!data) return <p>No profile data</p>;

//     return (
//         <div>
//             {/* <h1>{data.name}</h1>
//             <p>{data.about}</p> */}
//             <p>{data.move}</p>
//         </div>
//     );
// }