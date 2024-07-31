import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { ConfirmationService, MessageService } from 'primeng/api';
import { IncidentReportFormComponent } from './incident-report-form.component';
import { IncidentServiceService } from '../../services/incident-service.service';
import { EmployeeDataServiceService } from '../../services/sharedService/employee-data.service.service';
import { ToastModule } from 'primeng/toast';
import { FileUploadModule } from 'primeng/fileupload';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MatDialog } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { IncidentData } from '../../models/incidentData.interface';
import { DatePipe } from '@angular/common';
import { Employee } from '../../models/employee.interface';
// Mocks
class MockIncidentServiceService {
  //   addIncident = jasmine.createSpy('addIncident').and.returnValue(of({
  //     id: 1,
  //     incidentNo: 'INC123',
  //     incidentTitle: 'Test Incident',
  //     incidentDescription: 'Test Description',
  //     reportedBy: 'John Doe',
  //     roleOfReporter: 'Tester',
  //     incidentOccuredDate: new Date(),
  //     monthYear: '07/2024',
  //     incidentType: 'Type1',
  //     category: 'Category1',
  //     priority: 'High',
  //     actionAssignedTo: 'Jane Smith',
  //     deptOfAssignee: 'IT',
  //     investigationDetails: 'Test Investigation',
  //     associatedImpacts: 'Test Impact',
  //     collectionOfEvidence: 'Test Evidence',
  //     correction: 'Test Correction',
  //     correctiveAction: 'Test Action',
  //     correctionCompletionTargetDate: '2024-07-30',
  //     correctionActualCompletionDate: '2024-07-29',
  //     correctiveActualCompletionDate: '2024-07-28',
  //     incidentStatus: 'Open',
  //     correctionDetailsTimeTakenToCloseIncident: 5,
  //     correctiveDetailsTimeTakenToCloseIncident: 3,
  //     isDraft: false,
  //     isCorrectionFilled: true,
  //     IsSubmittedForReview: true,
  //     employeeId: 1,
  //     documentUrls: 'http://example.com/doc1,http://example.com/doc2',
  //     createdAt: '2024-07-29T00:00:00Z',
  //   }));
  addIncident = jasmine
    .createSpy('addIncident')
    .and.returnValue(of({} as IncidentData));
  updateIncident = jasmine
    .createSpy('updateIncident')
    .and.returnValue(of({} as IncidentData));
  getSingleIncident = jasmine
    .createSpy('getSingleIncident')
    .and.returnValue(of({} as IncidentData));
  getSingleFullIncident = jasmine
    .createSpy('getSingleFullIncident')
    .and.returnValue(of({} as IncidentData));
  getAssignedIncident = jasmine
    .createSpy('getAssignedIncident')
    .and.returnValue(of({} as IncidentData));
  updateUserIncident = jasmine
    .createSpy('updateUserIncident')
    .and.returnValue(of({}));
  submitForUser = jasmine.createSpy('submitForUser').and.returnValue(of({}));
  getDataBasedOnStatus = jasmine
    .createSpy('getDataBasedOnStatus')
    .and.returnValue(of([]));
}
 
class MockEmployeeDataServiceService {
  //   employeeData = of({ id: 1 });
  fetchEmployeeData = jasmine
    .createSpy('fetchEmployeeData')
    .and.returnValue(Promise.resolve({} as Employee));
  getEmployeeData = jasmine
    .createSpy('getEmployeeData')
    .and.returnValue(of({} as Employee));
}
 
class MockMessageService {
  add = jasmine.createSpy('add');
}
 
class MockConfirmationService {
  confirm = jasmine.createSpy('confirm');
}
// Test suite
describe('IncidentReportFormComponent', () => {
  let component: IncidentReportFormComponent;
  let fixture: ComponentFixture<IncidentReportFormComponent>;
  let incidentService: MockIncidentServiceService;
  let employeeService: MockEmployeeDataServiceService;
  let messageService: MockMessageService;
  let confirmationService: MockConfirmationService;
 
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        IncidentReportFormComponent,
        ReactiveFormsModule,
        FormsModule,
        ToastModule,
        FileUploadModule,
        DropdownModule,
        CalendarModule,
        InputTextareaModule,
        InputTextModule,
        ButtonModule,
        ConfirmDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
      ],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        {
          provide: IncidentServiceService,
          useClass: MockIncidentServiceService,
        },
        {
          provide: EmployeeDataServiceService,
          useClass: MockEmployeeDataServiceService,
        },
        { provide: MessageService, useClass: MockMessageService },
        { provide: ConfirmationService, useClass: MockConfirmationService },
        DatePipe,
      ],
    }).compileComponents();
 
    fixture = TestBed.createComponent(IncidentReportFormComponent);
    component = fixture.componentInstance;
    incidentService = TestBed.inject(
      IncidentServiceService
    ) as jasmine.SpyObj<IncidentServiceService>;
    employeeService = TestBed.inject(
      EmployeeDataServiceService
    ) as jasmine.SpyObj<EmployeeDataServiceService>;
    messageService = TestBed.inject(
      MessageService
    ) as unknown as MockMessageService;
    confirmationService = TestBed.inject(
      ConfirmationService
    ) as unknown as MockConfirmationService;
    fixture.detectChanges();
  });
 
  it('should create', () => {
    expect(component).toBeTruthy();
  });
 
  it('should call saveAsDraft and invoke addIncident method', () => {
    spyOn(component, 'prepareFormData').and.callThrough();
    component.saveAsDraft();
    expect(component.prepareFormData).toHaveBeenCalledWith(true);
    expect(incidentService.addIncident).toHaveBeenCalled();
  });
 
  it('should handle form submission and show success message', () => {
    spyOn(component, 'openDialog').and.callThrough();
    spyOn(component, 'prepareFormData').and.callThrough();
    component.onSubmit();
    expect(component.openDialog).toHaveBeenCalled();
    expect(component.prepareFormData).toHaveBeenCalledWith(false);
    expect(messageService.add).toHaveBeenCalledWith({
      severity: 'success',
      summary: 'Success',
      detail: 'Incident successfully submitted',
    });
  });
 
  it('should handle file upload', () => {
    const file = new File([''], 'test-file.txt');
    const event = { files: [file] };
    component.onFileUpload(event);
    expect(component.selectedFiles).toContain(file);
  });
 
  it('should show error message if required fields are missing on submit', () => {
    spyOn(messageService, 'add');
    component.viewform.controls['incidentTitle'].setValue('');
    component.viewform.controls['incidentOccuredDate'].setValue('');
    component.viewform.controls['incidentDescription'].setValue('');
    component.onSubmit();
    expect(messageService.add).toHaveBeenCalledWith({
      severity: 'error',
      summary: 'Error',
      detail: 'Please Fill Out Required Details',
    });
  });
 
  it('should fetch employee data on init', () => {
    spyOn(employeeService, 'fetchEmployeeData').and.callThrough();
    component.ngOnInit();
    expect(employeeService.fetchEmployeeData).toHaveBeenCalledWith(
      'test-token'
    ); // replace 'test-token' with your actual token
  });
 
  it('should handle error when addIncident fails', () => {
    (incidentService.addIncident as jasmine.Spy).and.returnValue(
      throwError(() => new Error('Add Incident Error'))
    );
    spyOn(messageService, 'add');
    component.saveAsDraft();
    expect(messageService.add).toHaveBeenCalledWith({
      severity: 'error',
      summary: 'Error',
      detail: 'Failed to save incident',
    });
  });
});