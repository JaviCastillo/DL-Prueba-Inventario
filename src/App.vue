<template>
  <div class="pt-5">
    <Navbar />
    <router-view/>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'

export default {
  name: 'App',
  components:{
    Navbar
  },
  created() {
      this.$store.dispatch('putToys')
  },
}
</script>

<style>
body{
  background-image: url('./assets/toys-bg.jpg');
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
