
class Identifier{
    constructor(){
        if(!Identifier.instance){
            const uuid4 = require('uuid4');
            const _node_identifier = uuid4().replace('-', '');
        }
        return Identifier.instance;
    }
    get id(){
        return this._node_identifier;
    }
}
const instance = new Identifier();
Object.freeze(instance);//hadnel the instance as immutable
module.exports = instance;