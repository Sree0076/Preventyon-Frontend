import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableegComponent } from './tableeg.component';

describe('TableegComponent', () => {
  let component: TableegComponent;
  let fixture: ComponentFixture<TableegComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableegComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
