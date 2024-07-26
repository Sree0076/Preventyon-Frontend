import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import { IncidentDataServiceTsService } from './services/sharedService/incident-data.service.ts.service';
import { IncidentServiceService } from './services/incident-service.service';
import { ForwardFormService } from './services/forward-form.service';
import { ChartDataService } from './services/chart-data.service';



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
    ChartDataService, provideAnimationsAsync(),
  ],
};
