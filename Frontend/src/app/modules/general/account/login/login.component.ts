import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {RouterLink, RouterOutlet} from "@angular/router";
import {FooterComponent} from "../../footer/footer.component";
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {AccountService} from "../../../../core/accountService/account.service";
import {HttpErrorResponse} from "@angular/common/http";
import {NgIf} from "@angular/common";
import {data} from "autoprefixer";

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
  errorMessage: string | null = null;

  onSubmit() {
    if (this.loginForm.valid) {
      this.accountService.login(this.loginForm.value).subscribe({
        next: (response) => {
          //show success and redirect when the info is collected
          this.accountService.setToken(response.token);
          this.router.navigate(['/authHome']);
        },
        error: (err) => {
          //show error message
          this.errorMessage = 'Login failed. Please try again.';
        }
      });
    }
  }

  get password() {
    return this.loginForm.get('password');
  }

  get emailOrUsername() {
    return this.loginForm.get('emailOrUsername')
  }

  checkError() {
    const control = this.loginForm.controls;
    for (let key in control) {
      if (control[key].errors){
        console.log(control[key].errors)
      }
    }
  }

  toggleVisibility() : void {
    console.error(this.loginForm.getRawValue());
    this.visible = ! this.visible;
  }
}
