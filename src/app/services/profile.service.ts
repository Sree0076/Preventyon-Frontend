import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface UserData {
  name: string;
  department: string;
  role: {
    name: string;
    permission: {
      id: number;
      permissionName: string;
      incidentManagement: boolean;
      userManagement: boolean;
      incidentCreateOnly: boolean;
    };
  };
}

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private apiUrl = 'https://localhost:7209/Employee/GetEmployeeById/2';

  constructor(private http: HttpClient) {}

  getUserData(): Observable<{name: string;designation: string;role: string;permissions: any;}> {
    return this.http.get<UserData>(this.apiUrl).pipe(
      map((data) => ({
        name: data.name,
        designation: data.department,
        role: data.role.name,
        permissions: data.role.permission,
      }))
    );
  }
}
