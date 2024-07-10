import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IncidentReportFormApiService {
  constructor(private http: HttpClient) {}
  private createBaseUrl: string = 'http://localhost:5262/api/createIncident';
  private updateBaseUrl: string = 'http://localhost:5262/api/getCoupon';

  addIncident(incident: any): Observable<any> {
    console.log(incident);

    return this.http.post(this.createBaseUrl, incident);
  }

  getIncident(id: number): Observable<any> {
    console.log(id);

    return this.http.get(`${this.updateBaseUrl}/${id}`);
  }
}
