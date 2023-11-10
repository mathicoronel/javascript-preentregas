import { productos } from "./productos.js";

// MODO OSCURO
const botonModoOscuro = document.querySelector(".modoOscuro")

botonModoOscuro.addEventListener("click", () =>{
    let body = document.body
    body.classList.toggle("modo-oscuro")

    if (document.body.classList.contains("modo-oscuro")) {
        localStorage.setItem("modo-oscuro", "true")
    } else {
        localStorage.setItem("modo-oscuro", "false")
    }
})

if(localStorage.getItem("modo-oscuro") === "true") {
    document.body.classList.add("modo-oscuro")
} else {
    document.body.classList.remove("modo-oscuro")
}
const comprarZapatilla = document.querySelectorAll(".comprar-zapatilla");
let carrito;
const productosCarritoJSON = JSON.parse(localStorage.getItem("productos-carrito"))

if(productosCarritoJSON){
    carrito = productosCarritoJSON
} else {
    carrito = []
}

// FUNCIÓN PARA QUE LOS PRODUCTOS SE AÑADAN AL CARRITO EN LOCAL STORAGE
function agregarProducto() {
    comprarZapatilla.forEach((boton) => {
        boton.addEventListener("click", () => {
            let indiceProducto = parseInt(boton.getAttribute("data-producto-indice"))
            let encontrarProducto = productos.find(producto => producto.id === indiceProducto)
    
            if (encontrarProducto) {
                let productoEnCarrito = carrito.find(item => item.id === encontrarProducto.id)

                if(productoEnCarrito){
                    productoEnCarrito.cantidad++
                } else {
                    carrito.push({...encontrarProducto, cantidad: 1})
                    console.log(`producto añadido: ${encontrarProducto.nombre}`)
                }
                console.log(`carrito:`, carrito)

                localStorage.setItem("productos-carrito", JSON.stringify(carrito))
            }
        });
    });
}
agregarProducto()

// validaciones para la página contacto
const inputEmail = document.querySelector("#emailInput")
const inputNombre = document.querySelector("#nombreInput")
const mensajeInput = document.querySelector("#mensajeInput")

inputNombre.minLength = 2
inputEmail.type = "email"
mensajeInput.minLength = 10

