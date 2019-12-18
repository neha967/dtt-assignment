<template>
  <div class="text-center container">
    <ul>
      <li @click="showRegion($event)" class="active" ref="selected">Africa</li>
      <li @click="showRegion($event)">Americas</li>
      <li @click="showRegion($event)">Asia</li>
      <li @click="showRegion($event)">Europe</li>
      <li @click="showRegion($event)">Oceania</li>
    </ul>
    <div class="region container text-center">
      <div v-if="regionDetails" v-for="country in countries" class="main">
        <router-link v-bind:to="'/detail/' + country.alpha3Code">
          <img :src="country.flag" />
          <p class="text-dark">{{ country.name }}</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      countries: [],
      regionDetails: false
    };
  },
  created() {
    this.$http
      .get(`https://restcountries.eu/rest/v2/region/africa`)
      .then(function(response) {
        this.countries = response.body.slice(0, 10);
        this.regionDetails = true;
      });
  },
  methods: {
    showRegion: function(event) {
      this.$http
        .get(
          `https://restcountries.eu/rest/v2/region/${event.target.innerHTML}`
        )
        .then(function(response) {
          this.countries = response.body.slice(0, 10);
          this.regionDetails = true;
          this.$refs.selected.classList.remove("active");
          event.target.classList.add("active");
          event.target.closest(".active").classList.remove("active");
        });
    }
  }
};
</script>

<style scoped>
.region {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-evenly;
  margin: 150px auto;
}

.region div {
  display: flex;
  flex-direction: column;
  width: 33%;
}

img {
  width: 300px;
}

ul {
  list-style-type: none;
  z-index: 100;
  position: fixed;
  top: 70px;
}

li {
  display: inline-block;
  padding: 10px 40px;
  text-align: center;
  cursor: pointer;
}

li:hover,
.active {
  background-color: lightgrey;
}

@media (min-width: 400px) and (max-width: 800px) {
  div .region {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 250px;
  }

  .main{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  ul {
    top: 170px;
  }

  li {
    padding: 10px 15px;
  }
}
</style>
