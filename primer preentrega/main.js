const nombreUsuario = prompt(`Ingrese su nombre`);
alert(`Bienvenido a nuestro ecommerce ${nombreUsuario}`);

// funciones para no repetir alert y prompt
const envioDeCompra = () => {
    let direccionDeEnvio = prompt(`Ingrese su dirección para poder realizar el envío del pedido`);
    alert(`Su pedido será enviado a ${direccionDeEnvio}`);
}

const agradecimientoPorCompra = () => {
    alert(`Muchas gracias por su pedido`)
}

// función para la compra
const compraDelProducto = (producto, precio, direccion) => {
    // eleccion del producto
    let categoriaDeProducto = prompt(`¿Qué deseas comprar? Elige la opción 1 si son remeras; opción 2 si son pantalones `)

    if(categoriaDeProducto == 1){
        let confirmarCompra = confirm(`Usted eligió la opción 1 (remera), su precio es de $3500. ¿Desea comprar el artículo?`)

// si el cliente eligió confirmar la compra se ejecuta este bucle
        while(confirmarCompra){
            envioDeCompra(prompt);
            agradecimientoPorCompra(alert);
            
            !confirmarCompra
            break;
        }
// si no aceptó la compra se ejecuta este alert
        if(!confirmarCompra){
            alert(`Gracias por su visita`)
        }
    }
    
// si el cliente elige el producto número 2 se ejecuta esta función
    if(categoriaDeProducto == 2){
        confirmarCompra = confirm(`Usted eligió la opción 2 (pantalones), su precio es de $8700. ¿Desea comprar el artículo?`)

// si el cliente confirmó la compra se ejecuta el siguiente bucle
        while(confirmarCompra){
            envioDeCompra(prompt);
            agradecimientoPorCompra(alert);
            
            !confirmarCompra
            break;
        }

// si no sigue con la compra se ejecuta este alert
        if(confirmarCompra == false){
            alert(`Gracias por su visita`)
        }
    }
    return (producto, precio, direccion)
}

compraDelProducto()