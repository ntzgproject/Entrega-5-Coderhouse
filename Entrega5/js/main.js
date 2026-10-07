                    // VARIABLES Y ARRAYS

let opcion;
let walletActual;
let montosRetiro = [100, 200, 500, 1000, 2000];


                    // CLASES Y OBJETOS

class Wallet {
    constructor(id, nombre, saldo, limiteRetiro){

        this.id = id;
        this.nombre = nombre;
        this.saldo = saldo;
        this.limiteRetiro = limiteRetiro;
        this.movimientos = [];
    }

    ingresarDinero(monto){
        this.saldo += monto;
    }

    retirarDinero(monto){
        this.saldo -= monto;
    }

    consultarSaldo(){
        return this.saldo;
    }

    consultarLimite(){
        return this.limiteRetiro;
    }
}



const wallet1 = new Wallet(1, "Principal", 200, null);
const wallet2 = new Wallet(2, "Ahorros", 1000, 500);
const wallet3 = new Wallet(3, "Inversiones", 3000, 1000);


                // REUTILIZABLES

// Validar Monto
const validarMonto = (monto) => {
if (isNaN(monto) || monto <= 0) {
    return false;
}
return true;
}


                // FUNCIONES

//Transferencias    
const trasferir = (valor, destinatario) => {
    if(valor > walletActual.consultarSaldo()){
        alert("No tienes suficiente saldo para realizar la transferencia.");
    } else {
        walletActual.retirarDinero(valor);

        alert("Transferencia realizada con éxito. Transferiste $" + valor + " a " + destinatario);
        alert("Saldo actual: $" + walletActual.consultarSaldo());
        walletActual.movimientos.push("Transferencia a " + destinatario + ": $" + valor);
    }
}

    // Retirar dinero
const retirarDinero = (monto) => {
    if (walletActual.consultarLimite() !== null && monto > walletActual.consultarLimite()) {
        alert("El monto de retiro supera el límite establecido.");
    } else {
        walletActual.retirarDinero(monto);

        alert("Retiro realizado con éxito. Retiraste $" + monto);
        alert("Saldo actual: $" + walletActual.consultarSaldo());
        walletActual.movimientos.push("Retiro: $" + monto);
    }        
}

    // Gestionar Limite
const gestionarLimite = (elecion) => {                                            
    if (elecion === 1) {
    let limiteElegido = parseInt(prompt("Ingrese el límite de retiro:"));

        if(isNaN(limiteElegido) || limiteElegido <= 0){
            alert("Por favor, ingrese un número válido.");
        }else{
        walletActual.limiteRetiro = limiteElegido;
        alert("Límite de retiro establecido a $" + walletActual.consultarLimite());
        }

    } else if (elecion == 2) {
        walletActual.limiteRetiro = null;
        alert("Límite de retiro eliminado.");
    }
}

    // Retiros rapidos

const gestionarRetirosRapidos = (opcion) => {
    switch (opcion) {
        case 1:  // Agregar un monto de retiro rapido
            let nuevoMonto = parseInt(prompt("Ingrese el nuevo monto de retiro:"));
            if (!validarMonto(nuevoMonto)) {
                alert("Ingrese un número válido.");
            } else {
                montosRetiro.push(nuevoMonto);
                alert("Monto de retiro agregado con éxito.");
            }
            break;

        case 2: // Agregar monto favorito
            let montoFavorito = parseInt(prompt("Ingrese el monto favorito a agregar:"));
            if (!validarMonto(montoFavorito)) {
                alert("Ingrese un número válido.");
            } else if (montosRetiro.includes(montoFavorito)) {
                let indice = montosRetiro.indexOf(montoFavorito);
                montosRetiro.splice(indice, 1);
                montosRetiro.unshift(montoFavorito);
                alert("Monto favorito agregado con éxito.");
            } else {
                montosRetiro.unshift(montoFavorito);
                alert("Monto favorito agregado con éxito.");
            }
            break;

        case 3: // Eliminar monto
        let listaDeMontos = "";
            for(const montoRetiro of montosRetiro){
                listaDeMontos += "$" + montoRetiro + "\n";
            }
            alert("Montos de retiro:\n" + listaDeMontos);

            let montoAEliminar = parseInt(prompt("Ingrese el monto a eliminar:"));
            if (!validarMonto(montoAEliminar)) {
                alert("Ingrese un número válido.");
            } else if (montosRetiro.includes(montoAEliminar)) {
                let indice = montosRetiro.indexOf(montoAEliminar);
                montosRetiro.splice(indice, 1);
                alert("Monto eliminado con éxito.");
            } else {
                alert("El monto ingresado no se encuentra en la lista de montos de retiro.");
            }
            break;
    }
}




                        // MENU

// Elegir Wallet

let eleccionWallet = parseInt(prompt(`Seleccione una Wallet: 
    
    1: ${wallet1.nombre}
    2: ${wallet2.nombre}
    3: ${wallet3.nombre}
    `));

if (eleccionWallet === 1){
    walletActual = wallet1;
}else if (eleccionWallet === 2){
    walletActual = wallet2;
}else if (eleccionWallet === 3){
    walletActual = wallet3;
}else{
    alert("Por favor, ingrese una opción válida.");
}

do {
    opcion = parseInt(prompt(`

        Wallet: ${walletActual.nombre}
        Saldo: ${walletActual.consultarSaldo()}
        
        Seleccione una opción:

        1. Ingresar dinero
        2. Retirar dinero 
        3. Transferir dinero
        4. Consultar saldo
        5. Ver movimientos 
        6. Gestionar Limite
        7. Salir
        `));
    
    switch (opcion) {

        //ingresar dinero

        case 1:
            let ingreso = parseInt(prompt("Ingrese la cantidad de dinero a ingresar:"));

            if (!validarMonto(ingreso)) {
                alert("Por favor, ingrese un monto válido.");

            } else {
                walletActual.ingresarDinero(ingreso);
                alert("Saldo actual: $" + walletActual.consultarSaldo());
                walletActual.movimientos.push("Ingreso: $" + ingreso);
            }
            break;
            

        // Retirar dinero

        case 2:
                let eleccionRetiro = parseInt(prompt(`
                    Seleccione una opción:
                    1: Configurar retiros rápidos 
                    2: Retiro personalizado 
                    3: Retiro rapido 
                    `));

                if (!validarMonto(eleccionRetiro) || eleccionRetiro < 1 || eleccionRetiro > 3) {
                    alert("Por favor, ingrese un número válido.");

                } else if (eleccionRetiro == 1) {

                    let opcion = parseInt(prompt(`
                        1: Selecciona 1 para agregar un monto de retiro 
                        2: Para agregar un monto favorito 
                        3:Para eliminar un monto de retiro
                        `));

                    if(!validarMonto(opcion) || (opcion < 1 || opcion > 3)){
                        alert("Por favor, ingrese un número válido.");
                    } else {
                        gestionarRetirosRapidos(opcion);
                    } break;

                } else if (eleccionRetiro == 2) {
                    let retiro = parseInt(prompt("Ingrese la cantidad de dinero a retirar:"));

                    if (!validarMonto(retiro)) {
                        alert("La cantidad a retirar es incorrecta.");
                    } else if (retiro > walletActual.consultarSaldo()) {
                        alert("No tienes suficiente saldo para retirar esa cantidad.");
                    } else {
                        retirarDinero(retiro);
                    }
                    break;

                } else if (eleccionRetiro == 3) {

                    let listaRetiros = "";
                    let numero = 1;

                    for (const monto of montosRetiro) {
                        listaRetiros += numero + ". $" + monto + "\n";
                        numero++;
                    }

                    let opcionRetiro = parseInt(prompt("Elige el monto rápido a retirar:\n" + listaRetiros));

                    if (!validarMonto(opcionRetiro) || opcionRetiro > montosRetiro.length) {
                        alert("La opción seleccionada no es válida.");

                    } else {
                        let retiro = montosRetiro[opcionRetiro - 1];
                        if (retiro > walletActual.consultarSaldo()) {
                            alert("No tienes suficiente saldo para retirar esa cantidad.");
                        } else {
                            retirarDinero(retiro);
                        }
                    }
                    break;
                }

        // Transferir dinero

        case 3:
            let transferencia = parseInt(prompt("Ingrese la cantidad de dinero a transferir:"));

            let destinatario = prompt("Ingrese el nombre del destinatario:");

            if (!validarMonto(transferencia)) {
                alert("La cantidad a transferir es incorrecta.");

            } else if (transferencia > walletActual.consultarSaldo()) {
                alert("No tienes suficiente saldo para transferir esa cantidad.");

            } else {
                trasferir(transferencia, destinatario);
            }
            break;
            
        // Consultar saldo

            case 4:
                alert("Tu saldo actual es de $" + walletActual.consultarSaldo());
            break;
        
        // Ver movimientos

            case 5:
                if(walletActual.movimientos.length == 0){
                    alert("No se han realizado movimientos.");
                } else {
                for (let i = 0; i < walletActual.movimientos.length; i++) {
                    alert("numero de movimiento " + (i + 1) + ": " + walletActual.movimientos[i]);
                    }
                }
            break;
        
        // Gestionar Limite

            case 6:
                let elecionLimite = prompt(`
                    1: Configurar el límite de retiro.
                    2: Eliminar el límite de retiro.
                    `);

                if (isNaN(elecionLimite) || elecionLimite < 1 || elecionLimite > 2){ 
                    alert("Por favor, ingrese un número válido.");

                }else {
                    gestionarLimite(elecionLimite);
                }
            break;
        
        // Salir
            case 7:
                alert("Gracias por usar nuestro servicio.");
                break;
        
            default:
            alert("Opción inválida. Por favor, seleccione una opción válida.");
            break;
    }

} while (opcion != 7);



