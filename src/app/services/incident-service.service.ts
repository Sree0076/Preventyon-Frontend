import { Injectable } from '@angular/core';
import { IncidentData, IncidentStatsDTO } from '../models/incidentData.interface';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class IncidentServiceService {

  private fetchCardUrl ='http://localhost:7209/Incident/GetIncidentsByEmployeeId?employeeId=2';
  private createBaseUrl: string ='http://localhost:7209/Incident/CreateIncident';

  constructor(private http: HttpClient) {}

  getDataBasedOnStatus(): Observable<any> {
    return this.http.get<any>(`${this.fetchCardUrl}`);

  }

  // public getDraftIncidents(): Observable<IncidentData> {
  //   return this.http.get<IncidentData>("http://localhost:7209/Incident/GetDraftIncidentsByEmployeeId?employeeId=3").pipe(
  //     catchError(this.handleError)
  //   );
  // }

  public getSingleIncident(incidentId: number): Observable<IncidentData> {
    return this.http.get<IncidentData>(`http://localhost:7209/Incident/GetUserUpdateIncident/${incidentId}`).pipe(
      catchError(this.handleError)
    );
  }
  public getSingleFullIncident(incidentId: number): Observable<IncidentData> {
    return this.http.get<IncidentData>(`http://localhost:7209/Incident/GetIncident/${incidentId}`).pipe(
      catchError(this.handleError)
    );
  }

  public updateUserIncident(incidentId: number, incident: FormData): Observable<any> {
    return this.http.put<any>(`http://localhost:7209/Incident/UserUpdateIncident/${incidentId}`, incident);
  }

  public getAssignedIncident(employeeId: number): Observable<IncidentData> {
    return this.http.get<IncidentData>(`http://localhost:7209/api/AssignedIncident?employeeId=${employeeId}`).pipe(
      catchError(this.handleError)
    );
  }

  public addIncident(incident: FormData): Observable<IncidentData> {
    console.log(incident);
    return this.http.post<IncidentData>(this.createBaseUrl, incident);
  }
  public updateIncident(incidentId: number, incident: IncidentData): Observable<IncidentData> {
    return this.http.put<IncidentData>(`http://localhost:7209/Incident/UpdateIncident/${incidentId}`, incident);
  }
  private handleError(error: HttpErrorResponse) {

    console.error('An error occurred:', error.message);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}
