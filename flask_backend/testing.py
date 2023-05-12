from stockfish import Stockfish

fen = 'rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2'

stockfish = Stockfish('./stockfish')
stockfish.set_fen_position(fen)
print(stockfish.get_best_move())