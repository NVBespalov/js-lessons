const {base64urlEncode, base64urlUnescape} = require('./strings');
const {uuidv4} = require('./strings');
const {createHmac, randomBytes} = require('crypto');

const signingKey = randomBytes(256);

const sign = (payload, key) => base64urlEncode(createHmac('SHA256', key).update(payload).digest());

const verify = (token) => {
    const [metaEnc, body, digestEnc] = token.split('.');
    const meta = JSON.parse(Buffer.from(base64urlUnescape(metaEnc), 'base64').toString());
    const signature = Buffer.from(base64urlUnescape(digestEnc), 'base64').toString('base64');
    const digest = createHmac('SHA256', signingKey)
        .update([metaEnc, body].join('.'))
        .digest('base64');
    return signature === digest && new Date(meta.exp * 1000) > new Date();

};

const generateJWT = (body, {jti = uuidv4(), iat = Math.floor(new Date().getTime() / 1000), exp = (iat + 3600) * 1000} = {}) => {
    const segments = [
        base64urlEncode(JSON.stringify({jti, iat, exp})),
        base64urlEncode(JSON.stringify(body))
    ];
    return segments.concat([sign(segments.join('.'), signingKey)]).join('.');
};

module.exports = {
    generateJWT,
    verifyJWT: verify
};
