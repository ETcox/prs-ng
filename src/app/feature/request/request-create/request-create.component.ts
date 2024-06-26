import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Request } from 'src/app/model/request';
import { User } from 'src/app/model/user';
import { RequestService } from 'src/app/service/request.service';
import { SystemService } from 'src/app/service/system.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-request-create',
  templateUrl: './request-create.component.html',
  styleUrls: ['./request-create.component.css']
})
export class RequestCreateComponent implements OnInit {

  title: string = 'Request-Create';
  request: Request = new Request();
  user: User[] = [];
  message?: string = undefined;

  constructor(
    private requestSvc: RequestService,
    private userSvc: UserService,
    private systemSvc: SystemService,
    private router: Router
  ) {}
  

  ngOnInit(): void {

    this.systemSvc.checkLogin();
    
    this.request.user = this.systemSvc.loggedInUser;
  }


  save(): void {
    // NOTE: Check for existence of credit title before save?
    this.requestSvc.createRequest(this.request).subscribe({
      next: (resp) => {
        this.request = resp;
        this.router.navigateByUrl('/request/list');
      },
      error: (err) => {
        this.message = 'Error creating request.';
      },
      complete: () => {},
    });
  }
  }


