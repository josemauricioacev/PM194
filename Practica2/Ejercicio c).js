const personas = [
    { nombre: "Ana", edad: 22 },
    { nombre: "Luis", edad: 35 },
    { nombre: "María", edad: 28 },
];

//persona con nombre "Luis"
const personaLuis=personas.find(({ nombre }) => nombre=== "Luis");

//imprimir el nombre de cada persona con su edad
console.log("Lista de personas:");
personas.forEach(({ nombre, edad }) => {
    console.log(`Nombre: ${nombre}, Edad: ${edad}`);
});

//sumar todas las edades y obtener un total
const sumaEdades=personas.reduce((acumulador, { edad }) => acumulador + edad, 0);

//imprimir la persona encontrada (Luis)
console.log("\nLa persona encontrada es:", personaLuis);

//imprimir la suma total de las edades
console.log("La suma de todas las edades es:", sumaEdades);
