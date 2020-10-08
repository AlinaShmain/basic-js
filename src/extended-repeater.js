const CustomError = require("../extensions/custom-error");

module.exports = function repeater(str, options) {
  let res = null;

  if (options) {
    const {
      repeatTimes,
      separator = "+",
      addition,
      additionRepeatTimes,
      additionSeparator = "|",
    } = options;

    String.prototype.repeat = function (n, d) {
      return --n ? this + (d || "") + this.repeat(n, d) : "" + this;
    };

    if (typeof str !== "string") {
      str = String(str);
    }

    res = str.slice();

    if (addition !== undefined) {
      let additionRep = Object.assign("", addition);
      additionRep = (typeof addition !== "string") ? String(addition) : addition;
      if (
        additionRepeatTimes !== undefined &&
        Number.isInteger(additionRepeatTimes)
      ) {
        additionRep = additionRep.repeat(additionRepeatTimes, additionSeparator);
      }
      res = res.concat(additionRep);
    }

    if (repeatTimes !== undefined && Number.isInteger(repeatTimes)) {
      res = res.repeat(repeatTimes, separator);
    }
  }

  return res ? res : str;
};
