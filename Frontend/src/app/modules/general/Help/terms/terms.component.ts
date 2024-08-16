import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-terms',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  templateUrl: './terms.component.html',
  styleUrl: '../General.css'
})
export class TermsComponent {

}
