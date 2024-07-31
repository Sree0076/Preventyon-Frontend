import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEditFormPageComponent } from './user-edit-form-page.component';

describe('UserEditFormPageComponent', () => {
  let component: UserEditFormPageComponent;
  let fixture: ComponentFixture<UserEditFormPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserEditFormPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserEditFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
