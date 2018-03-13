<template>
  <div class="Profile">
    <navbar></navbar>
    <img src="http://placehold.it/100x100" class="profile-pic">
    <h4>Username</h4>
    </div>
  </div>
</template>

<script>
  import navbar from './Navbar'
export default {
  name: 'Profile',
  data () {
    return {

    }
  },
  components: {
    navbar,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .spacer{
    min-height: 10vh
  }
</style>
