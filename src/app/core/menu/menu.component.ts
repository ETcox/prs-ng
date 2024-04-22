import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'src/app/model/menu-item';
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  title: string = "";
  menuItems: MenuItem[] = [];
  welcomeMsg?: string = undefined;



  constructor(private systemSvc: SystemService) { }

  ngOnInit(): void {
    this.title = '[PRS]';
    //create menuItems for each item in our menu: movie, actor, credit
    this.menuItems.push(new MenuItem("User", "/user/list", "User List"));
    this.menuItems.push(new MenuItem("Vendor", "/vendor/list", "Vendor List"));
    this.menuItems.push(new MenuItem("Product", "/product/list", "Product List"));
    this.menuItems.push(new MenuItem("Request", "/request/list", "Request List"));
    if(this.systemSvc.loggedInUser.reviewer == true){
    this.menuItems.push(new MenuItem("Review", "/request/review/list", "Review List"));
    }
    if(this.systemSvc.loggedInUser.id != 0){
      this.menuItems.push(new MenuItem("Logout", "/user/login", "Logout"));
    }else
    this.menuItems.push(new MenuItem("Login", "/user/login", "Login"));
    
    if(this.systemSvc.loggedInUser.id != 0){
    this.welcomeMsg = "Welcome " + this.systemSvc.loggedInUser.firstname + "!";
    }
    
    }
 
  }
   

