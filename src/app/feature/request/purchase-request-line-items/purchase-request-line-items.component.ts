import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LineItem } from 'src/app/model/lineItem';
import { Request } from 'src/app/model/request';
import { LineItemService } from 'src/app/service/lineItem.service';
import { RequestService } from 'src/app/service/request.service';

@Component({
  selector: 'app-purchase-request-line-items',
  templateUrl: './purchase-request-line-items.component.html',
  styleUrls: ['./purchase-request-line-items.component.css']
})
export class PurchaseRequestLineItemsComponent implements OnInit {

  title: string = "Request Information";
  title2: string = "Line Items";
  request: Request = new Request();
  lineItem: LineItem[] = [];
  requestId: number = 0;
  message?: string = undefined;


  constructor(private lineItemSvc: LineItemService,
    private requestSvc: RequestService,
    private router: Router,
    private route: ActivatedRoute) { }

   ngOnInit(): void {
    
    this.route.params.subscribe({
      next: (parms) => {
        this.requestId = parms['id'];
        this.requestSvc.getRequestById(this.requestId).subscribe({
          next: (resp) => {
            this.request = resp;
          },
          error: (err) => {
            this.message = 'Could not find request'
          },
          complete: () => { }
        });
        this.lineItemSvc.getLineItemByRequestId(this.requestId).subscribe({
          next: (resp) => {
            this.lineItem = resp;
          },
          error: (err) => {
            this.message = 'Error finding lineitem';
          },
          complete: () => { }
        });
      },
      error: (err) => {
        this.message = 'Error finding lineitem';
      },
      complete: () => { }
    });
  }


  delete(id: number): void {
    this.lineItemSvc.deleteLineItem(id).subscribe({
      next: (resp) => {
        if(resp == false) {
          this.message = 'Error on delete';
        } else
        window.location.reload();
      },
      error: (err) => {
        this.message = 'Error on delete';
      },
      complete: () => {}
    });
  }

  submit(): void {
    this.requestSvc.reviewRequest(this.request).subscribe({
      next: (resp) => {
        this.request = resp;
        this.router.navigateByUrl('/request/list');
      },
      error: (err) => {
        this.message = 'Error submitting request';
      },
      complete: () => {}
    });
  }

}
