const CustomError = require("../extensions/custom-error");

module.exports = function transform(arr) {
  if (!arr || !Array.isArray(arr)) throw new Error();

  let result = arr.slice();

  let idx = 0;
  while (idx < result.length) {
    const item = result[idx];

    if (typeof item === "string" && item.startsWith("--")) {
      if (
        (idx === result.length - 1 && item.endsWith("next")) ||
        (idx === 0 && item.endsWith("prev"))
      ) {
        result.splice(idx, 1);
      } else {
        switch (item) {
          case "--discard-next":
            if (
              typeof result[idx + 1] === "string" &&
              result[idx + 1].startsWith("--")
            ) {
              result.splice(idx, 2);
            } else {
              result.splice(idx + 1, 1);
              idx++;
            }
            break;
          case "--discard-prev":
            if (
              typeof result[idx - 1] === "string" &&
              result[idx - 1].startsWith("--")
            ) {
              result.splice(idx - 1, 2);
            } else {
              result.splice(idx - 1, 1);
            }
            break;
          case "--double-next":
            if (
              typeof result[idx + 1] === "string" &&
              result[idx + 1].startsWith("--")
            ) {
              result.splice(idx, 2);
            } else {
              result.splice(idx, 1, result[idx + 1]);
            }
            break;
          case "--double-prev":
            if (
              typeof result[idx - 1] === "string" &&
              result[idx - 1].startsWith("--")
            ) {
              result.splice(idx - 1, 2);
            } else {
              result.splice(idx, 1, result[idx - 1]);
            }
            break;
        }
      }
    } else {
      idx++;
    }
  }

  return result.filter(
    (item) =>
      typeof item !== "string" ||
      (typeof item === "string" && !item.startsWith("--"))
  );
}
