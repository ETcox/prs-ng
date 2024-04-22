import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export class BaseComponent implements OnInit {
  

  
  loggedInUser: User = new User();
  userIsLoggedIn: boolean = false;
  userIsAdmin: boolean = false;
  userIsReviewer: boolean = false;
  message?: string = undefined;
  
  constructor(
    private sysSvc: SystemService
  ) {}

  ngOnInit(): void {
    this.loggedInUser = this.sysSvc.loggedInUser;
    this.userIsLoggedIn = this.loggedInUser.id != 0;
    this.userIsAdmin = this.loggedInUser.admin;
    this.userIsReviewer = this.loggedInUser.reviewer;
  }
}
