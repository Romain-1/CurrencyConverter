<template>
  <div id="app">
    <div class="row">
      <div class="container">
        <h2 class="title">Amount</h2>
        <br/>
        <input type="text" v-model="amount" size="15">
      </div>
      <div class="container">
        <h2 class="title">From</h2>
        <br/>
        <input type="text" v-model="base" size="15">
      </div>
      <div class="container">
        <h2 class="title">To</h2>
        <br/>
        <input type="text" v-model="quote" size="15">
      </div>
      <div class="container">
        <h2 class="title">Date</h2>
        <br/>
        <input type="text" v-model="date" size="15">
        <p>YYYY-MM-DD</p>
      </div>
      <button class="button" v-on:click="convert()">
        Convertir
      </button>
      <div class="container">
        <h2 class="title">Result</h2>
        <br/>
        <p class="title">
          {{ amount }} {{ base }} = {{ result }} {{ quote }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data: function() {
    return ({
      amount: 1,
      base: "EUR",
      quote: "USD",
      date: "latest",
      result: 1.1294
    })
  },
  methods: {
    convert: async function() {
      const axios = require('axios');
      this.amount = parseInt(this.amount);
      console.log(this.base, this.amount, this.quote);
      try {
        this.result = (await axios.post("http://localhost:4040/", {
          base_currency: this.base,
          value: this.amount,
          quote_currency: this.quote,
          date: this.date
        })).data.value;
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>

<style scoped>
@font-face {
  font-family: "coolvetica";
  src: url("./assets/coolveticarg.ttf");
}

.app {
}

.row {
  float: left;
  display: flex;
}

.button {
  background-color: rgb(46, 134, 193);
  border-radius: 10px;
  border-style: hidden;
  font-family: coolvetica;
}

.button:hover {
    background-color: rgb(16, 104, 163);
    -webkit-transition: background-color 1s;
}

.container {
  margin: 0 auto;
  background-color: gray;
  border-radius: 5px;
  padding: 10px;
  margin: 10px;
}

input {
  font-family: coolvetica;
  border-radius: 5px;
  border-style: hidden;
  font-size: 25px;
}

.title {
  font-family: coolvetica;
}
</style>

