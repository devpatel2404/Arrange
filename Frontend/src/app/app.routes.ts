import { Routes } from '@angular/router';
import {LoginComponent} from "./modules/general/account/login/login.component";
import {HomeComponent} from "./modules/general/home/home.component";
import {ForgotpasswordComponent} from "./modules/general/account/forgotpassword/forgotpassword.component";
import {TermsComponent} from "./modules/general/Help/terms/terms.component";
import {PrivacyComponent} from "./modules/general/Help/privacy/privacy.component";
import {HelpcenterComponent} from "./modules/general/Help/helpcenter/helpcenter.component";
import {SupportComponent} from "./modules/general/Help/support/support.component";
import {CookiesPolicyComponent} from "./modules/general/Help/cookies-policy/cookies-policy.component";
import {FeaturesComponent} from "./modules/general/Help/features/features.component";
import {ManageAccountComponent} from "./modules/general/Help/manage-account/manage-account.component";
import {SignupComponent} from "./modules/general/account/signup/signup.component";
import {AboutComponent} from "./modules/general/Help/about/about.component";
import {AuthHomeComponent} from "./modules/authenticated/auth-home/auth-home.component";
import {AuthGuardService} from "./core/AuthGuard/auth-guard.service";
import {AuthRedirectGuardService} from "./core/AuthGuard/auth-redirect-guard.service";

export const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthRedirectGuardService]},
  { path: 'home', redirectTo: '', pathMatch: 'full', canActivate: [AuthRedirectGuardService]},
  { path: 'login', component: LoginComponent, canActivate: [AuthRedirectGuardService] },
  { path: 'signup', component:SignupComponent, canActivate: [AuthRedirectGuardService]},
  { path: 'forgot-password', component: ForgotpasswordComponent, canActivate: [AuthRedirectGuardService]},

  {path: 'help-center', component: HelpcenterComponent, children: [
      { path: 'terms', component: TermsComponent },
      { path: 'privacy-policy', component: PrivacyComponent },
      { path: 'support', component: SupportComponent },
      { path: 'cookies-policy', component: CookiesPolicyComponent },
      { path: 'features', component: FeaturesComponent},
      { path: 'manage-account', component: ManageAccountComponent},
      { path: 'about', component: AboutComponent}
    ]},

  {path: 'authHome', component: AuthHomeComponent, canActivate: [AuthGuardService]}
];
