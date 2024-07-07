import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './pages/user-dashboard/user-dashboard.component';

export const routes: Routes = [
  {path: 'admin', component:AdminDashboardComponent},
  {path: 'user', component:UserDashboardComponent},
];
