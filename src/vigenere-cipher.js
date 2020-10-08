const CustomError = require("../extensions/custom-error");

class VigenereCipheringMachine {
  constructor(isDirect = true) {
    this.isDirect = isDirect;
    this.alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    this.square = [];
  }

  genSqViz() {
    for (let i = 0; i < this.alphabet.length; i++) {
      this.square[i] = this.alphabet.slice(i).concat(this.alphabet.slice(0, i));
    }
  }

  fitKey(message, key) {
    const msgLen = message.split(" ").join("").length;

    if (msgLen !== key.length) {
      if (msgLen > key.length) {
        const ratio = Math.ceil(msgLen / key.length);

        key = key.repeat(ratio).slice(0, msgLen);
      } else {
        key = key.slice(0, msgLen);
      }
    }

    return key;
  }

  encrypt(message, key) {
    if (!message && !key) return new Error();

    message = message.toUpperCase();
    key = this.fitKey(message, key).toUpperCase();

    this.genSqViz();

    let res = "";
    let j = 0;
    for (let i = 0; i < message.length; i++) {
      res +=
        this.alphabet.indexOf(message[i]) !== -1
          ? this.square[this.alphabet.indexOf(message[i])][
              this.alphabet.indexOf(key[j++])
            ]
          : message[i];
    }
    return this.isDirect ? res : res.split('').reverse().join('');
  }

  decrypt(message, key) {
    if (!message && !key) return new Error();

    message = message.toUpperCase();
    key = this.fitKey(message, key).toUpperCase();

    this.genSqViz();

    let res = "";
    let j = 0;
    for (let i = 0; i < message.length; i++) {
      let row = this.alphabet.indexOf(key[j]);
      if (this.alphabet.indexOf(message[i]) !== -1) {
        j++;
        let coll = this.square[row].indexOf(message[i]);
        res += this.alphabet[coll];
      } else res += message[i];
    }
    return this.isDirect ? res : res.split('').reverse().join('');
  }
}

module.exports = VigenereCipheringMachine;
