<template>
    <div class="adjunct">
        <form @submit.prevent="addAdjunct">
            <div class="form-group">
                <h6>Amount: </h6>
                <input type="number" name="adjunctAmount" v-model="adjunct.quantity">
                <label for="adjunctAmount">oz</label>
            </div>
            <div class="form-group">
                <h6>Ingredient: </h6>
                <select class="form-control" id="adjunct" placeholder="Adjunct" v-model="adjunct.name">
                    <option v-for="adjunct in adjuncts">{{adjunct.name}}</option>
                </select>
            </div>
            <div class="form-group">
                <h6>Boil Time: </h6>
                <input type="number" name="boilTime" v-model="adjunct.boilTime">
                <label for="boilTime">min</label>
            </div>
            <button type="submit" class="btn-success">Add Hop</button>
        </form>
    </div>
</template>

<script>
    export default {
        mounted() {
            this.$store.dispatch('getAdjuncts')
        },
        data() {
            return {
                adjunct: {
                    name: '',
                    quantity: 0,
                    boilTime: 60
                }
            }
        },
        computed: {
            adjuncts() {
                return this.$store.state.adjuncts
            }
        },
        methods: {
            addAdjunct(){
                this.$store.state.dispatch('addNewRecipeAdjunct', this.adjunct)
            }
        }
    }
</script>

<style scoped>
</style>