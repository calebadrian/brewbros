<template>
        <div class="steepingGrains">
                <div class="card">
                  <div class="card-header">
                    <h5 class="card-title">Fermentables</h5>
                  </div>
                  <div class="card-body">
                    <div class="form-group">
                        <label for="fermentableAmount">lbs</label>
                        <input type="number" class="form-control" id="fermentableAmount" placeholder="#">
                      <label for="fermentable">Fermentable</label>
                      <select type="text" class="form-control" id="fermentable"></select>
                        <option v-for="fermentable in fermentables">{{fermentable.name}}</option>
                    </div>
                  </div>
                </div>
              </div>
</template>

<script>
    export default {
        name: 'Fermentable',
        data() {
            return {

            }
        },
        computed: {

        }
    }
</script>

<style scoped>

</style>