<template>
   <div class="steepingGrains">
    <div class="card">
      <div class="card-header">
        <h5 class="card-title">Steeping Grains</h5>
      </div>
      <div class="card-body">
        <div class="form-group">
            <label for="steepingGrainAmount">lbs</label>
            <input type="number" class="form-control" id="steepingGrainAmount" placeholder="#">
          <label for="steepingGrain">Fermentable To Steep</label>
          <select type="text" class="form-control" id="steepingGrain"></select>
            <option v-for="fermentable in fermentables">{{fermentable.name}}</option>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: 'SteepingGrains',
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