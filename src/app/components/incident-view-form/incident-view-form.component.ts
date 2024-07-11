import { Component } from '@angular/core';
import { IncidentReportFormApiService } from '../../services/incident-report-form-api.service';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-incident-view-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './incident-view-form.component.html',
  styleUrl: './incident-view-form.component.scss',
})
export class IncidentViewFormComponent {
  constructor(
    private apiService: IncidentReportFormApiService,
    private datePipe: DatePipe
  ) {}
  data: any = {};
  id: number = 0;

  ngOnInit() {
    this.apiService.getIncident(this.id).subscribe((response) => {
      console.log(response);
      this.data = response;
    });
  }

  extractDateTime(): { date: string; time: string } {
    const parsedDate = new Date(this.data.monthYear);
    const date = this.datePipe.transform(parsedDate, 'yyyy-MM-dd')!;
    const time = this.datePipe.transform(parsedDate, 'HH:mm:ss')!;
    return { date, time };
  }
}
