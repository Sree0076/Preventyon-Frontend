
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
  private createBaseUrl: string ='http://localhost:7209/api/Incident/CreateIncident';

  getDataBasedOnStatus(employeeid:number,isUser:boolean): Observable<any> {

    return this.http.get<any>(`http://localhost:7209/api/Incident/GetIncidentsByEmployeeId/${employeeid}/${isUser}`);
  }

  public getSingleIncident(incidentId: number): Observable<IncidentData> {
    return this.http.get<IncidentData>(`http://localhost:7209/api/Incident/GetUserUpdateIncident/${incidentId}`).pipe(
      catchError(this.handleError)
    );
  }
  public getSingleFullIncident(incidentId: number): Observable<IncidentData> {
    return this.http.get<IncidentData>(`http://localhost:7209/api/Incident/GetIncident/${incidentId}`).pipe(
      catchError(this.handleError)
    );
  }

  public updateUserIncident(incidentId: number, incident: FormData): Observable<any> {
    return this.http.put<any>(`http://localhost:7209/api/Incident/UserUpdateIncident/${incidentId}`, incident);
  }

  public getAssignedIncident(employeeId: number): Observable<IncidentData> {
    return this.http.get<IncidentData>(`http://localhost:7209/api/AssignedIncident/GetAssignedIncidentsForEmployee/${employeeId}`).pipe(
      catchError(this.handleError)
    );
  }

  public addIncident(incident: FormData): Observable<IncidentData> {
    console.log(incident);
    return this.http.post<IncidentData>(this.createBaseUrl, incident);
  }
  public updateIncident(incidentId: number, incident: IncidentData): Observable<IncidentData> {
    return this.http.put<IncidentData>(`http://localhost:7209/api/Incident/UpdateIncident/${incidentId}`, incident);
  }
  private handleError(error: HttpErrorResponse) {

    console.error('An error occurred:', error.message);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }


  public submitForUser(incidentId: number, incident: any): Observable<any> {
    return this.http.put<any>(`http://localhost:7209/api/updateIncidentByReview/${incidentId}`, incident);
  }

  public incidentApproval(incidentId: number): Observable<any> {
    return this.http.get<any>(`http://localhost:7209/api/incidentApproval/${incidentId}`);
  }

  public incidentAccept(incidentId: number,employeeId : number): Observable<any> {
    return this.http.put<any>(`http://localhost:7209/api/acceptIncidents/${incidentId}`,employeeId);
  }

}
