import { expect } from 'chai';
import Trie from '../scripts/Trie';

const text = "user/share/dict/words"
let dictionary = fs.readFileSync(text).toString().trim().split('\n');


describe ('Trie functionality', () => {

  describe('insert', () => {
    let letterTrie;

    beforeEach( () => {
      letterTrie = new Trie();
    })

    it.skip('should have a head', () => {
      expect(letterTrie.head).to.equal(null);
    })

    it.skip('should take a word as an instance of a node', () => {
      letterTrie.insert('woman');

      expect(letterTrie.head).to.be.instanceOf(Node);
    })

    it.skip('should insert a word with head having no children', () => {
      letterTrie.insert('tent');

      expect(letterTrie.head.children.a.letter).to.be.equal('t');

      expect(
        letterTrie.head
        .children.t
        .children.e
        .letter
      ).to.equal('n')
    })

    it.skip('should insert a word, letter has isWord property set to true',
    () => {
      letterTrie.insert('ten');
      letterTrie.insert('tent');

      expect (
        letterTrie.head
        .children.t
        .children.e
        .children.n
        .children.t
        .letter
      ).to.equal('t')

      expect(
        letterTrie.head
        .children.t
        .children.e
        .children.n
        .isWord
      ).to.equal(true)

      expect(
        letterTrie.head
        .children.t
        .children.e
        .children.n
        .children.t
        .isWord
      ).to.equal(true)
    })

    it.skip('should be able to insert multiple words correctly', () => {
      letterTrie.insert('tents');
      letterTrie.insert('tent');
      letterTrie.insert('ten');
      letterTrie.insert('tentacle');
      letterTrie.insert('tennis');
      letterTrie.insert('train');
    })

      expect(
        letterTrie.head
        .children.t
        .children.e
        .children.n
        .children.t
        .children.s
        .isWord
      ).to.equal(true);

      expect(
        letterTrie.head
        .children.t
        .children.e
        .children.n
        .children.t
        .isWord
      ).to.equal(true);

      expect(
        letterTrie.head
        .children.t
        .children.e
        .children.n
        .isWord
      ).to.equal(true);

      expect(
        letterTrie.head
        .children.t
        .children.e
        .children.n
        .children.t
        .children.a
        .children.c
        .children.l
        .children.e
        .isWord
      ).to.equal(true);

      expect(
        letterTrie.head
        .children.t
        .children.e
        .children.n
        .children.n
        .children.i
        .children.s
        .isWord
      ).to.equal(true);

      expect(
        letterTrie.head
        .children.t
        .children.r
        .children.a
        .children.i
        .children.n
        .isWord
      ).to.equal(true);


    it.skip('should know if a word is incomplete, isWord should evaluate to false',
     () => {
       letterTrie.insert('runner')

      expect(
         letterTrie.head
         .children.r
         .children.u
         .children.n
         .children.n
         .isWord
       ).to.equal(false);

  })
})
