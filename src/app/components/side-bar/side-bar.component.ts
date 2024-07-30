import { Component, Input, ViewChild } from '@angular/core';
import { BadgeModule } from 'primeng/badge';
import { NotificationModalComponent } from '../notification-modal/notification-modal.component';
import { CommonModule } from '@angular/common';

import { AuthService } from '../../services/auth-service.service';
import { Router } from '@angular/router';
import { EmployeeDataServiceService } from '../../services/sharedService/employee-data.service.service';
import { Employee } from '../../models/employee.interface';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [BadgeModule,NotificationModalComponent, CommonModule],
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
  private employeeService : EmployeeDataServiceService, // Inject AuthService
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
      if(this.isUserManagement)
        {
          this.isAdmin=true;
        }
      }
  });
}

dasboard() {
  if(this.employeeData.role.name=="SuperAdmin" && !this.isUserSwitched)
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
