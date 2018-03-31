<template>
  <div class="browseRecipes">
      <navbar></navbar>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12 top">
          <v-select label="name" value=" " v-model="style" :options="styles" class="selectFormat" placeholder="Sort by Style"></v-select>
        </div>
        <ul class="nav nav-tabs" id="myTab" role="tablist">
          <li class="nav-item">
            <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">All Recipes</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Followers Recipes</a>
          </li>
        </ul>
      </div>
    </div>

    <!-- Tab panes -->
    <div class="tab-content">
      <div class="tab-pane active" id="home" role="tabpanel" aria-labelledby="home-tab">
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-3 col-sm-12" v-if="!recipe.private && !style || style == null || recipe.style == style.name" v-for="recipe in allRecipes">
              <recipe :recipe="recipe"></recipe>
              <div class="card-footer text-muted">
                <button type="button" class="btn btn-primary" data-toggle="modal" :recipe='recipe' :data-target="'#'+recipe._id">
                  View Full Recipe
                </button>
                <button type="button" class="btn btn-success" :recipe='recipe' v-if="recipe.creatorId != user._id && !recipe.favorited.includes(user._id) && user.name"
                  @click="favorite({user: user, recipe: recipe})">
                  Add to Favorites
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="tab-pane" id="profile" role="tabpanel" aria-labelledby="profile-tab">
        <div class="container-fluid">
          <div class="row">
            <div class="col-sm-12">
              <h3>My Followers Recipes:</h3>
            </div>
            <div class="col-md-3 col-sm-12" v-if="!recipe.private && !style || style == null || recipe.style == style.name" v-for="recipe in myFollowersRecipes">
              <recipe :recipe="recipe"></recipe>
              <div class="card-footer text-muted">
                <button type="button" class="btn btn-primary" data-toggle="modal" :recipe='recipe' :data-target="'#'+recipe._id">
                  View Full Recipe
                </button>
                <button type="button" class="btn btn-success" :recipe='recipe' v-if="recipe.creatorId != user._id && !recipe.favorited.includes(user._id) && user.name"
                  @click="favorite({user: user, recipe: recipe})">
                  Add to Favorites
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <foot></foot>
  </div>
</template>

<script>
  import navbar from './Navbar'
  import recipe from './Recipe'
  import foot from './Foot'
  export default {
    name: 'BrowseRecipes',
    mounted() {
      this.$store.dispatch('getRecipes')
      this.$store.dispatch('getStyles')
    },
    data() {
      return {
        style: ''
      }
    },
    methods: {
      favorite({ user: user, recipe: recipe }) {
        console.log(this.style)
        recipe.favorited.push(user._id)
        this.$store.dispatch('updateFavorites', { userId: user._id, recipe: recipe })
      }
    },
    computed: {
      user() {
        return this.$store.state.user
      },
      allRecipes() {
        return this.$store.state.allRecipes
      },
      myFollowersRecipes() {
        return this.$store.state.myFollowersRecipes
      },
      styles() {
        return this.$store.state.styles
      },
    },
    components: {
      navbar,
      recipe,
      foot
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  /* .browseRecipes{
    min-height: 91.5vh;
  } */
  .text-muted {
    margin-top: 4px;
    margin-bottom: 4px
  }
  .tab-content{
    min-height: 72vh;
  }
  .top{
    margin: 1rem 0;
  }
</style>