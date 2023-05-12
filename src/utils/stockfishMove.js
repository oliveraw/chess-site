// export async function getStockfishMove(fen) {
//     fetch('/api/stockfish', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({fen: fen}),
//     })
//         .then((res) => res.json())
//         .then((data) => {
//             console.log('here', data, data.move)
//             return data.move
//         })
//     // returns null if api isn't working or sum
//     // return null
// }