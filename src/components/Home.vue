<template>
  <div>
    <li v-for="country in countries">
      <router-link v-bind:to="'/detail/' + country.alpha3Code">
        <img :src="country.flag" />
        <p class="text-dark">{{ country.name }}</p>
      </router-link>
    </li>
    <button v-on:click="sort" class="btn btn-primary">
      Sort Alphabetically
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      countries: []
    };
  },
  created() {
    this.$http.get("https://restcountries.eu/rest/v2/all").then(response => {
      localStorage.setItem("allCountries", JSON.stringify(response.body));
      let randomCountry;
      for (let i = 0; i < response.body.length; i++) {
        randomCountry =
          response.body[Math.floor(Math.random() * response.body.length)];
        if (!this.countries.includes(randomCountry)) {
          this.countries.push(randomCountry);
        }
        if (this.countries.length === 10) {
          break;
        }
      }
    });
  },
  methods: {
    sort: function() {
      this.countries.sort((a, b) => {
        let nameA = a.name.toLowerCase();
        let nameB = b.name.toLowerCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 0;
        }
      });
    }
  }
};
</script>

<style scoped>
div {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  margin: 100px auto;
}

,
li {
  list-style-type: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 33%;
  cursor: pointer;
}

,
li img {
  width: 300px;
}

button {
  cursor: pointer;
  width: 200px;
  position: absolute;
  top: 8%;
}

@media (min-width: 400px) and (max-width: 800px) {
  div {
    flex-direction: column;
    margin-top: 200px;
  }
  button{
    top: 20%;
    left: 0
  }
}
</style>
