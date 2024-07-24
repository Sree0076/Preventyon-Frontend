

import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user-management.interface';
import { UserManagementService } from '../../services/user-management.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { AddAdminModalComponent } from "../add-admin-modal/add-admin-modal.component";

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf, CommonModule, AddAdminModalComponent],
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
})
export class UserManagementComponent implements OnInit {
  users: any[] = [];
  filteredUsers: any[] = [];
  nameFilter: string = '';
  statusFilter: 'all' | 'active' | 'inactive' = 'all';

  constructor(private userManagementService: UserManagementService) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.userManagementService.getUsers().subscribe((users) => {
      this.users = users;
      this.filteredUsers = users;
    });
  }

  filterUsers(): void {
    this.filteredUsers = this.users.filter(
      (user) =>
        user.name.toLowerCase().includes(this.nameFilter.toLowerCase()) &&
        (this.statusFilter === 'all' || user.status === this.statusFilter)
    );
  }

  toggleStatus(user: User): void {
    if (user.isEditing) {
      user.status = user.status === 'active' ? 'inactive' : 'active';
    }
  }

  saveUser(user: User): void {
    if (user.id === undefined) {
      // New user, send POST request
      this.userManagementService.createUser(user).subscribe((newUser) => {
        this.users.push(newUser);
        this.filterUsers();
        console.log('Created new user:', JSON.stringify(newUser, null, 2));
      });
    } else {
      // Existing user, send PUT request
      this.userManagementService.updateUser(user.id, user).subscribe((updatedUser) => {
        const index = this.users.findIndex((u) => u.id === updatedUser.id);
        this.users[index] = updatedUser;
        this.filterUsers();
        console.log('Updated user:', JSON.stringify(updatedUser, null, 2));
      });
    }
    user.isEditing = false;
  }

  editUser(user: User): void {
    user.isEditing = true;
  }
}



