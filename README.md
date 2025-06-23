# Poker Blinds Timer
This web application is to serve as a tool to automate the timing of blinds in a poker game. After setting the relevant information on the home page - such as initial amount for small blind as well as the length of each round, you can begin the game.

The small and big blind amounts will be displayed, along with a countdown showing how long is remaining in the round. Once the countdown has reached 0, a beep will be played, the blinds will be adjusted, and the countdown will start again.

## Installation
To install and begin using this project, first run the following command to clone the repo into a directory of your choosing

`
git clone https://github.com/danrom33/poker-blinds-timer.git
`

You will then need to install the dependencies for both the front end and the back end

### Front-End Dependencies
Navigate to the 'Front End'/poker_blinds_timer folder and run

`
npm install
`

### Back-End Dependencies
Navigate to the 'Back End'/src folder and run

`
pip install flask
pip install flask_cors
`

## Running 

To begin running the back end server, navigate to the 'Back End'/src folder and run the python script using
`
python app.py
`

To begin running the front-end, bavigate to the 'Front End'/poker_blinds_timer folder and run
`
npm run dev
`
This willl begin runnnig a development server on your localhost:3000. Access this on an internet browser to begin using the program
