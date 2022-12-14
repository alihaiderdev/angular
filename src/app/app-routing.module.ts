import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutCompanyComponent } from './about/about-company/about-company.component';
import { AboutMeComponent } from './about/about-me/about-me.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { EmployeeDetailsComponent } from './employee/employee-details/employee-details.component';
import { EmployeeComponent } from './employee/employee.component';
import { LoginGuard } from './guards/login.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  // { path: '', redirectTo: '/about', pathMatch: 'prefix' },
  // { path: '', redirectTo: '/users', pathMatch: 'full' },
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
    children: [
      { path: 'company', component: AboutCompanyComponent },
      { path: 'me', component: AboutMeComponent },
    ],
  },
  { path: 'contact', component: ContactComponent, canActivate: [LoginGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'employees', component: EmployeeComponent },
  { path: 'employees/:id', component: EmployeeDetailsComponent },

  // for lazy loading module routes
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
    // canActivate: [LoginGuard],
  },
  {
    path: 'users',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
    // canActivateChild: [UserGuard], // never use canActivateChild guard at this place lazy loading will not work
    canLoad: [LoginGuard],
    canActivate: [LoginGuard],
  },
  {
    // path: 'bookings',
    path: 'bookings/:userId',
    loadChildren: () =>
      import('./booking/booking.module').then((m) => m.BookingModule),
  },
  {
    path: 'comments',
    loadChildren: () =>
      import('./comment/comment.module').then((m) => m.CommentModule),
  },
  // {
  //   path: '',
  //   redirectTo: '',
  //   pathMatch: 'full',
  // },
  // when we use group routing in our project and also using wild card route like the below then we can't see any module level routes instead we face 404 page on every module level routes

  // this is our wild card route or 404 page not found
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
