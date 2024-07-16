import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Incident } from '../models/incident.interface';
import { IncidentStatsDTO } from '../models/incidentdto.interface';

@Injectable({
  providedIn: 'root',
})
export class CardApiService {
  private jsonUrl = 'assets/data.json';
  private fetchCardUrl =
    'https://localhost:7209/Incident/GetIncidentsByEmployeeId?employeeId=2';
    private fetchUrl =
    'https://localhost:7209/Incident/GetIncident/2';
  constructor(private http: HttpClient) {}

  getData(): Observable<Incident[]> {
    console.log("edit");
    console.log(this.http.get<Incident[]>(`${this.fetchUrl}`));

    return this.http.get<Incident[]>(`${this.fetchUrl}`);
  }

  getDataBasedOnStatus(): Observable<IncidentStatsDTO> {
    console.log(this.http.get<IncidentStatsDTO>(`${this.fetchCardUrl}`));

    return this.http.get<IncidentStatsDTO>(`${this.fetchCardUrl}`);
  }
}
