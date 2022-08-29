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
                tap(auth => this._auth = auth)
               )
  }

  get username(): Auth {
    return {...this._auth!};
  }

}
