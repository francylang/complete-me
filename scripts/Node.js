
class Node {
  constructor(letter) {
    this.letter = letter || null;
    this.isWord = false;
    this.children = {};
    this.frequency = 0;
  }
}

module.exports = Node;
