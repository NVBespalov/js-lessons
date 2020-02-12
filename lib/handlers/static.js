const {resolve, extname} = require('path');
const {createReadStream,} = require('fs');
const {env: {DEFAULT_FILE_NAME = '/index.html', env = 'development', DEFAULT_MIME_TYPES = {}, DIST_FOLDER = `../dist`}} = process;
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
const isDev = env === 'development';
const contentType = 'Content-Type';
module.exports = ({url: requestUrl, method}, res) => {
    if (method === 'GET' && requestUrl.indexOf('/api') === -1) {
        const url = extname(requestUrl) === '' ? DEFAULT_FILE_NAME : requestUrl;
        const fileExtension = extname(url).split('.').pop();
        const filePath = resolve(`${DIST_FOLDER}${url}`);
        res.on('pipe', () => res.setHeader(contentType, mimeTypes[fileExtension] || text));
        createReadStream(filePath)
            .on('error', error => res.writeHead(404, {[contentType]: (isDev ? json : text)}).end(isDev ? JSON.stringify(error) : ''))
            .pipe(res);
    }
};
