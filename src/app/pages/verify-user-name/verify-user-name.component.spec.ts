import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyUserNameComponent } from './verify-user-name.component';

describe('VerifyUserNameComponent', () => {
  let component: VerifyUserNameComponent;
  let fixture: ComponentFixture<VerifyUserNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifyUserNameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyUserNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
