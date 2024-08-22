import {Injectable} from '@angular/core';
import {CanActivate, MaybeAsync, Router,} from "@angular/router";
import {AccountService} from "../Services/AccountService/account.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private accService: AccountService, private router: Router) { }

  canActivate(): MaybeAsync<boolean> {
    if (!this.accService.isLoggedIn()) {
      return this.redirectToLogin();
    }
    return true;
  }

  private redirectToLogin(): Promise<boolean> {
    return new Promise( (resolve) => {
      this.router.navigate(['/login'])
      resolve(false);
    });
  }
}
