const {createServer} = require('http');
const {createReadStream, createWriteStream} = require('fs');
const {resolve, extname} = require('path');
const {Transform} = require('stream');

const server = createServer();

const {
    env: {
        DEFAULT_FILE_NAME = 'index.html',
        env = 'development',
        DEFAULT_MIME_TYPES = {},
        DIST_FOLDER = 'dist',
        DATA_FOLDER = 'data',
        PORT= 3000
    }
} = process;

const eventsEmitter = server.listen(PORT);

const throughSaveStream = ws => new Transform({
    transform(chunk, encoding, callback) {
        ws.write(chunk);
        callback();
    },
    flush(callback) {
        callback();
    }
});

const isDev = env === 'development';

const contentType = 'Content-Type';

let mimeTypes;

const {text, json} = mimeTypes = {
    'html': 'text/html',
    'jpeg': 'image/jpeg',
    'jpg': 'image/jpeg',
    'png': 'image/png',
    'js': 'text/javascript',
    'css': 'text/css',
    'text': 'plain/text',
    'json': 'application/json'
    , ...DEFAULT_MIME_TYPES
};

eventsEmitter.addListener('request', (req, res) => {
    const relativePath = extname(req.url) === '' ? `${req.url}/${DEFAULT_FILE_NAME}` : req.url;
    const extName = extname(relativePath);
    if (req.method === 'GET' && extName !== '') {
        const fileExtension = extName.split('.').pop();
        const absPath = resolve(`${DIST_FOLDER}${relativePath}`);
        res.on('pipe', () => res.setHeader(contentType, mimeTypes[fileExtension] || text));
        createReadStream(absPath).on('error', error => {
                res.writeHead(404, {[contentType]: (isDev ? json : text)});
                res.end(isDev ? JSON.stringify(error) : '');
            }).pipe(res);
    }
});

eventsEmitter.addListener('request', (req, res) => {
    if (req.url.indexOf('/files') > -1 && req.method === 'POST') {
        const fileName = req.url.match(/files\/(.*)/)[1];
        const writeStream = createWriteStream(`${DATA_FOLDER}/${fileName}`);
        req.pipe(throughSaveStream(writeStream)).pipe(res);
    }
});
