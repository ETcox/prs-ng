import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SystemService {
  loggedInUser: User = new User();

  constructor(private router: Router) { }

  

  checkLogin(): void{
    // check loggedInUser, if not logged in, forward to login page.
    // only call this method when ready
    if (this.loggedInUser.id == 0) {
      this.router.navigateByUrl("/user/login");

    }
  }

  
}
