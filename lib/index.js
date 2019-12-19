const {createServer} = require('http');
const {createReadStream,} = require('fs');
const {resolve, extname} = require('path');
const server = createServer();
const eventsEmitter = server.listen(3000);
const {env: {DEFAULT_FILE_NAME = '/index.html', env = 'development', DEFAULT_MIME_TYPES}} = process;
const isDev = env === 'development';
const mimeTypes = ({
    'html': 'text/html',
    'jpeg': 'image/jpeg',
    'jpg': 'image/jpeg',
    'png': 'image/png',
    'js': 'text/javascript',
    'css': 'text/css'
});
eventsEmitter.addListener('request', ({url: requestUrl, method, headers: {accept}}, res) => {
    const url = extname(requestUrl) === '' ? DEFAULT_FILE_NAME : requestUrl;
    const fileExtension = extname(url).split('.').pop();
    const filePath = resolve(`../dist${url}`);
    res.on('pipe', () => res.setHeader('Content-Type', mimeTypes[fileExtension] || 'plain/text'));
    createReadStream(filePath)
        .on('error', error => {
            res.writeHead(404, {'Content-Type': (isDev ? 'application/json' : 'text/html')});
            res.end(isDev ? JSON.stringify(error) : '');
        })
        .pipe(res);
});