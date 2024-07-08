import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class TablefetchService {


  constructor(private http: HttpClient) { }

  public getIncidents(): Observable<any> {
    return this.http.get("http://localhost:5138/api/getList");
  }
}
