<template>
  <div class="Navbar">
    <nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
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
              <router-link :to="{name: 'createRecipe'}"><p class="dropdown-item">Create Recipes</p></router-link>
              <a class="dropdown-item" href="#">My Profile</a>
              <a class="dropdown-item" href='#'>Find User</a>
            </div>
          </li>
        </ul>
        <div v-if="!user.name">
          <button class="btn btn-outline-success my-2 my-sm-0" data-toggle="modal" data-target="#loginModal">Login</button>
          <button class="btn btn-outline-primary my-2 my-sm-0 ml-2" data-toggle="modal" data-target="#registerModal">Register</button>
        </div>
        <div v-else>
          <button class="btn btn-outline-danger my-2 my-sm-0">Logout</button>
        </div>
      </div>
    </nav>
    <div class="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="loginModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="loginModalLabel">Login</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="login" class="d-flex flex-column">
              <input type="text" v-model="loginUser.name" placeholder="username">
              <input type="password" v-model="loginUser.password" placeholder="password">
              <button type="submit" class="btn-success">Login</button>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="registerModal" tabindex="-1" role="dialog" aria-labelledby="registerModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="registerModalLabel">Register</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="register" class="d-flex flex-column">
                <input type="text" v-model="newUser.name" placeholder="username">
                <input type="password" v-model="newUser.password" placeholder="password">
                <input type="password" v-model="newUser.confirmPassword" placeholder="confirm password">
                <button type="submit" class="btn-success">Register</button>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
  import swal from 'sweetalert2'
  export default {
    name: 'Navbar',
    data() {
      return {
        loginUser: {
          name: '',
          password: ''
        },
        newUser: {
          name: '',
          password: '',
          confirmPassword: ''
        }
      }
    },
    methods: {
      login(){
        this.$store.dispatch('login', this.loginUser)
        swal({
          position: 'top-end',
          width: 300,
          type: 'success',
          title: 'Login successful',
          showConfirmButton: false,
          timer: 1000
        })
      },
      register(){
        if(this.newUser.password !== this.newUser.confirmPassword){
          swal({
            type: 'error',
            title: 'Oops...',
            text: 'Make sure passwords match!'
          })
        } else {

        }
      }
    },
    computed: {
      user() {
        return this.$store.state.user
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>