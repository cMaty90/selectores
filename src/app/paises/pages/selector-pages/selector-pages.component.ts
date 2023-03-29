import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap, tap } from 'rxjs';

import { PaisSmall } from '../../interfaces/paises.interface';
import { PaisesService } from '../../services/paises.service';



@Component({
  selector: 'app-selector-pages',
  templateUrl: './selector-pages.component.html',
  styleUrls: ['./selector-pages.component.css']
})
export class SelectorPagesComponent  implements OnInit{

  miFormualrio: FormGroup = this.formBuilder.group({
    region: ['', [Validators.required]],
    pais: ['', [Validators.required]],
    frontera: ['', [Validators.required]],
  })

  regiones  : string[]=[];
  paises    : PaisSmall[]=[];
  fronteras: string[] = [];

  constructor(private formBuilder: FormBuilder,
    private paisesService: PaisesService) { }


  ngOnInit(): void {
    this.regiones = this.paisesService.regiones;

    //cuando cambie la region
    this.miFormualrio.get('region')?.valueChanges
      .pipe(
        tap((_) => {
          this.miFormualrio.get('pais')?.reset('');
        }),
        switchMap(region => this.paisesService.getPaisesPorRegion(region))
      )
      .subscribe(paises => {
        console.log('mis paises')
        console.log(paises);
        this.paises = paises;
      });

    //cuando cambia el pais
    this.miFormualrio.get('pais')?.valueChanges
      .pipe(
        switchMap(codigo => this.paisesService.getPaisPorCodigo(codigo))
      )
      .subscribe(pais => {
        if (pais!==null) {
          console.log('mi info pais')
          console.log(pais);

          console.log('borders');
          console.log(pais?.borders);

        }

      })


  }







}
