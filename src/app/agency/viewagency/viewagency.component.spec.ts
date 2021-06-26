import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewagencyComponent } from './viewagency.component';

describe('ViewagencyComponent', () => {
  let component: ViewagencyComponent;
  let fixture: ComponentFixture<ViewagencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewagencyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewagencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
