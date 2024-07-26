import { ApplicationConfig, provideZoneChangeDetection,importProvidersFrom, } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient,  withInterceptorsFromDi,HTTP_INTERCEPTORS,withFetch, } from '@angular/common/http';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import { IncidentDataServiceTsService } from './services/sharedService/incident-data.service.ts.service';
import { IncidentServiceService } from './services/incident-service.service';
import { ForwardFormService } from './services/forward-form.service';
import { ChartDataService } from './services/chart-data.service';
import {
  IPublicClientApplication,
  PublicClientApplication,
  InteractionType,
  BrowserCacheLocation,
  LogLevel,
} from '@azure/msal-browser';
import {
  MsalInterceptor,
  MSAL_INSTANCE,
  MsalInterceptorConfiguration,
  MsalGuardConfiguration,
  MSAL_GUARD_CONFIG,
  MSAL_INTERCEPTOR_CONFIG,
  MsalService,
  MsalGuard,
  MsalBroadcastService,
} from '@azure/msal-angular';
import { environment } from '../environments/environment';

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: environment.msalConfig.auth.clientId,
      authority: environment.msalConfig.auth.authority,
      redirectUri: '/',
      postLogoutRedirectUri: '/',
    },
    cache: {
      cacheLocation: BrowserCacheLocation.LocalStorage,
    },
    system: {
      allowNativeBroker: false, // Disables WAM Broker
      // loggerOptions: {
      //   loggerCallback,
      //   logLevel: LogLevel.Info,
      //   piiLoggingEnabled: false,
      // },
    },
  });
}

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();
  protectedResourceMap.set(
    environment.apiConfig.uri,
    environment.apiConfig.scopes
  );

  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap,
  };
}

export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    authRequest: {
      scopes: [...environment.apiConfig.scopes],
    },
    loginFailedRoute: '/login-failed',
  };
}

export const appConfig: ApplicationConfig = {

  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideClientHydration(),
    provideHttpClient(),
    DatePipe,
    IncidentDataServiceTsService,
    IncidentServiceService,
    ForwardFormService,
    ChartDataService,

    provideHttpClient(withInterceptorsFromDi(), withFetch()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true,
    },
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory,
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useFactory: MSALGuardConfigFactory,
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MSALInterceptorConfigFactory,
    },
    MsalService,
    MsalGuard,
    MsalBroadcastService,
  ],
};
