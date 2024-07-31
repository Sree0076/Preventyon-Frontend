import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { IncidentStatsDTO } from '../../models/incidentData.interface';
import { IncidentServiceService } from '../incident-service.service';
import { EmployeeDataServiceService } from './employee-data.service.service';

@Injectable({
  providedIn: 'root'
})
export class IncidentDataServiceTsService {
  private incidentDataSubject: BehaviorSubject<IncidentStatsDTO | null> = new BehaviorSubject<IncidentStatsDTO | null>(null);
  public incidentData: Observable<IncidentStatsDTO | null> = this.incidentDataSubject.asObservable();
  private selectedIncidentIdSource = new BehaviorSubject<number>(0);
  selectedIncidentId$ = this.selectedIncidentIdSource.asObservable();

  private navigateToDashboard = new Subject<void>();

  navigateToDashboard$ = this.navigateToDashboard.asObservable();

  triggerDashboard() {
    this.navigateToDashboard.next();
  }

  constructor(private cardApiService: IncidentServiceService,private employeeDataService: EmployeeDataServiceService) {}

  fetchIncidentData(isUser:boolean): void {

    this.employeeDataService.employeeData.subscribe(data => {
      if (data) {
        this.cardApiService.getDataBasedOnStatus(data.id,isUser).subscribe((data: IncidentStatsDTO) => {
          this.incidentDataSubject.next(data);

        });
      }
    });

  }

  setSelectedIncidentId(incidentId: number): void {
    this.selectedIncidentIdSource.next(incidentId);
  }
}
