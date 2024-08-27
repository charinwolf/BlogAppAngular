import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {
  @Input() _id!:string;
  @Input() title!:string;
  @Input() summary!:string;
  @Input() cover!:string;
  @Input() content!:string;
  @Input() createdAt!:string;
  @Input() author!: {username: string};

  get formattedDate(): string {
    if(!this.createdAt){
      return "Date Not Avaliable"
    }
    try {
      return new Date(this.createdAt).toLocaleDateString('en-US',{
        year:'numeric',
        month:'short',
        day:'2-digit',
        hour:'2-digit',
        minute:'2-digit'
      })
    } catch (error) {
     console.error('Error Formating Date', error)
     return 'Invalid Date' 
    }
  }

}
