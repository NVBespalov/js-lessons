const {from} = require('rxjs');
const {flatMap, reduce, tap} = require('rxjs/operators');
const {cond, includes, flip, T, identity, append} = require('ramda');

const entries = ['Разнообразный', 'привет', 'мама', 'брат', 'сестра', 'бабушка'];
// expected ['Разнобрый', 'привет', 'ма', 'брат', 'сетра', 'баушк'];

// function words (arr) {
//     let result = [];
//     for(let i = 0; i < arr.length; i++) {
//         const word = arr[i];
//         let resultWord = '';
//         for(let position = 0; position < word.length; position++) {
//             const symbol = word[position];
//             if(resultWord.indexOf(symbol) === -1) {
//                 resultWord += symbol;
//             }
//         }
//         result.push(resultWord);
//     }
//     return result;
// }
//
// console.log(words(entries));

// const addSymbolIfNotIncludes = (resultWord, symbol) => resultWord.includes(symbol) ? resultWord : resultWord + symbol;
//
// entries.map(word => word.split('').reduce(addSymbolIfNotIncludes, ''));

const add = (a, b) => a + b;

const includesLeft = flip(includes);
const appendLeft = flip(append);
const addSymbolIfNotIncludes = cond([[includesLeft, identity], [T, add]]);

const everyWordWithUniqueCharacters = word => from(word).pipe(reduce(addSymbolIfNotIncludes, ''));

from(entries)
    .pipe(flatMap(everyWordWithUniqueCharacters))
    .pipe(reduce(appendLeft, []))
    .pipe(tap(console.log))
    .subscribe();
