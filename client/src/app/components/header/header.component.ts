import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  username: string | null = null;

  constructor(
    private userService: UserService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.http.get('http://localhost:4000/profile', { withCredentials: true })
    .subscribe(( userInfo: any ) => {
      this.userService.setUserInfo(userInfo);
      this.username = userInfo?.username || null
    })
  }

  logout(): void {
    this.http.post('http://localhost:4000/logout', {}, { withCredentials: true })
    .subscribe(() => {
      this.userService.setUserInfo(null);
      this.username = null;
      this.router.navigate([ '/' ]);
    })
  }

}












