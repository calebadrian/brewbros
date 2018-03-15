<template>
    <div class="steepingGrains">
        <form @submit.prevent='addSteepingGrain'>
            <div class="form-group">
                <label for="steepingGrainAmount">lbs</label>
                <input type="number" name="steepingGrainAmount" v-model="defaultValues.quantity" step='.1' min='0'>
                <label for="steepingGrain">Fermentable To Steep</label>
                <select type="text" class="form-control" id="steepingGrain" v-model="steepingGrain">
                    <option v-for="fermentable in fermentables" :value='steepingGrain'>{{fermentable.name}}</option>
                </select>
                <button type='submit' class="btn-success">Add Steeping Grain</button>
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
                defaultValues: {
                    quantity: 1
                },
                steepingGrain: {}
            }
        },
        computed: {
            fermentables() {
                return this.$store.state.fermentables
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