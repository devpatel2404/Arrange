import {Component} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {FooterComponent} from "../../../../layouts/footer/footer.component";
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {AccountService} from "../../../../core/Services/AccountService/account.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterOutlet,
    FooterComponent,
    FormsModule,
    RouterLink,
    ReactiveFormsModule,
    NgIf,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm : FormGroup;
  visible: boolean = false;
  constructor(private accountService: AccountService, private router: Router, private fb:FormBuilder) {
    this.loginForm = this.fb.group({
      emailOrUsername: ['', new FormControl([Validators.required, Validators.maxLength(40), Validators.minLength(8)])],
      password: ['', new FormControl([Validators.required, Validators.maxLength(30), Validators.minLength(8)])]
    })
  }
  errorMessage: boolean = false;

  onSubmit() {
    if (this.loginForm.valid) {
      this.accountService.login(this.loginForm.value).subscribe({
        next: (response) => {this.router.navigate(['/authHome']); },
        error: (err) => { console.log(err) }
      });
    }
  }

  get password() {
    return this.loginForm.get('password');
  }

  get emailOrUsername() {
    return this.loginForm.get('emailOrUsername')
  }

  toggleVisibility() : void {
    this.visible = ! this.visible;
  }
}
