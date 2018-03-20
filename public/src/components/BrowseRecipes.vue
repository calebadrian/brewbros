<template>
  <div class="browseRecipes">
    <navbar></navbar>
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <v-select label="name" value=" " v-model="style" :options="styles" class="selectFormat" placeholder="Sort by Style"></v-select>
        </div>
        <div class="col-3" v-if="!recipe.private && !style || style == null || recipe.style == style.name" v-for="recipe in allRecipes">
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
                  {{recipe.creatorName}}</router-link>
              </li>
            </ul>
          </div>
          <div class="card-footer text-muted">
            <button type="button" class="btn btn-primary" data-toggle="modal" :recipe='recipe' :data-target="'#'+recipe._id">
              View Full Recipe
            </button>
            <button type="button" class="btn btn-success" :recipe='recipe' v-if="recipe.creatorId != user._id && !recipe.favorited.includes(user._id) && user.name"
              @click="favorite({user: user, recipe: recipe})">
              Add to Favorites
            </button>
            <!-- Begin Modal Content -->
            <div class="modal fade" :id="recipe._id" tabindex="-1" role="dialog">
              <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h3 class="modal-title">{{recipe.name}}</h3>
                    <button type="button" class="close" data-dismiss="modal">
                      <span>&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <h5>Fermentables</h5>
                    <table class="table">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Amount</th>
                          <th scope="col">Fermentable</th>
                          <th scope="col">Potential</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="fermentable in recipe.fermentables">
                          <th scope="row">1</th>
                          <td>{{fermentable.quantity}} lb(s)</td>
                          <td>{{fermentable.name}}</td>
                          <td>{{fermentable.potential}}</td>
                        </tr>
                      </tbody>
                    </table>
                    <h5>Hops</h5>
                    <table class="table">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Amount</th>
                          <th scope="col">Hop</th>
                          <th scope="col">Boil Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="hop in recipe.hops">
                          <th scope="row">1</th>
                          <td>{{hop.quantity}} oz(s)</td>
                          <td>{{hop.name}}</td>
                          <td>{{hop.boilTime}} min</td>
                        </tr>
                      </tbody>
                    </table>
                    <h5>Steeping Grains</h5>
                    <table class="table">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Amount</th>
                          <th scope="col">Grain</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="grain in recipe.steepingGrains">
                          <th scope="row">1</th>
                          <td>{{grain.quantity}} lb(s)</td>
                          <td>{{grain.name}}</td>
                        </tr>
                      </tbody>
                    </table>
                    <h5>Other Ingredients</h5>
                    <table class="table">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Amount</th>
                          <th scope="col">Ingredient</th>
                          <th scope="col">Boil Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="adjunct in recipe.adjuncts">
                          <th scope="row">1</th>
                          <td>{{adjunct.quantity}} oz(s)</td>
                          <td>{{adjunct.name}}</td>
                          <td>{{adjunct.boilTime}} min</td>
                        </tr>
                      </tbody>
                    </table>
                    <h5>Yeast</h5>
                    <table class="table">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Yeast</th>
                          <th scope="col">Pitch</th>
                          <th scope="col">Temp(F)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="yeast in recipe.yeasts">
                          <th scope="row">1</th>
                          <td>{{yeast.name}}</td>
                          <td>{{yeast.pitch}}</td>
                          <td>{{yeast.temp}} F</td>
                        </tr>
                      </tbody>
                    </table>
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
        this.$store.dispatch('updateFavorites', {userId: user._id, recipe: recipe})
      }
    },
    computed: {
      user() {
        return this.$store.state.user
      },
      allRecipes() {
        return this.$store.state.allRecipes
      },
      styles() {
        return this.$store.state.styles
      },
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