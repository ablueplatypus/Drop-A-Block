import React, {Component} from 'react';
import  CanvasDrawing from './CanvasDrawing'

class ScoreMenu extends Component {



  render() {
    console.log(this.props);
    return (
      <div className="menu">
        <p id="click-to-play">Click Play Tetris button to Start!
        </p>
          <ul id="instructions">Controls:
            <li>WASD or Arrow keys to move</li>
            <li>Up Arrow key to Rotate or Enter</li>
            <li>Space to drop peice</li>
          </ul>
        <p className="small-margin">Score:
          <span id="score"> 0</span>
        </p>
        <p className="small-margin">Lines:
          <span id="lines"> 0</span>
        </p>
      </div>
    )
  }


} // end of ScoreMenu class

export default ScoreMenu;
