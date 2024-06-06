import { Component, inject } from '@angular/core';
import { BG_IMAGE_URL } from '../../constants/config';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  bgImgUrl = BG_IMAGE_URL;

  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  submitted = false;

  email!: string;
  password!: string;

  LoginService = inject(LoginService);
  Router = inject(Router);
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(40),
        ],
      ],
    });
    if (this.LoginService.isLoggedIn) {
      this.Router.navigateByUrl('/browse');
    }
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.LoginService.LoginUser(this.email, this.password);
    this.Router.navigateByUrl('/browse');
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
}
