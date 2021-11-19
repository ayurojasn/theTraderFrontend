import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Planet } from '../model/planet';

@Injectable({
  providedIn: 'root'
})
export class PlanetsService {

  constructor(private http: HttpClient) { }

  findPlanet(id: number): Observable<Planet>{
    return this.http.get<Planet>("http://localhost:8080/planet/" + id,{
      withCredentials: true
    });
  }
}
