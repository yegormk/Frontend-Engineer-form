import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  listVersions = {       
    angular: ['1.1.1', '1.2.1', '1.3.3'],
    react: ['2.1.2', '3.2.4', '4.3.1'],
    vue: ['3.3.1', '5.2.1', '5.1.3'],
  }

  hobbiesList: string[] = [
    'Hiking', 
    'Biking', 
    'Gym', 
    'Photography', 
    'Swimming', 
    'Books'
  ];
  
  minDate = new Date(new Date().getFullYear() - 115, 0, 1);
  maxDate = new Date(new Date().getFullYear() + 1, 11, 31);

  registerForm = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(15),
    ]),
    lastName: new FormControl('',[
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    dateOfBirth: new FormControl('', [
      Validators.required,
    ]),
    framework: new FormControl('', [
      Validators.required,
    ]),
    frameworkVersion: new FormControl('', [
      Validators.required,
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    hobbies: new FormControl('', [
      Validators.required
    ]),
  })

  onSubmit(){
    console.log(this.registerForm.value);
    console.log(this.registerForm.controls.framework.value);
  }
}
