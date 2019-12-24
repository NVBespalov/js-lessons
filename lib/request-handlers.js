module.exports = (fn, {method = 'GET', url = '*'} = {}) => (req, res) => {
    if (req.method === method && (req.url === url || url === '*')) {
        fn(req, res);
    }
};

