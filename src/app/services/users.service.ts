import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpRequest,
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { catchError, map, Observable, shareReplay, throwError } from 'rxjs';
import { AppConfig } from '../app-configs/appConfig.interface';
import { APP_SERVICE_CONFIG } from '../app-configs/appConfig.service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  // url: string = `https://jsonplaceholder.typicode.com/users`;
  url: string = `http://localhost:3000/users`;
  jsonFileUrl: string = `/assets/data/users.json`;

  // here we have a property getUsers and the dollar symbol denotes that its a stream
  headers = new HttpHeaders({ token: 'token123@abc' });
  // shareReplay operator
  getUsers$ = this.http
    // .get<User[]>(this.url, { headers: this.headers })
    .get<User[]>(this.url)
    .pipe(shareReplay(1));
  // now raising an error while passing wrong endpoint of api we can handle error in component or service (better approach using NgRx state management)
  // getUsers$ = this.http
  //   .get<User[]>(`http://localhost:3000/user`)
  //   .pipe(shareReplay(1));

  // map operator
  usersCount$ = this.http
    .get<User[]>(this.url)
    .pipe(map((users) => users.length));

  constructor(
    private http: HttpClient,
    @Inject(APP_SERVICE_CONFIG) private config: AppConfig // in this way we can inject or use value providers
  ) {
    // console.log(environment.baseUrl);
    // console.log(config.baseUrl);
    // OR
    // console.log(this.config.baseUrl);
    // console.log('users service get called');
  }

  // getUsers() {
  //   // console.log(config.baseUrl);
  //   // console.log(this.config.baseUrl);
  //   return [
  //     { id: 1, name: 'ali haider', email: 'ali@gmail.com', age: 30 },
  //     { id: 2, name: 'hasnain anwar', email: 'hasnain@gmail.com', age: 20 },
  //     { id: 3, name: 'usman anwar', email: 'usman@gmail.com', age: 10 },
  //   ];
  // }

  getUsers() {
    // by setting proxy now we dont need to write the whole baseUrl everywhere now we can just write /api/users and proxy settings redirect it to http://localhost:3000/users
    // return this.http.get<User[]>('/users');

    const headers = new HttpHeaders({ token: 'token123@abc' });
    return this.http.get<User[]>(this.url, { headers: headers });
  }

  // errorHandler(error: HttpErrorResponse) {
  //   return throwError(error.message || 'Server Error');
  // }

  errorHandler(error: HttpErrorResponse) {
    // if (error?.error?.message) {
    //   alert(error?.error?.message);
    // } else if (error?.message) {
    //   alert(error?.message);
    // } else {
    //   alert(JSON.stringify(error));
    // }
    // return throwError(error?.error?.message || 'Server Error');
    return throwError(error?.message || 'Server Error');
  }

  getUsersList(): Observable<User[]> {
    return this.http
      .get<User[]>(this.url)
      .pipe(catchError((error) => this.errorHandler(error)));
    // return this.http.get<User[]>(this.jsonFileUrl).pipe(catchError(this.errorHandler));
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.url}/${id}`);
  }
  saveUser(data: User) {
    return this.http.post(this.url, data);
  }
  updateUser(data: User, id: number) {
    return this.http.patch(`${this.url}/${id}`, data);
  }
  deleteUser(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  getPhotos() {
    const request = new HttpRequest(
      'GET',
      `https://jsonplaceholder.typicode.com/photos`,
      {
        reportProgress: true,
      }
    );

    return this.http.request(request);
  }
}
