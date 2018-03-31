<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App',
    mounted() {
      this.$store.dispatch('authenticate')
    }
  }
</script>

<style>
  .btn-main {
    background-color: #578957;
    color: white;
    border: 2px solid rgb(87, 137, 87)
  }

  .btn-outline-main {
    background-color: transparent;
    border: 2px solid rgba(87, 137, 87);
    color: white;
  }

  .btn-outline-main:hover,
  .btn-main:hover {
    background-color: rgba(87, 137, 87, .5);
    border: 2px solid rgb(87, 137, 87);
  }

  .btn-positive {
    background-color: rgb(229, 89, 52);
    border: 2px solid rgb(229, 89, 52);
    color: white;
  }

  .btn-positive:hover, .btn-outline-positive:hover {
    background-color: rgba(229, 89, 52, .5);
    border: 2px solid rgb(229, 89, 52);
  }

  .btn-outline-positive {
    border: 2px solid rgb(229, 89, 52);
    color: white;
    background: transparent
  }

  .btn-negative {
    background-color: rgb(218, 52, 48);
    border: 2px solid rgb(218, 52, 48);
    color: white;
  }

  .btn-negative:hover {
    background-color: rgba(218, 52, 48, .5);
    border: 2px solid rgb(218, 52, 48);
  }

  a {
    color: #578957;
  }

  a:hover {
    color: #578957;
    font-style: italic;
  }

  h1 {
    color: white;
    text-shadow: 4px 4px 10px rgba(35, 35, 39, 0.9);
  }
</style>