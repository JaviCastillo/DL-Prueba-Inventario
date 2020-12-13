<template>
    <div>
        <div class="jumbotron container my-4 text-center bg-info py-4">
            <h1 class="font-weight-bold text-light">Inventario</h1>
            <p class="lead">Maneja el inventario de productos de la tienda en esta aplicacion</p>
            <hr class="my-4">
            <p class="lead">Ingresa o modifica productos con este formulario</p>
            <form class="form-inline">
                <input type="text" class="form-control mx-3" placeholder="Codigo" v-model="form.codigo">
                <input type="text" class="form-control mx-3" placeholder="Nombre" v-model="form.nombre">
                <input type="text" class="form-control mx-3" placeholder="Stock" v-model="form.stock">
                <input type="text" class="form-control mx-3" placeholder="Precio (CLP)" v-model="form.precio">
                <button class="btn btn-primary mb-2" @click.prevent="addToy" v-if="!edit">Agregar</button>
                <button class="btn btn-warning mb-2" @click.prevent="updateToy()" v-if="edit">Actualizar</button>
            </form>
        </div>
        <div class="container">
            <table class="table table-light table-striped">
                <thead>
                    <tr class="table-info">
                        <th>Código</th>
                        <th>Nombre del Producto</th>
                        <th>Stock</th>
                        <th>Precio (CLP)</th>
                        <th>Funciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in getToys" :key="item.id">
                        <th>{{item.codigo}}</th>
                        <td>{{item.nombre}}</td>
                        <td>{{item.stock}}</td>
                        <td>{{item.precio}}</td>
                        <td>
                            <button class="btn btn-warning mx-3" @click.prevent="updateActive(item)" v-if="!edit">Editar</button>
                            <button class="btn btn-danger" @click.prevent="deleteToy(item.id)" v-if="!edit">Borrar</button>
                            <button class="btn btn-warning mx-3" disabled v-if="edit">Editar</button>
                            <button class="btn btn-danger" disabled v-if="edit">Borrar</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        
    </div>
</template>

<script>
import Swal from 'sweetalert2'

export default {
    codigo: 'Inventario',
    data() {
        return {
            form: {
                codigo: '',
                nombre: '',
                stock: '',
                precio:''
            },
            edit: false,
            toyEdit: {}
        }
    },
    computed: {
        getToys(){
            return this.$store.getters.getToys
        }
    },
    methods: {
        addToy(){

            let libre = true
            this.getToys.forEach(element => {
                if (element.codigo == this.form.codigo) {
                    libre = false
                }
            });

            if (this.form.codigo && this.form.nombre && this.form.stock > 0 && this.form.precio > 0 && libre) {
                Swal.fire({
                    title: '¿Deseas agregar este producto?',
                    text: `${this.form.codigo} || ${this.form.nombre} || ${this.form.stock} uds.|| $ ${this.form.precio}`,
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    cancelButtonText: 'No, cancelar',
                    confirmButtonText: 'Si, agregar'
                }).then((result) => {
                    if (result.isConfirmed) {
                        this.form.precio = parseInt(this.form.precio)
                        this.form.stock = parseInt(this.form.stock)
                        this.$store.dispatch('addToy',this.form);
                        this.form.codigo = ''
                        this.form.nombre = ''
                        this.form.precio = ''
                        this.form.stock = ''
                        Swal.fire({
                            title: 'Perfecto',
                            text: "Producto agregado exitosamente",
                            icon: 'success',
                        })
                    }
                })
            } else {
                Swal.fire({
                    title: 'Atencion',
                    text: 'Ingresa los datos correctamente',
                    icon: 'warning',
                })
            }
        },
        updateActive(toy){
            window.scrollTo(0,0);
            this.form.codigo = toy.codigo
            this.form.nombre = toy.nombre
            this.form.stock = toy.stock
            this.form.precio = toy.precio
            this.toyEdit = toy
            this.edit = true
        },
        updateToy(){

            if (this.form.codigo && this.form.nombre && this.form.stock > 0 && this.form.precio > 0) {
                Swal.fire({
                    title: '¿Deseas actualizar este producto?',
                    text: `${this.toyEdit.codigo} || ${this.toyEdit.nombre} || ${this.toyEdit.stock} uds.|| $ ${this.toyEdit.precio} ==> ${this.form.codigo} || ${this.form.nombre} || ${this.form.stock} uds.|| $ ${this.form.precio}`,
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    cancelButtonText: 'No, cancelar',
                    confirmButtonText: 'Si, actualizar'
                }).then((result) => {
                    if (result.isConfirmed) {
                        this.form.precio = parseInt(this.form.precio)
                        this.form.stock = parseInt(this.form.stock)
                        this.toyEdit.codigo = this.form.codigo
                        this.toyEdit.nombre = this.form.nombre
                        this.toyEdit.precio = this.form.precio
                        this.toyEdit.stock = this.form.stock

                        this.$store.dispatch('updateToy',this.toyEdit);

                        this.form.codigo = ''
                        this.form.nombre = ''
                        this.form.precio = ''
                        this.form.stock = ''
                        this.toyEdit = {}
                        this.edit = false
                        Swal.fire({
                            title: 'Perfecto',
                            text: "Producto actualizado exitosamente",
                            icon: 'success',
                        })
                    }
                })
            }
        },
        deleteToy(toyid){

            Swal.fire({
                title: '¿Deseas eliminar este producto?',
                text: "Revisa bien tu opcion",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: 'No, cancelar',
                confirmButtonText: 'Si, eliminar'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.$store.dispatch('deleteToy',toyid);
                }
            })
        }
    },
}
</script>

<style>
.form-control{
    width: 200px;
}
</style>