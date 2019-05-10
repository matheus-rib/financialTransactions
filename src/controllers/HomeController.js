const Transactions = require('../models/Transaction');
const mongoose = require('mongoose');
const currentBalance = require('./currentBalance');
HomeController = {};

HomeController.index = async (req, res) => {  
    // Get the current account Balance and format it to show in Index Page
    let balance = await currentBalance();
    formatedBalance = balance.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    // Load data for charts (General In and Out)
    const transactions = await Transactions.find();
    let dataChartInOut = [
        {
            name: "Recebimentos",
            income: 0,
            outcome: 0
        },            
        {
            name: "Pagamentos",
            income: 0,
            outcome: 0
        },           
        {
            name: "Contas",
            income: 0,
            outcome: 0
        }
    ]

    for(let props in transactions){
        let objectTransaction = transactions[props];
        switch(objectTransaction.category){
            case 'Recebimentos':
                if(objectTransaction.occurrence === "Entrada"){
                    dataChartInOut[0].income += objectTransaction.value;
                }else{
                    dataChartInOut[0].outcome += objectTransaction.value;
                }
            break;
            case 'Pagamentos':
            if(objectTransaction.occurrence === "Entrada"){
                dataChartInOut[1].income += objectTransaction.value;
            }else{
                dataChartInOut[1].outcome += objectTransaction.value;
            }            
            break;
            case 'Contas':
                if(objectTransaction.occurrence === "Entrada"){
                    dataChartInOut[2].income += objectTransaction.value;
                }else{
                    dataChartInOut[2].outcome += objectTransaction.value;
                }    
            break;
        }
    }

    // Load data for the last 10 transactions chart
    const transactionsLastMovs = await Transactions.find().sort( {inclusion: "desc"} ).limit(10);
    let dataChartLastMovs = [
        {
            name: "Recebimentos",
            balance: 0
        },            
        {
            name: "Pagamentos",
            balance: 0
        },           
        {
            name: "Contas",
            balance: 0
        }
    ]

    for(let lastMovsProp in transactionsLastMovs){
        let objectTransaction = transactionsLastMovs[lastMovsProp];
        switch(objectTransaction.category){
            case 'Recebimentos':
                if(objectTransaction.occurrence === "Entrada"){
                    dataChartLastMovs[0].balance += objectTransaction.value;
                }else{
                    dataChartLastMovs[0].balance -= objectTransaction.value;
                }
            break;
            case 'Pagamentos':
            if(objectTransaction.occurrence === "Entrada"){
                dataChartLastMovs[1].balance += objectTransaction.value;
            }else{
                dataChartLastMovs[1].balance -= objectTransaction.value;
            }   
            break;
            case 'Contas':
                if(objectTransaction.occurrence === "Entrada"){
                    dataChartLastMovs[2].balance += objectTransaction.value;
                }else{
                    dataChartLastMovs[2].balance -= objectTransaction.value;
                }
                
            break;
        }
    }

    res.render('pages/home', { balance, formatedBalance, dataChartInOut, dataChartLastMovs });
};

module.exports = HomeController;