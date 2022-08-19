/**
 * This files runs post-build to remove excess spacing from strings generated within the code
 */

const fs = require('fs');

// Get built bookmarklet code
const src = fs.readFileSync('./dist/bookmarklet.js', 'utf-8');

// Set up minify
let minifiedSrc = src;

// Remove new lines
minifiedSrc = minifiedSrc.replace(/\n/g, ' ');
minifiedSrc = minifiedSrc.replace(/\\n/g, ' ');

// Remove excess spaces
minifiedSrc = minifiedSrc.replace(/[ ]+/g, ' ');

// Write new minified src
fs.writeFileSync('./dist/bookmarklet.js', minifiedSrc, 'utf-8');