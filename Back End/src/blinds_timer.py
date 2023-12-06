import time as t
from timer import Timer, clear_screen

def start(small_blind, round_length):
        big_blind = small_blind*2
        now = t.time()
        return({
             "small_blind": small_blind,
             "big_blind": big_blind,
             "round_length": round_length*60,
             "timestamp": now
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