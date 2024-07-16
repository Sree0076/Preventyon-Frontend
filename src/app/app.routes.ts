import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './pages/user-dashboard/user-dashboard.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { IncidentReportFormComponent } from './components/incident-report-form/incident-report-form.component';

import { IncidentCreatePageComponent } from './pages/incident-create-page/incident-create-page.component';
import { ViewIncidentFormComponent } from './components/view-incident-form/view-incident-form.component';
import { EditIncidentFormComponent } from './components/edit-incident-form/edit-incident-form.component';
import { CardComponent } from './components/card/card.component';

export const routes: Routes = [
  { path: 'admin', component: AdminDashboardComponent },
  { path: 'user', component: UserDashboardComponent },
  { path: '', component: DashboardComponent },
  { path: 'form', component: IncidentReportFormComponent },
  { path: 'view-incident/:id', component: ViewIncidentFormComponent },
  { path: 'form/:action', component: IncidentCreatePageComponent },
  { path: 'edit-form/:id', component: EditIncidentFormComponent },
];
