import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  user: any;
  errors: any;
  alreadySubmitted = false;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {}

  registerForm = new FormGroup({
    email: new FormControl(
      '',
      Validators.compose([Validators.required, Validators.email])
    ),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    zipCode: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    role: new FormControl('user', Validators.required),
  });

  registerHandler() {
    this.alreadySubmitted = true;

    this.user = {
      email: this.registerForm.value.email,
      firstName: this.registerForm.value.firstName,
      lastName: this.registerForm.value.lastName,
      password: this.registerForm.value.password,
      confirmPassword: this.registerForm.value.confirmPassword,
      selectedRole: this.registerForm.value.role,
      userAddress: {
        country: this.registerForm.value.country,
        city: this.registerForm.value.city,
        zipCode: this.registerForm.value.zipCode,
        address: this.registerForm.value.address,
        phone: this.registerForm.value.phone,
      },
    };

    this.userService.register(this.user).subscribe(
      (res) => {
        this.router.navigate(["login"])
      },
      (err) => {
        this.errors = err.error;
      }
    );
  }

  registerFormControl() {
    return this.registerForm.controls;
  }
}
