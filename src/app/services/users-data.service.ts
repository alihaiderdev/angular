import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UsersDataService {
  constructor() {}

  getUsers() {
    return [
      { id: 1, name: 'ali haider', email: 'ali@gmail.com', password: "ali12345" },
      { id: 2, name: 'hasnain anwar', email: 'hasnain@gmail.com', password: "ali12345" },
      { id: 3, name: 'usman anwar', email: 'usman@gmail.com', password: "ali12345" },
    ];
  }
}
