const {combineLatest, of} = require('rxjs');
const {tap, map} = require('rxjs/operators');
const {compose, split, reverse, join, equals} = require('ramda');
/**
 * Check if a word is palindrome
 * @param {string} word - The word to check
 */
module.exports.isPalindrome = function(word) {
    const wordWithoutSpace = word.replace(' ', '').toLocaleLowerCase();
    for (let leftPos = 0, rightPos = wordWithoutSpace.length - 1; leftPos < wordWithoutSpace.length; leftPos++, rightPos--) {
        const leftChar = wordWithoutSpace[leftPos];
        const rightChar = wordWithoutSpace[rightPos];
        if(leftChar !== rightChar) {
            return false;
        }
    }
    return true;
}

// const reverseWord = compose(join(''), reverse, split(''));
//
// const isPalindromeF = (reverseWord, word) => word === reverse(word);
//
// const word$ = of('racecar');

// const reversedWord$ = word$.pipe(map(reverse));
// combineLatest(word$, reversedWord$)
//     .pipe(map(characters => equals(...characters)))
//     .pipe(tap(console.log))
//     .subscribe();

const hrstart = process.hrtime();
const result = this.isPalindrome('race car');
const hrend = process.hrtime(hrstart);
console.info('Execution time (hr): %ds %dms', hrend[0], hrend[1] / 1000000);
console.log(result);
