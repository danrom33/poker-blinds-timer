import time as t
from timer import Timer, clear_screen

curr_small = 0
curr_big = 0
round = -1
round_time = -1

def start(small_blind, round_length):
        global curr_small, curr_big, round, round_time
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
     round += 1
     curr_small *= 2
     curr_big *= 2
     return({
            "smallBlind": curr_small,
            "bigBlind": curr_big,
            "roundLength": round_time,
            "roundNumber": round
     })


if __name__ == '__main__':
    reenter = 1
    #Get User Inputs
    small_blind = -1
    big_blind = -1
    while reenter:
        # Use the function to clear the screen
        clear_screen()
        small_blind = int(input("Enter the starting small blind value:\n"))
        big_blind = small_blind*2
        timing = int(input("Enter the length of each round in minutes:\n"))
        print(f"\r\nStarting Small Blind:\tR{small_blind}.00\nStarting Big Blind:\tR{big_blind}.00\nLength of each round:\t{timing} minutes")
        response = input(f"Would you like to edit these values (Y/N)?").upper()
        reenter = 1 if response == 'Y' else 0
    total_seconds = timing * 60
    input("Press Enter when you are ready to begin")
    timer_thread = Timer(seconds=total_seconds, small_blind=small_blind, big_blind=big_blind)
    timer_thread.start()
    while timer_thread.is_alive():
        choice = input("").lower()
        if choice == 'p':
            timer_thread.pause_timer()
        elif choice == 'r':
            timer_thread.resume_timer()
        if choice == 'q':
            timer_thread.stop_timer()