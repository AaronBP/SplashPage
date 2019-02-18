import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormGroup, FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!(control && control.touched && control.parent.hasError('notEqual'));
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {
  formGroup: FormGroup;
  matcher = new MyErrorStateMatcher();
  creatingAccount = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.setupForm();
  }

  setupForm() {
    this.formGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl()
    }, this.checkPasswords );
  }

  onSubmit() {
    if (this.formGroup.valid) {
      this.creatingAccount = true;
      this.authService.register(this.formGroup.value.email, this.formGroup.value.password).then(() => {
        this.creatingAccount = false;
      });
    }
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    const password = group.controls.password.value;
    const confirmPassword = group.controls.confirmPassword.value;
    return password === confirmPassword ? null : { notEqual: true };
  }

}
