import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe, NgFor } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IncidentData } from '../../models/incidentData.interface';
import { Router } from '@angular/router';
import { MatOptionModule } from '@angular/material/core';
import { IncidentServiceService } from '../../services/incident-service.service';
import { IncidentDataServiceTsService } from '../../services/sharedService/incident-data.service.ts.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';


@Component({
  selector: 'app-edit-incident-form',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatOptionModule,
    NgFor,
    ToastModule,
    CommonModule,
  ],
  templateUrl: './edit-incident-form.component.html',
  styleUrls: ['./edit-incident-form.component.scss'], // Ensure this is correct
  providers: [DatePipe,MessageService],
})
export class EditIncidentFormComponent implements OnInit {
  timeString!: string;
  dateString!: string;
  data: any = {};
  id: number = 0;
  editform!: FormGroup;
  editIncidentId: number = 0;
  incident!: IncidentData;
  editAction: Boolean = false;

  incidentTypes = [
    { label: 'Security Incident', value: 'SecurityIncident' },
    { label: 'Privacy Incident', value: 'PrivacyIncident' },
    { label: 'Quality Incident', value: 'QualityIncident' },
  ];

  categories = [
    { label: 'Denial of Service', value: 'denialOfService' },
    { label: 'Loss', value: 'loss' },
    // ... other categories
  ];

  priorities = [
    { label: 'High', value: 'High-L1' },
    { label: 'Medium', value: 'Medium-L2' },
    { label: 'Low', value: 'Low-L3' },
  ];

  constructor(
    private fb: FormBuilder,
    private apiService: IncidentServiceService,
    private datePipe: DatePipe,
    private router: Router,
    private incidentService: IncidentDataServiceTsService,
    private messageService: MessageService
  ) {}

  showSuccess(message:string) {
    setTimeout(() => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: `${message}` });
      setTimeout(() => {
        this.router.navigate(['/user']);
      }, 2000);
    }, 100);

}
  ngOnInit() {
    this.editform = this.fb.group({
      incidentTitle: [''],
      incidentDescription: [''],
      incidentType: [''],
      category: [''],
      priority: [''],
      investigationDetails: [''],
      associatedImpacts: [''],
      collectionOfEvidence: [''],
      correction: [''],
      correctiveAction: [''],
      correctionCompletionTargetDate: [''],
      correctionActualCompletionDate: [''],
      correctiveActualCompletionDate: [''],
      incidentStatus: [''],
      correctionDetailsTimeTakenToCloseIncident: [''],
      correctiveDetailsTimeTakenToCloseIncident: [''],
    });
    this.incidentService.selectedIncidentId$.subscribe((incidentId) => {
      this.editIncidentId = incidentId;
      this.fetchIncident();
      console.log('Selected incident ID:', this.editIncidentId);
    });
  }

  fetchIncident() {
    this.apiService.getSingleFullIncident(this.editIncidentId).subscribe((response) => {
      console.log(response);
      this.data = response;
      // const incidentOccuredDate = new Date(response.incidentOccuredDate);
      // this.dateString = incidentOccuredDate.toISOString().split('T')[0];
      // this.timeString = incidentOccuredDate.toISOString().split('T')[1].split('Z')[0];
      this.editform.patchValue({
        incidentid : response.id,
        incidentTitle: response.incidentTitle,
        incidentOccuredDate  : response.incidentOccuredDate,
        incidentOccuredTime: this.timeString,
        incidentDescription: response.incidentDescription,
        incidentType: response.incidentType,
        category: response.category,
        priority: response.priority,
        investigationDetails: response.investigationDetails,
        associatedImpacts: response.associatedImpacts,
        collectionOfEvidence: response.collectionOfEvidence,
        correction: response.correction,
        correctiveAction: response.correctiveAction,
        correctionCompletionTargetDate: response.correctionCompletionTargetDate,
        correctionActualCompletionDate: response.correctionActualCompletionDate,
        correctiveActualCompletionDate: response.correctiveActualCompletionDate,
        incidentStatus: response.incidentStatus,
        correctionDetailsTimeTakenToCloseIncident: response.correctionDetailsTimeTakenToCloseIncident,
        correctiveDetailsTimeTakenToCloseIncident: response.correctiveDetailsTimeTakenToCloseIncident
      });
    });
  }

  onSubmit() {
    if (this.editform.valid) {
      this.apiService.updateIncident(this.editIncidentId, this.editform.value).subscribe((response) => {
        console.log(response);

      });
    }
    this.showSuccess("Incident Updated successfully");
  }

}
