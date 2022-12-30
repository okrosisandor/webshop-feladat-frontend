import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-password-request',
  templateUrl: './password-request.component.html',
  styleUrls: ['./password-request.component.css'],
})
export class PasswordRequestComponent implements OnInit {
  hasError: boolean = false;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {}

  passwordRequestForm = new FormGroup({
    password: new FormControl('', Validators.required),
  });

  passwordHandler() {
    this.userService.validateUser(this.passwordRequestForm.value).subscribe(
      (res) => {
        console.log(res);

        if (res) {
          this.hasError = false;

          // Could even be set to sessionstorage to not ask everytime for validation
          this.userService.setUserValidated();

          this.router.navigate(['user/edit']);
        } else {
          this.hasError = true;

          setTimeout(() => {
            this.hasError = false;
          }, 3000);
        }
      },
      (err) => {}
    );
  }
}
