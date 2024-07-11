import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IncidentReportFormApiService {
  constructor(private http: HttpClient) {}

  private createBaseUrl: string =
    'https://localhost:7209/Incident/PostIncident';
  private fetchBaseUrl: string = 'https://localhost:7209/Incident/GetIncident';
  private updateBaseUrl: string = 'https://localhost:7209/Incident/PutIncident';

  addIncident(incident: any): Observable<any> {
    console.log(incident);

    return this.http.post(this.createBaseUrl, incident);
  }

  getIncident(id: number): Observable<any> {
    return this.http.get(`${this.fetchBaseUrl}/${id}`);
  }
  updateIncident(id: number, incident: any): Observable<any> {
    return this.http.put(`${this.updateBaseUrl}/${id}`, incident);
  }
}
