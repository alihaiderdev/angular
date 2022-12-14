import { Component, OnInit, SkipSelf } from '@angular/core';
import { UsersService } from './../services/users.service';

@Component({
  selector: 'app-about',
  template: `
    <router-outlet></router-outlet>
    <ul>
      <li><a routerLink="company">Company</a></li>
      <li><a routerLink="me">Me</a></li>
    </ul>
    <!-- <router-outlet></router-outlet> -->
  `,
  styles: [],
})
export class AboutComponent implements OnInit {
  users: any = [];
  constructor(@SkipSelf() private usersData: UsersService) {
    this.usersData.getUsersList().subscribe((users) => {
      // console.log({ users });
      this.users = users;
    });
  }

  ngOnInit(): void {}
}
