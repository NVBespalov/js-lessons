const {of, combineLatest} = require('rxjs');
const {map, tap} = require('rxjs/operators');
const {toLower, reverse, equals} = require('ramda');
const {replaceNonWordChars, logExecutionTimeWith, applyNonContextual} = require('./utils/tools');

module.exports.isPalindrome = word => {
    const word$ = of(word).pipe(map(replaceNonWordChars)).pipe(map(toLower));
    const reversedWord$ = word$.pipe(map(reverse));
    return combineLatest([word$, reversedWord$])
        .pipe(map(applyNonContextual(equals)))
        .pipe(tap(console.log))
        .pipe(tap(logExecutionTimeWith(process.hrtime())))
};

this.isPalindrome('racecar').subscribe();
