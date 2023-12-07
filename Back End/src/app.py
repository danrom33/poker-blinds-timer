from flask import Flask, jsonify
from flask_cors import CORS
from blinds_timer import *

app = Flask(__name__)
CORS(app)

@app.route("/")
def hello_world():
    return "Hello World"

@app.route("/start/small/<value_small_blind>/length/<value_round_minutes>")
def data_entered(value_small_blind, value_round_minutes):
    try:
        small_blind = float(value_small_blind)
        round_minutes = float(value_round_minutes)
        data = start(small_blind, round_minutes)
        return jsonify(data)
    except InvalidInputError as e:
        return jsonify({"Error": str(e)})

@app.route("/newround")
def change_round():
    return new_round()

@app.route("/edit/<value_edit>")
def edit_length(value_edit):
    try:
        new_length = float(value_edit)
        return edit(new_length)
    except InvalidInputError as e:
        return jsonify({"Error": str(e)})

if __name__ == '__main__':
    app.run(debug=True)
