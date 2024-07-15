import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule} from '@angular/forms';
import { userDetails } from '../../models/users_forward_form.interface';
import { FilterPipe } from '../../pipes/filter.pipe';
import { NgFor, NgIf } from '@angular/common';
import { ForwardFormService } from '../../services/forward-form.service';

@Component({
  selector: 'app-forward-form',
  standalone: true,
  imports: [DialogModule, ButtonModule, InputTextModule,FormsModule,FilterPipe,NgFor,NgIf],
  templateUrl: './forward-form.component.html',
  styleUrl: './forward-form.component.scss'
})
export class ForwardFormComponent {

  breakpoints = {
    '1199px': '60vw',
    '900px': '70vw',
    '700px': '75vw',
    '595px': '90vw',
    '500px': '95vw',
    '460px': '99vw',
    '380px': '99vw'
  };

  @Output() dialogClosed = new EventEmitter<void>();
  @Input() visibility:boolean=false;

  user_details:userDetails[]=[];
  searchTerm:string='';
  selectedUsers: userDetails[] = [];
  message:string='';
  constructor(public forwardFormService : ForwardFormService){}

  ngOnInit():void{
    this.forwardFormService.getAllUsers().subscribe(data =>
    {
      this.user_details = data;
      console.log(data);
    }
    )
  }

    handleDialogClose() {
      this.dialogClosed.emit();
    }

    addUser(user: userDetails) {
      if (!this.selectedUsers.find(u => u.user_id === user.user_id)) {
        this.selectedUsers.push(user);
      }
    }

    // Remove user from the selected list
    removeUser(user: userDetails) {
      this.selectedUsers = this.selectedUsers.filter(u => u.user_id !== user.user_id);
    }

    // Get selected user IDs
    getSelectedUserIds(): number[] {
      return this.selectedUsers.map(user => user.user_id);
    }

    autoResize(event: Event): void {
      const textarea = event.target as HTMLTextAreaElement;
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`; // Set the height to match the scroll height

      // Check if the textarea is empty, then reset the height to 1 line
      if (!textarea.value) {
        textarea.style.height = 'auto'; // Reset to auto first to ensure proper resizing
        textarea.rows = 1; // Reset the rows attribute to 1 line
      }
    }

    forward(): void{
      console.log(this.selectedUsers);
      console.log(this.message);
      this.handleDialogClose();
      this.resetForm();
    }

    resetForm(): void {
      this.selectedUsers = [];
      this.searchTerm = '';
      this.message = '';
    }
}
