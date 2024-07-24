import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IncidentStatsDTO } from '../../models/incidentData.interface';
import { IncidentServiceService } from '../incident-service.service';

@Injectable({
  providedIn: 'root'
})
export class IncidentDataServiceTsService {
  private incidentDataSubject: BehaviorSubject<IncidentStatsDTO | null> = new BehaviorSubject<IncidentStatsDTO | null>(null);
  public incidentData: Observable<IncidentStatsDTO | null> = this.incidentDataSubject.asObservable();
  private selectedIncidentIdSource = new BehaviorSubject<number>(0);
  selectedIncidentId$ = this.selectedIncidentIdSource.asObservable();

  constructor(private cardApiService: IncidentServiceService) {}

  fetchIncidentData(): void {
    this.cardApiService.getDataBasedOnStatus().subscribe((data: IncidentStatsDTO) => {
      this.incidentDataSubject.next(data);
    });
  }

  setSelectedIncidentId(incidentId: number): void {
    this.selectedIncidentIdSource.next(incidentId);
  }
}
