import {Component} from '@angular/core';
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  templateUrl: './features.component.html',
  styleUrl: '../General.css'
})
export class FeaturesComponent {

}
