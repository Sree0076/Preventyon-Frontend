import { Incident } from './../../models/incident.interface';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IncidentReportFormApiService } from '../../services/incident-report-form-api.service';
import { DatePipe, NgIf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { IncidentServiceTsService } from '../../services/sharedService/incident-service.ts.service';
import { Subscription } from 'rxjs';
import { IncidentData } from '../../models/incidentData.interface';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextareaModule } from 'primeng/inputtextarea';

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
  ],
  providers: [DatePipe],
  templateUrl: './incident-report-form.component.html',
  styleUrl: './incident-report-form.component.scss',
})
export class IncidentReportFormComponent {
  editIncidentId: number = 0;
  incident!: IncidentData;
  editAction: Boolean = false;

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
    private apiService: IncidentReportFormApiService,
    private incidentService: IncidentServiceTsService,
    private route: ActivatedRoute,
    private datePipe: DatePipe
  ) {}
  saveAsDraft() {
    this.viewform.value.isDraft = true;
    console.log(this.viewform.value);
    if (this.editAction) {
      this.apiService
        .updateIncident(this.editIncidentId, this.viewform.value)
        .subscribe((response) => {
          console.log('Incident updated successfully', response);
          this.router.navigate(['/user']);
        });
    } else {
      this.apiService.addIncident(this.viewform.value).subscribe((response) => {
        console.log('Incident added successfully', response);
        this.router.navigate(['/user']);
      });
    }
  }
  viewform!: FormGroup;
  selectedFiles!: File[];

  ngOnInit() {
    console.log(this.editAction);
    this.viewform = new FormGroup({
      IncidentTitle: new FormControl('', Validators.required),
      Category: new FormControl(''),
      IncidentType: new FormControl(''),
      IncidentAttachment: new FormControl(''),
      IncidentOccuredDate: new FormControl('', Validators.required),
      IncidentOccuredTime: new FormControl(''),
      IncidentDescription: new FormControl('', Validators.required),
      ReportedBy: new FormControl('', Validators.required),
      ReportedDate: new FormControl('', Validators.required),
      Priority: new FormControl(''),
      IsDraft: new FormControl(false),
      DocumentFiles: new FormControl(null),
    });
    this.route.params.subscribe((params) => {
      if (params['action'] === 'edit') {
        console.log('edit1');
        this.editAction = true;
        this.incidentService.selectedIncidentId$.subscribe((incidentId) => {
          this.editIncidentId = incidentId;
          this.fetchIncident();
          console.log('Selected incident ID:', this.editIncidentId);
        });
      }
    });
  }

  onFileUpload(event: any) {
    console.log('fileupload', <File>event.files);

    this.selectedFiles = <File[]>event.files;
    
  }

  onSubmit() {
    const formData = new FormData();
    this.selectedFiles.forEach((image) => {
      formData.append('DocumentFiles', image);
    });
    for (const [key, value] of Object.entries(this.viewform.value)) {
      if (key !== 'DocumentFiles') {
        if (key == 'IncidentOccuredDate') {
          const x = value as Date;
          formData.append(key, x.toISOString());
        } else {
          formData.append(key, value as string);
        }
      }
    }
    this.apiService.addIncident(formData).subscribe((response) => {
      this.router.navigate(['/user']);
    });

    console.log(this.viewform.value);
    this.viewform.value.isDraft = false;
    console.log(this.viewform.value.isDraft);
    if (this.editAction) {
      this.apiService
        .updateIncident(this.editIncidentId, this.viewform.value)
        .subscribe((response) => {
          console.log('Incident updated successfully', response);
          this.router.navigate(['/user']);
        });
    } else {
      console.log(this.viewform.value);

      this.apiService.addIncident(formData).subscribe((response) => {
        console.log('Incident added successfully', response);
        this.router.navigate(['/user']);
      });
    }
  }
  fetchIncident() {
    this.apiService.getIncident(this.editIncidentId).subscribe((response) => {
      console.log('Incident Fetched successfully', response);
      response.incidentOccuredDate = this.datePipe.transform(
        response.incidentOccuredDate,
        'yyyy-MM-dd'
      );
      this.incident = response;
    });
  }

 
}
