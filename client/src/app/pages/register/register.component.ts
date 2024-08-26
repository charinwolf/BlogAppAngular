import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router' 

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  password: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  register(){
    this.http.post('http://localhost:4000/register', 
      {username: this.username, password: this.password})
    .subscribe({
      next:(response) => {
        alert('Registration Successful')
        this.router.navigate(['/login'])
      },
      error:(error) => {
        alert('registration Failed')
        console.log('Error during registration: ', error)
      } 
    })  
  }
}



