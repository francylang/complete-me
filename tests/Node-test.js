import { expect } from 'chai';
import Node from '../scripts/Node';

describe ('NODE FUNCTIONALITY', () => {
  let node;

  beforeEach(() => {
    node = new Node();
  });

  it('should exist', () => {
    expect(node).to.exist;
  });

  it('should create an instance of Node', () => {
    expect(node).to.be.an.instanceOf(Node);
  });

  it('should have a letter property', () => {
    expect(node.letter).to.equal(null);
  });

  it('should not be a word by default', () => {
    expect(node.isWord).to.equal(false);
  });

  it('should have no children', () => {
    expect(node.children).to.deep.equal({});
  });
});
