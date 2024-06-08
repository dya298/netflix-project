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
  email!: string;
  password!: string;
  submitted = false;

  formGroup: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  _loginService = inject(LoginService);
  _router = inject(Router);

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
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
    if (this._loginService.IsLoggedIn) {
      this._router.navigateByUrl('/netflix');
    }
  }

  onSubmit() {
    this.submitted = true;

    if (this.formGroup.invalid) {
      return;
    }

    this._loginService.LoginUser(this.email, this.password);

    this._router.navigateByUrl('/netflix');
  }

  get f(): { [key: string]: AbstractControl } {
    return this.formGroup.controls;
  }
}
