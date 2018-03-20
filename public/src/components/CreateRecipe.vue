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
              <input class="form-check-input" type="checkbox" id="private" v-model="recipe.private">
              <label for="private">Private</label>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="form-group">
              <div class="d-flex align-items-center">
                <label for="style">Style:</label>
                <v-select label="name" v-model="recipe.style" :options="styles" class="selectFormat"></v-select>
              </div>
              <div class="d-flex align-items-center">
                <label for="subStyle">Sub Style:</label>
                <select class="form-control" id="subStyle" placeholder="Sub-Style" v-model="recipe.subStyle">
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
            <h4>Original Gravity</h4>
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
              {{stats.abv.toFixed(2)}}%
            </p>
          </div>
          <div class="col-sm-2">
            <h4>IBU</h4>
            <p>
              {{stats.ibu.toFixed(2)}}
            </p>
          </div>
          <div class="col-sm-2">
            <h4>SRM</h4>
            <p :style='bgc'>
              {{stats.color.toFixed(2)}}
            </p>
          </div>
          <div class="col-sm-2">
            <h4>Matches Style</h4>
            <div v-if="recipe.style != ''">
              <i class="fas fa-2x fa-check-circle" v-if="stats.styleCorrect"></i>
              <i class="fas fa-2x fa-times-circle" v-else></i>
              <i class="fas fa-question-circle" @click="styleDataToggle = !styleDataToggle"></i>
            </div>
          </div>
        </div>
        <div class="row d-flex justify-content-around text-center" v-if="recipe.style && styleDataToggle">
          <div class="col-sm-2">
            <h4>Minimum Original Gravity</h4>
            <p>
              {{recipe.style.ogMin}}
            </p>
          </div>
          <div class="col-sm-2">
            <h4>Final Gravity Range</h4>
            <p>
              {{recipe.style.fgMin}} {{recipe.style.fgMax}}
            </p>
          </div>
          <div class="col-sm-2">
            <h4>Alcohol Percent Range</h4>
            <p>
              {{recipe.style.abvMin}}% {{recipe.style.abvMax}}%
            </p>
          </div>
          <div class="col-sm-2">
            <h4>IBU Range</h4>
            <p>
              {{recipe.style.ibuMin}} {{recipe.style.ibuMax}}
            </p>
          </div>
          <div class="col-sm-2">
            <h4>SRM Range</h4>
            <p>
              {{recipe.style.srmMin}} {{recipe.style.srmMax}}
            </p>
          </div>
        </div>
        <div class="row justify-content-around mb-4">
          <div class="col-sm-10 card-deck">
            <div class="card">
              <div class="card-header">
                <h5 class="card-title">Fermentables</h5>
              </div>
              <fermentable></fermentable>
            </div>
            <div class="card">
              <div class="card-header">
                <h5 class="card-title">Hops</h5>
              </div>
              <hop></hop>
            </div>
          </div>
        </div>
        <div class="row justify-content-around mb-4">
          <div class="col-sm-10 card-deck">
            <div class="card">
              <div class="card-header">
                <h5 class="card-title">Steeping Grains</h5>
              </div>
              <steepingGrain></steepingGrain>
            </div>
            <div class="card">
              <div class="card-header">
                <h5 class="card-title">Other Ingredients</h5>
              </div>
              <adjunct></adjunct>
            </div>
          </div>
        </div>
        <div class="row justify-content-around">
          <div class="col-sm-10 card-deck">
            <div class="card">
              <div class="card-header">
                <h5 class="card-title">Yeasts</h5>
              </div>
              <yeast></yeast>
            </div>
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
      this.$store.dispatch('authenticate')
      this.$store.dispatch('getStyles')
      this.$store.dispatch('getCategories')
    },
    data() {
      return {
        recipe: {
          name: '',
          creatorName: this.$store.state.user.name,
          batchSize: 1,
          private: false,
          style: '',
          boilTime: 60,
          personalComments: ''
        },
        stats: {
          originalGravity: 1,
          finalGravity: 1,
          abv: 1,
          ibu: 1,
          color: 1,
          styleCorrect: false
        },
        bgc: {
          backgroundColor: ''
        },
        colorDict: {
          1: '#FFE699',
          2: '#FFD878',
          3: '#FFCA5A',
          4: '#FFBF42',
          5: '#FBB123',
          6: '#F8A600',
          7: '#F39C00',
          8: '#EA8F00',
          9: '#E58500',
          10: '#DE7C00',
          11: '#D77200',
          12: '#CF6900',
          13: '#CB6200',
          14: '#C35900',
          15: '#BB5100',
          16: '#B54C00',
          17: '#B04500',
          18: '#A63E00',
          19: '#A13700',
          20: '#9B3200',
          21: '#952D00',
          22: '#8E2900',
          23: '#882300',
          24: '#821E00',
          25: '#7B1A00',
          26: '#771900',
          27: '#701400',
          28: '#6A0E00',
          29: '#660D00',
          30: '#5E0B00',
          31: '#5A0A02',
          32: '#600903',
          33: '#520907',
          34: '#4C0505',
          35: '#470606',
          36: '#440607',
          37: '#3F0708',
          38: '#3B0607',
          39: '#3A070B',
          40: '#36080A',
        },
        styleDataToggle: false
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
        this.recipe.originalGravity = this.stats.originalGravity
        this.recipe.finalGravity = this.stats.finalGravity
        this.recipe.abv = this.stats.abv
        this.recipe.ibu = this.stats.ibu
        this.recipe.color = this.stats.color
        this.recipe.style = this.recipe.style.name
        this.$store.dispatch('addRecipe', this.recipe)
      },
      calcGravities() {
        var fermentables = this.$store.state.newRecipe.fermentables
        var sum = 0
        for (var i = 0; i < fermentables.length; i++) {
          var fermPotential = 0
          if (!fermentables[i].potential) {
            fermPotential = 1.028
          } else {
            fermPotential = fermentables[i].potential
          }
          fermPotential = (fermPotential * 1000) - 1000
          var points = fermPotential * fermentables[i].quantity
          sum += (points * .72) / this.recipe.batchSize
          console.log(sum)
        }
        var atten = 0
        if (this.$store.state.newRecipe.yeasts.length < 1 || !this.$store.state.newRecipe.yeasts[0].attenuationMin) {
          atten = 75
        } else {
          atten = this.$store.state.newRecipe.yeasts[0].attenuationMin
        }
        var fg = 1 + (sum * (1 - (atten / 100))) / 1000
        var og = 1 + (sum / 1000)
        this.stats.finalGravity = fg
        this.stats.originalGravity = og
        this.stats.abv = ((((og - fg) * 1.05) / fg) / .79) * 100
      },
      calcColor() {
        var fermentables = this.$store.state.newRecipe.fermentables
        var sum = 0
        for (var i = 0; i < fermentables.length; i++) {
          var srmFerm = 0
          if (!fermentables[i].srmPrecise) {
            srmFerm = 20
          } else {
            srmFerm = fermentables[i].srmPrecise
          }
          sum += ((srmFerm + .76 / 1.3546) * fermentables[i].quantity) / this.recipe.batchSize
        }
        this.stats.color = 1.49 * (sum * .69)
        this.bgc.backgroundColor = this.colorDict[Math.floor(1.49 * (sum * .69))]
      },
      calcIbu() {
        var hops = this.$store.state.newRecipe.hops
        var sum = 0
        for (var i = 0; i < hops.length; i++) {
          var aa = 0
          if (!hops[i].alphaAcidMin) {
            aa = 7
          } else {
            aa = hops[i].alphaAcidMin
          }
          console.log(aa)
          sum += (75 * (aa * hops[i].quantity) * 1.65 * (Math.pow(.000125, (this.stats.originalGravity - 1))) * ((1 - Math.exp(-.04 * hops[i].boilTime)) / 4.15)) / this.recipe.batchSize
        }
        this.stats.ibu = sum
      },
      checkStyle() {
        if (this.stats.ibu < this.recipe.style.ibuMax && this.stats.ibu > this.recipe.style.ibuMin) {
          if (this.stats.abv < this.recipe.style.abvMax && this.stats.abv > this.recipe.style.abvMin) {
            if (this.stats.color < this.recipe.style.srmMax && this.stats.color > this.recipe.style.srmMin) {
              if (this.stats.finalGravity < this.recipe.style.fgMax && this.stats.finalGravity > this.recipe.style.fgMin) {
                if (this.stats.originalGravity > this.recipe.style.ogMin) {
                  this.stats.styleCorrect = true
                }
              }
            }
          }
        }
      }
    },
    computed: {
      styles() {
        return this.$store.state.styles
      },
      categories() {
        return this.$store.state.categories
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

  .selectFormat {
    width: 30rem;
    background: white;
  }

  .createMe {
    background: linear-gradient(rgba(0, 0, 0, .3), rgba(0, 0, 0, .3)), url("../assets/wood-panel.jpg");
    color: rgb(245, 245, 245);
  }

  .card {
    color: slategrey
  }
</style>