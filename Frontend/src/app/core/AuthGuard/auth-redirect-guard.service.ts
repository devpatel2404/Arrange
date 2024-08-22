import {Injectable} from '@angular/core';
import {CanActivate, MaybeAsync, Router} from "@angular/router";
import {AccountService} from "../Services/AccountService/account.service";

@Injectable({
  providedIn: 'root'
})
export class AuthRedirectGuardService implements CanActivate{

  constructor(private router: Router, private accService : AccountService) { }

  canActivate(): MaybeAsync<boolean> {
    if (this.accService.isLoggedIn()) {
      this.router.navigate(['/authHome'])
      return false;
    }

    return true;
  }
}
