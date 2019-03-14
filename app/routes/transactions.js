var express = require('express');
var router = express.Router();
var blockchain = require('../blockchain');

router.post('/new', function(req, res) {
  const values = req.body;
  //check wether the required value contains
  const required_field = ['sender', 'recipient','amount'];
  for (let f of required_field){
    if(!values[f]){
      res.status(400).send('missing required parametes')
      return;
    }
  } 
  const index = blockchain.new_transaction(values['sender'],values['recipient'], values['amount']);
  const ret = {'message': `Transaction will be added to block ${index}`}
  res.status(201).send(JSON.stringify(ret));
});

module.exports = router;
