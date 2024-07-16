export interface IncidentDetailsDTO {
  incidentTitle: string;
  incidentDescription: string;
  incidentOccuredDate: Date;
  incidentType: string;
  category: string;
  priority: string;
  isDraft: boolean;
}

export interface IncidentStatsDTO {
  EmployeeId: number;
  privacyTotalIncidents: number;
  privacyPendingIncidents: number;
  privacyClosedIncidents: number;
  securityTotalIncidents: number;
  securityPendingIncidents: number;
  securityClosedIncidents: number;
  qualityTotalIncidents: number;
  qualityPendingIncidents: number;
  qualityClosedIncidents: number;
  incidents: IncidentDetailsDTO[];
}
