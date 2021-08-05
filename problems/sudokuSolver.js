var solveSudoku = function (board) {
  const values = {};
  for (let i = 1; i <= board.length; i++) {
    values[i] = 0;
  }
  for (let i = 0; i < board.length; i++) {
    const row = board[i];
    for (let j = 0; j < row.length; j++) {
      const value = row[j];
      if (value !== ".") values[value]++;
    }
  }

  const checkArr = (arr, value) => {
    if (arr.includes(value)) return false;
    else return true;
  };

  const returnColumn = (y) => {
    const arr = [];
    for (let i = 0; i < board.length; i++) {
      arr.push(board[i][y]);
    }
    return arr;
  };

  const returnBox = (x, y) => {
    let arr = [];
    // FIRST COLLUMN
    if ([0, 1, 2].includes(x) && [0, 1, 2].includes(y)) {
      arr = arr.concat(
        board[0].slice(0, 3),
        board[1].slice(0, 3),
        board[2].slice(0, 3)
      );
    } else if ([3, 4, 5].includes(x) && [0, 1, 2].includes(y)) {
      arr = arr.concat(
        board[3].slice(0, 3),
        board[4].slice(0, 3),
        board[5].slice(0, 3)
      );
    } else if ([6, 7, 8].includes(x) && [0, 1, 2].includes(y)) {
      arr = arr.concat(
        board[6].slice(0, 3),
        board[7].slice(0, 3),
        board[8].slice(0, 3)
      );
    }
    // SECOND COLUMN
    else if ([0, 1, 2].includes(x) && [3, 4, 5].includes(y)) {
      arr = arr.concat(
        board[0].slice(3, 6),
        board[1].slice(3, 6),
        board[2].slice(3, 6)
      );
    } else if ([3, 4, 5].includes(x) && [3, 4, 5].includes(y)) {
      arr = arr.concat(
        board[3].slice(3, 6),
        board[4].slice(3, 6),
        board[5].slice(3, 6)
      );
    } else if ([6, 7, 8].includes(x) && [3, 4, 5].includes(y)) {
      arr = arr.concat(
        board[6].slice(3, 6),
        board[7].slice(3, 6),
        board[8].slice(3, 6)
      );
    }
    // THIRD COLUMN
    else if ([0, 1, 2].includes(x) && [6, 7, 8].includes(y)) {
      arr = arr.concat(
        board[0].slice(6, 9),
        board[1].slice(6, 9),
        board[2].slice(6, 9)
      );
    } else if ([3, 4, 5].includes(x) && [6, 7, 8].includes(y)) {
      arr = arr.concat(
        board[3].slice(6, 9),
        board[4].slice(6, 9),
        board[5].slice(6, 9)
      );
    } else if ([6, 7, 8].includes(x) && [6, 7, 8].includes(y)) {
      arr = arr.concat(
        board[6].slice(6, 9),
        board[7].slice(6, 9),
        board[8].slice(6, 9)
      );
    }
    return arr;
  };

  const finalCheck = (arr, row, column, box, x, y) => {
    const dotCount = arr.reduce((value, element) => {
      return element === "." ? value + 1 : value;
    }, 0);
    if (dotCount === 1) {
      let value;
      for (let key in values) {
        if (!arr.includes(key)) {
          value = key;
        }
      }
      index = arr.indexOf(".");

      if (row) {
        board[x][index] = value;
        values[value]++;
      } else if (column) {
        board[index][y] = value;
        values[value]++;
      } else if (box) {
        if ([0, 1, 2].includes(index)) {
          let yIndex;
          if (y === 6) yIndex = index + 6;
          else if (y === 3) yIndex = index + 3;
          else if (y === 0) yIndex = index;

          board[x][yIndex] = value;
          values[value]++;
        } else if ([3, 4, 5].includes(index)) {
          let yIndex;
          if (y === 6) yIndex = index + 3;
          else if (y === 3) yIndex = index;
          else if (y === 0) yIndex = index - 3;

          board[x + 1][yIndex] = value;
          values[value]++;
        } else if ([6, 7, 8].includes(index)) {
          let yIndex;
          if (y === 6) yIndex = index;
          else if (y === 3) yIndex = index - 3;
          else if (y === 0) yIndex = index - 6;

          board[x + 2][yIndex] = value;
          values[value]++;
        }
      }
    }
  };

  const recurseThrough = (snap) => {
    for (let x = 0; x < board.length; x++) {
      finalCheck(board[x], true, null, null, x, null);
      if ([0, 3, 6].includes(x)) {
        finalCheck(returnBox(x, 0), null, null, true, x, 0);
        finalCheck(returnBox(x, 3), null, null, true, x, 3);
        finalCheck(returnBox(x, 6), null, null, true, x, 6);
      }
      const box1 = returnBox(x, 0);
      const box2 = returnBox(x, 3);
      const box3 = returnBox(x, 6);
      for (let y = 0; y < board[x].length; y++) {
        finalCheck(returnColumn(y), null, true, null, null, y);

        if (board[x][y] === ".") {
          const options = [];
          for (let key in values) {
            if (values[key] !== 9) {
              const row = checkArr(board[x], key);
              const column = checkArr(returnColumn(y), key);
              let box;
              if ([0, 1, 2].includes(y)) box = checkArr(box1, key);
              if ([3, 4, 5].includes(y)) box = checkArr(box2, key);
              if ([6, 7, 8].includes(y)) box = checkArr(box3, key);
              if (row && box && column) options.push(key);
            }
          }
          if (options.length === 1) {
            values[options[0]]++;
            board[x][y] = options[0];
          }
        }
      }
      // finalCheck(board[x], true, null, null, x, null);
    }
    const shot = JSON.stringify(board);
    if (shot !== snap) {
      for (let i = 0; i < board.length; i++) {
        if (board[i].includes(".")) recurseThrough(shot);
      }
    }
  };
  console.table(board);
  recurseThrough("");
  console.table(board);
  console.table([
    ["5", "1", "9", "7", "4", "8", "6", "3", "2"],
    ["7", "8", "3", "6", "5", "2", "4", "1", "9"],
    ["4", "2", "6", "1", "3", "9", "8", "7", "5"],
    ["3", "5", "7", "9", "8", "6", "2", "4", "1"],
    ["2", "6", "4", "3", "1", "7", "5", "9", "8"],
    ["1", "9", "8", "5", "2", "4", "3", "6", "7"],
    ["9", "7", "5", "8", "6", "3", "1", "2", "4"],
    ["8", "3", "2", "4", "9", "1", "7", "5", "6"],
    ["6", "4", "1", "2", "7", "5", "9", "8", "3"],
  ]);
  // tests for return box
  // console.log(returnBox(1,2))
  // console.log(returnBox(3,2))
  // console.log(returnBox(7,2))
  // console.log(returnBox(1,3))
  // console.log(returnBox(3,3))
  // console.log(returnBox(7,3))
  // console.log(returnBox(1,7))
  // console.log(returnBox(3,7))
  // console.log(returnBox(7,7))
  // console.table(board)
};

// const board = [["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]
const board = [
  [".", ".", "9", "7", "4", "8", ".", ".", "."],
  ["7", ".", ".", ".", ".", ".", ".", ".", "."],
  [".", "2", ".", "1", ".", "9", ".", ".", "."],
  [".", ".", "7", ".", ".", ".", "2", "4", "."],
  [".", "6", "4", ".", "1", ".", "5", "9", "."],
  [".", "9", "8", ".", ".", ".", "3", ".", "."],
  [".", ".", ".", "8", ".", "3", ".", "2", "."],
  [".", ".", ".", ".", ".", ".", ".", ".", "6"],
  [".", ".", ".", "2", "7", "5", "9", ".", "."],
];

console.log(solveSudoku(board));
