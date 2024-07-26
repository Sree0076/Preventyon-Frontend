import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MenuModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  userName: string = '';
  designation: string = '';
  role: string = '';
  items: MenuItem[] | undefined;

  constructor(private profileService: ProfileService) {}

  ngOnInit() {
    this.profileService.getUserData().subscribe((data) => {
      this.userName = data.name;
      this.designation = data.designation;
      this.role = data.role;
    });

    this.items = [
      // { label: 'Settings', icon: 'pi pi-cog' },
      { label: 'Logout', icon: 'bi bi-box-arrow-right' },
    ];
  }
}
