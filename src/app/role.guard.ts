import { Injectable, Inject } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './services/auth-service.service';
import { EmployeeDataServiceService } from './services/sharedService/employee-data.service.service';
import { from, Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class roleGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private employeeService: EmployeeDataServiceService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const expectedRoles = route.data['expectedRoles'] as string[];

    return from(this.authService.getRoles()).pipe(
      switchMap(() => {
        const userRole = this.authService.role;
        console.log("role:",userRole);
        if (expectedRoles.includes(userRole)) {
          return of(true);
        }
          return of(false);
        
      }),
      catchError(() => {
        this.router.navigate(['/unauthorized']);
        return of(false);
      })
    );
  }
}
