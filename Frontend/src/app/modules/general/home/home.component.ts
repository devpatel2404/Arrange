import { Component } from '@angular/core';
import {FooterComponent} from "../../../layouts/footer/footer.component";
import {NgOptimizedImage} from "@angular/common";
import {RouterLink, RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FooterComponent,
    NgOptimizedImage,
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrl: 'home.component.css'
})
export class HomeComponent {

}
