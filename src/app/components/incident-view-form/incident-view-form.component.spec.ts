import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentViewFormComponent } from './incident-view-form.component';

describe('IncidentViewFormComponent', () => {
  let component: IncidentViewFormComponent;
  let fixture: ComponentFixture<IncidentViewFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncidentViewFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncidentViewFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
