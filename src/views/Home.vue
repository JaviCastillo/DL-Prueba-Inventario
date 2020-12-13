<template>
  <div class="pt-5">
    <div class="jumbotron container my-4 text-center bg-success">
      <h1 class="font-weight-bold text-light"><img class="img-home" src="../assets/ottokraus-logo.png" alt=""> Sistema de Inventario</h1>
      <hr class="my-4">
      <router-link class="btn btn-primary btn-lg mx-5" to="/inventario">Ver Inventario</router-link>
      <a class="btn btn-danger btn-lg mx-5" @click.prevent="logout">Salir</a>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import Swal from 'sweetalert2'

export default {
  name: 'Home',
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

<style>
.img-home{
  height: 70px;
}
</style>
