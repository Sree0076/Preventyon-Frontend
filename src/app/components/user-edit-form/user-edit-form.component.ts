import { NgIf, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { IncidentData } from '../../models/incidentData.interface';
import { IncidentServiceService } from '../../services/incident-service.service';
import { IncidentDataServiceTsService } from '../../services/sharedService/incident-data.service.ts.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-edit-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    InputTextModule,
    ButtonModule,
    CalendarModule,
    DropdownModule,
    FileUploadModule,
    InputTextareaModule,
    ToastModule
  ],
  providers: [DatePipe, MessageService, HttpClient],
  templateUrl: './user-edit-form.component.html',
  styleUrls: ['./user-edit-form.component.scss']
})
export class UserEditFormComponent implements OnInit {
  editIncidentId: number = 0;
  incident!: IncidentData;
  editAction: boolean = false;
  selectedFiles!: File[];
  viewform!: FormGroup;
  incidentTypes = [
    { label: 'Security Incident', value: 'Security Incidents' },
    { label: 'Privacy Incident', value: 'Privacy Incidents' },
    { label: 'Quality Incident', value: 'Quality Incidents' },
  ];

  categories = [
    { label: 'Denial of Service', value: 'denialOfService' },
    { label: 'Loss', value: 'loss' },
    { label: 'Theft', value: 'theft' },
    { label: 'Malware', value: 'malware' },
    { label: 'Ransomware', value: 'ransomware' },
    { label: 'Unauthorized Use', value: 'unauthorizedUse' },
    { label: 'Disclosure', value: 'disclosure' },
    { label: 'Unauthorized Access', value: 'unauthorizedAccess' },
    { label: 'Phishing', value: 'phishing' },
    { label: 'Unplanned Downtime', value: 'unplannedDowntime' },
    { label: 'Insecure Site', value: 'insecureSite' },
    { label: 'Insecure Coding', value: 'insecureCoding' },
    { label: 'Physical Security', value: 'physicalSecurity' },
    { label: 'Spoofing', value: 'spoofing' },
    { label: 'Botnet Attack', value: 'botnetAttack' },
    { label: 'Exposed APIs', value: 'exposedAPIs' },
    { label: 'Disclosing IP Data', value: 'disclosingIPData' },
  ];

  priorities = [
    { label: 'High', value: 'High' },
    { label: 'Medium', value: 'Medium' },
    { label: 'Low', value: 'Low' },
  ];

  constructor(
    private router: Router,
    private apiService: IncidentServiceService,
    private incidentService: IncidentDataServiceTsService,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private messageService: MessageService,
  ) {}

  saveAsDraft() {
    this.viewform.value.isDraft = true;
    const formData = new FormData();
    this.selectedFiles.forEach((image) => {
      formData.append('documentUrls', image);
    });
    const files: FileList = this.viewform.get('documentUrls')?.value;
    if (files) {
      Array.from(files).forEach((file) => formData.append('documentUrls', file));
    }
    for (const [key, value] of Object.entries(this.viewform.value)) {
      if (key !== 'documentUrls') {
        if (key === 'incidentOccuredDate') {
          const dateValue = value as Date;
          formData.append(key, dateValue.toISOString());
        } else {
          formData.append(key, value as string);
        }
      }
    }
    console.log(formData.getAll);
    this.apiService.updateUserIncident(this.editIncidentId, formData).subscribe((response) => {
      this.showSuccess("Incident saved as draft successfully");
      console.log(response);
    });
  }

  ngOnInit() {
    console.log(this.editAction);
    this.viewform = new FormGroup({
      incidentTitle: new FormControl('', Validators.required),
      category: new FormControl(''),
      incidentType: new FormControl(''),
      incidentAttachment: new FormControl(''),
      incidentOccuredDate: new FormControl('', Validators.required),
      incidentOccuredTime: new FormControl('', Validators.required),
      incidentDescription: new FormControl('', Validators.required),
      reportedBy: new FormControl('', Validators.required),
      reportedDate: new FormControl('', Validators.required),
      priority: new FormControl(''),
      isDraft: new FormControl(false),
      documentUrls: new FormControl(null),
    });

    this.incidentService.selectedIncidentId$.subscribe((incidentId) => {
      this.editIncidentId = incidentId;
      this.fetchIncident();
      console.log('Selected incident ID:', this.editIncidentId);
    });
  }

  onSubmit() {
    this.viewform.value.isDraft = false;
    const formData = new FormData();
    this.selectedFiles.forEach((image) => {
      formData.append('documentUrls', image);
    });
    const files: FileList = this.viewform.get('documentUrls')?.value;
    if (files) {
      Array.from(files).forEach((file) => formData.append('documentUrls', file));
    }
    for (const [key, value] of Object.entries(this.viewform.value)) {
      if (key !== 'documentUrls') {
        if (key === 'incidentOccuredDate') {
          const dateValue = value as Date;
          formData.append(key, dateValue.toISOString());
        } else {
          formData.append(key, value as string);
        }
      }
    }
    console.log(formData.getAll);
    this.apiService.updateUserIncident(this.editIncidentId, formData).subscribe((response) => {
      this.showSuccess("Incident Reported successfully");
    });
  }

  showSuccess(message: string) {
    setTimeout(() => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: `${message}` });
      setTimeout(() => {
        this.router.navigate(['/user']);
      }, 2000);
    }, 100);
  }

  fetchIncident() {
    this.apiService.getSingleIncident(this.editIncidentId).subscribe((response) => {
      console.log('Incident Fetched successfully', response);

      if (response.incidentOccuredDate) {
        const incidentDate = new Date(response.incidentOccuredDate);
        response.incidentOccuredDate = incidentDate;
      }

      this.viewform.patchValue({
        incidentTitle: response.incidentTitle,
        category: response.category,
        incidentType: response.incidentType,
        incidentAttachment: response.documentUrls,
        incidentOccuredDate: response.incidentOccuredDate,
        // incidentOccuredTime: response.incidentOccuredTime,
        incidentDescription: response.incidentDescription,
        reportedBy: response.reportedBy,
        priority: response.priority,
        isDraft: response.isDraft,
        documentUrls: response.documentUrls,
      });

    });

  }

  onFileUpload(event: any) {
    console.log('fileupload', <File>event.files);
    this.selectedFiles = <File[]>event.files;
  }
  removeFile(file: any) {
    // Implement removal logic here (e.g., delete from backend and update list)
    this.selectedFiles = this.selectedFiles.filter(f => f !== file);
    this.messageService.add({severity: 'info', summary: 'Success', detail: 'File Removed'});
  }
}
