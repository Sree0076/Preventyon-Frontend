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
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {
  private readonly _destroying$ = new Subject<void>();

  constructor(
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private authService: MsalService,
    private msalBroadcastService: MsalBroadcastService,
    private router: Router,
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

  private redirectBasedOnRole() {
    // Assuming roles are part of the idTokenClaims
    const account = this.authService.instance.getActiveAccount();
    if (account && account.idTokenClaims) {
      const roles = account.idTokenClaims['roles'] || [];
      console.log(roles);
        this.router.navigate(['/user']);
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
}
