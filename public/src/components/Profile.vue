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
          <div class="container-fluid">
            <div class="row">
              <div class="col-3" v-for="recipe in myFavorites">
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
                  <button type="button" class="btn btn-danger" :recipe='recipe' @click="removeFavRecipe(recipe)">
                    Remove from Favorites
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
                              <tr v-for="(fermentable, i) in recipe.fermentables">
                                <th scope="row">{{i+1}}</th>
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
                              <tr v-for="(hop, i) in recipe.hops">
                                <th scope="row">{{i+1}}</th>
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
                              <tr v-for="(grain, i) in recipe.steepingGrains">
                                <th scope="row">{{i+1}}</th>
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
                              <tr v-for="(adjunct, i) in recipe.adjuncts">
                                <th scope="row">{{i+1}}</th>
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
                              <tr v-for="(yeast, i) in recipe.yeasts">
                                <th scope="row">{{i+1}}</th>
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
        <div class="tab-pane fade" id="recipes" role="tabpanel" aria-labelledby="recipes-tab">
          <h1>My Recipes</h1>
          <div class="container-fluid">
            <div class="row">
              <div class="col-3" v-for="recipe in myRecipes">
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
                  </ul>
                </div>
                <div class="card-footer text-muted">
                  <button type="button" class="btn btn-primary" data-toggle="modal" :recipe='recipe' :data-target="'#'+recipe._id">
                    View Full Recipe
                  </button>
                  <button class="btn btn-success" @click="addToShopping(recipe)">Add To Shopping List</button>
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
                              <tr v-for="(fermentable, i) in recipe.fermentables">
                                <th scope="row">{{i+1}}</th>
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
                              <tr v-for="(hop, i) in recipe.hops">
                                <th scope="row">{{i+1}}</th>
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
                              <tr v-for="(grain, i) in recipe.steepingGrains">
                                <th scope="row">{{i+1}}</th>
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
                              <tr v-for="(adjunct, i) in recipe.adjuncts">
                                <th scope="row">{{i+1}}</th>
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
                              <tr v-for="(yeast, i) in recipe.yeasts">
                                <th scope="row">{{i+1}}</th>
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
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="tab-pane fade" id="shopping" role="tabpanel" aria-labelledby="shopping-tab">
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
              <tr v-for="(fermentable, i) in user.shoppingList.fermentables">
                <th scope="row">{{i + 1}}</th>
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
              <tr v-for="(hop, i) in user.shoppingList.hops">
                <th scope="row">{{i + 1}}</th>
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
              <tr v-for="(grain, i) in user.shoppingList.steepingGrains">
                <th scope="row">{{i + 1}}</th>
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
              <tr v-for="(adjunct, i) in user.shoppingList.adjuncts">
                <th scope="row">{{i + 1}}</th>
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
              <tr v-for="(yeast, i) in user.shoppingList.yeasts">
                <th scope="row">{{i + 1}}</th>
                <td>{{yeast.name}}</td>
                <td>{{yeast.pitch}}</td>
                <td>{{yeast.temp}} F</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import navbar from './Navbar'
  export default {
    name: 'Profile',
    mounted() {
      this.$store.dispatch('authenticate')
      this.$store.dispatch('getMyRecipes')
      this.$store.dispatch('getRecipes')
    },
    data() {
      return {

      }
    },
    methods: {
      removeFavRecipe(recipe) {
        for (let i = 0; i < recipe.favorited.length; i++) {
          const userId = recipe.favorited[i];
          if (this.$store.state.user._id == userId) {
            recipe.favorited.splice(i, 1)
          }
        }
        this.$store.dispatch('updateFavorites', recipe)
      },
      addToShopping(recipe) {
        this.$store.dispatch('updateShoppingList', recipe)
      }
    },
    computed: {
      user() {
        return this.$store.state.user
      },
      myRecipes() {
        return this.$store.state.myRecipes
      },
      myFavorites() {
        return this.$store.state.myFavorites
      },
      shoppingList() {
        return this.$store.state.shoppingList
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