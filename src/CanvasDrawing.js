import React, { Component } from 'react';
// import InputManager from './InputManager'
import ScoreMenu from './ScoreMenu';
import Leaderboard from './Leaderboard';
import { tetromino, colors, BLOCK_SIZE, TETROMINO_BLOCK, BLOCK_OUTLINE} from "./gameAssets";

class CanvasDrawing extends Component {
  constructor(props) {
    super(props);
    this.columns = 10
    this.rows = 20;
    this.board = [];
    this.gameOver = null;
    this.interval = null;
    this.intervalRender = null;
    this.currentShape = null;
    this.currentX = null;
    this.currentY = null;
    this.freezed = null;
    this.randomPiece = [0,1,2,3,4,5,6]
  } // end of contructor.

  state = {
    context: null,
    lineCnt: 0,
    loopMusic: true,
    filledRow: false,
    nextpiece: null,
    playing: false,
    score: 0,
    statData: [],
    worldWidth: 300,
    worldHeight: 600,
  }

  // key presses should update the state of context.
  //tetrominos will not need to be in state because they will not be based off react.
  //they will be located in the constructor function this.
  // will need a funcation that starts the game.
  // the first thing this will do

  componentDidMount() {
    // this.state.input.bindKeys();
    const context = this.refs.canvas.getContext('2d')
    this.setState({context: context})
    document.onkeydown = (e) => {
      let keys = {
          37: 'left',
          39: 'right',
          40: 'down',
          38: 'rotate',
          32: 'drop',
          65: 'left',
          68: 'right',
          87: 'rotate',
          83: 'drop',
          13: 'rotate'
      };
      if (typeof keys[e.keyCode] != undefined) {
        // console.log(typeof keys[e.keyCode]);
          if (this.state.playing)
            this.keyPress(keys[e.keyCode]);
          // render();
      }
    } // end of key press handler

    this.props.getUserData()  // fetching for the stat data.
    this.passUpStats()  // passing up state of scores to App.
    requestAnimationFrame(()=>{this.update()})
  }

  update = () => {
    // console.log(this.state.input.pressedKeys)
    if (this.state.startGame) {
      // this.keyPress()
    }
    requestAnimationFrame(() => {this.update()})
  }

  // fix Grid maybe implement?
  // drawBoard = () => {
  //   let context = this.state.context
  //   let bw = 300;
  //   let bh = 600;
  //   let p = 0;
  //   // let cw = bw + (p*2) + 1;
  //   // let ch = bh + (p*2) + 1;
  //       for (let x = 0; x <= bw; x += 29) {
  //           context.moveTo(0.5 + x + p, p);
  //           context.lineTo(0.5 + x + p, bh + p);
  //       }
  //
  //       // for (let x = 0; x <= bh; x += 28) {
  //       //     context.moveTo(p, 0.5 + x + p);
  //       //     context.lineTo(bw + p, 0.5 + x + p);
  //       // }
  //
  //       context.strokeStyle = "#9e9e9e78";
  //       context.stroke();
  //   }

  drawBlock = (x, y) => {
    let context = this.state.context
    context.fillRect(BLOCK_SIZE * x, BLOCK_SIZE * y, TETROMINO_BLOCK, TETROMINO_BLOCK) // controls the postion (x,y) and the width and height of the tetrominos
    // context.strokeStyle = '#717171'
    context.strokeRect(BLOCK_SIZE * x, BLOCK_SIZE * y, BLOCK_OUTLINE, BLOCK_OUTLINE)
  }

  renderWorld = () => {
    let context = this.state.context
    context.save()
    context.globalAlpha = 1;
    // clearing board to black.
    context.clearRect(0,0, 300, 600)
    // this.drawBoard()

    // draws the board with the tetrominos that have been frozen in place.
    context.strokeStyle = 'black'
    for (let x = 0; x < this.columns; ++x) {
      for (let y = 0; y < this.rows; ++y) {
        if(this.board[y][x]) {
          context.fillStyle = colors[this.board[y][x] - 1]
          this.drawBlock(x, y)
        }
      }
    }
    // draws each tetromnio as they fall.
    context.fillStyle = 'red';
    context.strokeStyle = 'black';
    for (let y = 0; y < 4; y++) {
      for (let x = 0; x < 4; ++x) {
        if (this.currentShape[y][x]) {
          context.fillStyle = colors[this.currentShape[y][x] - 1];
          this.drawBlock(this.currentX + x, this.currentY + y)
        }
      }
    }
    context.restore()
    // console.log(this.board)
  } // end of renderWolrd function.

  clearAllIntervals(){
    clearInterval(this.interval);
    clearInterval(this.intervalRender);
    // console.log(this.intervalRender, this.interval);
  }


  clearBoard() {
    for (let y = 0; y < this.rows; ++y) {
        this.board[y] = [];
        for (let x = 0; x < this.columns; ++x) {
            this.board[y][x] = 0;
        }
    }
  }
  shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
       let j = Math.floor(Math.random() * (i + 1));
       // debugger
       [array[i], array[j]] = [array[j], array[i]]
    }
    console.log(array);
    return array
  }

  nextPiece() {
    let nextpiece = this.randomPiece[this.randomPiece.length - 1]
    if (nextpiece !== undefined) {
      this.setState({
        nextpiece: nextpiece
      }, () => console.log(this.state.nextpiece))
    }
  }

  newShape() {
    if (this.randomPiece.length === 0) {
      this.randomPiece = [0,1,2,3,4,5,6]
      this.shuffle(this.randomPiece)
      // console.log(this.randomPiece)
    }
    let random = this.randomPiece.pop()
    // console.log(this.randomPiece);
    // let nextpiece = this.randomPiece[this.randomPiece.length - 1]
    // if (nextpiece !== undefined) {
    //   this.setState({
    //     nextpiece: nextpiece
    //   }, () => console.log(this.state.nextpiece))
    // }
    let shape = tetromino[random]; // random for color filling

    this.currentShape = [];
    for (let y = 0; y < 4; ++y) {
        this.currentShape[y] = [];
        for (let x = 0; x < 4; ++x) {
          // console.log('newshape', x);
          // console.log(shape);
            let i = 4 * y + x;
            if (typeof shape[i] != undefined && shape[i]) {
                this.currentShape[y][x] = random + 1;
            } else {
                this.currentShape[y][x] = 0;
            }
        }
        // console.log(shape);
        // debugger
    }
    // console.log(currenst);
    // new tetromino starts to move
    this.nextPiece()
    this.freezed = false;
    // position where the shape will spawn on canvas
    this.currentX = 4;
    this.currentY = 0;
  }

  valid(offsetX, offsetY, newCurrent=this.currentShape) {
    let context = this.state.context
    offsetX = offsetX || 0;
    offsetY = offsetY || 0;
    offsetX = this.currentX + offsetX;
    offsetY = this.currentY + offsetY;
    for (let y = 0; y < 4; ++y) {
        for (let x = 0; x < 4; ++x) {
            if (newCurrent[y][x]) {
                if (typeof this.board[y + offsetY] == 'undefined'
                  || typeof this.board[y + offsetY][x + offsetX] == 'undefined'
                  || this.board[y + offsetY][x + offsetX]
                  || x + offsetX < 0
                  || y + offsetY >= this.rows
                  || x + offsetX >= this.columns) {
                    if (offsetY === 1 && this.freezed) {
                        this.gameOver = true; // gameOver if the current shape is at the top row
                        this.props.stopMusic()
                        this.props.gameOverSound()
                        this.passUpStats()
                        this.props.getUserData()
                        this.setState ({
                          playing: false
                        })
                        // console.log(this.state.context);
                        // music can stop here.
                        context.globalAlpha = .5
                        context.fillRect(0,0,300,600)
                        // this.delayScreenClear()
                        document.querySelector('#playbutton').disabled = false;
                        document.querySelector('.gameOver').style.visibility = "visible"
                        document.querySelector('.initial-input').style.visibility = "visible"
                    }
                    return false;
                }
            }
        }
    }
    return true;
  }


  calculateScore = (lineCnt) => {
    switch(lineCnt) {
      // if line count is x: 1 return 40
      case 1:
        return 40
      case 2:
        return (40 * 2.5)
      case 3:
        return (100 * 3)
      case 4:
        return (300 * 4)
      default:
        return null
    }
  }

  clearLines() {
    let context = this.state.context
    let numLinesCleared = 0
    for (let y = this.rows - 1; y >= 0; --y) {
        let rowFilled = true;
      for (let x = 0; x < this.columns; ++x) {
        if (this.board[y][x] === 0) {
            rowFilled = false;
            // break;
        }
      }
      // will try to add a red blinking line before cleared.
      if (rowFilled) {
        // let filledRow = this.board[19]
        this.setState({
          filledRow: true
        })
        numLinesCleared += 1
        for (let curRow = y; curRow > 0; --curRow) {
              // console.log(oldrow);
          for (let x = 0; x < this.columns; ++x) {
              this.board[curRow][x] = this.board[curRow - 1][x];
          }
        }
          // put sound for line clear here!
          this.props.lineClearSound()
          ++y;
      } // end of if rowFilled
    }
    this.setState({
      lineCnt: this.state.lineCnt + numLinesCleared,
      score: this.state.score + this.calculateScore(numLinesCleared)
    }) // end of first for loop
  }

  canMove = () => {
    if (this.valid(0, 1)) {
        ++this.currentY;
    }
    else {
        this.freeze();
        this.valid(0, 1);
        this.clearLines();
        if (this.gameOver) {
            this.clearAllIntervals();
            return false;
        }
        this.newShape();
    }
  }

  freeze() {
  for (let y = 0; y < 4; ++y) { // y is the loop for each row in the board
      for (let x = 0; x < 4; ++x) { // x is loop for each element in the tetromino piece.
        // debugger
          if (this.currentShape[y][x]) {
            // console.log(this.currentShape[y][x]);
            // console.log(this.board[y + this.currentY][x + this.currentX]);
              this.board[y + this.currentY][x + this.currentX] = this.currentShape[y][x];
          }
      }
  }
    this.freezed = true;
    this.props.playFallSound()
  }

  keyPress = (key) => {
    // console.log('hello');
    switch (key) {
      case 'left':
          if (this.valid(-1)) {
              --this.currentX;
          }
          break;
      case 'right':
          if (this.valid(1)) {
              ++this.currentX;
          }
          break;
      case 'down':
          if (this.valid(0, 1)) {
              ++this.currentY;
          }
          break;
      case 'rotate':
          let rotated = this.rotate(this.currentShapecurrentShape);
          if (this.valid(0, 0, rotated)) {
              this.currentShape = rotated;
          }
          break;
      case 'drop':
          while(this.valid(0, 1)) {
              ++this.currentY;
          }
          this.canMove();
          break;

    }
  }

  rotate(current) {
  // console.log(current);
  let newCurrent = [];
  for (let y = 0; y < 4; ++y) {
      newCurrent[y] = [];
      for (let x = 0; x < 4; ++x) {
        // console.log(current[x][y]);
          newCurrent[y][x] = this.currentShape[3 - x][y];
      }
  }
  // console.log(newCurrent);
  return newCurrent;
}

  startGame = () => {
    // this function start the game and allow the board to be created
    // it will also fire other funcations that will allow the tetrominos to start falling.
    // console.log('In Start Game', this.state.startGame);
    this.setState({
      playing: true,
      score: 0,
      lineCnt: 0
    }/*,() => console.log(this.state)*/)
    this.intervalRender = setInterval(this.renderWorld, 30);
    this.clearBoard();
    this.newShape();
    this.gameOver = false;
    this.interval = setInterval(this.canMove, 500);
    // console.log(this.intervalRender, this.interval);
    // console.log(this.board);
  }


/************************* Click Handler ********************************/
  playGameHandler = () => {
    // console.log('in playGameHandler');
    this.startGame();
    this.props.play()
    document.querySelector('.gameOver').style.visibility = "hidden"
    document.querySelector('.initial-input').style.visibility = "hidden"
    document.querySelector('.leaderboard').style.visibility = "hidden"
    document.querySelector('#playbutton').disabled = true
  }
/**********************************************************************/

/************************* Score Logic *********************************/
  sortScore = () => {
    let sorted = this.props.statData.sort((a,b) => {
      return b.high_score - a.high_score
    })
    return sorted
  }

  topScore = () => {
    return this.sortScore()[0]
  }

  topTen = () => {
    return this.sortScore().slice(0,10)
  }

  passUpStats = () => {
    let stats = {
      line: this.state.lineCnt,
      score: this.state.score
    }
    // console.log(stats);
    this.props.getStats(stats)
  }

/**********************************************************************/

  render() {
    return (
      <React.Fragment>
        <ScoreMenu state={this.state} appState={this.props.state}/>
        <div className="tetris" onKeyDown={(e) => console.log(e.key)}>
          <div className="top-score">
            <ul id="top-score-list">
              <li>Initial:<span id="initials">{this.topScore() ? this.topScore().initials : '###'}</span></li>
              <li id="high-score"> High Score:<span className="hi-score">{this.topScore() ? this.topScore().high_score : "0"}</span></li>
              <li id="high-line"> Lines:<span className="hi-score">{this.topScore() ? this.topScore().line_clear : "0"}</span></li>
            </ul>
          </div>
          <Leaderboard scores={this.topTen() ? this.topTen() : null} />
          <canvas id="world" ref="canvas" width={this.state.worldWidth} height={this.state.worldHeight}></canvas>
          <button id="playbutton" onClick={() => this.playGameHandler()}>Play Drop A Block!</button>
          <button className="soundbuttons" onClick={() => this.props.play()}>Start Music</button>
          <button className="soundbuttons" onClick={(e) => this.props.pause(e)}>Pause Music</button>
        </div>
      </React.Fragment>
    );
  }

}

export default CanvasDrawing;
