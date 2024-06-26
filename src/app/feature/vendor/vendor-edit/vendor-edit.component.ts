import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Vendor } from 'src/app/model/vendor';
import { VendorService } from 'src/app/service/vendor.service';

@Component({
  selector: 'app-vendor-edit',
  templateUrl: './vendor-edit.component.html',
  styleUrls: ['./vendor-edit.component.css']
})
export class VendorEditComponent implements OnInit {

  title: string = 'Vendor-Edit';
  vendor: Vendor = new Vendor();
  vendorId: number = 0;
  message?: string = undefined;



  constructor(private vendorSvc: VendorService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe({
      next: parms => {
       this.vendorId = parms["id"];
       this.vendorSvc.getVendorById(this.vendorId).subscribe({
        next: parms => {
          this.vendor = parms;
        }
       });
      },
      error: (err) => {
        this.message = "Error updating vendor";
      }
    });
  }

  save(): void{
    // NOTE: Check for existence before save?

    this.vendorSvc.updateVendor(this.vendor).subscribe({
      next: (resp) => {
        this.vendor = resp;
        this.router.navigateByUrl('/vendor/list');
      },
      error: (err) =>{
        this.message = "Error updating vendor";
      },
      complete: () => {}
    });
  }

}
