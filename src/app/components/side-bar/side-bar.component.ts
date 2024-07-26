import { Component } from '@angular/core';
import { BadgeModule } from 'primeng/badge';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ProfileComponent } from '../profile/profile.component';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [BadgeModule, MenuModule, ButtonModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss',
})
export class SideBarComponent {
  // items: MenuItem[] = [
  //   { label: 'Profile', icon: 'pi pi-user', command: () => this.openProfile() },
  //   { label: 'Logout', icon: 'pi pi-sign-out' },
  // ];
  constructor(public dialog: MatDialog) {}

  // openProfile(): void {
  //   this.dialog.open(ProfileComponent, {
  //     width: '400px',
  //     maxHeight: '400px',
  //   });
  // }
  openProfile(event: MouseEvent): void {
    const dialogConfig = new MatDialogConfig();

    const dialogWidth = 250; // Set a fixed width for the dialog
    const dialogHeight = 150; // Estimate the dialog height

    // Calculate top and left positions
    const dialogTop = event.clientY - dialogHeight - 20;
    const dialogLeft = event.clientX / 2;

    dialogConfig.position = {
      top: `${dialogTop}px`,
      left: `${dialogLeft}px`,
    };
    dialogConfig.width = `${dialogWidth}px`;
    dialogConfig.hasBackdrop = true;
    dialogConfig.backdropClass = 'backdropBackground';

    this.dialog.open(ProfileComponent, dialogConfig);
  }
}
