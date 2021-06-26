import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DdtpdfComponent } from './ddtpdf.component';

describe('DdtpdfComponent', () => {
  let component: DdtpdfComponent;
  let fixture: ComponentFixture<DdtpdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DdtpdfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DdtpdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
