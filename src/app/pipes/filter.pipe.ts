import { Pipe, PipeTransform } from '@angular/core';
import { userDetails } from '../models/users_forward_form.interface';

@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterPipe implements PipeTransform {

  transform(items: userDetails[], searchTerm: string, selectedUserIds: number[]): userDetails[] {
    if (!items) {
      return [];
    }
    var selectedUsers:userDetails[] = items.filter(user => !selectedUserIds.includes(user.user_id)); // Exclude already selected users

    if (!searchTerm) {
      // return [];
      return selectedUsers;
    }
    searchTerm = searchTerm.toLowerCase();
    return selectedUsers.filter(it => {
        return it.user_name.toLowerCase().includes(searchTerm) ||
               it.user_role.toLowerCase().includes(searchTerm) ||
               it.user_email.toLowerCase().includes(searchTerm);
      });
  }
}
