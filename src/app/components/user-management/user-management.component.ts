import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserManagementService } from '../../services/user-management.service';
import { AddAdminModalComponent } from "../add-admin-modal/add-admin-modal.component";
import { EmployeeDataServiceService } from '../../services/sharedService/employee-data.service.service';
import { Admin, UpdateAdmin } from '../../models/user-management.interface';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-user-management',
  standalone: true,
  providers:[ConfirmationService,MessageService],
  imports: [FormsModule, CommonModule, AddAdminModalComponent,ConfirmDialogModule,
    ToastModule],
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
})
export class UserManagementComponent implements OnInit {
  users: Admin[] = [];
  filteredUsers: Admin[] = [];
  nameFilter: string = '';
  statusFilter: 'all' | 'active' | 'inactive' = 'all';

  constructor(
    private userManagementService: UserManagementService,
    private employeeDataService: EmployeeDataServiceService,
    private confirmationService: ConfirmationService,
     private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.employeeDataService.employeeData.subscribe((data) => {
      if (data) {
        this.userManagementService.getUsers(data.id).subscribe((users) => {
          this.users = users;
          console.log(users);
          this.filteredUsers = users;
        });
      }
    });
  }

  filterUsers(): void {
    this.filteredUsers = this.users.filter(
      (user) =>
        user.employeeName.toLowerCase().includes(this.nameFilter.toLowerCase()) &&
        (this.statusFilter === 'all' ||
          (this.statusFilter === 'active' && user.status) ||
          (this.statusFilter === 'inactive' && !user.status))
    );
  }

  toggleStatus(user: Admin): void {
    if (user.isEditing) {
      user.status = !user.status;
    }
  }

  saveUser(user: Admin): void {
    user.isEditing = false;
    let adminData: UpdateAdmin = {
      adminId: user.adminId,
      isIncidentMangenet: user.isIncidentMangenet,
      isUserMangenet: user.isUserMangenet,
      status: user.status,
    };
    this.userManagementService.updateUser(user.adminId, adminData).subscribe(
      (updatedUser) => {
          this.showSuccess("Admin data updated Succesfully");
          this.filterUsers();

          console.log('Updated user:', JSON.stringify(updatedUser, null, 2));
        }
    );
  }

  editUser(user: Admin): void {
    user.isEditing = true;
  }
  cancelEdit(user: Admin)
  {
    user.isEditing = false;
  }

  onApproval(user: Admin ) {

    this.confirmationService.confirm({
      header: 'Are you sure?',
      message: 'Please confirm to proceed.',
      accept: () => {

       this.saveUser(user);
      },
      reject: () => {

      }
  });
  }
  showSuccess(message: string) {
    console.log(message);
    setTimeout(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: `${message}`,
      });
      setTimeout(() => {
         this.fetchUsers();
      }, 2000);
    }, 100);
  }
}
