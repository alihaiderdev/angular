import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs';
import { EmployeeType } from './../../employee/employee-type';
import { EmployeeService } from './../../employee/employee.service';
import { GetEmployee, SetSelectedEmployee } from './../actions/employee.action';

export class EmployeeStateModel {
  employees!: EmployeeType[];
  employeeLoaded!: boolean;
  selectedEmployee!: EmployeeType;
}

@State<EmployeeStateModel>({
  name: 'employees',
  defaults: {
    employees: [],
    employeeLoaded: false,
    selectedEmployee: { name: '', department: '', position: '' },
  },
})
@Injectable()
export class EmployeeState {
  constructor(private employeeService: EmployeeService) {}
  // selectors has logic to get state data
  @Selector()
  static getEmployeeList(state: EmployeeStateModel) {
    return state.employees;
  }
  @Selector()
  static getEmployeesLoadedInfo(state: EmployeeStateModel) {
    return state.employeeLoaded;
  }
  @Selector()
  static getSelectedEmployee(state: EmployeeStateModel) {
    return state.selectedEmployee;
  }
  @Action(GetEmployee)
  getEmployees({ getState, setState }: StateContext<EmployeeStateModel>) {
    // this.employeeService.getAllEmployees().subscribe((data) => {
    //   console.log({ data });
    // });
    return this.employeeService.getAllEmployees().pipe(
      tap((data) => {
        const state = getState();
        setState({ ...state, employees: data, employeeLoaded: true });
      })
    );
  }
  @Action(SetSelectedEmployee)
  setSelectedEmployee(
    { getState, setState }: StateContext<EmployeeStateModel>,
    { id }: SetSelectedEmployee
  ) {
    const state = getState();
    const selectedEmployee = state.employees.find(
      (employee) => employee.id === id
    );
    if (state.employees.length > 0) {
      setState({ ...state, selectedEmployee: selectedEmployee! });
      return;
    } else {
      return this.employeeService.getEmployeeById(id).pipe(
        tap((res: EmployeeType) => {
          const state = getState();
          setState({ ...state, employees: [res], selectedEmployee: res });
        })
      );
    }

    // return this.employeeService.getAllEmployees().pipe(
    //   tap((data) => {
    //     const state = getState();
    //     setState({ ...state, employees: data, employeeLoaded: true });
    //   })
    // );
  }
}
