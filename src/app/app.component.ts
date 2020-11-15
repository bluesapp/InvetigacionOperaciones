import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { element } from 'protractor';
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
  mostrarManual: boolean = false;
  mostrarMetodo: boolean = false;
  arrayColumnas: Array<number> = [];
  arrayFilas: Array<number> = [];
  numeroRandom: Array<number> = [];

  marrayRandom: any[] = [];
  // arrayLagrnage: any[] = [];
  array1: any[] = [];
  resultadoLagrange: number = 1;
  maximoLagrange: number;
  filaLagrange: number;
  nColumnas: number;

  // Pesimista

  maximoPesimista: number = 0;
  filasPesimista: number = 0;

  // Optimista

  maximoOptimista: number = 0;
  filasOptimista: number = 0;

  //Hawicz
  arrayNumMax: any[] = []
  arrayNumMin: any[] = []

  /**** */
  // filas = [];
  // columnas = [];


  ngOnInit() {

    this.datos.columnas = 3;
    this.datos.filas = 4;
    this.datos.rangoMin = 1;
    this.datos.rangoMax = 100;
    this.datos.coeficiente = 0.5;
    this.datos.manual = false;
    this.maximoLagrange = 1;
    this.td.arrayDatos = [];
    this.marrayRandom = [];
  }

  ejecutarRandom(f: NgForm) {

    this.resultadoLagrange = f.value.columnas;
    this.nColumnas = 1 / f.value.columnas;
    this.datos.coeficiente = f.value.coeficiente;

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

      this.td.arrayDatos.push(obj);

    }
    //Lagrange
    this.td.arrayLagrnage = [...this.td.arrayDatos]
    this.metotodoLagrange(this.td.arrayLagrnage, this.nColumnas);

    //Pesimista
    this.td.arrayPesimista = [...this.td.arrayDatos];
    this.metodoPesimista(this.td.arrayPesimista);

    //Optimista
    this.td.arrayOptimista = [...this.td.arrayDatos];
    this.metodoOptimista(this.td.arrayOptimista);

    //Hurwicz
    this.td.arrayHurwicz = [...this.td.arrayDatos];
    this.metodoHurwicz(this.td.arrayHurwicz, this.datos.coeficiente);


    if (f.value.manual) {
      this.mostrarManual = true;
    } else {

      this.mostrarMatriz = true;
      this.mostrarMetodo = true;
    }

  };

  ejecutarManual(h: NgForm) {
    this.datos.manual = true;
    this.td.arrayDatos = [...[]]

    let manual = Object.values(h);
    let contador = 0;

    for (let index = 1; index <= this.arrayColumnas.length; index++) {
      let obj = {}

      for (let index = 1; index <= this.arrayFilas.length; index++) {

        obj[index] = manual[contador];
        contador++
      }

      this.td.arrayDatos.push(obj)
    }
    // console.log(this.td.arrayDatos);

    this.td.arrayLagrnage = [...this.td.arrayDatos]

    this.metotodoLagrange(this.td.arrayDatos, this.nColumnas);
    this.mostrarMetodo = true;


  }

  metotodoLagrange(arrayData, nCol) {

    const sumaObject = arrayData.reduce((a, b) => {

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
    // console.log(this.td.arrayLagrnage);

  }

  metodoPesimista(arrayDataPesimista) {

    let minCols = {}
    let fila = []
    arrayDataPesimista.map((c, i) => {
      fila = Object.values(c)
      let min = Math.min(...fila)
      arrayDataPesimista[i]['min'] = min;
      for (let x = 0; x < fila.length; x++) {
        if (!minCols[(x + 1).toString()] || fila[x] < minCols[(x + 1).toString()]) minCols[(x + 1).toString()] = fila[x];
      }
    })

    let menor = []
    menor = Object.values(minCols);
    this.maximoPesimista = Math.max(...menor);
    this.filasPesimista = menor.indexOf(this.maximoPesimista) + 1;
    this.arrayNumMin = menor;


    arrayDataPesimista.push(minCols);
    // console.log(arrayDataPesimista);
    // this.td.arrayPesimista = arrayDataPesimista
  }


  metodoOptimista(arrayData) {

    let maxCols = {}
    let fila = []
    arrayData.map((c, i) => {
      fila = Object.values(c)
      let max = Math.max(...fila)
      arrayData[i]['max'] = max;
      for (let x = 0; x < fila.length; x++) {
        if (!maxCols[(x + 1).toString()] || fila[x] > maxCols[(x + 1).toString()]) maxCols[(x + 1).toString()] = fila[x];
      }
    })

    arrayData.push(maxCols);
    this.td.arrayOptimista = arrayData;
    console.log(this.td.arrayOptimista);
    
    let mayor = []
    mayor = Object.values(maxCols);
    this.maximoOptimista = Math.max(...mayor);
    this.filasOptimista = mayor.indexOf(this.maximoOptimista) + 1;
    this.arrayNumMax = mayor;
  }

  metodoHurwicz(arrayH, coe) {


    this.arrayNumMax.pop();


    let NunMax = this.arrayNumMax;
    let NunMin = this.arrayNumMin;

    let obj = {};

    for (let i = 0; i < NunMax.length; i++) {

      obj[i+1] = parseFloat(((NunMax[i] * coe) + (NunMin[i] * (-1 * coe))).toFixed(2));
    }



    arrayH.push(obj);

    this.td.arrayHurwicz = arrayH;

    console.log(this.td.arrayHurwicz);
  }


  getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  reacargarPagina() {
    location.reload()
  }

}






