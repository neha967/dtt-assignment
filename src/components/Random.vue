<template>
  <div class="text-center">
    <router-link v-bind:to="'/detail/' + country.alpha3Code">
      <img :src="country.flag" />
      <p class="text-dark">{{ country.name }}</p>
    </router-link>
    <button class="btn btn-primary" @click="random">
      Generate a Random Country
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      country: {}
    };
  },
  created() {
    this.$http.get("https://restcountries.eu/rest/v2/all").then(response => {
      this.country =
        response.body[Math.floor(Math.random() * response.body.length)];
    });
  },
  methods: {
    random: function() {
      this.$http.get("https://restcountries.eu/rest/v2/all").then(response => {
        this.country =
          response.body[Math.floor(Math.random() * response.body.length)];
      });
    }
  }
};
</script>

<style scoped>
img {
  width: 500px;
  height: 300px;
}

div {
  margin-top: 100px;
  padding: 20px;
  height: 83vh;
}

@media (min-width: 400px) and (max-width: 800px) {
  div {
    margin-top: 200px;
    padding: 20px;
  }
}
</style>
