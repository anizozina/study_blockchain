const express = require('express');
const router = express.Router();
const blockchain = require('../blockchain');
const identifier = require('../identifier');

/* mine */
router.get('/', function(req, res) {
    console.log('start mine new block');

    const last_block = blockchain.last_block;
    const last_proof = last_block['proof'];
    const proof = blockchain.proof_of_work(last_proof);
    console.log(`find new block! proof ${proof}`);

    //we must receive a reward for finding new proof.
    //The sender is 0 to singify that this node has mined a new reward
    blockchain.new_transaction("0",identifier.id,1);

    //Forge the new Block by adding it to the chain
    const previous_hash = blockchain.hash(last_block);
    const new_block = blockchain.new_block(proof, previous_hash);
    const ret = {        
        'message': "New Block Forged",
        'index': new_block['index'],
        'transactions': new_block['transactions'],
        'proof': new_block['proof'],
        'previous_hash': new_block['previous_hash']
    }

    res.status(200).send(JSON.stringify(ret, null, 2));
});

module.exports = router;
