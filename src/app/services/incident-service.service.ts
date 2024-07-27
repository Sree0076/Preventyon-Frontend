
import { Injectable } from '@angular/core';
import { IncidentData, IncidentStatsDTO } from '../models/incidentData.interface';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { EmployeeDataServiceService } from './sharedService/employee-data.service.service';
import { Employee } from '../models/employee.interface';
import { AuthService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})

export class IncidentServiceService {

  constructor(private http: HttpClient) {
  }
  private createBaseUrl: string ='http://localhost:7209/Incident/CreateIncident';
  getDataBasedOnStatus(employeeid:number): Observable<any> {

    return this.http.get<any>(`http://localhost:7209/Incident/GetIncidentsByEmployeeId?employeeId=${employeeid}`);
  }

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
    return this.http.get<IncidentData>(`http://localhost:7209/api/AssignedIncident/${employeeId}`).pipe(
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


  public submitForUser(incidentId: number, incident: any): Observable<any> {
    return this.http.put<any>(`http://localhost:7209/api/updateIncidentByReview/${incidentId}`, incident);
  }
}
