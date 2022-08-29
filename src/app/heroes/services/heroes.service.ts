import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Heroe } from '../interfaces/heroes.interface';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private _baseURL = environment.baseURL;

  constructor( private http: HttpClient ) { }

  getHeroes(): Observable<Heroe[]> {
    const URL = `${this._baseURL}/heroes`;
    return this.http.get<Heroe[]>(URL);
  }

  getHeroeById(id: string): Observable<Heroe> {
    const URL = `${this._baseURL}/heroes/${id}`;
    return this.http.get<Heroe>(URL);
  }

  getSugerencias(termino: string): Observable<Heroe[]> {
    const URL = `${this._baseURL}/heroes/?q=${termino}&_limit=6`;
    return this.http.get<Heroe[]>(URL);
  }

  postAgregarHeroe(heroe: Heroe): Observable<Heroe>{
    const URL = `${this._baseURL}/heroes`;
    return this.http.post<Heroe>(URL, heroe)
  }
}
