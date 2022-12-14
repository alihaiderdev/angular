import {
  AfterContentInit,
  Component,
  ContentChild,
  OnInit,
} from '@angular/core';
import { EmployeeComponent } from './../employee/employee.component';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
  // providers: [UsersService], // make local instance of a service and all components that will be the part of this container component just look at thier own scope first if it found any local instance then its ok otherwise go one level up for checking for its parent in our case this container component but if in the parent component can not have its own local instance then it will no go one level up its just through an error module not found
})
export class ContainerComponent implements OnInit, AfterContentInit {
  @ContentChild(EmployeeComponent) employee!: EmployeeComponent;
  // @Host() private usersService: UsersService
  constructor() {}
  ngAfterContentInit(): void {
    console.log(this.employee);
    this.employee.employeeName = 'Hasnain Anwar';
  }

  ngOnInit(): void {}
}
