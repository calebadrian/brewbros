<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted(){
    this.$store.dispatch('authenticate')
  }
}
</script>

<style>
.btn-primary{
  background-color: aqua;
  color: black;
}
.btn-success{
  background-color: blanchedalmond;
  color: black;
}
</style>
