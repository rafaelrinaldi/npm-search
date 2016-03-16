[author]: http://rinaldi.io
[npm]: https://npmjs.org
[npm-gh]: http://github.com/npm/npm

# npm-search [![Build Status](https://semaphoreci.com/api/v1/rafaelrinaldi/npm-search/branches/master/badge.svg)](https://semaphoreci.com/rafaelrinaldi/npm-search)

> Faster `npm search`

## Install

```sh
$ npm i @rafaelrinaldi/npm-search -g
```

## Benchmark

| Command | Output |
| :--- | :--- |
| `time npm search typeahead` | `21.70` real `16.41` user `1.78` sys |
| `time npm-search typeahead` | `1.59` real `0.39` user `0.04` sys |

## Notes

* Scrape pages from [npmjs.org][npm] on every run (no caching whatsoever)
* Output look almost exactly the same from `npm search` (shout out to [npm][npm-gh] for being open source)
* Will display the first 20 results available

## License

MIT © [Rafael Rinaldi][author]
