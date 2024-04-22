import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LineItem } from 'src/app/model/lineItem';
import { LineItemService } from 'src/app/service/lineItem.service';
import { RequestService } from 'src/app/service/request.service';
import { SystemService } from 'src/app/service/system.service';
import { Request } from 'src/app/model/request';

@Component({
  selector: 'app-request-review-list',
  templateUrl: './request-review-list.component.html',
  styleUrls: ['./request-review-list.component.css']
})
export class RequestReviewListComponent implements OnInit {

  title: string = 'Request-For-Review';
  requests: Request[] = [];
  message?: string = undefined;
  request: Request = new Request();

  constructor(
    private requestSvc: RequestService,
    private router: Router,
    private systemSvc: SystemService
  ) {}

   ngOnInit(): void {
    
    this.systemSvc.checkLogin();
    
    this.request.user = this.systemSvc.loggedInUser;

    this.requestSvc.getAllRequestForReview(this.systemSvc.loggedInUser.id).subscribe({
      next: (resp) => {
        this.requests = resp;
        
      },
      error: (err) => {
        this.message = err.message;
      },
      complete: () => {}
    });
  }

}
