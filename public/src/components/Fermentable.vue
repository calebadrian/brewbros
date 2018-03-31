<template>
    <div class="fermentable">
        <div class="card-body">
            <form @submit.prevent='addFermentable'>
                <label for="fermentableAmount">lbs</label>
                <input type="number" name="fermentableAmount" v-model="defaultValues.quantity" class="form-control" id="fermentableAmount"
                    placeholder="#">
                <label for="fermentable">Fermentable</label>
                <v-select label="name" v-model="fermentable" :options="fermentables"></v-select>
                <button class="btn-positive">Add Fermentable</button>
            </form>
        </div>
        <div class="card-footer">
            <div v-if="newRecipeFermentables.length > 0">
                <h5>Current Grains:</h5>
                <div v-for="newFermentable in newRecipeFermentables">
                    <h6>{{newFermentable.quantity}}
                        <span v-if="newFermentable.quantity > 1">lbs</span>
                        <span v-else>lb</span> of {{newFermentable.name}}</h6>
                    <i class="fas fa-2x fa-ban" @click="removeFermentable(newFermentable)"></i>
                </div>
            </div>
        </div>
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
                fermentable: ''
            }
        },
        computed: {
            fermentables() {
                return this.$store.state.fermentables
            },
            newRecipeFermentables() {
                return this.$store.state.newRecipe.fermentables
            }
        },
        methods: {
            addFermentable() {
                this.fermentable.quantity = Number(this.defaultValues.quantity)
                this.$store.dispatch('addNewRecipeFermentable', this.fermentable)
                this.$parent.calcGravities()
                this.$parent.calcColor()
                this.$parent.calcIbu()
                this.$parent.checkStyle()
            },
            removeFermentable(fermentable){
                for (var i = 0; i < this.$store.state.newRecipe.fermentables.length; i++){
                    var search = this.$store.state.newRecipe.fermentables[i]
                    if (search.name == fermentable.name){
                        this.$store.state.newRecipe.fermentables.splice(i, 1)
                    }
                }
                this.$parent.calcGravities()
                this.$parent.calcColor()
                this.$parent.calcIbu()
                this.$parent.checkStyle()
            }
        },
    }
</script>

<style scoped>
</style>