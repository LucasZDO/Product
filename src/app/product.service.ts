import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {



  products: Product[] = [];
  baseUrl: string = "http://localhost:3000/products";

constructor(private http: HttpClient) {

}
  getProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(this.baseUrl);
  }
  save(product: Product): Observable<Product>{
    return this.http.post<Product>(this.baseUrl, product);
  }
  delete(product : Product): Observable<void>{
    let url = `${this.baseUrl}/${product.id}`;
    return this.http.delete<void>(url);
  }
}
