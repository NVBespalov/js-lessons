const requestHandlers = require('./request-handlers');
const {createWriteStream} = require('fs');
const {Transform} = require('stream');

exports.getSaveFileFromJSON = (name) => {
    return new Transform({transform:  (chunk, enc, cb) => {
            const writeStream = createWriteStream(name);
            writeStream.write(new Buffer.from(chunk.toString(), 'base64'), cb);
        }});
};

exports.pipeRequestThroughSaveToResponse = (params) => (req, res) => req.pipe(this.getSaveFileFromJSON(`../data/${params(req.url)}`)).pipe(res);

const defaultOptions = {
    method: 'POST',
    url: '/files',

    params(source) {
        return new RegExp(this.url).exec(source).slice(1);
    }
};

exports.factory = (options = defaultOptions) => {
    const resultOptions = {...defaultOptions, ...options};
    return requestHandlers(this.pipeRequestThroughSaveToResponse(resultOptions.params.bind(resultOptions)), resultOptions);
};
