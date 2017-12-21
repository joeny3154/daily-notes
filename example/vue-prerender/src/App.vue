<template>
  <div id="app">
    <router-link to="/">/index Page</router-link>&nbsp;
    <router-link to="/about">/About Page</router-link>&nbsp;
    <router-link to="/home">/Home Page</router-link>&nbsp;
    <router-link to="/contact">/Contact Page</router-link>

    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
