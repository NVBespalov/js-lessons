const uuidv4 = () => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
});
const base64urlEncode = data => {
    const str = typeof data === 'number' ? data.toString() : data;
    return Buffer.from(str)
        .toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
};

const base64urlUnescape = str => `${str + new Array(5 - str.length % 4).join('=')}`
    .replace(/-/g, '+').replace(/_/g, '/');
module.exports = {
    uuidv4,
    base64urlEncode,
    base64urlUnescape
};
