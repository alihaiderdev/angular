import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmployeeType } from './employee-type';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  url: string = `http://localhost:3000/employees`;
  departmentsUrl: string = `http://localhost:3000/departments`;

  constructor(private http: HttpClient) {}
  createEmployee(employee: EmployeeType) {
    return this.http.post<EmployeeType>(this.url, employee);
  }
  getAllEmployees() {
    return this.http.get<EmployeeType[]>(this.url);
  }
  getEmployeeById(id: number) {
    return this.http.get<EmployeeType>(`${this.url}/${id}`);
  }
  updateEmployee(id: number, employee: EmployeeType) {
    return this.http.patch(`${this.url}/${id}`, employee);
  }
  deleteEmployee(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
  getDepartmentList() {
    return this.http.get(`${this.departmentsUrl}`);
  }
}
