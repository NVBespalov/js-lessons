import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

const myCustomValidator = (letters) => (control) => {
  return control.value.indexOf(letters) > - 1 ? null : {customValidator: { letters, actual: control.value }}
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-lessons';
  form = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [])
  })
  submit() {
    debugger
  };
}
