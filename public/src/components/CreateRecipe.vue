<template>
  <div class="CreateRecipe">
    <navbar></navbar>
    <div class="container-fluid">
      <form type="submit">
        <div class="row">
          <div class="col-sm-4">
            <div class="form-group">
              <input type="text" class="form-control" id="name" placeholder="recipe name">
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-4">
            <div class="form-group">
              <label for="batchSize">Batch Size</label>
              <input type="number" class="form-control" id="batchSize" placeholder="#">
              <p>gallons</p>
              <div class="private-box">
                <input class="form-check-input" type="checkbox" id="private">
                <label for="private">Private</label>
              </div>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="form-group">
              <select class="form-control" id="style" placeholder="Style">
                <option v-for="style in styles">{{style.name}}</option>
              </select>
              <select class="form-control" id="subStyle" placeholder="Sub-Style">
                <option value="">Sub-Style</option>
                <option v-for="category in categories">{{category.name}}</option>
              </select>
              <label for="boilTime">Boil Time</label>
              <input type="number" class="form-control" id="boilTime" placeholder="#">
              <p>min</p>
            </div>
          </div>
        </div>
        <div class="row stats">
          <div class="col-sm-2">
            <h4>Initial Gravity</h4>
            <p>
              7.32
            </p>
          </div>
          <div class="col-sm-2">
            <h4>Final Gravity</h4>
            <p>
              7.34
            </p>
          </div>
          <div class="col-sm-2">
            <h4>Alcohol Percent</h4>
            <p>
              12%
            </p>
          </div>
          <div class="col-sm-2">
            <h4>IBU</h4>
            <p>
              4.14
            </p>
          </div>
          <div class="col-sm-2">
            <h4>Color</h4>
            <p>
              hex code!
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
            <adjunct></adjunct>
          </div>
        </div>
        <div class="row">
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
          <div class="col-sm-4"></div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
    import navbar from './Navbar'
    import fermenatble from './Fermentable'
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

            }
        },
        methods: {
            addHop() {

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
    .stats {
        justify-content: space-between
    }
    
    .private-box {
        padding-left: 2rem
    }
    
    .row {
        padding-left: 0px;
        padding-right: 0px
    }
</style>