import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendmailresetpwdComponent } from './sendmailresetpwd.component';

describe('SendmailresetpwdComponent', () => {
  let component: SendmailresetpwdComponent;
  let fixture: ComponentFixture<SendmailresetpwdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendmailresetpwdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendmailresetpwdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
