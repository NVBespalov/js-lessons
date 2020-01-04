const requestHandlers = require('./request-handlers');
const {createServer} = require('http');
const {createReadStream, createWriteStream} = require('fs');
const {resolve, extname} = require('path');
const {Transform, Readable, Writable} = require('stream');
const {factory: filesRequestListenerFactory} = require('./files');

const server = createServer();
const eventsEmitter = server.listen(3000);
const {
    env: {
        DEFAULT_FILE_NAME = 'index.html',
        env = 'development',
        DEFAULT_MIME_TYPES = {},
        DIST_FOLDER = 'dist',
        DATA_FOLDER = 'data'
    }
} = process;
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
        createReadStream(absPath)
            .on('error', error => {
                res.writeHead(404, {[contentType]: (isDev ? json : text)});
                res.end(isDev ? JSON.stringify(error) : '');
            }).pipe(res);
    }
});

const throughSaveStream = ws => new Transform({
    transform(chunk, encoding, callback) {
        ws.write(chunk);
        callback();
    },
    flush(callback) {
        this.push('{success: true}');
        callback();
    }
});

eventsEmitter.addListener('request', (req, res) => {
    if (req.url.indexOf('/files') > -1 && req.method ===  'POST') {
        const fileName = req.url.match(/files\/(.*)/)[1];
        req.pipe(throughSaveStream(createWriteStream(`${DATA_FOLDER}/${fileName}`))).pipe(res);
    }
});
