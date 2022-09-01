import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Spot } from 'src/app/models/spot.interface';

@Injectable({
  providedIn: 'root'
})
export class SpotService {

  constructor(private http: HttpClient) { }

  getSpots() {
    const params = new HttpParams().set("lang", "es");
    return this.http.get<Spot[]>( environment.backend + '/spots', { params } );
  }


}
