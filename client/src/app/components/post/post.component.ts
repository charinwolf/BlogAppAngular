import { Component, Input } from '@angular/core';
import { format } from 'date-fns';

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
    return format( new Date(this.createdAt), 'MMM d, yyyy, HH:mm' );
  }

}
