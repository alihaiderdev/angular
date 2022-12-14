import { Component, OnInit } from '@angular/core';
import { UsersService } from './../services/users.service';

@Component({
  selector: 'app-home',
  template: `
    <!-- <app-container>
      <h1>This is from ng-content</h1>
      <p>home works!</p>
    </app-container> -->
    <p appRedElement appHover>home works!</p>
  `,
  styles: [],
})
export class HomeComponent implements OnInit {
  users: any = [];
  constructor(private usersData: UsersService) {
    // this.usersData.getUsersList().subscribe((users) => {
    //   // console.log({ users });
    //   this.users = users;
    // });
  }

  ngOnInit(): void {}
}
