import Node from './Node.js';

export default class Trie {
  constructor() {
    this.head = null;
    this.wordCount = 0;
  }

  insert(string) {
    const node = new Node()

    if (!this.head) {
      this.head = node;
    }

    let currentNode = this.head

    const lettersArray = [...string.toLowerCase()];

    lettersArray.forEach( letter => {
      if (!currentNode.children[letter]) {
        currentNode.children[letter] = new Node(letter);
      }
      currentNode = currentNode.children[letter];
    });

    if (!currentNode.isWord) {
      currentNode.isWord = true;
      this.wordCount++;
      currentNode.value = string
    }
  }

  populate(dictionary) {
    dictionary.forEach( word => {
      this.insert(word);
    })
  }

  countWords() {
    this.wordCount++;
  }



  suggest() {

  }

  select() {

  }
}
