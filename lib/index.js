const {createServer} = require('http');
const {createReadStream,} = require('fs');
const {resolve, extname} = require('path');
const server = createServer();
const eventsEmitter = server.listen(3000);
const {env: {DEFAULT_FILE_NAME = '/index.html', env = 'development', DEFAULT_MIME_TYPES}} = process;
const isDev = env === 'development';
const contentType = 'Content-Type';
let mimeTypes;
const {html, text, json } = mimeTypes = {
        'html': 'text/html',
        'jpeg': 'image/jpeg',
        'jpg': 'image/jpeg',
        'png': 'image/png',
        'js': 'text/javascript',
        'css': 'text/css',
        'text': 'plain/text',
        'json': 'application/json'
    , ...DEFAULT_MIME_TYPES};
eventsEmitter.addListener('request', ({url: requestUrl}, res) => {
    const url = extname(requestUrl) === '' ? DEFAULT_FILE_NAME : requestUrl;
    const fileExtension = extname(url).split('.').pop();
    const filePath = resolve(`../dist${url}`);
    res.on('pipe', () => res.setHeader(contentType, mimeTypes[fileExtension] || text));
    createReadStream(filePath)
        .on('error', error => {
            res.writeHead(404, {[contentType]: (isDev ? json : html)});
            res.end(isDev ? JSON.stringify(error) : '');
        })
        .pipe(res);
});
