import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TableComponent } from './table.component';
import { of } from 'rxjs';
import { IncidentServiceService } from '../../services/incident-service.service';
import { IncidentDataServiceTsService } from '../../services/sharedService/incident-data.service.ts.service';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { DialogModule } from 'primeng/dialog';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TagModule } from 'primeng/tag';
import { HttpClient } from '@angular/common/http';
import { IncidentStatsDTO } from '../../models/incidentData.interface';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  let incidentDataService: IncidentDataServiceTsService;

  const mockIncidentData: IncidentStatsDTO = {
    privacyTotalIncidents: 5,
    privacyPendingIncidents: 2,
    privacyClosedIncidents: 3,
    securityTotalIncidents: 4,
    securityPendingIncidents: 1,
    securityClosedIncidents: 3,
    qualityTotalIncidents: 3,
    qualityPendingIncidents: 1,
    qualityClosedIncidents: 2,
    incidents: [
      {
        id: 1,
        incidentNo: "INC-2024-001",
        incidentTitle: "Data Breach Incident",
        incidentDescription: "Unauthorized access to sensitive data.",
        reportedBy: "John Doe",
        roleOfReporter: "IT Security Specialist",
        incidentOccuredDate: new Date("2024-07-15T10:30:00Z"),
        monthYear: "07-2024",
        incidentType: "Data Breach",
        category: "Security",
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
      }
      // Add more mock incidents as needed
    ],
    assignedIncidents: [],
    yearlyIncidentCounts: {}
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        TableComponent,
        TableModule,
        FormsModule,
        ButtonModule,
        DropdownModule,
        MultiSelectModule,
        OverlayPanelModule,
        DialogModule,
        TagModule,
      ],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        { provide: IncidentServiceService, useValue: {} },
        {
          provide: IncidentDataServiceTsService,
          useValue: {
            incidentData: of(mockIncidentData),
            selectedIncidentId$: of(1),
            fetchIncidentData: jasmine.createSpy('fetchIncidentData'),
            setSelectedIncidentId: jasmine.createSpy('setSelectedIncidentId'),
          },
        },
        HttpClient,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    incidentDataService = TestBed.inject(IncidentDataServiceTsService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with all incidents', () => {
    component.ngOnInit();
    expect(component.incidents.length).toBe(1);
    expect(component.incidents).toEqual(mockIncidentData.incidents);
  });

  it('should filter incidents by priority', () => {
    component.ngOnInit();
    const event = { value: 'High' };
    component.filterPriority(event);
    fixture.detectChanges();

    expect(component.incidents.length).toBe(1);
    expect(component.incidents[0].priority).toBe('High');
  });

  it('should open forwarding modal', () => {
    const incidentId = 1;
    component.openForwardingModal(incidentId);
    expect(component.displayForwardingModal).toBe(true);
    expect(component.selectedIncidentId).toBe(incidentId);
  });

  it('should handle pagination', () => {
    component.incidents = Array(20).fill(mockIncidentData.incidents[0]);
    component.next();
    expect(component.first).toBe(10);

    component.prev();
    expect(component.first).toBe(0);
  });

  it('should clear table filters', () => {
    component.searchValue = 'test';
    component.clear(component.dt2!);
    expect(component.searchValue).toBe('');
  });

  it('should sort incidents by priority', () => {
    const unsortedIncidents = [
      { ...mockIncidentData.incidents[0], priority: 'Medium' },
      { ...mockIncidentData.incidents[0], priority: 'Low' },
      { ...mockIncidentData.incidents[0], priority: 'High' }
    ];
    component.incidents = unsortedIncidents;
    component.sortByPriority();
    expect(component.incidents[0].priority).toBe('High');
    expect(component.incidents[1].priority).toBe('Medium');
    expect(component.incidents[2].priority).toBe('Low');
  });

  it('should get the correct severity class', () => {
    expect(component.getSeverityClass('High')).toBe('severity-high');
    expect(component.getSeverityClass('Medium')).toBe('severity-medium');
    expect(component.getSeverityClass('Low')).toBe('severity-low');
    expect(component.getSeverityClass('Unknown')).toBe('');
  });

  it('should get the correct type severity class', () => {
    expect(component.getTypeSeverityClass('security incidents')).toBe('security');
    expect(component.getTypeSeverityClass('privacy incidents')).toBe('privacy');
    expect(component.getTypeSeverityClass('quality incidents')).toBe('quality');
    expect(component.getTypeSeverityClass('Unknown')).toBe('');
  });
});



