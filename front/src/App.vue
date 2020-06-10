<template>
  <div id="app">
    <h1 class="title">Currency Converter</h1>
    <div class="row">
      <div class="container">
        <h2 class="title">Amount</h2>
        <br/>
        <input type="text" v-model="amount" @input="actualise()">
      </div>
      <div class="container">
        <h2 class="title">From</h2>
        <br/>
        <select v-model="base" v-on:click="convert()">
          <option v-for="currency in currencies" v-bind:key="currency.value" v-bind:value="currency.value">
            {{ currency.text }}
          </option>
        </select>
      </div>
      <div class="container">
        <h2 class="title">To</h2>
        <br/>
        <select v-model="quote" v-on:click="convert()">
          <option v-for="currency in currencies" v-bind:key="currency.value" v-bind:value="currency.value">
            {{ currency.text }}
          </option>
        </select>
      </div>
      <div class="container">
        <h2 class="title">Date</h2>
        <br/>
        <center>
          <input v-model="date" type="date" @input="convert()">
        </center>
      </div>
      <div class="container">
        <h2 class="title">Result</h2>
        <br/>
        <p id="result-text">
          {{ amount }} {{ base }} ⮀ {{ result }} {{ quote }}
        </p>
      </div>
    </div>
    <div class="row">
      <trend
        :data="historic"
        :gradient="['#ffbe88', '#ff93df', '#2c3e50']"
        auto-draw
        smooth
      ></trend>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data: function() {
    return ({
      amount: 1,
      base: "EUR",
      quote: "USD",
      date: "2020-06-10",
      historic: [1, 5, 7, 2, 7, 2, 9, 0],
      ratio: 1.0,
      result: 1.1294,
      menu_display: true,
      currencies: [
        { value: 'EUR', text: 'EUR - Euro' },
        { value: 'CAD', text: 'CAD - Canadian Dollar' },
        { value: 'HKD', text: 'HKD - Hong Kong Dollar' },
        { value: 'ISK', text: 'ISK - Icelandic króna' },
        { value: 'PHP', text: 'PHP - Philippine peso' },
        { value: 'DKK', text: 'DKK - Danish krone' },
        { value: 'HUF', text: 'HUF - Hungarian forint' },
        { value: 'CZK', text: 'CZK - Czech koruna' },
        { value: 'AUD', text: 'AUD - Australian dollar' },
        { value: 'RON', text: 'RON - Romanian leu' },
        { value: 'SEK', text: 'SEK - Swedish krona' },
        { value: 'IDR', text: 'IDR - Indonesian rupiah' },
        { value: 'INR', text: 'INR - Indian rupee' },
        { value: 'BRL', text: 'BRL - Brazilian real' },
        { value: 'RUB', text: 'RUB - Russian ruble' },
        { value: 'HRK', text: 'HRK - Croatian kuna' },
        { value: 'JPY', text: 'JPY - Yen' },
        { value: 'THB', text: 'THB - Thai baht' },
        { value: 'CHF', text: 'CHF - Swiss franc' },
        { value: 'SGD', text: 'SGD - Singapore dollar' },
        { value: 'PLN', text: 'PLN - Polish złoty' },
        { value: 'BGN', text: 'BGN - Bulgarian lev' },
        { value: 'TRY', text: 'TRY - Turkish lira' },
        { value: 'CNY', text: 'CNY - Renminbi' },
        { value: 'NOK', text: 'NOK - Norwegian krone' },
        { value: 'NZD', text: 'NZD - New Zealand dollar' },
        { value: 'ZAR', text: 'ZAR - South African rand' },
        { value: 'USD', text: 'USD - American Dollar' },
        { value: 'MXN', text: 'MXN - Mexican peso' },
        { value: 'ILS', text: 'ILS - Israeli new shekel' },
        { value: 'GBP', text: 'GBP - Livre sterling' },
        { value: 'KRW', text: 'KRW - South Korean won' },
        { value: 'MYR', text: 'MYR - Malaysian ringgi '}
      ]
    })
  },
  methods: {
    convert: async function() {
      try {
        const result = (await axios.post("http://localhost:4040/", {
          base_currency: this.base,
          value: this.amount,
          quote_currency: this.quote,
          date: this.date
        })).data;
        this.ratio = result.ratio;
        this.result = result.value;
        this.historic = result.historic;
        console.log(this.ratio);
      } catch (e) {
        console.log(e);
      }
    },
    actualise: function() {
      this.result = parseFloat(this.amount) * this.ratio;
    }
  }
};
</script>

<style scoped>
@font-face {
  font-family: "coolvetica";
  src: url("./assets/coolveticarg.ttf");
}

.row {
  display: flex;
  justify-content: center;
}

.container {
  margin: 0 auto;
  background-color: rgb(100, 175, 225);
  -webkit-transition: background-color 1s;
  border-radius: 5px;
  padding: 10px;
  margin: 10px;
  width: 250px;
  text-align: center;
}

.container:hover {
  background-color: rgb(70, 145, 195);
  -webkit-transition: background-color 1s;
}

select, input, #result-text {
  font-family: sans-serif;
	font-weight: 700;
  border-radius: 5px;
  border-style: hidden;
  font-size: 16px;
  background-color: white;
  text-align: center;
	line-height: 1.3;
	color: #444;
	padding: .6em 1.4em .5em .8em;
}

select {
	display: block;
	width: 100%;
	max-width: 100%;
	margin: 0;
	appearance: none;
	background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E');
	background-repeat: no-repeat, repeat;
	background-position: right .7em top 50%, 0 0;
	background-size: .65em auto, 100%;
}

select::-ms-expand {
	display: none;
}

select:hover {
	border-color: #888;
}

select:focus {
	border-color: #aaa;
	box-shadow: 0 0 1px 3px rgba(59, 153, 252, .7);
	box-shadow: 0 0 0 3px -moz-mac-focusring;
	color: #222;
	outline: none;
}

select option {
	font-weight:normal;
}

h1 {
  text-align: center;
}

.title {
  font-family: sans-serif;
  color: rgb(30, 54, 70);
}

#app, .row, .container,  {
  margin-left: auto;
  margin-right: auto;
}

</style>

