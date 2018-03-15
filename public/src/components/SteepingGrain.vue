<template>
    <div class="steepingGrains">
        <div class='card-body'>
            <form @submit.prevent='addSteepingGrain'>
                <div class="form-group">
                    <label for="steepingGrainAmount">lbs</label>
                    <input type="number" name="steepingGrainAmount" v-model="defaultValues.quantity" step='.1' min='0'>
                    <label for="steepingGrain">Fermentable To Steep</label>
                    <select type="text" class="form-control" id="steepingGrain" v-model="steepingGrain">
                        <option v-for="fermentable in fermentables" :value='fermentable'>{{fermentable.name}}</option>
                    </select>
                    <button type='submit' class="btn-success">Add Steeping Grain</button>
                </div>
            </form>
        </div>
        <div class='card-footer'>
            <div v-if="newRecipeSteepingGrains.length > 0">
                <h5>Current Steeping Grains:</h5>
                <h6 v-for="newSteepingGrain in newRecipeSteepingGrains">{{newSteepingGrain.quantity}}
                    <span v-if="newSteepingGrain.quantity > 1">lbs</span>
                    <span v-else>lb</span> of {{newSteepingGrain.name}}</h6>
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
                steepingGrain: {}
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
            }
        }
    }
</script>

<style scoped>
</style>