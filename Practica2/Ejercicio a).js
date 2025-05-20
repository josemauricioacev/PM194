const persona = {
    nombre: "José Armando",
    edad: 21,
    direccion: {
        ciudad: "Querétaro",
        pais: "México"
    }
};

//Aplica destructuración aquí
const {nombre, edad, direccion: {ciudad, pais}} = persona;


//Imprime el mensaje
console.log(`Hola, mi nombre es ${nombre}. Tengo ${edad} años. Vivo en ${ciudad}, ${pais}.`);