<template>
  <div class="createRecipe">
    <navbar></navbar>
    <div class="container-fluid createMe">
      <form @submit.prevent='submit'>
        <div class="row">
          <div class="col-sm-12 d-flex justify-content-center">
            <h1>Create a New Recipe</h1>
          </div>
        </div>
        <div class="row justify-content-around">
          <div class="col-sm-4">
            <div class="d-flex align-items-center">
              <label for="name">Recipe Name:</label>
              <input type="text" class="form-control" id="name" placeholder="recipe name" v-model="recipe.name">
            </div>
            <div class="d-flex align-items-center">
              <label for="batchSize" class="mr-2">Batch Size:</label>
              <input type="number" class="form-control mr-2 smallInput" id="batchSize" placeholder="#" v-model="recipe.batchSize">
              <h6>gal</h6>
            </div>
            <div class="private-box">
              <input class="form-check-input" type="checkbox" id="private" v-model="recipe.public">
              <label for="private">Private</label>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="form-group">
              <div class="d-flex align-items-center">
                <label for="style">Style:</label>
                <select class="form-control" id="style" placeholder="Style" v-model="recipe.style">
                  <option v-for="style in styles">{{style.name}}</option>
                </select>
              </div>
              <div class="d-flex align-items-center">
                <label for="subStyle">Sub Style:</label>
                <select class="form-control" id="subStyle" placeholder="Sub-Style">
                  <option v-for="category in categories">{{category.name}}</option>
                </select>
              </div>
              <div class="d-flex align-items-center">
                <label for="boilTime" class="mr-2">Boil Time:</label>
                <input type="number" class="form-control mr-2 smallInput" id="boilTime" placeholder="#" v-model="recipe.boilTime">
                <h6>min</h6>
              </div>
            </div>
          </div>
        </div>
        <div class="row d-flex justify-content-around text-center">
          <div class="col-sm-2">
            <h4>Initial Gravity</h4>
            <p>
              {{stats.originalGravity.toFixed(3)}}
            </p>
          </div>
          <div class="col-sm-2">
            <h4>Final Gravity</h4>
            <p>
              {{stats.finalGravity.toFixed(3)}}
            </p>
          </div>
          <div class="col-sm-2">
            <h4>Alcohol Percent</h4>
            <p>
              {{stats.abv.toFixed(1)}}%
            </p>
          </div>
          <div class="col-sm-2">
            <h4>IBU</h4>
            <p>
              {{stats.ibu.toFixed(2)}}
            </p>
          </div>
          <div class="col-sm-2">
            <h4>Color</h4>
            <p>
              {{stats.color}}
            </p>
          </div>
        </div>
        <div class="row justify-content-around">
          <div class="col-sm-4">
            <div class="card">
              <div class="card-header">
                <h5 class="card-title">Fermentables</h5>
              </div>
              <div class="card-body">
                <fermentable></fermentable>
              </div>
            </div>
          </div>
          <div class="col-sm-4">
            <div class="card">
              <div class="card-header">
                <h5 class="card-title">Hops</h5>
              </div>
              <div class="card-body" id="hopForms">
                <hop></hop>
              </div>
            </div>
          </div>
        </div>
        <div class="row justify-content-around">
          <div class="col-sm-4">
            <div class="card">
              <div class="card-header">
                <h5 class="card-title">Steeping Grains</h5>
              </div>
              <div class="card-body">
                <steepingGrain></steepingGrain>
              </div>
            </div>
          </div>
          <div class="col-sm-4">
            <div class="card">
              <div class="card-header">
                <h5 class="card-title">Other Ingredients</h5>
              </div>
              <div class="card-body" id="adjunctForms">
                <adjunct></adjunct>
              </div>
            </div>
          </div>
        </div>
        <div class="row justify-content-around">
          <div class="col-sm-4">
            <div class="card">
              <div class="card-header">
                <h5 class="card-title">Yeasts</h5>
              </div>
              <div class="card-body" id="yeastForms">
                <yeast></yeast>
              </div>
              <i class="far fa-plus-square fa-2x" @click="addYeast"></i>
            </div>
          </div>
          <div class="col-sm-4">
            <div class="card">
              <div class="card-header">
                <h5 class="card-title">Description/Notes</h5>
              </div>
              <div class="card-body">
                <textarea type="text" placeholder="description" v-model="recipe.personalComments" rows="4"></textarea>
              </div>
            </div>
          </div>
        </div>
        <button type="submit" class="btn btn-success">Submit Recipe</button>
      </form>
    </div>
  </div>
</template>

<script>
    import navbar from './Navbar'
    import fermentable from './Fermentable'
    import hop from './Hop'
    import steepingGrain from './SteepingGrain'
    import adjunct from './Adjunct'
    import yeast from './yeast'
    export default {
        name: 'CreateRecipe',
        mounted() {
            this.$store.dispatch('getStyles')
        },
        data() {
            return {
                recipe: {
                    name: '',
                    batchSize: 1,
                    public: false,
                    style: '',
                    boilTime: 60,
                    personalComments: '',
                    creatorId: this.$store.state.user._id
                },
                stats: {
                    originalGravity: 1,
                    finalGravity: 1,
                    abv: 1,
                    ibu: 1,
                    color: ''
                }
            }
        },
        methods: {
            submit() {
                var recipeIngredients = this.$store.state.newRecipe
                this.recipe.fermentables = recipeIngredients.fermentables
                this.recipe.adjuncts = recipeIngredients.adjuncts
                this.recipe.hops = recipeIngredients.hops
                this.recipe.yeasts = recipeIngredients.yeasts
                this.recipe.steepingGrains = recipeIngredients.steepingGrains
                this.$store.dispatch('addRecipe', this.recipe)
            },
            calcGravities() {
                var fermentables = this.$store.state.newRecipe.fermentables
                var sum = 0
                for (var i = 0; i < fermentables.length; i++) {
                    var fermentable = fermentables[i]
                    fermentable.potential = (fermentable.potential * 1000) - 1000
                    var points = fermentable.potential * fermentable.quantity
                    sum += points
                }
                var og = (sum * .72) / this.recipe.batchSize
                og = og / 1000
                var fg = (sum * (1 - (this.$store.state.newRecipe.yeasts[0].attenuationMin / 100))) / 1000
                this.stats.finalGravity = 1 + fg
                this.stats.originalGravity = 1 + og
                this.stats.abv = (((og - fg) * 1.05) / fg) / .79
            }
        },
        computed: {
            styles() {
                return this.$store.state.styles
            }
        },
        components: {
            navbar,
            fermentable,
            hop,
            steepingGrain,
            adjunct,
            yeast,
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .private-box {
        padding-left: 2rem
    }
    
    .row {
        padding-left: 0px;
        padding-right: 0px
    }
    
    .smallInput {
        max-width: 20%;
    }
    
    .createMe {
        background: linear-gradient(rgba(0, 0, 0, .3), rgba(0, 0, 0, .3)), url("../assets/wood-panel.jpg");
        color: rgb(245, 245, 245);
    }
    
    .card {
        color: slategrey
    }
</style>