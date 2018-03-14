<template>
   <div class="steepingGrains">
          <form @submit.prevent>
              <div class="form-group">
                  <label for="steepingGrainAmount">lbs</label>
                  <input type="number" class="form-control" id="steepingGrainAmount" placeholder="#">
                  <label for="steepingGrain">Fermentable To Steep</label>
                  <select type="text" class="form-control" id="steepingGrain"></select>
                  <option v-for="fermentable in fermentables">{{fermentable.name}}</option>
                </div>
            </form>
  </div>
</template>

<script>
    export default {
        name: 'SteepingGrains',
        mounted() {
            this.$store.dispatch('getFermentables')
        },
        data() {
            return {

            }
        },
        computed: {
            hops() {
                return this.$store.state.fermentables
            }
        },
    }
</script>

<style scoped>

</style>