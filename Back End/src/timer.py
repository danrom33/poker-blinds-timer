import threading
import sys
import os
import winsound
import time as t

class Timer(threading.Thread):
    def __init__(self, seconds, small_blind, big_blind, round=1):
        threading.Thread.__init__(self)
        self.round_length = seconds
        self.remaining_seconds = seconds
        self.minutes = int(seconds / 60)
        self.seconds = seconds%60
        self.small_blind = small_blind
        self.big_blind = big_blind
        self.round = round
        self.is_running = threading.Event()
        self.is_running.set()
        self.is_paused = threading.Event()

    def run(self):
        #Configure audio
        freq = 1000
        duration = 1000
        self.show_round()
        while self.remaining_seconds > 0 and self.is_running.is_set():
            if not self.is_paused.is_set():
                self.show_timer()
                self.remaining_seconds -= 1
                self.minutes = int(self.remaining_seconds /60)
                self.seconds = self.remaining_seconds % 60
        if self.is_running.is_set():
            winsound.Beep(frequency=freq, duration=duration)
            self.round+=1
            self.small_blind *= 2
            self.big_blind *=2
            self.remaining_seconds = self.round_length
            self.minutes = int(self.remaining_seconds/60)
            self.run()
        else:
            sys.exit()
    
    def show_timer(self):
        time = "Time Remaining:\t{:02d}:{:02d}".format(self.minutes, self.seconds)
        sys.stdout.write("\r" + time)
        sys.stdout.flush()
        t.sleep(1)

    def show_round(self):
        clear_screen()
        print(f"Press 'p' and enter to pause,'r' and enter to resume, 'q' and enter to quit\nRound:\t{self.round}\nSmall Blind:\t{self.small_blind}\nBig Blind:\t{self.big_blind}")

    def pause_timer(self):
        self.is_paused.set()

    def resume_timer(self):
        self.is_paused.clear()
        self.show_round()
        self.show_timer()

    def stop_timer(self):
        self.is_running.clear()

def clear_screen():
    os.system('cls' if os.name == 'nt' else 'clear')