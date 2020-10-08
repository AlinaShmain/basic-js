const CustomError = require("../extensions/custom-error");

module.exports = function createDreamTeam(members) {
  if(!Array.isArray(members)) return false;

  const teamName = members.map((name) => typeof name === 'string' ? name.trim()[0].toUpperCase() : '').sort().join('');

  return teamName;
};
