const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  fs.readFile(path.join(__dirname, '../src/index.html'), 'utf8', (err, html) => {
    res.set({'Content-Type': 'text/html'}).send(html);
  })
})

app.get(/.css/, (req, res) => {
  fs.readFile(path.join(__dirname, '../src/styles.css'), 'utf8', (err, css) => {
    res.set({'Content-Type': 'text/css'}).send(css);
  });
});

app.get(/\/build/, (req, res) => {
  fs.readFile(path.join(__dirname, '../build/bundle.js'), 'utf8', (err, build) => {
    res.set({'Content-Type': 'application/javascript'}).send(build);
  })
})

app.listen(port);