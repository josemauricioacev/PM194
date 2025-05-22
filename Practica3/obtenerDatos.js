function simularPeticionAPI() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve("Datos recibidos correctamente");
        }, 5000); //espera 5 segundos
    });
}

async function obtenerDatos() {
    const resultado = await simularPeticionAPI();
    console.log(resultado);
}

//llama a la función
obtenerDatos();
