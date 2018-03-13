<template>
  <div class="Home">
    <navbar></navbar>
    <div class="call d-flex flex-column justify-content-center align-items-center">
      <h4>Welcome to Brew Bros!</h4>
      <h6>Your source for all your homebrewing needs!</h6>
      <div class="d-flex">
        <button class="btn btn-success my-2 my-sm-0">Browse Recipes</button>
        <div v-if="user.name">
          <button class="btn btn-success my-2 my-sm-0 ml-2">Create Recipe</button>
        </div>
        <div v-else>
          <button class="btn btn-primary my-2 my-sm-0 ml-2" data-toggle="modal" data-target="#registerModal">Register</button>
        </div>
      </div>
    </div>
    <div class="description d-flex flex-column justify-content-center align-items-center">
      <h4>What we do for you</h4>
      <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque, ad laudantium rem adipisci, similique autem est cupiditate
        ipsam veniam fugiat, voluptatem facilis fugit dolore perspiciatis nobis dicta enim dolores aliquam accusamus nihil
        voluptas recusandae pariatur aut. Fugiat suscipit facilis vero perspiciatis in harum dolores, enim at, aut eveniet
        sit amet explicabo tenetur quod rerum ex magnam fugit officiis rem eum! Repellat odit culpa omnis voluptas accusantium
        est fugiat at labore eius illum reprehenderit, rerum qui, quae cupiditate, ullam natus tempora vero incidunt minus
        fuga similique assumenda? Atque, delectus. Nemo illo tempora quaerat dicta omnis debitis non vel corporis, cumque
        ullam.
      </p>
    </div>
    <foot></foot>
  </div>
</template>

<script>
  import navbar from './Navbar'
  import foot from './Foot'
  export default {
    name: 'Home',
    data() {
      return {

      }
    },
    computed: {
      user() {
        return this.$store.state.user
      }
    },
    components: {
      navbar,
      foot
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .call {
    background: url('../assets/beer-bg.jpeg');
    background-position: center center;
    background-repeat: no-repeat;
    background-size: fill;
    min-height: 70vh;
    color: white;
  }

  .description {
    background: black;
    color: white;
  }
</style>