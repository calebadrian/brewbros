<template>
  <div class="CreateRecipe">
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
            <input class="form-check-input" type="checkbox" id="private"> 
            <label for="private">Private</label>
          </div>
        </div>
          <div class="col-sm-6">
            <div class="form-group">
              <select class="form-control" id="style" placeholder="style">
                    <option v-for="style in styles">{{style.name}}</option>
              </select>
            </div>
          </div>
      </div>
    </form>
    </div>
  </div>
</template>

<script>
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

        },

        computed: {
            styles() {
                return this.$store.state.styles
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>