import { Component, OnInit } from '@angular/core';
import { Request } from 'src/app/model/request';
import { LineItem } from 'src/app/model/lineItem';
import { RequestService } from 'src/app/service/request.service';
import { SystemService } from 'src/app/service/system.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LineItemService } from 'src/app/service/lineItem.service';


@Component({
  selector: 'app-request-approve',
  templateUrl: './request-approve.component.html',
  styleUrls: ['./request-approve.component.css']
})
export class RequestApproveComponent implements OnInit {

  title: string = 'Request Approve/Reject';
  title2: string = 'Line Items';
  request: Request = new Request;
  requestId: number = 0;
  lineItems: LineItem[] = [];
  reasonForRejection: string = '';
  message?: string = undefined;


  constructor(
    private requestSvc: RequestService,
    private systemSvc: SystemService,
    private route: ActivatedRoute,
    private router: Router,
    private lineItemSvc: LineItemService
  ) {}

   ngOnInit(): void {
    
    
    this.route.params.subscribe({
      next: (parms) => {
        this.requestId = parms['id'];
        this.requestSvc.getRequestById(this.requestId).subscribe({
          next: (resp) => {
            this.request = resp;
          },
          error: (err) => {
            this.message = 'Error getting request';
          },
          complete: () => {}
        });
        this.lineItemSvc.getLineItemByRequestId(this.requestId).subscribe({
          next: (resp: LineItem[]) => {
            this.lineItems = resp;
          },
          error: (err) => {
            this.message = 'Error getting line item';
          },
          complete: () => {}
        });
      },
      error: (err) => {
        this.message = 'Error getting line item';
      },
      complete: () => {}
    });
  }

  reject(): void {
    if(this.reasonForRejection != '') {
      this.requestSvc.rejectRequest(this.request, this.reasonForRejection).subscribe({
        next: (resp) => {
          this.request = resp;
          this.router.navigateByUrl('/request/list');
        },
        error: (err) => {
          this.message = err.message;
        },
        complete: () => {}
      });
    } else {
      this.message = 'Please provide a reason for rejection';
    }
  }

  approve(): void {
    this.requestSvc.approveRequest(this.request).subscribe({
      next: (resp) => {
        this.request = resp;
        this.router.navigateByUrl('/request/list');
      },
      error: (err) => {
        this.message = 'Error approving this request';
      },
      complete: () => {}
    });
  }
}
