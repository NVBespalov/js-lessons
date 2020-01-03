const requestHandlers = require('./request-handlers');
const {createWriteStream} = require('fs');
const {Transform} = require('stream');


exports.pipeRequestThroughSaveToResponse = (params) => (req, res) => {
    const wS = createWriteStream(`../data/${params(req.url)}`);
    return req.pipe(new Transform({
        transform(chunk, encoding, callback) {
            const regExpMatchArray = chunk.toString().match(/^data:.+\/(.+);base64,(.*)$/);
            wS.write(regExpMatchArray ? regExpMatchArray[2] : chunk.toString(), 'base64');
            callback();
        },
        flush(callback) {
            wS.close();
            this.push('{ success: true }');
            callback();
        }
    })).pipe(res);
};

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
