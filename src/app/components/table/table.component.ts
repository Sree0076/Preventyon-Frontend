
import { Component, Input, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { Table, TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TablefetchService } from '../../service/tablefetch.service';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { LazyLoadEvent } from 'primeng/api';
import { ForwardFormComponent } from "../forward-form/forward-form.component";

export interface IncidentData {
  incidentId: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  reportedBy: string;
  reportedAt: Date;
  incidentType: string;
  categoryId: string;
  investigationDetails: string;
  associatedImpacts: string;
  collectionOfEvidence: string;
  correction: string;
  correctiveAction: string;
  correctionCompletionTargetDate: Date;
  correctionActualCompletionDate: Date;
  correctiveActualCompletionDate: Date;
  correctionDetails: string;
  correctiveDetails: string;
  remarks: string;
  isDraft:boolean;
  createdAt: Date;
  updatedAt: Date;
}

@Component({
    selector: 'app-table',
    standalone: true,
    templateUrl: './table.component.html',
    styleUrl: './table.component.scss',
    imports: [RouterOutlet, ButtonModule, TableModule, CommonModule, SplitButtonModule, InputIconModule, IconFieldModule,
        InputTextModule, DropdownModule, DropdownModule, FormsModule, DialogModule, MenuModule, OverlayPanelModule, ForwardFormComponent]
})
export class TableComponent {
  @Input() isadmin:boolean=false;
  @ViewChild('dt2') dt2: Table | undefined;
  incidents:IncidentData[]=[];
  priorities: any[] = [
    { label: 'High', value: 'high' },
    { label: 'Medium', value: 'medium' },
    { label: 'Low', value: 'low' }
  ];
  searchValue: string | undefined;
  displayForwardingModal: boolean = false;
  selectedIncidentId: number | null = null;
  menuitems: MenuItem[] | undefined;

  first = 0;
  rows = 10;

  priorityValue: any;
  selectedIncidents: IncidentData[]=[];


  constructor(private tablefetchService: TablefetchService) {}

  ngOnInit() {
    this.tablefetchService.getIncidents().subscribe(data => {
      this.incidents = data;
      console.log(data);
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

  pageChange(event:any) {
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


openForwardingModal(incidentId: number) {
  this.selectedIncidentId = incidentId;
  this.displayForwardingModal = true;
}
onDialogClosed() {
  this.displayForwardingModal = false;
}

}
