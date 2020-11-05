import { RoleService } from './../services/role.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { state } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private router: Router, private http: HttpClient, private cookieService: CookieService, private roleService: RoleService) {
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      return this.roleService.findUserRole(this.cookieService.get('sessionuser')).pipe(map(res =>
      {
        if (res['data'].role === 'admin')
        {
          return true;
        }
        else
        {
          this.router.navigate(['/']);
          return false;
        }
      }));
    }
  }
