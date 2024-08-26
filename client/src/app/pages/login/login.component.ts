import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  redirect: boolean = false;

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private router: Router,
  ) {}

  login() {
    this.http.post('http://localhost:4000/login', 
      { username: this.username, password: this.password }, {withCredentials: true})
      .subscribe(response => {
        this.userService.setUserInfo(response);
        this.redirect = true;
        this.router.navigate([ '/' ]);
      }, error => {
        alert('Wrong Credentials');
      });
  }

}









