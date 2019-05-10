const Transactions = require('../models/Transaction');
TransactionController = {};

// Load page with all the movements
TransactionController.index = async (req, res) => {
    const transactions = await Transactions.find().sort( {inclusion: "desc"} );
    res.render('pages/transactions', { transactions });
};

// Store the data in the form in DB
TransactionController.store = async (req, res) => {
    let transaction = {};
    transaction.value = parseFloat(req.body.valor.replace(',','.'));
    transaction.occurrence = req.body.tipo;
    transaction.category = req.body.categoria;
    transaction.observation = req.body.observacao;

    await Transactions.create(transaction);
    transactions = await Transactions.find().sort( {inclusion: "desc"} );
    res.render('pages/transactions', { transactions });
};

module.exports = TransactionController;