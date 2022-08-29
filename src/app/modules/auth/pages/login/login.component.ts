import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/modules/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  error: string = '';
  loading: boolean = false;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  constructor(private auth: AuthService) {}

  get isInvalid() {
    return this.loginForm.invalid;
  }

  ngOnInit(): void {}

  login() {
    if (this.loginForm.valid) {
      this.error = '';
      this.loading = true;
      this.auth.login(this.loginForm.value).subscribe(
        (resp) => {
          console.log(resp);
        },
        (err: HttpErrorResponse) => {
          this.error =
            err.status === 401
              ? 'Usuario/Contraseña incorrecta'
              : 'Error en el Servidor';
          this.loading = false;
        },
        () => (this.loading = false)
      );
    }
  }
}
