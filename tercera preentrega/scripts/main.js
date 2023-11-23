let productos = []

const llamadaJson = (url, generarNodos, container) => {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            productos = data;
            generarNodos(productos, container)
            agregarProducto(productos)
            ordenarProductos()
        })
};

const cardProductos = document.querySelector(".container-productos")

function nodosCards(productos, container) {
    const nodos = productos.reduce((acc, element) => {
        let descuento = element.descuento ? `<h4 class="numero-oferta">${element.descuento}% OFF</h4>` : ''
        return acc + `
        <div class="card-zapatillas">
            ${descuento}
            <img src="${element.imagen}" alt="${element.nombre}">
            <h5 class="descripcion">${element.nombre}</h5>
            <p class="descripcion">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam, error.</p>
            <span><strong>$${element.precio}</strong></span><br>
            <button class="comprar-zapatilla ms-auto" id="${element.id}">Añadir al carrito<i class="agregar-carrito fa-solid fa-cart-shopping"></i></button>
    </div>
    `
    }, "")
    
    container.innerHTML = nodos
}
llamadaJson("../scripts/productos.json", nodosCards, cardProductos)

const productosCarritoJSON = JSON.parse(localStorage.getItem("productos-carrito"))
let carrito = productosCarritoJSON || []

// FUNCIÓN PARA QUE LOS PRODUCTOS SE AÑADAN AL CARRITO EN LOCAL STORAGE
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
                    destination: "./carrito.html",
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

// FUNCIÓN PARA ORDENAR PRODUCTOS
const ordenProductos = document.querySelector("#ordenar-productos")

function ordenarProductos () {
    const productosOrdenados = [...productos]
    ordenProductos.addEventListener("click", () => {
        if (ordenProductos.value === "asc") {
            productosOrdenados.sort((a, b) => a.nombre.localeCompare(b.nombre))
        } 
        else if (ordenProductos.value === "des") {
            productosOrdenados.sort((a, b) => b.nombre.localeCompare(a.nombre))
        }
        else if (ordenProductos.value === "off") {
            productosOrdenados.sort((a, b) => (b.descuento || 0) - (a.descuento || 0))
        }
        else if (ordenProductos.value === "defecto") {
            llamadaJson("../scripts/productos.json", nodosCards, cardProductos)
        }
        nodosCards(productosOrdenados, cardProductos)
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

// validaciones para la página contacto
const inputEmail = document.querySelector("#emailInput")
const inputNombre = document.querySelector("#nombreInput")
const mensajeInput = document.querySelector("#mensajeInput")

inputNombre.minLength = 2
inputEmail.type = "email"
mensajeInput.minLength = 10