import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './add/add.component';
import { ListComponent } from './list/list.component';
import { SignupComponent } from './signup/signup.component';
import { UserComponent } from './user.component';
import { UserGuard } from './user.guard';
import { UsersComponent } from './users/users.component';

// const routes: Routes = [
//   { path: 'login', component: LoginComponent },
//   { path: 'signup', component: SignupComponent },
//   { path: 'list', component: ListComponent },
// ];
const routes: Routes = [
  // {
  //   path: 'user',
  //   children: [
  //     { path: 'login', component: LoginComponent },
  //     { path: 'signup', component: SignupComponent },
  //     { path: 'list', component: ListComponent },
  //   ],
  // },
  // for lazy loading we can not declare our routes like above
  // { path: 'login', component: LoginComponent },
  // { path: 'add', component: AddComponent },
  // { path: 'signup', component: SignupComponent },
  // { path: 'list', component: ListComponent },
  // { path: '', component: UsersComponent },
  // // open specific user on a new page
  // // always add dynamic routes at the bottom
  // { path: ':id', component: UserComponent },

  {
    path: '',
    component: UsersComponent,
    canActivateChild: [UserGuard],
    children: [
      { path: 'signup', component: SignupComponent },
      { path: 'list', component: ListComponent },
      { path: 'add', component: AddComponent },
      { path: ':id', component: UserComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
