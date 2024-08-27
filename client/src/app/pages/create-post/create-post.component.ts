import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent {
  title: string = '';
  summary: string = '';
  content: string = '';
  files: FileList | null = null;
  isFormValid: boolean = false

  constructor(
    private http: HttpClient,
    private router: Router,
  ){}

  onFileChange(event: any) {
    this.files = event.target.files;
    this.validateForm();
  }

  validateForm(){
    this.isFormValid = 
    this.title.trim() !== '' && 
    this.summary.trim() !== '' && 
    this.content.trim() !== '' &&
    (this.files ? this.files.length > 0: false)
    } 


  async newPost() {
    const data = new FormData();
    data.append('title', this.title)
    data.append('summary', this.summary)
    data.append('content', this.content)
    if(this.files && this.files.length > 0) {
      data.append('file', this.files[0])
    }
    const response = await this.http.post('http://localhost:4000/post', data, {withCredentials: true}).toPromise();

    if (response) {
      this.router.navigate(['/'])
    }
  }

}
