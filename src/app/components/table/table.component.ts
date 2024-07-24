import { Component, Input, SimpleChanges, Type, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { Table, TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ForwardFormComponent } from "../forward-form/forward-form.component";
import { IncidentData } from '../../models/incidentData.interface';
import { IncidentDataServiceTsService } from '../../services/sharedService/incident-data.service.ts.service';
import { TagModule } from 'primeng/tag';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { IncidentServiceService } from '../../services/incident-service.service';
import { HttpClient } from '@angular/common/http';
import { Incident } from '../../models/incident.interface';

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
  providers: [HttpClient],
  imports: [RouterOutlet, ButtonModule, TableModule, CommonModule, SplitButtonModule, InputIconModule, IconFieldModule,
      InputTextModule, DropdownModule, DropdownModule, FormsModule, DialogModule, MenuModule, OverlayPanelModule, ForwardFormComponent, TagModule]
})
export class TableComponent {
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
    { label: 'Low', value: 'Low' }
  ];
  statuses: any[] = [
    { label: 'Pending', value: 'pending' },
    { label: 'In Progress', value: 'progress' },
    { label: 'In Review', value: 'review' },
    { label: 'Closed', value: 'closed' }
  ];

  searchValue: string | undefined;
  displayForwardingModal: boolean = false;
  selectedIncidentId: number | null = null;
  menuitems: MenuItem[] | undefined;

  first = 0;
  rows = 10;

  priorityValue: any;
  incidentTypeValue: any;
  selectedIncidents: IncidentData[] = [];

  constructor(private router: Router, private tablefetchService: IncidentServiceService, private incidentDataService: IncidentDataServiceTsService) {}

  ngOnInit() {
    if (this.getDraft) {
      this.fetchDraftIncidents();
    } else if (this.getAssigned) {
      this.fetchAssignedIncidents();
    } else {
      this.fetchAllIncidents();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['filterCategory'] && !changes['filterCategory'].isFirstChange()) {
      this.applyCategoryFilter();
    }
  }

  fetchAllIncidents() {
    this.incidentDataService.incidentData.subscribe(data => {
      if (data) {
        this.incidents = data.incidents;
        this.sortByPriority();
        console.log(data);
      }
    });
  }

  fetchDraftIncidents() {
    this.incidentDataService.incidentData.subscribe(data => {
      if (data) {
        this.incidents = data.incidents;
        this.sortByPriority();
        this.incidents = this.incidents.filter(incident => incident.isDraft);
        console.log('Draft Incidents:', this.incidents);
      }
    });
  }

  fetchAssignedIncidents() {
    this.tablefetchService.getAssignedIncident(2).subscribe(data => {
      if (Array.isArray(data)) {
        this.incidents = data;
        this.sortByPriority();
        console.log(data);
      } else {
        console.error("Unexpected data format for assigned incidents:", data);
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
    return this.incidents ? this.first === this.incidents.length - this.rows : true;
  }

  isFirstPage(): boolean {
    return this.incidents ? this.first === 0 : true;
  }

  clear(table: Table) {
    table.clear();
    this.searchValue = ''
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
    const value = event.value;
    if (this.dt2) {
      this.dt2.filter(value, 'incidentStatus', 'equals');
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

  editIncidentData(incident: IncidentData,incidentId : number): void {
    console.log(this.getAssigned);
    console.log(incident.id);
    if (incident.incidentStatus !== 'closed') {

      this.incidentDataService.setSelectedIncidentId(incidentId);
      if(!this.getAssigned)
        {
         this.router.navigate(['/edit-incident']);
        }
        else
        {
          this.router.navigate(['/resolve-incident']);
        }

    }
  }

  viewIncidentData(incidentId: number): void {
    console.log("view");
    this.incidentDataService.setSelectedIncidentId(incidentId);
    this.router.navigate(['/view-incident']);
  }

  sortByPriority() {
    const priorityOrder: PriorityOrder = { High: 1, Medium: 2, Low: 3 };

    this.incidents.sort((a, b) => {
      return priorityOrder[a.priority as keyof PriorityOrder] - priorityOrder[b.priority as keyof PriorityOrder];
    });
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
      default: return undefined;
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
    if(type)
    {
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

  exportExcel(dt2:any) {
    if(this.incidents)
    {
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dt2.value);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      XLSX.writeFile(wb, 'DataExport.xlsx');
    }

  }

  exportPDF(incident: any): void {
    // Create a new jsPDF instance
    const doc = new jsPDF();

    // Add Title
    doc.setFontSize(18);
    doc.text('Incident Report', 14, 20);
    doc.setFontSize(12);
    doc.text(`Title: ${incident.incidentTitle}`, 14, 40);
    doc.text(`Description: ${incident.incidentDescription}`, 14, 50);
    doc.text(`Reported By: ${incident.reportedBy}`, 14, 60);
    doc.text(`Role of Reporter: ${incident.roleOfReporter}`, 14, 70);
    doc.text(`Incident Occurred Date: ${new Date(incident.incidentOccuredDate).toLocaleDateString()}`, 14, 80);
    doc.text(`Month/Year: ${incident.monthYear}`, 14, 90);
    doc.text(`Incident Type: ${incident.incidentType}`, 14, 100);
    doc.text(`Category: ${incident.category}`, 14, 110);
    doc.text(`Priority: ${incident.priority}`, 14, 120);
    doc.text(`Action Assigned To: ${incident.actionAssignedTo}`, 14, 130);
    doc.text(`Dept of Assignee: ${incident.deptOfAssignee}`, 14, 140);
    doc.text(`Investigation Details: ${incident.investigationDetails}`, 14, 150);
    doc.text(`Associated Impacts: ${incident.associatedImpacts}`, 14, 160);
    doc.text(`Collection of Evidence: ${incident.collectionOfEvidence}`, 14, 170);
    doc.text(`Correction: ${incident.correction}`, 14, 180);
    doc.text(`Corrective Action: ${incident.correctiveAction}`, 14, 190);
    doc.text(`Correction Completion Target Date: ${new Date(incident.correctionCompletionTargetDate).toLocaleDateString()}`, 14, 200);
    doc.text(`Correction Actual Completion Date: ${new Date(incident.correctionActualCompletionDate).toLocaleDateString()}`, 14, 210);
    doc.text(`Corrective Actual Completion Date: ${new Date(incident.correctiveActualCompletionDate).toLocaleDateString()}`, 14, 220);
    doc.text(`Incident Status: ${incident.incidentStatus}`, 14, 230);
    doc.text(`Correction Details Time Taken To Close Incident: ${incident.correctionDetailsTimeTakenToCloseIncident} hours`, 14, 240);
    doc.text(`Corrective Details Time Taken To Close Incident: ${incident.correctiveDetailsTimeTakenToCloseIncident} hours`, 14, 250);
    doc.text(`Created At: ${new Date(incident.createdAt).toLocaleDateString()}`, 14, 280);

    // Save the PDF
    doc.save(`incident_${incident.incidentTitle}.pdf`);
  }

}
