import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.css']
})
export class PostPageComponent implements OnInit {
  postInfo: any = null;
  userInfo: any;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.userInfo = this.userService.getUserInfo;
    
    this.http.get(`http://localhost:4000/post/${id}`)
    .subscribe({
      next: (data) => {
        this.postInfo = data;
      },
      error: (error) => {
        console.log('Error Fetching postInfo', error)
      }
    })
  }


}
