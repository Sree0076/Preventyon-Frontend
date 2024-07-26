import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './pages/user-dashboard/user-dashboard.component';
import { IncidentReportFormComponent } from './components/incident-report-form/incident-report-form.component';
import { IncidentCreatePageComponent } from './pages/incident-create-page/incident-create-page.component';

import { IncidentVewPageComponent } from './pages/incident-vew-page/incident-vew-page.component';
import { AdminmanagementComponent } from './pages/adminmanagement/adminmanagement.component';
import { IncidenteditpageComponent } from './pages/incidenteditpage/incidenteditpage.component';
import { UserEditFormComponent } from './components/user-edit-form/user-edit-form.component';
import { EditIncidentFormComponent } from './components/edit-incident-form/edit-incident-form.component';
import { UserEditFormPageComponent } from './pages/user-edit-form-page/user-edit-form-page.component';
import { LoginComponent } from './models/login/login.component';
import { MsalGuard } from '@azure/msal-angular';


export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'admin', component: AdminDashboardComponent },
  { path: 'user', component: UserDashboardComponent, canActivate: [MsalGuard]},
  { path: 'create-incident', component: IncidentCreatePageComponent },
  { path: 'view-incident', component:IncidentVewPageComponent },
  { path: 'resolve-incident', component:IncidenteditpageComponent },
  { path: 'edit-incident', component:UserEditFormPageComponent },
  { path: 'usermanage', component: AdminmanagementComponent },
];
