export interface IncidentData {
  id: number;
  incidentNo: string;
  incidentTitle: string;
  incidentDescription: string;
  reportedBy: string;
  roleOfReporter: string;
  incidentOccuredDate: Date; // Use Date if you handle dates in ISO format
  monthYear: string;
  incidentType: string;
  category: string;
  priority: string;
  actionAssignedTo: string;
  deptOfAssignee: string;
  investigationDetails: string;
  associatedImpacts: string;
  collectionOfEvidence: string;
  correction: string;
  correctiveAction: string;
  correctionCompletionTargetDate: string; // Use Date if you handle dates in ISO format
  correctionActualCompletionDate: string; // Use Date if you handle dates in ISO format
  correctiveActualCompletionDate: string; // Use Date if you handle dates in ISO format
  incidentStatus: string;
  correctionDetailsTimeTakenToCloseIncident: number;
  correctiveDetailsTimeTakenToCloseIncident: number;
  isDraft: boolean;
  employeeId: number;
  employee: {
        id: number;
        name: string;
        department: string;
        role: string;
        incidents: IncidentData[];
  };
  createdAt: string; // Use Date if you handle dates in ISO format
}
