import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Incident } from '../models/incident.interface';

@Injectable({
  providedIn: 'root',
})
export class CardApiService {
  private jsonUrl = 'assets/data.json';

  constructor(private http: HttpClient) {}

  getData(): Observable<Incident[]> {    
    return this.http.get<Incident[]>(this.jsonUrl);
  }
}
