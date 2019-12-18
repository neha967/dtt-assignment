<template>
  <div>
    <app-navbar></app-navbar> 
    <router-view></router-view>
    <app-footer></app-footer>
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue"
import Footer from "./components/Footer"

export default {
  components: {
    "app-navbar": NavBar,
    "app-footer": Footer
  }
}
</script>

<style>
  body {
    font-size: 24px;
    margin: 0 auto;
  }
</style>
