import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { SetSelectedEmployee } from './../../store/actions/employee.action';
import { EmployeeState } from './../../store/state/employee.state';
import { EmployeeType } from './../employee-type';
import { EmployeeService } from './../employee.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss'],
})
export class EmployeeDetailsComponent implements OnInit, OnDestroy {
  employeeId!: number;
  employee!: EmployeeType;
  subscription!: Subscription;

  @Select(EmployeeState.getSelectedEmployee)
  selectedEmployee$!: Observable<EmployeeType>;
  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private store: Store,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((param) => {
      // this.employeeId = parseInt(param.get('id')!);
      this.getEmployeeById(parseInt(param.get('id')!));
    });
    // this.employeeService.getEmployeeById(this.employeeId).subscribe((data) => {
    //   this.employee = data;
    // });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getEmployeeById(id: number) {
    this.store.dispatch(new SetSelectedEmployee(id));
    this.subscription = this.selectedEmployee$.subscribe((res) => {
      this.employee = res;
    });
    // this.employeeService.getEmployeeById(id).subscribe((data) => {
    //   this.employee = data;
    // });
  }
  goBack() {
    this.router.navigateByUrl('/employees');
  }
}
