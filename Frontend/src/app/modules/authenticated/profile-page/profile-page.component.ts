import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, RouterOutlet} from '@angular/router';
import {UserService} from "../../../core/Services/UserService/user.service";
import {NavbarComponent} from "../../../layouts/authHomeNavbar/navbar.component";
import {NgIf} from "@angular/common";
import {UserResponse} from "../../../core/Models/UserResponse";

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [
    NavbarComponent,
    RouterOutlet,
    NgIf
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css'
})
export class ProfilePageComponent implements OnInit{
  username : string  = '';
  notFound : boolean = false;
  currUser : boolean = false;
  User : UserResponse | null = null;
  constructor(private route : ActivatedRoute, protected userService : UserService) {
  }
  ngOnInit() {
    this.userService.getInfo();
    this.route.paramMap.subscribe(params => {
      const username
        = params.get('username');
      if (username) {
        this.username = username;
        this.fetchUserProfile();

      } else {
        this.notFound = true;
      }
    });
  }

  private fetchUserProfile() {
    if (this.notLongEnough()) {
      this.userService.findUser(this.username).subscribe({
        next: (user) => {
          this.User = user;

        },
        error: (error) => {
          this.notFound = true
          console.log('Error fetching user profile: ' + error.message);
        }
      });
      this.currUser = (this.User?.username == this.userService.getUsername());
    }
  }

    notLongEnough () : boolean {
      return this.username.length >= 8;
    }
}
