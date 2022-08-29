import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from 'src/app/auth/interfaces/auth.interfaces';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [`
    .container {
      margin: 10px;
      padding: 1em;
    }
  `]
})
export class HomeComponent implements OnInit {

  constructor( private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  get auth() {
    return this.authService.username;
  }

  logout() { //Aqui debo de eliminar el item del localStorage
    this.authService.logout(); 
    this.router.navigate(['./auth'])
  }

}
