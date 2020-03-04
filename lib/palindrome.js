/**
 * Check if a word is palindrome
 * @param {string} word - The word to check
 */
module.exports.isPalindrome = function (word) {
    const wordWithoutSpace = word.replace(' ', '').toLocaleLowerCase();
    for (let leftPos = 0, rightPos = wordWithoutSpace.length - 1; leftPos < wordWithoutSpace.length; leftPos++, rightPos--) {
        const leftChar = wordWithoutSpace[leftPos];
        const rightChar = wordWithoutSpace[rightPos];
        if (leftChar !== rightChar) {
            return false;
        }
    }
    return true;
};
