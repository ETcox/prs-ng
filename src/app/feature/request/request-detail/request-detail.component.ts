import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Request } from 'src/app/model/request';
import { RequestService } from 'src/app/service/request.service';

@Component({
  selector: 'app-request-detail',
  templateUrl: './request-detail.component.html',
  styleUrls: ['./request-detail.component.css']
})
export class RequestDetailComponent implements OnInit {

  title: string = 'Request Detail';
  request: Request = new Request();
  requestId: number = 0;
  message?: string = undefined;

  constructor(
    private requestSvc: RequestService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // get the id from the url
    this.route.params.subscribe({
      next: (parms) => {
        this.requestId = parms['id'];
        this.requestSvc.getRequestById(this.requestId).subscribe({
          next: (parms) => {
            this.request = parms;
          },
        });
      },
      error: (err) => {
        this.message = 'Error getting request';
      },
      complete: () => {},
    });
  }

  delete() {
    this.requestSvc.deleteRequest(this.requestId).subscribe({
      next: (resp) => {
        if (resp == false) {
          this.message = 'RequestDetailComponent - error deleting request.';
        } else {
          this.router.navigateByUrl('request/list');
        }
      },
      error: (err) => {
        this.message = 'Error deleting request, may still have lineitems in cart'
      },
      complete: () => {},
    });
  }
}
