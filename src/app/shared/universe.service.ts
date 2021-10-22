import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Star } from '../model/star';
import { Universe } from '../model/universe';

@Injectable({
  providedIn: 'root'
})
export class UniverseService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<Universe[]> {
    return this.http.get<Universe[]>("http://localhost:8080/universe/");
  }
}
