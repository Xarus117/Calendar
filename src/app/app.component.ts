import { Component } from '@angular/core';

class mes {

  nombre: string;
  dia: number;
  diaInicio: number;
  arrayDias: any[];
  arrayDiasLibres: any[] = [];
  arrayfiestaRegional: number[];
  arrayfiestaLocal: number[];
  arrayfiestaNacional: number[];
  arrayfiestaCentro: number[];
  arrayTotal: number[] = [];


  constructor(nombre: string, dia: number, diaInicio: number, afr: number[], afl: number[], afn: number[], afc: number[]) {
    this.nombre = nombre;
    this.dia = dia;
    this.arrayDias = [];
    this.diaInicio = diaInicio;
    this.arrayfiestaRegional = afr;
    this.arrayfiestaLocal = afl;
    this.arrayfiestaNacional = afn;
    this.arrayfiestaCentro = afc;
  }


  fiestaRegional(): number[] {
    return this.arrayfiestaRegional
  }

  fiestaLocal(): number[] {
    return this.arrayfiestaLocal
  }

  fiestaNacional(): number[] {
    return this.arrayfiestaNacional
  }

  fiestaCentro(): number[] {
    return this.arrayfiestaCentro
  }

  totalFiestas(): void {
    for (let i = 0; i < this.arrayfiestaRegional.length; i++) {
      this.arrayTotal.push(this.arrayfiestaRegional[i]);
    }
    for (let i = 0; i < this.arrayfiestaLocal.length; i++) {
      this.arrayTotal.push(this.arrayfiestaLocal[i]);
    }
    for (let i = 0; i < this.arrayfiestaNacional.length; i++) {
      this.arrayTotal.push(this.arrayfiestaNacional[i]);
    }
    for (let i = 0; i < this.arrayfiestaCentro.length; i++) {
      this.arrayTotal.push(this.arrayfiestaCentro[i]);
    }
  }
  llenarArray(): number[] {
    this.totalFiestas();

    for (let i = 1; i < this.diaInicio; i++) {
      this.arrayDias.push(null);
    }

    for (let i = 1; i < this.dia + 1; i++) {
      this.arrayDias.push(i)
    }
    return this.arrayDias
  }
  llenarArrayLibre(): number[] {

    for (let i = 1; i < this.diaInicio; i++) {
      this.arrayDiasLibres.push(null);
    }

    let pasar = true;

    for (let i = 1; i < this.dia + 1; i++) {
      for (let j = 0; j < this.arrayTotal.length; j++) {
        if (this.arrayTotal[j] == i) {
          pasar = false
        }
      }
      if (pasar) {
        this.arrayDiasLibres.push(i)
      }
      else {
        pasar = true;
      }

    }
    return this.arrayDiasLibres
  }
}


let septiembre = new mes("Septiembre", 30, 4, [11], [29], [], []);
let octubre = new mes("Octubre", 31, 6, [], [], [12], [31]);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'calendario';

  Objetos: mes[] = [septiembre, octubre]
  DiasSemana: string[] = ["L", "M", "X", "J", "V", "S", "D"];
  FiestaRegional: number[][] = [];
  FiestaLocal: number[][] = [];
  FiestaNacional: number[][] = [];
  FiestaCentro: number[][] = [];
  nombres: string[] = [];
  meses: any[] = [];
  mesesLibres: any[] = [];


  bucleObjetos(): void {
    for (let i = 0; i < this.Objetos.length; i++) {
      this.FiestaRegional.push(this.Objetos[i].fiestaRegional());
      this.FiestaLocal.push(this.Objetos[i].fiestaLocal());
      this.FiestaNacional.push(this.Objetos[i].fiestaNacional());
      this.FiestaCentro.push(this.Objetos[i].fiestaCentro());
      this.nombres.push(this.Objetos[i].nombre);
      this.meses.push(this.Objetos[i].llenarArray());
      this.mesesLibres.push(this.Objetos[i].llenarArrayLibre());
    }
  }

  resultado = this.bucleObjetos();


}
