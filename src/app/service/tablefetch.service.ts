import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class TablefetchService {


  constructor(private http: HttpClient) { }

  public getIncidents(): Observable<any> {
    return this.http.get("https://localhost:7209/Incident/GetIncidents");
  }

  public getDraftIncidents(): Observable<any> {
    return this.http.get("https://localhost:7209/Incident/getDraftIncidents");
  }
}
// https://api.jsonsilo.com/public/da8e7333-5488-46ff-a295-a7dfd499d9fa
// http://localhost:5138/api/getList
