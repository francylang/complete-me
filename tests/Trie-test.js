const { expect } = require('chai');
const Trie = require('../scripts/Trie');
const Node = require('../scripts/Node');
const fs = require('fs');
const text = "/usr/share/dict/words";
const dictionary = fs.readFileSync(text).toString().trim().split('\n');


describe('TRIE FUNCTIONALITY', () => {

  describe('POPULATE', () => {

    it('should import words from the dictionary', () => {
      let letterTrie = new Trie();

      letterTrie.populate(dictionary);
      expect(letterTrie.wordCount).to.equal(235886);
    });
  });

  describe('INSERT', () => {
    let letterTrie;

    beforeEach(() => {
      letterTrie = new Trie();
    });

    it('should have a root', () => {
      expect(letterTrie.root).to.equal(null);
    });

    it('should take a word as an instance of a node', () => {
      letterTrie.insert('woman');

      expect(letterTrie.root).to.be.instanceOf(Node);
    });

    it('should be able to insert a letter', () => {
      letterTrie.insert('t');

      expect(
        letterTrie.root
        .children.t.letter
      ).to.be.equal('t');
    });

    it('should be able to insert a word', () => {
      letterTrie.insert('ten');

      expect(
        letterTrie.root
        .children.t.letter
      ).to.equal('t');

      expect(
        letterTrie.root
        .children.t
        .children.e.letter
      ).to.equal('e');

      expect(
        letterTrie.root
        .children.t
        .children.e
        .children.n.letter
      ).to.equal('n');
    });

    it('should set isWord property to true for inserted words', () => {
      letterTrie.insert('tent');
      letterTrie.insert('ten');

      expect(
        letterTrie.root
        .children.t
        .children.e
        .children.n
        .children.t.letter
      ).to.equal('t');

      expect(
        letterTrie.root
        .children.t
        .children.e
        .children.n.isWord
      ).to.equal(true);

      expect(
        letterTrie.root
        .children.t
        .children.e
        .children.n
        .children.t.isWord
      ).to.equal(true);
    });

    it('should be able to insert multiple words correctly', () => {
      letterTrie.insert('tents');
      letterTrie.insert('tent');
      letterTrie.insert('ten');
      letterTrie.insert('tentacle');
      letterTrie.insert('tennis');
      letterTrie.insert('train');

      expect(
        letterTrie.root
        .children.t
        .children.e
        .children.n
        .children.t
        .children.s.isWord
      ).to.equal(true);

      expect(
        letterTrie.root
        .children.t
        .children.e
        .children.n
        .children.t.isWord
      ).to.equal(true);

      expect(
        letterTrie.root
        .children.t
        .children.e
        .children.n.isWord
      ).to.equal(true);

      expect(
        letterTrie.root
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
        letterTrie.root
        .children.t
        .children.e
        .children.n
        .children.n
        .children.i
        .children.s.isWord
      ).to.equal(true);

      expect(
        letterTrie.root
        .children.t
        .children.r
        .children.a
        .children.i
        .children.n.isWord
      ).to.equal(true);
    });

    it('should know if a word is incomplete', () => {
      letterTrie.insert('runner');

      expect(
        letterTrie.root
        .children.r
        .children.u
        .children.n
        .children.n.isWord
      ).to.equal(false);
    });
  });

  describe('COUNT', () => {
    let letterTrie;

    beforeEach(() => {
      letterTrie = new Trie();
    });

    it('should keep track of word count', () => {
      expect(letterTrie.count()).to.equal(0);

      letterTrie.insert('truck');
      expect(letterTrie.count()).to.equal(1);

      letterTrie.insert('tent');
      expect(letterTrie.count()).to.equal(2);

      letterTrie.insert('tentacle');
      expect(letterTrie.count()).to.equal(3);
    });
  });

  describe('SUGGEST', () => {
    let letterTrie;

    beforeEach(() => {
      letterTrie = new Trie();
    });

    it('should suggest a word', () => {
      letterTrie.insert('climb');
      letterTrie.insert('clam');
      letterTrie.insert('climber');
      letterTrie.insert('clip');
      letterTrie.insert('clinic');
      letterTrie.insert('carry');

      expect(letterTrie.suggest('cli')).to.deep.equal(
        ['climb', 'climber', 'clip', 'clinic']);
    });

    it('should have an invalid path for XYZ when they enter a prefix that does not exist', () => {
      letterTrie.insert('climb');
      letterTrie.insert('clam');
      letterTrie.insert('climber');
      letterTrie.insert('clip');
      letterTrie.insert('clinic');
      letterTrie.insert('carry');

      expect(letterTrie.suggest('zl')).to.deep.equal('nothing for you')
    });

    it('should lowercase all values', () => {
      letterTrie.populate(['tenacious', 'tenactiy', 'tennis', 'tent', 'tentacle']);

      expect(letterTrie.suggest('TEN')).deep.equal(['tenacious', 'tenactiy', 'tennis',
        'tent', 'tentacle'
      ]);
    });
  });

  describe('SELECT', () => {
    let letterTrie;

    beforeEach(() => {
      letterTrie = new Trie()
    });

    it('should show selected suggestions first', () => {
      letterTrie.populate(['tenacious', 'tenactiy', 'tennis', 'tent', 'tentacle']);

      expect(letterTrie.suggest('TEN')).deep.equal(['tenacious', 'tenactiy', 'tennis',
        'tent', 'tentacle'
      ]);

      letterTrie.select('tennis');
      expect(letterTrie.suggest('TEN')).deep.equal(['tennis', 'tenacious', 'tenactiy',
        'tent', 'tentacle'
      ]);

      letterTrie.select('tent');
      expect(letterTrie.suggest('TEN')).deep.equal(['tennis', 'tent', 'tenacious',
        'tenactiy', 'tentacle'
      ]);

      letterTrie.select('tent');
      expect(letterTrie.suggest('TEN')).deep.equal(['tent', 'tennis', 'tenacious',
        'tenactiy', 'tentacle'
      ]);
    });
  });
});
