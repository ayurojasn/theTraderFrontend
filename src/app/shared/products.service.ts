import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../model/product';
import { ProductPlanet } from '../model/product-planet';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  findAll():  Observable<Product[]> {
    return this.http.get<Product[]>("http://localhost:8080/products");
   }

  getProductPlanet(planetid: number): Observable<ProductPlanet[]>{
    return this.http.get<ProductPlanet[]>("http://localhost:8080/productPlanet/" + planetid);
  }

}
