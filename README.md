# codex

> Human friendly configuration file format for Node

## Live Preview Demo

https://imagentleman.github.io/codex/

## Example

```
location (key)
A113 (and value are separated by a newline)

profile.username (you can add comments between parentheses)
hirschfeldnina (all values are strings or numbers)

profile.luckynumber (two or more newlines separate key-value pairs)
42 (numbers are automatically detected)



profile.org
funsociety

profile.id 
'4815162342' (but, you can explicitly make number-like stuff a string)

profile.codename
"007"

websites (multiple values make an array)
218.108.149.373
192.251.68.239
192.251.68.254
i239.bxjyb2jvda.net
conficturaindustries.com

profile.twitter (the order doesn't matter; the profile values did't have to be grouped)
https://twitter.com/1231507051321

(There are no nested representations beyond the ones above [arrays and flat objects].
Instead, we encourage the use of separate files 
[instead of using arrays of objects or objects of objects, etc].)
```

The above example when parsed, would generate the following object:

```
{ 
  location: 'A113',
  profile:{ 
    username: 'hirschfeldnina',
    luckynumber: 42,
    org: 'funsociety',
    id: '4815162342',
    codename: '007',
    twitter: 'https://twitter.com/1231507051321'
  },
  websites: [ 
    '218.108.149.373',
   '192.251.68.239',
   '192.251.68.254',
   'i239.bxjyb2jvda.net',
   'conficturaindustries.com'
  ] 
}

```

## Installation

- Run `npm install -g codexjs` to install it globally
- Or run `npm install --save codexjs` to install it locally and add it to your project's package.json dev dependencies

### Usage

Just require it and send the path of the codex file:

    var codex = require('codexjs');

    var configFromFile = codex.read('example.codex');

Or you can directly sent a string to parse:

    var codex = require('codexjs');

    var configString = fs.readFileSync('example.codex', {
      encoding: 'utf-8'
    });

    var configFromString = codex.parse(configString);
