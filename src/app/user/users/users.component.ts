import { HttpEventType } from '@angular/common/http';
import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, map, Observable, of, Subject, Subscription } from 'rxjs';
import { HeaderComponent } from '../../header/header.component';
import { User } from '../../models/user';
import { UsersService } from '../../services/users.service';
import { AppConfigService } from './../../services/app-config.service';
import { ConfigService } from './../../services/config.service';

// import { HeaderComponent } from './../header/header.component';
// import { User } from './../models/user';
// import { UsersService } from './../services/users.service';

@Component({
  selector: 'app-users',
  template: `
    <router-outlet> </router-outlet>

    <h1>Lazy loading routes</h1>

    <h1 class="text-indigo-600 font-black text-2xl">User Routes</h1>
    <ul>
      <li><a routerLink="/users/signup">Signup</a></li>
      <li><a routerLink="/users/list">List</a></li>
      <li><a routerLink="/users/add">Add User</a></li>
    </ul>

    <h1 class="text-indigo-600 font-black text-2xl">Admin Routes</h1>
    <ul>
      <li><a routerLink="/admin/login">Login</a></li>
      <li><a routerLink="/admin/signup">Signup</a></li>
      <li><a routerLink="/admin/list">List</a></li>
    </ul>

    <!-- <ul>
      <li>
        <a routerLink="/users/1"><strong> ali haider</strong></a>
      </li>
      <li>
        <a routerLink="/users/2"><strong> hasnain anwar</strong></a>
      </li>
      <li>
        <a routerLink="/users/3"><strong> usman anwar</strong></a>
      </li>
    </ul> -->
    <section class="users">
      <!-- <app-header></app-header>
      <app-header></app-header>
      <app-header></app-header>
      <app-header>
        <h1>This is from ng-content</h1>
      </app-header> -->

      <h1 class="text-2xl">{{ totalBytes }} uploaded</h1>

      <h1>{{ age }}</h1>

      <h1 *ngIf="selectedUser" class="text-indigo-600 font-bold">
        {{ selectedUser | json }}
      </h1>

      <button
        class="bg-green-600 text-white px-4 py-2 rounded-md"
        (click)="addUser()"
      >
        Add User
      </button>
      <button
        class="bg-yellow-500 px-4 py-2 rounded-md ml-2"
        (click)="toggle()"
      >
        Toggle
      </button>
      <button
        class="bg-blue-500 px-4 py-2 rounded-md ml-2"
        (click)="userToggler()"
      >
        Toggle User
      </button>

      <div class="bg-blue-500">{{ usersList | json }}</div>
      <!-- <div class="bg-green-500">{{ users$ | json }}</div> -->
      <div class="bg-green-500">{{ users$ | async | json }}</div>

      <!-- <div *ngIf="isUserListShown">
        <ng-container *ngIf="users?.length ?? [].length > 0; else elseTemplate">
          <app-user-list
            [users]="users"
            [title]="title"
            (selectedUser)="selectUser($event)"
          ></app-user-list>
        </ng-container>
      </div>

      <ng-template #elseTemplate>
        <h1 class="text-red-600">{{ error | json }}</h1>
      </ng-template> -->

      <!-- <h1 class="text-red-600 font-bold">
        why we use async pipe here because while using async pipe we don't need
        to manually unsubscribe the subscription each and every time in
        ngOnDestroy method for better performance and for avoid memory leaks
        async pipe do it itself
      </h1> -->

      <!-- this is not a good approach because we subscribing users 2 times by using
      2 times async pipes -->
      <!-- <div *ngIf="isUserListShown">
        <ng-container *ngIf="users$ | async; else elseTemplate">
          <app-user-list
            [users]="users$ | async"
            [title]="title"
            (selectedUser)="selectUser($event)"
          ></app-user-list>
        </ng-container>
      </div> -->
      <!-- <app-add></app-add> -->
      <!-- here is the best approach here we use only one time async try to avoid multiple async pipe on a same stream rather do this users$ | async as users -->
      {{ priceFilter | json }}
      <input
        type="number"
        class="form-control"
        placeholder="Price"
        [formControl]="priceFilter"
      />
      <h1 class="text-red-600">
        <!-- {{ getError$ | async }} -->
        Total number of users: {{ usersCount$ | async }}
      </h1>
      <ng-container *ngIf="isUserListShown">
        <ng-container *ngIf="users$ | async as users">
          <ng-container *ngIf="users.length > 0; else error">
            <app-user-list
              [users]="users"
              [title]="title"
              [price]="priceFilter.value"
              (selectedUser)="selectUser($event)"
            ></app-user-list>
          </ng-container>
          <ng-template #error> {{ error }}</ng-template>
        </ng-container>
      </ng-container>
    </section>
  `,
  styles: [
    `
      .selected {
        background-color: yellowgreen;
      }
      /* .users {
        background-color: yellow;
      } */
    `,
  ],
  // providers: [UsersService], // here we make a local instance of usersService so we can use @Self decorator to tell angular just check the instance of service in this component level and dont check it in upper level (root level)
})
export class UsersComponent
  implements OnInit, DoCheck, AfterViewInit, AfterViewChecked, OnDestroy
{
  // users = [
  //   { id: 1, name: 'ali haider', email: 'ali@gmail.com', age: 30 },
  //   { id: 2, name: 'hasnain anwar', email: 'hasnain@gmail.com', age: 20 },
  //   { id: 3, name: 'usman anwar', email: 'usman@gmail.com', age: 10 },
  // ];

  stream = new Observable<string>((observer) => {
    observer.next('user1');
    observer.next('user2');
    observer.next('user3');
    observer.next('user4');
    observer.next('user5');
    observer.complete();
  });
  users: any = [];
  usersList!: User[];
  age: number = 24;
  isUserListShown: boolean = true;
  error: string = '';
  selectedId: string | number = '';
  title: string = 'User List';
  totalBytes: number = 0;
  // selectedUser: User = { id: 0, name: '', email: '', password: '' };
  selectedUser: User | null = null;
  subscription!: Subscription;
  error$ = new Subject<string>();

  getError$ = this.error$.asObservable();
  // users$ = this.usersService.getUsers$;
  usersCount$ = this.usersService.getUsers$.pipe(map((users) => users.length));
  // handling error
  users$ = this.usersService.getUsers$.pipe(
    catchError((error) => {
      this.error$.next(error.message);
      this.error = error.message;
      this.error$.next(error.message);
      return of([]);
    })
  );

  // map operator to modify the stream data before subscribing it

  // if we set static to true in view child then we access the instance of our child component in ngOnInit method otherwise not but we access the instance in ngAfterViewInit hook in both case while static value is set to true or false default value is false
  // and it will access only the first instance of the component if we have multiple in that case we should use @ViewChildren() decorator
  @ViewChild(HeaderComponent, { static: true }) // for one instance
  headerComponent!: HeaderComponent;

  @ViewChildren(HeaderComponent)
  headerChildrenComponent!: QueryList<HeaderComponent>; // for more than one instance

  constructor(
    // @Self() private usersService: UsersService,
    private usersService: UsersService,
    private router: Router,
    private route: ActivatedRoute,
    private appConfigService: AppConfigService,
    private configService: ConfigService
  ) {
    // this.usersService.getUsersList().subscribe(
    //   (users) => {
    //     this.users = users;
    //     console.log({ users });
    //   },
    //   (error) => {
    //     this.error = error;
    //   }
    // );
    // console.log('constructor', this.headerComponent);
  }

  priceFilter: FormControl = new FormControl(0);
  ngOnInit(): void {
    // console.log('ngOnInit', this.headerComponent);
    // console.log(this.usersService.getUsers());
    this.stream.subscribe({
      // next: (value) => {
      //   console.log({ value });
      // },
      // OR
      next(value) {
        console.log({ value });
      },
      complete() {
        console.log('Complete');
      },
      error(err) {
        console.log({ err });
      },
    });
    // this.stream.subscribe(
    //   (next) => {
    //     console.log({ next });
    //   },
    //   (error) => {
    //     console.log({ error });
    //   }
    // );

    this.usersService.getPhotos().subscribe((event) => {
      // console.log(event);
      switch (event.type) {
        case HttpEventType.Sent:
          console.log('Request has been made!');
          break;
        case HttpEventType.ResponseHeader:
          console.log('Request success!');
          break;
        case HttpEventType.DownloadProgress:
          console.log('Request success!');
          this.totalBytes = event.loaded;
          break;
        case HttpEventType.Response:
          console.log(event.body);
          break;

        default:
          break;
      }
    });

    // this.usersService.getUsers().subscribe(
    //   (users) => {
    //     this.usersList = users;
    //     console.log({ users });
    //   },
    //   (error) => {}
    // );

    // by using shareReplay we cache first request response and use it everywhere no need to mkae too many calls
    // this.subscription = this.usersService.getUsers$.subscribe(
    //   (users) => {
    //     this.usersList = users;
    //     console.log({ users });
    //   },
    //   (error) => {}
    // );
  }

  ngDoCheck(): void {
    // console.log('ngDoCheck');
  }
  // this lifecycle is called when everything in the component is initialize or everything loads in the DOM for example if we use any child component in our parent component the child components data and ui also loaded along with parent component
  ngAfterViewInit(): void {
    // console.log('before ngAfterViewInit', this.headerComponent);
    // this.headerComponent.title = 'This is our first header component';
    // console.log('after ngAfterViewInit', this.headerComponent);
    // console.log(this.headerChildrenComponent);
    // this.headerChildrenComponent.last.title =
    //   'This is our last header component';

    // console.log(
    //   this.headerChildrenComponent.get(this.headerChildrenComponent.length - 1)
    // );

    const headerComponents = Array.from(this.headerChildrenComponent);
    headerComponents.shift();
    headerComponents.pop();

    headerComponents.forEach((headerComponent, index) => {
      headerComponent.title = 'This is header component';
      // if (index===3) {
      //   headerComponent.destroy()
      // }
    });
    // this.headerChildrenComponent.forEach((headerComponent) => {
    //   headerComponent.title = 'This is header component';
    // });
  }

  ngAfterViewChecked(): void {
    // console.log('ngAfterViewChecked');
    // this.headerComponent.title = 'Hello this is header component';
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.

    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  updateUser(user: User) {
    this.usersService.updateUser(user, user.id!).subscribe((user) => {});
  }

  // way of communication between components
  selectUser(user: User): void {
    this.selectedUser = user;
  }

  deleteUser(user: User) {
    this.usersService.deleteUser(user.id!).subscribe((user) => {
      // console.log(`User with id ${id} deleted successfully!`);
    });
  }

  onSelectRedirect(user: User): void {
    // this.router.navigate(['/users', userId]); // for absolute paths
    this.router.navigate([user.id], { relativeTo: this.route }); // for relative paths
  }

  addUser() {
    const user: User = {
      id: 10,
      name: 'daniyal',
      email: 'daniyal@gmail.com',
      password: 'daniyal12345',
    };
    // this._userData.push(user);
    //  when we enable ChangeDetectionStrategy in our child component then its in actual updating the array of users but cant update the UI due to the concept of immutable like any state management library its every time want the new instance of previous users including the adding one
    this.users = [...this.users, user];
  }

  toggle() {
    this.title = 'Users List';
  }

  userToggler() {
    this.isUserListShown = !this.isUserListShown;
  }
}
