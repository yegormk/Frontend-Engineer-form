import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms'

import { EmailAsyncValidatorService } from './email-async-validator.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public checkForUniqueEmail: EmailAsyncValidatorService){

  }

  listVersions = {       
    angular: ['1.1.1', '1.2.1', '1.3.3'],
    react: ['2.1.2', '3.2.4', '4.3.1'],
    vue: ['3.3.1', '5.2.1', '5.1.3'],
  }

  minDate = new Date(new Date().getFullYear() - 115, 0, 1);
  maxDate = new Date(new Date().getFullYear() + 1, 11, 31);
  frameworkVersionsArr = ['']

  registerForm = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
    ]),
    lastName: new FormControl('',[
      Validators.required,
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
    email: new FormControl('', {
      validators: [
        Validators.required,
        Validators.email,
      ],
      asyncValidators: [
        this.checkForUniqueEmail.emailUniqueValidator(),
      ],
      updateOn: 'blur'
    }),
    hobbies: new FormArray(
      [new FormGroup({
        name: new FormControl('', Validators.required),
        duration: new FormControl('', Validators.required),
      })
    ])
  })

  gettingVersions(val: string[]){
    this.frameworkVersionsArr = val;
  }

  addInputControl(): void{
    this.registerForm.controls.hobbies.push(new FormGroup({
      name: new FormControl('', Validators.required),
      duration: new FormControl('', Validators.required)
    }))
  }

  removeInputControl(idx:number): void{
    this.registerForm.controls.hobbies.removeAt(idx);
  }

  onSubmit(): void{
    if(this.registerForm.valid){
      console.log(this.registerForm.value);
    }
  }
}
