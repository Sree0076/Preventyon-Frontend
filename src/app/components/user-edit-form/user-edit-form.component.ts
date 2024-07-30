import { NgIf, DatePipe, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
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
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { HttpClient } from '@angular/common/http';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MatNativeDateModule } from '@angular/material/core';
import { RippleModule } from 'primeng/ripple';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';

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
    ToastModule,
    RippleModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ConfirmDialogModule,
    NgFor,
  ],
  providers: [
    DatePipe,
    MessageService,
    HttpClient,
    MatNativeDateModule,
    ConfirmationService,
  ],
  templateUrl: './user-edit-form.component.html',
  styleUrls: ['./user-edit-form.component.scss'],
})
export class UserEditFormComponent implements OnInit {
  editIncidentId: number = 0;
  incident!: IncidentData;
  editAction: boolean = false;
  selectedFiles!: File[];
  viewform!: FormGroup;
  employeeId: number = 0;

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
    private confirmationService: ConfirmationService
  ) {}
  uploadedFiles: { name: string; url: string }[] = [];

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
      oldDocumentUrls: new FormControl(null),
    });

    this.incidentService.selectedIncidentId$.subscribe((incidentId) => {
      this.editIncidentId = incidentId;
      this.fetchIncident();
      console.log('Selected incident ID:', this.editIncidentId);
    });
  }

  showSuccess(message: string) {
    setTimeout(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: `${message}`,
      });
      setTimeout(() => {
        this.router.navigate(['/user']);
      }, 2000);
    }, 100);
  }

  fetchIncident() {
    this.apiService
      .getSingleIncident(this.editIncidentId)
      .subscribe((response) => {
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
          oldDocumentUrls: response.documentUrls,
        });

        console.log('document fetched:', response.documentUrls);

        const baseUrl = 'http://localhost:7209';

        if (Array.isArray(response.documentUrls)) {
          this.uploadedFiles = response.documentUrls.map((url) => ({
            name: url.split('/').pop()!, // Extract file name
            url: `${baseUrl}${url}`, // Prepend base URL
          }));
        }

        console.log(this.uploadedFiles);
      });
  }

  showError(message: string) {
    setTimeout(() => {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: `${message}`,
      });
    }, 100);
  }
  saveAsDraft() {
    this.prepareFormData(true);
  }
  onSubmit() {
    if (
      !this.viewform.value.incidentTitle ||
      !this.viewform.value.incidentOccuredDate ||
      !this.viewform.value.incidentDescription
    ) {
      this.showError('Please Fill Out Required Details');
      return;
    }

    this.openDialog();
  }

  prepareFormData(isDraft: boolean) {
    this.viewform.value.employeeId = this.employeeId;
    this.viewform.value.isDraft = isDraft;

    const formData = new FormData();
    if (this.selectedFiles) {
      this.selectedFiles.forEach((file) => {
        formData.append('NewDocumentUrls', file);
      });
    }

    this.viewform.value.oldDocumentUrls.forEach((url: string) => {
      formData.append('OldDocumentUrls', url);
    });

    for (const [key, value] of Object.entries(this.viewform.value)) {
      if (key !== 'documentUrls') {
        if (key === 'incidentOccuredDate') {
          formData.append(key, (value as Date).toISOString());
        } else {
          formData.append(key, value as string);
        }
      }
    }

    if (isDraft) {
      console.log(formData);
      this.apiService
        .updateUserIncident(this.editIncidentId, formData)
        .subscribe((response) => {
          console.log('response after update: ', response);

          this.showSuccess('Draft Incident Reported successfully');
        });
    } else {
      this.apiService
        .updateUserIncident(this.editIncidentId, formData)
        .subscribe((response) => {
          this.showSuccess('Incident Reported successfully');
        });
    }
  }

  openDialog() {
    this.confirmationService.confirm({
      header: 'Are you sure?',
      message: 'Please confirm to proceed.',
      accept: () => {
        this.prepareFormData(false);
      },
      reject: () => {},
    });
  }

  onFileUpload(event: any) {
    this.selectedFiles = event.files as File[];

    this.uploadedFiles = this.uploadedFiles.concat(
      this.selectedFiles.map((file) => ({
        name: file.name,
        url: URL.createObjectURL(file),
        file: file,
      }))
    );
  }
  removeFile(fileToRemove: { name: string; url: string }) {
    this.uploadedFiles = this.uploadedFiles.filter(
      (file) => file !== fileToRemove
    );

    const updatedDocumentUrls = this.uploadedFiles.map((file) => file.url);
    console.log(updatedDocumentUrls);

    this.viewform.patchValue({
      oldDocumentUrls: updatedDocumentUrls,
    });

    this.messageService.add({
      severity: 'info',
      summary: 'Success',
      detail: 'File Removed',
    });
  }
}
