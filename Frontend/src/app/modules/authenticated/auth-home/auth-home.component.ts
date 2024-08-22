import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {AccountService} from "../../../core/Services/AccountService/account.service";
import {UserService} from "../../../core/Services/UserService/user.service";
import {UserResponse} from "../../../core/Models/UserResponse";
import {NgOptimizedImage} from "@angular/common";
import {NavbarComponent} from "../../../layouts/authHomeNavbar/navbar.component";

@Component({
  selector: 'app-auth-home',
  standalone: true,
  imports: [
    RouterOutlet,
    NgOptimizedImage,
    NavbarComponent
  ],
  templateUrl: './auth-home.component.html',
  styleUrl: './auth-home.component.css'
})
export class AuthHomeComponent implements OnInit{

  userInfo: UserResponse | undefined;

  constructor(private accountService: AccountService, protected userService: UserService) {}

  ngOnInit() {
    this.userService.getInfo();
  }
}
