import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Auth } from '../interfaces/auth.interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL: string = environment.baseURL;
  private _auth: Auth | undefined;

  constructor(private http: HttpClient) { }

  login(): Observable<Auth> {
    return this.http.get<Auth>(`${this.URL}/usuarios/1`)
               .pipe(
                // El tap genera efectos secundarios
                tap(auth => this._auth = auth), //Aqui lleno la data del objeto emitido por el observable
                tap( auth => localStorage.setItem('id', auth.id))
               )
  }

  logout() {
    this._auth = undefined;
  }

  get username(): Auth {
    return {...this._auth!}; // Devuelvo el objeto y rompo la referencia. El ! es porque se que no de volver'a undefined
  }

}
