import React, { Component } from 'react';


class ScoreMenu extends Component {

  state = {
    context: null,
  }

  componentDidMount() {
    const context = this.refs.canvas.getContext('2d')
    this.setState({context: context})
    context.fillStyle = "cyan"
    // context.fillRect(85, 20, 30, 30)
    // context.fillRect(85, 55, 30, 30)
    // context.fillRect(85, 90, 30, 30)
    // context.fillRect(85, 125, 30, 30)
  }

  renderNextTetromino = () => {
    let context = this.state.context
    context.save()
    context.clearRect(0,0,200,200)
  }
  update = () => {
    if(this.props.state.playing) {

    }
    requestAnimationFrame(() => {this.update()})
  }

  render() {
    return (
      <React.Fragment>
        <div className="menu">
          <p id="click-to-play">Click Play Drop A Block button to Start!
          </p>
            <p id="instructions">Controls:</p>
              <ul id="list">
                <li>WASD or Arrow keys to move</li>
                <li>Up Arrow key to Rotate or Enter</li>
                <li>Space to drop peice</li>
              </ul>
          <p className="small-margin">Score:
            <span id="score"> {this.props.state.score}</span>
          </p>
          <p className="small-margin">Lines Cleared:
            <span id="lines"> {this.props.state.lineCnt}</span>
          </p>
          <div id="next-piece">
            <p className="small-margin">
              Next Piece:
            </p>
            <canvas ref="canvas" width={200} height={200} style={{margin: 0}}></canvas>
          </div>
        </div>
      </React.Fragment>
    )
  }

} // end of ScoreMenu class

export default ScoreMenu;
