<template>
    <div class="steepingGrains">
        <div class='card-body'>
            <form @submit.prevent='addSteepingGrain'>
                <div class="form-group">
                    <label for="steepingGrainAmount">lbs</label>
                    <input type="number" name="steepingGrainAmount" v-model="defaultValues.quantity" step='.1' min='0'>
                    <label for="steepingGrain">Fermentable To Steep</label>
                    <v-select label="name" v-model="steepingGrain" :options="fermentables"></v-select>
                    <button type='submit' class="btn-success">Add Steeping Grain</button>
                </div>
            </form>
        </div>
        <div class='card-footer'>
            <div v-if="newRecipeSteepingGrains.length > 0">
                <h5>Current Steeping Grains:</h5>
                <div v-for="newSteepingGrain in newRecipeSteepingGrains">
                    <h6>{{newSteepingGrain.quantity}}
                        <span v-if="newSteepingGrain.quantity > 1">lbs</span>
                        <span v-else>lb</span> of {{newSteepingGrain.name}}</h6>
                    <i class="fas fa-2x fa-ban" @click="removeSteepingGrain(newSteepingGrain)"></i>
                </div>
            </div>
        </div>
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
                defaultValues: {
                    quantity: 1
                },
                steepingGrain: ''
            }
        },
        computed: {
            fermentables() {
                return this.$store.state.fermentables
            },
            newRecipeSteepingGrains() {
                return this.$store.state.newRecipe.steepingGrains
            }
        },
        methods: {
            addSteepingGrain() {
                this.steepingGrain.quantity = Number(this.defaultValues.quantity)
                this.$store.dispatch('addNewRecipeSteepingGrain', this.steepingGrain)
            },
            removeSteepingGrain(steepingGrain){
                for (var i = 0; i < this.$store.state.newRecipe.steepingGrains.length; i++){
                    var search = this.$store.state.newRecipe.steepingGrains[i]
                    if (search.name == steepingGrain.name){
                        this.$store.state.newRecipe.steepingGrains.splice(i, 1)
                        return
                    }
                }
            }
        }
    }
</script>

<style scoped>
</style>