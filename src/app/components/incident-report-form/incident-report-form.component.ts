import { Incident } from './../../models/incident.interface';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DatePipe, NgIf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { IncidentData } from '../../models/incidentData.interface';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { IncidentServiceService } from '../../services/incident-service.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-incident-report-form',
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
    ToastModule, ButtonModule, RippleModule
  ],
  providers: [DatePipe,MessageService,HttpClient],
  templateUrl: './incident-report-form.component.html',
  styleUrl: './incident-report-form.component.scss',
})
export class IncidentReportFormComponent {
  incident!: IncidentData;

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
  selectedFiles!: File[];

  constructor(
    private router: Router,
    private apiService: IncidentServiceService,
    private messageService: MessageService
  ) {}

  showSuccess(message:string) {
    setTimeout(() => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: `${message}` });
      setTimeout(() => {
        this.router.navigate(['/user']); // Navigate to '/user' route after success message displayed
      }, 2000); // Adjust delay as needed for the success message to display
    }, 100);
}

  saveAsDraft() {
   this.viewform.value.employeeId=2;
    this.viewform.value.isDraft = true;
    const formData = new FormData();
    this.selectedFiles.forEach((image)=>{
      formData.append('documentUrls',image);
    })
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
  this.apiService.addIncident(formData).subscribe((response) => {
      this.showSuccess("Incident saved as draft successfully");

    });


}

  viewform!: FormGroup;

  ngOnInit() {

    this.viewform = new FormGroup({
      incidentTitle: new FormControl('', Validators.required),
      category: new FormControl(''),
      incidentType: new FormControl(''),
      incidentOccuredDate: new FormControl('', Validators.required),
      incidentOccuredTime: new FormControl('', Validators.required),
      incidentDescription: new FormControl('', Validators.required),
      reportedBy: new FormControl('', Validators.required),
      reportedDate: new FormControl('', Validators.required),
      priority: new FormControl(''),
      isDraft: new FormControl(false),
      employeeId :new FormControl(0),
      documentUrls: new FormControl(null),
    });
  }
  onFileUpload(event: any) {
    console.log('fileupload', <File>event.files);
    this.selectedFiles = <File[]>event.files;
  }

  onSubmit() {
    this.viewform.value.employeeId=2;
    this.viewform.value.isDraft = false;
    const formData = new FormData();
    this.selectedFiles.forEach((image)=>{
      formData.append('documentUrls',image);
    })
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
  this.apiService.addIncident(formData).subscribe((response) => {
      this.showSuccess("Incident Reported successfully");

    });

  }
}
