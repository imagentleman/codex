var fs = require('fs');
var codex = require('./index.js');
// or require('codexjs') if you installed the module through npm

// Reading the codex file from the file system
var configFromFile = codex.read('example.codex');

// Using a code string
var configString = fs.readFileSync('example.codex', {
  encoding: 'utf-8'
});

var configFromString = codex.parse(configString);

console.log(configFromFile);
console.log(configFromString);
