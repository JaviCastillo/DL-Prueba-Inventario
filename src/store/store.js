import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import Swal from 'sweetalert2'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    toys :[],
    currentUser: false
  },
  getters: {
    getToys(state){
      return state.toys
    },
    getCurrentUser(state){
      return state.currentUser
    }
  },
  mutations: {
    putToys(state){
      firebase.firestore().collection('toys').orderBy('codigo').onSnapshot(resp => {
        let arreglo = [];
        resp.forEach(element => {
          arreglo.push({
            id: element.id,
            codigo: element.data().codigo,
            nombre: element.data().nombre,
            stock: element.data().stock,
            precio: element.data().precio,
          })
        });
        state.toys = arreglo;
      })
    },
    addToy(state,toy){
      firebase.firestore().collection('toys').add({
        codigo: toy.codigo,
        nombre: toy.nombre,
        stock: toy.stock,
        precio: toy.precio,
      })
    },
    updateToy(state,toy){
      firebase.firestore().collection('toys').doc(toy.id).update({
        codigo: toy.codigo,
        nombre: toy.nombre,
        stock: toy.stock,
        precio: toy.precio,
      })
    },
    deleteToy(state,toyid){
      firebase.firestore().collection('toys').doc(toyid).delete().then(()=>{
        Swal.fire(
          'Borrado!',
          'Tu producto ha sido eliminado del inventario',
          'success'
          )
      })
    },
    updateUser(state, user){
      state.currentUser = user
    }
  },
  actions: {
    putToys({commit}){
      commit('putToys');
    },
    addToy({commit},toy){
      commit('addToy',toy);
    },
    updateToy({commit},toy){
      commit('updateToy',toy);
    },
    deleteToy({commit},toyid){
      commit('deleteToy',toyid);
    },
    updateUser({commit}, user){
      commit('updateUser', user)
    }
  },
})
