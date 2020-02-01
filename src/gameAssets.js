const BLOCK_SIZE = 30;
const TETROMINO_BLOCK = 25;
const BLOCK_OUTLINE = 25;
const NEXTSHAPE_SIZE = 35;
const HEIGHT_WIDTH = 30;



const tetromino = [
    [ 0, 0, 0, 0,
      1, 1, 1, 1,
      0, 0, 0, 0,
      0, 0, 0, 0],

    [ 0, 0, 0, 0,
      1, 1, 1, 0,
      1, 0, 0, 0,
      0, 0, 0, 0],

    [ 0, 0, 0, 0,
      1, 1, 1, 0,
      0, 0, 1, 0,
      0, 0, 0, 0],

    [0, 0, 0, 0,
     0, 1, 1, 0,
     0, 1, 1, 0,
     0, 0, 0, 0,],

    [ 0, 0, 0, 0,
      1, 1, 0, 0,
      0, 1, 1, 0,
      0, 0, 0, 0],

    [0, 0, 0, 0,
     0, 1, 1, 0,
     1, 1, 0, 0,
     0, 0, 0, 0],

    [0, 1, 0, 0,
     1, 1, 1, 0,
     0, 0, 0, 0,
     0, 0, 0, 0]
]

const colors = [
  'cyan', 'orange', 'blue', 'yellow', 'red', 'green', 'magenta'
]

export { tetromino, colors, BLOCK_SIZE, TETROMINO_BLOCK, BLOCK_OUTLINE, NEXTSHAPE_SIZE, HEIGHT_WIDTH }


// return object that has // freezed, currentX, currentY, currentShape [1,1]
