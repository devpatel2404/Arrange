import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot
} from "@angular/router";
import {AccountService} from "../accountService/account.service";

@Injectable({
  providedIn: 'root'
})
export class AuthRedirectGuardService implements CanActivate{

  constructor(private router: Router, private accService : AccountService) { }

  canActivate(): MaybeAsync<boolean> {
    if (this.accService.getToken()) {
      this.router.navigate(['/authHome'])
      return false;
    }

    return true;
  }
}
