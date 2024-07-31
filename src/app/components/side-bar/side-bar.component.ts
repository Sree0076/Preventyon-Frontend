import { Component, Input, ViewChild } from '@angular/core';
import { BadgeModule } from 'primeng/badge';
import { NotificationModalComponent } from '../notification-modal/notification-modal.component';
import { CommonModule } from '@angular/common';

import { AuthService } from '../../services/auth-service.service';
import { Router } from '@angular/router';
import { EmployeeDataServiceService } from '../../services/sharedService/employee-data.service.service';
import { Employee } from '../../models/employee.interface';
import { IncidentDataServiceTsService } from '../../services/sharedService/incident-data.service.ts.service';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [BadgeModule,NotificationModalComponent, CommonModule,OverlayPanelModule,ButtonModule,AvatarModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent {

switchtouserdashboard() {



  if(this.isAdmin && !this.isUserSwitched)
  {
    this.isAdmin=false;
    this.employeeService.setUserSwitch(true);

    this.router.navigate(['/user']);
  }
  else
  {
    console.log('switching');
    this.incidentDataService.fetchIncidentData(false);
    this.employeeService.setUserSwitch(false);
    this.router.navigate(['/admin']);
  }

}
isAdmin :boolean =false;
isUserSwitched :boolean =false;
employeeData !: Employee;
isUserManagement:boolean=false;
constructor(
  private router: Router,
  private authService: AuthService,
  private employeeService : EmployeeDataServiceService,
  private incidentDataService: IncidentDataServiceTsService // Inject AuthService
) {


}

ngOnInit() {

  this.employeeService.userSwitch.subscribe(value => {
    this.isUserSwitched = value;

  });

  this.employeeService.employeeData.subscribe(data => {
    if (data) {
     this.isUserManagement= data.role.permission.userManagement;
     console.log("management",this.isUserManagement);
      this.employeeData=data;
      if(this.isUserManagement || data.role.permission.incidentManagement)
        {
          this.isAdmin=true;
        }
      }
  });
  this.incidentDataService.navigateToDashboard$.subscribe(() => {
    this.dasboard();
  });
}

dasboard() {
  const adminRoles = ['SuperAdmin', 'Admin-Incidents','Admins-User'];
  if(adminRoles.includes(this.employeeData.role.name)   && !this.isUserSwitched)
    {

      console.log(this.employeeData.role.name);
      this.router.navigate(['/admin']);
    }
    else{
      this.router.navigate(['/user']);
    }

}
usermanage() {
  this.router.navigate(['/usermanage']);
  }

logout() {
  console.log("logout");
  this.authService.logout();
}

}
