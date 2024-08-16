import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-manage-account',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  templateUrl: './manage-account.component.html',
  styleUrl: '../General.css'
})
export class ManageAccountComponent {

}
