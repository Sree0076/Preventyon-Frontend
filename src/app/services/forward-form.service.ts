import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { userDetails } from '../models/users_forward_form.interface';

@Injectable({
  providedIn: 'root'
})
export class ForwardFormService {

  constructor(private http: HttpClient) {}

  getAllUsers():Observable<userDetails[]>{
    return this.http.get<userDetails[]>('https://localhost:7006/Employee/GetEmployees');
  }

}
