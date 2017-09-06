import { expect } from 'chai';
import Trie from '../scripts/Trie';
import Node from '../scripts/Node';

const fs = require ('fs');

const text = "/usr/share/dict/words";


describe ('Trie functionality', () => {

  describe('populate', () => {
    let letterTrie;

    beforeEach( () => {
      letterTrie = new Trie();
    })

    it('should import words from the dictionary', () => {

      const text = "/usr/share/dict/words";

      let dictionary = fs.readFileSync(text).toString().trim().split('\n');

      letterTrie.populate(dictionary);

      expect(letterTrie.wordCount).to.equal(234371);
    })
  })

  describe('insert', () => {
    let letterTrie;

    beforeEach( () => {
      letterTrie = new Trie();
    })

    it('should have a root', () => {
      expect(letterTrie.head).to.equal(null);
    })

    it('should take a word as an instance of a node', () => {
      letterTrie.insert('woman');

      expect(letterTrie.head).to.be.instanceOf(Node);
    })

    it('should be able to insert a letter', () => {
      letterTrie.insert('t');

      expect(
        letterTrie.head
        .children.t.letter
      ) .to.be.equal('t');
    })

    it('should be able to insert a word', () => {
      letterTrie.insert('ten')

      expect(
       letterTrie.head
       .children.t.letter
      ).to.equal('t')

      expect(
      letterTrie.head
      .children.t
      .children.e.letter
     ).to.equal('e')

      expect(
       letterTrie.head
       .children.t
       .children.e
       .children.n.letter
      ).to.equal('n')
    })

    it('should assign isWord property set to true to inserted words', () => {
      letterTrie.insert('tent');
      letterTrie.insert('ten');

      expect(
        letterTrie.head
        .children.t
        .children.e
        .children.n
        .children.t.letter
       ).to.equal('t')

      expect(
        letterTrie.head
        .children.t
        .children.e
        .children.n.isWord
       ).to.equal(true)

      expect(
        letterTrie.head
        .children.t
        .children.e
        .children.n
        .children.t.isWord
       ).to.equal(true)
    })

    it('should be able to insert multiple words correctly', () => {
      letterTrie.insert('tents');
      letterTrie.insert('tent');
      letterTrie.insert('ten');
      letterTrie.insert('tentacle');
      letterTrie.insert('tennis');
      letterTrie.insert('train');

      expect(
        letterTrie.head
        .children.t
        .children.e
        .children.n
        .children.t
        .children.s.isWord
       ).to.equal(true);

      expect(
        letterTrie.head
        .children.t
        .children.e
        .children.n
        .children.t.isWord
       ).to.equal(true);

      expect(
        letterTrie.head
        .children.t
        .children.e
        .children.n.isWord
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
        .children.e.isWord
       ).to.equal(true);

      expect(
        letterTrie.head
        .children.t
        .children.e
        .children.n
        .children.n
        .children.i
        .children.s.isWord
       ).to.equal(true);

      expect(
        letterTrie.head
        .children.t
        .children.r
        .children.a
        .children.i
        .children.n.isWord
       ).to.equal(true);
    })

    it('should know if a word is incomplete', () => {
      letterTrie.insert('runner')

      expect(
       letterTrie.head
       .children.r
       .children.u
       .children.n
       .children.n.isWord
      ).to.equal(false);
    })
  })
})
