import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { DepartmentType } from './../models/user';
import { GetDepartments } from './../store/actions/department.action';
import { GetEmployee } from './../store/actions/employee.action';
import { DepartmentState } from './../store/state/department.state';
import { EmployeeState } from './../store/state/employee.state';
import { EmployeeType } from './employee-type';
import { EmployeeService } from './employee.service';

declare var window: any;

@Component({
  selector: 'app-employee',
  template: `
    <div class="d-flex align-items-center justify-content-between px-4 py-2">
      <h1 class="m-0">{{ employeeName }}</h1>
      <!-- (click)="open(content)" -->
      <button
        class="btn btn-lg btn-outline-primary btn-sm"
        type="button"
        data-toggle="modal"
        data-target="#exampleModalCenter"
        (click)="addEmployee()"
      >
        Add Employee
      </button>
    </div>

    <section class="container">
      {{ employeeForm.value | json }}
      {{ employeeForm.valid | json }}
      <form [formGroup]="employeeForm" (ngSubmit)="onSubmit()">
        <mat-form-field class="w-full" appearance="fill">
          <mat-label>Name</mat-label>
          <input
            type="text"
            matInput
            formControlName="name"
            placeholder="Enter your name"
          />
        </mat-form-field>
        <mat-form-field class="w-full" appearance="fill">
          <mat-label>Position</mat-label>
          <input
            type="text"
            matInput
            formControlName="position"
            placeholder="Enter your position"
          />
        </mat-form-field>
        <mat-form-field appearance="fill" class="w-full">
          <mat-label>Department</mat-label>
          <mat-select formControlName="department">
            <mat-option>None</mat-option>
            <!-- let department of departments -->
            <mat-option
              *ngFor="let department of departments$ | async"
              [value]="department.name"
            >
              {{ department.name }}
            </mat-option>
          </mat-select>
        </mat-form-field>
        <button class="btn btn-primary" type="submit">
          {{ editMode ? 'Update' : 'Add' }}
        </button>
      </form>
      <div class="row">
        <!-- *ngFor="let employee of employees" -->

        <div
          class="col-sm col-md-6 col-lg-4 col-xl-3 mb-4"
          *ngFor="let employee of employees$ | async"
        >
          <div class="card" style="width: 100%">
            <div class="card-body">
              <!-- [routerLink]="['/users', user.id]" -->
              <a [routerLink]="['/employees', employee.id]">
                {{ employee.name }}
              </a>
              <p>
                <span>
                  {{ employee.position }}
                </span>
                <span class="mr-2">|</span>
                <span
                  class="text-black px-2 py-1"
                  [ngClass]="{
                    'bg-indigo-600': employee.department === 'SDS',
                    'bg-indigo-300': employee.department === 'Concave'
                  }"
                >
                  {{ employee.department }}
                </span>
              </p>

              <button
                type="button"
                class="btn btn-primary btn-sm text-black"
                data-toggle="modal"
                data-target="#exampleModalCenter"
                (click)="updateEmployee(employee)"
              >
                Update
              </button>
              <button
                type="button"
                (click)="deleteEmployee(employee.id!)"
                class="ml-4 btn btn-danger btn-sm text-black"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- [class.show]="showModal" -->
    <div
      class="modal fade show"
      id="exampleModalCenter"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              (click)="closeModal()"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <!-- <form [formGroup]="employeeForm" (ngSubmit)="onSubmit()">
              <mat-form-field class="w-full" appearance="fill">
                <mat-label>Name</mat-label>
                <input
                  type="text"
                  matInput
                  formControlName="name"
                  placeholder="Enter your name"
                />
              </mat-form-field>
              <mat-form-field class="example-full-width" appearance="fill">
                <mat-label>Position</mat-label>
                <input
                  type="text"
                  matInput
                  formControlName="position"
                  placeholder="Enter your position"
                />
              </mat-form-field>

              <mat-form-field appearance="fill">
                <mat-label>Department</mat-label>
                <mat-select>
                  <mat-option
                    *ngFor="let department of departments"
                    [value]="department.name"
                    formControlName="department"
                  >
                    {{ department.name }}
                  </mat-option>
                </mat-select>
              </mat-form-field>
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
                (click)="closeModal()"
              >
                Close
              </button>
              <button class="btn btn-primary">Save changes</button>
            </form> -->
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class EmployeeComponent implements OnInit {
  employeeName: string = 'Ali Haider';
  employees: EmployeeType[] = [];
  // employees$ = this.employeeService.getAllEmployees();
  employeeForm!: FormGroup;
  showModal: boolean = false;
  editMode: boolean = false;
  modal: any;
  departments: DepartmentType[] = [];
  selectedId!: number;
  subscription!: Subscription;
  selected: string = 'SDS';
  // ngsx state data accessing start
  @Select(EmployeeState.getEmployeeList) employees$!: Observable<
    EmployeeType[]
  >;
  @Select(EmployeeState.getEmployeesLoadedInfo)
  employeesLoaded$!: Observable<boolean>;

  @Select(DepartmentState.getDepartmentList) departments$!: Observable<
    DepartmentType[]
  >;
  @Select(DepartmentState.getDepartmentsLoadedInfo)
  departmentsLoaded$!: Observable<boolean>;
  // ngsx state data accessing end

  constructor(
    private employeeService: EmployeeService,
    private fb: FormBuilder,
    private store: Store
  ) {}

  observer = {
    next: (value: any) => {
      console.log({ value });
      this.getAllEmployees();
    },
    error: (error: any) => {
      console.log({ error });
    },
    complete: () => {
      console.log('Completed');
    },
  };

  openModel() {
    // this.showModal = true;
    // this.modal.show();
    this.editMode = false;
    this.employeeForm.reset({
      name: '',
      position: '',
      department: 'SDS',
    });
  }

  closeModal() {
    // this.showModal = false;
    this.modal.hide();
    this.editMode = false;
  }

  ngOnInit(): void {
    // this.employees$.subscribe((res) => {
    //   console.log({ res });
    //   this.employees = res;
    // });
    this.modal = new window.bootstrap.Modal(
      document.getElementById('exampleModalCenter')
    );
    this.getAllEmployees();
    this.getDepartmentList();

    this.employeeForm = this.fb.group({
      name: ['', [Validators.required]],
      position: ['', [Validators.required]],
      department: ['SDS', [Validators.required]],
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getDepartmentList() {
    this.subscription = this.departmentsLoaded$.subscribe(
      (departmentsLoaded) => {
        if (!departmentsLoaded) {
          this.store.dispatch(new GetDepartments());
        }
      }
    );
    // this.employeeService.getDepartmentList().subscribe((data) => {
    //   this.departments = data;
    // });
  }

  addEmployee() {
    this.openModel();
  }

  getAllEmployees() {
    this.subscription = this.employeesLoaded$.subscribe((employeesLoaded) => {
      if (!employeesLoaded) {
        this.store.dispatch(new GetEmployee());
      }
    });
    // this.subscription = this.employeeService
    //   .getAllEmployees()
    //   .subscribe((data) => {
    //     this.employees = data;
    //   });
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      if (this.editMode) {
        console.log(this.employeeForm.value, 'this.employeeForm.value');

        this.employeeService
          .updateEmployee(this.selectedId, this.employeeForm.value)
          .subscribe(
            (data) => {
              this.getAllEmployees();
            },
            (error) => {
              console.log({ error });
            }
            // this.observer
          );
      } else {
        this.employeeService.createEmployee(this.employeeForm.value).subscribe(
          (data) => {
            this.getAllEmployees();
          },
          (error) => {
            console.log({ error });
          }
        );
      }
    }
  }

  deleteEmployee(id: number) {
    if (confirm('Are you sure you want delete this record!')) {
      this.employeeService.deleteEmployee(id).subscribe(
        (data) => {
          this.getAllEmployees();
        },
        (error) => {
          console.log({ error });
        }
        // this.observer
      );
    }
  }

  updateEmployee(employee: EmployeeType) {
    this.selectedId = employee.id!;
    // this.openModel();
    this.editMode = true;
    this.employeeForm.patchValue(employee);
  }
}
