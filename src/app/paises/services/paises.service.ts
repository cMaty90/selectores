import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PaisPorCodigo } from '../interfaces/pais-porcodigo.interface';
import { PaisSmall } from '../interfaces/paises.interface';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  private _baseUrl:string='https://restcountries.com/v3.1'
  private _regiones: string[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];


  constructor(private http:HttpClient) { }

  get regiones() {
    return [... this._regiones];
  }

  getPaisesPorRegion(region: string): Observable<PaisSmall[]> {
    return this.http.get<PaisSmall[]>(`${this._baseUrl}/region/${region}/?fields=name,cca3`);
  }


  getPaisPorCodigo(codigo: string): Observable<PaisPorCodigo | null>  {

    if (!codigo) {
      return of(null);
    }

    const url = `${this._baseUrl}/alpha/${codigo}`;
    return this.http.get<PaisPorCodigo>(url);
  }


}
