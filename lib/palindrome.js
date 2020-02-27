const {combineLatest, of} = require('rxjs');
const {tap, map} = require('rxjs/operators');
const {compose, split, reverse, join, equals} = require('ramda');
/**
 * Check if a word is palindrome
 * @param {string} word - The word to check
 */
function isPalindrome(word) {
    for (let leftPos = 0, rightPos = word.length - 1; leftPos < word.length; leftPos++, rightPos--) {
        const leftChar = word[leftPos];
        const rightChar = word[rightPos];
        if(leftChar !== rightChar) {
            return false;
        }
    }
    return true;
}

const reverseWord = compose(join(''), reverse, split(''));

const isPalindromeF = (reverseWord, word) => word === reverse(word);

const word$ = of('racecar');

const reversedWord$ = word$.pipe(map(reverse));
combineLatest(word$, reversedWord$)
    .pipe(map(characters => equals(...characters)))
    .pipe(tap(console.log))
    .subscribe();

const hrstart = process.hrtime();
const result = isPalindromeF(reverseWord, 'racecar');
const hrend = process.hrtime(hrstart);
console.info('Execution time (hr): %ds %dms', hrend[0], hrend[1] / 1000000);
console.log(result);
