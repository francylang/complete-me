import Node from './Node.js';

export default class Trie {
  constructor() {
    this.head = null;
    this.wordCount = 0;
  }

  populate() {

  }

  countWords() {
    this.wordCount++;
  }

  insert(string) {
    let wordCheck = [];
    const stringArray = [...string.toLowerCase()]
    let letter = stringArray.shift();
    let currentNode = this.head

    wordCheck.push(letter)

    while (letter) {
      if (!currentNode.children[letter]) {
        currentNode.children[letter] = new Node()
      }
      currentNode = currentNode.children[letter]
      wordCheck.push(letter)

    }



  }

  suggest() {

  }

  select() {

  }
}
