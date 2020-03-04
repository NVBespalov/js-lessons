const {replace, pipe, prepend} = require('ramda');

module.exports.replaceNonWordChars = replace(/[\\W_]/g, '');

module.exports.applyNonContextual = fn => args => fn(...args);

module.exports.logExecutionTimeWith = hrstart => pipe(
    process.hrtime,
    ([seconds, nanoseconds]) => [seconds, nanoseconds / 1000000],
    prepend('Execution time: %ds %dms'),
    a => console.info(...a)
)(hrstart);

