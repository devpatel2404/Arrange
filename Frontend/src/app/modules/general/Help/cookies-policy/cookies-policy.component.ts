import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-cookies-policy',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './cookies-policy.component.html',
  styleUrl: '../General.css'
})
export class CookiesPolicyComponent {

}
