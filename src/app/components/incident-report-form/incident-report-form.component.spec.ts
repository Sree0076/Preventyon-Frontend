// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { ReactiveFormsModule } from '@angular/forms';
// import { MatDialog } from '@angular/material/dialog';
// import { of } from 'rxjs';
// import { IncidentReportFormComponent } from './incident-report-form.component';
// import { IncidentServiceService } from '../../services/incident-service.service';
// import { MessageService } from 'primeng/api';
// import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
// import { InputTextModule } from 'primeng/inputtext';
// import { ButtonModule } from 'primeng/button';
// import { CalendarModule } from 'primeng/calendar';
// import { DropdownModule } from 'primeng/dropdown';
// import { FileUploadModule } from 'primeng/fileupload';
// import { InputTextareaModule } from 'primeng/inputtextarea';
// import { ToastModule } from 'primeng/toast';
// import { RippleModule } from 'primeng/ripple';
// import { MatDatepickerModule } from '@angular/material/datepicker';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatNativeDateModule } from '@angular/material/core';

// describe('IncidentReportFormComponent', () => {
//   let component: IncidentReportFormComponent;
//   let fixture: ComponentFixture<IncidentReportFormComponent>;
//   let mockIncidentService: jasmine.SpyObj<IncidentServiceService>;
//   let mockMessageService: jasmine.SpyObj<MessageService>;
//   let mockDialog: jasmine.SpyObj<MatDialog>;

//   beforeEach(async () => {
//     mockIncidentService = jasmine.createSpyObj('IncidentServiceService', [
//       'addIncident',
//     ]);
//     mockMessageService = jasmine.createSpyObj('MessageService', ['add']);
//     mockDialog = jasmine.createSpyObj('MatDialog', ['open']);

//     await TestBed.configureTestingModule({
//       imports: [
//         ReactiveFormsModule,
//         InputTextModule,
//         ButtonModule,
//         CalendarModule,
//         DropdownModule,
//         FileUploadModule,
//         InputTextareaModule,
//         ToastModule,
//         RippleModule,
//         MatDatepickerModule,
//         MatFormFieldModule,
//         MatInputModule,
//         MatNativeDateModule,
//       ],
//       declarations: [IncidentReportFormComponent],
//       providers: [
//         { provide: IncidentServiceService, useValue: mockIncidentService },
//         { provide: MessageService, useValue: mockMessageService },
//         { provide: MatDialog, useValue: mockDialog },
//       ],
//     }).compileComponents();

//     fixture = TestBed.createComponent(IncidentReportFormComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create the component', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should initialize form with default values', () => {
//     const form = component.viewform;
//     expect(form).toBeTruthy();
//     expect(form.get('incidentTitle')?.value).toBe('');
//     expect(form.get('incidentOccuredDate')?.value).toBe(null);
//     expect(form.get('incidentOccuredTime')?.value).toBe('');
//     expect(form.get('incidentDescription')?.value).toBe('');
//     expect(form.get('reportedBy')?.value).toBe('');
//     expect(form.get('reportedDate')?.value).toBe('');
//     expect(form.get('priority')?.value).toBe('');
//     expect(form.get('isDraft')?.value).toBe(false);
//     expect(form.get('employeeId')?.value).toBe(0);
//     expect(form.get('documentUrls')?.value).toBe(null);
//   });

//   it('should show validation error for required fields', () => {
//     component.onSubmit();
//     expect(
//       component.viewform.get('incidentTitle')?.hasError('required')
//     ).toBeTruthy();
//     expect(
//       component.viewform.get('incidentOccuredDate')?.hasError('required')
//     ).toBeTruthy();
//     expect(
//       component.viewform.get('incidentOccuredTime')?.hasError('required')
//     ).toBeTruthy();
//     expect(
//       component.viewform.get('incidentDescription')?.hasError('required')
//     ).toBeTruthy();
//   });

//   it('should handle file uploads', () => {
//     const mockFile = new File([''], 'test-file.txt', { type: 'text/plain' });
//     const event = {
//       files: [mockFile],
//     };
//     component.onFileUpload(event);
//     expect(component.selectedFiles.length).toBe(1);
//     expect(component.selectedFiles[0].name).toBe('test-file.txt');
//   });

//   it('should submit form data', () => {
//     spyOn(component.apiService, 'addIncident').and.returnValue(of({}));
//     spyOn(component.messageService, 'add');
//     component.viewform.setValue({
//       incidentTitle: 'Test Title',
//       category: 'category1',
//       incidentType: 'type1',
//       incidentOccuredDate: new Date(),
//       incidentOccuredTime: '12:00',
//       incidentDescription: 'Test Description',
//       reportedBy: 'John Doe',
//       reportedDate: new Date(),
//       priority: 'High',
//       isDraft: false,
//       employeeId: 2,
//       documentUrls: null,
//     });
//     component.submitForm();
//     expect(component.apiService.addIncident).toHaveBeenCalled();
//     expect(component.messageService.add).toHaveBeenCalledWith(
//       jasmine.objectContaining({
//         severity: 'success',
//         summary: 'Success',
//         detail: 'Incident Reported successfully',
//       })
//     );
//   });

//   it('should save form as draft', () => {
//     spyOn(component.apiService, 'addIncident').and.returnValue(of({}));
//     spyOn(component.messageService, 'add');
//     component.viewform.setValue({
//       incidentTitle: 'Test Title',
//       category: 'category1',
//       incidentType: 'type1',
//       incidentOccuredDate: new Date(),
//       incidentOccuredTime: '12:00',
//       incidentDescription: 'Test Description',
//       reportedBy: 'John Doe',
//       reportedDate: new Date(),
//       priority: 'High',
//       isDraft: true,
//       employeeId: 2,
//       documentUrls: null,
//     });
//     component.saveAsDraft();
//     expect(component.apiService.addIncident).toHaveBeenCalled();
//     expect(component.messageService.add).toHaveBeenCalledWith(
//       jasmine.objectContaining({
//         severity: 'success',
//         summary: 'Success',
//         detail: 'Incident saved as draft successfully',
//       })
//     );
//   });

//   it('should open confirmation dialog on submit', () => {
//     spyOn(component.dialog, 'open').and.callThrough();
//     component.onSubmit();
//     expect(component.dialog.open).toHaveBeenCalledWith(
//       ConfirmationDialogComponent
//     );
//   });

//   it('should submit form when confirmation dialog result is true', () => {
//     spyOn(component.dialog, 'open').and.callFake(() => {
//       const dialogRef = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
//       dialogRef.afterClosed.and.returnValue(of(true));
//       return dialogRef;
//     });
//     spyOn(component, 'submitForm');
//     component.onSubmit();
//     expect(component.submitForm).toHaveBeenCalled();
//   });
// });
