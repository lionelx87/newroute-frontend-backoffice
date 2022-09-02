import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Spot } from 'src/app/models/spot.interface';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SpotService {

  constructor(private http: HttpClient, private auth: AuthService) { }

  getSpots() {
    const params = new HttpParams().set("lang", "es");
    return this.http.get<Spot[]>( environment.backend + '/spots', { params } );
  }

  spotDelete(id: number) {    
    return this.http.delete(
      environment.backend + '/spots/' + id,
      { headers: new HttpHeaders().append('Authorization', `Bearer ${this.auth.user}`)
    });
  }


}
