import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor( private authService: AuthService){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // entra si existe un usuario
    if (this.authService.username.id){
      return true;
    }
    console.log('bloqueado por canActivate');
  return false;
  }
  // solo sirve para restringuir la carga de modulos
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
      
      // entra si existe un usuario
      if (this.authService.username.id){
        return true;
      }
      console.log('bloqueado por canLoad');
    return false;
  }
}
