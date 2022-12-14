import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  ElementRef,
  Inject,
  OnInit,
  Optional,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  Event as RouterEvent,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
import { localStorageToken } from 'src/localStorage.token';
import { User } from './models/user';
import { AppConfigService } from './services/app-config.service';
import { ConfigService } from './services/config.service';
import { InitService } from './services/init.service';
import { LoggerService } from './services/logger.service';
import { UsersDataService } from './services/users-data.service';
import { UsersService } from './services/users.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit, OnInit {
  number: number = 20;

  date: Date = new Date();
  @ViewChild('user', { read: ViewContainerRef }) vcr!: ViewContainerRef; //accessing user reference template from app.component.html file

  // just only target any elements of its own HTML file note in other component
  @ViewChild('name', { static: true }) name!: ElementRef; //accessing user reference template from app.component.html file
  users: User[] = [
    { id: 1, name: 'ali haider', email: 'ali@gmail.com', password: 'ali12345' },
    {
      id: 2,
      name: 'hasnain anwar',
      email: 'hasnain@gmail.com',
      password: 'ali12345',
    },
    {
      id: 3,
      name: 'usman anwar',
      email: 'usman@gmail.com',
      password: 'ali12345',
    },
  ];
  userData: User[] = [];
  error: string = '';
  _userData: User[] = [];
  title: string = 'User List';
  loginForm!: FormGroup;
  // selectedUser: User = { id: 0, name: '', email: '', password: '' };
  onRouteChangeLoader: boolean = false;
  selectedUser: User | null = null;
  userLoggedIn: boolean = true;
  // anytime you want property changes within same component we have 2 approaches split two way binding or getter and setter
  // component interaction using split two way binding
  userName!: string;
  greeting(updatedUsername: string) {
    this.userName = updatedUsername;
    if (updatedUsername === 'ali') {
      alert(`Good morning ${updatedUsername}`);
    }
  }

  // using getter and setter
  private _customerName!: string;
  get customerName(): string {
    return this._customerName;
  }
  set customerName(value: string) {
    this._customerName = value;
    if (value === 'ali') {
      alert(`Good morning ${value}`);
    }
  }

  // any observer contains these 3 things next, error and complete methods
  observer = {
    next: (value: any) => {
      console.log(value);
    },
    error: (error: any) => {
      console.log(error);
    },
    complete: () => {
      console.log('Completed');
    },
  };
  constructor(
    private fb: FormBuilder,
    private usersData: UsersDataService,
    private _usersData: UsersService,
    // for lazy load components
    private viewContainer: ViewContainerRef,
    private cfr: ComponentFactoryResolver,
    @Optional() private loggerService: LoggerService,
    @Inject(localStorageToken) private localStorage: Storage,
    private initService: InitService,
    private appConfigService: AppConfigService,
    private configService: ConfigService,
    private router: Router
  ) {
    // we can not write any blocking code in our constructor means asynchronous code we can do these thing in our ngOnInit life cycle hook
    // console.log(usersData.getUsers());
    this.userData = usersData.getUsers();

    // this._usersData.getUsersList().subscribe(
    //   (users) => {
    //     // console.log({ users });
    //     this._userData = users;
    //   },
    //   (error) => {
    //     this.error = error;
    //   }
    // );

    // console.log('initService.config: ', initService.config);
    // console.log('appConfigService.config: ', appConfigService.getConfig());
  }
  ngOnInit(): void {
    // console.log({ localStorage });
    // console.log({ localStorage: this.localStorage.getItem('UserLastName') });

    this.loggerService?.log('AppComponent ngOnInit');
    // console.log(this.name);
    this.initForm();
    // this.name.nativeElement.innerHTML = 'My name is ali haider';
    // this.name.nativeElement.innerHTML += 'ali haider';
    // this.name.nativeElement.innerText += 'ali haider';
    // this.name.nativeElement.style.backgroundColor = 'yellowgreen';
    // this.router.events.subscribe((event) => {
    //   console.log({ event });
    // });

    this.router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event);
    });
    // this.router.events
    //   .pipe(filter((event) => event instanceof NavigationStart))
    //   .subscribe((event) => {
    //     console.log({ event });
    //     this.onRouteChangeLoader = true;
    //   });
    // this.router.events
    //   .pipe(filter((event) => event instanceof NavigationEnd))
    //   .subscribe((event) => {
    //     console.log({ event });
    //     this.onRouteChangeLoader = false;
    //   });
  }

  // Shows and hides the loading spinner during RouterEvent changes
  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.onRouteChangeLoader = true;
    }
    if (event instanceof NavigationEnd) {
      this.onRouteChangeLoader = false;
    }
    // Set loading state to false in both of the below events to hide the spinner in case a request fails
    if (event instanceof NavigationCancel) {
      this.onRouteChangeLoader = false;
    }
    if (event instanceof NavigationError) {
      this.onRouteChangeLoader = false;
    }
  }

  ngAfterViewInit(): void {
    // dynamically add component using view child
    // const componentRef = this.vcr.createComponent(UsersComponent);
    // componentRef.instance.age = 30;
    // console.log({ componentRef });
  }

  // reactive form by using FormGroup service
  // formGroup attribute value must be same as below loginForm variable and formControlName in template file must match with FormControl variable names
  // loginForm = new FormGroup({
  //   // email: new FormControl('ali@gmail.com'),
  //   // password: new FormControl('ali12345'),
  //   // email: new FormControl('', Validators.required), // for single validation
  //   // email: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]+$')]), // for multiple validations
  //   email: new FormControl('', [Validators.required, Validators.email]), // for multiple validations
  //   password: new FormControl('', [
  //     Validators.required,
  //     Validators.minLength(8),
  //   ]),
  // });

  initForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required, Validators.minLength(8)],
    });
  }
  // reactive form by using FormBuilder service
  // this.loginForm = this.fb.group({
  //   email: ['', Validators.required],
  //   password: ['', Validators.required, Validators.minLength(8)],
  // });

  get emailValidator() {
    return this.loginForm.get('email');
  }
  get passwordValidator() {
    return this.loginForm.get('password');
  }

  upperCase(str: string): string {
    return str.toUpperCase();
  }
  // login(values: any, controls: any) {
  //   console.log({ values, controls });
  // }
  signin() {
    console.log(this.loginForm.value);
  }

  login(values: any) {
    console.log({ values });
    this._usersData.saveUser(values).subscribe((user) => console.log({ user }));
  }

  // lazy load component
  async loadAdminList() {
    this.viewContainer.clear();
    const { ListComponent } = await import('../app/admin/list/list.component');
    this.viewContainer.createComponent(
      this.cfr.resolveComponentFactory(ListComponent)
    );
  }
  async loadUserList() {
    this.viewContainer.clear();
    const { ListComponent } = await import('../app/user/list/list.component');
    this.viewContainer.createComponent(
      this.cfr.resolveComponentFactory(ListComponent)
    );
  }
  async loadContact() {
    this.viewContainer.clear();
    const { ContactComponent } = await import(
      '../app/contact/contact.component'
    );
    this.viewContainer.createComponent(
      this.cfr.resolveComponentFactory(ContactComponent)
    );
  }
}
