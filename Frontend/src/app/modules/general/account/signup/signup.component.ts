import {Component} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {FooterComponent} from "../../../../layouts/footer/footer.component";
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {AccountService} from "../../../../core/Services/AccountService/account.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    FooterComponent,
    FormsModule,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  form : FormGroup;
  visible: boolean = false;
  constructor(private accountService: AccountService, private router: Router, private formbuilder: FormBuilder) {
    this.form = formbuilder.group({
      username: ['', new FormControl([Validators.required, Validators.minLength(8), Validators.maxLength(20)])],
      password: ['', new FormControl([Validators.required, Validators.minLength(8), Validators.maxLength(30)])],
      name: ['', new FormControl(Validators.required)],
      email: ['', new FormControl([Validators.required, Validators.maxLength(320), Validators.minLength(10)])]
    })
  }

  onSubmit(){
    if (this.form.valid) {
      this.accountService.signup(this.form.value).subscribe({
        next: (response) => {
          //show success and delaya few seconds
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error(err);
        }
      })
    }
  }

  get username() {
    return this.form.get('username');
  }

  get password() {
    return this.form.get('password');
  }

  get name() {
    return this.form.get('name');
  }

  get email() {
    return this.form.get('email');
  }

  toggleVisible() {
    this.visible = !this.visible;
  }
}
