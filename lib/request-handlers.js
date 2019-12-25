module.exports = (fn, {method = 'GET', url = '.*'} = {}) => (req, res) => {
    if (req.method === method && (new RegExp(url).test(req.url)) || url === '*') {
        fn(req, res);
    }
};

