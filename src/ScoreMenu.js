import React, { Component } from 'react';
import { tetromino, colors, BLOCK_SIZE, TETROMINO_BLOCK, BLOCK_OUTLINE} from "./gameAssets";


class ScoreMenu extends Component {
  constructor(props) {
    super(props);
    this.intervalRender = null;
    // console.log(this.props.state.nextpiece)
  }

  state = {
    context: null,
    nextShape: null,
  }

  componentDidMount() {
    const context = this.refs.canvas.getContext('2d')
    this.setState({context: context})
    context.fillStyle = "cyan"
    // context.fillRect(85, 30, 30, 30)
    // context.fillRect(85, 55, 30, 30)
    // context.fillRect(85, 90, 30, 30)
    // context.fillRect(85, 125, 30, 30)
    // requestAnimationFrame(()=>{this.update()})
    console.log('in componentDidMount')
    // this.drawNextTetromino()
  }

  componentDidUpdate() {
    this.nextTetromino()
  }

  drawNextTetromino = ( x, y) => {
    let context = this.state.context
    context.fillRect()
  }

  nextTetromino = () => {
    if(this.props.state.playing) {
      this.renderNextTetromino()
    }
  }


  renderNextTetromino = () => {

    console.log('nextpiece', this.props.state.nextpiece, 'tetris' , tetromino);
    let context = this.state.context
    context.save()
    context.clearRect(0,0,200,200)

    let shape = tetromino[this.props.state.nextpiece]

    this.nextShape = [];
    for (let y = 0; y < 4; ++y) {
        this.nextShape[y] = [];
        for (let x = 0; x < 4; ++x) {
          console.log('currentshape', this.nextShape)
            let i = 4 * y + x;
            if (typeof shape[i] != undefined && shape[i]) {
                this.nextShape[y][x] = 0 + 1
            } else {
                this.nextShape[y][x] = 0;
            }
        }
        // console.log(shape);
        // debugger
    }


    context.fillStyle = 'red';
    context.strokeStyle = 'blue';
    for (let y = 0; y < 4; y++) {
      for (let x = 0; x < 4; ++x) {
        console.log('testing')
        // context.fillRect(85, 30 ,30, 30 )
        // console.log(this.props.state.nextpiece)
        // if (this.props.state.nextpiece[y][x]) {
        //   context.fillStyle = colors[this.this.props.state.nextpiece[y][x] - 1];
        //   this.props.drawBlock(this.currentX + x, this.currentY + y)
        // }
      }
    }
  }

  // update = () => {
  //   if(this.props.state.playing) {
  //   }
  //   requestAnimationFrame(() => {this.update()})
  // }

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
