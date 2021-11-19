import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Star } from '../model/star';

@Injectable({
  providedIn: 'root'
})
export class StarService {

  constructor(private http: HttpClient) { }

  findStar(id: number): Observable<Star>{
    return this.http.get<Star>("http://localhost:8080/star/" + id,{
      withCredentials: true
    });
  }
  findAll(): Observable<Star[]> {
   return this.http.get<Star[]>("http://localhost:8080/stars", {
    withCredentials: true
   });
  }
}
