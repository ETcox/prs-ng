import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  title: string = 'User-Create';
  user: User = new User();
  message?: string = undefined;

  constructor(private userSvc: UserService,
    private router: Router) { }

  ngOnInit(): void {

  }

  save(): void {
    // NOTE: Check for existence before save?

    this.userSvc.createUser(this.user).subscribe({
      next: (resp) => {
        this.user = resp;
        this.router.navigateByUrl('/user/list');
      },
      error: (err) => {
        this.message = "Error creating user";
      },
      complete: () => { }
    });
  }


}
