import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user: any = {
    email: '',
    password: '',
  };
  loginData: any;
  alreadySubmitted = false

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {}

  loginForm = new FormGroup({
    email: new FormControl(
      '',
      Validators.compose([Validators.required, Validators.email])
    ),
    password: new FormControl('', Validators.required),
  });

  loginHandler() {

    this.alreadySubmitted = true

    setTimeout(() => {
      this.alreadySubmitted = false
    }, 3000)

    this.user = this.loginForm.value;

    this.userService.login(this.user).subscribe(
      (res) => {
        this.loginData = res;
        console.log(res)

        if (this.loginData != null) {
          localStorage.setItem('token', this.loginData.accessToken);
          this.router.navigate(['products']);
        }
      },
      (err) => {
        this.loginForm.controls["email"].setErrors({'incorrect': true});
        this.loginForm.controls["email"].setErrors({'incorrect': true});
        console.log(err)
      }
    );
  }

  // return this.http
  //   .post('http://localhost:8086/users/login', this.user)
  //   .subscribe((res) => {
  //     console.log(res);
  //     this.token = res;
  //     console.log(this.token)

  //     console.log(jwt_decode(this.token.accessToken));
  //   });

  loginFormControl() {
    return this.loginForm.controls;
  }
}
