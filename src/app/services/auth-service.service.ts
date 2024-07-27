import { Injectable, Inject, OnDestroy } from '@angular/core';
import {
  MsalService,
  MsalBroadcastService,
  MSAL_GUARD_CONFIG,
  MsalGuardConfiguration,
} from '@azure/msal-angular';
import {
  AuthenticationResult,
  PopupRequest,
  EventMessage,
  EventType,
  InteractionStatus,
} from '@azure/msal-browser';
import { BehaviorSubject, lastValueFrom, Observable, Subject } from 'rxjs';
import { filter, take, takeUntil, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Employee } from '../models/employee.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EmployeeDataServiceService } from './sharedService/employee-data.service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {
  private readonly _destroying$ = new Subject<void>();
   role : string ="";
  constructor(
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private authService: MsalService,
    private msalBroadcastService: MsalBroadcastService,
    private router: Router,
    private http: HttpClient,
    private employeeService : EmployeeDataServiceService,
  ) {
    this.initialize();
  }

  private initialize() {
    this.authService.handleRedirectObservable().subscribe();

    this.authService.instance.enableAccountStorageEvents();

    this.msalBroadcastService.msalSubject$
      .pipe(
        filter(
          (msg: EventMessage) =>
            msg.eventType === EventType.ACCOUNT_ADDED ||
            msg.eventType === EventType.ACCOUNT_REMOVED
        )
      )
      .subscribe((result: EventMessage) => {
        if (this.authService.instance.getAllAccounts().length === 0) {
          window.location.pathname = '/';

        } else {
          this.setLoginDisplay();
        }
      });

    this.msalBroadcastService.inProgress$
      .pipe(
        filter((status) => status === InteractionStatus.None),
        takeUntil(this._destroying$)
      )
      .subscribe(() => {
        this.setLoginDisplay();
        this.checkAndSetActiveAccount();
      });
  }

  private setLoginDisplay() {
    const loginDisplay = this.authService.instance.getAllAccounts().length > 0;
    if (loginDisplay) {
      this.redirectBasedOnRole();
    }
  }

  private checkAndSetActiveAccount() {
    let activeAccount = this.authService.instance.getActiveAccount();

    if (!activeAccount && this.authService.instance.getAllAccounts().length > 0) {
      let accounts = this.authService.instance.getAllAccounts();
      this.authService.instance.setActiveAccount(accounts[0]);
    }
  }

  private async redirectBasedOnRole() {
    const account = this.authService.instance.getActiveAccount();

    if (account?.idToken) {
      // Fetch employee data first
      await this.employeeService.fetchEmployeeData(account.idToken);
      // Then get roles
      await this.getRoles();

      // Perform the redirection based on the role
      if (account && account.idTokenClaims && account.idToken) {
        console.log(this.role);
        if (this.role === 'Admin' || this.role === 'SuperAdmin') {
          this.router.navigate(['/admin']);
        } else if (this.role === 'user') {
          this.router.navigate(['/user']);
        } else {
          this.router.navigate(['/unauthorized']);
        }
      }
    }
  }


  loginPopup() {
    if (this.msalGuardConfig.authRequest) {
      this.authService
        .loginPopup({ ...this.msalGuardConfig.authRequest } as PopupRequest)
        .subscribe((response: AuthenticationResult) => {
          this.authService.instance.setActiveAccount(response.account);

          this.redirectBasedOnRole(); // Redirect based on role after successful login
        });
    } else {
      this.authService
        .loginPopup()
        .subscribe((response: AuthenticationResult) => {
          this.authService.instance.setActiveAccount(response.account);

          this.redirectBasedOnRole(); // Redirect based on role after successful login
        });
    }
  }

  logout() {
    this.authService.logoutPopup({
      mainWindowRedirectUri: '/',
    });
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }

  getRoles(): Promise<void> {
    return lastValueFrom(
      this.employeeService.employeeData.pipe(
        tap(data => {
          if (data) {
            console.log(data);
            this.role = data.role.name;
          }
        }),
        take(1)  // Ensure the observable completes after one emission
      )
    ).then(() => {});

  }
}
