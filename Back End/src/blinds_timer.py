import time as t
from timer import Timer, clear_screen
import winsound

curr_small = 0
curr_big = 0
round = -1
round_time = -1

class InvalidInputError(Exception):
     pass

def start(small_blind, round_length):
        global curr_small, curr_big, round, round_time
        if not isinstance(small_blind, (int, float)) or small_blind <= 0:
            raise InvalidInputError("Small blind must be a positive number.")
        if not isinstance(round_length, (int, float)) or round_length <= 0:
            raise InvalidInputError("Round length must be a positive number.")
        big_blind = small_blind*2
        curr_small = small_blind
        curr_big = big_blind
        round = 1
        round_time = round_length*60
        return({
             "smallBlind": small_blind,
             "bigBlind": big_blind,
             "roundLength": round_time,
             "roundNumber" : round
        })

def new_round():
     global round, curr_small, curr_big, round_time
     freq = 1000
     duration = 1000
     winsound.Beep(frequency=freq, duration=duration)
     round += 1
     curr_small *= 2
     curr_big *= 2
     return({
            "smallBlind": curr_small,
            "bigBlind": curr_big,
            "roundLength": round_time,
            "roundNumber": round
     })

def edit(new_value):
     global round_time
     if not isinstance(new_value, (int, float)) or new_value <= 0:
            raise InvalidInputError("Round length must be a positive number.")
     round_time = new_value*60
     return "Success"