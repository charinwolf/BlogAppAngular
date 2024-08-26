import { Component, Input, Output, EventEmitter } from '@angular/core';
import Quill from 'quill';


@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent {
  @Input() value: string = '';
  @Output() valueChange = new EventEmitter<string>();
  
  quillModules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ]
  };

  onContentChanged(event: any){
    this.valueChange.emit(event.html)
  }
}
