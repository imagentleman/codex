'use strict';

var fs = require('fs');

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function parseString(string) {
  var quotes = ['\'', '"'];

  if (quotes.indexOf(string.charAt(0)) !== -1 &&
    quotes.indexOf(string.charAt(string.length - 1)) !== -1) {
    return string.slice(1, string.length - 1);
  }

  return string;
}

function parseValue(value) {
  return isNumber(value) ? Number(value) : parseString(value);
}

function parseValues(values) {
  if (values.length === 1) {
    return parseValue(values[0]);
  }

  return values.map(function(value) {
    return parseValue(value);
  });
}

function parse(text) {
  var codex = {};

  var uncommentedText = text.replace(/\([^\)]*\)/g, '');

  var newlineNormalizedText = uncommentedText.replace(/\r\n/g, '\n').
    replace(/[\s]*\n\n[\s]*/g, '\n\n');

  var pairs = newlineNormalizedText.split('\n\n');

  pairs.forEach(function(pair) {
    if (!pair) {
      return;
    }

    var values = pair.split('\n').map(function(string) {
      return string.trim();
    });

    var key = values.shift();

    if (key.indexOf('.') !== -1) {
      var keys = key.split('.');

      if (!codex[keys[0]]) {
        codex[keys[0]] = {};
      }

      codex[keys[0]][keys[1]] = parseValues(values);
    } else {
      codex[key] = parseValues(values);
    }
  });

  return codex;
}

function read(path) {
  var text = fs.readFileSync(path, {
    encoding: 'utf-8'
  });

  return parse(text);
}

module.exports = {
  read: read,
  parse: parse
};
