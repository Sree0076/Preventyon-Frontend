import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

  constructor(private http:HttpClient) { }

  getAuthentication(employee:any):Observable<any>{
    console.log("auth in auth api")
    return this.http.post('https://localhost:7198/Employee/GetAuthentication', employee);
  }
}
