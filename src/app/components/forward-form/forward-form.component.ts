import { Component } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule} from '@angular/forms';
import { userDetails } from '../../models/users_forward_form.interface';
import { FilterPipe } from '../../pipes/filter.pipe';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-forward-form',
  standalone: true,
  imports: [DialogModule, ButtonModule, InputTextModule,FormsModule,FilterPipe,NgFor,NgIf],
  templateUrl: './forward-form.component.html',
  styleUrl: './forward-form.component.scss'
})
export class ForwardFormComponent {
  visible: boolean = false;

  showDialog() {
      this.visible = true;
  }
  searchTerm:string='';

  user_details:userDetails[]=[
      {
        user_id: 1,
        user_icon: "icons/user-icon-men.jpg",
        user_name: "John Doe",
        user_role: "Software Engineer",
        user_email: "john.doe@experionglobal.com"
      },
      {
        user_id: 2,
        user_icon: "icons/user-icon-men.jpg",
        user_name: "Jane Smith",
        user_role: "Project Manager",
        user_email: "jane.smith@experionglobal.com"
      },
      {
        user_id: 3,
        user_icon: "icons/user-icon-women.png",
        user_name: "Alice Jones",
        user_role: "UX Designer",
        user_email: "alice.jones@experionglobal.com"
      },
      {
        user_id: 4,
        user_icon: "icons/user-icon-men.jpg",
        user_name: "Mike Brown",
        user_role: "DevOps Engineer",
        user_email: "mike.brown@experionglobal.com"
      },
      {
        user_id: 5,
        user_icon: "icons/user-icon-women.png",
        user_name: "Emily Clark",
        user_role: "Quality Assurance Engineer",
        user_email: "emily.clark@experionglobal.com"
      },
      {
        user_id: 6,
        user_icon: "icons/user-icon-men.jpg",
        user_name: "Chris Lee",
        user_role: "Data Scientist",
        user_email: "chris.lee@experionglobal.com"
      },
      {
        user_id: 7,
        user_icon: "icons/user-icon-women.png",
        user_name: "Sarah Wilson",
        user_role: "Product Manager",
        user_email: "sarah.wilson@experionglobal.com"
      },
      {
        user_id: 8,
        user_icon: "icons/user-icon-men.jpg",
        user_name: "David Martin",
        user_role: "System Administrator",
        user_email: "david.martin@experionglobal.com"
      },
      {
        user_id: 9,
        user_icon: "icons/user-icon-women.png",
        user_name: "Laura Taylor",
        user_role: "Business Analyst",
        user_email: "laura.taylor@experionglobal.com"
      },
      {
        user_id: 10,
        user_icon: "icons/user-icon-men.jpg",
        user_name: "James Anderson",
        user_role: "Chief Technology Officer",
        user_email: "james.anderson@experionglobal.com"
      },
      {
        user_id: 11,
        user_icon: "icons/user-icon-women.png",
        user_name: "Jomi Susan Mathew",
        user_role: "Trainee",
        user_email: "jomi.susan.mathew@experionglobal.com"
      },
      {
        user_id: 12,
        user_icon: "icons/user-icon-men.jpg",
        user_name: "Sreejith Shaji",
        user_role: "Trainee",
        user_email: "sreejith.shaji@experionglobal.com"
      },
      {
        user_id: 13,
        user_icon: "icons/user-icon-women.png",
        user_name: "Shadiya V S",
        user_role: "Trainee",
        user_email: "shadiya.vs@experionglobal.com"
      },
      {
        user_id: 14,
        user_icon: "icons/user-icon-men.jpg",
        user_name: "Nevin Joseph",
        user_role: "Trainee",
        user_email: "nevin.joseph@experionglobal.com"
      },
      {
        user_id: 15,
        user_icon: "icons/user-icon-men.jpg",
        user_name: "Sujith S J",
        user_role: "Trainee",
        user_email: "sujith.sj@experionglobal.com"
      },
      {
        user_id: 16,
        user_icon: "icons/user-icon-women.png",
        user_name: "Devipriya M S",
        user_role: "Trainee",
        user_email: "devipriya.ms@experionglobal.com"
      },
      {
        user_id: 17,
        user_icon: "icons/user-icon-men.jpg",
        user_name: "Imrankhan A M",
        user_role: "Trainee",
        user_email: "imrankhan.am@experionglobal.com"
      }
    ];

    selectedUsers: userDetails[] = [];
    addUser(user: userDetails) {
      if (!this.selectedUsers.find(u => u.user_id === user.user_id)) {
        user.isSelected = true;
        this.selectedUsers.push(user);
      }
    }
  
    // Remove user from the selected list
    removeUser(user: userDetails) {
      this.selectedUsers = this.selectedUsers.filter(u => u.user_id !== user.user_id);
      // Also reset the isSelected property
      this.user_details.find(u => u.user_id === user.user_id)!.isSelected = false;
    }
  
    // Get selected user IDs
    getSelectedUserIds(): number[] {
      return this.selectedUsers.map(user => user.user_id);
    }


    // autoResize(event: Event): void {
    //   const textarea = event.target as HTMLTextAreaElement;
    //   textarea.style.height = `${textarea.scrollHeight}px`; // Set the height to match the scroll height
    // }

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
    
  
}
