import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  template: `
    <form>
      <div class="form-group">
        <input
          appEmailValidtor
          type="email"
          class="form-control"
          name="email"
          placeholder="Enter your email"
          required
          [(ngModel)]="email"
          #userEmail="ngModel"
          appHover
          appHover="yellow"
        />
        <h5>{{ userEmail.errors | json }}</h5>
      </div>
      <div class="form-group">
        <!-- <input
          type="password"
          class="form-control"
          name="password"
          placeholder="Enter your password"
          required
          [(ngModel)]="password"
          #userPassword="ngModel"
          appHover
          color="lightblue"
        /> -->
        <!-- OR  -->

        <input
          type="password"
          class="form-control"
          name="password"
          placeholder="Enter your password"
          required
          [(ngModel)]="password"
          #userPassword="ngModel"
          appHover="lightblue"
        />
      </div>
      <div>
        <button class="btn btn-primary" (click)="login()" appRedElement>
          Login
        </button>
      </div>
    </form>
  `,
  styles: [],
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  constructor(private router: Router, private loginService: LoginService) {}

  ngOnInit(): void {}

  login() {
    // if (this.email === 'admin@gmail.com' && this.password === 'admin') {
    //   // alert('Login Successfully!');
    //   // this.router.navigate(['/user', 'add']);
    //   // OR
    //   this.router.navigateByUrl('/user/add');
    // } else {
    //   alert('Invalid Credentials!');
    // }

    if (this.loginService.login(this.email, this.password)) {
      this.router.navigate(['/']);
    }
  }
}
