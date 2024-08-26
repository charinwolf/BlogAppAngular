import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PostComponent } from 'src/app/components/post/post.component'; 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  posts: any[] = [];

  constructor(
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.fetchPosts()
  }

  fetchPosts(){
    this.http.get<any[]>('http://localhost:4000/post/')
    .subscribe(posts => {
      this.posts = posts
    })
  }
}
