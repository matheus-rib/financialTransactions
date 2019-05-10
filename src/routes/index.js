const express = require('express');
const routes = express.Router();

// Transaction Model
const Transaction = require('../models/Transaction');

const HomeController = require('../controllers/HomeController');
const TransactionController = require('../controllers/TransactionController');
const CSVController = require('../controllers/CSVController');

// Load routes
routes.get('/', HomeController.index);

routes.get('/transactions', TransactionController.index);
routes.post('/transactions', TransactionController.store);

routes.get('/csv', CSVController.general);

routes.get('/csvForm', CSVController.byPeriodForm);
routes.post('/csvForm', CSVController.byPeriod);

module.exports = routes;