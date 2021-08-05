var setZeroes = function (matrix) {
  const rowsToChange = new Set();
  const columnsToChange = new Set();

  const traverseMatrix = () => {
    for (let i = 0; i < matrix.length; i++) {
      const row = matrix[i];
      for (let j = 0; j < row.length; j++) {
        if (row[j] === 0) {
          rowsToChange.add(i);
          columnsToChange.add(j);
        }
      }
    }
  };
  const changeRow = (rowNum) => {
    for (let i = 0; i < matrix[rowNum].length; i++) {
      matrix[rowNum][i] = 0;
    }
  };
  const changeColumn = (columnNum) => {
    for (let i = 0; i < matrix.length; i++) {
      matrix[i][columnNum] = 0;
    }
  };
  traverseMatrix();

  rowsToChange.forEach((row) => {
    changeRow(row);
  });
  columnsToChange.forEach((columns) => {
    changeColumn(columns);
  });

  return matrix;
};
