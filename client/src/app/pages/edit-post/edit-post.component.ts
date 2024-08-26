import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements	OnInit{
  title: string = '';
  summary: string = '';
  content: string = '';
  files: FileList | null = null;
  id: string= '';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
  ){}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.http.get(`http://localhost:4000/post/${this.id}`)
    .subscribe((postInfo: any) => {
      this.title = postInfo.title;
      this.summary = postInfo.summary;
      this.content = postInfo.content
    });
  }

  onFileChange(event: any){
    this.files = event.target.files
  }

  async updatePost(){
    const data = new FormData();
    data.append('title', this.title);
    data.append('summary', this.summary);
    data.append('content', this.content);
    data.append('id', this.id);
    if (this.files && this.files.length > 0){
      data.append('file', this.files[0])
    }

    const response = await this.http.put('http://localhost:4000/post', data, {withCredentials: true}).toPromise();

    if (response) {
      this.router.navigate([`/post/${this.id}`])
    }
  }

}
