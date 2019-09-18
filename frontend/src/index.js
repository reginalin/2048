import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker'; 
import { useBackendScores } from './scoresAPI.js';
import { DIRECTION } from './constants.js';
import { Game } from './game.js';
import { TopScoresDisplay } from './components/scores.js';
import './style/style.css';

const App = () => {
	const topScores = useBackendScores();
  return (
			<div className='container'>
				<div className='leftContainer'> 
					<div className='header'>
						<h1>2048</h1>
						<div> 
							<p className='subheader'>Merge the tiles to get to 2048!</p>
						</div>
					</div>
					<Game pressed={useKeyPress()}/> 
					<div className='footer'>
						<h3>Directions</h3>
						<p>Use vim keys (h: left, k: up, j: down, l: right)</p>
						<p>Try to move fast without filling up the board!</p>
					</div>
				</div>
				<div className='rightContainer'>
					<div id='scoresHeader'>
						<h2>High Scores</h2>
							<TopScoresDisplay scores={topScores}/>
					</div>
				</div>
			</div>
  );
};

/**
 * Key press handler mapping vim keys to directions
 */
const useKeyPress = () => {
  const [keyPressed, setKeyPressed] = useState({ direction: null });

  const downHandler = ({ key }) => {
    let pressed = null;
    switch (key) {
      case 'k':
        pressed = DIRECTION.UP;
        break;
      case 'j':
        pressed = DIRECTION.DOWN;
        break;
      case 'h':
        pressed = DIRECTION.LEFT;
        break;
      case 'l':
        pressed = DIRECTION.RIGHT;
        break;
      default:
        pressed = null;
        break;
    }
    setKeyPressed({ direction: pressed });
  };

  useEffect(() => {
    window.addEventListener('keydown', downHandler);

    return () => {
      window.removeEventListener('keydown', downHandler);
    };
  }, []);
  return keyPressed;
};

// ========================================
ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.unregister()
