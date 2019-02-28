import React, { Component } from 'react';
// import InputManager from './InputManager'

class CanvasDrawing extends Component {
  constructor() {
    super();
    this.columns = 10
    this.rows = 20;
    this.board = [];
    this.gameOver = null;
    this.interval = null;
    this.intervalRender = null;
    this.current = null;
    this.currentX = null;
    this.currentY = null;
    this.freezed = null;
    this.points = 0;
    this.tetromino = [
        [1, 1, 1, 1],

        [1, 1, 1, 0,
         1],

        [1, 1, 1, 0,
         0, 0, 1],

        [1, 1, 0, 0,
         1, 1],

        [1, 1, 0, 0,
         0, 1, 1],

        [0, 1, 1, 0,
         1, 1],

        [0, 1, 0, 0,
         1, 1, 1]
    ]
    this.colors = [
      'cyan', 'orange', 'blue', 'yellow', 'red', 'green', 'magenta'
    ];

    this.randomPiece = [0,1,2,3,4,5,6]
  } // end of contructor.
  //Class for Tetromino
  //Class contains:
  ////-Type of Tetromino (maybe subclass)
  ////-Position of tetromino
  ////-Last time tetromino dropped
  ////-Drop speed
  ////-Update function
  ////--Should modify all instance variables according to game logic
  ////--Check the time since the last time the tetromino dropped, and if it's the right amount of time, drop the tetromino
  ////--if (Date.now-this.lastdrop > this.speed)
  ////-Render function
  ////--Should render the instance on the canvas based on its current instance variables

  state = {
    worldWidth: 300,
    worldHeight: 600,
    startGame: false,
    context: null,
    // input: new InputManager(),
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
    // console.log(this.state.pressedKeys);
    // context.fillRect(0,0,this.state.worldWidth, this.state.worldHeight)
    // context.fillStyle = 'cyan'
    // context.fillRect(0,0,30,30)
    // context.fillRect(32,0,30,30)
    // context.fillRect(64,0,30,30)
    // context.fillRect(96,0,30,30)
    document.body.onkeydown = (e) => {
      let keys = {
          37: 'left',
          39: 'right',
          40: 'down',
          38: 'rotate',
          32: 'drop'
      };
      if (typeof keys[e.keyCode] != undefined) {
        // console.log(typeof keys[e.keyCode]);
          this.keyPress(keys[e.keyCode]);
          // render();
      }
    };
    requestAnimationFrame(()=>{this.update()})
  }

  update = () => {
    // console.log(this.state.input.pressedKeys)
    if (this.state.startGame) {
    }
    requestAnimationFrame(() => {this.update()})
  }

  componentWillUnmount() {
    // this.state.input.unbindKeys();
  }



  drawBlock = (x, y) => {
    this.state.context.fillRect(30 * x, 30 * y, 30 - 1, 30 - 1)
    this.state.context.strokeRect(30 * x, 30 * y, 30 - 1, 30 - 1)
  }


  renderWorld = () => {
    this.state.context.save()
    this.state.context.clearRect(0,0, 300, 600)
    //
    this.state.context.strokeStyle = 'black'
    for (let x = 0; x < this.columns; ++x) {
      for (let y = 0; y < this.rows; ++y) {
        if(this.board[y][x]) {
          this.state.context.fillStyle = this.colors[this.board[y][x] - 1]
          this.drawBlock(x, y)
        }
      }
    }
    this.state.context.fillStyle = 'red';
    this.state.context.strokeStyle = 'black';
    for (let y = 0; y < 4; y++) {
      for (let x = 0; x < 4; ++x) {
        if (this.current[y][x]) {
          this.state.context.fillStyle = this.colors[this.current[y][x] - 1];
          this.drawBlock(this.currentX + x, this.currentY + y)
        }
      }
    }
    this.state.context.restore()
    // console.log(this.board)
  } // end of renderWolrd function.

  clearAllIntervals(){
    clearInterval(this.interval);
    clearInterval(this.intervalRender);
    console.log(this.intervalRender, this.interval);
  }


  clearBoard() {
    for (let y = 0; y < this.rows; ++y) {
        this.board[y] = [];
        for (let x = 0; x < this.columns; ++x) {
            this.board[y][x] = 0;
        }
    }
  }
  shuffel(array) {
    if (this.randomPiece.length === 0) {
      this.randomPiece = [0,1,2,3,4,5,6]
    }
    for (let i = array.length - 1; i > 0; i--) {
       let j = Math.floor(Math.random() * (i + 1));
       [array[i], array[j]] = [array[j], array[i]]
    }
    return array
  }

  newShape() {
    // let min = 0;
    // let max = 7;
    this.shuffel(this.randomPiece)
    let random = this.randomPiece.pop()
    let shape = this.tetromino[random]; // random for color filling
    // console.log('length', tetromino.length);
    // for (let i = 0; i < lastRandom.length; i++) {
    //   if (lastRandom[i] === random) {
    //     random = ramdom - 1
    //   }
    // }
    // console.log(lastRandom);
    this.current = [];
    for (let y = 0; y < 4; ++y) {
        this.current[y] = [];
        for (let x = 0; x < 4; ++x) {
          // console.log('newshape', x);
          // console.log(shape);
            let i = 4 * y + x;
            if (typeof shape[i] != undefined && shape[i]) {
                this.current[y][x] = random + 1;
            } else {
                this.current[y][x] = 0;
            }
        }
        // console.log(shape);
        // debugger
    }
    // console.log(currenst);
    // new tetromino starts to move
    this.freezed = false;
    // position where the shape will spawn on canvas
    this.currentX = 4;
    this.currentY = 0;
  }

  valid(offsetX, offsetY, newCurrent=this.current) {
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
                    if (offsetY == 1 && this.freezed) {
                        this.gameOver = true; // gameOver if the current shape is at the top row
                        document.querySelector('#playbutton').disabled = false;
                    }
                    return false;
                }
            }
        }
    }
    return true;
  }

  clearLines() {
    for (let y = this.rows - 1; y >= 0; --y) { // first for loop
        let rowFilled = true;
      for (let x = 0; x < this.columns; ++x) {
        if (this.board[y][x] == 0) {
            rowFilled = false;
            break;
        }
      }
      // will try to add a red blinking line first.
      if (rowFilled) {
        for (let curRow = y; curRow > 0; --curRow) {
              // console.log(oldrow);
          for (let x = 0; x < this.columns; ++x) {
                // console.log(board[curRow]);
              this.board[curRow][x] = this.board[curRow - 1][x];
          }
        }
          ++y;
      } // end of if rowFilled
    } // end of first for loop
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
  for (let y = 0; y < 4; ++y) {
      for (let x = 0; x < 4; ++x) {
          if (this.current[y][x]) {
              this.board[y + this.currentY][x + this.currentX] = this.current[y][x];
          }
      }
  }
    this.freezed = true;
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
          let rotated = this.rotate(this.current);
          if (this.valid(0, 0, rotated)) {
              this.current = rotated;
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
          newCurrent[y][x] = this.current[3 - x][y];
      }
  }
  console.log(newCurrent);
  return newCurrent;
}

  startGame = () => {
    // this function start the game and allow the board to be created
    // it will also fire other funcations that will allow the tetrominos to start falling.
    console.log('In Start Game', this.state.startGame);
    this.setState({
      startGame: true
    }/*,() => console.log(this.state)*/)
    this.intervalRender = setInterval(this.renderWorld, 30);
    this.clearBoard();
    this.newShape();
    this.gameOver = false;
    this.interval = setInterval(this.canMove, 500);
    console.log(this.intervalRender, this.interval);
    // console.log(this.board);
  }


/************************Click Handler********************************/
  playGameHandler = () => {
    // console.log('in playGameHandler');
    this.startGame();
    document.querySelector('#playbutton').disabled = true
  }

/*********************************************************************/

  render() {
    // console.log(this.state.context);
    return (
      <div>
        <br/>
        <canvas id="world" ref="canvas" width={300} height={600}></canvas>
        <button id="playbutton" onClick={() => this.playGameHandler()}>Play Tetris!</button>
      </div>
    );
  }

}

export default CanvasDrawing;
