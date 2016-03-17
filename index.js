'use strict';

const got = require('got');
const cheerio = require('cheerio');
const chalk = require('chalk');
const columnify = require('columnify');

const SEARCH_URL = 'https://www.npmjs.com/search?q=';

const parse = markup => {
  const $ = cheerio.load(markup);

  return $('.search-results .package-details').map((index, element) => {
    const $element = $(element);

    return {
      name: $element.find('.name').text(),
      description: $element.find('.description').text(),
      author: $element.find('.author').text(),
      version: $element.find('.version').text().replace(/^v/, ''),
      keywords: $element
        .find('.keywords')
        .text()
        .replace(/\s|\n/gm, '')
        .split(',')
        .join(' ')
    };
  }).get();
};

const highlight = (output, keyword) => {
  return output.replace(new RegExp(keyword, 'gim'), chalk.bold(keyword));
};

const getMaxWidth = () => {
  let columns;

  try {
    const tty = require('tty');
    columns = tty.isatty(process.stdout.fd) ? process.stdout.getWindowSize()[0] : Infinity;
    columns = columns === 0 ? Infinity : columns;
  } catch (error) {
    columns = Infinity;
  }

  return columns;
};

const trimToMaxWidth = output => {
  const maxWidth = getMaxWidth();

  return output
    .split('\n')
    .map(line => line.slice(0, maxWidth))
    .join('\n');
};

const format = (results, keyword) => {
  if (!results.length) {
    return `No results found for "${keyword}"`;
  }

  let output = columnify(results, {
    truncate: true,
    config: {
      name: {maxWidth: 40, truncate: false, truncateMarker: ''},
      description: {maxWidth: 60},
      author: {maxWidth: 20},
      version: {maxWidth: 15},
      keywords: {maxWidth: Infinity}
    }
  });

  output = trimToMaxWidth(output);
  output = highlight(output, keyword);

  return output;
};

const fetch = keyword => {
  return got(`${SEARCH_URL}${keyword}`)
    .then(response => {
      return parse(response.body);
    })
    .then(response => {
      console.log(format(response, keyword));
    })
    .catch(error => {
      console.error(error.stack);
      process.exit(1);
    });
};

module.exports = options => fetch(options.keyword);
