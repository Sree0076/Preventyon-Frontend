import { Component } from '@angular/core';
import { SideBarComponent } from "../../components/side-bar/side-bar.component";
import { UserEditFormComponent } from "../../components/user-edit-form/user-edit-form.component";

@Component({
  selector: 'app-user-edit-form-page',
  standalone: true,
  imports: [SideBarComponent, UserEditFormComponent],
  templateUrl: './user-edit-form-page.component.html',
  styleUrl: './user-edit-form-page.component.scss'
})
export class UserEditFormPageComponent {

}
