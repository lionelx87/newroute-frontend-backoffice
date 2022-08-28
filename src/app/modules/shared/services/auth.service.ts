import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = null;

  constructor(private http: HttpClient, private router: Router) { }

  isLogin() {
    return this.user !== null;
  }

  login(user: any) {
    return this.http.post(environment.backend + '/login-creators', user)
    .pipe(
      map(
        (user: any) => {
          this.user = user;    
          this.router.navigate(['/dashboard']);
          // storage
          return user;
        }
      ),
      catchError( (err) =>  {
        return throwError(err.error);
      })
    );
  }

}
