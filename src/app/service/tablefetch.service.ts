import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IncidentData } from '../components/table/table.component';
@Injectable({
  providedIn: 'root'
})

export class TablefetchService {

  private incidentsUrl = 'https://api.jsonsilo.com/public/e0259933-a369-4c73-9475-66315ae36922'; // Adjust URL based on your JSON location

  constructor(private http: HttpClient) { }

  public getIncidents(): Observable<any> {
    return this.http.get("https://api.jsonsilo.com/public/e0259933-a369-4c73-9475-66315ae36922");
  }
}
