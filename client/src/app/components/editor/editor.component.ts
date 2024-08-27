import { Component, Input, Output, EventEmitter } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent {
  @Input() value: string = '';
  @Output() valueChange = new EventEmitter<string>();

  public Editor = ClassicEditor.default;

  onChange({ editor }: any) {
    const data = editor.getData();
    this.valueChange.emit(data);
  }
}
