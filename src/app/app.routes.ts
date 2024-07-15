import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './pages/user-dashboard/user-dashboard.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { IncidentReportFormComponent } from './components/incident-report-form/incident-report-form.component';
import { IncidentCreatePageComponent } from './pages/incident-create-page/incident-create-page.component';
import { IncidentVewPageComponent } from './pages/incident-vew-page/incident-vew-page.component';
import { AdminmanagementComponent } from './pages/adminmanagement/adminmanagement.component';

export const routes: Routes = [
  { path: 'admin', component: AdminDashboardComponent },
  { path: 'user', component: UserDashboardComponent },
  { path: '', component: DashboardComponent },
  { path: 'form', component: IncidentReportFormComponent },
  { path: 'view-incident', component:IncidentVewPageComponent },
  { path: 'form/:action', component: IncidentCreatePageComponent },
  { path: 'usermanage', component: AdminmanagementComponent },

];
