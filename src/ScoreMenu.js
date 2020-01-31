import React, { Component } from 'react';
import { tetromino, colors, HEIGHT_WIDTH, NEXTSHAPE_SIZE} from "./gameAssets";


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


  updateColor = (tetromino) => {
    let context = this.state.context
    switch (tetromino) {
      case 0:
        return context.fillStyle = colors[0]
      case 1:
        return context.fillStyle = colors[1]
      case 2:
        return context.fillStyle = colors[2]
      case 3:
        return context.fillStyle = colors[3]
      case 4:
        return context.fillStyle = colors[4]
      case 5:
        return context.fillStyle = colors[5]
      case 6:
        return context.fillStyle = colors[6]
        break;
      default:
        return "something went wrong"
    }
  }


  renderNextTetromino = () => {

    // console.log('nextpiece', this.props.state.nextpiece, 'tetris' , tetromino);
    let context = this.state.context
    context.save()
    context.clearRect(0,0,200,200)

    let shape = tetromino[this.props.state.nextpiece]

    this.nextShape = [];
    for (let y = 0; y < 4; ++y) {
        this.nextShape[y] = [];
        for (let x = 0; x < 4; ++x) {
          // console.log('currentshape', this.nextShape)
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

    context.fillStyle = 'gray';
    context.strokeStyle = 'black';
    for (let y = 0; y < 4; ++y) {
      for (let x = 0; x < 4; ++x) {
        // console.log('testing', this.nextShape)
        if(this.nextShape[y][x]) {
          this.updateColor(this.props.state.nextpiece)
          context.fillRect(NEXTSHAPE_SIZE * x + 40, NEXTSHAPE_SIZE * y + 50, HEIGHT_WIDTH, HEIGHT_WIDTH)
          context.strokeRect(NEXTSHAPE_SIZE * x + 40, NEXTSHAPE_SIZE * y + 50,  HEIGHT_WIDTH, HEIGHT_WIDTH)
        }
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
