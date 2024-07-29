
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IncidentReportFormComponent } from './incident-report-form.component';
import { IncidentServiceService } from '../../services/incident-service.service';
import { EmployeeDataServiceService } from '../../services/sharedService/employee-data.service.service';
import { of} from 'rxjs';
import { IncidentData } from '../../models/incidentData.interface';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { Employee} from '../../models/employee.interface';

describe('IncidentReportFormComponent', () => {
    let component: IncidentReportFormComponent;
    let fixture: ComponentFixture<IncidentReportFormComponent>;
    let mockIncidentService: jasmine.SpyObj<IncidentServiceService>;
    let mockEmployeeDataService: jasmine.SpyObj<EmployeeDataServiceService>;

  beforeEach(async () => {
    const incidentServiceSpy = jasmine.createSpyObj('IncidentServiceService', ['getSingleIncident', 'getSingleFullIncident']);
    const employeeDataServiceSpy = jasmine.createSpyObj('EmployeeDataServiceService', ['fetchEmployeeData', 'employeeData']);

    const mockEmployee: Employee = {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        department: 'IT',
        designation: 'Developer',
        roleId: 1,
        role: {
          id: 1,
          name: 'Admin',
          permission: {
            id: 1,
            permissionName: 'Full Access',
            incidentManagement: true,
            userManagement: true,
            incidentCreateOnly: false
          }
        },
        createdAt: new Date('2023-01-01'),
        updatedAt: new Date('2023-01-01')
      };

      const mockIncident: IncidentData = {
        id: 1,
        incidentNo: 'INC001',
        incidentTitle: 'Sample Incident',
        incidentDescription: 'Description of the incident',
        reportedBy: 'John Doe',
        roleOfReporter: 'Developer',
        incidentOccuredDate: new Date('2024-07-01'),
        monthYear: 'July 2024',
        incidentType: 'Type1',
        category: 'Category1',
        priority: 'High',
        actionAssignedTo: 'Jane Smith',
        deptOfAssignee: 'IT',
        investigationDetails: 'Investigation details here',
        associatedImpacts: 'No major impacts',
        collectionOfEvidence: 'Evidence collected',
        correction: 'Correction applied',
        correctiveAction: 'Action taken',
        correctionCompletionTargetDate: '2024-08-01',
        correctionActualCompletionDate: '2024-08-01',
        correctiveActualCompletionDate: '2024-08-01',
        incidentStatus: 'Open',
        correctionDetailsTimeTakenToCloseIncident: 5,
        correctiveDetailsTimeTakenToCloseIncident: 3,
        isDraft: false,
        isCorrectionFilled: true,
        IsSubmittedForReview: false,
        employeeId: 1,
        documentUrls: 'http://example.com/doc1,http://example.com/doc2',
        createdAt: new Date().toISOString()
      };
  

      employeeDataServiceSpy.employeeData = of(mockEmployee);
      incidentServiceSpy.getSingleIncident.and.returnValue(of(mockIncident));


    await TestBed.configureTestingModule({
      imports: [IncidentReportFormComponent,ReactiveFormsModule, FormsModule],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        { provide: IncidentServiceService, useValue: incidentServiceSpy },
        { provide: EmployeeDataServiceService, useValue: employeeDataServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(IncidentReportFormComponent);
    component = fixture.componentInstance;
    mockIncidentService = TestBed.inject(IncidentServiceService) as jasmine.SpyObj<IncidentServiceService>;
    mockEmployeeDataService = TestBed.inject(EmployeeDataServiceService) as jasmine.SpyObj<EmployeeDataServiceService>;

    component.ngOnInit();
    fixture.detectChanges();

  });



  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch employee data and set employeeId correctly', () => {
    component.ngOnInit(); // Assuming this method triggers the data fetch
    fixture.whenStable().then(() => {
      expect(component.employeeId).toEqual(1); // Assuming employeeId is derived from employee data
    });
  });
  
  it('should initialize form controls', () => {
    expect(component.viewform.contains('incidentTitle')).toBeTrue();
    expect(component.viewform.contains('category')).toBeTrue();
    expect(component.viewform.contains('incidentType')).toBeTrue();
    expect(component.viewform.contains('incidentOccuredDate')).toBeTrue();
    expect(component.viewform.contains('incidentOccuredTime')).toBeTrue();
    expect(component.viewform.contains('incidentDescription')).toBeTrue();
    expect(component.viewform.contains('reportedBy')).toBeTrue();
    expect(component.viewform.contains('reportedDate')).toBeTrue();
    expect(component.viewform.contains('priority')).toBeTrue();
    expect(component.viewform.contains('isDraft')).toBeTrue();
    expect(component.viewform.contains('employeeId')).toBeTrue();
    expect(component.viewform.contains('documentUrls')).toBeTrue();
  });

  it('should call openDialog on submit when form is valid', () => {
    spyOn(component, 'openDialog');
    component.viewform.setValue({
      incidentTitle: 'Sample Incident',
      category: 'denialOfService',
      incidentType: 'Security Incidents',
      incidentOccuredDate: new Date(),
      incidentOccuredTime: new Date(),
      incidentDescription: 'Sample Description',
      reportedBy: 'John Doe',
      reportedDate: new Date(),
      priority: 'High',
      isDraft: false,
      employeeId: 1,
      documentUrls: null
    });
    component.onSubmit();
    expect(component.openDialog).toHaveBeenCalled();
  });

  it('should show error message if required fields are missing', () => {
    spyOn(component, 'showError');
    component.viewform.setValue({
      incidentTitle: '',
      category: '',
      incidentType: '',
      incidentOccuredDate: '',
      incidentOccuredTime: '',
      incidentDescription: '',
      reportedBy: '',
      reportedDate: '',
      priority: '',
      isDraft: false,
      employeeId: 1,
      documentUrls: null
    });
    component.onSubmit();
    expect(component.showError).toHaveBeenCalledWith('Please Fill Out Required Details');
  });

  it('should call prepareFormData with isDraft=true when saveAsDraft is called', () => {
    spyOn(component, 'prepareFormData');
    component.saveAsDraft();
    expect(component.prepareFormData).toHaveBeenCalledWith(true);
  });

  it('should handle file uploads correctly', () => {
    const file = new File([''], 'test-file.txt', { type: 'text/plain' });
    const event = { files: [file] };
    component.onFileUpload(event);
    expect(component.selectedFiles).toContain(file);
  });


it('should enable submit button if form is valid', () => {
    component.viewform.setValue({
        incidentTitle: 'Valid Title',
        category: 'Valid Category',
        incidentType: 'Valid Type',
        incidentOccuredDate: new Date(),
        incidentOccuredTime: new Date(),
        incidentDescription: 'Valid Description',
        reportedBy: 'Valid Reporter',
        reportedDate: new Date(),
        priority: 'High',
        isDraft: false,
        employeeId: 1,
        documentUrls: null
    });
    fixture.detectChanges();
    const submitButton = fixture.nativeElement.querySelector('button[type="submit"]');
    expect(submitButton.disabled).toBeFalse();
});

it('should call prepareFormData with correct parameters when saveAsDraft is called', () => {
    spyOn(component, 'prepareFormData');
    const isDraft = true;
    component.saveAsDraft();
    expect(component.prepareFormData).toHaveBeenCalledWith(isDraft);
});

});
