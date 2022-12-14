import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoginComponent } from '../login/login.component';
import { RouteConfigToken } from './../services/routeConfig.service';
import { SharedModule } from './../shared/shared.module';
import { AddComponent } from './add/add.component';
import { ListComponent } from './list/list.component';
import { SignupComponent } from './signup/signup.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { UsersComponent } from './users/users.component';
import { FilterPipe } from './filter.pipe';

// console.log('user module load');

@NgModule({
  declarations: [
    ListComponent,
    SignupComponent,
    AddComponent,
    LoginComponent,
    UsersComponent,
    UserComponent,
    UserListComponent,
    FilterPipe,
    // RedElementDirective,
    // HoverDirective,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    MatProgressSpinnerModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: RouteConfigToken,
      useValue: { title: 'Users' },
    },
  ],
})
export class UserModule {}
