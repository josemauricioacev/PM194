function verificarUsuario(usuario) {
    return new Promise((resolve, reject) => {
        if (usuario === "admin") {
            resolve("Acceso concedido");
        } else {
            reject("Acceso denegado");
        }
    });
}

// Prueba con usuario correcto
verificarUsuario("admin")
    .then(mensaje => console.log("Resultado:", mensaje))
    .catch(error => console.log("Error:", error));

// Prueba con usuario incorrecto
verificarUsuario("jose")
    .then(mensaje => console.log("Resultado:", mensaje))
    .catch(error => console.log("Error:", error));