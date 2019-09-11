import React, { useContext, useState, useEffect } from "react";
import { TimeContext } from '../index.js'

const Stopwatch = () => {
	const { setGameTime } = useContext(TimeContext);

  var [paused, setPaused] = useState(false);
  var [time, setTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // let one second pass
  const tick = () => {
    if (paused) {
      return;
    }
    var newHours = time.hours;
    var newMinutes = time.minutes;
    var newSeconds = time.seconds + 1;

    if (newSeconds === 60) {
      setTime({
        hours: time.hours,
        minutes: time.minutes + 1,
        seconds: 0
      });
      newSeconds = 0;
      newMinutes += 1;
    }
    if (newMinutes === 60) {
      newMinutes = 0;
      newHours += 1;
    }
    setTime({
      hours: newHours,
      minutes: newMinutes,
      seconds: newSeconds
    });
  };

  const padTime = timeComponent => {
    return timeComponent.toString().padStart(2, "0");
  };

  const formattedTime = () => {
    var formattedHours = padTime(time.hours);
    var formattedMinutes = padTime(time.minutes);
    var formattedSeconds = padTime(time.seconds);
    var timeString = 
			`${formattedHours}: ${formattedMinutes}: ${formattedSeconds}`;
		setGameTime(timeString);
    return timeString;
  };

  useEffect(() => {
    let timerId = setInterval(tick, 1000); // tick every sec 
    return () => {
      clearInterval(timerId);
    };
  }, [time]);

  return (
    <div className='stopwatch'>
      <p>{formattedTime()}</p>
			<button className='pauseButton' onClick={() => setPaused(!paused)}>
				{paused ? "Resume" : "Pause"}
			</button>
    </div>
  );
};

export default Stopwatch;
