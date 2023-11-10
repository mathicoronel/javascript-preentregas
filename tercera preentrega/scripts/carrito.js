let productosCarritoJSON = JSON.parse(localStorage.getItem("productos-carrito"))

let comprarZapatilla = document.querySelectorAll(".comprar-zapatilla");
const carritoContenedor = document.querySelector(".carrito-contenedor")
const textoCarritoVacio = document.querySelector("#contenedor-texto-carrito")
const contenedorFinalizarCompra = document.querySelector(".contenedor-finalizar-compra")
const cardZapatillas = document.querySelector(".card-zapatillas")
const precioTotal = document.querySelector("#precio-total")
let botonVaciarCarrito = document.querySelector("#vaciar-carrito")
let contenedorVaciarCarrito = document.querySelector(".contenedor-vaciar-carrito")

// función para que se actualice el precio total mientras se agregan productos al carrito
function actualizarPrecios() {
    const calcularTotal = productosCarritoJSON.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    precioTotal.innerHTML = `
    <div class="contenedor-finalizar-compra">
        <div class="contenedor-precio-total">
            <h3 id="precio-total">Total: <strong>$${calcularTotal}</strong></h3>
        </div>
        <button id="finalizar-compra">Finalizar compra</button>
    </div>`
}

function vaciarCarrito() {
    botonVaciarCarrito.addEventListener("click", () => {
        if (productosCarritoJSON && productosCarritoJSON.length > 0) {
            productosCarritoJSON = [];
            localStorage.removeItem("productos-carrito");
            
            subirProductoCarrito();
            actualizarPrecios();
        }
    });
}

// función para realizar las cards de los productos en el html de carrito
function subirProductoCarrito() {
    if (productosCarritoJSON && productosCarritoJSON.length > 0) {
        textoCarritoVacio.classList.add("ocultar")

        carritoContenedor.innerHTML = ""

        productosCarritoJSON.forEach(producto => {
            let card = document.createElement("div");
            let boton = document.createElement("div")

            if (producto.cantidad === 1) {
                card.innerHTML = `
                <div class="carrito-contenedor">
                    <div class="card-zapatillas">
                        <img src="${producto.imagen}" alt="${producto.nombre}">
                        <h5 class="descripcion">${producto.nombre}</h5>
                        <p class="descripcion">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates, quidem?</p>
                        <span><strong>$${producto.precio}</strong></span><br>
                        <button class="eliminar-producto ms-auto" data-producto-indice="${producto.id}">Eliminar producto <i class="eliminar-producto fa-regular fa-circle-xmark"></i></button>
                    </div>
                </div>
                `
                boton.innerHTML = `
                <button class></button>
                `
            } else if (producto.cantidad > 1) {
                card.innerHTML = `
                <div class="carrito-contenedor">
                    <div class="card-zapatillas">
                        <small class="producto-cantidad">x${producto.cantidad}</small>
                        <img src="${producto.imagen}" alt="${producto.nombre}">
                        <h5 class="descripcion">${producto.nombre}</h5>
                        <p class="descripcion">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates, quidem?</p>
                        <span><strong>$${producto.precio}</strong></span><br>
                        <button class="eliminar-producto ms-auto" data-producto-indice="${producto.id}">Eliminar producto <i class="fa-regular fa-circle-xmark"></i></button>
                    </div>
                </div>
                `;
            }
            carritoContenedor.append(card)
        });
        
        let botonEliminar = document.querySelectorAll(".eliminar-producto")
        if (botonEliminar) {
            botonEliminar.forEach((boton) => {
                boton.addEventListener("click", () => eliminarProducto(boton))
            })
        }
        vaciarCarrito()
        actualizarPrecios();
    } else {
        textoCarritoVacio.classList.remove("ocultar")
        carritoContenedor.classList.toggle("ocultar")
        contenedorFinalizarCompra.classList.toggle("ocultar")
    }
}

function eliminarProducto(boton) {
    let indiceProducto = parseInt(boton.getAttribute("data-producto-indice"))
    let encontrarProducto = productosCarritoJSON.findIndex(producto => producto.id === indiceProducto)

    if (encontrarProducto !== -1) {
        productosCarritoJSON[encontrarProducto].cantidad--

        if (productosCarritoJSON[encontrarProducto].cantidad === 0) {
            productosCarritoJSON.splice(encontrarProducto, 1);
            localStorage.removeItem("productos-carrito")
        }
    }
    subirProductoCarrito()
    actualizarPrecios()
}
subirProductoCarrito();