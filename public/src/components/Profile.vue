<template>
  <div class="Profile">
    <navbar></navbar>
    <div class="container-fluid">
      <div class="d-flex justify-content-around mt-4">
        <img v-if="user.profilePic" :src="user.profilePic" class="profile-pic">
        <img v-else src="../assets/not-found.png" class="profile-pic">
        <h4>{{user.name}}</h4>
      </div>
      <div class="d-flex flex-column align-items-center mt-4">
        <h2>Currently Brewing</h2>
      </div>
      <div class="d-flex justify-content-around">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" class="card-link">Card link</a>
            <a href="#" class="card-link">Another link</a>
          </div>
        </div>
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" class="card-link">Card link</a>
            <a href="#" class="card-link">Another link</a>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-4">
      <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item">
          <a class="nav-link active" id="favorites-tab" data-toggle="tab" href="#favorites" role="tab" aria-controls="favorites" aria-selected="true">Favorites</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" id="recipes-tab" data-toggle="tab" href="#recipes" role="tab" aria-controls="recipes" aria-selected="false">My Recipes</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" id="shopping-tab" data-toggle="tab" href="#shopping" role="tab" aria-controls="shopping" aria-selected="false">Shopping</a>
        </li>
      </ul>
      <div class="tab-content" id="myTabContent">
        <div class="tab-pane fade show active" id="favorites" role="tabpanel" aria-labelledby="favorites-tab">
          <h1>My Favorites</h1>
        </div>
        <div class="tab-pane fade" id="recipes" role="tabpanel" aria-labelledby="recipes-tab">
          <h1>My Recipes</h1>
          <div v-for='recipe in myRecipes'>
            <h3>{{recipe.name}}</h3>
          </div>
        </div>
        <div class="tab-pane fade" id="shopping" role="tabpanel" aria-labelledby="shopping-tab">
          <h1>Shopping List</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import navbar from './Navbar'
    export default {
        name: 'Profile',
        mounted(){
          this.$store.dispatch('authenticate')
          this.$store.dispatch('getMyRecipes')
        },
        data() {
            return {

            }
        },
        computed: {
            user() {
                return this.$store.state.user
            },
            myRecipes() {
                return this.$store.state.myRecipes
            }
        },
        components: {
            navbar,
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .profile-pic {
        width: auto;
        height: 200px;
    }
    
    #recipes {
        min-height: 30%;
    }
    
    #shopping {
        min-height: 30%;
    }
    
    #favorites {
        min-height: 30%;
    }
</style>