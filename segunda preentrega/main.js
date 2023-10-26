// CASO ECOMMERCE
// DENTRO DE LA CARPETA DATA, HAY UN ARCHIVO products.js QUE PODEMOS UTILIZAR PARA EL DESARROLLO DE NUESTRA PREENTREGA
// 1) Tomar dos categorías de productos que deseen incorporar en su tienda y filtrar de entre todos los productos aquellos que cumplan con la categoría.
// 2) Mediante un alert, saludar al usuario y darles la bienvenida a su ecommerce.
// 3) Mediante un alert, visualizar las categorías de productos disponibles.
// 4) Mediante un prompt, mostrar la lista de productos disponibles ordenados de manera A-Z y preguntar qué producto quiere comprar.
// 5) Con el valor obtenido del punto 4, se deberá buscar el producto deseado y mediante un confirm, mostrar el nombre, descripción y precio del producto. Se deberá preguntar al usuario si se desea completar la compra. En caso de que no se encuentre el producto, se deberá dar la chance de ingresarlo nuevamente.
// 6) Con el valor obtenido del punto 5), se deberá visualizar un alert que agradezca la compra con una supuesta fecha de entrega -usando date-, en el caso de que la acepte, si la cancela, se agradecerá la interacción.



// importamos el archivo products
import { products } from './data/products.js';


// definimos las dos categorías elegidas dentro de dos constantes
const categoria1 = `women's clothing`
const categoria2 = `electronics`


// filtramos en el array las categorías anteriormente elegidas 
const categoriasFiltradas = products.filter((product) => {
    return product.category === categoria1 || product.category === categoria2
})

// definimos la constante para los nombres de los productos que necesitamos
const nombresProductos = categoriasFiltradas.map(product => product.title)


// definimos la variable para el orden de los productos
let productosOrdenados = nombresProductos.sort()


// bucle para la lista de productos antes de que el usuario elija
function listaDeProductos (productosOrdenados) {
    let lista = ``
    for(let i = 0; i < productosOrdenados.length; i++){
        lista += `${i + 1}. ${productosOrdenados[i]}\n`
    }
    return lista
}


// alert de saludo y categorías
alert(`¡Hola! Bienvenido a nuestro ecommerce`)
alert(`Las categorías disponibles son: \n1. Ropa de mujer \n2. Electrónicos`)


// función para la compra del artículo 
function compra() {
    let eleccionProducto;
    let eleccionNoValida;

// hacemos un do while para que ejecute un prompt o un confirm dependiendo la respuesta del usuario
    do {
        eleccionProducto = prompt(`¿Qué producto desea comprar? Ponga su respuesta con el número al lado del producto.\n${listaDeProductos(productosOrdenados)}`);


// si la respuesta del usuario es null o no es un número, le preguntamos si quiere intentarlo otra vez
        if (eleccionProducto === null || isNaN(eleccionProducto)) {
            eleccionNoValida = confirm(`Solo son válidos los números. ¿Quiere intentarlo nuevamente?`);
            if(eleccionNoValida === false){
                alert(`Muchas gracias por visitar nuestro sitio`)
                break;
            }


// si la respuesta del usuario es un número que no está dentro de las opciones, le damos la opción de intentarlo otra vez
        } else if (eleccionProducto < 1 || eleccionProducto > 12){
            alert('Producto no encontrado. Inténtelo nuevamente.');
            return compra()
        }

    } while (eleccionProducto === null || isNaN(eleccionProducto));


// declaramos una variable para la búsqueda de las características del producto elegido por el usuario

let productoElegido = categoriasFiltradas.find(product => product.title === nombresProductos[eleccionProducto - 1])


// si el producto elegido por el usuario es válido, le mostramos su nombre, precio y descripción
if (productoElegido) {
        let confirmacionCompra = confirm(`Nombre: ${productoElegido.title}\nDescripción: ${productoElegido.description}\nPrecio: $${productoElegido.price}\n¿Desea confirmar su compra?`);


// si el usuario decide finalizar la compra le damos las gracias y le avisamos cuando llegará
        if (confirmacionCompra) {
            const fechaActual = new Date();
            const fechaEnvio = new Date(fechaActual);
            fechaEnvio.setDate(fechaEnvio.getDate() + 10);
            alert(`Muchas gracias por su compra, su pedido llegará el ${fechaEnvio.toLocaleDateString()}`);


// si el usuario no desea seguir con la compra, intentamos que se quede invitandolo a ver otro producto
        } else {
            let retencionCliente = confirm(`¿Desea ver otro producto?`)
            if(retencionCliente === true){
                return compra()


// si luego de eso desiste, le damos las gracias por ver el sitio
            } else{
                alert(`Muchas gracias por visitar nuestro sitio.`)
            }
        }
    } 
}

compra();