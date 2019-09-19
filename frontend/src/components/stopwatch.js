import React, { useContext, useState, useEffect } from "react";
import { TimeContext } from '../game.js';
import { useGameState } from '../gameContext.js';
import '../style/style.css';

/**
 * Stopwatch component, increments by 1 sec
 */
const Stopwatch = () => {
	const { setGameTime } = useContext(TimeContext);
	const restart = useGameState().restart;
	//const { restart } = useContext(GameContext);
	const initialTime = {
    hours: 0,
    minutes: 0,
    seconds: 0
	};

	var [time, setTime] = useState(initialTime);

	/**
	 * Restarts time when game restarts
	 */
	useEffect(() => {
		if (restart) {
			setTime(initialTime);
		}
	}, [restart]);

	/**
	 * Updates time every second
	 */
  useEffect(() => {
    let timerId = setInterval(tick, 1000); // tick every sec 
    return () => {
      clearInterval(timerId);
    };
  }, [time]);

	/**
	 * Change stopwatch state by 1 second 
	 */
  const tick = () => {
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

	/**
	 * Return string format
	 */
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

  return (
    <div className='stopwatch'>
      {formattedTime()}
    </div>
  );
};

export default Stopwatch;
