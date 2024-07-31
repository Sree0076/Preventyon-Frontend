  import { Component } from '@angular/core';
  import { FilterPipe } from '../../pipes/filter.pipe';
  import { ForwardFormService } from '../../services/forward-form.service';
  import { userDetails } from '../../models/users_forward_form.interface';
  import { FormsModule } from '@angular/forms';
import { UserManagementService } from '../../services/user-management.service';

  @Component({
    selector: 'app-add-admin-modal',
    standalone: true,
    imports: [FilterPipe,FormsModule],
    templateUrl: './add-admin-modal.component.html',
    styleUrl: './add-admin-modal.component.scss'
  })
  export class AddAdminModalComponent {
    user_details:userDetails[]=[];
    searchTerm:string='';
    constructor(private forwardFormService : ForwardFormService, private usermanagement: UserManagementService){}
    selectedUser: userDetails |undefined;
    checkboxes: { [key: string]: boolean } = {
      'incidentManagement': false,
      'adminManagement': false
    };

    ngOnInit():void{
      this.forwardFormService.getAllUsers().subscribe(data =>
      {
        this.user_details = data;
        console.log(data);

      }
      )
    }
    addUser(user:userDetails){
      this.selectedUser=user;
    }
    removeUser(){
      this.selectedUser=undefined;
    }
    add(){
      if(this.selectedUser)
      {
      const data = {
        "employeeId": this.selectedUser.id,
        "assignedBy": 2,
        "isIncidentMangenet": this.checkboxes['incidentManagement'],
        "isUserMangenet": this.checkboxes['adminManagement'],
        "status": true,
      };
      this.usermanagement.createUser(data).subscribe((response) => {
        console.log('Incident added successfully', response);
      this.resetForm();
    });

    }
  }

    toggleCheckbox(key: string) {
      this.checkboxes[key] = !this.checkboxes[key];
    }

    isAddButtonDisabled(): boolean {
      return !(this.selectedUser && (this.checkboxes['incidentManagement'] || this.checkboxes['adminManagement']));
    }
    resetForm() {
      this.searchTerm = '';
      this.selectedUser = undefined;
      this.checkboxes = {
        'incidentManagement': false,
        'adminManagement': false
      };
    }

  }
