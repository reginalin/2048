import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";

export function Stopwatch() {
  var [paused, setPaused] = useState(false);
  var [time, setTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // let one second pass
  function tick() {
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
  }

  function reset() {
    setTime({
      hours: 0,
      minutes: 0,
      seconds: 0
    });
    setPaused(false);
  }

  // takes in int time component
  function padTime(timeComponent) {
    return timeComponent.toString().padStart(2, "0");
  }

  function formattedTime() {
    var formattedHours = padTime(time.hours);
    var formattedMinutes = padTime(time.minutes);
    var formattedSeconds = padTime(time.seconds);
    return `${formattedHours}: ${formattedMinutes}: ${formattedSeconds}`;
  }

  useEffect(() => {
    let timerId = setInterval(tick, 1000); // tick every 1000ms
    return () => {
      clearInterval(timerId);
    };
  });

  function renderStopwatch() {
    return (
      <div>
        <p>{formattedTime()}</p>
        <button onClick={() => setPaused(!paused)}>
          {paused ? "Resume" : "Pause"}
        </button>
      </div>
    );
  }
  return (
    <div>
      <p>Time </p>
      {renderStopwatch()}
    </div>
  );
}

export default { Stopwatch };
