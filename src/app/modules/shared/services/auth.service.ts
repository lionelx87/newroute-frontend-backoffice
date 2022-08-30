import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { catchError, map, throwError } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = null;

  constructor(private http: HttpClient, private router: Router, private storageService: StorageService) { 
    this.init();
  }

  async init() {
    this.user = await this.storageService.getItem('user');
  }

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
          this.storageService.setItem(this.user);
          return user;
        }
      ),
      catchError( (err) =>  {
        return throwError(err.error);
      })
    );
  }

  async logout() {
    await this.storageService.setItem(null);
    this.user = null;
    this.router.navigate(['login']);
  }

}
