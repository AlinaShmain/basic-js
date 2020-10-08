const CustomError = require("../extensions/custom-error");

module.exports = function calculateHanoi(disksNumber, turnsSpeed) {
  const minSteps = Math.pow(2, disksNumber) - 1;

  const minTime = Math.floor(minSteps / (turnsSpeed / 3600));

  return { turns: minSteps, seconds: minTime };
};