import { Component } from '@angular/core';
import { BadgeModule } from 'primeng/badge';
import { AuthService } from '../../services/auth-service.service';
import { Router } from '@angular/router';
import { EmployeeDataServiceService } from '../../services/sharedService/employee-data.service.service';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [BadgeModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent {


dasboard() {
  this.employeeService.employeeData.subscribe(data => {
    if (data) {

      if(data.role.name=="SuperAdmin")
      {
        console.log(data.role.name);
        this.router.navigate(['/admin']);
      }
      else{
        this.router.navigate(['/user']);
      }

    }
  });

}


  constructor(
    private router: Router,
    private authService: AuthService,
    private employeeService : EmployeeDataServiceService, // Inject AuthService
  ) {


  }
  logout() {
    console.log("logout");
    this.authService.logout();
  }
}
