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
import { roleGuard } from './role.guard';


export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'admin', component: AdminDashboardComponent, canActivate: [MsalGuard, roleGuard], data: { expectedRoles: ['Admin-Incidents','Admins-User', 'SuperAdmin'] } },
  { path: 'user', component: UserDashboardComponent, canActivate: [MsalGuard, roleGuard], data: { expectedRoles: ['user', 'Admin-Incidents','Admins-User', 'SuperAdmin'] } },
  { path: 'create-incident', component: IncidentCreatePageComponent, canActivate: [MsalGuard, roleGuard], data: { expectedRoles: ['user', 'Admin-Incidents','Admins-User', 'SuperAdmin'] } },
  { path: 'view-incident', component: IncidentVewPageComponent, canActivate: [MsalGuard, roleGuard], data: { expectedRoles: ['user', 'Admin-Incidents','Admins-User', 'SuperAdmin'] } },
  { path: 'resolve-incident', component: IncidenteditpageComponent, canActivate: [MsalGuard, roleGuard], data: { expectedRoles: ['Admin-Incidents','Admins-User', 'SuperAdmin'] } },
  { path: 'edit-incident', component: UserEditFormPageComponent, canActivate: [MsalGuard, roleGuard], data: { expectedRoles: ['user','Admins-User', 'Admin-Incidents', 'SuperAdmin'] } },
  { path: 'usermanage', component: AdminmanagementComponent, canActivate: [MsalGuard, roleGuard], data: { expectedRoles: ['Admins-User', 'SuperAdmin'] } }
];
