import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IncidentReportFormApiService } from '../../services/incident-report-form-api.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-incident-report-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './incident-report-form.component.html',
  styleUrl: './incident-report-form.component.scss',
})
export class IncidentReportFormComponent {
  constructor(
    private apiService: IncidentReportFormApiService,
  ) {}
  saveAsDraft() {
    throw new Error('Method not implemented.');
  }
  viewform!: FormGroup;

  ngOnInit() {
    this.viewform = new FormGroup({
      incidentTitle: new FormControl('', Validators.required),
      category: new FormControl(''),
      incidentsType: new FormControl(''),
      incidentAttachment: new FormControl(''),
      incidentOccuredDate: new FormControl('', Validators.required),
      incidentOccuredTime: new FormControl('', Validators.required),
      incidentDescription: new FormControl('', Validators.required),
      incidentCategory: new FormControl(''),
      reportedBy: new FormControl('', Validators.required),
      reportedDate: new FormControl('', Validators.required),
      priority: new FormControl(''),
    });
  }

  onSubmit() {
    console.log(this.viewform.value);
    
    this.apiService.addIncident(this.viewform.value).subscribe((response) => {
      console.log('Coupon added successfully', response);
    });
  }

  public onUploadSuccess(event: any): void {
    console.log('File uploaded successfully:', event);
  }

  public onUploadError(event: any): void {
    console.log('Error uploading file:', event);
  }
}
