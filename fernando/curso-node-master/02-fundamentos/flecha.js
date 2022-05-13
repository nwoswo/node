function sumar(a,b) {
    return a+b;
}

console.log(sumar(10,20));

let sumar2 = (a,b) => a+b;


console.log(sumar2(10,20));


let saludar = () => 'Hola Mundo';
let saludar = nombre => `Nombre: ${nombre}`;


let deadpool = {
    nombre: 'Wade',
    apellido: 'Winston',
    poder: 'Regeneracion',
    getNombre(){
        return `${this.nombre} ${this.apellido} - poder: ${this.poder} `
    }
};


console.log(deadpool.getNombre());


