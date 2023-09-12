
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  formGroupProduct: FormGroup;

  constructor(private productService: ProductService,
              private formbuilder: FormBuilder
             ){

      this.formGroupProduct = formbuilder.group({
        name: [''],
        price: ['']
      });

  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
    {
      next: products => this.products = products
    }
    )
}
save(){
  let product = this.formGroupProduct.value;
  this.productService.save(product).subscribe(
    {
      next: product => {
                       this.products.push(product);
                       this.formGroupProduct.reset();
    }
  }
  )
}
delete(product: Product){
  this.productService.delete(product).subscribe({
    next: () => {
          this.products = this.products.filter(p => p.id !==product.id)
    }
  })
}

}
