import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  login() {
    this.authService.login()
      .subscribe({
        next: data => {
          {console.log(data);
          data.id ? this.router.navigate(['/heroes']) : this.router.navigate(['/auth']);}
        },
        error: () => this.router.navigate(['/auth'])
      })
  }

  ingresarSinLogin() {
    this.router.navigate(['/heroes']);
  }

}
