const fs = require('fs');
const path = require("path");
const toml = require('@iarna/toml');

let config = toml.parse(fs.readFileSync(path.resolve('./config/coverage.toml'), 'utf8'));
let coverage = JSON.parse(JSON.stringify(config, null, 4));

console.log(coverage);

module.exports.getCoverage = coverage;