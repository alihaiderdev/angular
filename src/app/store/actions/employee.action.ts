import { EmployeeType } from './../../employee/employee-type';

export class AddEmployee {
  static readonly type = '[Employee] Add';
  constructor(public payload: EmployeeType) {}
}
export class GetEmployee {
  static readonly type = '[Employee] Get';
}
export class SetSelectedEmployee {
  static readonly type = '[Employee] Set';
  constructor(public id: number) {}
}
export class UpdateEmployee {
  static readonly type = '[Employee] Update';
  constructor(public payload: EmployeeType) {}
}
export class DeleteEmployee {
  static readonly type = '[Employee] Delete';
  constructor(public id: number) {}
}
