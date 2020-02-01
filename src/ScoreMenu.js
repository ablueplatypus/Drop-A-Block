import React, { Component } from 'react';
import { tetromino, colors, HEIGHT_WIDTH, NEXTSHAPE_SIZE} from "./gameAssets";


class ScoreMenu extends Component {

  state = {
    context: null,
    nextShape: null,
  }

  componentDidMount() {
    const context = this.refs.canvas.getContext('2d')
    this.setState({context: context})
  }

  componentDidUpdate() {
    this.nextTetromino()
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
    // console.log(shape, 'random piece' ,this.props.randomPiece)

    this.nextShape = [];
    for (let y = 0; y < 4; ++y) {
        this.nextShape[y] = [];
        for (let x = 0; x < 4; ++x) {
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
        if(this.nextShape[y][x]) {
          this.updateColor(this.props.state.nextpiece)
          // drawing the pieces
          context.fillRect(NEXTSHAPE_SIZE * x + 40, NEXTSHAPE_SIZE * y + 50, HEIGHT_WIDTH, HEIGHT_WIDTH)
          //tetrominos have a black outline - draws outline
          context.strokeRect(NEXTSHAPE_SIZE * x + 40, NEXTSHAPE_SIZE * y + 50,  HEIGHT_WIDTH, HEIGHT_WIDTH)
        }
      }
    }
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
