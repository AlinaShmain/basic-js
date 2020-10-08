const CustomError = require("../extensions/custom-error");

module.exports = function countCats(matrix) {
  let count = 0;

  matrix.forEach((row) => {
    const cats = row.filter((item) => item === '^^');
    count += cats ? cats.length : 0;
  });

  return count;
};