const mongoose = require('mongoose');
const Transaction = mongoose.model('Transaction');

module.exports = async function currentBalance(){
    const transaction = await Transaction.find({}, 'value occurrence');
    let balance = 0;
        for(let index in transaction){
            let currentObject = transaction[index];

            if(currentObject.occurrence === "Entrada"){
                balance += currentObject.value;
            }else{
                balance -= currentObject.value;
            }
        }
    return balance;
};

