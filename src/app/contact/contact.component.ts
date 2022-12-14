import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { AppConfigService } from './../services/app-config.service';
import { ConfigService } from './../services/config.service';
import { UsersDataService } from './../services/users-data.service';

@Component({
  selector: 'app-contact',
  template: `
    <ul>
      <li *ngFor="let user of userData.reverse()">
        <em
          ><strong>{{ user.name }}</strong></em
        >
      </li>
    </ul>
  `,
  styles: [],
  providers: [UsersService], // make local instance of a service
})
export class ContactComponent implements OnInit {
  userData: any = [];
  constructor(
    private usersData: UsersDataService,
    private usersService: UsersService,
    private appConfigService: AppConfigService,
    private configService: ConfigService
  ) {
    // console.log(usersData.getUsers());
    console.log('Contact loads');

    this.userData = usersData.getUsers();
  }

  ngOnInit(): void {}
}
