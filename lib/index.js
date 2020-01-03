const {createServer} = require('http');
const {createReadStream, readFile, readdirSync, readdir} = require('fs');
// const {createReadStream} = require('fs');
const {resolve, extname} = require('path');
const server = createServer();
const eventsEmitter = server.listen(80);
const {env: {DEFAULT_FILE_NAME = '/index.html', env = 'development', DEFAULT_MIME_TYPES = {}, DIST_FOLDER = 'dist'}} = process;
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
// let result = {};
// readdir(DIST_FOLDER, (e, list) => {
//     list.forEach((fileName) => readFile(`${DIST_FOLDER}/${fileName}`, (err, file) => file && (result[fileName] = file)));
//
// });

eventsEmitter.addListener('request', ({url: requestUrl}, res) => {
    const url = extname(requestUrl) === '' ? DEFAULT_FILE_NAME : requestUrl;
    const fileExtension = extname(url).split('.').pop();
    const filePath = resolve(`${DIST_FOLDER}${url}`);
    // const file = result[url.split('/')[1]];
    // res.on('pipe', () => res.setHeader(contentType, mimeTypes[fileExtension] || text));
    // createReadStream(filePath)
    //     .on('error', error => res.writeHead(404, {[contentType]: (isDev ? json : text)}).end(isDev ? JSON.stringify(error) : ''))
    //     .pipe(res);
    // if (file) {
    //     return res.writeHead(200, {[contentType]: mimeTypes[fileExtension] || text}).end(file);
    // }
    readFile(filePath, (err, file) => err ? (res.writeHead(404).end(JSON.stringify(err))) : res.writeHead(200, {[contentType]: mimeTypes[fileExtension] || text}).end(file));

});
