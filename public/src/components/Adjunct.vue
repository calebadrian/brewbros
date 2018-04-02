<template>
    <div class="adjunct">
        <div class="card-body">
            <form @submit.prevent="addAdjunct">
                <div class="form-group">
                    <h6>Amount: </h6>
                    <input type="number" name="adjunctAmount" v-model="defaultValues.quantity" step='.01' min='0'>
                    <label for="adjunctAmount">oz</label>
                </div>
                <div class="form-group">
                    <h6>Ingredient: </h6>
                    <v-select label="name" v-model="adjunct" :options="adjuncts"></v-select>
                </div>
                <div class="form-group">
                    <h6>Boil Time: </h6>
                    <input type="number" name="boilTime" v-model="defaultValues.boilTime" min='0'>
                    <label for="boilTime">min</label>
                </div>
                <button type="submit" class="btn-positive">Add Adjunct</button>
            </form>
        </div>
        <div class="card-footer">
            <div v-if="newRecipeAdjuncts.length > 0">
                <h5>Current Adjuncts:</h5>
                <div v-for="newAdjunct in newRecipeAdjuncts">
                    <h6>{{newAdjunct.quantity}}
                        <span v-if="newAdjunct.quantity > 1">ozs</span>
                        <span v-else>oz</span> of {{newAdjunct.name}}</h6>
                    <button class="btn-danger" type="button" @click="removeAdjunct(newAdjunct)">Remove</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        mounted() {
            this.$store.dispatch('getAdjuncts')
        },
        data() {
            return {
                defaultValues: {
                    boilTime: 60,
                    quantity: 1
                },
                adjunct: ''
            }
        },
        computed: {
            adjuncts() {
                return this.$store.state.adjuncts
            },
            newRecipeAdjuncts() {
                return this.$store.state.newRecipe.adjuncts
            }
        },
        methods: {
            addAdjunct() {
                this.adjunct.boilTime = Number(this.defaultValues.boilTime)
                this.adjunct.quantity = Number(this.defaultValues.quantity)
                this.$store.dispatch('addNewRecipeAdjunct', this.adjunct)
            },
            removeAdjunct(adjunct){
                for (var i = 0; i < this.$store.state.newRecipe.adjuncts.length; i++){
                    var search = this.$store.state.newRecipe.adjuncts[i]
                    if (search.name == adjunct.name){
                        this.$store.state.newRecipe.adjuncts.splice(i, 1)
                        return
                    }
                }
            }
        }
    }
</script>

<style scoped>
</style>