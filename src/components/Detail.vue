<template>
  <div class="d-flex flex-column justify-content-around p-3 wrapper">
    <div class="d-flex justify-content-around container p-3">
      <img :src="country.flag" />
      <div>
        <h3>Country: {{ country.name }}</h3>
        <h3>Currency: {{ country.currencies[0].name }}</h3>
        <h3>Language: {{ country.languages[0].name }}</h3>
        <h3 v-if="country.borders.length > 0">Borders</h3>
        <li v-for="border in country.borders" v-if="border.length > 0">
          {{ border }}
        </li>
      </div>
    </div>
    <div class="recommended">
      <h1>Recommendations</h1>
      <div class="main">
        <li v-for="country in recommended" class="text-center">
          <router-link v-bind:to="'/detail/' + country.alpha3Code">
            <img :src="country.flag" />
            <p class="text-dark">{{ country.name }}</p>
          </router-link>
        </li>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      code: this.$route.params.code,
      country: {},
      recommended: []
    };
  },
  created() {
    this.$http
      .get(`https://restcountries.eu/rest/v2/alpha/${this.code}`)
      .then(function(response) {
        this.country = response.body;
      })
      .then(function(response) {
        this.$http
          .get(`https://restcountries.eu/rest/v2/region/${this.country.region}`)
          .then(function(response) {
            let randomCountry;
            for (let i = 0; i < response.body.length; i++) {
              randomCountry =
                response.body[Math.floor(Math.random() * response.body.length)];
              if (
                randomCountry.name !== this.country.name &&
                !this.recommended.includes(randomCountry)
              ) {
                this.recommended.push(randomCountry);
              }
              if (this.recommended.length === 3) {
                break;
              }
            }
          });
      });
  }
};
</script>

<style scoped>
.wrapper {
  margin: 120px auto;
}

img {
  width: 500px;
}

.recommended {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: 50vh;
  margin: 50px auto;
}

.main {
  display: flex;
  justify-content: space-evenly;
  width: 70%;
}

.recommended li {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  list-style-type: none;
  width: 33%;
}

.recommended li img {
  width: 300px;
}

@media (min-width: 400px) and (max-width: 800px) {
  .wrapper {
    margin: 200px auto;
  }

  .container {
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
  }

  .recommended {
    margin: 200px auto 0;
  }

  .main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 70%;
}
}
</style>
