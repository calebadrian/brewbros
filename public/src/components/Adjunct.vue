<template>
    <div class="adjunct">
        <form @submit.prevent="addAdjunct">
            <div class="form-group">
                <h6>Amount: </h6>
                <input type="number" name="adjunctAmount" v-model="defaultValues.quantity">
                <label for="adjunctAmount">oz</label>
            </div>
            <div class="form-group">
                <h6>Ingredient: </h6>
                <select class="form-control" id="adjunct" placeholder="Adjunct" v-model="adjunct">
                    <option v-for="adjunct in adjuncts" :value='adjunct'>{{adjunct.name}}</option>
                </select>
            </div>
            <div class="form-group">
                <h6>Boil Time: </h6>
                <input type="number" name="boilTime" v-model="defaultValues.boilTime">
                <label for="boilTime">min</label>
            </div>
            <button type="submit" class="btn-success">Add Adjunct</button>
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
                defaultValues: {
                    boilTime: 60,
                    quantity: 1
                },
                adjunct: {}
            }
        },
        computed: {
            adjuncts() {
                return this.$store.state.adjuncts
            }
        },
        methods: {
            addAdjunct(){
                this.adjunct.boilTime = this.defaultValues.boilTime
                this.adjunct.quantity = this.defaultValues.quantity
                this.$store.dispatch('addNewRecipeAdjunct', this.adjunct)
            }
        }
    }
</script>

<style scoped>
</style>