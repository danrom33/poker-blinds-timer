from flask import Flask, jsonify
from flask_cors import CORS
from blinds_timer import *

app = Flask(__name__)
CORS(app)

@app.route("/")
def hello_world():
    return "Hello World"

@app.route("/start/small/<int:small_blind>/length/<int:round_minutes>")
def data_entered(small_blind, round_minutes):
    data = start(small_blind, round_minutes)
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
