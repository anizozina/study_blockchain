import stringify from 'json-stable-stringify'
import crypto from 'crypto'

class Blockchain{
    constructor(){
        if ( !Blockchain.instance) {
            this._chain = [];
            this._current_transactions = [];
            this._last_block = {};
            this.new_block(100,1);
        }
        return Blockchain.instance;
    }

    /**
     * Create new Block in the Blockchain
     * @param {} proof the proof given by the Proof of work algorithm
     * @param {*} previous_hash Hash of previous Block
     * @returns New Block
     */
    new_block(proof, previous_hash=null){
        const block = {
            'index' : this._chain.length + 1,
            'timestamp' : Date.now(),
            'transactions': [...this._current_transactions],
            'proof': proof,
            'previous_hash': previous_hash ? previous_hash: this.hash(this._chain[this._chain.length - 1]),
        }
        this._current_transactions = [];
        this._chain.push(block);
        this._last_block = block;
        return block;
    }

    get chain() {
        return this._chain;
    }

    get last_block(){
        return this._last_block;
    }

    /**
     * Create a new transaction to go into the next mined Block
     */
    new_transaction(sender, recipient, amount){
        this._current_transactions.push({
            'sender': sender,
            'recipient': recipient,
            'amount': amount,
        });

        return this._last_block['index'] + 1;
    }

    proof_of_work(last_proof){
        let proof = 0;
        while (!Blockchain.valid_proof(last_proof, proof)){
            proof += 1;
        }
        return proof;
    }

    hash(block){
        let block_string = stringify(block);
        return crypto.createHash('sha256').update(block_string).digest('hex');
    }

    static valid_proof(last_proof, proof){
        const guess = `${last_proof}${proof}`; //should be bytes?
        const guess_hash = crypto.createHash('sha256').update(guess).digest('hex');
        console.log(guess_hash);
        return guess_hash.substr(-4) == '0000';
    }

}

const instance = new Blockchain();
module.exports = instance;