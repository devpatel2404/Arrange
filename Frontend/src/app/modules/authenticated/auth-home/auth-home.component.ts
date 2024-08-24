import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {AccountService} from "../../../core/Services/AccountService/account.service";
import {UserService} from "../../../core/Services/UserService/user.service";
import {UserResponse} from "../../../core/Models/UserResponse";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {NavbarComponent} from "../../../layouts/authHomeNavbar/navbar.component";

@Component({
  selector: 'app-auth-home',
  standalone: true,
  imports: [
    RouterOutlet,
    NgOptimizedImage,
    NavbarComponent,
    NgIf
  ],
  templateUrl: './auth-home.component.html',
  styleUrl: './auth-home.component.css'
})
export class AuthHomeComponent implements OnInit{
  firstTime: boolean = false;
  userInfo: UserResponse | undefined;

  constructor(private accountService: AccountService, protected userService: UserService) {}

  ngOnInit() {
    const hasVisited = localStorage.getItem('hasVisitedBefore');
    this.firstTime = !hasVisited; //if true have a tutorial
    if (!hasVisited) localStorage.setItem('hasVisitedBefore', 'true');
    this.userService.getInfo();
  }
}
//Tomorrow
  //Make AuthHome
  //Make Profile-Page
  //Make Settings-Page

//Next-Day
  //add aws s3 support, and start adding
