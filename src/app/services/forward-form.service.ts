import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { userDetails } from '../models/users_forward_form.interface';

@Injectable({
  providedIn: 'root',
})
export class ForwardFormService {
  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<any> {
    return this.http.get<any>(
      'http://localhost:7209/api/Employee/GetEmployees'
    );
  }

  forwardIncident(
    incidentId: number,
    assignedEmployeeIds: number[],
    remarks: string
  ): Observable<any> {
    console.log(assignedEmployeeIds);
    const url = `http://localhost:7209/api/AssignedIncident/AssignIncidentToEmployees/AssignIncidentToEmployees/${incidentId}`;
    const requestBody = {
      assignedEmployeeIds: assignedEmployeeIds,
      remarks: remarks,
    };
    return this.http.post(url, requestBody);
  }
}
