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
    console.log("entre a updateTimeCrew");
    return this.http.put<any>("http://localhost:8080/crewPlayerTime/" + crewid + "/" + time, time);
  }

  getProductCrew(crewid: number):  Observable<ProductCrew[]>{
    return this.http.get<ProductCrew[]>("http://localhost:8080/productCrew/" + crewid);  
  }

  getCrew(crewid: number): Observable<Crew>{
    return this.http.get<Crew>("http://localhost:8080/crew/" + crewid);
  }

  addProductCrew(crewid: number, productid: number){
    return this.http.put<any>("http://localhost:8080/addProductCrew/" + crewid + "/" + productid, productid);
  }

  getCredits(crewid: number) : Observable<number>{
    return this.http.get<number>("http://localhost:8080/credits/" + crewid)
  }

  updateCreditsCompra(crewid: number, credits:number){
    console.log("Entre updateCreditsCompra");
    console.log("crewid: " + crewid);
    console.log("credits: " + credits);
    const response = this.http.put<any>("http://localhost:8080/updateCreditsCompra/" + crewid + "/" + credits, credits);
    console.log(response);
    return response
  }

  updateCreditsVenta(crewid: number, credits:number){
    const response = this.http.put<any>("http://localhost:8080/updateCreditsVenta/" + crewid + "/" + credits, credits);
    console.log(response);
    return response
  }
  removeProductCrew(crewid: number, productid: number){
    return this.http.put<any>("http://localhost:8080/removeProductCrew/" + crewid + "/" + productid, productid);
  }
}
