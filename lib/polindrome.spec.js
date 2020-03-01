'use strict';

const {isPalindrome} = require('./palindrome');
const {expect} = require('chai');

describe('Palindrome', () => {
    describe('basic palindrome', () => {
        it('should return true', () => {
            expect(isPalindrome('racecar')).to.equal(true);
        });
    });
    describe('palindrome with space', () => {
        it('should return true if palindrome has space', () => {
            expect(isPalindrome('race car')).to.equal(true);
        });
    });
    describe('palindrome with caseinsensitive', () => {
        it('should return true if palindrome has Upper case symbols', () => {
            expect(isPalindrome('Racecar')).to.equal(true);
        });
    })
});
