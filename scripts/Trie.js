import Node from './Node.js';

export default class Trie {
  constructor() {
    this.root = null;
    this.wordCount = 0;
  }

  populate(dictionary) {
    dictionary.forEach(word => {
      this.insert(word);
    });
  }

  insert(string) {
    const node = new Node()

    if (!this.root) {
      this.root = node;
    }

    const lettersArray = [...string.toLowerCase()];

    let currentNode = this.root;


    lettersArray.forEach(( letter, index, array ) => {

      if (!currentNode.children[letter]) {
        currentNode.children[letter] = new Node(letter);
      }
      currentNode = currentNode.children[letter];

      if (index === array.length - 1) {
        currentNode.isWord = true;
      }
    });

    this.wordCount++;
  }

  count() {
    return this.wordCount;
  }

  findNode(word) {
    let currentNode = this.root;

    [...word.toLowerCase()].forEach((letter) => {
      currentNode = currentNode.children[letter]
    })

    return currentNode;
  }

  findChildrenWords( wordValue, currentNode, suggestionsArray ) {

    let newWord = wordValue;

    let keys = Object.keys(currentNode.children)

    keys.forEach((key) => {
      let completeWord = newWord + key

      if (currentNode.children[key].isWord === true) {

        suggestionsArray.push(
          { word: completeWord,
            frequency: currentNode.children[key].frequency })
      }

      if (currentNode.children) {
        this.findChildrenWords(
          completeWord, currentNode.children[key], suggestionsArray)
      }
    })
    return suggestionsArray;
  }

  suggest(word) {
    if (!word) {
      return 'letters please';
    }

    let suggestionsArray = [];
    let wordInput = [...word.toLowerCase()]
    let currentNode;

    currentNode = this.findNode(word, this.root);

    this.findChildrenWords(wordInput, currentNode, suggestionsArray);

    return suggestionsArray.sort((a, b) => {
      return b.frequency - a.frequency
    }).reduce((suggestionsArray, object) => {
      suggestionsArray.push(object.word)
      return suggestionsArray
    }, [])
  }

  select() {

  }
}
