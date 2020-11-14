import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { datos } from './models/datos.model';
import { TipoDatos } from './models/tipodatos.models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
  // title = 'finalprojectIO';/
  datos = {} as datos;
  td = {} as TipoDatos;
  mostrarMatriz: boolean = false;
  arrayColumnas: Array<number> = [];
  arrayFilas: Array<number> = [];
  numeroRandom: Array<number> = [];

  marrayRandom: any[] = [];
  // arrayLagrnage: any[] = [];
  array1: any[] = [];
  resultadoLagrange: number = 1;
  maximoLagrange: number;
  filaLagrange: number;

  /**** */
  filas = [];
  columnas = [];

  fila2 = [1, 2, 3];
  columna2 = [1, 2, 3, 4, 5, 6]

  ngOnInit() {

    this.datos.columnas = 3;
    this.datos.filas = 4;
    this.datos.rangoMin = 1;
    this.datos.rangoMax = 100;
    this.datos.coeficiente = 0.5;
    this.datos.manual = false;
    this.maximoLagrange = 1;
    this.td.arrayRandom = [];
    this.td.arrayManual = [];
    this.marrayRandom = [];
  }

  ejecutarRandom(f: NgForm) {

      console.log();
      
    if (f.value.manual) {
      
    } else {
      
    }

    this.resultadoLagrange = f.value.columnas;
    let nColumnas = 1 / f.value.columnas;

    this.arrayColumnas = [];
    this.arrayFilas = [];



    for (let index = 1; index <= f.value.filas; index++) {
      this.arrayFilas.push(index);
    }

    for (let index = 1; index <= f.value.columnas; index++) {
      this.arrayColumnas.push(index);
      let obj = {}

      for (let index = 1; index <= this.arrayFilas.length; index++) {

        obj[index] = this.getRandom(f.value.rangoMin, f.value.rangoMax);
      }

      this.td.arrayRandom.push(obj)

    }




    this.td.arrayLagrnage = [...this.td.arrayRandom]
    this.metotodoLagrange(this.td.arrayLagrnage, nColumnas);
    this.mostrarMatriz = true;

  };


  ejecutarModelos(g: NgForm) {
    // console.log(g)
  }

  metotodoLagrange(arrRan, nCol) {

    const sumaObject = arrRan.reduce((a, b) => {

      for (const key in b) {
        if (b.hasOwnProperty(key))
          a[key] = parseFloat(((a[key] || 0) + b[key] * nCol).toFixed(2));
      }
      return a;
    }, {});


    this.array1 = Object.values(sumaObject)
    this.maximoLagrange = Math.max(...this.array1)
    this.filaLagrange = this.array1.indexOf(this.maximoLagrange) + 1;
    this.td.arrayLagrnage.push(sumaObject)
  }

  metodoPesimista(arrayData){

    

  }


  getRandom(min, max) {
    // console.log(0.003 * (max - min) + min);

    return Math.floor(Math.random() * (max - min) + min);
  }

  reacargarPagina() {
    // location.reload(true)
    location.reload()
  }



  prueba(h: NgForm) {
    let manual = Object.values(h);


    console.log(manual);
    let contador =  0;

    for (let index = 1; index <= this.arrayColumnas.length; index++) {
      let obj = {}
      
      for (let index = 1; index <= this.arrayFilas.length; index++) {

        obj[index] = manual[contador];
        contador ++
      }

      this.td.arrayManual.push(obj)

    }

    
  }
}
