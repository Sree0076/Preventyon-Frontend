import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { IncidentReportFormComponent } from './incident-report-form.component';

describe('IncidentReportFormComponent', () => {
  let component: IncidentReportFormComponent;
  let fixture: ComponentFixture<IncidentReportFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        InputTextModule,
        ButtonModule,
        CalendarModule,
        DropdownModule,
        FileUploadModule,
        InputTextareaModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatInputModule,
        MatNativeDateModule,
        IncidentReportFormComponent, // Import standalone component here
      ],
      providers: [FormBuilder],
    }).compileComponents();

    fixture = TestBed.createComponent(IncidentReportFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with default values', () => {
    const form = component.viewform;
    expect(form).toBeTruthy();
    expect(form.get('incidentTitle')?.value).toBe('');
    expect(form.get('incidentOccuredDate')?.value).toBe(null);
    expect(form.get('incidentOccuredTime')?.value).toBe('');
    expect(form.get('incidentDescription')?.value).toBe('');
    expect(form.get('reportedBy')?.value).toBe('');
    expect(form.get('reportedDate')?.value).toBe('');
    expect(form.get('priority')?.value).toBe('');
    expect(form.get('isDraft')?.value).toBe(false);
    expect(form.get('employeeId')?.value).toBe(0);
    expect(form.get('documentUrls')?.value).toBe(null);
  });

  it('should show validation errors for required fields when form is submitted with empty values', () => {
    component.viewform.get('incidentTitle')?.setValue('');
    component.viewform.get('incidentOccuredDate')?.setValue(null);
    component.viewform.get('incidentDescription')?.setValue('');

    component.onSubmit();

    expect(
      component.viewform.get('incidentTitle')?.hasError('required')
    ).toBeTruthy();
    expect(
      component.viewform.get('incidentOccuredDate')?.hasError('required')
    ).toBeTruthy();
    expect(
      component.viewform.get('incidentDescription')?.hasError('required')
    ).toBeTruthy();
  });

  it('should not show validation errors for valid form inputs', () => {
    component.viewform.get('incidentTitle')?.setValue('Test Title');
    component.viewform.get('incidentOccuredDate')?.setValue(new Date());
    component.viewform.get('incidentDescription')?.setValue('Test Description');

    component.onSubmit();

    expect(
      component.viewform.get('incidentTitle')?.hasError('required')
    ).toBeFalsy();
    expect(
      component.viewform.get('incidentOccuredDate')?.hasError('required')
    ).toBeFalsy();
    expect(
      component.viewform.get('incidentDescription')?.hasError('required')
    ).toBeFalsy();
  });

  it('should show validation error for required fields when only some are filled', () => {
    component.viewform.get('incidentTitle')?.setValue('Test Title');
    component.viewform.get('incidentOccuredDate')?.setValue(null);
    component.viewform.get('incidentDescription')?.setValue('Test Description');

    component.onSubmit();

    expect(
      component.viewform.get('incidentTitle')?.hasError('required')
    ).toBeFalsy();
    expect(
      component.viewform.get('incidentOccuredDate')?.hasError('required')
    ).toBeTruthy();
    expect(
      component.viewform.get('incidentDescription')?.hasError('required')
    ).toBeFalsy();
  });

  it('should reset validation errors when form values are changed', () => {
    component.viewform.get('incidentTitle')?.setValue('Test Title');
    component.viewform.get('incidentOccuredDate')?.setValue(null);
    component.viewform.get('incidentDescription')?.setValue('Test Description');

    component.onSubmit();

    expect(
      component.viewform.get('incidentOccuredDate')?.hasError('required')
    ).toBeTruthy();

    component.viewform.get('incidentOccuredDate')?.setValue(new Date());

    expect(
      component.viewform.get('incidentOccuredDate')?.hasError('required')
    ).toBeFalsy();
  });
});
