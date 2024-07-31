import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { UserEditFormComponent } from './user-edit-form.component';
import { IncidentServiceService } from '../../services/incident-service.service';
import { IncidentDataServiceTsService } from '../../services/sharedService/incident-data.service.ts.service';
import { DatePipe } from '@angular/common';
import { MessageService } from 'primeng/api';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { EmployeeDataServiceService } from '../../services/sharedService/employee-data.service.service';
import { IncidentStatsDTO } from '../../models/incidentData.interface';
import { Employee, Role } from '../../models/employee.interface';

describe('UserEditFormComponent', () => {
  let service: IncidentDataServiceTsService;
  let incidentServiceSpy: jasmine.SpyObj<IncidentServiceService>;
  let employeeDataServiceSpy: jasmine.SpyObj<EmployeeDataServiceService>;

  beforeEach(async () => {
    const incidentServiceSpyObj = jasmine.createSpyObj('IncidentServiceService', ['getDataBasedOnStatus']);
    const employeeDataServiceSpyObj = jasmine.createSpyObj('EmployeeDataServiceService', ['employeeData']);

    await TestBed.configureTestingModule({
      imports: [
        UserEditFormComponent,
        ReactiveFormsModule,
        FormsModule,
      ],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        DatePipe,
        IncidentDataServiceTsService,
        { provide: IncidentServiceService, useValue: incidentServiceSpyObj },
        { provide: EmployeeDataServiceService, useValue: employeeDataServiceSpyObj }
      ]
    }).compileComponents();

    service = TestBed.inject(IncidentDataServiceTsService);
    incidentServiceSpy = TestBed.inject(IncidentServiceService) as jasmine.SpyObj<IncidentServiceService>;
    employeeDataServiceSpy = TestBed.inject(EmployeeDataServiceService) as jasmine.SpyObj<EmployeeDataServiceService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize incidentData and selectedIncidentId$', () => {
    service.incidentData.subscribe(data => {
      expect(data).toBeNull();
    });
    service.selectedIncidentId$.subscribe(id => {
      expect(id).toBe(0);
    });
  });

  it('should fetch and set incident data', () => {
    const mockIncidentData: IncidentStatsDTO = {
      privacyTotalIncidents: 10,
      privacyPendingIncidents: 2,
      privacyClosedIncidents: 8,
      securityTotalIncidents: 15,
      securityPendingIncidents: 3,
      securityClosedIncidents: 12,
      qualityTotalIncidents: 5,
      qualityPendingIncidents: 1,
      qualityClosedIncidents: 4,
      incidents: [],
      assignedIncidents: [],
      yearlyIncidentCounts: {}
    };

    const mockRole: Role = {
      id: 1,
      name: 'Admin',
      permission: {
        id: 1,
        permissionName: 'Full Access',
        incidentManagement: true,
        userManagement: true,
        incidentCreateOnly: false
      }
    };
    const mockEmployeeData: Employee = {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      department: 'IT',
      designation: 'Software Engineer',
      roleId: 1,
      role: mockRole,
      createdAt: new Date('2024-01-01T12:00:00Z'),
      updatedAt: new Date('2024-07-01T12:00:00Z')
    };

    employeeDataServiceSpy.employeeData = of(mockEmployeeData);
    incidentServiceSpy.getDataBasedOnStatus.and.returnValue(of(mockIncidentData));

    // service.fetchIncidentData();

    service.incidentData.subscribe(data => {
      expect(data).toEqual(mockIncidentData);
    });
  });

  it('should update selected incident ID', () => {
    service.setSelectedIncidentId(42);

    service.selectedIncidentId$.subscribe(id => {
      expect(id).toBe(42);
    });
  });

});

