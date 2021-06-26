import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeragencyComponent } from './peragency.component';

describe('PeragencyComponent', () => {
  let component: PeragencyComponent;
  let fixture: ComponentFixture<PeragencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeragencyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeragencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
