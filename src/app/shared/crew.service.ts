import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Crew } from '../model/crew';
import { ProductCrew } from '../model/product-crew';

@Injectable({
  providedIn: 'root'
})
export class CrewService {

  constructor(private http: HttpClient) { }

  updateTimeCrew(crewid: number, time: number){
    return this.http.put<any>("http://localhost:8080/crewPlayerTime/" + crewid + "/" + time, time);
  }

  getProductCrew(crewid: number):  Observable<ProductCrew[]>{
    return this.http.get<ProductCrew[]>("http://localhost:8080/productCrew/" + crewid);  
  }
}
