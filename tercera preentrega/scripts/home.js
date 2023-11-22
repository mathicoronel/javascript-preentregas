let productos = []

const llamadaJson = (url) => {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            productos = data
            agregarProducto(productos)
        })
}

llamadaJson("./scripts/productos.json")

const productosCarritoJSON = JSON.parse(localStorage.getItem("productos-carrito"))
let carrito = productosCarritoJSON || []

function agregarProducto() {
    let comprarZapatilla = document.querySelectorAll(".comprar-zapatilla");
    comprarZapatilla.forEach((boton) => {
        boton.addEventListener("click", (e) => {
            let indice = parseInt(e.target.id)
            let encontrarProducto = productos.find(producto => producto.id === indice)

            if(encontrarProducto) {
                let productoEnCarrito = carrito.find(item => item.id === encontrarProducto.id)
                Toastify({
                    text: `${encontrarProducto.nombre} añadido al carrito`,
                    duration: 2000,
                    destination: "./pages/carrito.html",
                    newWindow: false,
                    close: true,
                    gravity: "top", // `top` or `bottom`
                    position: "right", // `left`, `center` or `right`
                    stopOnFocus: true, // Prevents dismissing of toast on hover
                    style: {
                    background: "linear-gradient(90deg, rgba(31,36,59,0.842436974789916) 0%, rgba(79,75,95,1) 100%)",
                    },
                    onClick: function(){} // Callback after click
                }).showToast();

                if(productoEnCarrito){
                    productoEnCarrito.cantidad++
                } else {
                    carrito.push({...encontrarProducto, cantidad: 1})
                    console.log(`producto añadido: ${encontrarProducto.nombre}`)
                }

                localStorage.setItem("productos-carrito", JSON.stringify(carrito))
            }
        })
    })
}

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