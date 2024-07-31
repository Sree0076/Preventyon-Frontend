import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAdminModalComponent } from './add-admin-modal.component';
import { ForwardFormService } from '../../services/forward-form.service';
import { UserManagementService } from '../../services/user-management.service';
import { userDetails } from '../../models/users_forward_form.interface';
import { FilterPipe } from '../../pipes/filter.pipe';
import { FormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';

describe('AddAdminModalComponent', () => {
  let component: AddAdminModalComponent;
  let fixture: ComponentFixture<AddAdminModalComponent>;
  let forwardFormService: ForwardFormService;
  let userManagementService: UserManagementService;

  const mockUsers: userDetails[] = [
    { id: 1, user_icon: 'icons/user-icon-men.jpg', name: 'User One', department: 'IT', designation: 'Manager', email: 'userone@example.com' },
    { id: 2, user_icon: 'icons/user-icon-men.jpg', name: 'User Two', department: 'Development', designation: 'Developer', email: 'usertwo@example.com' }
  ];
  
  beforeEach(async () => {
    const forwardFormServiceMock = jasmine.createSpyObj('ForwardFormService', ['getAllUsers']);
    const userManagementServiceMock = jasmine.createSpyObj('UserManagementService', ['createUser']);

    await TestBed.configureTestingModule({
      imports: [
        AddAdminModalComponent,
        FilterPipe,
        FormsModule,
      ],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        ForwardFormService, UserManagementService]
    })
    .compileComponents();
    forwardFormService = TestBed.inject(ForwardFormService);
    userManagementService = TestBed.inject(UserManagementService);
    spyOn(forwardFormService, 'getAllUsers').and.returnValue(of(mockUsers));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAdminModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with user details from the service', () => {
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.user_details).toEqual(mockUsers);
  });

  it('should add a user to selectedUser when addUser is called', () => {
    component.addUser(mockUsers[0]);
    expect(component.selectedUser).toEqual(mockUsers[0]);
  });

  it('should remove selectedUser when removeUser is called', () => {
    component.selectedUser = mockUsers[0];
    component.removeUser();
    expect(component.selectedUser).toBeUndefined();
  });

  it('should disable the add button if no user is selected or no checkbox is checked', () => {
    expect(component.isAddButtonDisabled()).toBeTrue();
    component.selectedUser = mockUsers[0];
    expect(component.isAddButtonDisabled()).toBeTrue();
    component.checkboxes['incidentManagement'] = true;
    expect(component.isAddButtonDisabled()).toBeFalse();
  });

  it('should reset the form when resetForm is called', () => {
    component.selectedUser = mockUsers[0];
    component.checkboxes['incidentManagement'] = true;
    component.resetForm();
    expect(component.searchTerm).toBe('');
    expect(component.selectedUser).toBeUndefined();
    expect(component.checkboxes['incidentManagement']).toBeFalse();
    expect(component.checkboxes['adminManagement']).toBeFalse();
  });

});
