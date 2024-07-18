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
    var selectedUsers:userDetails[] = items.filter(user => !selectedUserIds.includes(user.id)); // Exclude already selected users

    if (!searchTerm) {
      // return [];
      return selectedUsers;
    }
    searchTerm = searchTerm.toLowerCase();
    return selectedUsers.filter(it => {
        return it.name.toLowerCase().includes(searchTerm) ||
               it.designation.toLowerCase().includes(searchTerm) ||
               it.email.toLowerCase().includes(searchTerm);
      });
  }
}
