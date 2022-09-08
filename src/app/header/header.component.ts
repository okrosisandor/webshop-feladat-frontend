import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {

username: string

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.username = this.userService.getUserName()
  }

  isLoggedIn() {
    return this.userService.isLoggedIn();
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/products']);
  }
}
