import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';
import { By, DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardComponent,MatCardModule],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the title', () => {
    component.title = 'Test Title';
    fixture.detectChanges();
    const titleElement = fixture.debugElement.query(By.css('.mat-card-title')).nativeElement;
    expect(titleElement.textContent).toContain('Test Title');
  });

  it('should display the total count', () => {
    component.totalCount = 123;
    fixture.detectChanges();
    const totalCountElement = fixture.debugElement.query(By.css('.number')).nativeElement;
    expect(totalCountElement.textContent).toContain('123');
  });

  it('should display the pending count', () => {
    component.pendingCount = 45;
    fixture.detectChanges();
    const pendingCountElement = fixture.debugElement.query(By.css('.status-item:nth-child(1) .status-number')).nativeElement;
    expect(pendingCountElement.textContent).toContain('45');
  });

  it('should display the closed count', () => {
    component.closedCount = 78;
    fixture.detectChanges();
    const closedCountElement = fixture.debugElement.query(By.css('.status-item:nth-child(2) .status-number')).nativeElement;
    expect(closedCountElement.textContent).toContain('78');
  });

  it('should apply the card class', () => {
    component.cardClass = 'custom-class';
    fixture.detectChanges();
    const cardElement = fixture.debugElement.query(By.css('.card')).nativeElement;
    expect(cardElement.classList).toContain('custom-class');
  });
  
});
