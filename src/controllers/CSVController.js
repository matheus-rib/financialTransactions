const express = require('express');
const routes = express.Router();

// CSV Exporting support
const {Parser} = require('json2csv');
const fs = require('fs');
const {promisify} = require('util');
const createFile = promisify(fs.writeFile);

const Transaction = require('../models/Transaction');

CSVController = {};

CSVController.general = async (req, res) => {
    const transactionResult = await Transaction.find()
    const fields = ['value', 'occurrence', 'category', 'observation', 'inclusion'];

    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(transactionResult);
    
    await createFile('transaction.csv', csv)
    var file = __dirname + '../../../transaction.csv';
    res.download(file);

};

CSVController.byPeriodForm = async (req, res) => {
    const transactionResult = await Transaction.find().sort( {inclusion: "desc"} );
    res.render('pages/csv', { transactionResult });

};

CSVController.byPeriod= async (req, res) => {
    monthToExport = req.body.month;
    yearToExport = req.body.year;

    
    const fromDate = new Date(yearToExport, monthToExport, 0);
    const toDate = new Date(fromDate.getFullYear(), fromDate.getMonth(), 1);
    
    const condition = {
        inclusion: {
            $gte: toDate, 
            $lt: fromDate
        }
    };

    const transactionResult = await Transaction.find(condition).sort( {inclusion: "desc"} );
    const fields = ['value', 'occurrence', 'category', 'observation', 'inclusion'];

    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(transactionResult);
    
    await createFile('transaction.csv', csv)
    var file = __dirname + '../../../transaction.csv';
    res.download(file);
};

module.exports = CSVController;