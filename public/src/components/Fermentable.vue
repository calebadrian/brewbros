<template>
    <div class="steepingGrains">
        <form @submit.prevent='addFermentable'>
            <div class="form-group">
                <label for="fermentableAmount">lbs</label>
                <input type="number" name="fermentableAmount" v-model="defaultValues.quantity" class="form-control" id="fermentableAmount"
                    placeholder="#">
                <label for="fermentable">Fermentable</label>
                <select type="text" class="form-control" id="fermentable" plaecholder="Fermentable" v-model="fermentable">
                    <option v-for="fermentable in fermentables" :value='fermentable'>{{fermentable.name}}</option>
                </select>
                <button class="btn-success">Add Fermentable</button>
            </div>
        </form>
    </div>
</template>

<script>
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
                this.fermentable.quantity = Number(this.defaultValues.quantity)
                this.$store.dispatch('addNewRecipeFermentable', this.fermentable)
                this.$parent.calcGravities()
            }
        },
    }
</script>

<style scoped>
</style>