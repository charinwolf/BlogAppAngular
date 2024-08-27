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
    private router: Router
  ) {}

  ngOnInit(): void {
    this.http.get('http://localhost:4000/profile', { withCredentials: true })
    .subscribe(( userInfo: any ) => {
      this.userService.setUserInfo(userInfo);
      this.userInfo = userInfo || null
    })

    const id = this.route.snapshot.paramMap.get('id');    
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

  deletePost(): void {
    if(confirm('Are you sure you want to delete this post?')) {
      const id = this.postInfo._id;
      this.http.delete(`http://localhost:4000/post/${id}`, {withCredentials: true})
      .subscribe({
        next: () => {
          alert('Post deleted Successfully');
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.log('error delecting post', error);
          alert('Failed to delete the post');
        }       
      });
    }
  }


}
