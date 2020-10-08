const CustomError = require("../extensions/custom-error");

module.exports = class DepthCalculator {
  constructor() {
    this.calculateDepth = this.calculateDepth.bind(this);
  }

  calculateDepth(arr) {
    const reducer = (max, item) => Math.max(max, this.calculateDepth(item));

    return 1 + (Array.isArray(arr) ? arr.reduce(reducer, 0) : -1);
  }
};
