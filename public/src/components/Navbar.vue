<template>
  <div class="Navbar">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <a class="navbar-brand" href="#">Navbar</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
        aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true"
              aria-expanded="false">
              Dropdown
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <a class="dropdown-item" href="#">Browse Recipes</a>
              <a class="dropdown-item" href="#">Create Recipes</a>
              <a class="dropdown-item" href="#">My Profile</a>
              <a class="dropdown-item" href='#'>Find User</a>
            </div>
          </li>
        </ul>
        <div v-if="!user.name">
          <button class="btn btn-outline-success my-2 my-sm-0">Login</button>
          <button class="btn btn-outline-primary my-2 my-sm-0 ml-2">Register</button>
        </div>
        <div v-else>
          <button class="btn btn-outline-danger my-2 my-sm-0">Logout</button>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
  export default {
    name: 'Navbar',
    data() {
      return {

      }
    },
    computed: {
      user(){
        return this.$store.state.user
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>