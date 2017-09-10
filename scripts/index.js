const Trie = require('./Trie');
const dictionary = require('fs').readFileSync("/usr/share/dict/words", 'utf8').toString().trim().split('\n');
const letterTrie = new Trie();

$('.search').on('input', search)
$('.search-button').on('click', 'li', selectPrep)

$(document).ready(function() {
  populateWords(dictionary);
  $('.search-input').focus();
});

function populateWords() {
  letterTrie.populate(dictionary)
  $('.search-input').focus();
}

function search() {
  if ($('.search').val() === '') {
    $('.suggestion-list').empty();
  } else {
    $('.suggestion-list').empty();
    filterList();
  }
}

function selectPrep(e) {
  e.preventDefault()
  selectWord(e);
  $('.search').focus();
}

function selectWord(e) {
  let selected = e.target.innerHTML.toLowerCase();

  letterTrie.select(selected);
  filterList();
  $('.search').val(selected);
  $('.suggestion-list').empty();
}

function filterList() {
  let stringPrefix = $('.search').val();

  $('li').remove();
  let suggestions = letterTrie.suggest(stringPrefix);

  for (let i = 0; i < 10 && suggestions.length; i++) {
    if (suggestions[i] !== undefined) {
      $('.suggestion-list').append(`<li>${suggestions[i]}</li>`)
    }
  }
}
