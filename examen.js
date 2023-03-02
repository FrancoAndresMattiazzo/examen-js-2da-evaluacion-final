'use strict'

let empleados = [];
let idempleado = 0;


function Persona(nombre,apellidos,nif,edad)
{
    this.nombre = nombre;
    this.apellidos = apellidos;
    this.nif = nif;
    this.edad = edad;

}

function Empleado(nombre, apellidos, nif, edad, puesto, salario, antiguedad)
{
    this.__proto__ = new Persona(nombre, apellidos,nif,edad);
    this.salario = salario;
    this.antiguedad = antiguedad;
    this.puesto = puesto;

    this.cambiarnombre = function cambiarnombre(nuevonombre)
    {
        this.nombre = nuevonombre
    }

    this.cambiarapellidos = function cambiarapellidos(nuevoapellido)
    {
        this.apellidos = nuevoapellido
    }

    this.cambiarnif = function cambiarnif(nuevonif)
    {
        this.nif = nuevonif;
    }

    this.cambiaredad = function cambiaredad(nuevaedad)
    {
        this.edad = nuevaedad
    }

    this.cambiarpuesto = function cambiarpuesto(nuevopuesto)
    {
        this.puesto = nuevopuesto
    }

    this.cambiarsalario = function cambiarsalario(nuevosalario)
    {
        this.salario = nuevosalario
    }

    this.cambiarantiguedad = function cambiarantiguedad(nuevaantiguedad)
    {
        this.antiguedad = nuevaantiguedad
    }

}
let emple1 = new Empleado("Juan", "Pérez", "12345678A", 30, "Programador", 2000, 5);

let emple2 = new Empleado("Ana", "García", "87654321B", 25, "Programador", 2000, 2);

anyadirEmpleado(emple1);
anyadirEmpleado(emple2);
console.log(empleados);

function anyadirEmpleado(emp)
{
    emp.id = idempleado;
    empleados.push(emp);
    idempleado++;
}


muestraWeb();


function muestraWeb()
{
    let divEmple = document.getElementById('divEmple');

    let titulo = document.createElement('h1');
    titulo.id = 'tituloH1'
    titulo.textContent = ('Listado de Empleados');
    divEmple.append(titulo);

    let listaOrdenada = document.createElement('ol');
    listaOrdenada.id = 'listaOrd';
    listaOrdenada.className = 'rounded-list';
    divEmple.append(listaOrdenada);

    for(let element of empleados)
    {
        muestraEmpleados(element);
    }


}

function repintar()
{
    let listaOrdenada = document.getElementById('listaOrd');
    listaOrdenada.innerHTML = "";
    
    for(let element of empleados)
    {
        muestraEmpleados(element);
    }

}

function muestraEmpleados(emp)
{
    let listaOrdenada = document.getElementById('listaOrd');

    console.log(emp);

        let listairdenada2 = document.createElement('li');
        listairdenada2.id = `li ${emp.id}`
        listaOrdenada.append(listairdenada2);

        let div = document.createElement('div')
        div.className = 'empleado';
        div.id = `${emp.id}`;
        listairdenada2.append(div);

        let nombre = document.createElement('p');
        nombre.textContent = `${emp.nombre}  ${emp.apellidos}`;
        div.append(nombre);

        let nif = document.createElement('p');
        nif.textContent = `NIF: ${emp.nif}`;
        div.append(nif);

        let edad = document.createElement('p');
        edad.textContent = `Edad: ${emp.edad}`;
        div.append(edad);

        let puesto = document.createElement('p');
        puesto.textContent = `Puesto: ${emp.puesto}`;
        div.append(puesto);

        let salario = document.createElement('p');
        salario.textContent = `Salario: ${emp.salario}`;
        div.append(salario);

        let antiguedad = document.createElement('p');
        antiguedad.textContent = `Antiguedad: ${emp.antiguedad}`;
        div.append(antiguedad);

        let botonEditar = document.createElement('button');
        botonEditar.type = 'button';
        botonEditar.id = 'botonEditar';
        botonEditar.textContent = 'Editar';
        
        let editar = new EditarHandleEmpleado(emp)
        editar.empleado = emp;
        botonEditar.addEventListener('click', editar);
        div.append(botonEditar)

        let botonBorrar = document.createElement('button');
        botonBorrar.type = 'button';
        botonBorrar.id = 'botonBorrar';
        botonBorrar.textContent = 'Borrar';
        div.append(botonBorrar);


        let borrar = new BorrarHandle(emp)
        borrar.empleado = emp;

       

        botonBorrar.addEventListener('click', borrar);

}


function EditarHandleEmpleado()
{    this.handleEvent = function(event)
    {
        event.preventDefault()

        let plantillaFormulario = document.getElementById('formulario-template').content.cloneNode(true);
        var formulario = plantillaFormulario.querySelector('form');
        
        
        let id = document.getElementById(this.empleado.id)
        id.append(formulario)
        
        
        //let botonformulario = event.currentTarget;
        //botonformulario.append(formulario);
        //botonformulario.setAttribute('disabel', "")

        //let controles = document.querySelector('')

       

        formulario.elements.nombre.value = this.empleado.nombre;
        formulario.elements.apellidos.value = this.empleado.apellidos;
        formulario.elements.nif.value = this.empleado.nif;
        formulario.elements.edad.value = this.empleado.edad;
        formulario.elements.puesto.value = this.empleado.puesto;
        formulario.elements.salario.value = this.empleado.salario;
        formulario.elements.antigüedad.value = this.empleado.antiguedad;

        let botonCancelar = document.querySelector('button.cancelar');

        let cancelar = new FormCancelHandle();
        botonCancelar.addEventListener('click', cancelar)
        let enviar = new actualizarEmpleado();
        enviar.empleado = this.empleado;
        formulario.addEventListener('submit',enviar)

    }


}


function actualizarEmpleado()
{
    
    this.handleEvent = function(event)
    {
    console.log("actualizado")
    event.preventDefault()
    let formulario = event.currentTarget;

    let nombre = formulario.elements.nombre.value;
    let apellidos = formulario.elements.nombre.value;
    let nif = formulario.elements.nif.value;
    let edad = formulario.elements.edad.value;
    let puesto = formulario.elements.puesto.value;
    let salario = formulario.elements.salario.value;
    let antiguedad = formulario.elements.antigüedad.value;

    this.empleado.cambiarnombre(nombre)
    this.empleado.cambiarapellidos(apellidos)
    this.empleado.cambiarnif(nif)
    this.empleado.cambiaredad(edad)
    this.empleado.cambiarpuesto(puesto)
    this.empleado.cambiarsalario(salario)
    this.empleado.cambiarantiguedad(antiguedad)

    
    repintar()
    }

    

}
function BorrarHandle(empleado)
{
    this.handleEvent = function(event)
    {
        event.preventDefault();

        let index = empleados.findIndex(emp => emp.id === empleado.id)
        empleados.splice(index,1);
        repintar();
    }
}

function FormCancelHandle(event)
{
    this.handleEvent = function(event)
    {
        event.preventDefault();

        event.currentTarget.parentNode.remove();

        repintar();
    }

}

function FormSubmitHandle()
{
    this.handleEvent = function(event)
    {
        event.preventDefault();
        let formulario = event.currentTarget
        
        let nombre = formulario.elements.nombre.value;
        let apellidos = formulario.elements.nombre.value;
        let nif = formulario.elements.nif.value;
        let edad = formulario.elements.edad.value;
        let puesto = formulario.elements.puesto.value;
        let salario = formulario.elements.salario.value;
        let antiguedad = formulario.elements.antigüedad.value;

        anyadirEmpleado(new Empleado(nombre,apellidos,nif,edad,puesto,salario,antiguedad));

        repintar()
    }
}

function nuevoEmpleadoWebFormulario()
{
        let plantillaFormulario = document.getElementById('formulario-template').content.cloneNode(true);
        var formulario = plantillaFormulario.querySelector('form');
        
        let controles = document.getElementById('controlesprincipales')
        controles.append(formulario)

        let botonCancelar = document.querySelector('button.cancelar');
        botonCancelar.addEventListener('click',new FormCancelHandle())
        formulario.addEventListener('submit',new FormSubmitHandle())
    
}

let botonNuevoEmpleadoForm = document.getElementById('anyadeEmpleForm');
botonNuevoEmpleadoForm.addEventListener('click', function () { nuevoEmpleadoWebFormulario() })
