import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditIncidentFormComponent } from './edit-incident-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common';
import { IncidentServiceService } from '../../services/incident-service.service';
import { IncidentDataServiceTsService } from '../../services/sharedService/incident-data.service.ts.service';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { IncidentData } from '../../models/incidentData.interface';

describe('EditIncidentFormComponent', () => {
  let component: EditIncidentFormComponent;
  let fixture: ComponentFixture<EditIncidentFormComponent>;
  let mockIncidentService: jasmine.SpyObj<IncidentServiceService>;
  let mockIncidentDataService: jasmine.SpyObj<IncidentDataServiceTsService>;

  beforeEach(async () => {
    mockIncidentService = jasmine.createSpyObj('IncidentServiceService', ['getSingleFullIncident', 'updateIncident']);
    mockIncidentService.getSingleFullIncident.and.returnValue(of({
      id: 1,
    incidentNo: "INC-2024-001",
    incidentTitle: "Incident Title Example",
    incidentDescription: "Test Description", // Changed to match expected value
    reportedBy: "John Doe",
    roleOfReporter: "IT Security Specialist",
    incidentOccuredDate: new Date("2024-07-15T10:30:00Z"),
    monthYear: "07-2024",
    incidentType: "Security", // Changed to match expected value
    category: "Category1", // Changed to match expected value
    priority: "High",
    actionAssignedTo: "Jane Smith",
    deptOfAssignee: "Information Security",
    investigationDetails: "Initial investigation indicates a possible breach through a phishing attack.",
    associatedImpacts: "Potential exposure of sensitive customer data.",
    collectionOfEvidence: "Email logs, access logs, and system alerts collected.",
    correction: "Enhanced security measures and employee training.",
    correctiveAction: "Update security protocols and conduct awareness training.",
    correctionCompletionTargetDate: "2024-08-30T00:00:00Z",
    correctionActualCompletionDate: "2024-08-25T00:00:00Z",
    correctiveActualCompletionDate: "2024-08-25T00:00:00Z",
    incidentStatus: "Resolved",
    correctionDetailsTimeTakenToCloseIncident: 15, // Days
    correctiveDetailsTimeTakenToCloseIncident: 15, // Days
    isDraft: false,
    isCorrectionFilled: true,
    accepted: 1, // Assuming 1 for accepted, 0 for not accepted
    isSubmittedForReview: true,
    employeeId: 12345,
    documentUrls: "https://example.com/documents/incident-001",
    createdAt: "2024-07-15T10:30:00Z"
    }));
    mockIncidentDataService = jasmine.createSpyObj('IncidentDataServiceTsService', ['selectedIncidentId$']);
    mockIncidentDataService.selectedIncidentId$ = of(1);
    await TestBed.configureTestingModule({
      imports: [
        EditIncidentFormComponent,
        ReactiveFormsModule,
        MatInputModule,
        MatFormFieldModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatButtonModule,
        MatCardModule,
        MatOptionModule,
        BrowserAnimationsModule
      ],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        { provide: IncidentServiceService, useValue: mockIncidentService },
        { provide: IncidentDataServiceTsService, useValue: mockIncidentDataService },
        MessageService
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditIncidentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form group instance', () => {
    expect(component.editform).toBeDefined();
  });

  it('should have a valid form on initialization with valid data', () => {
    component.editform.patchValue({
      incidentDescription: 'Test Description',
      incidentType: 'Security',
      category: 'Category1',
      priority: 'High'
    });
    expect(component.editform.valid).toBeTruthy();
  });

  it('should initialize form with correct values from data service', () => {
    expect(component.editform.get('incidentDescription')?.value).toBe('Test Description');
    expect(component.editform.get('incidentType')?.value).toBe('Security');
    expect(component.editform.get('category')?.value).toBe('Category1');
    expect(component.editform.get('priority')?.value).toBe('High');
  });

  it('should call fetchIncident on initialization', () => {
    spyOn(component, 'fetchIncident').and.callThrough();
    component.ngOnInit();
    expect(component.fetchIncident).toHaveBeenCalled();
  });

  it('should call updateIncident on form submit with correct data', () => {
    spyOn(component, 'onSubmit').and.callThrough();
    component.editform.patchValue({
      incidentDescription: 'Updated Description',
      incidentType: 'Security',
      category: 'Category2',
      priority: 'Medium'
    });
    fixture.debugElement.query(By.css('form')).triggerEventHandler('ngSubmit', null);
    expect(component.onSubmit).toHaveBeenCalled();
    expect(mockIncidentService.updateIncident).toHaveBeenCalledWith(1, jasmine.any(Object));
  });

  it('should display date pickers correctly', () => {
    const correctionCompletionDateInput = fixture.debugElement.query(By.css('input[formControlName="correctionCompletionTargetDate"]')).nativeElement;
    expect(correctionCompletionDateInput).toBeDefined();
  });

  it('should handle numeric fields correctly', () => {
    const correctionDetailsTimeTakenControl = component.editform.get('correctionDetailsTimeTakenToCloseIncident');
    correctionDetailsTimeTakenControl?.setValue(10);
    expect(correctionDetailsTimeTakenControl?.value).toBe(10);
    const correctiveDetailsTimeTakenControl = component.editform.get('correctiveDetailsTimeTakenToCloseIncident');
    correctiveDetailsTimeTakenControl?.setValue(5);
    expect(correctiveDetailsTimeTakenControl?.value).toBe(5);
  });

  it('should handle textarea fields correctly', () => {
    const investigationDetailsControl = component.editform.get('investigationDetails');
    investigationDetailsControl?.setValue('New investigation details');
    expect(investigationDetailsControl?.value).toBe('New investigation details');
  });

});
