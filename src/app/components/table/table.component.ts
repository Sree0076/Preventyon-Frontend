import {
  Component,
  Input,
  SimpleChanges,
  Type,
  ViewChild,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { MenuModule } from 'primeng/menu';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Table, TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ForwardFormComponent } from '../forward-form/forward-form.component';
import { IncidentData } from '../../models/incidentData.interface';
import { IncidentDataServiceTsService } from '../../services/sharedService/incident-data.service.ts.service';
import { TagModule } from 'primeng/tag';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { IncidentServiceService } from '../../services/incident-service.service';
import { HttpClient } from '@angular/common/http';
import { MultiSelectModule } from 'primeng/multiselect';
import { ChipsModule } from 'primeng/chips';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { EmployeeDataServiceService } from '../../services/sharedService/employee-data.service.service';
import { response } from 'express';

interface PriorityOrder {
  High: number;
  Medium: number;
  Low: number;
}

@Component({
  selector: 'app-table',
  standalone: true,
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  providers: [HttpClient, ConfirmationService, MessageService],
  imports: [
    RouterOutlet,
    ButtonModule,
    TableModule,
    CommonModule,
    SplitButtonModule,
    InputIconModule,
    IconFieldModule,
    InputTextModule,
    DropdownModule,
    DropdownModule,
    FormsModule,
    MultiSelectModule,
    DialogModule,
    MenuModule,
    OverlayPanelModule,
    ForwardFormComponent,
    TagModule,
    ChipsModule,
    ConfirmDialogModule,
    ToastModule,
  ],
})
export class TableComponent {
  cols: any[] = [];
  _selectedColumns: any[] = [];

  @Input() isadmin: boolean = false;
  @Input() getDraft: boolean = false;
  @Input() getAssigned: boolean = false;
  @Input() filterCategory: string = '';

  @ViewChild('dt2') dt2: Table | undefined;
  incidents: IncidentData[] = [];
  loading: boolean = false;

  priorities: any[] = [
    { label: 'High', value: 'High' },
    { label: 'Medium', value: 'Medium' },
    { label: 'Low', value: 'Low' },
  ];
  statuses: any[] = [
    { label: 'Draft', value: 'draft' },
    { label: 'Pending', value: 'pending' },
    { label: 'In Progress', value: 'progress' },
    { label: 'In Review', value: 'review' },
    { label: 'Closed', value: 'closed' },
  ];

  searchValue: string | undefined;
  displayForwardingModal: boolean = false;
  selectedIncidentId: number | null = null;
  menuitems: MenuItem[] | undefined;
  selectedIncident!: IncidentData;
  first = 0;
  rows = 10;

  priorityValue: any;
  incidentTypeValue: any;
  selectedIncidents: IncidentData[] = [];

  constructor(
    private router: Router,
    private tablefetchService: IncidentServiceService,
    private incidentDataService: IncidentDataServiceTsService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private employeeDataService: EmployeeDataServiceService
  ) {}

  ngOnInit() {
    if (this.getDraft) {
      this.fetchDraftIncidents();
    } else if (this.getAssigned) {
      this.fetchAssignedIncidents();
    } else {
      this.fetchAllIncidents();
    }
    this.cols = [
      { field: 'id', header: 'ID' },
      { field: 'category', header: 'Categories' },
      { field: 'reportedBy', header: 'Reported By' },
      { field: 'priority', header: 'Priority' },
      { field: 'incidentStatus', header: 'Status' },
      { field: 'action', header: 'Action' },
    ];
    this._selectedColumns = this.cols;
  }
  get selectedColumns(): any[] {
    return this._selectedColumns;
  }

  set selectedColumns(val: any[]) {
    //restore original order
    this._selectedColumns = this.cols.filter((col) => val.includes(col));
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes['filterCategory'] &&
      !changes['filterCategory'].isFirstChange()
    ) {
      this.applyCategoryFilter();
    }
  }

  fetchAllIncidents() {
    this.incidentDataService.incidentData.subscribe((data) => {
      if (data) {
        this.incidents = data.incidents;
        this.sortByPriority();
        console.log(data);
      }
    });
  }

  fetchDraftIncidents() {
    this.incidentDataService.incidentData.subscribe((data) => {
      if (data) {
        this.incidents = data.incidents;
        this.sortByPriority();
        this.incidents = this.incidents.filter((incident) => incident.isDraft);
        console.log('Draft Incidents:', this.incidents);
      }
    });
  }

  fetchAssignedIncidents() {
    this.incidentDataService.incidentData.subscribe((data) => {
      if (data) {
        this.incidents = data.assignedIncidents;
        this.sortByPriority();
        console.log(data);
      }
    });
  }

  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  pageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
  }

  isLastPage(): boolean {
    return this.incidents
      ? this.first === this.incidents.length - this.rows
      : true;
  }

  isFirstPage(): boolean {
    return this.incidents ? this.first === 0 : true;
  }

  clear(table: Table) {
    table.clear();
    this.searchValue = '';
  }

  filterGlobal(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value;
    console.log(value);
    if (this.dt2) {
      this.dt2.filterGlobal(value, 'contains');
    }
  }

  filterPriority(event: any) {
    const value = event.value;
    if (this.dt2) {
      this.dt2.filter(value, 'priority', 'equals');
    }
  }

  filterStatus(event: any) {
    if (this.dt2) {
      this.dt2.filter(event, 'incidentStatus', 'equals');
    }
  }
  openForwardingModal(incidentId: number) {
    this.selectedIncidentId = incidentId;
    this.incidentDataService.setSelectedIncidentId(incidentId);
    this.displayForwardingModal = true;
  }

  onDialogClosed() {
    this.displayForwardingModal = false;
  }

  onAddItem() {
    this.router.navigate(['/create-incident']);
  }

  applyCategoryFilter() {
    console.log(this.filterCategory);
    if (this.dt2) {
      this.dt2.filter(this.filterCategory, 'incidentType', 'contains');
    }
  }

  editIncidentData(incident: IncidentData, incidentId: number): void {
    console.log(incident.id);
    if (incident.incidentStatus !== 'closed') {
      this.incidentDataService.setSelectedIncidentId(incidentId);
      if (!this.getAssigned && !this.isadmin) {
        console.log(this.isadmin);
        this.router.navigate(['/edit-incident']);
      } else {
        this.router.navigate(['/resolve-incident']);
      }
    } else {
      this.showError(' Sorry, The Incident is already Closed !');
    }
  }

  deleteDraftIncidentById(incidentId: number): void {
    this.confirmationService.confirm({
      header: 'Are you sure?',
      message: 'Please confirm to proceed.',
      accept: () => {
        this.tablefetchService
          .deleteDraftIncidentById(incidentId)
          .subscribe((response) => {
            console.log(response);

            this.showSuccess('Draft Incident Deleted Successfully');
          });
      },
      reject: () => {},
    });
  }

  viewIncidentData(event: any): void {
    console.log('view');
    var incident = event.data;
    console.log(incident);
    this.incidentDataService.setSelectedIncidentId(incident.id);
    this.router.navigate(['/view-incident']);
  }

  sortByPriority() {
    const priorityOrder: PriorityOrder = { High: 1, Medium: 2, Low: 3 };

    const activeIncidents = this.incidents.filter(
      (incident) => incident.incidentStatus !== 'closed'
    );
    const closedIncidents = this.incidents.filter(
      (incident) => incident.incidentStatus === 'closed'
    );

    activeIncidents.sort((a, b) => {
      if (a.isSubmittedForReview && !b.isSubmittedForReview) {
        return -1;
      } else if (!a.isSubmittedForReview && b.isSubmittedForReview) {
        return 1;
      }
      return (
        priorityOrder[a.priority as keyof PriorityOrder] -
        priorityOrder[b.priority as keyof PriorityOrder]
      );
    });
    this.incidents = [...activeIncidents, ...closedIncidents];
  }

  getSeverity(status: string) {
    switch (status) {
      case 'closed':
        return 'success';
      case 'progress':
        return 'info';
      case 'pending':
        return 'danger';
      case 'review':
        return 'secondary';
      default:
        return undefined;
    }
  }

  getSeverityClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'low':
        return 'severity-low';
      case 'medium':
        return 'severity-medium';
      case 'high':
        return 'severity-high';
      default:
        return '';
    }
  }

  getTypeSeverityClass(type: string): string {
    if (type) {
      switch (type.toLowerCase()) {
        case 'security incidents':
          return 'security';
        case 'privacy incidents':
          return 'privacy';
        case 'quality incidents':
          return 'quality';
        default:
          return '';
      }
    }
    return '';
  }
  onIconClick(incident: any): void {
    if (incident.incidentStatus !== 'closed') {
      this.openForwardingModal(incident.id);
    }
  }

  exportExcel(dt2: any) {
    if (this.incidents) {
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dt2.value);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      XLSX.writeFile(wb, 'DataExport.xlsx');
    }
  }

  async exportPDF(incidents: any): Promise<void> {
    await this.tablefetchService
      .getSingleFullIncident(incidents.id)
      .subscribe((response) => {
        console.log(response);
        const incident = response;

        const doc = new jsPDF();

        doc.setFontSize(18);
        doc.text('Incident Report', 14, 20);
        doc.setFontSize(12);
        doc.text(`Title: ${incident.incidentTitle}`, 14, 40);
        doc.text(`Description: ${incident.incidentDescription}`, 14, 50);
        doc.text(`Reported By: ${incident.reportedBy}`, 14, 60);
        doc.text(`Role of Reporter: ${incident.roleOfReporter}`, 14, 70);
        doc.text(
          `Incident Occurred Date: ${new Date(
            incident.incidentOccuredDate
          ).toLocaleDateString()}`,
          14,
          80
        );
        doc.text(`Month/Year: ${incident.monthYear}`, 14, 90);
        doc.text(`Incident Type: ${incident.incidentType}`, 14, 100);
        doc.text(`Category: ${incident.category}`, 14, 110);
        doc.text(`Priority: ${incident.priority}`, 14, 120);
        doc.text(`Action Assigned To: ${incident.actionAssignedTo}`, 14, 130);
        doc.text(`Dept of Assignee: ${incident.deptOfAssignee}`, 14, 140);
        doc.text(
          `Investigation Details: ${incident.investigationDetails}`,
          14,
          150
        );
        doc.text(`Associated Impacts: ${incident.associatedImpacts}`, 14, 160);
        doc.text(
          `Collection of Evidence: ${incident.collectionOfEvidence}`,
          14,
          170
        );
        doc.text(`Correction: ${incident.correction}`, 14, 180);
        doc.text(`Corrective Action: ${incident.correctiveAction}`, 14, 190);
        doc.text(
          `Correction Completion Target Date: ${new Date(
            incident.correctionCompletionTargetDate
          ).toLocaleDateString()}`,
          14,
          200
        );
        doc.text(
          `Correction Actual Completion Date: ${new Date(
            incident.correctionActualCompletionDate
          ).toLocaleDateString()}`,
          14,
          210
        );
        doc.text(
          `Corrective Actual Completion Date: ${new Date(
            incident.correctiveActualCompletionDate
          ).toLocaleDateString()}`,
          14,
          220
        );
        doc.text(`Incident Status: ${incident.incidentStatus}`, 14, 230);
        doc.text(
          `Correction Details Time Taken To Close Incident: ${incident.correctionDetailsTimeTakenToCloseIncident} hours`,
          14,
          240
        );
        doc.text(
          `Corrective Details Time Taken To Close Incident: ${incident.correctiveDetailsTimeTakenToCloseIncident} hours`,
          14,
          250
        );
        doc.text(
          `Created At: ${new Date(incident.createdAt).toLocaleDateString()}`,
          14,
          280
        );

        // Save the PDF
        doc.save(`incident_${incident.incidentTitle}.pdf`);
      });
  }

  isColumnVisible(columnField: string): boolean {
    return this.selectedColumns.some((col) => col.field === columnField);
  }

  getStatusLabel(statusValue: string): string {
    const status = this.statuses.find((s) => s.value === statusValue);
    return status ? status.label : statusValue;
  }

  onSubmitReview(incident: IncidentData) {
    console.log(incident.isSubmittedForReview);
    if (incident.isSubmittedForReview) {
      this.showError('Already Submitted For Review');
    } else {
      const submitData = {
        id: incident.id,
        isSubmittedForReview: true,
      };
      console.log(submitData);
      this.tablefetchService
        .submitForUser(incident.id, submitData)
        .subscribe((response) => {
          console.log(response);
          this.showSuccess('Incident Submitted For Review');
        });
    }
  }

  onApproval(incident: IncidentData) {
    this.confirmationService.confirm({
      header: 'Are you sure?',
      message: 'Please confirm to proceed.',
      accept: () => {
        this.tablefetchService
          .incidentApproval(incident.id)
          .subscribe((response) => {
            console.log(response);
            this.showSuccess('Corrective measures aproved sucessfully');
          });
      },
      reject: () => {},
    });
  }

  showSuccess(message: string) {
    console.log(message);
    setTimeout(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: `${message}`,
      });
      setTimeout(() => {
        this.incidentDataService.fetchIncidentData(this.isadmin);
      }, 2000);
    }, 100);
  }

  showError(message: string) {
    setTimeout(() => {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: `${message}`,
      });
    }, 50);
  }

  onIncidentAccept(incident: IncidentData) {
    this.employeeDataService.employeeData.subscribe((data) => {
      if (data) {
        this.tablefetchService
          .incidentAccept(incident.id, data.id)
          .subscribe((response) => {
            console.log(response);
            this.showSuccess('Incident Aceepted for Resolving');
          });
      }
    });
  }
}
