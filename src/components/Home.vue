<template>
    <div>
      <li v-for="country in countries"> 
        <router-link v-bind:to="'/detail/' + country.alpha3Code">
          <img :src="country.flag"/>
          <p class="text-dark">{{country.name}}</p>         
        </router-link>
      </li>    
    </div>
</template>

<script>
export default {
  
  data () {
    return {
     countries: [],
    }
  },
  created(){
      this.$http.get("https://restcountries.eu/rest/v2/all")
      .then(response=>{
          this.countries = response.body.slice(0,10)
      })
  }
}
</script>

<style scoped>

  div {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    margin: 100px auto;
  },

  li {
  list-style-type: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 33%;
  cursor: pointer;
  },

  li img {
    width: 300px;
  }

  @media (min-width: 400px) and (max-width: 800px) {
    div {
      flex-direction: column;
      margin-top: 200px;
    }
  }

</style>


