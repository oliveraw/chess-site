import ChessBoard from 'next-chess-board'
import { useRef } from 'react'

export default () => {
    let board = <ChessBoard size={400} moveValidator={true}/>

    return (
        <div class='flex flex-col justify-center items-center'>
            {board}
        </div>
    )
}