import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user-management.interface';

@Injectable({
  providedIn: 'root',
})
export class UserManagementService {
  private apiUrl =
    'http://localhost:7209/api/Admins';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  createUser(data: any): Observable<User> {
    return this.http.post<User>('http://localhost:7209/api/Admins', data);
  }

  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, user);
  }
}
