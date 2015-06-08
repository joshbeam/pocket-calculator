# Pocket Calculator

<a href="https://pocket-calculator.herokuapp.com">Pocket Calculator (live)</a>

This example application mimics a basic-function calculator. It uses <a href="https://angularjs.org/">AngularJS</a> for layout and <a href="http://mathjs.org/">math.js</a> for basic math functions.

## Features

- +, -, &plusmn;, &divide;, &times;, % operators
- Elegant calculation error handling (displays "ERROR" and logs the actual error to the console)
- Frosted glass display

## Requirements

- Modern browser (works on Chrome 43+, Firefox 38+, Safari 7.1.2+, IE10+)
- Node.js, Bower

## Install

```
git clone https://github.com/joshbeam/pocket-calculator.git

npm install

bower install
```

## Run

```
gulp
```

## Known Issues

- Native float imprecision (uses a <a href="http://stackoverflow.com/a/3644302/2714730">fix</a> that mostly works; for example, JavaScript thinks `-0.6 + 2 - 1 = 0.399999`, but it's actually `0.4`. This fix helps with that problem.)

<hr>

MIT License &copy; 2015 Joshua Beam