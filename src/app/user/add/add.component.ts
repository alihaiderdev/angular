import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {
  user: User = { email: '', name: '', password: 'password' };
  successMessage: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;
  constructor(private userService: UsersService) {}

  ngOnInit(): void {}

  addUser(addUserForm: NgForm) {
    this.isLoading = true;
    this.userService.saveUser(this.user).subscribe(
      (data) => {
        this.successMessage = 'User created successfully!';
        // addUserForm.reset();
        // addUserForm.resetForm(this.user); // this will not work
        addUserForm.resetForm({ email: '', name: '', password: 'password' });
        this.isLoading = false;
        this.dismissMessages();
      },
      (error) => {
        this.errorMessage = error.message;
        this.isLoading = false;
        this.dismissMessages();
      }
    );
  }
  dismissMessages(time: number = 3000): void {
    setTimeout(() => {
      this.successMessage = '';
      this.errorMessage = '';
    }, time);
  }
}
