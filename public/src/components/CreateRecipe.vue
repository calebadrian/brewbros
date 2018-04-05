<template>
  <div class="createRecipe">
    <div class="container-fluid">
      <div class="row">
        <navbar></navbar>
      </div>
    </div>
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
              <input type="text" class="form-control" id="name" placeholder="recipe name" v-model="recipe.name" required>
            </div>
            <div class="d-flex align-items-center">
              <label for="batchSize" class="mr-2">Batch Size:</label>
              <input type="number" class="form-control mr-2 smallInput" id="batchSize" placeholder="#" v-model="recipe.batchSize" required>
              <h6>gal</h6>
            </div>
            <div class="private-box">
              <input class="form-check-input" type="checkbox" id="private" v-model="recipe.private">
              <label for="private">Private</label>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="form-group">
              <div class="d-flex align-items-center mb-2">
                <label class="mr-2" for="category">Category:</label>
                <v-select class="selectFormat" label="name" :options="categories" v-model="recipe.category" :on-change="filterStyle"></v-select>
              </div>
              <div class="d-flex align-items-center mb-2">
                <label class="mr-2" for="style">Style:</label>
                <v-select label="name" v-model="recipe.style" :options="filteredStyles" class="selectFormat" placeholder="Select a Category First"></v-select>
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
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg check" v-if="stats.styleCorrect">
                <path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"
                />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg times" v-else>
                <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"
                />
              </svg>
              <span @click="styleDataToggle = !styleDataToggle">
                <i class="fas fa-question-circle"></i>
              </span>
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
        <div class="row justify-content-around pb-4">
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
                <textarea type="text" placeholder="Description" v-model="recipe.personalComments" rows="8"></textarea>
              </div>
              <div class="card-footer">
                <button type="submit" class="btn btn-positive">Submit Recipe</button>
              </div>
            </div>
          </div>
        </div>
      </form>
      <foot></foot>
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
  import foot from './Foot'
  export default {
    name: 'CreateRecipe',
    mounted() {
      this.$store.dispatch('authenticate')
      this.$store.dispatch('getStyles')
      this.$store.dispatch('getCategories')
    },
    created: function () {
      this.styleCorrect = this.stats.styleCorrect
    },
    data() {
      return {
        recipe: {
          name: '',
          batchSize: 1,
          private: false,
          style: '',
          category: '',
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
        styleDataToggle: false,
        filteredStyles: []
      }
    },
    methods: {
      submit() {
        var recipeIngredients = this.$store.state.newRecipe
        this.recipe.creatorName = this.$store.state.user.name
        this.recipe.fermentables = recipeIngredients.fermentables
        this.recipe.adjuncts = recipeIngredients.adjuncts
        this.recipe.hops = recipeIngredients.hops
        this.recipe.yeasts = recipeIngredients.yeasts
        if (!recipeIngredients.steepingGrains) {
          this.recipe.steepingGrains = null
        } else {
          this.recipe.steepingGrains = recipeIngredients.steepingGrains
        }
        this.recipe.originalGravity = this.stats.originalGravity
        this.recipe.finalGravity = this.stats.finalGravity
        this.recipe.abv = this.stats.abv
        this.recipe.ibu = this.stats.ibu
        this.recipe.color = this.stats.color
        this.recipe.style = this.recipe.style.name
        this.$store.dispatch('addRecipe', this.recipe)
        this.recipe = {
          name: '',
          batchSize: 1,
          private: false,
          style: '',
          category: '',
          boilTime: 60,
          personalComments: ''
        }
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
        if (this.stats.ibu < Number(this.recipe.style.ibuMax) && this.stats.ibu > Number(this.recipe.style.ibuMin)) {
          if (this.stats.abv < Number(this.recipe.style.abvMax) && this.stats.abv > Number(this.recipe.style.abvMin)) {
            if (this.stats.color < Number(this.recipe.style.srmMax) && this.stats.color > Number(this.recipe.style.srmMin)) {
              if (this.stats.finalGravity < Number(this.recipe.style.fgMax) && this.stats.finalGravity > Number(this.recipe.style.fgMin)) {
                if (this.stats.originalGravity > Number(this.recipe.style.ogMin)) {
                  this.stats.styleCorrect = true
                  return;
                }
              }
            }
          }
        }
        this.stats.styleCorrect = false;
      },
      filterStyle(value) {
        this.filteredStyles = []
        var styles = this.$store.state.styles
        var category = value.name
        for (let i = 0; i < styles.length; i++) {
          const style = styles[i];
          if (category == style.category.name) {
            this.filteredStyles.push(style)
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
      foot
    },
    watch: {
      category: function (category) {
        this.filterStyle(category)
      }

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  textarea {
    width: 100%
  }

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
    color: black;
  }

  .card-body {
    background-color: rgba(210, 180, 140, 0.6);
    box-shadow: 5px 5px 20px rgba(210, 180, 140, 0.75);
  }

  .card-header {
    background-color: rgba(210, 180, 140, .8);
    box-shadow: 5px 0px 10px rgba(210, 180, 140, 0.75);
  }

  .svg {
    width: 2rem;
    height: 2rem;
  }
  .check {
    fill: green;
    background-color: white;
    border-radius: 100%;
    border: 1px solid white;
  }
  .times {
    fill: red;
    background-color: white;
    border-radius: 100%;
    border: 1px solid white;
  }
</style>