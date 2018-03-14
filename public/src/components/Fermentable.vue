<template>
        <div class="steepingGrains">
                      <form @submit.prevent>
                          <div class="form-group">
                              <label for="fermentableAmount">lbs</label>
                              <input type="number" class="form-control" id="fermentableAmount" placeholder="#">
                              <label for="fermentable">Fermentable</label>
                              <select type="text" class="form-control" id="fermentable"></select>
                              <option v-for="fermentable in fermentables">{{fermentable.name}}</option>
                            </div>
                        </form>
                  </div>
</template>

<script>
    export default {
        name: 'Fermentable',
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