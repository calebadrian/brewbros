<template>
    <div class="adjunct">
        <div class="card">
            <div class="card-header">
                <h5 class="card-title">Other Ingredients</h5>
            </div>
            <div class="card-body">
                <form @submit.prevent="addAdjunct">
                    <div class="form-group">
                        <h6>Amount: </h6>
                        <input type="number" name="adjunctAmount">
                        <label for="adjunctAmount">oz</label>
                    </div>
                    <div class="form-group">
                        <h6>Ingredient: </h6>
                        <select class="form-control" id="adjunct" placeholder="Adjunct">
                            <option v-for="adjunct in adjuncts">{{adjunct.name}}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <h6>Boil Time: </h6>
                        <input type="number" name="boilTime">
                        <label for="boilTime">min</label>
                    </div>
                </form>
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

            }
        },
        computed: {
            adjuncts() {
                return this.$store.state.adjuncts
            }
        },
    }
</script>

<style scoped>
</style>