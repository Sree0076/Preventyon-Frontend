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

@Component({
  selector: 'app-incident-report-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  providers:[DatePipe],
  templateUrl: './incident-report-form.component.html',
  styleUrl: './incident-report-form.component.scss',
})
export class IncidentReportFormComponent {
  editIncidentId:number =0;
  incident!:IncidentData ;
  editAction:Boolean=false
  constructor(
    private router:Router,private apiService: IncidentReportFormApiService,
    private incidentService: IncidentServiceTsService,private route: ActivatedRoute,
    private datePipe: DatePipe
  ) {}
  saveAsDraft() {
    this.viewform.value.isDraft = true;
    console.log(this.viewform.value);
    if(this.editAction)
      {

        this.apiService.updateIncident(this.editIncidentId,this.viewform.value).subscribe((response) => {
          console.log('Incident updated successfully', response);
          this.router.navigate(['/user']);

        });

      }
      else
      {

        this.apiService.addIncident(this.viewform.value).subscribe((response) => {
          console.log('Incident added successfully', response);
          this.router.navigate(['/user']);

        });
      }
  }
  viewform!: FormGroup;

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
    });
    this.route.params.subscribe(params => {

      if (params['action']==="edit") {
        console.log("edit1");
        this.editAction=true;
        this.incidentService.selectedIncidentId$.subscribe((incidentId) => {
          this.editIncidentId = incidentId;
          this.fetchIncident();
          console.log('Selected incident ID:', this.editIncidentId);
        });
      }});

  }

  onSubmit() {
    console.log(this.viewform.value);
    this.viewform.value.isDraft = false;
    console.log(this.viewform.value.isDraft);
    if(this.editAction)
    {

      this.apiService.updateIncident(this.editIncidentId,this.viewform.value).subscribe((response) => {
        console.log('Incident updated successfully', response);
        this.router.navigate(['/user']);

      });

    }
    else
    {

      this.apiService.addIncident(this.viewform.value).subscribe((response) => {
        console.log('Incident added successfully', response);
        this.router.navigate(['/user']);

      });
    }


  }
  fetchIncident()
  {
    this.apiService.getIncident(this.editIncidentId ).subscribe((response) => {
      console.log('Incident Fetched successfully', response);
      response.incidentOccuredDate= this.datePipe.transform(response.incidentOccuredDate, 'yyyy-MM-dd');
      this.incident=response;
    });
  }

  public onUploadSuccess(event: any): void {
    console.log('File uploaded successfully:', event);
  }

  public onUploadError(event: any): void {
    console.log('Error uploading file:', event);
  }


}
