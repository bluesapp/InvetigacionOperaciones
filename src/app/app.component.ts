import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { datos } from './models/datos.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // title = 'finalprojectIO';/
  datos = {} as datos;
  mostrarMatriz: boolean = false;
  arrayColumnas: Array<number> = [];
  arrayFilas: Array<number> = [];
  numeroRandom: Array<number> = [];

  arrayRandom: any[] = [];

  // obj: any[] = [
  //   { 1: 255, 2: 685, 3: 483 },
  //   { 1: 982, 2: 159, 3: 753 },
  //   { 1: 951, 2: 632, 3: 478 },
  //   { 1: 746, 2: 851, 3: 118 }
  // ]



  ngOnInit() {
    this.datos.columnas = 3;
    this.datos.filas = 5;
    this.datos.rangoMin = 1;
    this.datos.rangoMax = 99;
  }

  ejecutar(f: NgForm) {

    this.arrayColumnas = [];
    this.arrayFilas = [];

    console.log(this.arrayColumnas);
    console.log(this.arrayFilas);



    this.mostrarMatriz = true;

    for (let index = 1; index <= f.value.filas; index++) {
      this.arrayFilas.push(index);
    }

    for (let index = 1; index <= f.value.columnas; index++) {
      this.arrayColumnas.push(index);
      let obj = {}

      for (let index = 1; index <= this.arrayFilas.length; index++) {

        let first = index;
        obj[first] = this.getRandom(f.value.rangoMin, f.value.rangoMax);
      }

      this.arrayRandom.push(obj)
    }

    this.datos = {} as datos;


    console.log(this.arrayRandom);

  };


  getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

}


