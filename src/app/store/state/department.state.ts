import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs';
import { EmployeeService } from './../../employee/employee.service';
import { GetDepartments } from './../actions/department.action';

export class DepartmentStateModel {
  //   departments!: DepartmentType[];
  departments!: any;
  departmentsLoaded!: boolean;
}

@State<DepartmentStateModel>({
  name: 'departments',
  defaults: { departments: [], departmentsLoaded: false },
})
@Injectable()
export class DepartmentState {
  constructor(private employeeService: EmployeeService) {}
  @Selector()
  static getDepartmentList(state: DepartmentStateModel) {
    return state.departments;
  }
  @Selector()
  static getDepartmentsLoadedInfo(state: DepartmentStateModel) {
    return state.departmentsLoaded;
  }
  @Action(GetDepartments)
  getDepartments({ getState, setState }: StateContext<DepartmentStateModel>) {
    return this.employeeService.getDepartmentList().pipe(
      tap((data) => {
        const state = getState();
        setState({ ...state, departments: data, departmentsLoaded: true });
      })
    );
  }
}
