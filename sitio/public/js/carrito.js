let spanCantidad = document.querySelector('span.badge');
let changuito = document.querySelector('#lista-carrito tbody');
let spanTotal = document.getElementById('total');
let cartHead = document.getElementById('cart-head');
let cartFooter = document.getElementById('cart-footer');
let cartEmpty = document.getElementById('cart-empty');
let btnCartEmpty = document.getElementById('btn-delete-cart');
let btnNextBuy = document.getElementById('btn-next-buy');

const urlBase = window.origin;



const mostrarCantidad = changuito => {

    var cantidad = 0;
    var total = 0;
    changuito.forEach(item => {
        cantidad += +item.cantidad
        total += +item.total
    });
    spanCantidad.innerHTML = cantidad
    spanTotal.innerHTML = `<span>$</span> <span class="float-end">${total}</span>`
    
    if(cantidad == 0){

        cartHead.style.display = 'none'
        cartFooter.style.display = 'none'
        cartEmpty.style.display = 'block'
        btnCartEmpty.classList.add('disabled');
        btnNextBuy.classList.add('disabled');
    }else{
       
        cartHead.style.display = "table-header-group"
        cartFooter.style.display = 'table-footer-group'
        cartEmpty.style.display = 'none'        
        btnCartEmpty.classList.remove('disabled');
        btnNextBuy.classList.remove('disabled');
    }

}

const mostrarProductos = carrito => {
    console.log(carrito)
    changuito.innerHTML = ""
    carrito.forEach(item => {
        let product = `
            <td class="col-2">
            <img class="w-100" src="/images/products/${item.imagen}" id="imgProduct"> 
            </td>
            <td class="text-center col-3 align-middle">
            <a class="text-danger h5" onClick="quitarItem(event,${item.id},cantidad${item.id})"><i class="fas fa-minus-square btnQuitarItem"></i></a>
            <span id="cantidad${item.id}" class="h5 white">${item.cantidad}<span>
            <a class="text-success h5" onClick="agregarItem(event,${item.id})"><i class="fas fa-plus-square btnAgregarItem"></i></a>
            </td>
            <td class="align-middle white">
            ${item.nombre}
            </td>
           
            <td class="align-middle">
            <span class="white">$</span><span class="float-end white">${item.precio}</span>
            </td>
            <td class="align-middle">
            <span class="white">$</span><span class="float-end white">${item.total}</span>
            </td>
            `;
        changuito.innerHTML += product
    });
    return false
}

const show = async () => {
    let userLogued = $("userLogued");
    if (userLogued)  {
        try {
            let response = await fetch(urlBase + '/cart/show')
            let result = await response.json();
            console.log(result);
            mostrarCantidad(result.data);
            mostrarProductos(result.data); 
        } catch (error) {
            console.log(error)
        }
      }
    
}

const agregarItem = async (e,id) => {
    e.preventDefault()
    console.log("agregando item "+e+id);
    try {
        let response = await fetch(urlBase + '/cart/add/' + id)
        let result = await response.json();
        mostrarCantidad(result.data);
        mostrarProductos(result.data);

    } catch (error) {
        console.log(error)

    }
    console.log('producto ' + id + ' agregado!!')
}

const quitarItem = async (e,id,cantidad) => {
    e.preventDefault();
    console.log(cantidad.innerText);

    if(cantidad.innerText > 1){
    try {
        let response = await fetch(urlBase + '/cart/remove/' + id)
        let result = await response.json();
        mostrarCantidad(result.data);
        mostrarProductos(result.data);

    } catch (error) {
        console.log(error)

    }
    console.log('producto ' + id + ' eliminado!!')
    }else{
            try {
                let response = await fetch(urlBase + '/cart/remove/' + id)
                let result = await response.json();
                mostrarCantidad(result.data);
                mostrarProductos(result.data);
        
            } catch (error) {
                console.log(error)
        
            }
    }
}

const empty = async () => {
    try {
        let response = await fetch(urlBase + '/cart/empty')
        let result = await response.json();
        mostrarCantidad(result.data);
        changuito.innerHTML = ""

    } catch (error) {
        console.log(error)
    }
} 

/* const closeCart = async () => {
    console.log("presionaste seguir comprando");
    var myModal = new bootstrap.Modal(document.getElementById('modal-carrito'))
    myModal.hide();
}  */

const checkout = async () => {
        try {
            let response = await fetch(urlBase + '/cart/checkout')
            let result = await response.json();
            if(result.data){
                Swal.fire({
                    title: "¡Compra efectuada con éxito!",
                    html: `<p class="text-white" >Gracias por elegirnos </p>`,
                    color: "white",
                    background: "#040F16",
                    backdrop: "rgba(4, 15, 22, 0.6)",
                    confirmButtonText:
                      "<a href='/'>Aceptar</a>",
                    customClass: {
                      popup: "popup-class",
                      title: "content-class",
                      confirmButton: "confirmButton",
                      cancelButton: "cancelButton",
                    },
                  });
            }else if(result.meta.status==202){
                Swal.fire({
                    title: "¡El carrito está vacío!",
                    html: `<p class="text-white" >Seleccione alguna experiencia y vuelva a intentarlo </p>`,
                    color: "white",
                    background: "#040F16",
                    backdrop: "rgba(4, 15, 22, 0.6)",
                    confirmButtonText:
                      "<a href='/'>Aceptar</a>",
                    customClass: {
                      popup: "popup-class",
                      title: "content-class",
                      confirmButton: "confirmButton",
                      cancelButton: "cancelButton",
                    },
                  });
            }
            mostrarCantidad(result.data);
            changuito.innerHTML = ""
    
        } catch (error) {
            console.log(error)
        }
    
} 

show()