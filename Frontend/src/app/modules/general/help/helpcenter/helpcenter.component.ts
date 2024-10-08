import {ActivatedRoute, Router, RouterLink, RouterOutlet} from "@angular/router";
import {NgClass, NgIf, NgOptimizedImage} from "@angular/common";
import {Component} from '@angular/core';
import {FooterComponent} from "../../../../layouts/footer/footer.component";

@Component({
  selector: 'app-helpcenter',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    NgOptimizedImage,
    NgClass,
    NgIf,
    FooterComponent
  ],
  templateUrl: './helpcenter.component.html',
  styleUrl: './helpcenter.component.css'
})
export class HelpcenterComponent {
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  isActive: boolean = false;

  toggleMenu(): void {
    this.isActive = !this.isActive;
  }

  isCorrectRoute():boolean {
    const currentUrl = this.router.url;
    return currentUrl === '/help-center';
  }
}
