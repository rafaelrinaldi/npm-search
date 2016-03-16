#!/usr/bin/env node

'use strict';

const npmSearch = require('./');
const minimist = require('minimist');
const version = require('./package.json').version;
const defaults = {
  boolean: [
    'help',
    'version'
  ],
  alias: {
    h: 'help',
    v: 'version'
  }
};
const options = minimist(process.argv.slice(2), defaults);
const help = `
Usage: npm-search <KEYWORD>

  Faster npm search

Example:
  npm-search react

Options:
  -v --version          Display current software version
  -h --help             Display software help and usage details
`;

const run = options => {
  if (options.help) {
    process.stderr.write(help);
    return;
  }

  if (options.version) {
    process.stderr.write(`npm-search v${version}\n`);
    return;
  }

  const keyword = options._[0];

  if (keyword !== undefined && keyword.length) {
    npmSearch({keyword});
  } else {
    process.stderr.write('You must provide a valid keyword\n');
    process.exit(1);
  }
};

run(options);
