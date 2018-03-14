<template>
  <div class="Yeast">
    <div class="card">
      <div class="card-header">
        <h5 class="card-title">Yeasts</h5>
      </div>
      <div class="card-body">
        <div class="form-group">
          <label for="yeastBrand">Brand</label>
          <select type="text" class="form-control" id="yeastBrand">
            <option v-for="supplier in suppliers">{{yeast.supplier}}</option>
          <label for="yeastVariety">Variety</label>
          <select type="text" class="form-control" id="yeastVariety">
          <option v-for="yeast in yeasts">{{yeast.name}}</option>
          <label for="yeastTemp">Temp (F)</label>
          <input type="number" class="form-control" id="yeastTemp">
          <label for="yeastPitch">Pitch</label>
          <input type="number" class="form-control" id="yeastPitch">
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Yeast',
    data() {
      return {

      }
    },
    methods: {
      
    },
    computed: {

    },
    components: {

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>