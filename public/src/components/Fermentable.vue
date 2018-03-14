<template>
        <div class="steepingGrains">
                      <form @submit.prevent>
                          <div class="form-group">
                              <label for="fermentableAmount">lbs</label>
                              <input type="number" name="fermentableAmount" v-model="defaultValues.quantity" class="form-control" step = '.5' min = '0'>
                              <label for="fermentable">Fermentable</label>
                              <select type="text" class="form-control" id="fermentable" plaecholder="Fermentable" v-model="fermentable"></select>
                              <option v-for="fermentable in fermentables" :value='fermentable'>{{fermentable.name}}</option>
                            </div>
                        </form>
                  </div>
</template>

<script>
    import createRecipe from './CreateRecipe'
    export default {
        mounted() {
            this.$store.dispatch('getFermentables')
        },
        data() {
            return {
                defaultValues: {
                    quantity: 1
                },
                fermentable: {}
            }
        },
        computed: {
            fermentables() {
                return this.$store.state.fermentables
            }
        },
        methods: {
            addFermentable() {
                this.fermentable.quantity = Number(this.defaulftValues.quantity)
                this.$store.dispatch('addNewRecipeFermentable', this.fermentable)
                createRecipe.calcInitialGravity()
            }
        },
        components: {
            createRecipe
        }
    }
</script>

<style scoped>

</style>