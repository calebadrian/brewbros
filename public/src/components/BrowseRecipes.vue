<template>
  <div class="browseRecipes">
    <navbar></navbar>
    <div class="container-fluid">
      <div class="row">
        <div class="col-3" v-if="recipe.public == false" v-for="recipe in allRecipes">
          <div class="card-header">
            <h3>{{recipe.name}}</h3>
          </div>
          <div class="card-body">
            <p class="text-muted">
              <strong>Style: </strong>{{recipe.style}}</p>
            <p class="text-muted">
              <strong>Sub-Style: </strong>{{recipe.subStyle}}</p>
            <ul>
              <li>Boil Time: {{recipe.boilTime}}</li>
              <li>Batch Size: {{recipe.batchSize}}</li>
              <li>Rating: </li>
              <li>Created By:
                <router-link :to="{name: 'profile', params: {profileId: recipe.creatorId}}">
                  {{recipe.creatorId}}</router-link>
              </li>
            </ul>
          </div>
          <div class="card-footer text-muted">
            <button type="button" class="btn btn-primary" data-toggle="modal" :recipe='recipe' :data-target="'#'+recipe._id">
              View Full Recipe
            </button>
            <!-- Begin Modal Content -->
            <div class="modal fade" :id="recipe._id" tabindex="-1" role="dialog">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h3 class="modal-title">{{recipe.name}}</h3>
                    <button type="button" class="close" data-dismiss="modal">
                      <span>&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <h5>Fermentables</h5>
                    <h5>Hops</h5>
                    <h5>Steeping Grains</h5>
                    <h5>Other Ingredients</h5>
                    <h5>Yeast</h5>
                    <h5>Notes/Comments:</h5>
                      <p>{{recipe.personalComments}}</p>
                  </div>
                  <div class="modal-footer">
                    {{recipe.creatorId}}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
  import navbar from './Navbar'
  export default {
    name: 'BrowseRecipes',
    mounted() {
      this.$store.dispatch('getRecipes')
    },
    data() {
      return {

      }
    },
    computed: {
      user() {
        return this.$store.state.user
      },
      allRecipes() {
        return this.$store.state.allRecipes
      }
    },
    components: {
      navbar
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .text-muted {
    margin-top: 4px;
    margin-bottom: 4px
  }
</style>