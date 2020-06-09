const express = require('express');
const port = 8080;
const app = express();
const axios = require('axios');

async function getCurrency(date) {
  let response = undefined;
  try {
    response = await axios.get(`https://api.exchangeratesapi.io/${date}`);
  } catch (e) {
    console.log("Error when trying to access API.");
  }
  return (response ? response.data.rates : undefined);
}

function convertCurrency(amount, currencyFrom, currencyTo, currencies) {
  if (currencies[currencyFrom] === undefined
    || currencies[currencyTo] === undefined) {
    console.log("Unrecognized currency.");
    return (undefined);
  }
  return (
    amount /
    currencies[currencyFrom] *
    currencies[currencyTo]
  );
}

async function getCurrencyMethod(req, res) {
  const currencyFrom = req.query.from;
  const currencyTo = req.query.to;
  let amount = req.query.amount;
  const date = req.query.date;

  if (currencyFrom === undefined
    || currencyTo === undefined
    || amount === undefined
    || date === undefined) {
    return res.status(400).send("Bad request, invalid query.");
  }
  if (isNaN(amount)) {
    return res.status(400).send("Bad request, amount should be an integer");
  }
  amount = parseInt(amount);
  let currencies = await getCurrency(date);
  if (currencies === undefined) {
    return res.status(400).send("An error occured when trying to access API.");
  }
  currencies['EUR'] = 1.0;
  const result = convertCurrency(amount, currencyFrom, currencyTo, currencies);
  if (result === undefined) {
    return res.status(400).send(`Unrecognized currency.`);
  }
  console.log(currencyFrom, currencyTo, amount, date, result);
  return res.send(`From: ${currencyFrom}\tTo: ${currencyTo}\tAmount: ${amount}\tDate: ${date}\tResult: ${result}`);
}

function addRoutes(app) {
  app.get("/", getCurrencyMethod);
}

(async function() {
  addRoutes(app);
  app.listen(port, () => {
    console.log("Ready.");
  });
})()

