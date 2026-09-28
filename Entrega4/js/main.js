                    // VARIABLES Y ARRAYS

const saldoInicial = 200;
let saldoActual = saldoInicial;
let opcion;
let movimientos = [];
let limite;

let montosRetiro = [100, 200, 500, 1000, 2000];


                    // FUNCIONES

    //Transferencias    
const trasferir = (valor, destinatario) => {
    if(valor > saldoActual){
        alert("No tienes suficiente saldo para realizar la transferencia.");
    } else {
        alert("Transferencia realizada con éxito. Transferiste $" + valor + " a " + destinatario);
        saldoActual -= valor;
        alert("Saldo actual: $" + saldoActual);
        movimientos.push("Transferencia a " + destinatario + ": $" + valor);
    }
}

    // Retirar dinero
const retirarDinero = (limite, retiro) => {
    if (limite === null || limite === undefined) {
        saldoActual -= retiro;
        alert("Saldo actual: $" + saldoActual);
        movimientos.push("Retiro: $" + retiro);
    }else if (retiro > limite) {
        alert("El límite de retiro es de $" + limite);
    }else if (retiro <= limite){ 
        saldoActual -= retiro;
        alert("Saldo actual: $" + saldoActual);
        movimientos.push("Retiro: $" + retiro);
    }
}

    // Gestionar Limite
const gestionarLimite = (elecion) => {                                            
    if (elecion == 1) {
    let limiteElegido = parseInt(prompt("Ingrese el límite de retiro:"));
        if(isNaN(limiteElegido)){
            alert("Por favor, ingrese un número válido.");
        }else if (limiteElegido <= 0) {
            alert("El límite de retiro debe ser mayor a cero.");
        }else{
        limite = limiteElegido;
        alert("Límite de retiro establecido a $" + limite);
        }
    } else if (elecion == 2) {
        limite = null;
        alert("Límite de retiro eliminado.");
    }
}

    // Validar Monto
const validarMonto = (monto) => {
    if (isNaN(monto) || monto <= 0) {
        return false;
    }

    return true;
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

do {
    opcion = parseInt(prompt(`Seleccione una opción:\n1. Ingresar dinero\n2. Retirar dinero \n3. Transferir dinero\n4. Consultar saldo \n5. Ver movimientos \n6 Gestionar Limite \n7. Salir`));
    
    switch (opcion) {

        //ingresar dinero
        case 1:
            let ingreso = parseInt(prompt("Ingrese la cantidad de dinero a ingresar:"));
            if (!validarMonto(ingreso)) {
                alert("Por favor, ingrese un monto válido.");
            } else {
                saldoActual += ingreso;
                alert("Saldo actual: $" + saldoActual);
                movimientos.push("Ingreso: $" + ingreso);
            }
            break;
            

        // Retirar dinero
        case 2:
                let eleccionRetiro = parseInt(prompt("Seleccione una opción:\n1. Configurar retiros rápidos \n2. Retiro personalizado \n3. Retiro rapido "));
                if (!validarMonto(eleccionRetiro) || eleccionRetiro < 1 || eleccionRetiro > 3) {
                    alert("Por favor, ingrese un número válido.");
                } else if (eleccionRetiro == 1) {
                    let opcion = parseInt(prompt("\n1. Selecciona 1 para agregar un monto de retiro \n2. para agregar un monto favorito \n3. para eliminar un monto de retiro"));
                    if(!validarMonto(opcion) || (opcion < 1 || opcion > 3)){
                        alert("Por favor, ingrese un número válido.");
                    } else {
                        gestionarRetirosRapidos(opcion);
                    } break;
                } else if (eleccionRetiro == 2) {
                    let retiro = parseInt(prompt("Ingrese la cantidad de dinero a retirar:"));
                    if (!validarMonto(retiro)) {
                        alert("La cantidad a retirar es incorrecta.");
                    } else if (retiro > saldoActual) {
                        alert("No tienes suficiente saldo para retirar esa cantidad.");
                    } else {
                        retirarDinero(limite, retiro);
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
                        if (retiro > saldoActual) {
                            alert("No tienes suficiente saldo para retirar esa cantidad.");
                        } else {
                            retirarDinero(limite, retiro);
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
            } else if (transferencia > saldoActual) {
                alert("No tienes suficiente saldo para transferir esa cantidad.");
            } else {
                trasferir(transferencia, destinatario);
            }
            break;
            
        // Consultar saldo
            case 4:
                alert("Tu saldo actual es de $" + saldoActual);
            break;
        
        // Ver movimientos
            case 5:
                for (let i = 0; i < movimientos.length; i++) {
                    alert("numero de movimiento " + (i + 1) + ": " + movimientos[i]);
                }
            break;
        
        // Gestionar Limite
            case 6:
                let elecionLimite = prompt("Deseas poner limite a tus retiros? preciona 1. para gestionarlo. Si deseas eliminarlo preciona 2.");
                if (isNaN(elecionLimite)) {
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



