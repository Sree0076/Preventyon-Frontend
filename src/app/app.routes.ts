import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './pages/user-dashboard/user-dashboard.component';
import { IncidentReportFormComponent } from './components/incident-report-form/incident-report-form.component';
import { IncidentCreatePageComponent } from './pages/incident-create-page/incident-create-page.component';

import { IncidentVewPageComponent } from './pages/incident-vew-page/incident-vew-page.component';
import { AdminmanagementComponent } from './pages/adminmanagement/adminmanagement.component';
import { IncidenteditpageComponent } from './pages/incidenteditpage/incidenteditpage.component';
import { UserEditFormPageComponent } from './pages/user-edit-form-page/user-edit-form-page.component';
import { MsalGuard } from '@azure/msal-angular';
import { LoginComponent } from './components/login/login.component';


export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'admin', component: AdminDashboardComponent,canActivate: [MsalGuard] },
  { path: 'user', component: UserDashboardComponent},
  { path: 'create-incident', component: IncidentCreatePageComponent },
  { path: 'view-incident', component:IncidentVewPageComponent },
  { path: 'resolve-incident', component:IncidenteditpageComponent },
  { path: 'edit-incident', component:UserEditFormPageComponent },
  { path: 'usermanage', component: AdminmanagementComponent },
];
