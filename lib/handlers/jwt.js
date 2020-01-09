const {uuidv4} = require('../utils/strings');
const {generateJWT, verifyJWT} = require('../utils/jwt');
const {Transform} = require('stream');

const users = [{name: 'admin@local', id: uuidv4()}];

const throughJWTGenerate = () => {
    let body = '';
    return new Transform({
        transform(chunk, encoding, callback) {
            body += chunk.toString();
            callback();
        },
        flush(callback) {
            const credentials = JSON.parse(body);
            if (!credentials) {
                return callback(new Error('User not found'));
            }
            const user = users.find(({name}) => name === credentials.userName);
            if (!user) {
                return callback(new Error('User not found'));
            }
            this.push(generateJWT({...user}));
            callback();
        }
    });
};
const throughJWTVerify = () => {
    let body = '';
    return new Transform({
        transform(chunk, encoding, callback) {
            body += chunk.toString();
            callback();
        },
        flush(callback) {
            callback(verifyJWT(body) ? null : new Error('Unauthenticated'));
        }
    });
};

module.exports = {
    jwtAuthHandler: (req, res) => {
        if (req.url === '/api/authenticate' && req.method === 'POST') {
            req.pipe(throughJWTGenerate()).on('error', (error) => {
                res.writeHead(404).end(JSON.stringify(error));
            }).pipe(res);
        }
    },
    jwtVerifyHandler: (req, res) => {
        if (req.url === '/api/verify' && req.method === 'POST') {
            req.pipe(throughJWTVerify()).on('error', (error) => {
                res.writeHead(500).end(JSON.stringify(error));
            }).pipe(res);
        }
    }
};
