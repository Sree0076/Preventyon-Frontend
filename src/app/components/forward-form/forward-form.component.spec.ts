import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForwardFormComponent } from './forward-form.component';
import { provideRouter, Router} from '@angular/router';
import { IncidentDataServiceTsService } from '../../services/sharedService/incident-data.service.ts.service';
import { ForwardFormService } from '../../services/forward-form.service';
import { FilterPipe } from '../../pipes/filter.pipe';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { userDetails } from '../../models/users_forward_form.interface';

describe('ForwardFormComponent', () => {
  let component: ForwardFormComponent;
  let fixture: ComponentFixture<ForwardFormComponent>;
  let forwardFormService: jasmine.SpyObj<ForwardFormService>;
  let incidentService: jasmine.SpyObj<IncidentDataServiceTsService>;
  let router: Router;

  beforeEach(async () => {
    const forwardFormSpy = jasmine.createSpyObj('ForwardFormService', ['getAllUsers', 'forwardIncident']);
    const incidentServiceSpy = jasmine.createSpyObj('IncidentDataServiceTsService', ['selectedIncidentId$']);


    await TestBed.configureTestingModule({
      imports: [ForwardFormComponent,
        FormsModule,
        DialogModule,
        ButtonModule,
        InputTextModule,
        FilterPipe
      ],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        { provide: ForwardFormService, useValue: forwardFormSpy },
        { provide: IncidentDataServiceTsService, useValue: incidentServiceSpy }
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForwardFormComponent);
    component = fixture.componentInstance;
    forwardFormService = TestBed.inject(ForwardFormService) as jasmine.SpyObj<ForwardFormService>;
    incidentService = TestBed.inject(IncidentDataServiceTsService) as jasmine.SpyObj<IncidentDataServiceTsService>;
    router = TestBed.inject(Router);

    forwardFormService.getAllUsers.and.returnValue(of([]));
    incidentService.selectedIncidentId$ = of(1);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch users on init', () => {
    expect(forwardFormService.getAllUsers).toHaveBeenCalled();
    expect(component.user_details.length).toBe(0);
  });

  it('should update forwardIncidentId on incident selection', () => {
    expect(component.forwardIncidentId).toBe(1);
  });

  it('should add user to selectedUsers array', () => {
    const user: userDetails = {
      id: 1,
      user_icon: 'icons/user-icon-men.jpg',
      name: 'John Doe',
      department: 'IT',
      designation: 'Developer',
      email: 'john.doe@example.com'
    };
    component.addUser(user);
    expect(component.selectedUsers.length).toBe(1);
    expect(component.selectedUsers[0]).toEqual(user);
  });

  it('should not add duplicate user to selectedUsers array', () => {
    const user: userDetails = {
      id: 1,
      user_icon: 'icons/user-icon-men.jpg',
      name: 'John Doe',
      department: 'IT',
      designation: 'Developer',
      email: 'john.doe@example.com'
    };
    component.addUser(user);
    component.addUser(user);
    expect(component.selectedUsers.length).toBe(1);
  });

  it('should remove user from selectedUsers array', () => {
    const user: userDetails = {
      id: 1,
      user_icon: 'icons/user-icon-men.jpg',
      name: 'John Doe',
      department: 'IT',
      designation: 'Developer',
      email: 'john.doe@example.com'
    };
    component.addUser(user);
    component.removeUser(user);
    expect(component.selectedUsers.length).toBe(0);
  });

  it('should forward incident and navigate to admin', () => {
    const routerSpy = spyOn(router, 'navigate');
    forwardFormService.forwardIncident.and.returnValue(of({}));

    component.forwardIncidentId = 1;
    component.selectedUsers = [{
      id: 1,
      user_icon: 'icons/user-icon-men.jpg',
      name: 'John Doe',
      department: 'IT',
      designation: 'Developer',
      email: 'john.doe@example.com'
    }];
    component.forward();

    expect(forwardFormService.forwardIncident).toHaveBeenCalledWith(1, [1]);
    expect(routerSpy).toHaveBeenCalledWith(['/admin']);
  });

  it('should reset form after forwarding', () => {
    const routerSpy = spyOn(router, 'navigate');
    forwardFormService.forwardIncident.and.returnValue(of({}));

    component.forwardIncidentId = 1;
    component.selectedUsers = [{
      id: 1,
      user_icon: 'icons/user-icon-men.jpg',
      name: 'John Doe',
      department: 'IT',
      designation: 'Developer',
      email: 'john.doe@example.com'
    }];
    component.forward();

    expect(component.selectedUsers.length).toBe(0);
    expect(component.searchTerm).toBe('');
    expect(component.message).toBe('');
  });

  it('should adjust textarea height on input', () => {
    const textarea = document.createElement('textarea');
    textarea.value = 'test message';
    const event = { target: textarea } as unknown as Event;

    component.autoResize(event);
    expect(textarea.style.height).toBe(`${textarea.scrollHeight}px`);
  });

  it('should reset textarea height if empty', () => {
    const textarea = document.createElement('textarea');
    textarea.value = '';
    const event = { target: textarea } as unknown as Event;

    component.autoResize(event);
    expect(textarea.style.height).toBe('auto');
    expect(textarea.rows).toBe(1);
  });
});
