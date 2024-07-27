import { Component, Input, ViewChild } from '@angular/core';
import { BadgeModule } from 'primeng/badge';
import { NotificationModalComponent } from '../notification-modal/notification-modal.component';
import { CommonModule } from '@angular/common';

import { AuthService } from '../../services/auth-service.service';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [BadgeModule,NotificationModalComponent, CommonModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent {


  constructor(
    private authService: AuthService, // Inject AuthService
  ) {}
  logout() {
    console.log("logout");
    this.authService.logout();
  }
}
