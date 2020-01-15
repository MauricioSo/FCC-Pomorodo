import "./App.css";

import React, { Component } from "react";

import Session from "./clock";
import BreakController from "./break-controller";
import ButtonSession from "./button-session";
import SessionController from "./session-controller";
import lessThanTen from "./less-than-ten";
import "font-awesome/css/font-awesome.min.css";
//main stateful component

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minutes: 25,
      seconds: "00",
      breakTime: 5,
      sessionTime: 25,
      sessionOn: true,
      play: false
    };
    this.timerOn = this.timerOn.bind(this);
    this.decreaseSession = this.decreaseSession.bind(this);
    this.increaseSession = this.increaseSession.bind(this);
    this.decreaseBreak = this.decreaseBreak.bind(this);
    this.increaseBreak = this.increaseBreak.bind(this);
    this.reset = this.reset.bind(this);
  }

  //methods for control the session length
  decreaseSession() {
    if (this.state.play === false && this.state.sessionTime > 1) {
      this.setState(state => {
        return {
          sessionTime: state.sessionTime - 1,
          minutes:
            this.state.sessionOn === true
              ? lessThanTen(state.sessionTime, "decrease")
              : state.minutes
        };
      });
    }
  }
  increaseSession() {
    if (this.state.play === false && this.state.sessionTime < 60) {
      this.setState(state => {
        return {
          sessionTime: state.sessionTime + 1,
          minutes:
            this.state.sessionOn === true
              ? lessThanTen(state.sessionTime, "increase")
              : state.minutes
        };
      });
    }
  }

  //methods for control the break
  decreaseBreak() {
    if (this.state.play === false && this.state.breakTime > 1) {
      this.setState(state => {
        return {
          breakTime: state.breakTime - 1,
          minutes:
            this.state.sessionOn === false
              ? lessThanTen(state.sessionTime, "decrease")
              : state.minutes
        };
      });
    }
  }

  increaseBreak() {
    if (this.state.play === false && this.state.breakTime < 60) {
      this.setState(state => {
        return {
          breakTime: state.breakTime + 1,
          minutes:
            this.state.sessionOn === false
              ? lessThanTen(state.breakTime, "increase")
              : state.minutes
        };
      });
    }
  }
  //method for iniciate the interval
  timerOn() {
    this.play = this.state.play;
    if (this.play === false) {
      this.interval = setInterval(this.timer.bind(this), 1000);
      this.setState(state => {
        return { play: !state.play };
      });
    } else if (this.play === true) {
      clearInterval(this.interval);
      this.setState(state => {
        return { play: !state.play };
      });
    }
  }

  //method for
  timer() {
    this.setState(state => {
      if (state.seconds === "00") {
        if (state.minutes === "00") {
          this.audioBeep.play();
          if (state.sessionOn) {
            return {
              minutes: lessThanTen(state.breakTime, "not"),
              seconds: "00",
              sessionOn: false
            };
          } else {
            return {
              minutes: lessThanTen(state.sessionTime, "not"),
              seconds: "00",
              sessionOn: true
            };
          }
        } else {
          return {
            minutes: lessThanTen(state.minutes, "decrease"),
            seconds: 59
          };
        }
      } else {
        return { seconds: lessThanTen(state.seconds, "decrease") };
      }
    });
  }

  reset() {
    this.setState(state => {
      return {
        minutes: 25,
        seconds: "00",
        breakTime: 5,
        sessionTime: 25,
        sessionOn: true,
        play: false
      };
    });
    clearInterval(this.interval);
    this.audioBeep.pause();
    this.audioBeep.currentTime = 0;
  }
  render() {
    const play = this.state.play;
    const sessionOn = this.state.sessionOn;
    let iconPlayBtn;
    let titleClock;
    //condition for change the title of the clock
    if (play) {
      iconPlayBtn = <i className="fa fa-pause"></i>;
    } else {
      iconPlayBtn = <i className="fa fa-play"></i>;
    }
    if (sessionOn) {
      titleClock = <h1>Session</h1>;
    } else {
      titleClock = <h1>Break</h1>;
    }
    return (
      <div className="container">
        <h1>Pomodoro Clock</h1>
        <div className="inner-wrapper">
          <div className="panel-controller">
            <SessionController
              onDecrease={this.decreaseSession}
              onIncrease={this.increaseSession}
              value={this.state.sessionTime}
            />
            <BreakController
              onDecrease={this.decreaseBreak}
              breakTime={this.state.breakTime}
              onIncrease={this.increaseBreak}
            />
          </div>
          <div container-clock>
            <Session
              idTitle="timer-label"
              minutes={this.state.minutes}
              title={titleClock}
              seconds={this.state.seconds}
            />

            <div className="panel-btn">
              <button id="start_stop" className="btn" onClick={this.timerOn}>
                {iconPlayBtn}
              </button>
              <button id="reset" className="btn" onClick={this.reset}>
                <i className="fa fa-undo"></i>
              </button>
            </div>
          </div>
        </div>
        <audio
          id="beep"
          preload="auto"
          src="https://actions.google.com/sounds/v1/alarms/beep_short.ogg"
          ref={audio => {
            this.audioBeep = audio;
          }}
        />
      </div>
    );
  }
}

export default App;
