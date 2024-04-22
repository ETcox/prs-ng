import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LineItem } from 'src/app/model/lineItem';
import { Product } from 'src/app/model/product';
import { User } from 'src/app/model/user';
import { LineItemService } from 'src/app/service/lineItem.service';
import { ProductService } from 'src/app/service/product.service';
import { RequestService } from 'src/app/service/request.service';
import { SystemService } from 'src/app/service/system.service';


@Component({
  selector: 'app-lineitem-create',
  templateUrl: './lineitem-create.component.html',
  styleUrls: ['./lineitem-create.component.css']
})
export class LineitemCreateComponent implements OnInit {

  title: string = 'LineItem-Create';
  requestId: number = 0;
  lineItem: LineItem = new LineItem();
  products: Product[] = [];
  reqUser: User = new User();
  message?: string = undefined;

  constructor( private lineItemSvc: LineItemService,
               private productSvc: ProductService,
               private requestSvc: RequestService,
               private systemSvc: SystemService,
               private route: ActivatedRoute,
               private router: Router) { }

                ngOnInit(): void {
                
                this.route.params.subscribe({
                  next: (parms) => {
                    this.requestId = parms['requestid'];
                    this.requestSvc.getRequestById(this.requestId).subscribe({
                      next: (resp) => {
                        this.lineItem.request = resp;
                        this.reqUser = resp.user;
                      }, 
                      error: (err) => {
                        this.message = 'Error finding request';
                      },
                      complete: () => {}
                    });
                  }, 
                });
                this.productSvc.getAllProducts().subscribe({
                  next: (resp) => {
                    this.products = resp;
                  }, 
                  error: (err) => {
                    this.message = 'Error finding products;'
                  },
                  complete: () => {}
                });
              }
              

  save(): void {
    
    this.lineItemSvc.createLineItem(this.lineItem).subscribe({
      next: (resp) => {
        this.lineItem = resp;
        this.router.navigateByUrl('/request/lines/'+this.requestId);
      },
      error: (err) => {
        this.message = 'Error adding lineitem.';
      },
      complete: () => {},
    });
  }

}
