<template>
  <div class="pt-5">
    <div class="jumbotron container my-4 text-center bg-warning">
      <img class="img-log" src="../assets/ottokraus-logo.png" alt="">
      <p class="lead font-weight-bold">Bienvenido</p>
      <p class="lead">Ingresa con tu cuenta de Google para entrar al Sistema de Inventario</p>
      <hr class="my-4">
      <a class="btn btn-primary btn-lg mx-5" @click.prevent="googleLogin">Entrar con Google</a>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'Login',
  methods: {
    googleLogin(){
      let store = this.$store
      let router = this.$router
      if(store.getters.getCurrentUser){
        alert('Usuario ya logueado')
      }else{
        let provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithPopup(provider).then(function(result) {
            let user = result.additionalUserInfo.profile
            store.dispatch('updateUser', user)
            router.push('/home')
        }).catch(function(error) {
            var errorMessage = error.message;
            console.log(errorMessage);
        });
      }
    }
  },
  
}
</script>

<style>
.img-log{
  height: 150px;
}

</style>