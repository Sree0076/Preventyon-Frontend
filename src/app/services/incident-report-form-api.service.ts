import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IncidentReportFormApiService {
  constructor(private http: HttpClient) {}
  private createBaseUrl: string = 'http://localhost:5262/api/createIncident';

  addIncident(incident: any): Observable<any> {
    console.log(incident);

    return this.http.post(this.createBaseUrl, incident);
  }
}
