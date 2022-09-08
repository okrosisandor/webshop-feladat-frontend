import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  user: any;
  alreadySubmitted = false;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {

    this.userService.getUser(this.userService.getUserName()).subscribe(
      (res) => {
        this.user = res;

        this.updateForm.setValue({
          firstName: this.user.firstName,
          lastName: this.user.lastName,
          email: this.userService.getUserName(),
          password: '',
          confirmPassword: '',
          country: this.user.userAddress.country,
          city: this.user.userAddress.city,
          zipCode: this.user.userAddress.zipCode,
          address: this.user.userAddress.address,
          phone: this.user.userAddress.phone,
        });
      },
      (err) => {
      }
    );
  }

  updateForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    country: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    zipCode: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
  });

  updateHandler() {
    this.alreadySubmitted = true;

    this.user = {
      firstName: this.updateForm.value.firstName,
      lastName: this.updateForm.value.lastName,
      email: this.updateForm.value.email,
      password: this.updateForm.value.password,
      confirmPassword: this.updateForm.value.confirmPassword,
      userAddress: {
        country: this.updateForm.value.country,
        city: this.updateForm.value.city,
        zipCode: this.updateForm.value.zipCode,
        address: this.updateForm.value.address,
        phone: this.updateForm.value.phone,
      },
    };

    if (
      this.updateForm.value.password !== this.updateForm.value.confirmPassword
    ) {
      this.updateForm.controls['password'].setErrors({ incorrect: true });
      this.updateForm.controls['confirmPassword'].setErrors({ incorrect: true });
      return;
    }

    if (this.updateForm.valid) {
      this.userService.updateUser(this.user).subscribe(
        (res) => {
          this.user = res;
          this.router.navigate(['/products']);
        },
        (err) => {
        }
      );
    }
  }

  updateFormControl() {
    return this.updateForm.controls;
  }
}
