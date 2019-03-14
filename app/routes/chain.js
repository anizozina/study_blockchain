const express = require('express');
const router = express.Router();
const stringify = require('json-stable-stringify');
const blockchain = require('../blockchain');

router.get('/', function(req, res, next) {
    const value = {
        'chain': blockchain.chain,
        'length': blockchain.chain.length,
    }
    res.send(stringify(value));
});

module.exports = router;
