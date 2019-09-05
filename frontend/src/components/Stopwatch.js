import React, { createContext, useState, useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import GameContext from "../gameContext.js";

const Stopwatch = props => {
  var [paused, setPaused] = useState(false);
  var [time, setTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // let one second pass
  const tick = () => {
    if (paused) {
      // do nothing if paused
      return;
    }
    var newHours = time.hours;
    var newMinutes = time.minutes;
    var newSeconds = time.seconds + 1;
    if (newSeconds == 60) {
      setTime({
        hours: time.hours,
        minutes: time.minutes + 1,
        seconds: 0
      });
      newSeconds = 0;
      newMinutes += 1;
    }
    if (newMinutes == 60) {
      newMinutes = 0;
      newHours += 1;
    }
    setTime({
      hours: newHours,
      minutes: newMinutes,
      seconds: newSeconds
    });
  };

  const reset = () => {
    setTime({
      hours: 0,
      minutes: 0,
      seconds: 0
    });
    setPaused(false);
  };

  // takes in int time component
  const padTime = timeComponent => {
    return timeComponent.toString().padStart(2, "0");
  };

  const formattedTime = () => {
    var formattedHours = padTime(time.hours);
    var formattedMinutes = padTime(time.minutes);
    var formattedSeconds = padTime(time.seconds);
    var timeString = `${formattedHours}: ${formattedMinutes}: ${formattedSeconds}`;
    props.setGameTime(timeString);
    return timeString;
  };

  useEffect(() => {
    let timerId = setInterval(tick, 1000); // tick every 1000ms
    return () => {
      clearInterval(timerId);
    };
  });

  const renderStopwatch = () => {
    return (
      <div>
        <p>{formattedTime()}</p>
        <button onClick={() => setPaused(!paused)}>
          {paused ? "Resume" : "Pause"}
        </button>
      </div>
    );
  };
  return (
    <div>
      <p>Time </p>
      {renderStopwatch()}
    </div>
  );
};

export default Stopwatch;
