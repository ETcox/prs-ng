import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './feature/user/user-list/user-list.component';
import { UserCreateComponent } from './feature/user/user-create/user-create.component';
import { UserDetailComponent } from './feature/user/user-detail/user-detail.component';
import { UserEditComponent } from './feature/user/user-edit/user-edit.component';
import { VendorCreateComponent } from './feature/vendor/vendor-create/vendor-create.component';
import { VendorDetailComponent } from './feature/vendor/vendor-detail/vendor-detail.component';
import { VendorEditComponent } from './feature/vendor/vendor-edit/vendor-edit.component';
import { VendorListComponent } from './feature/vendor/vendor-list/vendor-list.component';
import { ProductCreateComponent } from './feature/product/product-create/product-create.component';
import { ProductDetailComponent } from './feature/product/product-detail/product-detail.component';
import { ProductEditComponent } from './feature/product/product-edit/product-edit.component';
import { ProductListComponent } from './feature/product/product-list/product-list.component';
import { RequestCreateComponent } from './feature/request/request-create/request-create.component';
import { RequestDetailComponent } from './feature/request/request-detail/request-detail.component';
import { RequestEditComponent } from './feature/request/request-edit/request-edit.component';
import { RequestListComponent } from './feature/request/request-list/request-list.component';
import { UserLoginComponent } from './feature/user/user-login/user-login.component';
import { PurchaseRequestLineItemsComponent } from './feature/request/purchase-request-line-items/purchase-request-line-items.component';
import { LineitemCreateComponent } from './feature/lineItem/lineitem-create/lineitem-create.component';
import { LineitemEditComponent } from './feature/lineItem/lineitem-edit/lineitem-edit.component';
import { RequestReviewListComponent } from './feature/request/request-review-list/request-review-list.component';
import { RequestApproveComponent } from './feature/request/request-approve/request-approve.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: UserListComponent },
  { path: 'user/list', component: UserListComponent },
  { path: 'user/create', component: UserCreateComponent },
  { path: 'user/detail/:id', component: UserDetailComponent },
  { path: 'user/edit/:id', component: UserEditComponent },
  { path: 'vendor/list', component: VendorListComponent },
  { path: 'vendor/create', component: VendorCreateComponent },
  { path: 'vendor/detail/:id', component:VendorDetailComponent },
  { path: 'vendor/edit/:id', component: VendorEditComponent },
  { path: 'product/list', component: ProductListComponent },
  { path: 'product/create', component: ProductCreateComponent },
  { path: 'product/detail/:id', component:ProductDetailComponent },
  { path: 'product/edit/:id', component: ProductEditComponent },
  { path: 'request/list', component: RequestListComponent },
  { path: 'request/create', component: RequestCreateComponent },
  { path: 'request/detail/:id', component:RequestDetailComponent },
  { path: 'request/edit/:id', component: RequestEditComponent },
  { path: 'user/login', component: UserLoginComponent },
  { path: 'request/lines/:id', component: PurchaseRequestLineItemsComponent},
  { path: 'lineitem/create/:requestid', component: LineitemCreateComponent},
  { path: 'lineitem/edit/:id', component: LineitemEditComponent},
  { path: 'request/review/list', component: RequestReviewListComponent},
  { path: 'request/approve/:id', component: RequestApproveComponent},
  { path: '**', component: UserListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
