import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../base/base.component';
import { LineItemService } from 'src/app/service/lineItem.service';
import { RequestService } from 'src/app/service/request.service';
import { SystemService } from 'src/app/service/system.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Request } from 'src/app/model/request';
import { LineItem } from 'src/app/model/lineItem';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-lineitem-edit',
  templateUrl: './lineitem-edit.component.html',
  styleUrls: ['./lineitem-edit.component.css']
})
export class LineitemEditComponent implements OnInit {
  title:string = 'Line-Item Edit'
  lineId: number = 0;
  request: Request = new Request();
  lineItem: LineItem = new LineItem();
  products: Product[] = [];
  message?: string = undefined;

  constructor(
    private systemSvc: SystemService,
    private lineItemSvc: LineItemService,
    private requestSvc: RequestService,
    private route: ActivatedRoute,
    private productSvc: ProductService,
    private router: Router,

  ) { }

  ngOnInit(): void {
    
    this.route.params.subscribe({
      next: (parms) => {
        this.lineId = parms['id'];
        this.lineItemSvc.getLineItemById(this.lineId).subscribe({
          next: (resp) => {
            this.lineItem = resp;
            this.requestSvc.getRequestById(this.lineItem.request.id).subscribe({
              next: (resp) => {
                this.request = resp;
              }, 
              error: (err) => {
                this.message = 'Error getting lineitem';
              },
              complete: () => {}
            });
          }, 
          error: (err) => {
            this.message = 'Error getting lineitem';
          },
          complete: () => {}
        });
      }, 
      error: (err) => {
        this.message = 'Error getting request';
      },
      complete: () => {}
    });
    this.productSvc.getAllProducts().subscribe({
      next: (resp) => {
        this.products = resp;
      }, 
      error: (err) => {
        this.message = 'Error getting products';
      },
      complete: () => {}
    });
  }

  save(): void {
    this.lineItemSvc.updateLineItem(this.lineItem).subscribe({
      next: (resp) => {
        this.lineItem = resp;
        this.router.navigateByUrl('/request/lines/'+this.lineItem.request.id);
      }, 
      error: (err) => {
        this.message = 'Error editing line item';
      },
      complete: () => {}
    });
  }

  compProduct(a: Product, b: Product): boolean {
    return a && b && a.id === b.id;
  }
  

}
