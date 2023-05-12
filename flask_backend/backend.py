from flask import Flask, request
from stockfish import Stockfish

app = Flask(__name__)
stockfish = Stockfish('./stockfish')

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/chess")
def chess():
    return "<p>Testing page</p>"

# GET requests will be blocked
@app.route('/stockfish', methods=['POST'])
def stockfish_move():
    request_data = request.get_json()
    fen = request_data['fen']
    stockfish.set_fen_position(fen)
    best_move = stockfish.get_best_move()

    print('here', fen, best_move)
    response_body = {
        "name": "Nagato",
        "about" : "Hello! I'm a full stack developer that loves python and javascript",
        "move": best_move
    }
    return response_body