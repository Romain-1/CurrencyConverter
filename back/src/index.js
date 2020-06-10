const express = require('express');
const port = 4040;
const app = express();
const axios = require('axios');
const cors = require('cors')

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
  console.log('Body:', req.body);
  const currencyFrom = req.body.base_currency;
  const currencyTo = req.body.quote_currency;
  const amount = req.body.value;
  const date = (req.body.date ? req.body.date : "latest");

  if (currencyFrom === undefined
    || currencyTo === undefined
    || amount === undefined) {
      console.log(amount, currencyTo, currencyFrom);
    return res.status(400).send("Bad request, invalid body.");
  }
  if (isNaN(amount)) {
    return res.status(400).send("Bad request, amount should be an integer");
  }
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
  return res.send({value: result});
}

(async function() {
  app.use(cors());
  app.use(express.json());
  app.post("/", getCurrencyMethod);
  app.listen(port, () => {
    console.log("Ready.");
  });
})();

