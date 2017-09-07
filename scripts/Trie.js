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
    if (!this.root) {
      this.root = new Node();
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

  suggest(string) {
    let suggestionsArray = [];

    if (!string) {
      return 'letters please';
    }

    let currentNode = this.findNode(string, this.root);

    if (!currentNode) {
      return 'none'
    }

    if (currentNode.isWord) {
      suggestionsArray.push([string, currentNode])
    }
    let output = this.findChildrenWords(string, currentNode, suggestionsArray);

    let finalOutput = this.prepareOutput(output)

    return finalOutput
  }

  findNode(string) {
    let currentNode = this.root;
    let newString = [...string.toLowerCase()];

    newString.forEach((letter) => {
      currentNode = currentNode.children[letter]
  
    })

    return currentNode;
  }

  findChildrenWords(string, currentNode, suggestionsArray) {
    Object.keys(currentNode.children).forEach((key) => {
      let completeWord = string + currentNode.children[key].letter;

      if (currentNode.children[key].isWord) {

        suggestionsArray.push( {word: completeWord} );
      }
      completeWord = this.findChildrenWords(completeWord, currentNode.children[key], suggestionsArray);

    })
    return suggestionsArray;

  }

  prepareOutput(array) {
    return array.sort((a, b) => {
      return b - a;
    })
    .reduce((acc, object) => {
      acc.push(object.word);
      return acc;
    }, [])
  }
// map over the array




// // select(string) {
// flag words that have been selected by the user and prioritize those words the next time the prefix is entered


























  //   const newString = [...string.toLowerCase()];
  //   let currentNode = this.root;
  //   let node = this.findNode(newString, currentNode)
  //
  //   node.isWord ? node++ : null
  //
  // }
}
