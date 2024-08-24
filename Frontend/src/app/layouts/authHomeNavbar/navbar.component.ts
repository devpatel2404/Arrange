import {Component, OnInit} from '@angular/core';
import {NgClass, NgIf, NgOptimizedImage} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {UserService} from "../../core/Services/UserService/user.service";
import {AccountService} from "../../core/Services/AccountService/account.service";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    NgOptimizedImage,
    RouterLink,
    NgIf,
    NgClass
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  profileDropDown : boolean = false;
  isActive : boolean = false;

  constructor(protected userService : UserService, private accountService : AccountService, private router : Router) {}

  ngOnInit() {
    this.userService.getInfo();
  }

  toggleProfile() {
    this.profileDropDown = !this.profileDropDown;
  }

  toggleMenu() {
    this.isActive = !this.isActive;
  }

  isHome() {
    return this.router.url === "/authHome"
  }

  logOut() {
    this.accountService.logout();
  }
}
