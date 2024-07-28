import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of } from 'rxjs';
import { IncidentDataServiceTsService } from './sharedService/incident-data.service.ts.service';
import { IncidentStatsDTO } from '../models/incidentData.interface';

interface IncidentCounts {
  "Privacy Incidents"?: number;
  "Quality Incidents"?: number;
  "Security Incidents"?: number;
}

interface YearlyIncidentCounts {
  [year: string]: IncidentCounts;
}

@Injectable({
  providedIn: 'root',
})
export class ChartDataService {
  constructor(private incidentDataService: IncidentDataServiceTsService) {}

  getChartData(): Observable<any> {
    return this.incidentDataService.incidentData.pipe(
      map((data: IncidentStatsDTO | null) => {
        if (data) {
          const yearlyIncidentCounts = data.yearlyIncidentCounts;
          const years = Object.keys(yearlyIncidentCounts);
          const incidentTypes: (keyof typeof yearlyIncidentCounts[string])[] = ["Privacy Incidents", "Quality Incidents", "Security Incidents"];

          const datasets = incidentTypes.map((type) => {
            return {
              label: type,
              data: years.map((year) => yearlyIncidentCounts[year][type] || 0),
            };
          });

          return {
            labels: years,
            datasets: datasets,
          };
        } else {
          return { labels: [], datasets: [] };
        }
      })
    );
  }
}

