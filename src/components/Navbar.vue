<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
    <div class="container-fluid">
      <a class="navbar-brand" href="#"><font-awesome-icon icon="puzzle-piece" /> Otto Klaus</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse">
        <ul v-if="usuarioActivo" class="navbar-nav mr-auto">
          <li class="nav-item mr-5">
            <a class="nav-link font-weight-bold">Bienvenido <font-awesome-icon class="mx-1" icon="user" />{{usuarioActivo.given_name}} {{usuarioActivo.family_name}}</a>
          </li>
        </ul>
      </div>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul v-if="usuarioActivo" class="navbar-nav ml-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/home">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/inventario">Inventario</router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link btn btn-danger ml-3" @click.prevent="logout"><font-awesome-icon icon="power-off" />Logout</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import firebase from 'firebase'
import Swal from 'sweetalert2'

export default {
  name: 'Navbar',
  computed:{
    usuarioActivo(){
      return this.$store.getters.getCurrentUser
    }
  },
  methods: {
    logout(){
      let store = this.$store
      let router = this.$router
      
      Swal.fire({
        title: '¿Seguro que desea salir?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'No, me quedo',
        confirmButtonText: 'Si, deseo salir'
      }).then((result) => {
        if (result.isConfirmed) {
          firebase.auth().signOut().then(function() {
              Swal.fire(
                'Gracias por utilizar el Sistema de Inventario Otto Klaus',
              )
              let user = false
              store.dispatch('updateUser', user)
              router.push('/')
          }).catch(function(error) {
              console.log(error);
          });
        }
      })
    }
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Luckiest+Guy&display=swap');

.navbar-brand{
  font-family: 'Luckiest Guy', cursive;
  font-size: 25px;
}
</style>
