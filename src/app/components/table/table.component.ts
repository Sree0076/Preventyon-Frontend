import { Component, ViewChild } from '@angular/core';
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


export interface IncidentData {
  incident_id: number;
  title: string;
  description: string;
  status: 'open' | 'in_progress' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  reported_by: number;
  reported_at: string;
  month_year: string;
  incident_type: 'Security' | 'Quality' | 'Privacy';
  category_id: number;
  investigation_details: string;
  associated_impacts: string;
  collection_of_evidence: string;
  correction: string;
  corrective_action: string;
  correction_completion_target_date: string;
  correction_actual_completion_date: string | null;
  corrective_actual_completion_date: string | null;
  correction_details: string;
  corrective_details: string;
  remarks: string;
  created_at: string;
  updated_at: string;
}
@Component({
  selector: 'app-table',
  standalone: true,
  imports: [RouterOutlet,ButtonModule,TableModule, CommonModule,SplitButtonModule,InputIconModule,IconFieldModule,
     InputTextModule,DropdownModule, DropdownModule,FormsModule,DialogModule,MenuModule],

  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {

  @ViewChild('dt2') dt2: Table | undefined;
  customers:IncidentData[]=[];
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


  constructor(private tablefetchService: TablefetchService) {}

  ngOnInit() {
    this.tablefetchService.getIncidents().subscribe(data => {
      this.customers = data;
      console.log(data);
    });
    this.menuitems = [
            {
              label: 'File',
              icon: 'pi pi-file',
              items: [
                  {
                      label: 'New',
                      icon: 'pi pi-plus',
                      items: [
                          {
                              label: 'Document',
                              icon: 'pi pi-file'
                          },
                          {
                              label: 'Image',
                              icon: 'pi pi-image'
                          },
                          {
                              label: 'Video',
                              icon: 'pi pi-video'
                          }
                      ]
                  },
                  {
                      label: 'Open',
                      icon: 'pi pi-folder-open'
                  },
                  {
                      label: 'Print',
                      icon: 'pi pi-print'
                  }
              ]
          },
          {
              label: 'Edit',
              icon: 'pi pi-file-edit',
              items: [
                  {
                      label: 'Copy',
                      icon: 'pi pi-copy'
                  },
                  {
                      label: 'Delete',
                      icon: 'pi pi-times'
                  }
              ]
          },
          {
              label: 'Search',
              icon: 'pi pi-search'
          },
          {
              separator: true
          },
          {
              label: 'Share',
              icon: 'pi pi-share-alt',
              items: [
                  {
                      label: 'Slack',
                      icon: 'pi pi-slack'
                  },
                  {
                      label: 'Whatsapp',
                      icon: 'pi pi-whatsapp'
                  }
              ]
          }
          ];
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
      return this.customers ? this.first === this.customers.length - this.rows : true;
  }

  isFirstPage(): boolean {
      return this.customers ? this.first === 0 : true;
  }
  clear(table: Table) {
    table.clear();
    this.searchValue = ''
}
filterGlobal(event: Event) {
  const inputElement = event.target as HTMLInputElement;
  const value = inputElement.value;
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


}
