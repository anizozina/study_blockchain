 
const block = {
    'index' : 1,
    'timestamp' : Date.now(),
    'transactions': [],
    'proof': 100,
    'previous_hash': 1,
}

const stringify = require('json-stable-stringify');
const crypto = require('crypto');
console.log(block);
const block_string = stringify(block);
console.log(block_string);
console.log(crypto.createHash('sha256').update(block_string).digest('hex'));

const last_proof = 100;
const proof = 1;
const guess = '${last_proof}${proof}'
const guess_hash = crypto.createHash('sha256').update(guess).digest('hex');
console.log(guess_hash);
console.log(guess_hash.substr(-4));