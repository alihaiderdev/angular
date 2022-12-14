import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { User } from '../../models/user';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user-list',
  template: `
    <h1>{{ title }}</h1>
    <li
      *ngFor="
        let user of users | filter: price;
        let e = even;
        let o = odd;
        let i = index
      "
      class="flex items-center justify-between py-2"
      [class.selected]="isSelected(user)"
    >
      {{ user | json }}
      <div>
        <button
          class="bg-indigo-600 text-white px-4 py-2 rounded-md ml-2"
          (click)="userSelected(user)"
        >
          Select {{ user.id }}
        </button>
        <button
          class="bg-red-600 text-white px-4 py-2 rounded-md ml-2"
          (click)="deleteUser(user)"
        >
          Delete
        </button>
        <!-- <button
          class="bg-indigo-600 text-white px-4 py-2 rounded-md ml-2"
          (click)="onSelectRedirect(user)"
        >
          Update {{ user.id }}
        </button> -->
        <button
          [routerLink]="['/users', user.id]"
          class="bg-indigo-600 text-white px-4 py-2 rounded-md ml-2"
        >
          Update {{ user.id }}
        </button>
        <button
          [routerLink]="['/bookings', user.id]"
          class="bg-indigo-600 text-white px-4 py-2 rounded-md ml-2"
        >
          Book {{ user.id }}
        </button>

        <!-- <a [routerLink]="['/path']" routerLinkActive="active">name</a> -->
      </div>
    </li>
  `,
  styles: [
    `
      .selected {
        background-color: yellowgreen;
      }
    `,
  ],
  // changeDetection: ChangeDetectionStrategy.Default, // default behavior of angular when anywhere change occurs in application the whole application re render
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent implements OnInit, OnChanges, OnDestroy {
  selectedId: string | number = '';
  @Input() users: User[] = [];
  @Input() title: string = '';
  @Input() price: number = 0;
  @Output() selectedUser = new EventEmitter<User>();

  // @Output() deleteUser = new EventEmitter<User>();
  // @Output() updateUser = new EventEmitter<User>();
  constructor(
    private usersService: UsersService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnDestroy(): void {
    console.log('ngOnDestroy');
  }

  // we can only use ngOnChanges life hook in any component or directive where input decorator @Input() is available and get newValue
  ngOnChanges(changes: SimpleChanges): void {
    // throw new Error('Method not implemented.');
    // console.log(changes);

    if (changes['title'] && !changes['title'].firstChange) {
      this.title = changes['title'].currentValue.toUpperCase();
    }
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id')!);
      this.selectedId = id;
    });
  }

  userSelected(user: User): void {
    this.selectedUser.emit(user);
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

  isSelected(user: User) {
    return user.id === this.selectedId;
  }
}
