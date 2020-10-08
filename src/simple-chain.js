const CustomError = require("../extensions/custom-error");

const chainMaker = {
  chain: [],

  getLength() {
    return this.chain.length;
  },

  addLink(value) {
    this.chain.push(`( ${value} )`);
    return this;
  },

  removeLink(position) {
    if (
      position &&
      Number.isInteger(position) &&
      position > 0 &&
      position <= this.getLength()
    ) {
        this.chain.splice(position - 1, 1);
    } else {
        this.chain = [];
        throw new Error();
    }
    return this;
  },

  reverseChain() {
      this.chain.reverse();
      return this;
  },

  finishChain() {
    const result = this.chain.join('~~');
    this.chain = [];
    return result;
  },
};

module.exports = chainMaker;
