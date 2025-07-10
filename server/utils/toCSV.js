const { Parser } = require('json2csv');

module.exports = function jsonToCSV(json) {
  const parser = new Parser();
  return parser.parse(json);
};
